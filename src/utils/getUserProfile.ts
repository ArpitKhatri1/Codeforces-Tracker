import { prisma } from "@/lib/db";

export const getUserProfile = async (
  handle: string | null,
  user: { name?: string | null; email?: string | null }
) => {
  if (!handle || !user?.name || !user?.email) {
    return;
  }

  return await prisma.user.create({
    data: {
      name: user.name,
      email: user.email,
      codeforcesId: handle,
      createdAt: new Date(),
    },
  });
};
