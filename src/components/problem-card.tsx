"use client";
import React, { useEffect } from 'react'

import { cn } from '@/lib/utils'
import { getProblemDate } from '@/utils/getProblemDate'
import Link from 'next/link'
import { SquareArrowOutUpRight } from 'lucide-react';
import { ContestListType, RevisionListType, userProblemListResult } from '@/types'
import { Star } from 'lucide-react';
import { Plus } from 'lucide-react'

import useContestList from '@/hooks/useContestList';
import RevisionStar from './revision/revision-star-component';
import AddTagsPlus from './problemtags/add-tags-plus';
const ProblemCard = ({ props, contestList, revisionList }: { props: userProblemListResult, contestList?: ContestListType[] | undefined, revisionList: RevisionListType[] | null }) => {
    // 
    const div = contestList?.filter((ele) => (ele.id === props.contestId))
    let numberList: number[] = []
    if (div && div[0]) {
        const arry = div[0].name.split("Div. ")
        arry.shift()
        let num = []
        for (let i = 0; i < arry.length; i++) {
            num.push(Number(arry[i][0]))
        }
        numberList = num
    }

    const { day, month, year } = getProblemDate(props.creationTimeSeconds)
    const tagColour = props.problem.rating ? cn(
        "p-1 rounded-lg px-2",
        props.problem.rating <= 1100 && "bg-gray-300",   // Newbie
        props.problem.rating >= 1200 && props.problem.rating < 1400 && "bg-green-300", // Pupil
        // Specialist
        props.problem.rating >= 1400 && props.problem.rating < 1600 && "bg-teal-300",  // Expert
        props.problem.rating >= 1600 && props.problem.rating < 1900 && "bg-blue-300", // Candidate Master
        props.problem.rating >= 1900 && props.problem.rating < 2100 && "bg-purple-300", // Master
        props.problem.rating >= 2100 && "bg-red-500"  // Grandmaster+
    ) : null;

    return (
        <div className={cn(`w-full grid grid-cols-10 border-solid border-[1px]  text-black py-3 px-5`)}>
            <div className='col-span-3 flex gap-2 items-center'>
                <div>
                    Div {numberList.length == 1 ? (numberList[0]) : ""}
                </div>
                <div >
                    {props.problem.index}
                </div>
                <div className=''>
                    {props.problem.name}
                </div>
                <Link href={`https://codeforces.com/problemset/problem/${props.contestId}/${props.problem.index}`} target='/'>
                    <div className=''>
                        <SquareArrowOutUpRight size={18} />
                    </div>
                </Link>
                <div>

                </div>
            </div>
            <div className='col-span-2 text-center flex gap-5 items-center justify-center'>

                {
                    props.problem.rating ? (

                        <div className={cn(tagColour, "h-fit")}>
                            {props.problem.rating}
                        </div>

                    ) : ""
                }

            </div>
            <div className='flex  col-span-3 gap-3 text-md w-full mr-auto overflow-x-hidden'>

                <div className='flex flex-wrap gap-3'>
                    {props.problem.tags.map((ele, key) => {
                        return (
                            <div key={key} className='rounded-xl bg-[#F2F5F1] p-3 py-1 h-fit'>
                                {ele}
                            </div>
                        )

                    })}
                </div>
                <div className='my-auto ml-auto'>
                    <AddTagsPlus problem={props} />
                </div>
            </div>
            <div className='col-span-1 text-center text-muted-foreground mt-1 ml-4'>
                {`${day}/${month}/${year}`}
            </div>
            <div className='col-span-1 flex gap-3 justify-center items-center '>
                <RevisionStar problem={props} revisionList={revisionList} />
            </div>
        </div>
    )
}

export default ProblemCard

