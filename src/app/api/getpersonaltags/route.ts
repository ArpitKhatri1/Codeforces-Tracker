import { prisma } from "@/lib/db";
import { getUserProfile } from "@/utils/getUserProfile";
import { NextResponse } from "next/server";
export async function GET() {
  const profile = await getUserProfile();
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
