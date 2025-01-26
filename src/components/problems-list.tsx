"use client"
import { useUserProblemList } from '@/hooks/useUserProblemList'
import React from 'react'
import ProblemCard from './problem-card'

const ProblemList = () => {
    const { response, isLoading } = useUserProblemList("ArpitKhatri1")
    const responses = response
    return (
        <div>
            {response ? (
                <div className='flex flex-col border-[1px] border-solid border-neutral-400'>{
                    responses?.result.map((ele, key) => {
                        return (
                            <div key={key}>
                                <ProblemCard name={ele.problem.name} tags={ele.problem.tags} verdict={ele.verdict} date={ele.creationTimeSeconds} />
                            </div>
                        )
                    })
                }</div>

            ) : (
                <p>Loading...</p>
            )
            }
        </div>
    )
}

export default ProblemList