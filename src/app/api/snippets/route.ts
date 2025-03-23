import { prisma } from "@/lib/db";
import { getUserProfile } from "@/utils/getUserProfile";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    const profile = await getUserProfile();
    if (!profile) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const allSnippets = await prisma.problemSnippet.findMany({
      where: {
        problem: {
          userId: profile.id,
        },
      },
    });

    return NextResponse.json(allSnippets);
  } catch (error) {
    console.error("Error fetching snippets:", error);
    return new NextResponse(
      JSON.stringify({ error: "Internal Server Error" }),
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    const profile = await getUserProfile();
    if (!profile) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const { problemId, snippet } = await req.json();

    if (!problemId || !snippet) {
      return new NextResponse(
        JSON.stringify({ error: "Missing required fields" }),
        { status: 400 }
      );
    }

    const response = await prisma.problemSnippet.create({
      data: {
        problemId: problemId,
        snippetText: snippet,
        userId: profile.id,
      },
    });

    return NextResponse.json({
      msg: "Created Successfully",
      response: response,
    });
  } catch (error) {
    console.error("Error creating snippet:", error);
    return new NextResponse(
      JSON.stringify({ error: "Internal Server Error" }),
      { status: 500 }
    );
  }
}
