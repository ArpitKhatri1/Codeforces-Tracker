import React from 'react'
import { prisma } from '@/lib/db'
import Link from 'next/link'
import { Plus } from 'lucide-react'
import { getUserProfile } from '@/utils/getUserProfile'
import TagCreationModal from '@/components/personaltags/tag-creation-modal'
import { NextApiRequest } from 'next'

export async function getServerSideProps(req: NextApiRequest) {
    const cookies = req.headers.cookie;
    const cookieValue = cookies?.match(/CFTrackerID=([^;]+)/)?.[1];

    if (!cookieValue) {
        return {
            notFound: true, // Or return a redirect or error page
        };
    }

    // You can now use `cookieValue` to fetch user data, etc.
    const profile = await getUserProfile(cookieValue); // Example function to fetch profile
    if (!profile) {
        return {
            notFound: true, // Handle missing profile
        };
    }

    const tags = await prisma.personalTags.findMany({
        where: { userId: profile.id },
    });

    return {

        personalTagList: tags, // Send tags as props to your component

    };
}

interface PersonalTagListType {

    name: string;
    id: number;
    userId: number | null;

}

const PersonalFilter = async ({ personalTagList }: { personalTagList: PersonalTagListType[] }) => {



    return (
        <div className=' h-full flex overflow-y-hidden justify-center p-3 relative bg-slate-100'>
            < div className='max-w-[1440px] w-full '>

                {
                    personalTagList.length !== 0 ? (
                        <div className='flex gap-5 flex-wrap'>
                            {
                                personalTagList.map((ele) => (
                                    <Link href={`/personalfilter/${ele.name}`} key={ele.id}>
                                        <div className='w-[20rem] h-[20rem]  rounded-xl overflow-hidden'>
                                            <div className=' w-full h-1/2 bg-gradient-to-b from-blue-100 to-rose-100'></div>

                                            <div className='px-3 py-2 text-lg bg-neutral-300 h-1/2'>
                                                {ele.name}
                                            </div>
                                        </div>
                                    </Link>
                                ))
                            }
                        </div>
                    ) : (
                        <div className='h-full text-2xl flex justify-center items-center'>
                            <div>You have no Custom Tags currently</div>
                        </div>
                    )
                }
            </div>
            <TagCreationModal />

        </div >
    )
}

export default PersonalFilter

