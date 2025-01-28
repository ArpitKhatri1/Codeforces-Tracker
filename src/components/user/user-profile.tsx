"use client"
import useUserInfo from '@/hooks/useUserInfo'
import Image from 'next/image'
const UserProfile = () => {
    const { userInfo } = useUserInfo()
    console.log(userInfo)
    return (
        <div className='rounded-full bg-slate-700 h-10 w-10 my-auto relative'>
            {
                userInfo && <Image src={userInfo.result[0].avatar} alt='text' layout="fill" objectFit="cover" className=' rounded-full' />
            }
        </div>
    )
}

export default UserProfile

