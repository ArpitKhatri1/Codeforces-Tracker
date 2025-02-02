import React from 'react'
import { prisma } from '@/lib/db'
import Link from 'next/link'
import { Plus } from 'lucide-react'
import { getUserProfile } from '@/utils/getUserProfile'
import TagCreationModal from '@/components/personaltags/tag-creation-modal'
const PersonalFilter = async () => {
    const profile = await getUserProfile();
    if (!profile) {
        return;
    }

    const tags = await prisma.personalTags.findMany({
        where: {
            userId: profile.id,
        },
    });
    const personalTagList = tags

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

