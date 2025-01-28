import React from 'react'
import UserProfile from './user/user-profile'
import Link from 'next/link'
const Navbar = () => {
    return (
        <nav className='w-full h-14 flex justify-between bg-blue-200'>
            <div className='flex gap-3 my-auto px-10'>
                <div className='w-5 h-5 bg-black my-auto'>

                </div>
                <Link href={"/dashboard"}>
                    <div className='font-bold text-xl flex items-center justify-center'>
                        Codeforces Tracker
                    </div>
                </Link>

            </div>
            <div className='ml-auto my-auto mr-20 flex gap-5 items-center font-semibold'>
                <Link href={"/personalfilter"}>
                    <div>
                        Personal Tags
                    </div>
                </Link>
                <Link href={"/revision"}>
                    <div>
                        Revision
                    </div>
                </Link>
                <UserProfile />
            </div>
        </nav>
    )
}

export default Navbar

