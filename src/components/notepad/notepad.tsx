"use client"
import React from 'react'
import { NotepadText } from 'lucide-react'
import { motion } from 'framer-motion'
import SnippetEditor from './snippet-editor'
import { useState } from 'react'
const NotePad = () => {
    const [isOpen, setIsOpen] = useState(false);
    const variants = {
        open: { x: 0, opacity: 1, transition: { duration: 0.2 } },
        closed: { x: "1000px", opacity: 0, transition: { duration: 0.2 } },
    }
    return (
        <div>
            <NotepadText onClick={() => setIsOpen(true)} />
            <motion.div
                initial={false}
                animate={isOpen ? "open" : "closed"}
                variants={variants}
                className='absolute top-0 right-0'
            >
                <SnippetEditor setIsOpen={setIsOpen} />
            </motion.div>
        </div>

    )
}

export default NotePad

