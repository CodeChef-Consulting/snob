import { t, publicProcedure } from "./helpers/createRouter";
import { Prisma } from "@prisma/client";
import { RestaurantGroupAggregateSchema } from "../schemas/aggregateRestaurantGroup.schema";
import { RestaurantGroupCreateManySchema } from "../schemas/createManyRestaurantGroup.schema";
import { RestaurantGroupCreateManyAndReturnSchema } from "../schemas/createManyAndReturnRestaurantGroup.schema";
import { RestaurantGroupCreateOneSchema } from "../schemas/createOneRestaurantGroup.schema";
import { RestaurantGroupDeleteManySchema } from "../schemas/deleteManyRestaurantGroup.schema";
import { RestaurantGroupDeleteOneSchema } from "../schemas/deleteOneRestaurantGroup.schema";
import { RestaurantGroupFindFirstSchema } from "../schemas/findFirstRestaurantGroup.schema";
import { RestaurantGroupFindManySchema } from "../schemas/findManyRestaurantGroup.schema";
import { RestaurantGroupFindUniqueSchema } from "../schemas/findUniqueRestaurantGroup.schema";
import { RestaurantGroupGroupBySchema } from "../schemas/groupByRestaurantGroup.schema";
import { RestaurantGroupUpdateManySchema } from "../schemas/updateManyRestaurantGroup.schema";
import { RestaurantGroupUpdateManyAndReturnSchema } from "../schemas/updateManyAndReturnRestaurantGroup.schema";
import { RestaurantGroupUpdateOneSchema } from "../schemas/updateOneRestaurantGroup.schema";
import { RestaurantGroupUpsertSchema } from "../schemas/upsertOneRestaurantGroup.schema";
import { RestaurantGroupCountSchema } from "../schemas/countRestaurantGroup.schema";

export const restaurantgroupsRouter = t.router({
  aggregateRestaurantGroup: publicProcedure
    .input(RestaurantGroupAggregateSchema).query(async ({ ctx, input }) => {
      const aggregateRestaurantGroup = await ctx.prisma.restaurantGroup.aggregate(input as Prisma.RestaurantGroupAggregateArgs);
      return aggregateRestaurantGroup;
    }),
  createManyRestaurantGroup: publicProcedure
    .input(RestaurantGroupCreateManySchema).mutation(async ({ ctx, input }) => {
      const createManyRestaurantGroup = await ctx.prisma.restaurantGroup.createMany(input as Prisma.RestaurantGroupCreateManyArgs);
      return createManyRestaurantGroup;
    }),
  createManyRestaurantGroupAndReturn: publicProcedure
    .input(RestaurantGroupCreateManyAndReturnSchema).mutation(async ({ ctx, input }) => {
      const createManyRestaurantGroupAndReturn = await ctx.prisma.restaurantGroup.createManyAndReturn(input as Prisma.RestaurantGroupCreateManyAndReturnArgs);
      return createManyRestaurantGroupAndReturn;
    }),
  createOneRestaurantGroup: publicProcedure
    .input(RestaurantGroupCreateOneSchema).mutation(async ({ ctx, input }) => {
      const createOneRestaurantGroup = await ctx.prisma.restaurantGroup.create(input as Prisma.RestaurantGroupCreateArgs);
      return createOneRestaurantGroup;
    }),
  deleteManyRestaurantGroup: publicProcedure
    .input(RestaurantGroupDeleteManySchema).mutation(async ({ ctx, input }) => {
      const deleteManyRestaurantGroup = await ctx.prisma.restaurantGroup.deleteMany(input as Prisma.RestaurantGroupDeleteManyArgs);
      return deleteManyRestaurantGroup;
    }),
  deleteOneRestaurantGroup: publicProcedure
    .input(RestaurantGroupDeleteOneSchema).mutation(async ({ ctx, input }) => {
      const deleteOneRestaurantGroup = await ctx.prisma.restaurantGroup.delete(input as Prisma.RestaurantGroupDeleteArgs);
      return deleteOneRestaurantGroup;
    }),
  findFirstRestaurantGroup: publicProcedure
    .input(RestaurantGroupFindFirstSchema).query(async ({ ctx, input }) => {
      const findFirstRestaurantGroup = await ctx.prisma.restaurantGroup.findFirst(input as Prisma.RestaurantGroupFindFirstArgs);
      return findFirstRestaurantGroup;
    }),
  findFirstRestaurantGroupOrThrow: publicProcedure
    .input(RestaurantGroupFindFirstSchema).query(async ({ ctx, input }) => {
      const findFirstRestaurantGroupOrThrow = await ctx.prisma.restaurantGroup.findFirstOrThrow(input as Prisma.RestaurantGroupFindFirstOrThrowArgs);
      return findFirstRestaurantGroupOrThrow;
    }),
  findManyRestaurantGroup: publicProcedure
    .input(RestaurantGroupFindManySchema).query(async ({ ctx, input }) => {
      const findManyRestaurantGroup = await ctx.prisma.restaurantGroup.findMany(input as Prisma.RestaurantGroupFindManyArgs);
      return findManyRestaurantGroup;
    }),
  findUniqueRestaurantGroup: publicProcedure
    .input(RestaurantGroupFindUniqueSchema).query(async ({ ctx, input }) => {
      const findUniqueRestaurantGroup = await ctx.prisma.restaurantGroup.findUnique(input as Prisma.RestaurantGroupFindUniqueArgs);
      return findUniqueRestaurantGroup;
    }),
  findUniqueRestaurantGroupOrThrow: publicProcedure
    .input(RestaurantGroupFindUniqueSchema).query(async ({ ctx, input }) => {
      const findUniqueRestaurantGroupOrThrow = await ctx.prisma.restaurantGroup.findUniqueOrThrow(input as Prisma.RestaurantGroupFindUniqueOrThrowArgs);
      return findUniqueRestaurantGroupOrThrow;
    }),
  groupByRestaurantGroup: publicProcedure
    .input(RestaurantGroupGroupBySchema).query(async ({ ctx, input }) => {
      const groupByRestaurantGroup = await ctx.prisma.restaurantGroup.groupBy({ ...({ ...input, orderBy: input.orderBy } as Prisma.RestaurantGroupGroupByArgs), orderBy: ({ ...input, orderBy: input.orderBy } as Prisma.RestaurantGroupGroupByArgs).orderBy });
      return groupByRestaurantGroup;
    }),
  updateManyRestaurantGroup: publicProcedure
    .input(RestaurantGroupUpdateManySchema).mutation(async ({ ctx, input }) => {
      const updateManyRestaurantGroup = await ctx.prisma.restaurantGroup.updateMany(input as Prisma.RestaurantGroupUpdateManyArgs);
      return updateManyRestaurantGroup;
    }),
  updateManyRestaurantGroupAndReturn: publicProcedure
    .input(RestaurantGroupUpdateManyAndReturnSchema).mutation(async ({ ctx, input }) => {
      const updateManyRestaurantGroupAndReturn = await ctx.prisma.restaurantGroup.updateManyAndReturn(input as Prisma.RestaurantGroupUpdateManyAndReturnArgs);
      return updateManyRestaurantGroupAndReturn;
    }),
  updateOneRestaurantGroup: publicProcedure
    .input(RestaurantGroupUpdateOneSchema).mutation(async ({ ctx, input }) => {
      const updateOneRestaurantGroup = await ctx.prisma.restaurantGroup.update(input as Prisma.RestaurantGroupUpdateArgs);
      return updateOneRestaurantGroup;
    }),
  upsertOneRestaurantGroup: publicProcedure
    .input(RestaurantGroupUpsertSchema).mutation(async ({ ctx, input }) => {
      const upsertOneRestaurantGroup = await ctx.prisma.restaurantGroup.upsert(input as Prisma.RestaurantGroupUpsertArgs);
      return upsertOneRestaurantGroup;
    }),
  countRestaurantGroup: publicProcedure
    .input(RestaurantGroupCountSchema).query(async ({ ctx, input }) => {
      const countRestaurantGroup = await ctx.prisma.restaurantGroup.count(input as Prisma.RestaurantGroupCountArgs);
      return countRestaurantGroup;
    }),

}) 
