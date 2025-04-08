"use client";
import { useState, useEffect } from "react";
import React from "react";
import ProblemCard from "./problem-card";
import useFilterByTag from "@/hooks/useFilterByTag";
import useRevisionList from "@/hooks/useRevisionList";
import usePersonalTags from "@/hooks/usePersonalTags";
import useProblemTags from "@/hooks/useProblemTag";
import axios from 'axios'
import { ContestListType, RevisionListType, userProblemList } from "@/types";

type ProblemListProps = {
    response: userProblemList,
    contestList: ContestListType[],
    revisionList: RevisionListType[]
    snippets: snippetType
}

type snippetType = {
    userId: number;
    problemId: number;
    snippetText: string;
}[]
const ProblemList = ({ snippets, response, contestList, revisionList }: ProblemListProps) => {

    usePersonalTags()
    useProblemTags()

    const dateFilteredResponse = useFilterByTag(response)
    useEffect(() => {
        const postData = async () => {
            if (!response) {
                return
            }
            const data = await axios.post("/api/solvedproblem", response)
        }
        postData()
        console.log("called")
    }, [response])

    return (
        <div>
            {response ? (
                <div className="flex flex-col border-[1px] border-solid border-neutral-400">
                    {dateFilteredResponse?.result?.map((ele, key) => (
                        <div key={key}>
                            <ProblemCard
                                props={ele}
                                contestList={contestList}
                                revisionList={revisionList}
                                snippets={snippets}
                            />
                        </div>
                    ))}
                </div>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
};

export default ProblemList;

