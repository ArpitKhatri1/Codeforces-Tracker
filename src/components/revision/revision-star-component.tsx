"use client"
import React, { useEffect } from 'react'
import { Star } from 'lucide-react'
import { useState } from 'react'
import { userProblemListResult } from '@/types'
import axios from 'axios'
import { RevisionListType } from '@/types'
const RevisionStar = ({ problem, revisionList }: { problem: userProblemListResult, revisionList: RevisionListType[] | null }) => {
    let [filled, setFilled] = useState(false);
    if (!revisionList) {
        return;
    }
    const filtered = revisionList.filter((ele) => ele.problemId === problem.id)
    useEffect(() => {
        if (filtered.length > 0) {
            setFilled(true)
        }
    }, [])

    const handleClick = async () => {

        const response = await axios.post("/api/createrevisionlist", { payload: problem })
        setFilled(true)
    }

    return (
        <div onClick={handleClick}>
            <Star className='' fill={filled ? "yellow" : "white"} />
        </div>
    )
}

export default RevisionStar

