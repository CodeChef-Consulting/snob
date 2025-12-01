import { t, publicProcedure } from "./helpers/createRouter";
import { Prisma } from "@prisma/client";
import { GooglePlacesLookupAggregateSchema } from "../schemas/aggregateGooglePlacesLookup.schema";
import { GooglePlacesLookupCreateManySchema } from "../schemas/createManyGooglePlacesLookup.schema";
import { GooglePlacesLookupCreateManyAndReturnSchema } from "../schemas/createManyAndReturnGooglePlacesLookup.schema";
import { GooglePlacesLookupCreateOneSchema } from "../schemas/createOneGooglePlacesLookup.schema";
import { GooglePlacesLookupDeleteManySchema } from "../schemas/deleteManyGooglePlacesLookup.schema";
import { GooglePlacesLookupDeleteOneSchema } from "../schemas/deleteOneGooglePlacesLookup.schema";
import { GooglePlacesLookupFindFirstSchema } from "../schemas/findFirstGooglePlacesLookup.schema";
import { GooglePlacesLookupFindManySchema } from "../schemas/findManyGooglePlacesLookup.schema";
import { GooglePlacesLookupFindUniqueSchema } from "../schemas/findUniqueGooglePlacesLookup.schema";
import { GooglePlacesLookupGroupBySchema } from "../schemas/groupByGooglePlacesLookup.schema";
import { GooglePlacesLookupUpdateManySchema } from "../schemas/updateManyGooglePlacesLookup.schema";
import { GooglePlacesLookupUpdateManyAndReturnSchema } from "../schemas/updateManyAndReturnGooglePlacesLookup.schema";
import { GooglePlacesLookupUpdateOneSchema } from "../schemas/updateOneGooglePlacesLookup.schema";
import { GooglePlacesLookupUpsertSchema } from "../schemas/upsertOneGooglePlacesLookup.schema";
import { GooglePlacesLookupCountSchema } from "../schemas/countGooglePlacesLookup.schema";

export const googleplaceslookupsRouter = t.router({
  aggregateGooglePlacesLookup: publicProcedure
    .input(GooglePlacesLookupAggregateSchema).query(async ({ ctx, input }) => {
      const aggregateGooglePlacesLookup = await ctx.prisma.googlePlacesLookup.aggregate(input as Prisma.GooglePlacesLookupAggregateArgs);
      return aggregateGooglePlacesLookup;
    }),
  createManyGooglePlacesLookup: publicProcedure
    .input(GooglePlacesLookupCreateManySchema).mutation(async ({ ctx, input }) => {
      const createManyGooglePlacesLookup = await ctx.prisma.googlePlacesLookup.createMany(input as Prisma.GooglePlacesLookupCreateManyArgs);
      return createManyGooglePlacesLookup;
    }),
  createManyGooglePlacesLookupAndReturn: publicProcedure
    .input(GooglePlacesLookupCreateManyAndReturnSchema).mutation(async ({ ctx, input }) => {
      const createManyGooglePlacesLookupAndReturn = await ctx.prisma.googlePlacesLookup.createManyAndReturn(input as Prisma.GooglePlacesLookupCreateManyAndReturnArgs);
      return createManyGooglePlacesLookupAndReturn;
    }),
  createOneGooglePlacesLookup: publicProcedure
    .input(GooglePlacesLookupCreateOneSchema).mutation(async ({ ctx, input }) => {
      const createOneGooglePlacesLookup = await ctx.prisma.googlePlacesLookup.create(input as Prisma.GooglePlacesLookupCreateArgs);
      return createOneGooglePlacesLookup;
    }),
  deleteManyGooglePlacesLookup: publicProcedure
    .input(GooglePlacesLookupDeleteManySchema).mutation(async ({ ctx, input }) => {
      const deleteManyGooglePlacesLookup = await ctx.prisma.googlePlacesLookup.deleteMany(input as Prisma.GooglePlacesLookupDeleteManyArgs);
      return deleteManyGooglePlacesLookup;
    }),
  deleteOneGooglePlacesLookup: publicProcedure
    .input(GooglePlacesLookupDeleteOneSchema).mutation(async ({ ctx, input }) => {
      const deleteOneGooglePlacesLookup = await ctx.prisma.googlePlacesLookup.delete(input as Prisma.GooglePlacesLookupDeleteArgs);
      return deleteOneGooglePlacesLookup;
    }),
  findFirstGooglePlacesLookup: publicProcedure
    .input(GooglePlacesLookupFindFirstSchema).query(async ({ ctx, input }) => {
      const findFirstGooglePlacesLookup = await ctx.prisma.googlePlacesLookup.findFirst(input as Prisma.GooglePlacesLookupFindFirstArgs);
      return findFirstGooglePlacesLookup;
    }),
  findFirstGooglePlacesLookupOrThrow: publicProcedure
    .input(GooglePlacesLookupFindFirstSchema).query(async ({ ctx, input }) => {
      const findFirstGooglePlacesLookupOrThrow = await ctx.prisma.googlePlacesLookup.findFirstOrThrow(input as Prisma.GooglePlacesLookupFindFirstOrThrowArgs);
      return findFirstGooglePlacesLookupOrThrow;
    }),
  findManyGooglePlacesLookup: publicProcedure
    .input(GooglePlacesLookupFindManySchema).query(async ({ ctx, input }) => {
      const findManyGooglePlacesLookup = await ctx.prisma.googlePlacesLookup.findMany(input as Prisma.GooglePlacesLookupFindManyArgs);
      return findManyGooglePlacesLookup;
    }),
  findUniqueGooglePlacesLookup: publicProcedure
    .input(GooglePlacesLookupFindUniqueSchema).query(async ({ ctx, input }) => {
      const findUniqueGooglePlacesLookup = await ctx.prisma.googlePlacesLookup.findUnique(input as Prisma.GooglePlacesLookupFindUniqueArgs);
      return findUniqueGooglePlacesLookup;
    }),
  findUniqueGooglePlacesLookupOrThrow: publicProcedure
    .input(GooglePlacesLookupFindUniqueSchema).query(async ({ ctx, input }) => {
      const findUniqueGooglePlacesLookupOrThrow = await ctx.prisma.googlePlacesLookup.findUniqueOrThrow(input as Prisma.GooglePlacesLookupFindUniqueOrThrowArgs);
      return findUniqueGooglePlacesLookupOrThrow;
    }),
  groupByGooglePlacesLookup: publicProcedure
    .input(GooglePlacesLookupGroupBySchema).query(async ({ ctx, input }) => {
      const groupByGooglePlacesLookup = await ctx.prisma.googlePlacesLookup.groupBy({ ...({ ...input, orderBy: input.orderBy } as Prisma.GooglePlacesLookupGroupByArgs), orderBy: ({ ...input, orderBy: input.orderBy } as Prisma.GooglePlacesLookupGroupByArgs).orderBy });
      return groupByGooglePlacesLookup;
    }),
  updateManyGooglePlacesLookup: publicProcedure
    .input(GooglePlacesLookupUpdateManySchema).mutation(async ({ ctx, input }) => {
      const updateManyGooglePlacesLookup = await ctx.prisma.googlePlacesLookup.updateMany(input as Prisma.GooglePlacesLookupUpdateManyArgs);
      return updateManyGooglePlacesLookup;
    }),
  updateManyGooglePlacesLookupAndReturn: publicProcedure
    .input(GooglePlacesLookupUpdateManyAndReturnSchema).mutation(async ({ ctx, input }) => {
      const updateManyGooglePlacesLookupAndReturn = await ctx.prisma.googlePlacesLookup.updateManyAndReturn(input as Prisma.GooglePlacesLookupUpdateManyAndReturnArgs);
      return updateManyGooglePlacesLookupAndReturn;
    }),
  updateOneGooglePlacesLookup: publicProcedure
    .input(GooglePlacesLookupUpdateOneSchema).mutation(async ({ ctx, input }) => {
      const updateOneGooglePlacesLookup = await ctx.prisma.googlePlacesLookup.update(input as Prisma.GooglePlacesLookupUpdateArgs);
      return updateOneGooglePlacesLookup;
    }),
  upsertOneGooglePlacesLookup: publicProcedure
    .input(GooglePlacesLookupUpsertSchema).mutation(async ({ ctx, input }) => {
      const upsertOneGooglePlacesLookup = await ctx.prisma.googlePlacesLookup.upsert(input as Prisma.GooglePlacesLookupUpsertArgs);
      return upsertOneGooglePlacesLookup;
    }),
  countGooglePlacesLookup: publicProcedure
    .input(GooglePlacesLookupCountSchema).query(async ({ ctx, input }) => {
      const countGooglePlacesLookup = await ctx.prisma.googlePlacesLookup.count(input as Prisma.GooglePlacesLookupCountArgs);
      return countGooglePlacesLookup;
    }),

}) 
