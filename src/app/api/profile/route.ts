import { NextResponse } from "next/server";

export async function POST(res: Response) {
  try {
    const { handle } = await res.json();
    if (!handle) {
      return new NextResponse("handle is req");
    }
    return NextResponse.json({
      handle: handle,
    });
  } catch (error) {
    return new NextResponse("internal server profile error", { status: 500 });
  }
}
