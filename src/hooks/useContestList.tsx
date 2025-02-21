"use client"
import { useState, useEffect } from 'react'
import axios from 'axios'
import { ContestListType } from '@/types'

type ContestResponse = {
    status: string;
    result: ContestListType[];
}

const useContestList = () => {
    const [contestList, setContestList] = useState<ContestResponse | null>(null)
    const [loading, setLoading] = useState<boolean>(true)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        const getContestList = async () => {
            try {
                const response = await axios.get<ContestResponse>("https://codeforces.com/api/contest.list")
                setContestList(response.data)
                setLoading(false)
            } catch (e: any) {
                setError("There was an error fetching the contest list.")
                setLoading(false)
                console.error("Error:", e)
            }
        }
        getContestList()
    }, [])

    return { contestList, loading, error }
}

export default useContestList

