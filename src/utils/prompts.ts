/**
 * Prompt generation utilities for Gemini AI
 * Centralized prompt templates for sentiment analysis and restaurant extraction
 */

import {
  CommentSentimentInput,
  PostSentimentInput,
  CommentExtractionInput,
  PostExtractionInput,
} from './gemini';

// ============================================================================
// Sentiment Analysis Prompts
// ============================================================================

const SENTIMENT_INTRO = `You are a foodie browsing Reddit to find the best places to eat.`;

const SENTIMENT_SCORE_INSTRUCTIONS = `1) rawAiScore (-1 to 1): How positively the comment makes you want to visit the restaurant(s) mentioned?
   -1 = definitely avoid, 0 = neutral, 1 = definitely want to visit.
   Focus ONLY on an impression of **taste and quality of the food**. Ignore ambiance, service, hype, or other experiences.
   A comment saying a place is "overhyped" or "just okay" should lean negative (around -0.1 to -0.4).
   If sentiment is unclear or purely factual, score 0.`;

const SENTIMENT_GUIDELINES = `**Important:**
- Base your evaluation only on the text given.
- Assume that even if there isn't a restaurant mentioned in context, the comment is still about food.
- If the text seems irrelevant to restaurant opinions, set rawAiScore to 0.
- Round numeric values to two decimal places.
- Output exactly in this format (example): 0.45`;

/**
 * Create sentiment analysis prompt for comment
 */
export function createCommentSentimentPrompt(
  input: CommentSentimentInput
): string {
  return `${SENTIMENT_INTRO} Read the following Reddit comment on a food related post and output your sentiment evaluation.

Comment text: ${input.comment_text}

Post title (use mainly for context): ${input.post_title}

Output exactly one field:

${SENTIMENT_SCORE_INSTRUCTIONS}

${SENTIMENT_GUIDELINES}`;
}

/**
 * Create sentiment analysis prompt for post
 */
export function createPostSentimentPrompt(input: PostSentimentInput): string {
  return `${SENTIMENT_INTRO} Read the following food related post and output your sentiment evaluation.

Post title: ${input.post_title}
Post text: ${input.post_text}

Output exactly one field:

${SENTIMENT_SCORE_INSTRUCTIONS}

${SENTIMENT_GUIDELINES}`;
}

// ============================================================================
// Restaurant Extraction Prompts
// ============================================================================

const EXTRACTION_OUTPUT_FORMAT = `Output **exactly in this format**:

restaurantsMentioned: [...]
primaryRestaurant: "..."
dishesMentioned: [...]
isSubjective: true/false`;

const EXTRACTION_NOTES_BASE = `**Notes:**
- Include all clearly named restaurants, even if briefly mentioned.
- Include all dishes explicitly mentioned; skip generic terms like "food" or "meal."`;

/**
 * Generate extraction notes for specific content type
 */
function getExtractionNotes(contentType: 'comment' | 'post'): string {
  return `${EXTRACTION_NOTES_BASE}
- Subjectivity should reflect whether the ${contentType} expresses an opinion about a restaurant (positive, negative, or neutral), not just factual statements.
- If nothing is mentioned for a field, use NONE.`;
}

/**
 * Generate extraction instructions for comment
 */
function createCommentExtractionInstructions(): string {
  return `Extract the following:

1) restaurantsMentioned: List all restaurants clearly referenced in the comment, post title, or post text. If none, output NONE.
2) primaryRestaurant: If the comment primarily discusses one restaurant (even if others are mentioned), output its name. Otherwise, output NONE.
3) dishesMentioned: List any specific dishes mentioned. If none, output NONE.
4) isSubjective: true if the comment expresses a personal opinion, judgment, answer to Post Title, or sentiment about any restaurant; false if purely factual, neutral, or irrelevant.

${EXTRACTION_OUTPUT_FORMAT}

${getExtractionNotes('comment')}`;
}

/**
 * Generate extraction instructions for post
 */
function createPostExtractionInstructions(): string {
  return `Extract the following:

1) restaurantsMentioned: List all restaurants clearly referenced in the post title or text. If none, output NONE.
2) primaryRestaurant: If the post primarily discusses one restaurant (even if others are mentioned), output its name. Otherwise, output NONE.
3) dishesMentioned: List any specific dishes mentioned. If none, output NONE.
4) isSubjective: true if the post expresses a personal opinion, judgment, or sentiment about any restaurant; false if purely factual, neutral, or irrelevant.

${EXTRACTION_OUTPUT_FORMAT}

${getExtractionNotes('post')}`;
}

/**
 * Create restaurant extraction prompt for comment
 */
export function createCommentExtractionPrompt(
  input: CommentExtractionInput
): string {
  const snippets = ['Read the following Reddit post and comment carefully:\n'];

  snippets.push(`Post title:\n${input.post_title}\n`);
  snippets.push(`Post text:\n${input.post_text}\n`);
  snippets.push(`Comment text:\n${input.comment_text}\n`);

  if (input.parent_text) {
    snippets.push(`Parent comment text (if any):\n${input.parent_text}\n`);
  }

  snippets.push(createCommentExtractionInstructions());

  return snippets.join('\n');
}

/**
 * Create restaurant extraction prompt for post
 */
export function createPostExtractionPrompt(input: PostExtractionInput): string {
  const snippets = ['Read the following Reddit post carefully:\n'];

  snippets.push(`Post title:\n${input.post_title}\n`);
  snippets.push(`Post text:\n${input.post_text}\n`);

  snippets.push(createPostExtractionInstructions());

  return snippets.join('\n');
}
