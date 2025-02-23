import { prisma } from "@/lib/db";
import { getServerSession } from "next-auth";
export const getUserProfile = async () => {
  const session = await getServerSession();
  if (!session) {
    return;
  }

  const userId = await prisma.user.findUnique({
    where: {
      name: session.user?.name as string,
      email: session.user?.email as string,
    },
  });
  if (!userId) {
    return;
  }
  return { handle: userId.codeforcesHandle, id: userId.id };
};
