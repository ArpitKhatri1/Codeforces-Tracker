"use client";
import { useState, useEffect } from "react";
import React from "react";
import { useUserProblemList } from "@/hooks/useUserProblemList";
import ProblemCard from "../problem-card";
import useFilterByTag from "@/hooks/useFilterByTag";
import useContestList from "@/hooks/useContestList";
import useRevisionList from "@/hooks/useRevisionList";
import usePersonalTags from "@/hooks/usePersonalTags";
import useProblemTags from "@/hooks/useProblemTag";
const ProblemList = () => {
    const handle = localStorage.getItem("CFTrackerID") as string;
    console.log("The handle here is ", handle)
    const { response } = useUserProblemList(handle);
    const { contestList } = useContestList()
    const { revisionList } = useRevisionList();
    usePersonalTags()
    useProblemTags()

    const tagFilteredResponse = useFilterByTag(response);
    const dateFilteredResponse = useFilterByTag(response)

    return (
        <div>
            {response ? (
                <div className="flex flex-col border-[1px] border-solid border-neutral-400">
                    {dateFilteredResponse?.result?.map((ele, key) => (
                        <div key={key}>
                            <ProblemCard
                                props={ele}
                                contestList={contestList?.result}
                                revisionList={revisionList}
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

