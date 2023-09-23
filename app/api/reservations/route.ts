import prisma from "@/app/libs/prismaClient";
import { NextResponse } from "next/server";
import getCurrentUser from "@/app/actions/getCurrentUser";

export async function POST(request: Request) {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return NextResponse.error();
  }

  const body = await request.json();

  const { propertyId, startDate, endDate, totalPrice } = body;
  
  if (!propertyId || !startDate || !endDate || !totalPrice) {
    return NextResponse.error();
  }

  const propertyAndReservation = await prisma.listing.update({
    where: { id: propertyId },
    data: {
      reservations: {
        create: {
          userId: currentUser.id,
          startDate,
          endDate,
          totalPrice
        }
      }
    }
  })

  return NextResponse.json(propertyAndReservation);
}