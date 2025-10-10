import type { BatchJob as GeminiBatchJob } from '@google/genai';
import { createUserContent, GoogleGenAI, JobState } from '@google/genai';
import { PrismaClient } from '@prisma/client';
import {
  createCommentSentimentPrompt,
  createPostSentimentPrompt,
  createCommentExtractionPrompt,
  createPostExtractionPrompt,
} from './prompts';

// Lazy initialization to allow dotenvx to decrypt env vars first
let genAI: GoogleGenAI | null = null;

const model = 'gemini-2.5-flash';

export function getGenAI(): GoogleGenAI {
  if (!genAI) {
    if (!process.env.GEMINI_API_KEY) {
      throw new Error('GEMINI_API_KEY environment variable is required');
    }
    genAI = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
  }
  return genAI;
}

// ============================================================================
// Type Definitions
// ============================================================================

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

// ============================================================================
// Sentiment Analysis
// ============================================================================

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
 * Evaluate a Reddit comment for restaurant sentiment
 * Returns rawAiScore (-1 to 1) and restaurantsMentioned
 */
export async function evaluateComment(
  input: CommentSentimentInput
): Promise<SentimentResult> {
  try {
    const response = await getGenAI().models.generateContent({
      model,
      contents: createUserContent([createCommentSentimentPrompt(input)]),
    });

    const responseText = response.text?.trim() || '';
    return parseSentimentResponse(responseText);
  } catch (error) {
    console.error('Error evaluating comment:', error);
    throw error;
  }
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
      contents: createUserContent([createPostSentimentPrompt(input)]),
    });

    const responseText = response.text?.trim() || '';
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
 * Helper function to parse restaurant extraction response
 */
export function parseRestaurantExtractionResponse(
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

// ============================================================================
// Batch Job Utilities
// ============================================================================

/**
 * Terminal states where batch job is no longer processing
 */
export const TERMINAL_STATES = new Set([
  JobState.JOB_STATE_SUCCEEDED,
  JobState.JOB_STATE_FAILED,
  JobState.JOB_STATE_CANCELLED,
  JobState.JOB_STATE_EXPIRED,
]);

/**
 * Map Gemini JobState to database status
 */
export const JOB_STATE_TO_DB_STATUS: Record<string, string> = {
  [JobState.JOB_STATE_SUCCEEDED]: 'succeeded',
  [JobState.JOB_STATE_FAILED]: 'failed',
  [JobState.JOB_STATE_CANCELLED]: 'cancelled',
  [JobState.JOB_STATE_EXPIRED]: 'expired',
  [JobState.JOB_STATE_RUNNING]: 'running',
  [JobState.JOB_STATE_QUEUED]: 'submitted',
  [JobState.JOB_STATE_PENDING]: 'submitted',
};

/**
 * Get status emoji for batch job
 */
export function getStatusEmoji(status: string): string {
  const emojiMap: Record<string, string> = {
    pending: '⏸️',
    submitted: '📤',
    running: '⏳',
    succeeded: '✅',
    failed: '❌',
    cancelled: '🚫',
    expired: '⏰',
  };
  return emojiMap[status] || '❓';
}

/**
 * Check if a batch job state is terminal (no longer processing)
 */
export function isTerminalState(state: string): boolean {
  return TERMINAL_STATES.has(state as JobState);
}

/**
 * Convert Gemini job state to database status
 */
export function geminiStateToDatabaseStatus(state: string): string {
  return JOB_STATE_TO_DB_STATUS[state] || 'failed';
}

/**
 * Fetch batch job from Gemini API
 */
export async function fetchGeminiBatchJob(
  geminiJobName: string
): Promise<GeminiBatchJob> {
  return getGenAI().batches.get({ name: geminiJobName });
}

/**
 * Save extraction result to database
 */
export async function saveExtraction(
  prisma: PrismaClient,
  result: RestaurantExtractionResult & { postId?: number; commentId?: number },
  modelName: string
): Promise<void> {
  const data = {
    restaurantsMentioned: result.restaurantsMentioned,
    primaryRestaurant: result.primaryRestaurant,
    dishesMentioned: result.dishesMentioned,
    isSubjective: result.isSubjective,
    model: modelName,
    extractedAt: new Date(),
  };

  if (result.postId) {
    await prisma.restaurantExtraction.upsert({
      where: { postId: result.postId },
      create: { ...data, postId: result.postId },
      update: data,
    });
  } else if (result.commentId) {
    await prisma.restaurantExtraction.upsert({
      where: { commentId: result.commentId },
      create: { ...data, commentId: result.commentId },
      update: data,
    });
  }
}

/**
 * Update batch job status in database
 */
export async function updateBatchJobStatus(
  prisma: PrismaClient,
  batchJobId: number,
  status: string,
  options?: {
    completedAt?: Date;
    error?: string | null;
  }
): Promise<void> {
  await prisma.batchJob.update({
    where: { id: batchJobId },
    data: {
      status,
      ...options,
    },
  });
}

/**
 * Mark batch job extractions as saved
 */
export async function markExtractionsAsSaved(
  prisma: PrismaClient,
  batchJobId: number,
  successCount: number,
  errorCount: number
): Promise<void> {
  await prisma.batchJob.update({
    where: { id: batchJobId },
    data: {
      extractionsSaved: true,
      extractionsSavedAt: new Date(),
      successCount,
      errorCount,
    },
  });
}
