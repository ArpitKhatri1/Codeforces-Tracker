import { prisma } from "@/lib/db";
import { getUserProfile } from "@/utils/getUserProfile";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";

export async function POST(res: Request) {
  try {
    const session = await getServerSession();

    const { handle } = await res.json();

    const profile = await getUserProfile();

    if (!handle || !session) {
      return new NextResponse("handle or profile is req", { status: 400 });
    }

    if (!handle) {
      throw new Error("Handle is required");
    }
    const userExists = await prisma.user.findUnique({
      where: {
        name: session.user?.name as string,
        codeforcesHandle: handle,
      },
    });
    if (userExists) {
      return NextResponse.json({
        userCreated: userExists,
      });
    } else {
      const userCreated = await prisma.user.create({
        data: {
          name: session.user?.name as string,
          createdAt: new Date(),
          codeforcesHandle: handle,
          email: session.user?.email as string,
        },
      });

      return NextResponse.json({
        userCreated: userCreated,
      });
    }
  } catch (error) {
    console.log(error);
    return new NextResponse(`internal server profile error ${error}`, {
      status: 500,
    });
  }
}
