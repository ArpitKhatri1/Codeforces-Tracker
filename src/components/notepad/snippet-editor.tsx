"use client"

import React from 'react'

type snippetEditorProps = {
    setIsOpen: (value: boolean) => void
}
import { X } from 'lucide-react'

const SnippetEditor = ({ setIsOpen }: snippetEditorProps) => {
    return (
        <div className='h-screen w-[1000px] bg-neutral-100 pointer' >
            <div onClick={() => setIsOpen(false)} className='hover:cursor-pointer'>
                <X />
            </div>
            <div>

            </div>
        </div >
    )
}

export default SnippetEditor

