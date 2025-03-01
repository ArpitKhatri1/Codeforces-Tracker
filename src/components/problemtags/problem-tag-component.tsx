"use client"
import React from 'react'
import { userProblemListResult } from '@/types'
import AddTagsPlus from './add-tags-plus'
import { usePersonalTagStore } from '@/store/personal-tag-store'
import { useproblemTagStore } from '@/store/problem-store'
type ProblemTagComponentProps = {
    problem: userProblemListResult

}

const ProblemTagComponent = ({ problem }: ProblemTagComponentProps) => {
    const userPersonalTagsList = useproblemTagStore((store) => store.problemTags)
    const problemTagList = userPersonalTagsList.filter((ele) => ele.problemId === problem.id)

    return (
        <div className='flex  col-span-3 gap-3 text-md w-full mr-auto overflow-x-hidden'>
            <div className='flex flex-wrap gap-3'>
                {
                    problemTagList.map((ele, key) => {

                        return (

                            <div key={key} className='flex gap-1'>
                                {
                                    ele.tags.map((tags, key) => {
                                        return (
                                            <div key={key} className='rounded-xl bg-[#2ff6f6] p-3 py-1 h-fit'>
                                                {tags}
                                            </div>
                                        )
                                    })
                                }
                            </div>

                        )
                    })
                }
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

