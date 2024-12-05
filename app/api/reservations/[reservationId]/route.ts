import prisma from "@/app/libs/prismaClient";
import { NextResponse } from "next/server";
import getCurrentUser from "@/app/actions/getCurrentUser";

interface IParams {
  reservationId?: string;
}

export const DELETE = async (
  request: Request,
  { params }: { params: IParams }
) => {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return NextResponse.error();
  }
  try {

    const { reservationId } = params;
  
    if (!reservationId || typeof reservationId !== "string") {
      return NextResponse.json(
        { error: "Invalid Reservation ID" },
        { status: 400 }
      );
    }
  
    const reservation = await prisma.reservation.deleteMany({
      where: {
        id: reservationId,
        OR: [{ userId: currentUser.id }, { listing: { userId: currentUser.id } }],
      },
    });

    return NextResponse.json(reservation);

  } catch (error) {
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }

};
