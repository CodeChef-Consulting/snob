import { t, publicProcedure } from "./helpers/createRouter";
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
import { CommentCountSchema } from "../schemas/countComment.schema";

export const commentsRouter = t.router({
  aggregateComment: publicProcedure
    .input(CommentAggregateSchema).query(async ({ ctx, input }) => {
      const aggregateComment = await ctx.prisma.comment.aggregate(input as Prisma.CommentAggregateArgs);
      return aggregateComment;
    }),
  createManyComment: publicProcedure
    .input(CommentCreateManySchema).mutation(async ({ ctx, input }) => {
      const createManyComment = await ctx.prisma.comment.createMany(input as Prisma.CommentCreateManyArgs);
      return createManyComment;
    }),
  createManyCommentAndReturn: publicProcedure
    .input(CommentCreateManyAndReturnSchema).mutation(async ({ ctx, input }) => {
      const createManyCommentAndReturn = await ctx.prisma.comment.createManyAndReturn(input as Prisma.CommentCreateManyAndReturnArgs);
      return createManyCommentAndReturn;
    }),
  createOneComment: publicProcedure
    .input(CommentCreateOneSchema).mutation(async ({ ctx, input }) => {
      const createOneComment = await ctx.prisma.comment.create(input as Prisma.CommentCreateArgs);
      return createOneComment;
    }),
  deleteManyComment: publicProcedure
    .input(CommentDeleteManySchema).mutation(async ({ ctx, input }) => {
      const deleteManyComment = await ctx.prisma.comment.deleteMany(input as Prisma.CommentDeleteManyArgs);
      return deleteManyComment;
    }),
  deleteOneComment: publicProcedure
    .input(CommentDeleteOneSchema).mutation(async ({ ctx, input }) => {
      const deleteOneComment = await ctx.prisma.comment.delete(input as Prisma.CommentDeleteArgs);
      return deleteOneComment;
    }),
  findFirstComment: publicProcedure
    .input(CommentFindFirstSchema).query(async ({ ctx, input }) => {
      const findFirstComment = await ctx.prisma.comment.findFirst(input as Prisma.CommentFindFirstArgs);
      return findFirstComment;
    }),
  findFirstCommentOrThrow: publicProcedure
    .input(CommentFindFirstSchema).query(async ({ ctx, input }) => {
      const findFirstCommentOrThrow = await ctx.prisma.comment.findFirstOrThrow(input as Prisma.CommentFindFirstOrThrowArgs);
      return findFirstCommentOrThrow;
    }),
  findManyComment: publicProcedure
    .input(CommentFindManySchema).query(async ({ ctx, input }) => {
      const findManyComment = await ctx.prisma.comment.findMany(input as Prisma.CommentFindManyArgs);
      return findManyComment;
    }),
  findUniqueComment: publicProcedure
    .input(CommentFindUniqueSchema).query(async ({ ctx, input }) => {
      const findUniqueComment = await ctx.prisma.comment.findUnique(input as Prisma.CommentFindUniqueArgs);
      return findUniqueComment;
    }),
  findUniqueCommentOrThrow: publicProcedure
    .input(CommentFindUniqueSchema).query(async ({ ctx, input }) => {
      const findUniqueCommentOrThrow = await ctx.prisma.comment.findUniqueOrThrow(input as Prisma.CommentFindUniqueOrThrowArgs);
      return findUniqueCommentOrThrow;
    }),
  groupByComment: publicProcedure
    .input(CommentGroupBySchema).query(async ({ ctx, input }) => {
      const groupByComment = await ctx.prisma.comment.groupBy({ ...({ ...input, orderBy: input.orderBy } as Prisma.CommentGroupByArgs), orderBy: ({ ...input, orderBy: input.orderBy } as Prisma.CommentGroupByArgs).orderBy });
      return groupByComment;
    }),
  updateManyComment: publicProcedure
    .input(CommentUpdateManySchema).mutation(async ({ ctx, input }) => {
      const updateManyComment = await ctx.prisma.comment.updateMany(input as Prisma.CommentUpdateManyArgs);
      return updateManyComment;
    }),
  updateManyCommentAndReturn: publicProcedure
    .input(CommentUpdateManyAndReturnSchema).mutation(async ({ ctx, input }) => {
      const updateManyCommentAndReturn = await ctx.prisma.comment.updateManyAndReturn(input as Prisma.CommentUpdateManyAndReturnArgs);
      return updateManyCommentAndReturn;
    }),
  updateOneComment: publicProcedure
    .input(CommentUpdateOneSchema).mutation(async ({ ctx, input }) => {
      const updateOneComment = await ctx.prisma.comment.update(input as Prisma.CommentUpdateArgs);
      return updateOneComment;
    }),
  upsertOneComment: publicProcedure
    .input(CommentUpsertSchema).mutation(async ({ ctx, input }) => {
      const upsertOneComment = await ctx.prisma.comment.upsert(input as Prisma.CommentUpsertArgs);
      return upsertOneComment;
    }),
  countComment: publicProcedure
    .input(CommentCountSchema).query(async ({ ctx, input }) => {
      const countComment = await ctx.prisma.comment.count(input as Prisma.CommentCountArgs);
      return countComment;
    }),

}) 
