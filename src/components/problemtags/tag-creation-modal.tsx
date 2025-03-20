"use client"
import React from 'react'
import { Plus } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { useRef } from 'react'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import axios from 'axios'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
const TagCreationModal = () => {
    const router = useRouter()
    let [openState, setOpenState] = useState(false)
    const inputRef = useRef<HTMLInputElement | null>(null)

    const createTag = async () => {
        if (!inputRef || !inputRef.current?.value) {
            return;
        }
        const response = await axios.post("/api/personaltags", { tagName: inputRef.current.value })
        setOpenState(false)
        router.refresh()
    }

    return (

        <Dialog open={openState}>
            <DialogTrigger onClick={() => { setOpenState(true) }}>
                <div className='bg-red-500 rounded-full text-white h-20 w-20 absolute bottom-10 right-10 flex justify-center items-center'>
                    <Plus className='w-14 h-14' />
                </div>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Add Custom tags</DialogTitle>
                    <DialogDescription>
                        Add customs tags which you can put on questions for more stuctured revision
                    </DialogDescription>
                </DialogHeader>
                <div className="pb-2 space-y-1">
                    <div className=" gap-4">
                        <Label htmlFor="name" className="text-right ">
                            Name
                        </Label>
                        <Input id="name" className="col-span-3" placeholder='Name of Tag' ref={inputRef} />
                    </div>
                </div>
                <DialogFooter>
                    <Button onClick={createTag} >Create</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}

export default TagCreationModal

