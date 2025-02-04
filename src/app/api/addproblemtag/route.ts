import { getUserProfile } from "@/utils/getUserProfile";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const profile = await getUserProfile();
  if (!profile) {
    return new NextResponse("Profile is required", { status: 404 });
  }
  const { payload } = await req.json();
  console.log("payload is here", payload);
  return NextResponse.json({
    payload: payload,
  });
}
