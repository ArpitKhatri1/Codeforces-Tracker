"use client"
import { useUserProblemList } from '@/hooks/useUserProblemList'
import React from 'react'
import ProblemCard from '../problem-card'
import { useTagStore } from '@/store/tags-store'
import { userProblemList, userProblemListResult } from '@/types'
const ProblemList = () => {
    const handle = localStorage.getItem("CFTrackerID") as string
    const { response, isLoading } = useUserProblemList(handle)
    const tags = useTagStore((store) => store.tags)
    const tagsLength = tags.length
    const tagFilter = () => {
        let filteredResponse: userProblemListResult[] = []
        if (response) {
            response.result.forEach((ele) => {
                const matchingTags = ele.problem.tags.filter((tag) => tags.includes(tag))
                if (matchingTags.length > 0) {
                    filteredResponse.push(ele)
                }
            })
        }
        return filteredResponse
    }
    let filteredResponse: userProblemList | null = { status: "ok", result: [] }
    if (tagsLength > 0) {
        filteredResponse.result = tagFilter()
    } else {
        filteredResponse = response
    }

    return (
        <div>
            {response ? (
                <div className='flex flex-col border-[1px] border-solid border-neutral-400'>{
                    filteredResponse?.result.map((ele, key) => {
                        return (
                            <div key={key}>
                                <ProblemCard name={ele.problem.name} tags={ele.problem.tags} contestId={ele.contestId} contestWord={ele.problem.index} date={ele.creationTimeSeconds} />
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

