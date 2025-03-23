"use client"

import React, { ChangeEvent } from 'react'
import axios from 'axios'
import { X } from 'lucide-react'
import { userProblemListResult } from '@/types'
import { Textarea } from '../ui/textarea'

type snippetEditorProps = {
    setIsOpen: (value: boolean) => void,
    problem: userProblemListResult,
    divDisplay: string
    openState: boolean
}
import { useState, useEffect } from 'react'
const SnippetEditor = ({ setIsOpen, problem, divDisplay, openState }: snippetEditorProps) => {
    let [snippetValue, setSnippetValue] = useState("")
    let [isPatchRequest, setIsPatchRequest] = useState(false)

    useEffect(() => {
        if (!openState) {
            return
        }
        const fetchSnippet = async () => {
            const res = await axios.get(`/api/snippets/${problem.id}`)
            const data = await res.data
            console.log("the fetched data is ", data)
            if (data === null) {
                setSnippetValue("")
            } else {
                setSnippetValue(data.snippetText)
                setIsPatchRequest(true)
            }
        }
        fetchSnippet()
    }, [openState])

    const handleTextChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
        e.preventDefault()
        setSnippetValue(e.target.value)
    }
    const handleSave = () => {
        if (isPatchRequest) {
            axios.patch(`/api/snippets/${problem.id}`, { snippetText: snippetValue })
        } else {
            axios.post("/api/snippets", { snippet: snippetValue, problemId: problem.id })
        }

        setIsOpen(false)
    }
    const handleDelete = () => {
        axios.delete(`/api/snippets/${problem.id}`)
        setIsOpen(false)
    }
    return (
        <div className='h-screen w-[1000px] bg-white pointer flex pt-5 flex-col z-50' >
            <header className='flex w-full items-center h-fit border-solid border-b-2 border-black pb-2 px-5'>
                <div >
                    <div className='font-bold text-2xl'>
                        {problem.problem.name}
                    </div>
                    <div className='text-xl text-muted-foreground'>
                        {divDisplay}-{problem.problem.index}
                    </div>
                </div>
                <div onClick={() => setIsOpen(false)} className='hover:cursor-pointer ml-auto w-10 h-10' >
                    <X />
                </div>
            </header>
            <main className='p-5 h-full border-b-2 border-black'>
                <Textarea value={snippetValue} onChange={handleTextChange} className='h-full text-lg' placeholder='Write you snippets here' />
            </main>
            <footer className='flex justify-end py-5 px-5 gap-3'>
                <div className=' p-2 rounded-lg bg-red-500 text-white' onClick={handleDelete}>
                    Delete
                </div>
                <div className='bg-black text-white p-2 px-3 rounded-lg' onClick={handleSave}>
                    Save
                </div>
            </footer>

        </div >
    )
}

export default SnippetEditor

