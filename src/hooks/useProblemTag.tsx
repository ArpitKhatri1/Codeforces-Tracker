"use client"
import { useState, useEffect } from "react"
import UserProfile from "@/components/user/user-profile"
import { UserProfileResponse } from "@/types"
import axios from "axios"
import { usePersonalTagStore } from "@/store/personal-tag-store"
const useProblemTags = () => {

    useEffect(() => {
        const handleProblemTags = async () => {
            try {
                const response = await axios.get(`/api/problemtag/`)
                const data = await response.data

            } catch {
                console.log("There was some error fetch user data")
            }
        }
        handleProblemTags()
    }, [])

    return;
}
export default useProblemTags

