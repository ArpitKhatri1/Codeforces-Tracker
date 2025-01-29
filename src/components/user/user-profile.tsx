"use client"
import useUserInfo from '@/hooks/useUserInfo'
import Image from 'next/image'
const UserProfile = () => {
    const { userInfo } = useUserInfo()

    return (
        <div className='rounded-full bg-slate-700 h-10 w-10 my-auto relative overflow-hidden'>
            {
                userInfo && <Image src={userInfo.result[0].avatar} alt='text' width={100} height={100} className=' rounded-full inset-0 object-cover' />
            }
        </div>
    )
}

export default UserProfile

