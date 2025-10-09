import { t, publicProcedure } from "./helpers/createRouter";
import { Prisma } from "@prisma/client";
import { BatchJobAggregateSchema } from "../schemas/aggregateBatchJob.schema";
import { BatchJobCreateManySchema } from "../schemas/createManyBatchJob.schema";
import { BatchJobCreateManyAndReturnSchema } from "../schemas/createManyAndReturnBatchJob.schema";
import { BatchJobCreateOneSchema } from "../schemas/createOneBatchJob.schema";
import { BatchJobDeleteManySchema } from "../schemas/deleteManyBatchJob.schema";
import { BatchJobDeleteOneSchema } from "../schemas/deleteOneBatchJob.schema";
import { BatchJobFindFirstSchema } from "../schemas/findFirstBatchJob.schema";
import { BatchJobFindManySchema } from "../schemas/findManyBatchJob.schema";
import { BatchJobFindUniqueSchema } from "../schemas/findUniqueBatchJob.schema";
import { BatchJobGroupBySchema } from "../schemas/groupByBatchJob.schema";
import { BatchJobUpdateManySchema } from "../schemas/updateManyBatchJob.schema";
import { BatchJobUpdateManyAndReturnSchema } from "../schemas/updateManyAndReturnBatchJob.schema";
import { BatchJobUpdateOneSchema } from "../schemas/updateOneBatchJob.schema";
import { BatchJobUpsertSchema } from "../schemas/upsertOneBatchJob.schema";
import { BatchJobCountSchema } from "../schemas/countBatchJob.schema";

export const batchjobsRouter = t.router({
  aggregateBatchJob: publicProcedure
    .input(BatchJobAggregateSchema).query(async ({ ctx, input }) => {
      const aggregateBatchJob = await ctx.prisma.batchJob.aggregate(input as Prisma.BatchJobAggregateArgs);
      return aggregateBatchJob;
    }),
  createManyBatchJob: publicProcedure
    .input(BatchJobCreateManySchema).mutation(async ({ ctx, input }) => {
      const createManyBatchJob = await ctx.prisma.batchJob.createMany(input as Prisma.BatchJobCreateManyArgs);
      return createManyBatchJob;
    }),
  createManyBatchJobAndReturn: publicProcedure
    .input(BatchJobCreateManyAndReturnSchema).mutation(async ({ ctx, input }) => {
      const createManyBatchJobAndReturn = await ctx.prisma.batchJob.createManyAndReturn(input as Prisma.BatchJobCreateManyAndReturnArgs);
      return createManyBatchJobAndReturn;
    }),
  createOneBatchJob: publicProcedure
    .input(BatchJobCreateOneSchema).mutation(async ({ ctx, input }) => {
      const createOneBatchJob = await ctx.prisma.batchJob.create(input as Prisma.BatchJobCreateArgs);
      return createOneBatchJob;
    }),
  deleteManyBatchJob: publicProcedure
    .input(BatchJobDeleteManySchema).mutation(async ({ ctx, input }) => {
      const deleteManyBatchJob = await ctx.prisma.batchJob.deleteMany(input as Prisma.BatchJobDeleteManyArgs);
      return deleteManyBatchJob;
    }),
  deleteOneBatchJob: publicProcedure
    .input(BatchJobDeleteOneSchema).mutation(async ({ ctx, input }) => {
      const deleteOneBatchJob = await ctx.prisma.batchJob.delete(input as Prisma.BatchJobDeleteArgs);
      return deleteOneBatchJob;
    }),
  findFirstBatchJob: publicProcedure
    .input(BatchJobFindFirstSchema).query(async ({ ctx, input }) => {
      const findFirstBatchJob = await ctx.prisma.batchJob.findFirst(input as Prisma.BatchJobFindFirstArgs);
      return findFirstBatchJob;
    }),
  findFirstBatchJobOrThrow: publicProcedure
    .input(BatchJobFindFirstSchema).query(async ({ ctx, input }) => {
      const findFirstBatchJobOrThrow = await ctx.prisma.batchJob.findFirstOrThrow(input as Prisma.BatchJobFindFirstOrThrowArgs);
      return findFirstBatchJobOrThrow;
    }),
  findManyBatchJob: publicProcedure
    .input(BatchJobFindManySchema).query(async ({ ctx, input }) => {
      const findManyBatchJob = await ctx.prisma.batchJob.findMany(input as Prisma.BatchJobFindManyArgs);
      return findManyBatchJob;
    }),
  findUniqueBatchJob: publicProcedure
    .input(BatchJobFindUniqueSchema).query(async ({ ctx, input }) => {
      const findUniqueBatchJob = await ctx.prisma.batchJob.findUnique(input as Prisma.BatchJobFindUniqueArgs);
      return findUniqueBatchJob;
    }),
  findUniqueBatchJobOrThrow: publicProcedure
    .input(BatchJobFindUniqueSchema).query(async ({ ctx, input }) => {
      const findUniqueBatchJobOrThrow = await ctx.prisma.batchJob.findUniqueOrThrow(input as Prisma.BatchJobFindUniqueOrThrowArgs);
      return findUniqueBatchJobOrThrow;
    }),
  groupByBatchJob: publicProcedure
    .input(BatchJobGroupBySchema).query(async ({ ctx, input }) => {
      const groupByBatchJob = await ctx.prisma.batchJob.groupBy({ ...({ ...input, orderBy: input.orderBy } as Prisma.BatchJobGroupByArgs), orderBy: ({ ...input, orderBy: input.orderBy } as Prisma.BatchJobGroupByArgs).orderBy });
      return groupByBatchJob;
    }),
  updateManyBatchJob: publicProcedure
    .input(BatchJobUpdateManySchema).mutation(async ({ ctx, input }) => {
      const updateManyBatchJob = await ctx.prisma.batchJob.updateMany(input as Prisma.BatchJobUpdateManyArgs);
      return updateManyBatchJob;
    }),
  updateManyBatchJobAndReturn: publicProcedure
    .input(BatchJobUpdateManyAndReturnSchema).mutation(async ({ ctx, input }) => {
      const updateManyBatchJobAndReturn = await ctx.prisma.batchJob.updateManyAndReturn(input as Prisma.BatchJobUpdateManyAndReturnArgs);
      return updateManyBatchJobAndReturn;
    }),
  updateOneBatchJob: publicProcedure
    .input(BatchJobUpdateOneSchema).mutation(async ({ ctx, input }) => {
      const updateOneBatchJob = await ctx.prisma.batchJob.update(input as Prisma.BatchJobUpdateArgs);
      return updateOneBatchJob;
    }),
  upsertOneBatchJob: publicProcedure
    .input(BatchJobUpsertSchema).mutation(async ({ ctx, input }) => {
      const upsertOneBatchJob = await ctx.prisma.batchJob.upsert(input as Prisma.BatchJobUpsertArgs);
      return upsertOneBatchJob;
    }),
  countBatchJob: publicProcedure
    .input(BatchJobCountSchema).query(async ({ ctx, input }) => {
      const countBatchJob = await ctx.prisma.batchJob.count(input as Prisma.BatchJobCountArgs);
      return countBatchJob;
    }),

}) 
