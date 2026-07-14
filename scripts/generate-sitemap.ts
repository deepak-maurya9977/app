/**
 * scripts/generate-sitemap.ts
 *
 * Build-time sitemap generator.
 * Reads CORE_ROUTES, SERVICE_SLUGS, and CITY_COMBINATIONS from routeManifest.ts
 * and writes public/sitemap.xml.
 *
 * Exits with status code 1 if any route cannot be resolved, which causes
 * the Netlify build to fail.
 *
 * Requirements: 1.2, 7.8
 */

import { writeFileSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';
import {
  CORE_ROUTES,
  SERVICE_SLUGS,
  CITY_COMBINATIONS,
} from '../src/seo/routeManifest.js';

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

const BASE_URL = 'https://ecommittra.com';
const OUTPUT_PATH = resolve(
  dirname(fileURLToPath(import.meta.url)),
  '../public/sitemap.xml',
);

/** Current date in YYYY-MM-DD format */
const TODAY = new Date().toISOString().split('T')[0];

// ---------------------------------------------------------------------------
// Priority / changefreq assignments (per design priority table)
// ---------------------------------------------------------------------------

interface SitemapEntry {
  loc: string;
  lastmod: string;
  changefreq: string;
  priority: string;
}

function buildCoreEntry(path: string): SitemapEntry {
  // Homepage
  if (path === '/') {
    return { loc: `${BASE_URL}/`, lastmod: TODAY, changefreq: 'weekly', priority: '1.0' };
  }
  // Services hub
  if (path === '/services') {
    return { loc: `${BASE_URL}/services`, lastmod: TODAY, changefreq: 'weekly', priority: '0.9' };
  }
  // About — 0.8
  if (path === '/about') {
    return { loc: `${BASE_URL}/about`, lastmod: TODAY, changefreq: 'monthly', priority: '0.8' };
  }
  // Contact — 0.7
  if (path === '/contact') {
    return { loc: `${BASE_URL}/contact`, lastmod: TODAY, changefreq: 'monthly', priority: '0.7' };
  }
  // Gallery, Career — 0.7
  return { loc: `${BASE_URL}${path}`, lastmod: TODAY, changefreq: 'monthly', priority: '0.7' };
}

function buildServiceEntry(slug: string): SitemapEntry {
  if (!slug || slug.trim() === '') {
    throw new Error(`Invalid service slug: "${slug}"`);
  }
  return {
    loc: `${BASE_URL}/services/${slug}`,
    lastmod: TODAY,
    changefreq: 'monthly',
    priority: '0.8',
  };
}

function buildCityEntry(serviceSlug: string, citySlug: string): SitemapEntry {
  if (!serviceSlug || serviceSlug.trim() === '') {
    throw new Error(`Invalid service slug in CITY_COMBINATIONS: "${serviceSlug}"`);
  }
  if (!citySlug || citySlug.trim() === '') {
    throw new Error(
      `Invalid city slug in CITY_COMBINATIONS for service "${serviceSlug}": "${citySlug}"`,
    );
  }
  return {
    loc: `${BASE_URL}/services/${serviceSlug}-${citySlug}`,
    lastmod: TODAY,
    changefreq: 'monthly',
    priority: '0.8',
  };
}

// ---------------------------------------------------------------------------
// XML serialisation
// ---------------------------------------------------------------------------

function escapeXml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

function entryToXml(entry: SitemapEntry): string {
  return [
    '  <url>',
    `    <loc>${escapeXml(entry.loc)}</loc>`,
    `    <lastmod>${entry.lastmod}</lastmod>`,
    `    <changefreq>${entry.changefreq}</changefreq>`,
    `    <priority>${entry.priority}</priority>`,
    '  </url>',
  ].join('\n');
}

function buildSitemapXml(entries: SitemapEntry[]): string {
  const urlElements = entries.map(entryToXml).join('\n');
  return [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
    urlElements,
    '</urlset>',
    '', // trailing newline
  ].join('\n');
}

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------

function main(): void {
  const errors: string[] = [];
  const entries: SitemapEntry[] = [];

  // 1. Core routes (6 entries)
  for (const path of CORE_ROUTES) {
    try {
      entries.push(buildCoreEntry(path));
    } catch (err) {
      errors.push(`Core route "${path}": ${(err as Error).message}`);
    }
  }

  // 2. Service pages (22 entries)
  for (const slug of SERVICE_SLUGS) {
    try {
      entries.push(buildServiceEntry(slug));
    } catch (err) {
      errors.push(`Service slug "${slug}": ${(err as Error).message}`);
    }
  }

  // 3. City landing pages (7 services × 3 cities = 21 entries)
  for (const combo of CITY_COMBINATIONS) {
    for (const city of combo.cities) {
      try {
        entries.push(buildCityEntry(combo.service, city));
      } catch (err) {
        errors.push(
          `City combination service="${combo.service}" city="${city}": ${(err as Error).message}`,
        );
      }
    }
  }

  // Abort if any route could not be resolved — fails the Netlify build
  if (errors.length > 0) {
    console.error('❌ Sitemap generation failed — unresolvable routes:');
    for (const e of errors) {
      console.error(`   • ${e}`);
    }
    process.exit(1);
  }

  // Sanity-check total URL count
  const expected = 6 + SERVICE_SLUGS.length + CITY_COMBINATIONS.reduce((n, c) => n + c.cities.length, 0);
  if (entries.length !== expected) {
    console.error(
      `❌ URL count mismatch: expected ${expected}, got ${entries.length}`,
    );
    process.exit(1);
  }

  const xml = buildSitemapXml(entries);
  writeFileSync(OUTPUT_PATH, xml, 'utf-8');

  console.log(`✅ sitemap.xml written to ${OUTPUT_PATH}`);
  console.log(`   Total URLs: ${entries.length}`);
  console.log(`   Breakdown : ${CORE_ROUTES.length} core + ${SERVICE_SLUGS.length} service + ${entries.length - CORE_ROUTES.length - SERVICE_SLUGS.length} city`);
  console.log(`   Last-mod  : ${TODAY}`);
}

main();
