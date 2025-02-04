import { prisma } from "@/lib/db";
import { getUserProfile } from "@/utils/getUserProfile";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
export async function POST(res: Request) {
  try {
    const session = await getServerSession();
    const { handle } = await res.json();
    const profile = await getUserProfile();
    if (!handle || !profile || !session) {
      return new NextResponse("handle or profile is req", { status: 400 });
    }
    const userExists = await prisma.user.findUnique({
      where: {
        email: profile.email as string,
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
          email: session.user?.email as string,
          createdAt: new Date(),
          codeforcesHandle: handle,
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
