import { z } from 'zod';
import { publicProcedure, t } from './generated/routers/helpers/createRouter';

export const fileRouter = t.router({
  byPostId: publicProcedure
    .input(z.object({ postId: z.number() }))
    .query(async ({ ctx, input }) => {
      const files = await ctx.prisma.file.findMany({
        where: { postId: input.postId },
        orderBy: { createdAt: 'desc' },
      });
      return files;
    }),

  byCommentId: publicProcedure
    .input(z.object({ commentId: z.number() }))
    .query(async ({ ctx, input }) => {
      const files = await ctx.prisma.file.findMany({
        where: { commentId: input.commentId },
        orderBy: { createdAt: 'desc' },
      });
      return files;
    }),

  create: publicProcedure
    .input(
      z.object({
        postId: z.number().optional(),
        commentId: z.number().optional(),
        fileUrl: z.string(),
        fileType: z.string(),
        metadata: z.any().optional(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const file = await ctx.prisma.file.create({
        data: input,
      });
      return file;
    }),

  delete: publicProcedure
    .input(z.object({ id: z.number() }))
    .mutation(async ({ ctx, input }) => {
      await ctx.prisma.file.delete({
        where: { id: input.id },
      });
      return { success: true };
    }),
});
