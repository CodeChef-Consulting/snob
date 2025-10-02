import { t, protectedProcedure } from "./helpers/createRouter";
import { Prisma } from "@prisma/client";
import { PostAggregateSchema } from "../schemas/aggregatePost.schema";
import { PostCreateManySchema } from "../schemas/createManyPost.schema";
import { PostCreateManyAndReturnSchema } from "../schemas/createManyAndReturnPost.schema";
import { PostCreateOneSchema } from "../schemas/createOnePost.schema";
import { PostDeleteManySchema } from "../schemas/deleteManyPost.schema";
import { PostDeleteOneSchema } from "../schemas/deleteOnePost.schema";
import { PostFindFirstSchema } from "../schemas/findFirstPost.schema";
import { PostFindManySchema } from "../schemas/findManyPost.schema";
import { PostFindUniqueSchema } from "../schemas/findUniquePost.schema";
import { PostGroupBySchema } from "../schemas/groupByPost.schema";
import { PostUpdateManySchema } from "../schemas/updateManyPost.schema";
import { PostUpdateManyAndReturnSchema } from "../schemas/updateManyAndReturnPost.schema";
import { PostUpdateOneSchema } from "../schemas/updateOnePost.schema";
import { PostUpsertSchema } from "../schemas/upsertOnePost.schema";

export const postsRouter = t.router({
  aggregatePost: protectedProcedure
    .input(PostAggregateSchema).query(async ({ ctx, input }) => {
      const aggregatePost = await ctx.prisma.post.aggregate(input as Prisma.PostAggregateArgs);
      return aggregatePost;
    }),
  createManyPost: protectedProcedure
    .input(PostCreateManySchema).mutation(async ({ ctx, input }) => {
      const createManyPost = await ctx.prisma.post.createMany(input as Prisma.PostCreateManyArgs);
      return createManyPost;
    }),
  createManyPostAndReturn: protectedProcedure
    .input(PostCreateManyAndReturnSchema).mutation(async ({ ctx, input }) => {
      const createManyPostAndReturn = await ctx.prisma.post.createManyAndReturn(input as Prisma.PostCreateManyAndReturnArgs);
      return createManyPostAndReturn;
    }),
  createOnePost: protectedProcedure
    .input(PostCreateOneSchema).mutation(async ({ ctx, input }) => {
      const createOnePost = await ctx.prisma.post.create(input as Prisma.PostCreateArgs);
      return createOnePost;
    }),
  deleteManyPost: protectedProcedure
    .input(PostDeleteManySchema).mutation(async ({ ctx, input }) => {
      const deleteManyPost = await ctx.prisma.post.deleteMany(input as Prisma.PostDeleteManyArgs);
      return deleteManyPost;
    }),
  deleteOnePost: protectedProcedure
    .input(PostDeleteOneSchema).mutation(async ({ ctx, input }) => {
      const deleteOnePost = await ctx.prisma.post.delete(input as Prisma.PostDeleteArgs);
      return deleteOnePost;
    }),
  findFirstPost: protectedProcedure
    .input(PostFindFirstSchema).query(async ({ ctx, input }) => {
      const findFirstPost = await ctx.prisma.post.findFirst(input as Prisma.PostFindFirstArgs);
      return findFirstPost;
    }),
  findFirstPostOrThrow: protectedProcedure
    .input(PostFindFirstSchema).query(async ({ ctx, input }) => {
      const findFirstPostOrThrow = await ctx.prisma.post.findFirstOrThrow(input as Prisma.PostFindFirstOrThrowArgs);
      return findFirstPostOrThrow;
    }),
  findManyPost: protectedProcedure
    .input(PostFindManySchema).query(async ({ ctx, input }) => {
      const findManyPost = await ctx.prisma.post.findMany(input as Prisma.PostFindManyArgs);
      return findManyPost;
    }),
  findUniquePost: protectedProcedure
    .input(PostFindUniqueSchema).query(async ({ ctx, input }) => {
      const findUniquePost = await ctx.prisma.post.findUnique(input as Prisma.PostFindUniqueArgs);
      return findUniquePost;
    }),
  findUniquePostOrThrow: protectedProcedure
    .input(PostFindUniqueSchema).query(async ({ ctx, input }) => {
      const findUniquePostOrThrow = await ctx.prisma.post.findUniqueOrThrow(input as Prisma.PostFindUniqueOrThrowArgs);
      return findUniquePostOrThrow;
    }),
  groupByPost: protectedProcedure
    .input(PostGroupBySchema).query(async ({ ctx, input }) => {
      const groupByPost = await ctx.prisma.post.groupBy({ ...({ ...input, orderBy: input.orderBy } as Prisma.PostGroupByArgs), orderBy: ({ ...input, orderBy: input.orderBy } as Prisma.PostGroupByArgs).orderBy });
      return groupByPost;
    }),
  updateManyPost: protectedProcedure
    .input(PostUpdateManySchema).mutation(async ({ ctx, input }) => {
      const updateManyPost = await ctx.prisma.post.updateMany(input as Prisma.PostUpdateManyArgs);
      return updateManyPost;
    }),
  updateManyPostAndReturn: protectedProcedure
    .input(PostUpdateManyAndReturnSchema).mutation(async ({ ctx, input }) => {
      const updateManyPostAndReturn = await ctx.prisma.post.updateManyAndReturn(input as Prisma.PostUpdateManyAndReturnArgs);
      return updateManyPostAndReturn;
    }),
  updateOnePost: protectedProcedure
    .input(PostUpdateOneSchema).mutation(async ({ ctx, input }) => {
      const updateOnePost = await ctx.prisma.post.update(input as Prisma.PostUpdateArgs);
      return updateOnePost;
    }),
  upsertOnePost: protectedProcedure
    .input(PostUpsertSchema).mutation(async ({ ctx, input }) => {
      const upsertOnePost = await ctx.prisma.post.upsert(input as Prisma.PostUpsertArgs);
      return upsertOnePost;
    }),

}) 
