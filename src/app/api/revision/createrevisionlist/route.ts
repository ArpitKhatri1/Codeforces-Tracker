import { NextResponse } from "next/server";
import { userProblemListResult } from "@/types";
import { prisma } from "@/lib/db";
import { getUserProfile } from "@/utils/getUserProfile";
export async function POST(req: Request) {
  const cookies = req.headers.get("cookie");
  const match = cookies?.match(/CFTrackerID=([^;]+)/);
  const handle = match ? match[1] : null;
  console.log("The handle here is " + handle);
  if (!handle) {
    return new NextResponse("handle not found,plaease login ", { status: 400 });
  }
  const profile = await getUserProfile(handle);
  if (!profile) {
    return new NextResponse("profile must exist", { status: 400 });
  }
  const data = await req.json();
  const problem: userProblemListResult = data.payload;
  if (!problem) {
    return new NextResponse("problem must exist", { status: 400 });
  }

  const alreadyCreated = await prisma.userRevisionProblems.findFirst({
    where: {
      userId: profile.id,
      problemId: problem.id,
    },
  });

  if (alreadyCreated) {
    return NextResponse.json({ payload: alreadyCreated });
  }

  const createdObject = await prisma.userRevisionProblems.create({
    data: {
      userId: profile.id,
      problemContestId: problem.contestId,
      problemId: problem.id,
    },
  });

  return NextResponse.json({ payload: createdObject });
}
