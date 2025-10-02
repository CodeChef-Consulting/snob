import { z } from 'zod';
import { router, publicProcedure } from '../server/trpc';

export const commentRouter = router({
  byPostId: publicProcedure
    .input(z.object({ postId: z.number() }))
    .query(async ({ ctx, input }) => {
      const comments = await ctx.prisma.comment.findMany({
        where: {
          postId: input.postId,
          parentCommentId: null,
        },
        include: {
          replies: {
            include: {
              replies: true,
              files: true,
            },
          },
          files: true,
        },
        orderBy: { score: 'desc' },
      });
      return comments;
    }),

  create: publicProcedure
    .input(
      z.object({
        externalId: z.string(),
        postId: z.number(),
        parentCommentId: z.number().optional(),
        author: z.string().optional(),
        body: z.string().optional(),
        score: z.number().optional(),
        createdUtc: z.date().optional(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const comment = await ctx.prisma.comment.create({
        data: input,
      });
      return comment;
    }),

  update: publicProcedure
    .input(
      z.object({
        id: z.number(),
        data: z.object({
          body: z.string().optional(),
          score: z.number().optional(),
        }),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const comment = await ctx.prisma.comment.update({
        where: { id: input.id },
        data: input.data,
      });
      return comment;
    }),

  delete: publicProcedure
    .input(z.object({ id: z.number() }))
    .mutation(async ({ ctx, input }) => {
      await ctx.prisma.comment.delete({
        where: { id: input.id },
      });
      return { success: true };
    }),
});
