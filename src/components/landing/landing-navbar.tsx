import React from 'react'
import { GitBranch } from 'lucide-react';
import Link from 'next/link';
const LandingNavbar = () => {
    return (
        <div className=' flex justify-between p-5 items-center z-50 fixed w-[55vw] max-w-[1200px] bg-white blur-10 rounded-xl h-16 left-1/2 transform -translate-x-1/2 top-9'>
            <div className='flex gap-3'>
                <div>
                    <GitBranch />
                </div>
                <div className='font-bold text-lg'>
                    CodeTracker
                </div>
            </div>
            <div className='flex gap-5 font-semibold mx-auto'>
                <Link href={"#features"}>
                    <div>
                        Features
                    </div>
                </Link>
                <Link href={"https://github.com/ArpitKhatri1/Codeforces-Tracker"} target='/'>
                    <div >
                        Github
                    </div>
                </Link>
            </div>
            <Link href="/home" >
                <div className='bg-black text-white p-1 px-2 rounded-sm'>
                    Get Started
                </div>
            </Link>

        </div >
    )
}

export default LandingNavbar

