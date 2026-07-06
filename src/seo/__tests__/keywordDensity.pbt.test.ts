// Feature: seo-optimization, Property 15: Keyword density ≤ 3% detection
// Validates: Requirements 12.4

import { describe, it, expect } from 'vitest';
import * as fc from 'fast-check';
import { calculateKeywordDensity } from '../utils';

describe('calculateKeywordDensity – Property 15', () => {
  /**
   * Property: density formula is always occurrences / totalWords * 100
   *
   * Generate arbitrary text (built from words joined by spaces) and a keyword
   * that is one of those words. Verify the returned densityPercent equals
   * occurrences / totalWords * 100.
   */
  it('P15 – density formula holds for arbitrary text and keyword', () => {
    fc.assert(
      fc.property(
        // Generate an array of at least 1 alphabetic word
        fc.array(fc.stringMatching(/^[a-zA-Z]+$/), { minLength: 1, maxLength: 50 }),
        // Generate a keyword that is a valid alphabetic string
        fc.stringMatching(/^[a-zA-Z]+$/),
        (words, keyword) => {
          const bodyText = words.join(' ');
          const result = calculateKeywordDensity(bodyText, keyword);

          // Formula must hold exactly
          const expectedDensity = (result.occurrences / result.totalWords) * 100;
          expect(result.densityPercent).toBeCloseTo(expectedDensity, 10);

          // totalWords must equal the number of whitespace-separated tokens
          expect(result.totalWords).toBe(words.length);

          // keyword field must be preserved
          expect(result.keyword).toBe(keyword);
        }
      ),
      { numRuns: 200 }
    );
  });

  /**
   * Property: density is 0 when keyword is absent
   *
   * Construct text that cannot contain the keyword (use digits-only words),
   * then check density is 0.
   */
  it('P15 – density is 0 when keyword is not present in text', () => {
    fc.assert(
      fc.property(
        // Text made of digit-only tokens — will never match an alpha keyword
        fc.array(fc.stringMatching(/^[0-9]+$/), { minLength: 1, maxLength: 50 }),
        // Keyword is purely alphabetic, so cannot appear in digit-only text
        fc.stringMatching(/^[a-zA-Z]+$/),
        (words, keyword) => {
          const bodyText = words.join(' ');
          const result = calculateKeywordDensity(bodyText, keyword);

          expect(result.occurrences).toBe(0);
          expect(result.densityPercent).toBe(0);
        }
      ),
      { numRuns: 200 }
    );
  });

  /**
   * Property: density is 0 when text is empty
   */
  it('P15 – density is 0 when text is empty', () => {
    fc.assert(
      fc.property(
        fc.stringMatching(/^[a-zA-Z]+$/),
        (keyword) => {
          const result = calculateKeywordDensity('', keyword);
          expect(result.occurrences).toBe(0);
          expect(result.totalWords).toBe(0);
          expect(result.densityPercent).toBe(0);
        }
      ),
      { numRuns: 100 }
    );
  });

  /**
   * Concrete examples for confidence
   */
  describe('concrete examples', () => {
    it('returns correct density for a simple sentence', () => {
      const result = calculateKeywordDensity('the cat sat on the mat', 'the');
      expect(result.occurrences).toBe(2);
      expect(result.totalWords).toBe(6);
      expect(result.densityPercent).toBeCloseTo((2 / 6) * 100, 5);
    });

    it('is case-insensitive', () => {
      const result = calculateKeywordDensity('Amazon amazon AMAZON', 'amazon');
      expect(result.occurrences).toBe(3);
      expect(result.totalWords).toBe(3);
      expect(result.densityPercent).toBeCloseTo(100, 5);
    });

    it('counts whole words only (does not match partial)', () => {
      const result = calculateKeywordDensity('amazonian amazon amazons', 'amazon');
      expect(result.occurrences).toBe(1);
    });

    it('returns zeros for empty text', () => {
      const result = calculateKeywordDensity('', 'amazon');
      expect(result).toEqual({ keyword: 'amazon', occurrences: 0, totalWords: 0, densityPercent: 0 });
    });

    it('returns 0 occurrences when keyword is not present', () => {
      const result = calculateKeywordDensity('flipkart meesho jiomart', 'amazon');
      expect(result.occurrences).toBe(0);
      expect(result.densityPercent).toBe(0);
    });
  });
});
