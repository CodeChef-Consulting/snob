import { t, publicProcedure } from "./helpers/createRouter";
import { Prisma } from "@prisma/client";
import { RestaurantAggregateSchema } from "../schemas/aggregateRestaurant.schema";
import { RestaurantCreateManySchema } from "../schemas/createManyRestaurant.schema";
import { RestaurantCreateManyAndReturnSchema } from "../schemas/createManyAndReturnRestaurant.schema";
import { RestaurantCreateOneSchema } from "../schemas/createOneRestaurant.schema";
import { RestaurantDeleteManySchema } from "../schemas/deleteManyRestaurant.schema";
import { RestaurantDeleteOneSchema } from "../schemas/deleteOneRestaurant.schema";
import { RestaurantFindFirstSchema } from "../schemas/findFirstRestaurant.schema";
import { RestaurantFindManySchema } from "../schemas/findManyRestaurant.schema";
import { RestaurantFindUniqueSchema } from "../schemas/findUniqueRestaurant.schema";
import { RestaurantGroupBySchema } from "../schemas/groupByRestaurant.schema";
import { RestaurantUpdateManySchema } from "../schemas/updateManyRestaurant.schema";
import { RestaurantUpdateManyAndReturnSchema } from "../schemas/updateManyAndReturnRestaurant.schema";
import { RestaurantUpdateOneSchema } from "../schemas/updateOneRestaurant.schema";
import { RestaurantUpsertSchema } from "../schemas/upsertOneRestaurant.schema";
import { RestaurantCountSchema } from "../schemas/countRestaurant.schema";

export const restaurantsRouter = t.router({
  aggregateRestaurant: publicProcedure
    .input(RestaurantAggregateSchema).query(async ({ ctx, input }) => {
      const aggregateRestaurant = await ctx.prisma.restaurant.aggregate(input as Prisma.RestaurantAggregateArgs);
      return aggregateRestaurant;
    }),
  createManyRestaurant: publicProcedure
    .input(RestaurantCreateManySchema).mutation(async ({ ctx, input }) => {
      const createManyRestaurant = await ctx.prisma.restaurant.createMany(input as Prisma.RestaurantCreateManyArgs);
      return createManyRestaurant;
    }),
  createManyRestaurantAndReturn: publicProcedure
    .input(RestaurantCreateManyAndReturnSchema).mutation(async ({ ctx, input }) => {
      const createManyRestaurantAndReturn = await ctx.prisma.restaurant.createManyAndReturn(input as Prisma.RestaurantCreateManyAndReturnArgs);
      return createManyRestaurantAndReturn;
    }),
  createOneRestaurant: publicProcedure
    .input(RestaurantCreateOneSchema).mutation(async ({ ctx, input }) => {
      const createOneRestaurant = await ctx.prisma.restaurant.create(input as Prisma.RestaurantCreateArgs);
      return createOneRestaurant;
    }),
  deleteManyRestaurant: publicProcedure
    .input(RestaurantDeleteManySchema).mutation(async ({ ctx, input }) => {
      const deleteManyRestaurant = await ctx.prisma.restaurant.deleteMany(input as Prisma.RestaurantDeleteManyArgs);
      return deleteManyRestaurant;
    }),
  deleteOneRestaurant: publicProcedure
    .input(RestaurantDeleteOneSchema).mutation(async ({ ctx, input }) => {
      const deleteOneRestaurant = await ctx.prisma.restaurant.delete(input as Prisma.RestaurantDeleteArgs);
      return deleteOneRestaurant;
    }),
  findFirstRestaurant: publicProcedure
    .input(RestaurantFindFirstSchema).query(async ({ ctx, input }) => {
      const findFirstRestaurant = await ctx.prisma.restaurant.findFirst(input as Prisma.RestaurantFindFirstArgs);
      return findFirstRestaurant;
    }),
  findFirstRestaurantOrThrow: publicProcedure
    .input(RestaurantFindFirstSchema).query(async ({ ctx, input }) => {
      const findFirstRestaurantOrThrow = await ctx.prisma.restaurant.findFirstOrThrow(input as Prisma.RestaurantFindFirstOrThrowArgs);
      return findFirstRestaurantOrThrow;
    }),
  findManyRestaurant: publicProcedure
    .input(RestaurantFindManySchema).query(async ({ ctx, input }) => {
      const findManyRestaurant = await ctx.prisma.restaurant.findMany(input as Prisma.RestaurantFindManyArgs);
      return findManyRestaurant;
    }),
  findUniqueRestaurant: publicProcedure
    .input(RestaurantFindUniqueSchema).query(async ({ ctx, input }) => {
      const findUniqueRestaurant = await ctx.prisma.restaurant.findUnique(input as Prisma.RestaurantFindUniqueArgs);
      return findUniqueRestaurant;
    }),
  findUniqueRestaurantOrThrow: publicProcedure
    .input(RestaurantFindUniqueSchema).query(async ({ ctx, input }) => {
      const findUniqueRestaurantOrThrow = await ctx.prisma.restaurant.findUniqueOrThrow(input as Prisma.RestaurantFindUniqueOrThrowArgs);
      return findUniqueRestaurantOrThrow;
    }),
  groupByRestaurant: publicProcedure
    .input(RestaurantGroupBySchema).query(async ({ ctx, input }) => {
      const groupByRestaurant = await ctx.prisma.restaurant.groupBy({ ...({ ...input, orderBy: input.orderBy } as Prisma.RestaurantGroupByArgs), orderBy: ({ ...input, orderBy: input.orderBy } as Prisma.RestaurantGroupByArgs).orderBy });
      return groupByRestaurant;
    }),
  updateManyRestaurant: publicProcedure
    .input(RestaurantUpdateManySchema).mutation(async ({ ctx, input }) => {
      const updateManyRestaurant = await ctx.prisma.restaurant.updateMany(input as Prisma.RestaurantUpdateManyArgs);
      return updateManyRestaurant;
    }),
  updateManyRestaurantAndReturn: publicProcedure
    .input(RestaurantUpdateManyAndReturnSchema).mutation(async ({ ctx, input }) => {
      const updateManyRestaurantAndReturn = await ctx.prisma.restaurant.updateManyAndReturn(input as Prisma.RestaurantUpdateManyAndReturnArgs);
      return updateManyRestaurantAndReturn;
    }),
  updateOneRestaurant: publicProcedure
    .input(RestaurantUpdateOneSchema).mutation(async ({ ctx, input }) => {
      const updateOneRestaurant = await ctx.prisma.restaurant.update(input as Prisma.RestaurantUpdateArgs);
      return updateOneRestaurant;
    }),
  upsertOneRestaurant: publicProcedure
    .input(RestaurantUpsertSchema).mutation(async ({ ctx, input }) => {
      const upsertOneRestaurant = await ctx.prisma.restaurant.upsert(input as Prisma.RestaurantUpsertArgs);
      return upsertOneRestaurant;
    }),
  countRestaurant: publicProcedure
    .input(RestaurantCountSchema).query(async ({ ctx, input }) => {
      const countRestaurant = await ctx.prisma.restaurant.count(input as Prisma.RestaurantCountArgs);
      return countRestaurant;
    }),

}) 
