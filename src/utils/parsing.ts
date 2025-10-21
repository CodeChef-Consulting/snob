/**
 * Shared parsing utilities for AI responses
 */

import type {
  RestaurantExtractionResult,
  SentimentResult,
} from './types';

/**
 * Normalize extraction field: convert empty/'NONE' to null, remove spaces after commas, deduplicate
 */
export function normalizeField(value: string, deduplicate = false): string | null {
  if (!value || value === '' || value === 'NONE') {
    return null;
  }

  if (deduplicate) {
    // Split, trim, deduplicate (case-insensitive), rejoin
    const items = value
      .split(',')
      .map((item) => item.trim())
      .filter((item) => item.length > 0);
    const uniqueItems = Array.from(
      new Map(items.map((item) => [item.toLowerCase(), item])).values()
    );
    return uniqueItems.join(',');
  }

  // Just remove spaces after commas
  return value.replace(/, /g, ',');
}

/**
 * Parse sentiment response from AI
 * Handles multiple formats:
 * - JSON with code blocks: ```json\n{"rawAiScore": 0.8}\n```
 * - JSON: {"rawAiScore": 0.8}
 * - Key-value: rawAiScore: 0.8
 * - Numbered: 1) rawAiScore: 0.8
 * - Plain number: 0.8
 * - null values (returns null for rawAiScore)
 */
export function parseSentimentResponse(responseText: string): SentimentResult {
  const trimmed = responseText.trim();

  // Remove markdown code blocks if present
  let cleanedText = trimmed;
  if (trimmed.includes('```')) {
    cleanedText = trimmed.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();
  }

  // Pattern 0: Just "null" (after removing code blocks)
  if (cleanedText === 'null') {
    return { rawAiScore: null };
  }

  // Try to parse as JSON first (in case AI returns JSON format)
  if (cleanedText.startsWith('{')) {
    try {
      const parsed = JSON.parse(cleanedText);

      if (typeof parsed.rawAiScore === 'number') {
        return { rawAiScore: parsed.rawAiScore };
      }
      if (parsed.rawAiScore === null) {
        return { rawAiScore: null };
      }
    } catch (e) {
      // Fall through to regex parsing
    }
  }

  // Try to extract using regex patterns
  // Pattern 1: rawAiScore: <number> or rawAiScore: null
  let match = cleanedText.match(/rawAiScore:\s*([-\d.]+|null)/i);
  if (match) {
    const value = match[1];
    if (value === 'null') {
      return { rawAiScore: null };
    }
    const score = parseFloat(value);
    if (!isNaN(score)) {
      return { rawAiScore: score };
    }
  }

  // Pattern 2: \d+) rawAiScore: <number>
  match = cleanedText.match(/\d+\)\s*rawAiScore:\s*([-\d.]+)/i);
  if (match) {
    const score = parseFloat(match[1]);
    if (!isNaN(score)) {
      return { rawAiScore: score };
    }
  }

  // Pattern 3: Plain number
  const rawAiScore = parseFloat(cleanedText);
  if (!isNaN(rawAiScore)) {
    return { rawAiScore };
  }

  // If nothing worked, throw error
  throw new Error(`Invalid rawAiScore format: ${responseText}`);
}

/**
 * Parse restaurant extraction response from AI
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
        .replace(/^\[|\]$/g, '')
        .replace(/"/g, '');
    } else if (line.startsWith('primaryRestaurant:')) {
      primaryRestaurant = line
        .replace('primaryRestaurant:', '')
        .trim()
        .replace(/^["']|["']$/g, '')
        .replace(/"/g, '');
    } else if (line.startsWith('dishesMentioned:')) {
      dishesMentioned = line
        .replace('dishesMentioned:', '')
        .trim()
        .replace(/^\[|\]$/g, '')
        .replace(/"/g, '');
    } else if (line.startsWith('isSubjective:')) {
      const value = line.replace('isSubjective:', '').trim().toLowerCase();
      isSubjective = value === 'true';
    }
  }

  return {
    restaurantsMentioned: normalizeField(restaurantsMentioned, true),
    primaryRestaurant: normalizeField(primaryRestaurant),
    dishesMentioned: normalizeField(dishesMentioned, true), // deduplicate dishes
    isSubjective,
  };
}
