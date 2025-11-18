import Snoowrap, { Submission } from 'snoowrap';

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

  // Handle gallery posts (multiple images)
  if ((post as any).is_gallery && (post as any).media_metadata) {
    const mediaMetadata = (post as any).media_metadata;
    Object.entries(mediaMetadata).forEach(([id, data]: [string, any]) => {
      if (data.status === 'valid' && data.s) {
        const url = (data.s.u || data.s.gif || data.s.mp4)?.replace(
          /&amp;/g,
          '&'
        );
        if (url) {
          const type = data.e === 'AnimatedImage' || data.s.gif ? 'video' : 'image';
          mediaFiles.push({
            url,
            type,
            metadata: {
              source: 'gallery',
              media_id: id,
              mime_type: data.m,
              width: data.s.x,
              height: data.s.y,
            },
          });
        }
      }
    });
    return mediaFiles; // Return early for galleries
  }

  // Handle single image posts
  if (post.url && /\.(jpg|jpeg|png|gif|webp)$/i.test(post.url)) {
    mediaFiles.push({
      url: post.url,
      type: 'image',
      metadata: { source: 'post_url' },
    });
  }

  // Handle video posts
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

  // Handle preview images (fallback for non-gallery posts)
  if (post.preview?.images && !mediaFiles.length) {
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
export function createRedditClient(): Snoowrap {
  const r = new Snoowrap({
    userAgent: process.env.REDDIT_USER_AGENT!,
    clientId: process.env.REDDIT_CLIENT_ID!,
    clientSecret: process.env.REDDIT_CLIENT_SECRET!,
    username: process.env.REDDIT_USERNAME!,
    password: process.env.REDDIT_PASSWORD!,
  });

  return r;
}
