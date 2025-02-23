"use client"
import { useState, useEffect } from 'react'
import axios from 'axios'
import { ContestListType } from '@/types'
type revisionList = {
    userId: number;
    problemId: number;
    problemContestId: number;
}[]
const useRevisionList = () => {
    const handle = localStorage.getItem("CFTrackerId")
    const [revisionList, setRevisionList] = useState<revisionList | null>(null)
    const [loading, setLoading] = useState<boolean>(true)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        const getRevisionList = async () => {
            try {
                const response = await axios.get("/api/revision")
                setRevisionList(response.data.payload)
                setLoading(false)
            } catch (e: any) {
                setError("There was an error fetching the contest list.")
                setLoading(false)
                console.error("Error:", e)
            }
        }
        getRevisionList()
    }, [])

    return { revisionList, loading, error }
}

export default useRevisionList

