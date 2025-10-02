import { t, protectedProcedure } from "./helpers/createRouter";
import { Prisma } from "@prisma/client";
import { CommentAggregateSchema } from "../schemas/aggregateComment.schema";
import { CommentCreateManySchema } from "../schemas/createManyComment.schema";
import { CommentCreateManyAndReturnSchema } from "../schemas/createManyAndReturnComment.schema";
import { CommentCreateOneSchema } from "../schemas/createOneComment.schema";
import { CommentDeleteManySchema } from "../schemas/deleteManyComment.schema";
import { CommentDeleteOneSchema } from "../schemas/deleteOneComment.schema";
import { CommentFindFirstSchema } from "../schemas/findFirstComment.schema";
import { CommentFindManySchema } from "../schemas/findManyComment.schema";
import { CommentFindUniqueSchema } from "../schemas/findUniqueComment.schema";
import { CommentGroupBySchema } from "../schemas/groupByComment.schema";
import { CommentUpdateManySchema } from "../schemas/updateManyComment.schema";
import { CommentUpdateManyAndReturnSchema } from "../schemas/updateManyAndReturnComment.schema";
import { CommentUpdateOneSchema } from "../schemas/updateOneComment.schema";
import { CommentUpsertSchema } from "../schemas/upsertOneComment.schema";

export const commentsRouter = t.router({
  aggregateComment: protectedProcedure
    .input(CommentAggregateSchema).query(async ({ ctx, input }) => {
      const aggregateComment = await ctx.prisma.comment.aggregate(input as Prisma.CommentAggregateArgs);
      return aggregateComment;
    }),
  createManyComment: protectedProcedure
    .input(CommentCreateManySchema).mutation(async ({ ctx, input }) => {
      const createManyComment = await ctx.prisma.comment.createMany(input as Prisma.CommentCreateManyArgs);
      return createManyComment;
    }),
  createManyCommentAndReturn: protectedProcedure
    .input(CommentCreateManyAndReturnSchema).mutation(async ({ ctx, input }) => {
      const createManyCommentAndReturn = await ctx.prisma.comment.createManyAndReturn(input as Prisma.CommentCreateManyAndReturnArgs);
      return createManyCommentAndReturn;
    }),
  createOneComment: protectedProcedure
    .input(CommentCreateOneSchema).mutation(async ({ ctx, input }) => {
      const createOneComment = await ctx.prisma.comment.create(input as Prisma.CommentCreateArgs);
      return createOneComment;
    }),
  deleteManyComment: protectedProcedure
    .input(CommentDeleteManySchema).mutation(async ({ ctx, input }) => {
      const deleteManyComment = await ctx.prisma.comment.deleteMany(input as Prisma.CommentDeleteManyArgs);
      return deleteManyComment;
    }),
  deleteOneComment: protectedProcedure
    .input(CommentDeleteOneSchema).mutation(async ({ ctx, input }) => {
      const deleteOneComment = await ctx.prisma.comment.delete(input as Prisma.CommentDeleteArgs);
      return deleteOneComment;
    }),
  findFirstComment: protectedProcedure
    .input(CommentFindFirstSchema).query(async ({ ctx, input }) => {
      const findFirstComment = await ctx.prisma.comment.findFirst(input as Prisma.CommentFindFirstArgs);
      return findFirstComment;
    }),
  findFirstCommentOrThrow: protectedProcedure
    .input(CommentFindFirstSchema).query(async ({ ctx, input }) => {
      const findFirstCommentOrThrow = await ctx.prisma.comment.findFirstOrThrow(input as Prisma.CommentFindFirstOrThrowArgs);
      return findFirstCommentOrThrow;
    }),
  findManyComment: protectedProcedure
    .input(CommentFindManySchema).query(async ({ ctx, input }) => {
      const findManyComment = await ctx.prisma.comment.findMany(input as Prisma.CommentFindManyArgs);
      return findManyComment;
    }),
  findUniqueComment: protectedProcedure
    .input(CommentFindUniqueSchema).query(async ({ ctx, input }) => {
      const findUniqueComment = await ctx.prisma.comment.findUnique(input as Prisma.CommentFindUniqueArgs);
      return findUniqueComment;
    }),
  findUniqueCommentOrThrow: protectedProcedure
    .input(CommentFindUniqueSchema).query(async ({ ctx, input }) => {
      const findUniqueCommentOrThrow = await ctx.prisma.comment.findUniqueOrThrow(input as Prisma.CommentFindUniqueOrThrowArgs);
      return findUniqueCommentOrThrow;
    }),
  groupByComment: protectedProcedure
    .input(CommentGroupBySchema).query(async ({ ctx, input }) => {
      const groupByComment = await ctx.prisma.comment.groupBy({ ...({ ...input, orderBy: input.orderBy } as Prisma.CommentGroupByArgs), orderBy: ({ ...input, orderBy: input.orderBy } as Prisma.CommentGroupByArgs).orderBy });
      return groupByComment;
    }),
  updateManyComment: protectedProcedure
    .input(CommentUpdateManySchema).mutation(async ({ ctx, input }) => {
      const updateManyComment = await ctx.prisma.comment.updateMany(input as Prisma.CommentUpdateManyArgs);
      return updateManyComment;
    }),
  updateManyCommentAndReturn: protectedProcedure
    .input(CommentUpdateManyAndReturnSchema).mutation(async ({ ctx, input }) => {
      const updateManyCommentAndReturn = await ctx.prisma.comment.updateManyAndReturn(input as Prisma.CommentUpdateManyAndReturnArgs);
      return updateManyCommentAndReturn;
    }),
  updateOneComment: protectedProcedure
    .input(CommentUpdateOneSchema).mutation(async ({ ctx, input }) => {
      const updateOneComment = await ctx.prisma.comment.update(input as Prisma.CommentUpdateArgs);
      return updateOneComment;
    }),
  upsertOneComment: protectedProcedure
    .input(CommentUpsertSchema).mutation(async ({ ctx, input }) => {
      const upsertOneComment = await ctx.prisma.comment.upsert(input as Prisma.CommentUpsertArgs);
      return upsertOneComment;
    }),

}) 
