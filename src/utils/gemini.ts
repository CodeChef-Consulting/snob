import type { BatchJob as GeminiBatchJob } from '@google/genai';
import { createUserContent, GoogleGenAI, JobState } from '@google/genai';
import { PrismaClient } from '@prisma/client';
import {
  createCommentExtractionPrompt,
  createCommentSentimentPrompt,
  createPostExtractionPrompt,
  createPostSentimentPrompt,
} from './prompts';
import {
  parseSentimentResponse,
  parseRestaurantExtractionResponse,
} from './parsing';
import type {
  CommentSentimentInput,
  PostSentimentInput,
  SentimentResult,
  CommentExtractionInput,
  PostExtractionInput,
  RestaurantExtractionResult,
} from './types';

// Lazy initialization to allow dotenvx to decrypt env vars first
let genAI: GoogleGenAI | null = null;

// Configuration
export const DEFAULT_GEMINI_MODEL = 'gemini-2.5-flash';

export function getGenAI(): GoogleGenAI {
  if (!genAI) {
    if (!process.env.GOOGLE_API_KEY) {
      throw new Error('GOOGLE_API_KEY environment variable is required');
    }
    genAI = new GoogleGenAI({ apiKey: process.env.GOOGLE_API_KEY });
  }
  return genAI;
}

// Re-export types for convenience
export type {
  CommentSentimentInput,
  PostSentimentInput,
  SentimentResult,
  CommentExtractionInput,
  PostExtractionInput,
  RestaurantExtractionResult,
} from './types';

// ============================================================================
// Sentiment Analysis
// ============================================================================

/**
 * Evaluate a Reddit comment for restaurant sentiment
 * Returns rawAiScore (-1 to 1) and restaurantsMentioned
 */
export async function evaluateComment(
  input: CommentSentimentInput,
  model: string = DEFAULT_GEMINI_MODEL
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
  input: PostSentimentInput,
  model: string = DEFAULT_GEMINI_MODEL
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

// Re-export parsing functions for convenience
export { parseRestaurantExtractionResponse } from './parsing';

// ============================================================================
// Restaurant Extraction
// ============================================================================

/**
 * Extract restaurant information from a comment
 */
export async function extractCommentRestaurantInfo(
  input: CommentExtractionInput,
  model: string = DEFAULT_GEMINI_MODEL
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
  input: PostExtractionInput,
  model: string = DEFAULT_GEMINI_MODEL
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
