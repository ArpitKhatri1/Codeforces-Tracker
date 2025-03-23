import { prisma } from "@/lib/db";
import { getUserProfile } from "@/utils/getUserProfile";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  { params }: { params?: { id?: string } }
) {
  try {
    const profile = await getUserProfile();
    if (!profile) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    if (params?.id) {
      const problemId = parseInt(params.id);
      const snippet = await prisma.problemSnippet.findUnique({
        where: {
          problemId: problemId,
          userId: profile.id,
        },
      });

      return NextResponse.json(snippet);
    }
  } catch (error) {
    console.error("Error fetching snippets:", error);
    return new NextResponse(
      JSON.stringify({ error: "Internal Server Error" }),
      { status: 500 }
    );
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const profile = await getUserProfile();
    if (!profile) {
      return new NextResponse("Unauthorized", { status: 401 });
    }
    const problemId = parseInt(params.id);
    const response = await prisma.problemSnippet.delete({
      where: {
        userId: profile.id,
        problemId: problemId,
      },
    });

    return NextResponse.json(response);
  } catch (error) {
    return new NextResponse(
      JSON.stringify({ error: "Internal Server Error" }),
      { status: 500 }
    );
  }
}

export async function PATCH(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const profile = await getUserProfile();
    if (!profile) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const problemId = parseInt(params?.id);

    const { snippetText } = await req.json();
    const response = await prisma.problemSnippet.update({
      where: {
        userId: profile.id,
        problemId: problemId,
      },
      data: {
        snippetText: snippetText,
      },
    });

    return NextResponse.json({
      msg: "Updated snippetTrext Successfully",
      response,
    });
  } catch (error) {
    return new NextResponse(
      JSON.stringify({ error: "Internal Server Error" }),
      { status: 500 }
    );
  }
}
