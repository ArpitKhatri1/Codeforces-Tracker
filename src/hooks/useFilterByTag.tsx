"use client"
import React from 'react'
import { userProblemList, userProblemListResult } from '@/types'
import { useTagStore } from '@/store/tags-store'
const useFilterByTag = (response: userProblemList | null) => {
    const tags = useTagStore((store) => store.tags)
    const tagsLength = tags.length
    const tagFilter = () => {
        let tagFilteredResponse: userProblemListResult[] = []
        if (response) {
            response.result.forEach((ele) => {
                const matchingTags = ele.problem.tags.filter((tag) => tags.includes(tag))
                if (matchingTags.length > 0) {
                    tagFilteredResponse.push(ele)
                }
            })
        }
        return tagFilteredResponse
    }
    let tagFilteredResponse: userProblemList | null = { status: "ok", result: [] }
    if (tagsLength > 0) {
        tagFilteredResponse.result = tagFilter()
    } else {
        tagFilteredResponse = response
    }

    return tagFilteredResponse
}

export default useFilterByTag

