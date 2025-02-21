import { prisma } from "@/lib/db";
import { NextResponse } from "next/server";
import { getUserProfile } from "@/utils/getUserProfile";
export async function GET(req: Request) {
  const cookies = req.headers.get("cookie");
  const match = cookies?.match(/CFTrackerID=([^;]+)/);
  const handle = match ? match[1] : null;
  console.log("The handle here is " + handle);
  if (!handle) {
    return new NextResponse("handle not found,plaease login ", { status: 400 });
  }
  const profile = await getUserProfile(handle);
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
