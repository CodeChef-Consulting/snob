import { GoogleGenAI, createUserContent } from '@google/genai';
import { Post, Comment, PrismaClient } from '@prisma/client';

// Lazy initialization to allow dotenvx to decrypt env vars first
let genAI: GoogleGenAI | null = null;

const model = 'gemini-2.5-flash';

function getGenAI(): GoogleGenAI {
  if (!genAI) {
    if (!process.env.GEMINI_API_KEY) {
      throw new Error('GEMINI_API_KEY environment variable is required');
    }
    genAI = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
  }
  return genAI;
}

export interface CommentSentimentInput {
  post_title: string;
  post_text: string;
  post_upvotes: number;
  comment_text: string;
  comment_upvotes: number;
  parent_text?: string;
}

export interface PostSentimentInput {
  post_text: string;
  post_upvotes: number;
}

export interface SentimentResult {
  rawAiScore: number;
}

export interface CommentExtractionInput {
  post_title: string;
  post_text: string;
  comment_text: string;
  parent_text?: string;
}

export interface PostExtractionInput {
  post_title: string;
  post_text: string;
}

export interface RestaurantExtractionResult {
  restaurantsMentioned: string;
  primaryRestaurant: string;
  dishesMentioned: string;
  isSubjective: boolean;
}

/**
 * Helper function to parse evaluation response
 */
function parseSentimentResponse(responseText: string): SentimentResult {
  const rawAiScore = parseFloat(responseText);
  if (isNaN(rawAiScore)) {
    throw new Error(`Invalid rawAiScore: ${responseText}`);
  }

  return {
    rawAiScore,
  };
}

/**
 * Convert a Post from the database to PostSentimentInput
 */
export function postToSentimentInput(post: Post): PostSentimentInput {
  const post_text = [post.title, post.body].filter(Boolean).join('\n\n');

  return {
    post_text,
    post_upvotes: post.ups || 0,
  };
}

/**
 * Convert a Comment from the database to CommentSentimentInput
 * Requires the associated post and optional parent comment
 */
export async function commentToSentimentInput(
  comment: Comment,
  post: Post,
  parentComment?: Comment | null
): Promise<CommentSentimentInput> {
  const post_text = [post.title, post.body].filter(Boolean).join('\n\n');

  return {
    post_title: post.title || '',
    post_text,
    post_upvotes: post.ups || 0,
    comment_text: comment.body || '',
    comment_upvotes: comment.ups || 0,
    parent_text: parentComment?.body || undefined,
  };
}

/**
 * Fetch and convert a Comment with its context from the database
 * This is a convenience method that handles all the lookups
 */
export async function fetchCommentForSentiment(
  prisma: PrismaClient,
  commentId: number
): Promise<CommentSentimentInput> {
  const comment = await prisma.comment.findUnique({
    where: { id: commentId },
    include: {
      post: true,
      parentComment: true,
    },
  });

  if (!comment) {
    throw new Error(`Comment ${commentId} not found`);
  }

  return commentToSentimentInput(comment, comment.post, comment.parentComment);
}

/**
 * Fetch and convert a Post from the database
 */
export async function fetchPostForSentiment(
  prisma: PrismaClient,
  postId: number
): Promise<PostSentimentInput> {
  const post = await prisma.post.findUnique({
    where: { id: postId },
  });

  if (!post) {
    throw new Error(`Post ${postId} not found`);
  }

  return postToSentimentInput(post);
}

/**
 * Evaluate a Reddit comment for restaurant sentiment
 * Returns rawAiScore (-1 to 1) and restaurantsMentioned
 */
export async function evaluateComment(
  input: CommentSentimentInput
): Promise<SentimentResult> {
  try {
    const response = await getGenAI().models.generateContent({
      model,
      contents: createUserContent([createCommentPrompt(input)]),
    });

    const responseText = response.text?.trim() || '';
    return parseSentimentResponse(responseText);
  } catch (error) {
    console.error('Error evaluating comment:', error);
    throw error;
  }
}

/**
 * Helper to create comment prompt
 */
function createCommentPrompt(input: CommentSentimentInput): string {
  return `Read the following Reddit comment (and relevant context) and output your evaluation.

Primary Comment Info to Evaluate:
Comment text: ${input.comment_text}
Comment upvotes: ${input.comment_upvotes}

Secondary Comment Info for Context:
Parent comment text (if any): ${input.parent_text || 'None'}
Post title: ${input.post_title}
Post text: ${input.post_text}
Post upvotes: ${input.post_upvotes}

Output exactly one field:

1) rawAiScore (-1 to 1): How positively the comment makes you want to visit the restaurant(s) mentioned.
   -1 = definitely avoid, 0 = neutral, 1 = definitely want to visit.
   A post saying a place is "overhyped" or "just okay" should lean negative (around -0.1 to -0.4).
   If sentiment is unclear or purely factual, score 0.

**Important:**
- Base your evaluation only on the text given.
- Upvotes indicate engagement and reliability, so the sentiment (whether positive or negative) should be stronger; 5+ upvotes is notable, 10+ is substantial.
- If the text seems irrelevant to restaurant opinions, set rawAiScore to 0.
- Round numeric values to two decimal places.
- Output exactly in this format:
  rawAiScore
  Example:
  0.45`;
}

/**
 * Helper to create post prompt
 */
function createPostPrompt(input: PostSentimentInput): string {
  return `Read the following Reddit post and output your evaluation.

Post text: ${input.post_text}
Post upvotes: ${input.post_upvotes}

Output exactly one field:

1) rawAiScore (-1 to 1): How positively this post makes you want to visit the restaurant(s) mentioned.
   -1 = definitely avoid
   0 = neutral (no real opinion or unclear sentiment)
   1 = definitely want to try
   Posts that describe a restaurant as overhyped or just okay should lean negative (around -0.1 to -0.4).
   If sentiment is unclear or factual, score 0.

**Important:**
- Base your evaluation only on the text given.
- If multiple restaurants are mentioned, assume mixed or less decisive sentiment (bias toward 0).
- Upvotes indicate engagement and reliability, so the sentiment (whether positive or negative) should be stronger; 5+ upvotes is notable, 10+ is substantial.
- If the text is irrelevant to restaurant opinions, set rawAiScore to 0.
- Round numeric values to two decimal places.
- Output exactly in this format:
  rawAiScore
  Example:
  0.45`;
}

/**
 * Evaluate a Reddit post for restaurant sentiment
 * Returns rawAiScore (-1 to 1) and restaurantsMentioned
 */
export async function evaluatePost(
  input: PostSentimentInput
): Promise<SentimentResult> {
  try {
    const response = await getGenAI().models.generateContent({
      model,
      contents: createUserContent([createPostPrompt(input)]),
    });

    const responseText = response.text?.trim() || '';
    return parseSentimentResponse(responseText);
  } catch (error) {
    console.error('Error evaluating post:', error);
    throw error;
  }
}

/**
 * Helper function to parse restaurant extraction response
 */
function parseRestaurantExtractionResponse(
  responseText: string
): RestaurantExtractionResult {
  const lines = responseText.split('\n').map((line) => line.trim());

  let restaurantsMentioned = 'NONE';
  let primaryRestaurant = 'NONE';
  let dishesMentioned = 'NONE';
  let isSubjective = false;

  for (const line of lines) {
    if (line.startsWith('restaurantsMentioned:')) {
      restaurantsMentioned = line
        .replace('restaurantsMentioned:', '')
        .trim()
        .replace(/^\[|\]$/g, '');
    } else if (line.startsWith('primaryRestaurant:')) {
      primaryRestaurant = line
        .replace('primaryRestaurant:', '')
        .trim()
        .replace(/^["']|["']$/g, '');
    } else if (line.startsWith('dishesMentioned:')) {
      dishesMentioned = line
        .replace('dishesMentioned:', '')
        .trim()
        .replace(/^\[|\]$/g, '');
    } else if (line.startsWith('isSubjective:')) {
      const value = line.replace('isSubjective:', '').trim().toLowerCase();
      isSubjective = value === 'true';
    }
  }

  return {
    restaurantsMentioned,
    primaryRestaurant,
    dishesMentioned,
    isSubjective,
  };
}

/**
 * Create prompt for comment restaurant extraction
 */
function createCommentExtractionPrompt(input: CommentExtractionInput): string {
  const parts = ['Read the following Reddit post and comment carefully:\n'];

  parts.push(`Post title:\n${input.post_title}\n`);
  parts.push(`Post text:\n${input.post_text}\n`);
  parts.push(`Comment text:\n${input.comment_text}\n`);

  if (input.parent_text) {
    parts.push(`Parent comment text (if any):\n${input.parent_text}\n`);
  }

  parts.push(`Extract the following:

1) restaurantsMentioned: List all restaurants clearly referenced in the comment, post title, or post text. If none, output NONE.
2) primaryRestaurant: If the comment primarily discusses one restaurant (even if others are mentioned), output its name. Otherwise, output NONE.
3) dishesMentioned: List any specific dishes mentioned. If none, output NONE.
4) isSubjective: true if the comment expresses a personal opinion, judgment, answer to Post Title, or sentiment about any restaurant; false if purely factual, neutral, or irrelevant.

Output **exactly in this format**:

restaurantsMentioned: [...]
primaryRestaurant: "..."
dishesMentioned: [...]
isSubjective: true/false

**Notes:**
- Include all clearly named restaurants, even if briefly mentioned.
- Include all dishes explicitly mentioned; skip generic terms like "food" or "meal."
- Subjectivity should reflect whether the comment expresses an opinion about a restaurant (positive, negative, or neutral), not just factual statements.
- If nothing is mentioned for a field, use NONE.`);

  return parts.join('\n');
}

/**
 * Create prompt for post restaurant extraction
 */
function createPostExtractionPrompt(input: PostExtractionInput): string {
  const parts = ['Read the following Reddit post carefully:\n'];

  parts.push(`Post title:\n${input.post_title}\n`);
  parts.push(`Post text:\n${input.post_text}\n`);

  parts.push(`Extract the following:

1) restaurantsMentioned: List all restaurants clearly referenced in the post title or text. If none, output NONE.
2) primaryRestaurant: If the post primarily discusses one restaurant (even if others are mentioned), output its name. Otherwise, output NONE.
3) dishesMentioned: List any specific dishes mentioned. If none, output NONE.
4) isSubjective: true if the post expresses a personal opinion, judgment, or sentiment about any restaurant; false if purely factual, neutral, or irrelevant.

Output **exactly in this format**:

restaurantsMentioned: [...]
primaryRestaurant: "..."
dishesMentioned: [...]
isSubjective: true/false

**Notes:**
- Include all clearly named restaurants, even if briefly mentioned.
- Include all dishes explicitly mentioned; skip generic terms like "food" or "meal."
- Subjectivity should reflect whether the post expresses an opinion about a restaurant (positive, negative, or neutral), not just factual statements.
- If nothing is mentioned for a field, use NONE.`);

  return parts.join('\n');
}

/**
 * Extract restaurant information from a comment
 */
export async function extractCommentRestaurantInfo(
  input: CommentExtractionInput
): Promise<RestaurantExtractionResult> {
  try {
    const response = await getGenAI().models.generateContent({
      model,
      contents: createUserContent([createCommentExtractionPrompt(input)]),
    });

    const responseText = response.text?.trim() || '';
    return parseRestaurantExtractionResponse(responseText);
  } catch (error) {
    console.error('Error extracting restaurant info from comment:', error);
    throw error;
  }
}

/**
 * Extract restaurant information from a post
 */
export async function extractPostRestaurantInfo(
  input: PostExtractionInput
): Promise<RestaurantExtractionResult> {
  try {
    const response = await getGenAI().models.generateContent({
      model,
      contents: createUserContent([createPostExtractionPrompt(input)]),
    });

    const responseText = response.text?.trim() || '';
    return parseRestaurantExtractionResponse(responseText);
  } catch (error) {
    console.error('Error extracting restaurant info from post:', error);
    throw error;
  }
}
