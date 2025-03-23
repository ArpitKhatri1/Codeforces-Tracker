"use client"
import React from 'react'
import { NotepadText } from 'lucide-react'
import { motion } from 'framer-motion'
import SnippetEditor from './snippet-editor'
import { useState } from 'react'
import { userProblemListResult } from '@/types'
import { cn } from '@/lib/utils'
const NotePad = ({ problem, divDisplay, colourful }: { problem: userProblemListResult, divDisplay: string, colourful: boolean }) => {
    const [isOpen, setIsOpen] = useState(false);
    const variants = {
        open: { x: 0, opacity: 1, transition: { duration: 0.2 } },
        closed: { x: "1000px", opacity: 0, transition: { duration: 0.2 } },
    }

    return (
        <div className=''>
            <NotepadText onClick={() => setIsOpen(true)} className={cn(colourful ? "text-emerald-500" : "")} />
            {isOpen ? (
                <div className='absolute inset-0 w-screen h-screen z-0 bg-neutral-800/30'>

                </div>
            ) : ""}
            <motion.div
                initial={false}
                animate={isOpen ? "open" : "closed"}
                style={{ display: isOpen ? "block" : "none" }}
                variants={variants}
                className='absolute top-0 right-0'
            >
                <SnippetEditor setIsOpen={setIsOpen} problem={problem} divDisplay={divDisplay} openState={isOpen} />
            </motion.div>
        </div>

    )
}

export default NotePad

