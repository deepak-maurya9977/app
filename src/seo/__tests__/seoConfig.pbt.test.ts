// Feature: seo-optimization, Properties 3-6
// Validates: Requirements 3.1-3.8

import { describe, it, expect } from 'vitest';
import { pageSeoConfigs } from '../seoConfig';

const entries = Object.entries(pageSeoConfigs);

describe('seoConfig – Properties 3-6', () => {
  /**
   * Property 3: Title tag length is in [30, 60] inclusive for all 49 pages.
   *
   * Validates: Requirements 3.1, 3.2
   */
  it('P3 – all titles are between 30 and 60 characters (inclusive)', () => {
    for (const [path, config] of entries) {
      const len = config.title.length;
      expect(len, `Title for "${path}" has ${len} chars: "${config.title}"`).toBeGreaterThanOrEqual(30);
      expect(len, `Title for "${path}" has ${len} chars: "${config.title}"`).toBeLessThanOrEqual(60);
    }
  });

  /**
   * Property 4: Meta description length is in [120, 155] inclusive for all 49 pages.
   *
   * Validates: Requirements 3.3, 3.4
   */
  it('P4 – all descriptions are between 120 and 155 characters (inclusive)', () => {
    for (const [path, config] of entries) {
      const len = config.description.length;
      expect(len, `Description for "${path}" has ${len} chars`).toBeGreaterThanOrEqual(120);
      expect(len, `Description for "${path}" has ${len} chars`).toBeLessThanOrEqual(155);
    }
  });

  /**
   * Property 5: For service/city page entries (those with primaryKeyword),
   * the keyword appears case-insensitively in both title and description.
   *
   * Validates: Requirements 3.5, 4.7
   */
  it('P5 – primaryKeyword appears (case-insensitive) in both title and description', () => {
    for (const [path, config] of entries) {
      if (!config.primaryKeyword) continue;
      const kw = config.primaryKeyword.toLowerCase();
      expect(
        config.title.toLowerCase(),
        `primaryKeyword "${config.primaryKeyword}" missing from title of "${path}"`
      ).toContain(kw);
      expect(
        config.description.toLowerCase(),
        `primaryKeyword "${config.primaryKeyword}" missing from description of "${path}"`
      ).toContain(kw);
    }
  });

  /**
   * Property 6: All 49 titles are unique; all 49 descriptions are unique.
   *
   * Validates: Requirements 3.6, 3.7
   */
  it('P6 – all titles are unique across all 49 entries', () => {
    const titles = entries.map(([, c]) => c.title);
    const titleSet = new Set(titles);
    expect(
      titleSet.size,
      `Found ${titles.length - titleSet.size} duplicate title(s)`
    ).toBe(titles.length);
  });

  it('P6 – all descriptions are unique across all 49 entries', () => {
    const descs = entries.map(([, c]) => c.description);
    const descSet = new Set(descs);
    expect(
      descSet.size,
      `Found ${descs.length - descSet.size} duplicate description(s)`
    ).toBe(descs.length);
  });

  /**
   * Sanity check: exactly 49 entries are present.
   */
  it('has exactly 49 SEO config entries (6 core + 22 service + 21 city)', () => {
    expect(entries.length).toBe(49);
  });
});
