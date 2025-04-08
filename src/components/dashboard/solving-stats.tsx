import { AverageDifficultyOfProblemSolved, DifficultyDistribution, LastSevenDaysBar, TotalSolvedProblems } from '@/lib/dashboard/helper-functions'
import { userProblemListResult } from '@/types'
import React from 'react'

const SolvingStats = ({ problemList }: { problemList: userProblemListResult[] }) => {
    const totalSolved = TotalSolvedProblems(problemList)
    const averageDifficulty = AverageDifficultyOfProblemSolved(problemList)
    const sevenDayProgressBars = LastSevenDaysBar(problemList)
    if (!sevenDayProgressBars) {
        return
    }
    const difficultyDistribution = DifficultyDistribution(problemList)
    if (!difficultyDistribution) {
        return;
    }
    const ratingKeys = Object.keys(difficultyDistribution)
    console.log(difficultyDistribution[ratingKeys[0]])

    console.log(ratingKeys)
    return (
        <div className='w-full flex flex-col gap-10 border-2 border-solid border-t-0 border-gray-200 rounded-xl p-6 shadow-lg'>
            <div className='text-2xl font-bold'>
                Solving Statistics
            </div>
            <div className='grid grid-cols-4 gap-10'>
                <div className='bg-blue-200 h-28 rounded-xl p-5 space-y-1'>
                    <div className='text-gray-500'>

                        Total Problems
                    </div>
                    <div className='text-blue-700 font-bold text-4xl'>
                        {totalSolved}
                    </div>
                </div>
                <div className='bg-emerald-200 h-28 rounded-xl p-5 space-y-1'>
                    <div className='text-gray-500'>

                        Average Difficulty
                    </div>
                    <div className='text-emerald-700 font-bold text-4xl '>
                        {averageDifficulty}
                    </div>
                </div>
                <div className='bg-purple-200 h-28 rounded-xl p-5 space-y-1' >
                    <div className='text-gray-500'>
                        Current Streak
                    </div>
                    <div className='text-purple-700 font-bold text-4xl '>
                        246
                    </div>
                </div>
                <div className='bg-orange-200 h-28 rounded-xl p-5 space-y-1'>
                    <div className='text-gray-500'>

                        Contest Rating
                    </div>
                    <div className='text-orange-700 font-bold text-4xl '>
                        246
                    </div>
                </div>
            </div>
            <div className='flex gap-3 flex-col'>
                <div className='text-xl font-bold'>
                    Difficulty Distribution
                </div>
                <div>
                    <div className='space-y-3'>
                        {
                            ratingKeys.map((key, index) => {
                                const percentageWidth = difficultyDistribution[key][0] / totalSolved
                                const percentage = Math.floor(percentageWidth * 100)
                                if (!percentage) {
                                    return
                                }
                                return (
                                    <div className='flex gap-3 items-center' key={index}>
                                        <div className='w-[100px]'>
                                            {key}
                                        </div>

                                        <div className='w-[90%] bg-slate-100 h-6 rounded-xl overflow-hidden'>
                                            <div className={`bg-green-500  h-full`} style={{ width: `${percentage}%` }}>

                                            </div>

                                        </div>
                                    </div>
                                )
                            })
                        }

                    </div>

                </div>
            </div>
            <div>
                <div className='text-xl font-bold'>
                    Problem Tags
                </div>
                <div>
                    {/* tags goes here */}
                </div>
            </div>
            <div className='flex flex-col gap-3'>
                <div className='text-xl font-bold'>
                    Weekly Progress
                </div>
                <div className='grid grid-cols-7 gap-3 h-10'>
                    {
                        sevenDayProgressBars.map((progress, index) => {
                            return (
                                <div key={index} className={`${progress}`} >

                                </div>
                            )
                        })
                    }
                    {/* progrss bar goes here */}
                </div>
                <div className='text-center mt-4 text-muted-foreground'>
                    Last 7 Days Activity
                </div>
            </div>
        </div>
    )
}

export default SolvingStats

