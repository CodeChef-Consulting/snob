import { t, publicProcedure } from './helpers/createRouter';
import { Prisma } from '@prisma/client';
import { FileAggregateSchema } from '../schemas/aggregateFile.schema';
import { FileCreateManySchema } from '../schemas/createManyFile.schema';
import { FileCreateManyAndReturnSchema } from '../schemas/createManyAndReturnFile.schema';
import { FileCreateOneSchema } from '../schemas/createOneFile.schema';
import { FileDeleteManySchema } from '../schemas/deleteManyFile.schema';
import { FileDeleteOneSchema } from '../schemas/deleteOneFile.schema';
import { FileFindFirstSchema } from '../schemas/findFirstFile.schema';
import { FileFindManySchema } from '../schemas/findManyFile.schema';
import { FileFindUniqueSchema } from '../schemas/findUniqueFile.schema';
import { FileGroupBySchema } from '../schemas/groupByFile.schema';
import { FileUpdateManySchema } from '../schemas/updateManyFile.schema';
import { FileUpdateManyAndReturnSchema } from '../schemas/updateManyAndReturnFile.schema';
import { FileUpdateOneSchema } from '../schemas/updateOneFile.schema';
import { FileUpsertSchema } from '../schemas/upsertOneFile.schema';
import { FileCountSchema } from '../schemas/countFile.schema';

export const filesRouter = t.router({
  aggregateFile: publicProcedure
    .input(FileAggregateSchema)
    .query(async ({ ctx, input }) => {
      const aggregateFile = await ctx.prisma.file.aggregate(
        input as Prisma.FileAggregateArgs
      );
      return aggregateFile;
    }),
  createManyFile: publicProcedure
    .input(FileCreateManySchema)
    .mutation(async ({ ctx, input }) => {
      const createManyFile = await ctx.prisma.file.createMany(
        input as Prisma.FileCreateManyArgs
      );
      return createManyFile;
    }),
  createManyFileAndReturn: publicProcedure
    .input(FileCreateManyAndReturnSchema)
    .mutation(async ({ ctx, input }) => {
      const createManyFileAndReturn = await ctx.prisma.file.createManyAndReturn(
        input as Prisma.FileCreateManyAndReturnArgs
      );
      return createManyFileAndReturn;
    }),
  createOneFile: publicProcedure
    .input(FileCreateOneSchema)
    .mutation(async ({ ctx, input }) => {
      const createOneFile = await ctx.prisma.file.create(
        input as Prisma.FileCreateArgs
      );
      return createOneFile;
    }),
  deleteManyFile: publicProcedure
    .input(FileDeleteManySchema)
    .mutation(async ({ ctx, input }) => {
      const deleteManyFile = await ctx.prisma.file.deleteMany(
        input as Prisma.FileDeleteManyArgs
      );
      return deleteManyFile;
    }),
  deleteOneFile: publicProcedure
    .input(FileDeleteOneSchema)
    .mutation(async ({ ctx, input }) => {
      const deleteOneFile = await ctx.prisma.file.delete(
        input as Prisma.FileDeleteArgs
      );
      return deleteOneFile;
    }),
  findFirstFile: publicProcedure
    .input(FileFindFirstSchema)
    .query(async ({ ctx, input }) => {
      const findFirstFile = await ctx.prisma.file.findFirst(
        input as Prisma.FileFindFirstArgs
      );
      return findFirstFile;
    }),
  findFirstFileOrThrow: publicProcedure
    .input(FileFindFirstSchema)
    .query(async ({ ctx, input }) => {
      const findFirstFileOrThrow = await ctx.prisma.file.findFirstOrThrow(
        input as Prisma.FileFindFirstOrThrowArgs
      );
      return findFirstFileOrThrow;
    }),
  findManyFile: publicProcedure
    .input(FileFindManySchema)
    .query(async ({ ctx, input }) => {
      const findManyFile = await ctx.prisma.file.findMany(
        input as Prisma.FileFindManyArgs
      );
      return findManyFile;
    }),
  findUniqueFile: publicProcedure
    .input(FileFindUniqueSchema)
    .query(async ({ ctx, input }) => {
      const findUniqueFile = await ctx.prisma.file.findUnique(
        input as Prisma.FileFindUniqueArgs
      );
      return findUniqueFile;
    }),
  findUniqueFileOrThrow: publicProcedure
    .input(FileFindUniqueSchema)
    .query(async ({ ctx, input }) => {
      const findUniqueFileOrThrow = await ctx.prisma.file.findUniqueOrThrow(
        input as Prisma.FileFindUniqueOrThrowArgs
      );
      return findUniqueFileOrThrow;
    }),
  groupByFile: publicProcedure
    .input(FileGroupBySchema)
    .query(async ({ ctx, input }) => {
      const groupByFile = await ctx.prisma.file.groupBy({
        ...({ ...input, orderBy: input.orderBy } as Prisma.FileGroupByArgs),
        orderBy: (
          { ...input, orderBy: input.orderBy } as Prisma.FileGroupByArgs
        ).orderBy,
      });
      return groupByFile;
    }),
  updateManyFile: publicProcedure
    .input(FileUpdateManySchema)
    .mutation(async ({ ctx, input }) => {
      const updateManyFile = await ctx.prisma.file.updateMany(
        input as Prisma.FileUpdateManyArgs
      );
      return updateManyFile;
    }),
  updateManyFileAndReturn: publicProcedure
    .input(FileUpdateManyAndReturnSchema)
    .mutation(async ({ ctx, input }) => {
      const updateManyFileAndReturn = await ctx.prisma.file.updateManyAndReturn(
        input as Prisma.FileUpdateManyAndReturnArgs
      );
      return updateManyFileAndReturn;
    }),
  updateOneFile: publicProcedure
    .input(FileUpdateOneSchema)
    .mutation(async ({ ctx, input }) => {
      const updateOneFile = await ctx.prisma.file.update(
        input as Prisma.FileUpdateArgs
      );
      return updateOneFile;
    }),
  upsertOneFile: publicProcedure
    .input(FileUpsertSchema)
    .mutation(async ({ ctx, input }) => {
      const upsertOneFile = await ctx.prisma.file.upsert(
        input as Prisma.FileUpsertArgs
      );
      return upsertOneFile;
    }),
  countFile: publicProcedure
    .input(FileCountSchema)
    .query(async ({ ctx, input }) => {
      const countFile = await ctx.prisma.file.count(
        input as Prisma.FileCountArgs
      );
      return countFile;
    }),
});
