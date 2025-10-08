import snoowrap, { Submission } from 'snoowrap';

export interface MediaFile {
  url: string;
  type: string;
  metadata?: any;
}

/**
 * Extract media URLs from a Reddit post
 */
export function extractMediaUrls(post: Submission): MediaFile[] {
  const mediaFiles: MediaFile[] = [];

  if (post.url && /\.(jpg|jpeg|png|gif|webp)$/i.test(post.url)) {
    mediaFiles.push({
      url: post.url,
      type: 'image',
      metadata: { source: 'post_url' },
    });
  }

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

/**
 * Extract media URLs from comment body text
 */
export function extractMediaFromCommentBody(body: string): MediaFile[] {
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

/**
 * Create a configured snoowrap instance
 */
export function createRedditClient(): snoowrap {
  const r = new snoowrap({
    userAgent: process.env.REDDIT_USER_AGENT!,
    clientId: process.env.REDDIT_CLIENT_ID!,
    clientSecret: process.env.REDDIT_CLIENT_SECRET!,
    username: process.env.REDDIT_USERNAME!,
    password: process.env.REDDIT_PASSWORD!,
  });

  r.config({ requestDelay: 100, continueAfterRatelimitError: false });

  return r;
}
