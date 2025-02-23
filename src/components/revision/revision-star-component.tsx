"use client"
import React, { useEffect, useState } from 'react'
import { Star } from 'lucide-react'
import axios from 'axios'
import { userProblemListResult, RevisionListType } from '@/types'

const RevisionStar = ({ problem, revisionList }: { problem: userProblemListResult, revisionList: RevisionListType[] | null }) => {
    const [filled, setFilled] = useState(false);

    useEffect(() => {
        if (revisionList) {
            const isInList = revisionList.some((ele) => ele.problemId === problem.id);
            setFilled(isInList);
        }
    }, [revisionList, problem.id]); // Dependency array ensures re-evaluation when data changes

    const handleClick = async () => {
        try {
            await axios.post("/api/revision", { payload: problem });
            setFilled(true);
        } catch (error) {
            console.error("Error updating revision list", error);
        }
    }

    return (
        <div onClick={handleClick}>
            <Star className='' fill={filled ? "yellow" : "white"} />
        </div>
    );
}

export default RevisionStar;

