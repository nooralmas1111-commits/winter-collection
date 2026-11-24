import { PrismaClient } from "@prisma/client";

// Declare global variable for caching PrismaClient in development
const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

// Prevent multiple instances of Prisma Client in development hot reloading
export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    log:
      process.env.NODE_ENV === "development"
        ? ["query", "error", "warn"]
        : ["error"],
  });

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}

export default prisma;
