"use client"
import SolvingStats from '@/components/dashboard/solving-stats'
import { useUserProblemList } from '@/hooks/useUserProblemList'
import { DifficultyDistribution, LastSevenDaysBar, TagDistribution } from '@/lib/dashboard/helper-functions'
import React from 'react'

const DashbaordPage = () => {
    const userHandle = localStorage.getItem("CFTrackerID")
    if (!userHandle) {
        return
    }
    const { response } = useUserProblemList(userHandle)

    if (!response || !response.result) {
        return;
    }

    const sevenDayProgressBars = LastSevenDaysBar(response?.result)
    if (!sevenDayProgressBars) {
        return
    }

    return (
        <div className='p-5 w-full flex justify-center h-screen'>
            <div className='max-w-[1440px] min-h-screen w-full flex flex-col gap-5 py-10'>
                <SolvingStats problemList={response.result} />
            </div>
        </div >
    )
}

export default DashbaordPage

