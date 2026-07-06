// Feature: seo-optimization, Property 14: City page body text ≥ 800 words and pairwise similarity < 30%
// Validates: Requirements 7.2, 7.4

import { describe, it, expect } from 'vitest';
import { cityPages } from '../../lib/cityPageData';
import { calculateContentSimilarity } from '../utils';

/**
 * Counts the number of words in a string (splits on whitespace, filters empties).
 */
function countWords(text: string): number {
  return text.trim().split(/\s+/).filter(Boolean).length;
}

/**
 * Combines all body content fields for a city page into a single string.
 * Includes: intro, whyChooseContent, localChallenges, processContent, and all FAQ answers.
 */
function getCombinedBodyContent(pageKey: string): string {
  const page = cityPages[pageKey];
  const faqAnswers = page.faq.map((item) => item.answer).join(' ');
  return [
    page.intro,
    page.whyChooseContent,
    page.localChallenges,
    page.processContent,
    faqAnswers,
  ].join(' ');
}

const allKeys = Object.keys(cityPages);

describe('cityPage – Property 14: body text ≥ 800 words and pairwise similarity < 30%', () => {
  /**
   * Property 14a: For each city page entry, count words in combined body content
   * (intro + whyChooseContent + localChallenges + processContent + all FAQ answers)
   * and assert ≥ 800 words.
   *
   * Validates: Requirements 7.2
   */
  describe('P14a – each city page has at least 800 words in combined body content', () => {
    for (const key of allKeys) {
      it(`${key} — word count ≥ 800`, () => {
        const combinedText = getCombinedBodyContent(key);
        const wordCount = countWords(combinedText);
        expect(
          wordCount,
          `City page "${key}" has only ${wordCount} words (minimum 800 required). Combined text: "${combinedText.slice(0, 100)}..."`
        ).toBeGreaterThanOrEqual(800);
      });
    }
  });

  /**
   * Property 14b: For each pair of distinct city page entries, compute Jaccard trigram
   * similarity and assert < 0.30 (30%).
   *
   * We check all 21×20/2 = 210 unique pairs across all 21 city pages.
   *
   * Validates: Requirements 7.4
   */
  describe('P14b – pairwise Jaccard trigram similarity < 30% for all city page pairs', () => {
    // Pre-compute combined content for all pages once for efficiency
    const contentMap: Record<string, string> = {};
    for (const key of allKeys) {
      contentMap[key] = getCombinedBodyContent(key);
    }

    for (let i = 0; i < allKeys.length; i++) {
      for (let j = i + 1; j < allKeys.length; j++) {
        const keyA = allKeys[i];
        const keyB = allKeys[j];
        it(`similarity(${keyA}, ${keyB}) < 0.30`, () => {
          const similarity = calculateContentSimilarity(
            contentMap[keyA],
            contentMap[keyB]
          );
          expect(
            similarity,
            `City pages "${keyA}" and "${keyB}" are too similar: ${(similarity * 100).toFixed(1)}% (limit: 30%)`
          ).toBeLessThan(0.30);
        });
      }
    }
  });

  /**
   * Sanity check: exactly 21 city page entries are defined.
   */
  it('has exactly 21 city page entries (7 services × 3 cities)', () => {
    expect(allKeys.length).toBe(21);
  });
});
