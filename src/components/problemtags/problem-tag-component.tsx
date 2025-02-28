import React from 'react'
import { userProblemListResult } from '@/types'
import AddTagsPlus from './add-tags-plus'
type ProblemTagComponentProps = {
    problem: userProblemListResult

}

const ProblemTagComponent = ({ problem }: ProblemTagComponentProps) => {
    return (
        <div className='flex  col-span-3 gap-3 text-md w-full mr-auto overflow-x-hidden'>
            <div className='flex flex-wrap gap-3'>

                {
                    problem.problem.tags.map((ele, key) => {
                        return (
                            <div key={key} className='rounded-xl bg-[#F2F5F1] p-3 py-1 h-fit'>
                                {ele}
                            </div>
                        )

                    })

                }
            </div>
            <div className='my-auto ml-auto'>
                <AddTagsPlus problem={problem} />
            </div>

        </div >
    )
}

export default ProblemTagComponent

