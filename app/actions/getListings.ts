import prisma from "@/app/libs/prismaClient";

export interface IListingParams {
  userId?: string;
}

const getListings = async (params: IListingParams) => {
  try {
    const { userId } = params;

    let query: any = {};

    if (userId) {
      query.userId = userId;
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
