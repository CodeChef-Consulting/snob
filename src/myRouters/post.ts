import { z } from 'zod';
import { router, publicProcedure } from '../server/trpc';

export const postRouter = router({
  list: publicProcedure
    .input(
      z.object({
        limit: z.number().min(1).max(100).default(10),
        cursor: z.number().optional(),
        subreddit: z.string().optional(),
      })
    )
    .query(async ({ ctx, input }) => {
      const { limit, cursor, subreddit } = input;

      const posts = await ctx.prisma.post.findMany({
        take: limit + 1,
        cursor: cursor ? { id: cursor } : undefined,
        where: subreddit ? { subreddit } : undefined,
        orderBy: { createdAt: 'desc' },
        include: {
          _count: {
            select: { comments: true, files: true },
          },
        },
      });

      let nextCursor: number | undefined = undefined;
      if (posts.length > limit) {
        const nextItem = posts.pop();
        nextCursor = nextItem!.id;
      }

      return {
        posts,
        nextCursor,
      };
    }),

  byId: publicProcedure
    .input(z.object({ id: z.number() }))
    .query(async ({ ctx, input }) => {
      const post = await ctx.prisma.post.findUnique({
        where: { id: input.id },
        include: {
          comments: {
            where: { parentCommentId: null },
            include: {
              replies: true,
              files: true,
            },
          },
          files: true,
        },
      });
      return post;
    }),

  create: publicProcedure
    .input(
      z.object({
        externalId: z.string(),
        subreddit: z.string(),
        author: z.string().optional(),
        title: z.string().optional(),
        body: z.string().optional(),
        score: z.number().optional(),
        upvoteRatio: z.number().optional(),
        numComments: z.number().optional(),
        url: z.string().optional(),
        createdUtc: z.date().optional(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const post = await ctx.prisma.post.create({
        data: input,
      });
      return post;
    }),

  update: publicProcedure
    .input(
      z.object({
        id: z.number(),
        data: z.object({
          title: z.string().optional(),
          body: z.string().optional(),
          score: z.number().optional(),
          upvoteRatio: z.number().optional(),
          numComments: z.number().optional(),
        }),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const post = await ctx.prisma.post.update({
        where: { id: input.id },
        data: input.data,
      });
      return post;
    }),

  delete: publicProcedure
    .input(z.object({ id: z.number() }))
    .mutation(async ({ ctx, input }) => {
      await ctx.prisma.post.delete({
        where: { id: input.id },
      });
      return { success: true };
    }),
});
