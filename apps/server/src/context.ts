import { PrismaClient } from '@repo/db';

const prisma = new PrismaClient();

export interface Context {
  prisma: PrismaClient;
}

export const createContext = (): Context => {
  return {
    prisma,
  };
};
