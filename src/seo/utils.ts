// SEO utility functions for ecommittra.com
// Used by content editors and property-based tests

import type { KeywordDensityResult } from './types';

const CANONICAL_DOMAIN = 'https://ecommittra.com';

/**
 * Calculate keyword density for a given body text and keyword.
 * Counts whole-word, case-insensitive occurrences.
 *
 * @param bodyText - The full body text to analyse
 * @param keyword  - The keyword to count
 * @returns KeywordDensityResult with occurrences, totalWords, and densityPercent
 *
 * Requirements: 12.4
 */
export function calculateKeywordDensity(
  bodyText: string,
  keyword: string
): KeywordDensityResult {
  // Edge case: empty text
  if (!bodyText || bodyText.trim().length === 0) {
    return { keyword, occurrences: 0, totalWords: 0, densityPercent: 0 };
  }

  // Split on whitespace to get words; filter out empty strings
  const words = bodyText.trim().split(/\s+/).filter(Boolean);
  const totalWords = words.length;

  if (totalWords === 0 || !keyword || keyword.trim().length === 0) {
    return { keyword, occurrences: 0, totalWords, densityPercent: 0 };
  }

  // Use a regex for whole-word, case-insensitive matching
  // Escape any regex special characters in the keyword
  const escaped = keyword.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const regex = new RegExp(`\\b${escaped}\\b`, 'gi');
  const matches = bodyText.match(regex);
  const occurrences = matches ? matches.length : 0;

  const densityPercent = (occurrences / totalWords) * 100;

  return { keyword, occurrences, totalWords, densityPercent };
}

/**
 * Calculate content similarity between two texts using Jaccard similarity
 * on word trigrams.
 *
 * Returns a value in [0.0, 1.0]:
 *  - 1.0 for identical texts
 *  - 0.0 for completely different texts
 *
 * If either text has fewer than 3 words, returns 1.0 if texts are identical,
 * otherwise 0.0.
 *
 * Requirements: 7.4
 */
export function calculateContentSimilarity(textA: string, textB: string): number {
  // Identical texts
  if (textA === textB) return 1.0;

  const wordsA = textA.trim().toLowerCase().split(/\s+/).filter(Boolean);
  const wordsB = textB.trim().toLowerCase().split(/\s+/).filter(Boolean);

  // If either text has fewer than 3 words, return 0 for different texts
  // (identical case already handled above)
  if (wordsA.length < 3 || wordsB.length < 3) {
    return 0.0;
  }

  // Build trigram sets
  const trigramsA = buildTrigramSet(wordsA);
  const trigramsB = buildTrigramSet(wordsB);

  // Jaccard similarity: |A ∩ B| / |A ∪ B|
  const intersection = new Set<string>();
  for (const trigram of trigramsA) {
    if (trigramsB.has(trigram)) {
      intersection.add(trigram);
    }
  }

  const unionSize = trigramsA.size + trigramsB.size - intersection.size;

  if (unionSize === 0) return 0.0;

  return intersection.size / unionSize;
}

/** Build a set of trigram strings from an array of words */
function buildTrigramSet(words: string[]): Set<string> {
  const trigrams = new Set<string>();
  for (let i = 0; i <= words.length - 3; i++) {
    trigrams.add(`${words[i]} ${words[i + 1]} ${words[i + 2]}`);
  }
  return trigrams;
}

/**
 * Resolve a raw path or URL to its canonical form.
 *
 * Normalisation rules:
 *  - Strip `www.` prefix from any hostname present in the input
 *  - Lowercase all path segments
 *  - Remove trailing slash (except for the root path `/`)
 *  - Prepend `https://ecommittra.com` to produce the full canonical URL
 *
 * Requirements: 1.6, 1.7
 */
export function resolveCanonical(rawPath: string): string {
  let path = rawPath.trim();

  // Strip protocol and hostname if present (handles full URLs passed in)
  // e.g. "https://www.ecommittra.com/Services/Amazon/" -> "/Services/Amazon/"
  // e.g. "https://ecommittra.com/about" -> "/about"
  const urlPattern = /^https?:\/\/(?:www\.)?[^/]+(\/.*)?$/i;
  const urlMatch = path.match(urlPattern);
  if (urlMatch) {
    path = urlMatch[1] ?? '/';
  }

  // Lowercase the path
  path = path.toLowerCase();

  // Ensure it starts with /
  if (!path.startsWith('/')) {
    path = '/' + path;
  }

  // Remove trailing slash, but keep root as "/"
  if (path.length > 1 && path.endsWith('/')) {
    path = path.replace(/\/+$/, '');
  }

  return CANONICAL_DOMAIN + path;
}
