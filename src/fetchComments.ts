import dotenv from '@dotenvx/dotenvx';
dotenv.config();

import snoowrap, { Comment, Submission } from 'snoowrap';

interface RedditComment {
  commentId: string;
  parentCommentId: string | null;
  threadId: string;
  threadTitle: string;
  communityId: string;
  commentExt: string;
}

const r = new snoowrap({
  userAgent: process.env.REDDIT_USER_AGENT!,
  clientId: process.env.REDDIT_CLIENT_ID!,
  clientSecret: process.env.REDDIT_CLIENT_SECRET!,
  username: process.env.REDDIT_USERNAME!,
  password: process.env.REDDIT_PASSWORD!,
});

async function fetchComments(): Promise<RedditComment[]> {
  const subredditName = 'FoodLosAngeles';
  const posts: Submission[] = await r
    .getSubreddit(subredditName)
    .getNew({ limit: 1 });

  const allComments: RedditComment[] = [];

  for (const post of posts) {
    const threadId = post.id;
    const communityId = subredditName;

    //@ts-ignore
    const comments = await post.expandReplies({ limit: 1000, depth: 1 });

    comments.comments.forEach((comment: Comment) => {
      allComments.push({
        commentId: comment.id,
        parentCommentId: comment.parent_id.startsWith('t1_')
          ? comment.parent_id.replace('t1_', '')
          : null,
        threadId,
        threadTitle: post.title,
        communityId,
        commentExt: comment.body,
      });
    });
  }

  console.log(allComments);
  return allComments;
}

fetchComments().catch(console.error);
