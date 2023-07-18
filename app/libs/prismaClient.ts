// create a global prisma client to prevent the error caused by hot reload
import { PrismaClient } from "@prisma/client";

declare global {
  var prisma: PrismaClient | undefined;
}

const client = globalThis.prisma || new PrismaClient();

if (process.env.NODE_ENV != "production") {
  globalThis.prisma = client;
}

export default client;
