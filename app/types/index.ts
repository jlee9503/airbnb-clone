import { User, Listing, Reservation } from "@prisma/client";

export type LoginUser = Omit<
  User,
  "createdAt" | "emailVerified" | "updatedAt"
> & {
  createdAt: string;
  emailVerified: string | null;
  updatedAt: string;
};

export type SafeListing = Omit<Listing, "createdAt"> & {
  createdAt: string;
};

export type SafeReservation = Omit<
  Reservation,
  "createdAt" | "startDate" | "endDate" | "listing"
> & {
  createdAt: string;
  startDate: string;
  endDate: string;
  listing: SafeListing;
};