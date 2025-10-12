import OpenAI from 'openai';
import {
  parseRestaurantExtractionResponse,
  parseSentimentResponse,
} from './parsing';
import {
  createCommentExtractionPrompt,
  createCommentSentimentPrompt,
  createPostExtractionPrompt,
  createPostSentimentPrompt,
} from './prompts';
import type {
  CommentExtractionInput,
  CommentSentimentInput,
  PostExtractionInput,
  PostSentimentInput,
  RestaurantExtractionResult,
  SentimentResult,
} from './types';

// Lazy initialization to allow dotenvx to decrypt env vars first
let openrouter: OpenAI | null = null;

// Configuration
export const DEFAULT_OPENROUTER_MODEL = 'deepseek/deepseek-chat-v3.1:free';
// 'nousresearch/deephermes-3-llama-3-8b-preview:free';

export function getOpenRouter(): OpenAI {
  if (!openrouter) {
    if (!process.env.OPEN_ROUTER_API_KEY) {
      throw new Error('OPEN_ROUTER_API_KEY environment variable is required');
    }
    openrouter = new OpenAI({
      baseURL: 'https://openrouter.ai/api/v1',
      apiKey: process.env.OPEN_ROUTER_API_KEY,
    });
  }
  return openrouter;
}

/**
 * Make a request to OpenRouter API
 */
async function callOpenRouter(
  prompt: string,
  model: string = DEFAULT_OPENROUTER_MODEL
): Promise<string> {
  const completion = await getOpenRouter().chat.completions.create({
    model,
    messages: [
      {
        role: 'user',
        content: prompt,
      },
    ],
  });

  return completion.choices[0]?.message?.content?.trim() || '';
}

// ============================================================================
// Sentiment Analysis
// ============================================================================

/**
 * Evaluate a Reddit comment for restaurant sentiment using DeepSeek
 */
export async function evaluateComment(
  input: CommentSentimentInput,
  model: string = DEFAULT_OPENROUTER_MODEL
): Promise<SentimentResult> {
  try {
    const prompt = createCommentSentimentPrompt(input);

    const responseText = await callOpenRouter(prompt, model);

    return parseSentimentResponse(responseText);
  } catch (error) {
    console.error('Error evaluating comment:', error);
    throw error;
  }
}

/**
 * Evaluate a Reddit post for restaurant sentiment using DeepSeek
 */
export async function evaluatePost(
  input: PostSentimentInput,
  model: string = DEFAULT_OPENROUTER_MODEL
): Promise<SentimentResult> {
  try {
    const prompt = createPostSentimentPrompt(input);
    const responseText = await callOpenRouter(prompt, model);
    return parseSentimentResponse(responseText);
  } catch (error) {
    console.error('Error evaluating post:', error);
    throw error;
  }
}

// ============================================================================
// Restaurant Extraction
// ============================================================================

/**
 * Extract restaurant information from a comment using DeepSeek
 */
export async function extractCommentRestaurantInfo(
  input: CommentExtractionInput,
  model: string = DEFAULT_OPENROUTER_MODEL
): Promise<RestaurantExtractionResult> {
  try {
    const prompt = createCommentExtractionPrompt(input);
    const responseText = await callOpenRouter(prompt, model);
    return parseRestaurantExtractionResponse(responseText);
  } catch (error) {
    console.error('Error extracting restaurant info from comment:', error);
    throw error;
  }
}

/**
 * Extract restaurant information from a post using DeepSeek
 */
export async function extractPostRestaurantInfo(
  input: PostExtractionInput,
  model: string = DEFAULT_OPENROUTER_MODEL
): Promise<RestaurantExtractionResult> {
  try {
    const prompt = createPostExtractionPrompt(input);
    const responseText = await callOpenRouter(prompt, model);
    return parseRestaurantExtractionResponse(responseText);
  } catch (error) {
    console.error('Error extracting restaurant info from post:', error);
    throw error;
  }
}
