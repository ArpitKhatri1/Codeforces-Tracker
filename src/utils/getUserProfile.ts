import { prisma } from "@/lib/db";
import { getServerSession } from "next-auth";
export const getUserProfile = async () => {
  const session = await getServerSession();
  if (!session) {
    return;
  }
  const userId = await prisma.user.findUnique({
    where: {
      email: session.user?.email as string,
    },
  });
  if (!userId) {
    return;
  }
  return { email: session.user?.email, id: userId.id };
};
