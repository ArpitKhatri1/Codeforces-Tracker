import DateFilter from '@/components/dashboard/date-filter'
import TagsFilter from '@/components/dashboard/tags-filter'
import React from 'react'

const Loading = () => {
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
                    <div className="min-h-screen text-center m-10">
                        Loading Problems....
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Loading

