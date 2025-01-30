import getServerSession from "next-auth/next";
import { prisma } from "@/lib/db";
import { options } from "@/app/api/auth/[...nextauth]/options";
export const createUserProfile = async () => {
  const createdUser = await prisma.user.create({
    data: {
      name: "arpit",
      codeforcesId: "ArpitKhatri1",
      email: "arpitkumarkhatri@gmail.com",
      createdAt: new Date(),
    },
  });

  console.log(createdUser);
};
