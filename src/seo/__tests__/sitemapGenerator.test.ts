/**
 * Unit tests for the sitemap generator output.
 *
 * Tests read the generated public/sitemap.xml and verify:
 *  - All 49 expected URLs are present (6 core + 22 service + 21 city)
 *  - Each <url> entry has <loc>, <lastmod>, <changefreq>, <priority>
 *  - City landing pages have priority="0.8" and changefreq="monthly"
 *  - Homepage has priority="1.0"
 *  - /services hub has priority="0.9"
 *
 * Requirements: 1.2, 7.8
 */

import { describe, it, expect, beforeAll } from 'vitest';
import { readFileSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';
import {
  CORE_ROUTES,
  SERVICE_SLUGS,
  CITY_COMBINATIONS,
} from '../routeManifest';

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

const BASE_URL = 'https://ecommittra.com';

// Resolve path to public/sitemap.xml from the project root.
// __dirname in Vitest ESM context resolves to the test file's directory.
// The test file lives at src/seo/__tests__/ — 3 levels up reaches the project root.
const __filename = fileURLToPath(import.meta.url);
const __dirname_resolved = dirname(__filename);
const SITEMAP_PATH = resolve(__dirname_resolved, '../../..', 'public', 'sitemap.xml');

/** Very small, dependency-free XML parser for <url> blocks. */
function extractTagValue(xml: string, tag: string): string | undefined {
  const re = new RegExp(`<${tag}>([^<]*)</${tag}>`);
  const m = xml.match(re);
  return m ? m[1] : undefined;
}

interface ParsedEntry {
  loc: string;
  lastmod: string | undefined;
  changefreq: string | undefined;
  priority: string | undefined;
}

function parseSitemap(xml: string): ParsedEntry[] {
  const entries: ParsedEntry[] = [];
  // Split on <url> tags
  const urlBlocks = xml.split('<url>').slice(1); // first element is before any <url>
  for (const block of urlBlocks) {
    entries.push({
      loc:         extractTagValue(block, 'loc')        ?? '',
      lastmod:     extractTagValue(block, 'lastmod'),
      changefreq:  extractTagValue(block, 'changefreq'),
      priority:    extractTagValue(block, 'priority'),
    });
  }
  return entries;
}

// ---------------------------------------------------------------------------
// Test setup
// ---------------------------------------------------------------------------

let sitemapXml: string;
let entries: ParsedEntry[];

beforeAll(() => {
  sitemapXml = readFileSync(SITEMAP_PATH, 'utf-8');
  entries = parseSitemap(sitemapXml);
});

// ---------------------------------------------------------------------------
// Tests
// ---------------------------------------------------------------------------

describe('sitemap.xml — URL count', () => {
  it('contains exactly 49 <url> entries (6 core + 22 service + 21 city)', () => {
    expect(entries.length).toBe(49);
  });

  it('contains exactly 6 core route URLs', () => {
    const coreUrls = CORE_ROUTES.map(p => `${BASE_URL}${p === '/' ? '/' : p}`);
    for (const url of coreUrls) {
      const found = entries.some(e => e.loc === url);
      expect(found, `Core URL "${url}" not found in sitemap`).toBe(true);
    }
  });

  it('contains exactly 22 service page URLs', () => {
    expect(SERVICE_SLUGS.length).toBe(22);
    for (const slug of SERVICE_SLUGS) {
      const url = `${BASE_URL}/services/${slug}`;
      const found = entries.some(e => e.loc === url);
      expect(found, `Service URL "${url}" not found in sitemap`).toBe(true);
    }
  });

  it('contains exactly 21 city landing page URLs (7 services × 3 cities)', () => {
    const expectedCityUrls: string[] = [];
    for (const combo of CITY_COMBINATIONS) {
      for (const city of combo.cities) {
        expectedCityUrls.push(`${BASE_URL}/services/${combo.service}-${city}`);
      }
    }
    expect(expectedCityUrls.length).toBe(21);
    for (const url of expectedCityUrls) {
      const found = entries.some(e => e.loc === url);
      expect(found, `City URL "${url}" not found in sitemap`).toBe(true);
    }
  });
});

describe('sitemap.xml — required child elements per entry', () => {
  it('every <url> entry has a non-empty <loc>', () => {
    for (const entry of entries) {
      expect(entry.loc, 'Found <url> with empty <loc>').not.toBe('');
    }
  });

  it('every <url> entry has a <lastmod> value', () => {
    for (const entry of entries) {
      expect(
        entry.lastmod,
        `Entry "${entry.loc}" is missing <lastmod>`,
      ).toBeDefined();
      expect(entry.lastmod).not.toBe('');
    }
  });

  it('every <url> entry has a <changefreq> value', () => {
    for (const entry of entries) {
      expect(
        entry.changefreq,
        `Entry "${entry.loc}" is missing <changefreq>`,
      ).toBeDefined();
      expect(entry.changefreq).not.toBe('');
    }
  });

  it('every <url> entry has a <priority> value', () => {
    for (const entry of entries) {
      expect(
        entry.priority,
        `Entry "${entry.loc}" is missing <priority>`,
      ).toBeDefined();
      expect(entry.priority).not.toBe('');
    }
  });

  it('<lastmod> values match the YYYY-MM-DD date format', () => {
    const isoDateRe = /^\d{4}-\d{2}-\d{2}$/;
    for (const entry of entries) {
      expect(
        entry.lastmod,
        `Entry "${entry.loc}" has malformed <lastmod>: "${entry.lastmod}"`,
      ).toMatch(isoDateRe);
    }
  });
});

describe('sitemap.xml — city landing page values (Requirement 7.8)', () => {
  it('all city landing pages have <priority>0.8</priority>', () => {
    for (const combo of CITY_COMBINATIONS) {
      for (const city of combo.cities) {
        const url = `${BASE_URL}/services/${combo.service}-${city}`;
        const entry = entries.find(e => e.loc === url);
        expect(entry, `City entry for "${url}" not found`).toBeDefined();
        expect(
          entry!.priority,
          `City page "${url}" has wrong priority: "${entry!.priority}"`,
        ).toBe('0.8');
      }
    }
  });

  it('all city landing pages have <changefreq>monthly</changefreq>', () => {
    for (const combo of CITY_COMBINATIONS) {
      for (const city of combo.cities) {
        const url = `${BASE_URL}/services/${combo.service}-${city}`;
        const entry = entries.find(e => e.loc === url);
        expect(entry, `City entry for "${url}" not found`).toBeDefined();
        expect(
          entry!.changefreq,
          `City page "${url}" has wrong changefreq: "${entry!.changefreq}"`,
        ).toBe('monthly');
      }
    }
  });
});

describe('sitemap.xml — priority assignments for key pages', () => {
  it('homepage has <priority>1.0</priority>', () => {
    const homepage = entries.find(e => e.loc === `${BASE_URL}/`);
    expect(homepage, 'Homepage entry not found').toBeDefined();
    expect(homepage!.priority).toBe('1.0');
  });

  it('/services hub has <priority>0.9</priority>', () => {
    const servicesHub = entries.find(e => e.loc === `${BASE_URL}/services`);
    expect(servicesHub, '/services entry not found').toBeDefined();
    expect(servicesHub!.priority).toBe('0.9');
  });

  it('all service pages have <priority>0.8</priority>', () => {
    for (const slug of SERVICE_SLUGS) {
      const url = `${BASE_URL}/services/${slug}`;
      const entry = entries.find(e => e.loc === url);
      expect(entry, `Service entry for "${url}" not found`).toBeDefined();
      expect(
        entry!.priority,
        `Service page "${url}" has wrong priority: "${entry!.priority}"`,
      ).toBe('0.8');
    }
  });

  it('all service pages have <changefreq>monthly</changefreq>', () => {
    for (const slug of SERVICE_SLUGS) {
      const url = `${BASE_URL}/services/${slug}`;
      const entry = entries.find(e => e.loc === url);
      expect(entry, `Service entry for "${url}" not found`).toBeDefined();
      expect(entry!.changefreq).toBe('monthly');
    }
  });
});

describe('sitemap.xml — URL format', () => {
  it('all <loc> values start with the canonical domain', () => {
    for (const entry of entries) {
      expect(
        entry.loc,
        `<loc> "${entry.loc}" does not start with canonical domain`,
      ).toMatch(/^https:\/\/ecommittra\.com/);
    }
  });

  it('no duplicate <loc> values exist', () => {
    const locs = entries.map(e => e.loc);
    const locSet = new Set(locs);
    expect(
      locSet.size,
      `Found ${locs.length - locSet.size} duplicate <loc> value(s)`,
    ).toBe(locs.length);
  });
});
