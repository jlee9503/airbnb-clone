import prisma from "@/app/libs/prismaClient";

export interface IListingParams {
  userId?: string;
  category?: string;
  guestCount?: string;
  roomCount?: string;
  bathroomCount?: string;
  startDate?: string;
  endDate?: string;
  locationVal?: string;
}

const getListings = async (params: IListingParams) => {
  try {
    const {
      userId,
      category,
      guestCount,
      roomCount,
      bathroomCount,
      startDate,
      endDate,
      locationVal,
    } = params;

    let query: any = {};

    if (userId) {
      query.userId = userId;
    }

    if (category) {
      query.category = category;
    }

    if (roomCount) {
      query.roomCount = { gte: +roomCount };
    }

    if (guestCount) {
      query.guestCount = { gte: +guestCount };
    }

    if (bathroomCount) {
      query.bathroomCount = { gte: +bathroomCount };
    }

    if (locationVal) {
      query.locationVal = locationVal;
    }

    if (startDate !== endDate) {
      query.NOT = {
        reservations: {
          some: {
            OR: [
              { endDate: { gte: startDate }, startDate: { lte: startDate } },
              { startDate: { lte: endDate }, endDate: { gte: endDate } },
            ],
          },
        },
      };
    }

    const listings = await prisma.listing.findMany({
      where: query,
      orderBy: {
        createdAt: "desc",
      },
    });
    return listings;
  } catch (err: any) {
    throw new Error(err);
  }
};

export default getListings;
