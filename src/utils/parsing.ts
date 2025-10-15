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
 * Handles both plain number format and JSON format
 */
export function parseSentimentResponse(responseText: string): SentimentResult {
  const trimmed = responseText.trim();

  // Try to parse as JSON first (in case AI returns JSON format)
  if (trimmed.startsWith('{') || trimmed.startsWith('```')) {
    try {
      // Remove markdown code blocks if present
      const jsonText = trimmed.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();
      const parsed = JSON.parse(jsonText);

      if (typeof parsed.rawAiScore === 'number') {
        return { rawAiScore: parsed.rawAiScore };
      }
    } catch (e) {
      // Fall through to plain number parsing
    }
  }

  // Parse as plain number
  const rawAiScore = parseFloat(trimmed);
  if (isNaN(rawAiScore)) {
    throw new Error(`Invalid rawAiScore: ${responseText}`);
  }

  return {
    rawAiScore,
  };
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
