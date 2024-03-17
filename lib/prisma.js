import { PrismaClient } from "@prisma/client";

let prisma;

if (!global.prisma) {
  // Use the POSTGRES_URL_NON_POOLING environment variable for the database URL
  const databaseUrl = process.env.POSTGRES_URL_NON_POOLING;

  // Initialize Prisma Client with the specified database URL
  global.prisma = new PrismaClient({
    datasources: {
      db: {
        url: databaseUrl,
      },
    },
  });
}

prisma = global.prisma;

export default prisma;
