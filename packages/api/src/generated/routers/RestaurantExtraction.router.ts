import { t, publicProcedure } from "./helpers/createRouter";
import { Prisma } from "@prisma/client";
import { RestaurantExtractionAggregateSchema } from "../schemas/aggregateRestaurantExtraction.schema";
import { RestaurantExtractionCreateManySchema } from "../schemas/createManyRestaurantExtraction.schema";
import { RestaurantExtractionCreateManyAndReturnSchema } from "../schemas/createManyAndReturnRestaurantExtraction.schema";
import { RestaurantExtractionCreateOneSchema } from "../schemas/createOneRestaurantExtraction.schema";
import { RestaurantExtractionDeleteManySchema } from "../schemas/deleteManyRestaurantExtraction.schema";
import { RestaurantExtractionDeleteOneSchema } from "../schemas/deleteOneRestaurantExtraction.schema";
import { RestaurantExtractionFindFirstSchema } from "../schemas/findFirstRestaurantExtraction.schema";
import { RestaurantExtractionFindManySchema } from "../schemas/findManyRestaurantExtraction.schema";
import { RestaurantExtractionFindUniqueSchema } from "../schemas/findUniqueRestaurantExtraction.schema";
import { RestaurantExtractionGroupBySchema } from "../schemas/groupByRestaurantExtraction.schema";
import { RestaurantExtractionUpdateManySchema } from "../schemas/updateManyRestaurantExtraction.schema";
import { RestaurantExtractionUpdateManyAndReturnSchema } from "../schemas/updateManyAndReturnRestaurantExtraction.schema";
import { RestaurantExtractionUpdateOneSchema } from "../schemas/updateOneRestaurantExtraction.schema";
import { RestaurantExtractionUpsertSchema } from "../schemas/upsertOneRestaurantExtraction.schema";
import { RestaurantExtractionCountSchema } from "../schemas/countRestaurantExtraction.schema";

export const restaurantextractionsRouter = t.router({
  aggregateRestaurantExtraction: publicProcedure
    .input(RestaurantExtractionAggregateSchema).query(async ({ ctx, input }) => {
      const aggregateRestaurantExtraction = await ctx.prisma.restaurantExtraction.aggregate(input as Prisma.RestaurantExtractionAggregateArgs);
      return aggregateRestaurantExtraction;
    }),
  createManyRestaurantExtraction: publicProcedure
    .input(RestaurantExtractionCreateManySchema).mutation(async ({ ctx, input }) => {
      const createManyRestaurantExtraction = await ctx.prisma.restaurantExtraction.createMany(input as Prisma.RestaurantExtractionCreateManyArgs);
      return createManyRestaurantExtraction;
    }),
  createManyRestaurantExtractionAndReturn: publicProcedure
    .input(RestaurantExtractionCreateManyAndReturnSchema).mutation(async ({ ctx, input }) => {
      const createManyRestaurantExtractionAndReturn = await ctx.prisma.restaurantExtraction.createManyAndReturn(input as Prisma.RestaurantExtractionCreateManyAndReturnArgs);
      return createManyRestaurantExtractionAndReturn;
    }),
  createOneRestaurantExtraction: publicProcedure
    .input(RestaurantExtractionCreateOneSchema).mutation(async ({ ctx, input }) => {
      const createOneRestaurantExtraction = await ctx.prisma.restaurantExtraction.create(input as Prisma.RestaurantExtractionCreateArgs);
      return createOneRestaurantExtraction;
    }),
  deleteManyRestaurantExtraction: publicProcedure
    .input(RestaurantExtractionDeleteManySchema).mutation(async ({ ctx, input }) => {
      const deleteManyRestaurantExtraction = await ctx.prisma.restaurantExtraction.deleteMany(input as Prisma.RestaurantExtractionDeleteManyArgs);
      return deleteManyRestaurantExtraction;
    }),
  deleteOneRestaurantExtraction: publicProcedure
    .input(RestaurantExtractionDeleteOneSchema).mutation(async ({ ctx, input }) => {
      const deleteOneRestaurantExtraction = await ctx.prisma.restaurantExtraction.delete(input as Prisma.RestaurantExtractionDeleteArgs);
      return deleteOneRestaurantExtraction;
    }),
  findFirstRestaurantExtraction: publicProcedure
    .input(RestaurantExtractionFindFirstSchema).query(async ({ ctx, input }) => {
      const findFirstRestaurantExtraction = await ctx.prisma.restaurantExtraction.findFirst(input as Prisma.RestaurantExtractionFindFirstArgs);
      return findFirstRestaurantExtraction;
    }),
  findFirstRestaurantExtractionOrThrow: publicProcedure
    .input(RestaurantExtractionFindFirstSchema).query(async ({ ctx, input }) => {
      const findFirstRestaurantExtractionOrThrow = await ctx.prisma.restaurantExtraction.findFirstOrThrow(input as Prisma.RestaurantExtractionFindFirstOrThrowArgs);
      return findFirstRestaurantExtractionOrThrow;
    }),
  findManyRestaurantExtraction: publicProcedure
    .input(RestaurantExtractionFindManySchema).query(async ({ ctx, input }) => {
      const findManyRestaurantExtraction = await ctx.prisma.restaurantExtraction.findMany(input as Prisma.RestaurantExtractionFindManyArgs);
      return findManyRestaurantExtraction;
    }),
  findUniqueRestaurantExtraction: publicProcedure
    .input(RestaurantExtractionFindUniqueSchema).query(async ({ ctx, input }) => {
      const findUniqueRestaurantExtraction = await ctx.prisma.restaurantExtraction.findUnique(input as Prisma.RestaurantExtractionFindUniqueArgs);
      return findUniqueRestaurantExtraction;
    }),
  findUniqueRestaurantExtractionOrThrow: publicProcedure
    .input(RestaurantExtractionFindUniqueSchema).query(async ({ ctx, input }) => {
      const findUniqueRestaurantExtractionOrThrow = await ctx.prisma.restaurantExtraction.findUniqueOrThrow(input as Prisma.RestaurantExtractionFindUniqueOrThrowArgs);
      return findUniqueRestaurantExtractionOrThrow;
    }),
  groupByRestaurantExtraction: publicProcedure
    .input(RestaurantExtractionGroupBySchema).query(async ({ ctx, input }) => {
      const groupByRestaurantExtraction = await ctx.prisma.restaurantExtraction.groupBy({ ...({ ...input, orderBy: input.orderBy } as Prisma.RestaurantExtractionGroupByArgs), orderBy: ({ ...input, orderBy: input.orderBy } as Prisma.RestaurantExtractionGroupByArgs).orderBy });
      return groupByRestaurantExtraction;
    }),
  updateManyRestaurantExtraction: publicProcedure
    .input(RestaurantExtractionUpdateManySchema).mutation(async ({ ctx, input }) => {
      const updateManyRestaurantExtraction = await ctx.prisma.restaurantExtraction.updateMany(input as Prisma.RestaurantExtractionUpdateManyArgs);
      return updateManyRestaurantExtraction;
    }),
  updateManyRestaurantExtractionAndReturn: publicProcedure
    .input(RestaurantExtractionUpdateManyAndReturnSchema).mutation(async ({ ctx, input }) => {
      const updateManyRestaurantExtractionAndReturn = await ctx.prisma.restaurantExtraction.updateManyAndReturn(input as Prisma.RestaurantExtractionUpdateManyAndReturnArgs);
      return updateManyRestaurantExtractionAndReturn;
    }),
  updateOneRestaurantExtraction: publicProcedure
    .input(RestaurantExtractionUpdateOneSchema).mutation(async ({ ctx, input }) => {
      const updateOneRestaurantExtraction = await ctx.prisma.restaurantExtraction.update(input as Prisma.RestaurantExtractionUpdateArgs);
      return updateOneRestaurantExtraction;
    }),
  upsertOneRestaurantExtraction: publicProcedure
    .input(RestaurantExtractionUpsertSchema).mutation(async ({ ctx, input }) => {
      const upsertOneRestaurantExtraction = await ctx.prisma.restaurantExtraction.upsert(input as Prisma.RestaurantExtractionUpsertArgs);
      return upsertOneRestaurantExtraction;
    }),
  countRestaurantExtraction: publicProcedure
    .input(RestaurantExtractionCountSchema).query(async ({ ctx, input }) => {
      const countRestaurantExtraction = await ctx.prisma.restaurantExtraction.count(input as Prisma.RestaurantExtractionCountArgs);
      return countRestaurantExtraction;
    }),

}) 
