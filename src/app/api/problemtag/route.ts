import { prisma } from "@/lib/db";
import { NextResponse } from "next/server";
import { getUserProfile } from "@/utils/getUserProfile";
export async function GET(req: Request) {
  const profile = await getUserProfile();
  if (!profile) {
    return new NextResponse("unauthoriszed", { status: 400 });
  }
  const response = await prisma.personalTagsOnProblems.findMany({
    where: {
      userId: profile.id,
    },
  });

  return NextResponse.json({
    payload: response,
  });
}
