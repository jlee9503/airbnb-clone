import { User } from "@prisma/client";

export type LoginUser = Omit<
  User,
  "createdAt" | "emailVerified" | "updatedAt"
> & {
  createdAt: string;
  emailVerified: string | null;
  updatedAt: string;
};
