import { t, publicProcedure } from "./helpers/createRouter";
import { Prisma } from "@prisma/client";
import { SentimentExtractionAggregateSchema } from "../schemas/aggregateSentimentExtraction.schema";
import { SentimentExtractionCreateManySchema } from "../schemas/createManySentimentExtraction.schema";
import { SentimentExtractionCreateManyAndReturnSchema } from "../schemas/createManyAndReturnSentimentExtraction.schema";
import { SentimentExtractionCreateOneSchema } from "../schemas/createOneSentimentExtraction.schema";
import { SentimentExtractionDeleteManySchema } from "../schemas/deleteManySentimentExtraction.schema";
import { SentimentExtractionDeleteOneSchema } from "../schemas/deleteOneSentimentExtraction.schema";
import { SentimentExtractionFindFirstSchema } from "../schemas/findFirstSentimentExtraction.schema";
import { SentimentExtractionFindManySchema } from "../schemas/findManySentimentExtraction.schema";
import { SentimentExtractionFindUniqueSchema } from "../schemas/findUniqueSentimentExtraction.schema";
import { SentimentExtractionGroupBySchema } from "../schemas/groupBySentimentExtraction.schema";
import { SentimentExtractionUpdateManySchema } from "../schemas/updateManySentimentExtraction.schema";
import { SentimentExtractionUpdateManyAndReturnSchema } from "../schemas/updateManyAndReturnSentimentExtraction.schema";
import { SentimentExtractionUpdateOneSchema } from "../schemas/updateOneSentimentExtraction.schema";
import { SentimentExtractionUpsertSchema } from "../schemas/upsertOneSentimentExtraction.schema";
import { SentimentExtractionCountSchema } from "../schemas/countSentimentExtraction.schema";

export const sentimentextractionsRouter = t.router({
  aggregateSentimentExtraction: publicProcedure
    .input(SentimentExtractionAggregateSchema).query(async ({ ctx, input }) => {
      const aggregateSentimentExtraction = await ctx.prisma.sentimentExtraction.aggregate(input as Prisma.SentimentExtractionAggregateArgs);
      return aggregateSentimentExtraction;
    }),
  createManySentimentExtraction: publicProcedure
    .input(SentimentExtractionCreateManySchema).mutation(async ({ ctx, input }) => {
      const createManySentimentExtraction = await ctx.prisma.sentimentExtraction.createMany(input as Prisma.SentimentExtractionCreateManyArgs);
      return createManySentimentExtraction;
    }),
  createManySentimentExtractionAndReturn: publicProcedure
    .input(SentimentExtractionCreateManyAndReturnSchema).mutation(async ({ ctx, input }) => {
      const createManySentimentExtractionAndReturn = await ctx.prisma.sentimentExtraction.createManyAndReturn(input as Prisma.SentimentExtractionCreateManyAndReturnArgs);
      return createManySentimentExtractionAndReturn;
    }),
  createOneSentimentExtraction: publicProcedure
    .input(SentimentExtractionCreateOneSchema).mutation(async ({ ctx, input }) => {
      const createOneSentimentExtraction = await ctx.prisma.sentimentExtraction.create(input as Prisma.SentimentExtractionCreateArgs);
      return createOneSentimentExtraction;
    }),
  deleteManySentimentExtraction: publicProcedure
    .input(SentimentExtractionDeleteManySchema).mutation(async ({ ctx, input }) => {
      const deleteManySentimentExtraction = await ctx.prisma.sentimentExtraction.deleteMany(input as Prisma.SentimentExtractionDeleteManyArgs);
      return deleteManySentimentExtraction;
    }),
  deleteOneSentimentExtraction: publicProcedure
    .input(SentimentExtractionDeleteOneSchema).mutation(async ({ ctx, input }) => {
      const deleteOneSentimentExtraction = await ctx.prisma.sentimentExtraction.delete(input as Prisma.SentimentExtractionDeleteArgs);
      return deleteOneSentimentExtraction;
    }),
  findFirstSentimentExtraction: publicProcedure
    .input(SentimentExtractionFindFirstSchema).query(async ({ ctx, input }) => {
      const findFirstSentimentExtraction = await ctx.prisma.sentimentExtraction.findFirst(input as Prisma.SentimentExtractionFindFirstArgs);
      return findFirstSentimentExtraction;
    }),
  findFirstSentimentExtractionOrThrow: publicProcedure
    .input(SentimentExtractionFindFirstSchema).query(async ({ ctx, input }) => {
      const findFirstSentimentExtractionOrThrow = await ctx.prisma.sentimentExtraction.findFirstOrThrow(input as Prisma.SentimentExtractionFindFirstOrThrowArgs);
      return findFirstSentimentExtractionOrThrow;
    }),
  findManySentimentExtraction: publicProcedure
    .input(SentimentExtractionFindManySchema).query(async ({ ctx, input }) => {
      const findManySentimentExtraction = await ctx.prisma.sentimentExtraction.findMany(input as Prisma.SentimentExtractionFindManyArgs);
      return findManySentimentExtraction;
    }),
  findUniqueSentimentExtraction: publicProcedure
    .input(SentimentExtractionFindUniqueSchema).query(async ({ ctx, input }) => {
      const findUniqueSentimentExtraction = await ctx.prisma.sentimentExtraction.findUnique(input as Prisma.SentimentExtractionFindUniqueArgs);
      return findUniqueSentimentExtraction;
    }),
  findUniqueSentimentExtractionOrThrow: publicProcedure
    .input(SentimentExtractionFindUniqueSchema).query(async ({ ctx, input }) => {
      const findUniqueSentimentExtractionOrThrow = await ctx.prisma.sentimentExtraction.findUniqueOrThrow(input as Prisma.SentimentExtractionFindUniqueOrThrowArgs);
      return findUniqueSentimentExtractionOrThrow;
    }),
  groupBySentimentExtraction: publicProcedure
    .input(SentimentExtractionGroupBySchema).query(async ({ ctx, input }) => {
      const groupBySentimentExtraction = await ctx.prisma.sentimentExtraction.groupBy({ ...({ ...input, orderBy: input.orderBy } as Prisma.SentimentExtractionGroupByArgs), orderBy: ({ ...input, orderBy: input.orderBy } as Prisma.SentimentExtractionGroupByArgs).orderBy });
      return groupBySentimentExtraction;
    }),
  updateManySentimentExtraction: publicProcedure
    .input(SentimentExtractionUpdateManySchema).mutation(async ({ ctx, input }) => {
      const updateManySentimentExtraction = await ctx.prisma.sentimentExtraction.updateMany(input as Prisma.SentimentExtractionUpdateManyArgs);
      return updateManySentimentExtraction;
    }),
  updateManySentimentExtractionAndReturn: publicProcedure
    .input(SentimentExtractionUpdateManyAndReturnSchema).mutation(async ({ ctx, input }) => {
      const updateManySentimentExtractionAndReturn = await ctx.prisma.sentimentExtraction.updateManyAndReturn(input as Prisma.SentimentExtractionUpdateManyAndReturnArgs);
      return updateManySentimentExtractionAndReturn;
    }),
  updateOneSentimentExtraction: publicProcedure
    .input(SentimentExtractionUpdateOneSchema).mutation(async ({ ctx, input }) => {
      const updateOneSentimentExtraction = await ctx.prisma.sentimentExtraction.update(input as Prisma.SentimentExtractionUpdateArgs);
      return updateOneSentimentExtraction;
    }),
  upsertOneSentimentExtraction: publicProcedure
    .input(SentimentExtractionUpsertSchema).mutation(async ({ ctx, input }) => {
      const upsertOneSentimentExtraction = await ctx.prisma.sentimentExtraction.upsert(input as Prisma.SentimentExtractionUpsertArgs);
      return upsertOneSentimentExtraction;
    }),
  countSentimentExtraction: publicProcedure
    .input(SentimentExtractionCountSchema).query(async ({ ctx, input }) => {
      const countSentimentExtraction = await ctx.prisma.sentimentExtraction.count(input as Prisma.SentimentExtractionCountArgs);
      return countSentimentExtraction;
    }),

}) 
