"use client"
import { userProblemList } from "../app/types";
import { useEffect, useState } from "react";
import { userProblemListResult } from "../app/types";

export const useUserProblemList = (handle: string) => {
  const [response, setResponse] = useState<userProblemList | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const handleFetchList = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const res = await fetch(`https://codeforces.com/api/user.status?handle=${handle}&from=1`)
        const data: userProblemList = await res.json()
        const filteredData = data.result.filter((element) => element.verdict === "OK")
        setResponse({ status: data.status, result: filteredData });
      } catch {
        setError("something went wrong with fetching users problem list")
      } finally {
        setIsLoading(false);
      }
    }
    handleFetchList()
  }, [])

  return { response, isLoading, error }

};
