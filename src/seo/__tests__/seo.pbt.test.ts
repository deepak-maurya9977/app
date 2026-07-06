// Feature: seo-optimization, Property 1: Every page has a canonical tag pointing to its own URL
// Validates: Requirements 1.6, 7.5

import { describe, it, expect } from 'vitest';
import { pageSeoConfigs } from '../seoConfig';
import { CORE_ROUTES, SERVICE_SLUGS, CITY_COMBINATIONS } from '../routeManifest';

const CANONICAL_ORIGIN = 'https://ecommittra.com';

/**
 * Normalise a path for canonical URL comparison:
 *   - Keep root "/" as "/"
 *   - Strip trailing slash from non-root paths
 */
function normalisePath(path: string): string {
  if (path === '/') return '/';
  return path.replace(/\/+$/, '');
}

/** Derive the full set of route paths from the route manifest (same derivation as the sitemap). */
function allRoutePaths(): string[] {
  const paths: string[] = [...CORE_ROUTES];

  // Service pages: /services/{slug}
  for (const slug of SERVICE_SLUGS) {
    paths.push(`/services/${slug}`);
  }

  // City landing pages: /services/{service}-{city}
  for (const { service, cities } of CITY_COMBINATIONS) {
    for (const city of cities) {
      paths.push(`/services/${service}-${city}`);
    }
  }

  return paths;
}

describe('SEO config – Property 1: canonical tag per route', () => {
  /**
   * Property 1a: For every route path in the route manifest, the matching
   * pageSeoConfig entry must exist and its canonical URL must equal
   * `https://ecommittra.com{normalised path}`.
   *
   * The SEO component simply passes config.canonical through to the <link
   * rel="canonical"> tag, so validating the config data directly is
   * equivalent to validating the rendered output.
   */
  it('P1 – every route path has a matching seoConfig with a correct canonical URL', () => {
    const routes = allRoutePaths();

    for (const path of routes) {
      const config = pageSeoConfigs[path];

      // The config must exist for the path
      expect(
        config,
        `No seoConfig entry found for route "${path}"`
      ).toBeDefined();

      if (!config) continue; // narrow type; previous expect will fail first

      const normPath = normalisePath(path);
      const expectedCanonical = CANONICAL_ORIGIN + normPath;

      // The canonical in the config must match the expected URL
      // (trailing slash on root '/' is preserved as https://ecommittra.com/)
      expect(
        config.canonical,
        `Canonical for route "${path}" expected "${expectedCanonical}" but got "${config.canonical}"`
      ).toBe(expectedCanonical);
    }
  });

  /**
   * Property 1b: Every canonical URL in the seoConfig starts with the
   * canonical origin https://ecommittra.com.
   */
  it('P1 – all canonical URLs start with https://ecommittra.com', () => {
    const routes = allRoutePaths();

    for (const path of routes) {
      const config = pageSeoConfigs[path];
      if (!config) continue; // covered by 1a

      expect(
        config.canonical.startsWith(CANONICAL_ORIGIN),
        `Canonical for route "${path}" does not start with "${CANONICAL_ORIGIN}": "${config.canonical}"`
      ).toBe(true);
    }
  });

  /**
   * Sanity: the route manifest produces the expected number of routes (49).
   */
  it('route manifest expands to 49 total routes', () => {
    const routes = allRoutePaths();
    expect(routes.length).toBe(49);
  });
});
