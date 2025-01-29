
import React from 'react'
import ProblemList from '@/components/dashboard/problems-list';
import TagsFilter from '@/components/dashboard/tags-filter';
import DateFilter from '@/components/dashboard/date-filter';

const Dashboard = () => {

    return (
        <div className='h-full w-full p-5 flex justify-center'>
            <div className='max-w-[1440px] w-full  h-full'>
                <div className='flex items-center mb-10'>
                    <div className='text-4xl font-bold my-3  '>
                        Solved Problems
                    </div>
                    <div className='flex gap-2 ml-auto items-center'>
                        <div className='ml-auto'>
                            <TagsFilter />
                        </div>
                        <div className=''>
                            <DateFilter />
                        </div>
                    </div>
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

