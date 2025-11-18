import { PrismaClient } from '@repo/db';

const prisma = new PrismaClient();

export const createContext = () => {
  return {
    prisma,
  };
};

export type Context = ReturnType<typeof createContext>;
