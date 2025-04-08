
import useRevisionList from '@/hooks/useRevisionList';
import { useUserProblemList } from '@/hooks/useUserProblemList';
import React, { useReducer } from 'react'
import ProblemCard from '@/components/problems/problem-card';
import { fetchProblems } from '@/lib/api-handlers';
import { getUserProfile } from '@/utils/getUserProfile';
import { prisma } from '@/lib/db';
import TagsFilter from '@/components/problems/tags-filter';
import DateFilter from '@/components/problems/date-filter';
import RevisionListPageComponent from '@/components/revision/revision-list-page';
import { ContestListType } from '@/types';
const fetchContest = async (): Promise<ContestListType[] | null> => {
    try {
        const res = await fetch('https://codeforces.com/api/contest.list', {
            cache: "no-store"
        })
        if (!res.ok) {
            throw new Error("Failed to fetch problems");
        }
        const data: ContestResponse = await res.json()
        return data.result
    } catch (error) {
        console.error("Error fetching problems:", error);
        return null;
    }
}
type ContestResponse = {
    status: string;
    result: ContestListType[];
}

const Revision = async () => {
    const profile = await getUserProfile()
    if (!profile) {
        return (
            <div>
                no profile found
            </div>
        )
    }
    const response = await fetchProblems(profile.handle)
    const revisionList = await prisma.userRevisionProblems.findMany({
        where: {
            userId: profile.id
        }
    })

    const newList = response?.result.filter((problem) => {
        let present = false;
        revisionList.forEach((revisonProblem) => {
            if (revisonProblem.problemId === problem.id) {
                present = true;
            }
        })
        return present
    })
    const contestList = await fetchContest();
    if (!contestList) {
        return <p>There was some Error</p>
    }

    const snippets = await prisma.problemSnippet.findMany({
        where: {
            userId: profile.id
        }
    })

    return (
        <div className="h-full w-full p-5 flex justify-center">
            <div className="max-w-[1500px] w-full h-fit border-2 border-solid border-slate-200 rounded-xl overflow-y-hidden">
                <div className="flex items-center mb-5 p-5 bg-emerald-100">
                    <div className="text-4xl font-bold my-3">Revision Problems</div>
                    <div className="flex gap-2 ml-auto items-center">
                        <TagsFilter />
                        <DateFilter />
                    </div>
                </div>
                <div className="p-5">
                    <div className="grid grid-cols-10 w-full border-[1px] border-neutral-400 rounded-t-xl text-center font-semibold text-lg">
                        <div className="col-span-3 p-2">Problem</div>
                        <div className="col-span-1 p-2">Division</div>
                        <div className="col-span-3 p-2">Tags</div>
                        <div className="col-span-2 p-2">Mark Complete</div>
                        <div className="col-span-1 p-2">Snippets</div>

                    </div>
                    <div className="w-full">
                        {
                            newList ? newList.map((ele, key) => {
                                return (
                                    <RevisionListPageComponent props={ele} contestList={contestList} snippets={snippets} key={key} />
                                )
                            })

                                : ""
                        }
                        {/* {finalResponse ? <ProblemList snippets={snippets} response={finalResponse} contestList={contestList} revisionList={revisionListDetails} /> : <p className="text-center text-gray-500">No solved problems found.</p>} */}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Revision

