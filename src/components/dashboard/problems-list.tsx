"use client";
import React from "react";
import { useUserProblemList } from "@/hooks/useUserProblemList";
import ProblemCard from "../problem-card";
import useFilterByTag from "@/hooks/useFilterByTag";

const ProblemList = () => {
    const handle = localStorage.getItem("CFTrackerID") as string;
    const { response } = useUserProblemList(handle);

    // Filter problems by tag
    const tagFilteredResponse = useFilterByTag(response);
    const dateFilteredResponse = useFilterByTag(tagFilteredResponse)

    return (
        <div>
            {response ? (
                <div className="flex flex-col border-[1px] border-solid border-neutral-400">
                    {dateFilteredResponse?.result?.map((ele, key) => (
                        <div key={key}>
                            <ProblemCard
                                name={ele.problem.name}
                                tags={ele.problem.tags}
                                contestId={ele.contestId}
                                contestWord={ele.problem.index}
                                date={ele.creationTimeSeconds}
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

