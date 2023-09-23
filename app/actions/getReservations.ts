import prisma from "@/app/libs/prismaClient";

interface IParams {
  listingId?: string;
  userId?: string;
  ownerId?: string;
}

export default async function getReservations(params: IParams) {
  const { listingId, userId, ownerId } = params;
  const query: any = {};

  try {
    if (listingId) {
      query.listingId = listingId;
    }
    if (userId) {
      query.userId = userId;
    }
    if (ownerId) {
      query.listing = { userId: ownerId };
    }

    const reservations = await prisma.reservation.findMany({
      where: query,
      include: {
        listing: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    const safeReservations = reservations.map((reservation) => ({
      ...reservation,
      createdAt: reservation.createdAt.toISOString(),
      startDate: reservation.startDate.toISOString(),
      endDate: reservation.endDate.toISOString(),
      listing: {
        ...reservation.listing,
        createdAt: reservation.listing.createdAt.toISOString(),
      },
    }));

    return safeReservations;
  } catch (error: any) {
    throw new Error(error);
  }
}
