import { getUserProfile } from "@/utils/getUserProfile";
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
export async function GET(req: Request) {
  const cookies = req.headers.get("cookie");

  const match = cookies?.match(/CFTrackerID=([^;]+)/);
  console.log("The cookies are " + cookies);
  const handle = match ? match[1] : null;
  if (!handle) {
    return new NextResponse("handle not found,plaease login ", { status: 400 });
  }
  const profile = await getUserProfile(handle);

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
