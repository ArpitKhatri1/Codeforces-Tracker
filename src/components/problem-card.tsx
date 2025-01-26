
import React from 'react'
type problemCardProps = {
    name: string,
    tags: string[],
    verdict: string,
    date: number
}
import { cn } from '@/lib/utils'
const ProblemCard = ({ name, tags, verdict, date }: problemCardProps) => {
    const submissionDate = new Date(date * 1000)
    const day = submissionDate.getDate();
    const month = submissionDate.getMonth() + 1;
    const year = submissionDate.getFullYear();
    const formattedData = `${day}/${month}/${year}`
    return (
        <div className={cn(`w-full grid grid-cols-10 border-solid border-[1px]  text-black py-3 px-5`)}>
            <div className='col-span-2'>
                {name}
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
                {formattedData}
            </div>
        </div>
    )
}

export default ProblemCard

