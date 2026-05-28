import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import { Pool } from 'pg';

const prismaClientSingleton = () => {
  const connectionString = process.env.DATABASE_URL;
  
  if (!connectionString || connectionString.includes('[PASSWORD]') || connectionString.includes('placeholder')) {
    console.warn('No active Supabase DATABASE_URL configured in .env. Falling back to standard PrismaClient configuration.');
    return new PrismaClient();
  }
  
  try {
    // Create the pg pool
    const pool = new Pool({
      connectionString,
      ssl: connectionString.includes('supabase') ? { rejectUnauthorized: false } : undefined
    });
    
    // Create the Prisma PG adapter (Required in Prisma 7)
    const adapter = new PrismaPg(pool);
    
    return new PrismaClient({ adapter });
  } catch (error) {
    console.error('Failed to initialize PrismaPg adapter. Falling back to default constructor.', error);
    return new PrismaClient();
  }
};

declare global {
  var prismaGlobal: undefined | ReturnType<typeof prismaClientSingleton>;
}

const prisma = globalThis.prismaGlobal ?? prismaClientSingleton();

export default prisma;

if (process.env.NODE_ENV !== 'production') globalThis.prismaGlobal = prisma;
