import { prisma } from "@/lib/db";
import { NextResponse } from "next/server";
import { getUserProfile } from "@/utils/getUserProfile";
export async function GET(req: Request) {
  const profile = await getUserProfile();

  if (!profile) {
    return new NextResponse("unauthorized", { status: 400 });
  }

  const response = await prisma.problemTags.findMany({
    where: {
      tag: {
        userId: profile.id, // Ensuring only tags associated with the user are fetched
      },
    },
    include: {
      tag: true,
    },
  });

  type TransformedResponse = {
    problemId: number;
    tags: string[];
    userId: number;
  }[];

  type RawResponse = {
    problemId: number;
    tagId: number;
    tag: {
      name: string;
      id: number;
      userId: number;
    };
  }[];

  function transformResponse(
    response: RawResponse,
    userId: number
  ): TransformedResponse {
    const map = new Map<number, { tags: string[] }>();

    response.forEach(({ problemId, tag }) => {
      if (!map.has(problemId)) {
        map.set(problemId, { tags: [] });
      }
      map.get(problemId)!.tags.push(tag.name);
    });

    return Array.from(map, ([problemId, { tags }]) => ({
      problemId,
      tags,
      userId, // Explicitly using profile.id instead of tag.userId
    }));
  }

  const transformedData = transformResponse(response, profile.id);

  return NextResponse.json({
    payload: transformedData,
  });
}

export async function POST(req: Request) {
  try {
    const profile = await getUserProfile();
    const { problemId, tagNames }: { problemId: number; tagNames: string[] } =
      await req.json();

    if (!profile) {
      return new NextResponse("unauthorized", { status: 401 });
    }

    const existingTags = await prisma.personalTags.findMany({
      where: {
        userId: profile.id,
        name: { in: tagNames },
      },
    });

    const existingTagMap = new Map(
      existingTags.map((tag) => [tag.name, tag.id])
    );

    let personalTagData = [...existingTagMap.values()].map((tagId) => ({
      problemId,
      tagId,
    }));

    const response = await prisma.problemTags.createMany({
      data: personalTagData,
      skipDuplicates: true,
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
    const { problemId, tagNames }: { problemId: number; tagNames: string[] } =
      await req.json();

    if (!profile) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    // Find all existing tag IDs for the provided tag names
    const existingTags = await prisma.personalTags.findMany({
      where: {
        userId: profile.id,
        name: { in: tagNames },
      },
    });

    const existingTagIds = existingTags.map((tag) => tag.id);

    // Delete old problemTags for this problemId (clean update)
    await prisma.problemTags.deleteMany({
      where: {
        problemId: problemId,
        tag: {
          userId: profile.id, // Ensure only user's tags are affected
        },
      },
    });

    // Insert new problemTags based on updated tagNames

    await prisma.problemTags.createMany({
      data: existingTagIds.map((tagId) => ({
        problemId,
        tagId,
      })),
      skipDuplicates: true, // Prevent duplicate entries
    });

    return NextResponse.json({
      msg: "Tags updated successfully",
    });
  } catch (error) {
    console.error("Error updating problem tags:", error);
    return new NextResponse("Error updating tags", { status: 500 });
  }
}

export async function DELETE(req: Request) {
  try {
    const profile = await getUserProfile();
    if (!profile) {
      return new NextResponse("unauthoriszed", { status: 400 });
    }

    const { problemId }: { problemId: number } = await req.json();

    const response = await prisma.problemTags.deleteMany({
      where: {
        problemId: problemId,
        tag: {
          userId: profile.id,
        },
      },
    });

    return NextResponse.json({
      msg: "Deletion Successfull",
      payload: response,
    });
  } catch {
    return new NextResponse("error deleting tags", { status: 500 });
  }
}
