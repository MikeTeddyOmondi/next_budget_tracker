import { PrismaClient } from "@prisma/client";

// 1. Import libSQL and the Prisma libSQL driver adapter
import { PrismaLibSQL } from "@prisma/adapter-libsql";
import { createClient } from "@libsql/client";

// 2. Instantiate libSQL
const libsql = createClient({
  url: process.env.TURSO_DATABASE_URL!,
  authToken: process.env.TURSO_AUTH_TOKEN!,
});

const prismaClientSingleton = () => {
  // 3. Instantiate the libSQL driver adapter
  const adapter = new PrismaLibSQL(libsql);
  
  // Pass the adapter option to the Prisma Client instance
  return  new PrismaClient({ adapter });
};

declare global {
  var prismaGlobal: undefined | ReturnType<typeof prismaClientSingleton>;
}

const prisma = globalThis.prismaGlobal ?? prismaClientSingleton();

export default prisma;

if (process.env.NODE_ENV !== "production") globalThis.prismaGlobal = prisma;
