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

const SENTIMENT_SCORE_INSTRUCTIONS = `1) rawAiScore (-1 to 1): How positively this text makes you want to visit the restaurant(s) mentioned, based on FOOD QUALITY only.

**Scoring Guide:**
- **1.0**: Enthusiastic praise with specific details (e.g., "best I've ever had", "can't stop thinking about it")
- **0.6-0.8**: Clear positive sentiment with details (e.g., "really good", "delicious", "great tacos")
- **0.3-0.5**: Simple recommendation without details or nostalgia/craving (e.g., just naming a place)
- **0.0**: Average/okay food quality, nothing special (e.g., "it's fine", "decent", "standard")
- **-0.3 to -0.6**: Criticism about food quality (e.g., "bland", "disappointing", "not worth it")
- **-1.0**: Strong negative sentiment (e.g., "terrible", "avoid at all costs")
- **null**: Use null if text is irrelevant to food quality (questions, seeking recommendations, purely factual)

Focus ONLY on taste and food quality. Ignore price, ambiance, service, hype.
Output exactly one number rounded to two decimal places (example): 0.45, or output: null`;

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

${SENTIMENT_SCORE_INSTRUCTIONS}`;
}

/**
 * Create sentiment analysis prompt for post
 */
export function createPostSentimentPrompt(input: PostSentimentInput): string {
  return `${SENTIMENT_INTRO} Read the following food related post and output your sentiment evaluation.

Post title: ${input.post_title}
Post text: ${input.post_text}

Output exactly one field:

${SENTIMENT_SCORE_INSTRUCTIONS}`;
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
