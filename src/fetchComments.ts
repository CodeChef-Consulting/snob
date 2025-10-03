import dotenv from '@dotenvx/dotenvx';
dotenv.config();

import snoowrap, { Comment, Submission } from 'snoowrap';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const r = new snoowrap({
  userAgent: process.env.REDDIT_USER_AGENT!,
  clientId: process.env.REDDIT_CLIENT_ID!,
  clientSecret: process.env.REDDIT_CLIENT_SECRET!,
  username: process.env.REDDIT_USERNAME!,
  password: process.env.REDDIT_PASSWORD!,
});

interface MediaFile {
  url: string;
  type: string;
  metadata?: any;
}

function extractMediaUrls(post: Submission): MediaFile[] {
  const mediaFiles: MediaFile[] = [];

  // Handle direct image URLs
  if (post.url && /\.(jpg|jpeg|png|gif|webp)$/i.test(post.url)) {
    mediaFiles.push({
      url: post.url,
      type: 'image',
      metadata: { source: 'post_url' },
    });
  }

  // Handle Reddit video
  if (post.is_video && post.media?.reddit_video?.fallback_url) {
    mediaFiles.push({
      url: post.media.reddit_video.fallback_url,
      type: 'video',
      metadata: {
        source: 'reddit_video',
        duration: post.media.reddit_video.duration,
        is_gif: post.media.reddit_video.is_gif,
      },
    });
  }

  // Handle preview images
  if (post.preview?.images) {
    post.preview.images.forEach((image) => {
      if (image.source?.url) {
        const url = image.source.url.replace(/&amp;/g, '&');
        if (!mediaFiles.some((f) => f.url === url)) {
          mediaFiles.push({
            url,
            type: 'image',
            metadata: {
              source: 'preview',
              width: image.source.width,
              height: image.source.height,
            },
          });
        }
      }
    });
  }

  return mediaFiles;
}

function extractMediaFromCommentBody(body: string): MediaFile[] {
  const mediaFiles: MediaFile[] = [];
  const urlRegex = /(https?:\/\/[^\s]+\.(jpg|jpeg|png|gif|webp|mp4|webm))/gi;
  const matches = body.match(urlRegex);

  if (matches) {
    matches.forEach((url) => {
      const type = /\.(mp4|webm)$/i.test(url) ? 'video' : 'image';
      mediaFiles.push({
        url,
        type,
        metadata: { source: 'comment_body' },
      });
    });
  }

  return mediaFiles;
}

async function fetchComments() {
  const subredditName = 'FoodLosAngeles';
  const posts: Submission[] = await r
    .getSubreddit(subredditName)
    .getNew({ limit: 1 });

  for (const post of posts) {
    // First, ensure the post exists in the database
    const dbPost = await prisma.post.upsert({
      where: { externalId: post.id },
      update: {
        title: post.title,
        body: post.selftext || null,
        score: post.score,
        upvoteRatio: post.upvote_ratio,
        numComments: post.num_comments,
        url: post.url,
        author: post.author.name,
        subreddit: subredditName,
        createdUtc: new Date(post.created_utc * 1000),
        updatedAt: new Date(),
      },
      create: {
        externalId: post.id,
        title: post.title,
        body: post.selftext || null,
        score: post.score,
        upvoteRatio: post.upvote_ratio,
        numComments: post.num_comments,
        url: post.url,
        author: post.author.name,
        subreddit: subredditName,
        createdUtc: new Date(post.created_utc * 1000),
      },
    });

    // Extract and save post media/files
    const postMediaUrls = extractMediaUrls(post);
    for (const media of postMediaUrls) {
      const existingFile = await prisma.file.findFirst({
        where: {
          postId: dbPost.id,
          fileUrl: media.url,
        },
      });

      if (existingFile) {
        await prisma.file.update({
          where: { id: existingFile.id },
          data: {
            fileType: media.type,
            metadata: media.metadata,
          },
        });
      } else {
        await prisma.file.create({
          data: {
            postId: dbPost.id,
            fileUrl: media.url,
            fileType: media.type,
            metadata: media.metadata,
          },
        });
      }
    }

    //@ts-ignore
    const comments = await post.expandReplies({ limit: 1000, depth: 1 });

    for (const comment of comments.comments as Comment[]) {
      // Handle parent comment ID - extract numeric ID from t1_ or t3_ prefix
      let parentDbCommentId: number | null = null;
      if (comment.parent_id.startsWith('t1_')) {
        const parentExternalId = comment.parent_id.replace('t1_', '');
        const parentComment = await prisma.comment.findUnique({
          where: { externalId: parentExternalId },
          select: { id: true },
        });
        parentDbCommentId = parentComment?.id || null;
      }

      // Upsert the comment
      const dbComment = await prisma.comment.upsert({
        where: { externalId: comment.id },
        update: {
          body: comment.body,
          score: comment.score,
          author: comment.author.name,
          createdUtc: new Date(comment.created_utc * 1000),
          updatedAt: new Date(),
        },
        create: {
          externalId: comment.id,
          postId: dbPost.id,
          parentCommentId: parentDbCommentId,
          body: comment.body,
          score: comment.score,
          author: comment.author.name,
          createdUtc: new Date(comment.created_utc * 1000),
        },
      });

      // Extract and save comment media/files
      const commentMediaUrls = extractMediaFromCommentBody(comment.body);
      for (const media of commentMediaUrls) {
        const existingFile = await prisma.file.findFirst({
          where: {
            commentId: dbComment.id,
            fileUrl: media.url,
          },
        });

        if (existingFile) {
          await prisma.file.update({
            where: { id: existingFile.id },
            data: {
              fileType: media.type,
              metadata: media.metadata,
            },
          });
        } else {
          await prisma.file.create({
            data: {
              commentId: dbComment.id,
              fileUrl: media.url,
              fileType: media.type,
              metadata: media.metadata,
            },
          });
        }
      }
    }

    console.log(
      `Processed post ${post.id} with ${comments.comments.length} comments`
    );
  }

  console.log('Fetch completed successfully');
}

fetchComments()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
