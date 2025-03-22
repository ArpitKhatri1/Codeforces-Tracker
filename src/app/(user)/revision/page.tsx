
import useRevisionList from '@/hooks/useRevisionList';
import { useUserProblemList } from '@/hooks/useUserProblemList';
import React, { useReducer } from 'react'
import ProblemCard from '@/components/problem-card';
import { fetchProblems } from '@/lib/api-handlers';
import { getUserProfile } from '@/utils/getUserProfile';
import { prisma } from '@/lib/db';
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

    return (
        <div>
            {JSON.stringify(newList)}
        </div>
    )
}

export default Revision

