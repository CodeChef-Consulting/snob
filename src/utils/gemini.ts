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
  comment_text: string;
  post_title: string;
}

export interface PostSentimentInput {
  post_title: string;
  post_text: string;
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
  return {
    post_title: post.title || '',
    post_text: post.body || '',
  };
}

/**
 * Convert a Comment from the database to CommentSentimentInput
 */
export function commentToSentimentInput(
  comment: Comment
): CommentSentimentInput {
  return {
    comment_text: comment.body || '',
  };
}

/**
 * Fetch and convert a Comment from the database
 */
export async function fetchCommentForSentiment(
  prisma: PrismaClient,
  commentId: number
): Promise<CommentSentimentInput> {
  const comment = await prisma.comment.findUnique({
    where: { id: commentId },
  });

  if (!comment) {
    throw new Error(`Comment ${commentId} not found`);
  }

  return commentToSentimentInput(comment);
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
  return `You are a foodie browsing Reddit to find the best places to eat. Read the following Reddit comment on a food related post and output your sentiment evaluation.

Comment text: ${input.comment_text}

Post title (use mainly for context): ${input.post_title}

Output exactly one field:

1) rawAiScore (-1 to 1): How positively the comment makes you want to visit the restaurant(s) mentioned?
   -1 = definitely avoid, 0 = neutral, 1 = definitely want to visit.
   Focus ONLY on an impression of **taste and quality of the food**. Ignore ambiance, service, hype, or other experiences.
   A comment saying a place is "overhyped" or "just okay" should lean negative (around -0.1 to -0.4).
   If sentiment is unclear or purely factual, score 0.

**Important:**
- Base your evaluation only on the text given.
- Assume that even if there isn't a restaurant mentioned in context, the comment is still about food.
- If the text seems irrelevant to restaurant opinions, set rawAiScore to 0.
- Round numeric values to two decimal places.
- Output exactly in this format (example): 0.45`;
}

/**
 * Helper to create post prompt
 */
function createPostPrompt(input: PostSentimentInput): string {
  return `You are a foodie browsing Reddit to find the best places to eat. Read the following food related post and output your sentiment evaluation.

Post title: ${input.post_title}
Post text: ${input.post_text}

Output exactly one field:

1) rawAiScore (-1 to 1): How positively the comment makes you want to visit the restaurant(s) mentioned?
   -1 = definitely avoid, 0 = neutral, 1 = definitely want to visit.
   Focus ONLY on an impression of **taste and quality of the food**. Ignore ambiance, service, hype, or other experiences.
   A comment saying a place is "overhyped" or "just okay" should lean negative (around -0.1 to -0.4).
   If sentiment is unclear or purely factual, score 0.

**Important:**
- Base your evaluation only on the text given.
- Assume that even if there isn't a restaurant mentioned in context, the comment is still about food.
- If the text seems irrelevant to restaurant opinions, set rawAiScore to 0.
- Round numeric values to two decimal places.
- Output exactly in this format (example): 0.45`;
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
