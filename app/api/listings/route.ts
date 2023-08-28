import prisma from "@/app/libs/prismaClient";
import { NextResponse } from "next/server";
import getCurrentUser from "@/app/actions/getCurrentUser";

export const POST = async (request: Request) => {
  const currentUser = await getCurrentUser();
  if (!currentUser) {
    return NextResponse.error();
  }

  const body = await request.json();
  const {
    title,
    description,
    imgSrc,
    category,
    roomCount,
    bathroomCount,
    guestCount,
    location,
    price,
  } = body;

  const listing = await prisma.listing.create({
    data: {
      title,
      description,
      imgSrc,
      category,
      roomCount,
      bathroomCount,
      guestCount,
      locationVal: location.value,
      price: parseInt(price, 10),
      userId: currentUser.id
    },
  });
  return NextResponse.json(listing);
};
