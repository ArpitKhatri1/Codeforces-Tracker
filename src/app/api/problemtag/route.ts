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

export async function POST(req: Request) {
  try {
    const profile = await getUserProfile();
    const { problemId, tagNames } = await req.json();
    console.log(problemId, tagNames);

    if (!profile) {
      return new NextResponse("unauthorized", { status: 401 });
    }

    const response = await prisma.personalTagsOnProblems.create({
      data: {
        userId: profile.id,
        problemId: problemId,
        tags: [...tagNames],
      },
    });

    return NextResponse.json({
      msg: "Tags created",
      payload: response,
    });
  } catch (e) {
    console.error(e);
    return new NextResponse("Error creating tags: " + e, { status: 500 });
  }
}

export async function PATCH(req: Request) {
  try {
    const profile = await getUserProfile();
    const { problemId, tagNames } = await req.json();
    if (!profile) {
      return new NextResponse("unauthoriszed", { status: 400 });
    }
    const response = await prisma.personalTagsOnProblems.update({
      where: {
        userId_problemId: {
          userId: profile.id,
          problemId: problemId,
        },
      },
      data: {
        tags: [...tagNames],
      },
    });

    return NextResponse.json({
      msg: "Tags updated",
      payload: response,
    });
  } catch {
    return new NextResponse("error updating tags", { status: 500 });
  }
}
