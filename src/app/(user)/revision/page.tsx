"use client"
import useRevisionList from '@/hooks/useRevisionList';
import { useUserProblemList } from '@/hooks/useUserProblemList';
import React, { useReducer } from 'react'
import ProblemCard from '@/components/problem-card';
const Revision = () => {
    const handle = localStorage.getItem("CFTrackerID") as string;
    const { response } = useUserProblemList(handle);
    const { revisionList } = useRevisionList()
    if (!revisionList) {
        return;
    }
    const newList = response?.result.filter((problem) => {
        let present = false;
        revisionList.forEach((revisonProblem) => {
            if (revisonProblem.problemId === problem.id) {
                present = true;
            }
        })
        return present
    })


    return (
        <div>
            {JSON.stringify(newList)}
        </div>
    )
}

export default Revision

