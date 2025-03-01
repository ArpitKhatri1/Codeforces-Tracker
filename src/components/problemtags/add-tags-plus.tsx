"use client"
import React, { useState } from 'react'
import { Plus } from 'lucide-react'
import { Button } from "@/components/ui/button"
import axios from 'axios'
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { usePersonalTagStore } from '@/store/personal-tag-store'
import { userProblemListResult } from '@/types'
import crypto from 'crypto'
import { useRef } from 'react'
import { useRouter } from 'next/navigation'
import { useproblemTagStore } from '@/store/problem-store'
const AddTagsPlus = ({ problem }: { problem: userProblemListResult }) => {
    const router = useRouter()
    let [openState, setOpenState] = useState(false)
    const state = useRef<number>(0);
    const tagData = useproblemTagStore((store) => store.problemTags)
    const filteredTagData = tagData.filter((data) => data.problemId === problem.id)
    console.log(filteredTagData)
    const tags = usePersonalTagStore((store) => store.tags)

    const [selectedTags, setSelectedTags] = useState<string[]>(filteredTagData.length > 0 ? filteredTagData[0].tags : [])

    const toggleTag = (tagName: string) => {
        if (selectedTags.includes(tagName)) {
            setSelectedTags((prev) => {
                return prev.filter((tag) => tag !== tagName)
            })
        } else {
            setSelectedTags((prev) => {
                return [...prev, tagName]
            })
        }
    }

    const submitTags = async () => {
        try {
            if (state.current === 0) {
                await axios.post("/api/problemtag", {
                    problemId: problem.id,
                    tagNames: selectedTags,
                })
                state.current += 1;
                console.log(state.current)
            } else {
                await axios.patch("/api/problemtag", {
                    problemId: problem.id,
                    tagNames: selectedTags,
                })
            }
            setOpenState(false)
            router.refresh()

        } catch (error) {
            console.error("Error adding tags:", error)
        }
    }

    return (
        <Popover open={openState} onOpenChange={setOpenState}>
            <PopoverTrigger asChild>
                <div className="cursor-pointer" onClick={() => { setOpenState(true) }}><Plus /></div>
            </PopoverTrigger>
            <PopoverContent className="w-80">
                <div className="grid gap-4">
                    <div className="space-y-2">
                        <h4 className="font-medium leading-none">Add Custom Tags to the Problem</h4>
                        <p className="text-sm text-muted-foreground">
                            Select multiple tags below
                        </p>
                    </div>
                    <div className="flex flex-wrap gap-4">
                        {tags.map((ele) => (
                            <div
                                key={ele.id}
                                className={`px-3 rounded-lg py-1 cursor-pointer 
                                    ${selectedTags.includes(ele.name) ? "bg-rose-500 text-white" : "bg-rose-100"}`}
                                onClick={() => toggleTag(ele.name)}
                            >
                                {ele.name}
                            </div>
                        ))}
                    </div>
                    <Button onClick={submitTags} disabled={selectedTags.length === 0}>
                        Save Tags
                    </Button>
                </div>
            </PopoverContent>
        </Popover>
    )
}

export default AddTagsPlus

