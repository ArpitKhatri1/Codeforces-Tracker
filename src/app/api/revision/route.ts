import { getUserProfile } from "@/utils/getUserProfile";
import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { userProblemListResult } from "@/types";
export async function POST(req: Request) {
  const profile = await getUserProfile();
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

export async function GET(req: Request) {
  const profile = await getUserProfile();

  if (!profile) {
    return new NextResponse("Profile is not present", { status: 400 });
  }

  try {
    const revisionList = await prisma.userRevisionProblems.findMany({
      where: {
        userId: profile.id,
      },
    });

    return NextResponse.json({ payload: revisionList });
  } catch (e) {
    return new NextResponse(`erro ${e}`);
  }
}
