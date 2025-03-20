"use client"

import { useState, useEffect } from "react"
import UserProfile from "@/components/user/user-profile"
import { UserProfileResponse } from "@/types"
import axios from "axios"
import { usePersonalTagStore } from "@/store/personal-tag-store"
const usePersonalTags = () => {
    const setPersonalTag = usePersonalTagStore((store) => store.setPersonalTag)
    useEffect(() => {
        const handlePersonalTags = async () => {
            try {
                const response = await axios.get(`/api/personaltags`)
                const data = await response.data
                setPersonalTag(data.tags)
            } catch {
                console.log("There was some error fetch user data")
            }
        }
        handlePersonalTags()
    }, [])

    return;
}
export default usePersonalTags

