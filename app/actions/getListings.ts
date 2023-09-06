import prisma from "@/app/libs/prismaClient";

const getListings = async () => {
  try {
    const listings = await prisma.listing.findMany({
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
