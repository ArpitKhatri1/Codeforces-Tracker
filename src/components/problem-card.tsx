import React from 'react'
type problemCardProps = {
    name: string,
    tags: string[],
    contestId: number,
    contestWord: string,
    date: number
}
import { cn } from '@/lib/utils'
import { getProblemDate } from '@/utils/getProblemDate'
import Link from 'next/link'
import { SquareArrowOutUpRight } from 'lucide-react';
const ProblemCard = ({ name, tags, contestId, contestWord, date }: problemCardProps) => {
    const { day, month, year } = getProblemDate(date)

    return (
        <div className={cn(`w-full grid grid-cols-10 border-solid border-[1px]  text-black py-3 px-5`)}>
            <div className='col-span-2 flex gap-2 items-center'>
                <div className=''>
                    {name}
                </div>
                <Link href={`https://codeforces.com/problemset/problem/${contestId}/${contestWord}`} target='/'>
                    <div className=''>
                        <SquareArrowOutUpRight size={18} />

                    </div>
                </Link>
            </div>
            <div className='flex gap-1 col-span-6 ml-auto'>
                {tags.map((ele, key) => {
                    return (
                        <div key={key} className='rounded-xl bg-[#F2F5F1] p-3 py-1'>
                            {ele}
                        </div>
                    )

                })}
            </div>
            <div className='col-span-2 text-center text-muted-foreground mt-1 ml-4'>
                {`${day}/${month}/${year}`}
            </div>
        </div>
    )
}

export default ProblemCard

