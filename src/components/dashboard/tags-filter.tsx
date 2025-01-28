"use client"
import React, { useEffect, useState } from 'react'
import { Button } from "@/components/ui/button"
import { X } from 'lucide-react'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogClose
} from "@/components/ui/dialog"

import { codeforcesTags } from '../../../constants'
import { useTagStore } from '@/store/tags-store'

const TagsFilter = () => {
    let [tempTags, setTempTags] = useState<string[]>([])
    const addTag = useTagStore((state) => state.addTag)
    const tags = useTagStore((state) => state.tags)

    useEffect(() => {
        setTempTags([...tags])
    }, [])

    function handleTagSelect(tag: string) {
        if (tempTags.includes(tag)) {
            tempTags = tempTags.filter((tags) => tags !== tag)
            setTempTags([...tempTags])
        } else {
            setTempTags((prev) => {
                return [...prev, tag]
            })
        }

    }

    function handleChanges() {
        addTag(tempTags)
    }

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="outline">Add Tags</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[525px]">
                <DialogHeader>
                    <DialogTitle>Add Tags</DialogTitle>
                    <DialogDescription>
                        Filter your solved problems based on Tags
                    </DialogDescription>
                </DialogHeader>
                <div className='flex gap-3 flex-wrap'>
                    {
                        codeforcesTags.map((tag, key) => (
                            <div key={key} onClick={() => handleTagSelect(tag)} className={`p-1  rounded-lg px-3 ${tempTags.includes(tag) ? "bg-black text-white" : "bg-slate-200"}`} >
                                <div className='flex items-center gap-3 cursor-pointer'>
                                    <div>
                                        {tag}
                                    </div>

                                </div>
                            </div>
                        ))
                    }
                </div>
                <DialogFooter>
                    <DialogClose><div onClick={handleChanges} className='p-3 rounded-lg py-2 bg-black text-white'>Save changes</div></DialogClose>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}

export default TagsFilter

