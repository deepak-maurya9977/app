// Feature: seo-optimization, Property 2: URL variant normalization to canonical form
// Validates: Requirements 1.7

import { describe, it, expect } from 'vitest';
import * as fc from 'fast-check';
import { resolveCanonical } from '../utils';

const CANONICAL_ORIGIN = 'https://ecommittra.com';

// Arbitrary that generates a non-empty URL path segment (only letters and hyphens)
const pathSegment = fc.stringMatching(/^[a-z][a-z-]{0,19}$/);

// Generate a path with 1–3 segments, e.g. /services/amazon-account-management
const arbitraryPath = fc.array(pathSegment, { minLength: 1, maxLength: 3 }).map(
  (segments) => '/' + segments.join('/')
);

describe('resolveCanonical – Property 2', () => {
  /**
   * Property 2a: All trailing-slash variants of the same path resolve identically.
   *
   * Given a canonical path (no trailing slash), the path with and without a
   * trailing slash should produce the same canonical URL.
   */
  it('P2 – trailing slash variants produce the same canonical URL', () => {
    fc.assert(
      fc.property(arbitraryPath, (path) => {
        const withSlash = path.endsWith('/') ? path : path + '/';
        const withoutSlash = path.replace(/\/+$/, '') || '/';

        const canonicalWith = resolveCanonical(withSlash);
        const canonicalWithout = resolveCanonical(withoutSlash);

        expect(canonicalWith).toBe(canonicalWithout);
      }),
      { numRuns: 200 }
    );
  });

  /**
   * Property 2b: Mixed-case path segments resolve to the same URL as lowercase.
   */
  it('P2 – mixed-case path segments resolve identically to lowercase', () => {
    fc.assert(
      fc.property(arbitraryPath, (path) => {
        const upperPath = path.toUpperCase();
        const lowerPath = path.toLowerCase();

        const canonicalUpper = resolveCanonical(upperPath);
        const canonicalLower = resolveCanonical(lowerPath);

        expect(canonicalUpper).toBe(canonicalLower);
      }),
      { numRuns: 200 }
    );
  });

  /**
   * Property 2c: Output always starts with https://ecommittra.com
   */
  it('P2 – output always starts with https://ecommittra.com', () => {
    fc.assert(
      fc.property(arbitraryPath, (path) => {
        const canonical = resolveCanonical(path);
        expect(canonical.startsWith(CANONICAL_ORIGIN)).toBe(true);
      }),
      { numRuns: 200 }
    );
  });

  /**
   * Property 2d: No trailing slash on non-root paths in output
   */
  it('P2 – non-root output has no trailing slash', () => {
    fc.assert(
      fc.property(
        // Generate paths with at least one segment (not the root `/`)
        fc.array(pathSegment, { minLength: 1, maxLength: 3 }).map(
          (segs) => '/' + segs.join('/')
        ),
        (path) => {
          const canonical = resolveCanonical(path);
          // The part after the origin must not end with /
          const afterOrigin = canonical.slice(CANONICAL_ORIGIN.length);
          // Root path "/" is allowed to be just "/"
          if (afterOrigin !== '/') {
            expect(canonical.endsWith('/')).toBe(false);
          }
        }
      ),
      { numRuns: 200 }
    );
  });

  /**
   * Property 2e: All URL variants (trailing slash + uppercase + www prefix) of
   * the same logical path resolve to the same canonical URL.
   */
  it('P2 – www prefix, trailing slash, and uppercase all resolve identically', () => {
    fc.assert(
      fc.property(arbitraryPath, (path) => {
        // Variant 1: plain lowercase path
        const v1 = resolveCanonical(path);

        // Variant 2: trailing slash added
        const v2 = resolveCanonical(path + '/');

        // Variant 3: uppercase path
        const v3 = resolveCanonical(path.toUpperCase());

        // Variant 4: full URL with www prefix
        const v4 = resolveCanonical(`https://www.ecommittra.com${path}`);

        // Variant 5: full URL without www
        const v5 = resolveCanonical(`https://ecommittra.com${path}`);

        expect(v1).toBe(v2);
        expect(v1).toBe(v3);
        expect(v1).toBe(v4);
        expect(v1).toBe(v5);
      }),
      { numRuns: 200 }
    );
  });

  /**
   * Concrete examples for confidence
   */
  describe('concrete examples', () => {
    it('removes trailing slash from non-root path', () => {
      expect(resolveCanonical('/services/amazon/')).toBe(
        'https://ecommittra.com/services/amazon'
      );
    });

    it('preserves root path /', () => {
      expect(resolveCanonical('/')).toBe('https://ecommittra.com/');
    });

    it('lowercases path segments', () => {
      expect(resolveCanonical('/Services/Amazon-Account-Management')).toBe(
        'https://ecommittra.com/services/amazon-account-management'
      );
    });

    it('strips www prefix from full URL', () => {
      expect(resolveCanonical('https://www.ecommittra.com/about')).toBe(
        'https://ecommittra.com/about'
      );
    });

    it('handles plain path without leading slash', () => {
      expect(resolveCanonical('about')).toBe('https://ecommittra.com/about');
    });

    it('trailing slash on root resolves to https://ecommittra.com/', () => {
      expect(resolveCanonical('/')).toBe('https://ecommittra.com/');
    });
  });
});
