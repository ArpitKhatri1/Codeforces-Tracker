import { NextResponse } from "next/server";
import { getUserProfile } from "@/utils/getUserProfile";
import { prisma } from "@/lib/db";
import { redirect } from "next/navigation";
export async function POST(req: Request) {
  const reqData = await req.json();
  const profile = await getUserProfile();
  if (!profile) {
    redirect("/");
  }
  const alreadyExist = await prisma.personalTags.findFirst({
    where: {
      name: reqData.tagName.toLowerCase(),
      userId: profile.id,
    },
  });

  if (alreadyExist) {
    return NextResponse.json({
      createdTag: alreadyExist,
    });
  }

  const createdTag = await prisma.personalTags.create({
    data: {
      name: reqData.tagName.toLowerCase(),
      userId: profile.id,
    },
  });

  return NextResponse.json({
    createdTag: createdTag,
  });
}
