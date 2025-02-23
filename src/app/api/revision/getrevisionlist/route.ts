import { getUserProfile } from "@/utils/getUserProfile";
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
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
