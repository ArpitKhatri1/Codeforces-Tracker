import React from 'react'

const DashbaordPage = () => {
    return (
        <div className='p-5 w-full flex justify-center h-screen'> {/*remove the min-h-screen */}
            <div className='max-w-[1440px] min-h-screen w-full flex flex-col gap-5 py-10'>
                <div className='w-full flex flex-col gap-5 border-2 border-solid border-t-0 border-gray-200 rounded-xl p-3 shadow-lg'>
                    <div className='text-2xl font-bold'>
                        Solving Statistics
                    </div>
                    <div className='grid grid-cols-4 gap-10'>
                        <div className='bg-blue-200 h-28 rounded-xl p-5 space-y-1'>
                            <div className='text-gray-500'>

                                Total Problems
                            </div>
                            <div className='text-blue-700 font-bold text-4xl'>
                                246
                            </div>
                        </div>
                        <div className='bg-emerald-200 h-28 rounded-xl p-5 space-y-1'>
                            <div className='text-gray-500'>

                                Total Problems
                            </div>
                            <div className='text-emerald-700 font-bold text-4xl '>
                                246
                            </div>
                        </div>
                        <div className='bg-purple-200 h-28 rounded-xl p-5 space-y-1' >
                            <div className='text-gray-500'>

                                Total Problems
                            </div>
                            <div className='text-purple-700 font-bold text-4xl '>
                                246
                            </div>
                        </div>
                        <div className='bg-orange-200 h-28 rounded-xl p-5 space-y-1'>
                            <div className='text-gray-500'>

                                Total Problems
                            </div>
                            <div className='text-orange-700 font-bold text-4xl '>
                                246
                            </div>
                        </div>
                    </div>
                    <div>
                        <div>
                            Difficulty Distribution
                        </div>
                        <div>
                            {/* chart goes here */}
                        </div>
                    </div>
                    <div>
                        <div>
                            Problem Tags
                        </div>
                        <div>
                            {/* tags goes here */}
                        </div>
                    </div>
                    <div>
                        <div>
                            Monthly Tags
                        </div>
                        <div>
                            {/* progrss bar goes here */}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DashbaordPage

