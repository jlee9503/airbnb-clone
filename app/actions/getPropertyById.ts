import prisma from "@/app/libs/prismaClient";

interface IParams {
  listingId?: string;
}

export default async function getPropertyById(params: IParams) {
  try {
    const { listingId } = params;

    const property = await prisma.listing.findUnique({
      where: {
        id: listingId,
      },
      include: {
        user: true,
      },
    });

    if (!property) {
      return null;
    }

    return {
      ...property,
      createdAt: property.createdAt.toISOString(),
      user: {
        ...property.user,
        createdAt: property.user.createdAt.toISOString(),
        updatedAt: property.user.updatedAt.toISOString(),
        emailVerified: property.user.emailVerified?.toISOString() || null,
      },
    };
  } catch (error: any) {
    throw new Error(error);
  }
}
