import { prisma } from "@/lib/db";
import { getUserProfile } from "@/utils/getUserProfile";
import { NextResponse } from "next/server";
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
    return new NextResponse("profile not found", { status: 404 });
  }

  const tags = await prisma.personalTags.findMany({
    where: {
      userId: profile.id,
    },
  });

  return NextResponse.json({ tags: tags });
}
