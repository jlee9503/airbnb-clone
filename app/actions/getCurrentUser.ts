import { getServerSession } from "next-auth/next";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import prisma from '@/app/libs/prismaClient';

export const getSession = async () => {
  return getServerSession(authOptions);
}

const getCurrentUser = async () => {
  try {
    const session = await getSession();

    // if session does not exist
    if (!session?.user?.email) {
      return null;
    }

    // get current user info from database
    const currentUser = await prisma.user.findUnique({
      where: {
        email: session.user.email as string
      }
    })

    return (!currentUser) ? null : currentUser;
  } catch (error: any) {
    return null;
  }
}

export default getCurrentUser;