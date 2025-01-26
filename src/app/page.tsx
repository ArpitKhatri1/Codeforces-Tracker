"use client"
import { Input } from "@/components/ui/input"

import { redirect } from "next/navigation"
export default function Home() {
  const handleClick = () => {
    redirect("/dashboard")
  }
  return (
    <main className="min-h-screen flex flex-col  ">
      <div className=" flex flex-col items-center justify-center max-w-5xl mx-auto px-4">
        <div className="w-full space-y-8">
          <div className="text-center space-y-5 mt-40 mb-40 ">
            <h1 className="text-5xl font-bold ">Welcome to Codeforces</h1>
            <p className="text-muted-foreground text-xl">Track your problem solving journey</p>
          </div>

          <div className="space-y-4">
            <div

              className=" font-medium -mb-1"
            >
              Enter your Codeforces handle
            </div>
            <Input id="handle" placeholder="johndoe" className="w-full text-xl h-12 " />
            <div className="w-full bg-blue-500  text-white p-3 rounded-xl" onClick={handleClick}>Get Started</div>
          </div>

        </div>
      </div>
    </main>
  )
}

