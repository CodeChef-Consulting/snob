/**
 * Shared type definitions for AI responses
 */

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
  restaurantsMentioned: string | null;
  primaryRestaurant: string | null;
  dishesMentioned: string | null;
  isSubjective: boolean;
}
