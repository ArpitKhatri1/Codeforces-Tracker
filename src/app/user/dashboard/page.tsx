import React from 'react'
import ProblemList from '@/components/problems-list';
const Dashboard = () => {

    return (
        <div className='h-full w-full p-5 flex justify-center'>
            <div className='max-w-[1440px] w-full  h-full'>
                <div className='text-4xl font-bold my-3 mb-10 '>
                    Solved Problems
                </div>
                <div className='grid grid-cols-10 w-full border-[1px] p-1 border-neutral-400 rounded-t-xl  text-center'>
                    <div className='col-span-2 p-2'>
                        Problem
                    </div>
                    <div className='col-span-6 p-2 '>Tags</div>
                    <div className='col-span-2 p-2'>Solved on</div>
                </div>
                <div className='w-full'>
                    <ProblemList />
                </div>
            </div>


        </div>
    )
}

export default Dashboard

