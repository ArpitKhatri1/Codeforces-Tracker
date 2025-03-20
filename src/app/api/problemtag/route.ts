import { prisma } from "@/lib/db";
import { NextResponse } from "next/server";
import { getUserProfile } from "@/utils/getUserProfile";

export async function GET(req: Request) {
  const profile = await getUserProfile();

  if (!profile) {
    return new NextResponse("unauthoriszed", { status: 400 });
  }
  const response = await prisma.problemTags.findMany({
    where: {
      tag: {
        userId: profile.id,
      },
    },
    include: {
      tag: true,
    },
  });

  return NextResponse.json({
    payload: response,
  });
}

export async function POST(req: Request) {
  try {
    const profile = await getUserProfile();
    const { problemId, tagNames }: { problemId: number; tagNames: string[] } =
      await req.json();
    console.log(problemId, tagNames);

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
    console.log(existingTagMap);

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

// export async function PATCH(req: Request) {
//   try {
//     const profile = await getUserProfile();
//     const { problemId, tagNames } = await req.json();
//     if (!profile) {
//       return new NextResponse("unauthoriszed", { status: 400 });
//     }
//     const response = await prisma.problemTags.update({
//       where: {
//         userId_problemId: {
//           userId: profile.id,
//           problemId: problemId,
//         },
//       },
//       data: {
//         tags: [...tagNames],
//       },
//     });

//     return NextResponse.json({
//       msg: "Tags updated",
//       payload: response,
//     });
//   } catch {
//     return new NextResponse("error updating tags", { status: 500 });
//   }
// }

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
