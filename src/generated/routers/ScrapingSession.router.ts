import { t, publicProcedure } from "./helpers/createRouter";
import { Prisma } from "@prisma/client";
import { ScrapingSessionAggregateSchema } from "../schemas/aggregateScrapingSession.schema";
import { ScrapingSessionCreateManySchema } from "../schemas/createManyScrapingSession.schema";
import { ScrapingSessionCreateManyAndReturnSchema } from "../schemas/createManyAndReturnScrapingSession.schema";
import { ScrapingSessionCreateOneSchema } from "../schemas/createOneScrapingSession.schema";
import { ScrapingSessionDeleteManySchema } from "../schemas/deleteManyScrapingSession.schema";
import { ScrapingSessionDeleteOneSchema } from "../schemas/deleteOneScrapingSession.schema";
import { ScrapingSessionFindFirstSchema } from "../schemas/findFirstScrapingSession.schema";
import { ScrapingSessionFindManySchema } from "../schemas/findManyScrapingSession.schema";
import { ScrapingSessionFindUniqueSchema } from "../schemas/findUniqueScrapingSession.schema";
import { ScrapingSessionGroupBySchema } from "../schemas/groupByScrapingSession.schema";
import { ScrapingSessionUpdateManySchema } from "../schemas/updateManyScrapingSession.schema";
import { ScrapingSessionUpdateManyAndReturnSchema } from "../schemas/updateManyAndReturnScrapingSession.schema";
import { ScrapingSessionUpdateOneSchema } from "../schemas/updateOneScrapingSession.schema";
import { ScrapingSessionUpsertSchema } from "../schemas/upsertOneScrapingSession.schema";
import { ScrapingSessionCountSchema } from "../schemas/countScrapingSession.schema";

export const scrapingsessionsRouter = t.router({
  aggregateScrapingSession: publicProcedure
    .input(ScrapingSessionAggregateSchema).query(async ({ ctx, input }) => {
      const aggregateScrapingSession = await ctx.prisma.scrapingSession.aggregate(input as Prisma.ScrapingSessionAggregateArgs);
      return aggregateScrapingSession;
    }),
  createManyScrapingSession: publicProcedure
    .input(ScrapingSessionCreateManySchema).mutation(async ({ ctx, input }) => {
      const createManyScrapingSession = await ctx.prisma.scrapingSession.createMany(input as Prisma.ScrapingSessionCreateManyArgs);
      return createManyScrapingSession;
    }),
  createManyScrapingSessionAndReturn: publicProcedure
    .input(ScrapingSessionCreateManyAndReturnSchema).mutation(async ({ ctx, input }) => {
      const createManyScrapingSessionAndReturn = await ctx.prisma.scrapingSession.createManyAndReturn(input as Prisma.ScrapingSessionCreateManyAndReturnArgs);
      return createManyScrapingSessionAndReturn;
    }),
  createOneScrapingSession: publicProcedure
    .input(ScrapingSessionCreateOneSchema).mutation(async ({ ctx, input }) => {
      const createOneScrapingSession = await ctx.prisma.scrapingSession.create(input as Prisma.ScrapingSessionCreateArgs);
      return createOneScrapingSession;
    }),
  deleteManyScrapingSession: publicProcedure
    .input(ScrapingSessionDeleteManySchema).mutation(async ({ ctx, input }) => {
      const deleteManyScrapingSession = await ctx.prisma.scrapingSession.deleteMany(input as Prisma.ScrapingSessionDeleteManyArgs);
      return deleteManyScrapingSession;
    }),
  deleteOneScrapingSession: publicProcedure
    .input(ScrapingSessionDeleteOneSchema).mutation(async ({ ctx, input }) => {
      const deleteOneScrapingSession = await ctx.prisma.scrapingSession.delete(input as Prisma.ScrapingSessionDeleteArgs);
      return deleteOneScrapingSession;
    }),
  findFirstScrapingSession: publicProcedure
    .input(ScrapingSessionFindFirstSchema).query(async ({ ctx, input }) => {
      const findFirstScrapingSession = await ctx.prisma.scrapingSession.findFirst(input as Prisma.ScrapingSessionFindFirstArgs);
      return findFirstScrapingSession;
    }),
  findFirstScrapingSessionOrThrow: publicProcedure
    .input(ScrapingSessionFindFirstSchema).query(async ({ ctx, input }) => {
      const findFirstScrapingSessionOrThrow = await ctx.prisma.scrapingSession.findFirstOrThrow(input as Prisma.ScrapingSessionFindFirstOrThrowArgs);
      return findFirstScrapingSessionOrThrow;
    }),
  findManyScrapingSession: publicProcedure
    .input(ScrapingSessionFindManySchema).query(async ({ ctx, input }) => {
      const findManyScrapingSession = await ctx.prisma.scrapingSession.findMany(input as Prisma.ScrapingSessionFindManyArgs);
      return findManyScrapingSession;
    }),
  findUniqueScrapingSession: publicProcedure
    .input(ScrapingSessionFindUniqueSchema).query(async ({ ctx, input }) => {
      const findUniqueScrapingSession = await ctx.prisma.scrapingSession.findUnique(input as Prisma.ScrapingSessionFindUniqueArgs);
      return findUniqueScrapingSession;
    }),
  findUniqueScrapingSessionOrThrow: publicProcedure
    .input(ScrapingSessionFindUniqueSchema).query(async ({ ctx, input }) => {
      const findUniqueScrapingSessionOrThrow = await ctx.prisma.scrapingSession.findUniqueOrThrow(input as Prisma.ScrapingSessionFindUniqueOrThrowArgs);
      return findUniqueScrapingSessionOrThrow;
    }),
  groupByScrapingSession: publicProcedure
    .input(ScrapingSessionGroupBySchema).query(async ({ ctx, input }) => {
      const groupByScrapingSession = await ctx.prisma.scrapingSession.groupBy({ ...({ ...input, orderBy: input.orderBy } as Prisma.ScrapingSessionGroupByArgs), orderBy: ({ ...input, orderBy: input.orderBy } as Prisma.ScrapingSessionGroupByArgs).orderBy });
      return groupByScrapingSession;
    }),
  updateManyScrapingSession: publicProcedure
    .input(ScrapingSessionUpdateManySchema).mutation(async ({ ctx, input }) => {
      const updateManyScrapingSession = await ctx.prisma.scrapingSession.updateMany(input as Prisma.ScrapingSessionUpdateManyArgs);
      return updateManyScrapingSession;
    }),
  updateManyScrapingSessionAndReturn: publicProcedure
    .input(ScrapingSessionUpdateManyAndReturnSchema).mutation(async ({ ctx, input }) => {
      const updateManyScrapingSessionAndReturn = await ctx.prisma.scrapingSession.updateManyAndReturn(input as Prisma.ScrapingSessionUpdateManyAndReturnArgs);
      return updateManyScrapingSessionAndReturn;
    }),
  updateOneScrapingSession: publicProcedure
    .input(ScrapingSessionUpdateOneSchema).mutation(async ({ ctx, input }) => {
      const updateOneScrapingSession = await ctx.prisma.scrapingSession.update(input as Prisma.ScrapingSessionUpdateArgs);
      return updateOneScrapingSession;
    }),
  upsertOneScrapingSession: publicProcedure
    .input(ScrapingSessionUpsertSchema).mutation(async ({ ctx, input }) => {
      const upsertOneScrapingSession = await ctx.prisma.scrapingSession.upsert(input as Prisma.ScrapingSessionUpsertArgs);
      return upsertOneScrapingSession;
    }),
  countScrapingSession: publicProcedure
    .input(ScrapingSessionCountSchema).query(async ({ ctx, input }) => {
      const countScrapingSession = await ctx.prisma.scrapingSession.count(input as Prisma.ScrapingSessionCountArgs);
      return countScrapingSession;
    }),

}) 
