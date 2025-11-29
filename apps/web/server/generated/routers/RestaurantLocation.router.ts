import { t, publicProcedure } from "./helpers/createRouter";
import { Prisma } from "@prisma/client";
import { RestaurantLocationAggregateSchema } from "../schemas/aggregateRestaurantLocation.schema";
import { RestaurantLocationCreateManySchema } from "../schemas/createManyRestaurantLocation.schema";
import { RestaurantLocationCreateManyAndReturnSchema } from "../schemas/createManyAndReturnRestaurantLocation.schema";
import { RestaurantLocationCreateOneSchema } from "../schemas/createOneRestaurantLocation.schema";
import { RestaurantLocationDeleteManySchema } from "../schemas/deleteManyRestaurantLocation.schema";
import { RestaurantLocationDeleteOneSchema } from "../schemas/deleteOneRestaurantLocation.schema";
import { RestaurantLocationFindFirstSchema } from "../schemas/findFirstRestaurantLocation.schema";
import { RestaurantLocationFindManySchema } from "../schemas/findManyRestaurantLocation.schema";
import { RestaurantLocationFindUniqueSchema } from "../schemas/findUniqueRestaurantLocation.schema";
import { RestaurantLocationGroupBySchema } from "../schemas/groupByRestaurantLocation.schema";
import { RestaurantLocationUpdateManySchema } from "../schemas/updateManyRestaurantLocation.schema";
import { RestaurantLocationUpdateManyAndReturnSchema } from "../schemas/updateManyAndReturnRestaurantLocation.schema";
import { RestaurantLocationUpdateOneSchema } from "../schemas/updateOneRestaurantLocation.schema";
import { RestaurantLocationUpsertSchema } from "../schemas/upsertOneRestaurantLocation.schema";
import { RestaurantLocationCountSchema } from "../schemas/countRestaurantLocation.schema";

export const restaurantlocationsRouter = t.router({
  aggregateRestaurantLocation: publicProcedure
    .input(RestaurantLocationAggregateSchema).query(async ({ ctx, input }) => {
      const aggregateRestaurantLocation = await ctx.prisma.restaurantLocation.aggregate(input as Prisma.RestaurantLocationAggregateArgs);
      return aggregateRestaurantLocation;
    }),
  createManyRestaurantLocation: publicProcedure
    .input(RestaurantLocationCreateManySchema).mutation(async ({ ctx, input }) => {
      const createManyRestaurantLocation = await ctx.prisma.restaurantLocation.createMany(input as Prisma.RestaurantLocationCreateManyArgs);
      return createManyRestaurantLocation;
    }),
  createManyRestaurantLocationAndReturn: publicProcedure
    .input(RestaurantLocationCreateManyAndReturnSchema).mutation(async ({ ctx, input }) => {
      const createManyRestaurantLocationAndReturn = await ctx.prisma.restaurantLocation.createManyAndReturn(input as Prisma.RestaurantLocationCreateManyAndReturnArgs);
      return createManyRestaurantLocationAndReturn;
    }),
  createOneRestaurantLocation: publicProcedure
    .input(RestaurantLocationCreateOneSchema).mutation(async ({ ctx, input }) => {
      const createOneRestaurantLocation = await ctx.prisma.restaurantLocation.create(input as Prisma.RestaurantLocationCreateArgs);
      return createOneRestaurantLocation;
    }),
  deleteManyRestaurantLocation: publicProcedure
    .input(RestaurantLocationDeleteManySchema).mutation(async ({ ctx, input }) => {
      const deleteManyRestaurantLocation = await ctx.prisma.restaurantLocation.deleteMany(input as Prisma.RestaurantLocationDeleteManyArgs);
      return deleteManyRestaurantLocation;
    }),
  deleteOneRestaurantLocation: publicProcedure
    .input(RestaurantLocationDeleteOneSchema).mutation(async ({ ctx, input }) => {
      const deleteOneRestaurantLocation = await ctx.prisma.restaurantLocation.delete(input as Prisma.RestaurantLocationDeleteArgs);
      return deleteOneRestaurantLocation;
    }),
  findFirstRestaurantLocation: publicProcedure
    .input(RestaurantLocationFindFirstSchema).query(async ({ ctx, input }) => {
      const findFirstRestaurantLocation = await ctx.prisma.restaurantLocation.findFirst(input as Prisma.RestaurantLocationFindFirstArgs);
      return findFirstRestaurantLocation;
    }),
  findFirstRestaurantLocationOrThrow: publicProcedure
    .input(RestaurantLocationFindFirstSchema).query(async ({ ctx, input }) => {
      const findFirstRestaurantLocationOrThrow = await ctx.prisma.restaurantLocation.findFirstOrThrow(input as Prisma.RestaurantLocationFindFirstOrThrowArgs);
      return findFirstRestaurantLocationOrThrow;
    }),
  findManyRestaurantLocation: publicProcedure
    .input(RestaurantLocationFindManySchema).query(async ({ ctx, input }) => {
      const findManyRestaurantLocation = await ctx.prisma.restaurantLocation.findMany(input as Prisma.RestaurantLocationFindManyArgs);
      return findManyRestaurantLocation;
    }),
  findUniqueRestaurantLocation: publicProcedure
    .input(RestaurantLocationFindUniqueSchema).query(async ({ ctx, input }) => {
      const findUniqueRestaurantLocation = await ctx.prisma.restaurantLocation.findUnique(input as Prisma.RestaurantLocationFindUniqueArgs);
      return findUniqueRestaurantLocation;
    }),
  findUniqueRestaurantLocationOrThrow: publicProcedure
    .input(RestaurantLocationFindUniqueSchema).query(async ({ ctx, input }) => {
      const findUniqueRestaurantLocationOrThrow = await ctx.prisma.restaurantLocation.findUniqueOrThrow(input as Prisma.RestaurantLocationFindUniqueOrThrowArgs);
      return findUniqueRestaurantLocationOrThrow;
    }),
  groupByRestaurantLocation: publicProcedure
    .input(RestaurantLocationGroupBySchema).query(async ({ ctx, input }) => {
      const groupByRestaurantLocation = await ctx.prisma.restaurantLocation.groupBy({ ...({ ...input, orderBy: input.orderBy } as Prisma.RestaurantLocationGroupByArgs), orderBy: ({ ...input, orderBy: input.orderBy } as Prisma.RestaurantLocationGroupByArgs).orderBy });
      return groupByRestaurantLocation;
    }),
  updateManyRestaurantLocation: publicProcedure
    .input(RestaurantLocationUpdateManySchema).mutation(async ({ ctx, input }) => {
      const updateManyRestaurantLocation = await ctx.prisma.restaurantLocation.updateMany(input as Prisma.RestaurantLocationUpdateManyArgs);
      return updateManyRestaurantLocation;
    }),
  updateManyRestaurantLocationAndReturn: publicProcedure
    .input(RestaurantLocationUpdateManyAndReturnSchema).mutation(async ({ ctx, input }) => {
      const updateManyRestaurantLocationAndReturn = await ctx.prisma.restaurantLocation.updateManyAndReturn(input as Prisma.RestaurantLocationUpdateManyAndReturnArgs);
      return updateManyRestaurantLocationAndReturn;
    }),
  updateOneRestaurantLocation: publicProcedure
    .input(RestaurantLocationUpdateOneSchema).mutation(async ({ ctx, input }) => {
      const updateOneRestaurantLocation = await ctx.prisma.restaurantLocation.update(input as Prisma.RestaurantLocationUpdateArgs);
      return updateOneRestaurantLocation;
    }),
  upsertOneRestaurantLocation: publicProcedure
    .input(RestaurantLocationUpsertSchema).mutation(async ({ ctx, input }) => {
      const upsertOneRestaurantLocation = await ctx.prisma.restaurantLocation.upsert(input as Prisma.RestaurantLocationUpsertArgs);
      return upsertOneRestaurantLocation;
    }),
  countRestaurantLocation: publicProcedure
    .input(RestaurantLocationCountSchema).query(async ({ ctx, input }) => {
      const countRestaurantLocation = await ctx.prisma.restaurantLocation.count(input as Prisma.RestaurantLocationCountArgs);
      return countRestaurantLocation;
    }),

}) 
