"use client"

import React from 'react'

type snippetEditorProps = {
    setIsOpen: (value: boolean) => void,
    problem: userProblemListResult
}
import { X } from 'lucide-react'
import { userProblemListResult } from '@/types'

const SnippetEditor = ({ setIsOpen, problem }: snippetEditorProps) => {
    return (
        <div className='h-screen w-[1000px] bg-neutral-100 pointer flex p-5' >

            <div className='font-bold'>
                {problem.problem.name}

            </div>
            <div onClick={() => setIsOpen(false)} className='hover:cursor-pointer ml-auto w-10 h-10' >
                <X />
            </div>
        </div >
    )
}

export default SnippetEditor

