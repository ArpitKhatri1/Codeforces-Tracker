import React from "react";
import ProblemList from "@/components/dashboard/problems-list";
import TagsFilter from "@/components/dashboard/tags-filter";
import DateFilter from "@/components/dashboard/date-filter";
import { ContestListType, userProblemList } from "@/types";
import { getUserProfile } from "@/utils/getUserProfile";
import { prisma } from "@/lib/db";
import { fetchProblems } from "@/lib/api-handlers";

type ContestResponse = {
    status: string;
    result: ContestListType[];
}

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

const Dashboard = async () => {
    const userData = await getUserProfile();
    if (!userData) {
        return <p className="text-center text-red-500 p-5">User profile not found.</p>;
    }

    const finalResponse = await fetchProblems(userData.handle);
    const contestList = await fetchContest();
    if (!contestList) {
        return <p> Cant fetch Contest</p>
    }

    const revisionListDetails = await prisma.userRevisionProblems.findMany({
        where: {
            userId: userData.id,
        }
    })

    const snippets = await prisma.problemSnippet.findMany({
        where: {
            userId: userData.id
        }
    })

    return (
        <div className="h-full w-full p-5 flex justify-center">
            <div className="max-w-[1440px] w-full h-fit border-2 border-solid border-slate-200 rounded-xl overflow-y-hidden">
                <div className="flex items-center mb-5 p-5 bg-emerald-100">
                    <div className="text-4xl font-bold my-3">Solved Problems</div>
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
                        <div className="col-span-1 p-2">Solved on</div>
                        <div className="col-span-1 p-2">Actions</div>
                        <div className="col-span-1 p-2">Snippets</div>
                    </div>
                    <div className="w-full">
                        {finalResponse ? <ProblemList snippets={snippets} response={finalResponse} contestList={contestList} revisionList={revisionListDetails} /> : <p className="text-center text-gray-500">No solved problems found.</p>}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;

