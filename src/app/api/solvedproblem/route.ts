import { NextResponse } from "next/server";
import { userProblemList } from "@/types";
import { prisma } from "@/lib/db";
import { getUserProfile } from "@/utils/getUserProfile";
export async function POST(req: Request) {
  const profile = await getUserProfile();
  if (!profile) {
    return new NextResponse("unauthorized", { status: 400 });
  }
  const data: userProblemList = await req.json();
  const dataArray = data.result;
  const finalData = dataArray.map((value) => ({
    id: value.id,
    userId: profile.id,
  }));
  const response = await prisma.problem.createMany({
    data: finalData,
    skipDuplicates: true,
  });
  return NextResponse.json({ data: data });
}
