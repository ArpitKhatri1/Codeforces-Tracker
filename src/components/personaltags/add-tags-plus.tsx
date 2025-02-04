"use client"
import React from 'react'
import { Plus } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import axios from 'axios'
import { Label } from "@/components/ui/label"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { useEffect } from 'react'
import { usePersonalTagStore } from '@/store/personal-tag-store'
import { userProblemListResult } from '@/types'
const AddTagsPlus = ({ problem }: { problem: userProblemListResult }) => {
    let tags = usePersonalTagStore((store) => store.tags)

    const handleClick = async (tagName: string) => {
        const reponse = await axios.post("/api/addproblemtag", { payload: { problemId: problem.id, tagName: tagName } })
    }

    return (
        <Popover>
            <PopoverTrigger asChild>
                <div ><Plus /></div>
            </PopoverTrigger>
            <PopoverContent className="w-80">

                <div className="grid gap-4">
                    <div className="space-y-2">
                        <h4 className="font-medium leading-none">Add Custom Tags to the problem</h4>
                        <p className="text-sm text-muted-foreground">
                            Select from the following tags below
                        </p>
                    </div>
                    <div className="">
                        <div className="flex flex-wrap gap-4">
                            {tags.map((ele) => (
                                <div key={ele.id} className=' px-3 rounded-lg py-1 bg-rose-100' onClick={() => handleClick(ele.name)}>
                                    {ele.name}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </PopoverContent>
        </Popover>
    )
}

export default AddTagsPlus

