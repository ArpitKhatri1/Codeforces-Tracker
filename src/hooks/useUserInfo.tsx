"use client"

import { useState, useEffect } from "react"
import UserProfile from "@/components/user/user-profile"
import { UserProfileResponse } from "@/types"

const useUserInfo = () => {
    const handle = localStorage.getItem("CFTrackerID")
    let [userInfo, setUserInfo] = useState<UserProfileResponse | null>(null)
    let [isLoading, setIsLoading] = useState<boolean>(false)
    let [error, setError] = useState<string>("")
    useEffect(() => {
        const handleUserInfo = async () => {
            setIsLoading(true)
            try {
                const response = await fetch(`https://codeforces.com/api/user.info?handles=${handle}&checkHistoricHandles=false`)
                const data: UserProfileResponse = await response.json()
                setUserInfo(data)
            } catch {
                setError("There was some error fetch user data")
            } finally {
                setIsLoading(false)
            }
        }
        handleUserInfo()
    }, [])

    return { userInfo, isLoading, error }
}
export default useUserInfo