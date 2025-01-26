import React from 'react'

const Navbar = () => {
    return (
        <nav className='w-full h-14 flex justify-between bg-blue-200'>
            <div className='flex gap-3 my-auto px-10'>
                <div className='w-5 h-5 bg-black my-auto'>

                </div>
                <div className='font-bold text-xl flex items-center justify-center'>
                    Codeforces Tracker
                </div>

            </div>
        </nav>
    )
}

export default Navbar

