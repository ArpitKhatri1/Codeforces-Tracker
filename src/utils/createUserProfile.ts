import getServerSession from "next-auth/next";
import { options } from "@/app/api/auth/[...nextauth]/options";
export const createUserProfile = async (handle: string | undefined) => {
  if (!handle) {
    return;
  }
  const session = await getServerSession(options);
  return session;
};
