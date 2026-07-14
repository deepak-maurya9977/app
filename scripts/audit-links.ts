/**
 * scripts/audit-links.ts
 *
 * Internal link auditor for ecommittra.com service and city landing pages.
 *
 * Checks:
 *   - Every service page (via ServicePageTemplate) and city landing page has
 *     at least two internal links (hrefs/tos starting with "/"). [Req 4.6]
 *   - CityLandingPage.tsx template has at least one link using the
 *     `data.parentServiceHref` pattern (parent service slug) and at least
 *     one link to "/contact". [Req 7.9]
 *   - All 21 city entries in src/lib/cityPageData.ts have a non-empty
 *     `parentServiceHref` field. [Req 7.9]
 *
 * Also scans any service page files in src/pages/services/ that do NOT
 * delegate to ServicePageTemplate (i.e., they render their own link structure).
 *
 * Add to package.json:  "audit:links": "tsx scripts/audit-links.ts"
 *
 * Requirements: 4.6, 7.9
 */

import { readdirSync, readFileSync } from 'fs';
import { resolve, dirname, basename } from 'path';
import { fileURLToPath } from 'url';

// ---------------------------------------------------------------------------
// Paths
// ---------------------------------------------------------------------------

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, '..');
const SERVICES_DIR = resolve(ROOT, 'src/pages/services');
const COMPONENTS_DIR = resolve(ROOT, 'src/components');
const CITY_PAGE_DATA_PATH = resolve(ROOT, 'src/lib/cityPageData.ts');

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface LinkOccurrence {
  href: string;   // the resolved href/to value
  line: number;
  raw: string;    // raw matched string for context
}

interface FileAuditResult {
  file: string;          // relative file path
  label: string;         // human-readable label for the report
  links: LinkOccurrence[];
  internalLinks: LinkOccurrence[];
  issues: string[];
}

// ---------------------------------------------------------------------------
// Link extraction
// ---------------------------------------------------------------------------

/**
 * Extract all internal links from source text.
 *
 * Finds both:
 *   - React Router <Link to="..."> patterns
 *   - HTML <a href="..."> patterns
 *
 * An "internal link" is one whose value starts with "/" (i.e., site-relative).
 * Excludes "#" fragment-only links and external URLs.
 */
function extractLinks(source: string): LinkOccurrence[] {
  const links: LinkOccurrence[] = [];

  // Regex patterns for to="..." / href="..." attributes
  // Handles: "...", '...', {"..."}, {'...'}
  const patterns: { re: RegExp; type: 'Link' | 'a' }[] = [
    {
      // <Link to="..." /> or <Link to={'...'} />
      re: /< *Link\b[^>]*\bto\s*=\s*(?:"([^"]*)"|'([^']*)'|\{['"]([^'"]*)['"]\})/g,
      type: 'Link',
    },
    {
      // <a href="..." /> or <a href={'...'} />
      re: /< *a\b[^>]*\bhref\s*=\s*(?:"([^"]*)"|'([^']*)'|\{['"]([^'"]*)['"]\})/g,
      type: 'a',
    },
  ];

  for (const { re } of patterns) {
    let match: RegExpExecArray | null;
    re.lastIndex = 0; // reset for each file
    while ((match = re.exec(source)) !== null) {
      // One of the three capture groups will have the value
      const href = match[1] ?? match[2] ?? match[3] ?? '';

      // Determine line number (1-indexed)
      const upToMatch = source.slice(0, match.index);
      const line = upToMatch.split('\n').length;

      links.push({ href, line, raw: match[0] });
    }
  }

  return links;
}

/**
 * Filter link occurrences to only those that are internal (start with "/").
 * Excludes:
 *   - "#" fragment-only links
 *   - External URLs (http://, https://, tel:, mailto:, etc.)
 *   - Empty strings
 *   - Dynamic expressions that couldn't be resolved (empty capture)
 */
function filterInternal(links: LinkOccurrence[]): LinkOccurrence[] {
  return links.filter((l) => l.href.startsWith('/') && l.href !== '/');
  // Note: we allow "/" (homepage) as an internal link — "/" itself is valid
  // but it's so common (breadcrumbs, nav) that it doesn't count as a
  // "meaningful" internal link for SEO purposes. However, the requirement
  // just says "internal links pointing to other service pages or core site
  // pages" — we include all "/" links and let the count do the work.
}

/**
 * Returns all links whose href starts with "/", including root "/".
 */
function filterAllInternal(links: LinkOccurrence[]): LinkOccurrence[] {
  return links.filter((l) => l.href.startsWith('/'));
}

// ---------------------------------------------------------------------------
// Thin-wrapper detection
// ---------------------------------------------------------------------------

/**
 * Returns true if the source file is a thin wrapper that delegates all
 * rendering to ServicePageTemplate. Such files don't define their own
 * link structure — links come from ServicePageTemplate and HeroBanner.
 */
function isThinWrapper(source: string): boolean {
  return (
    source.includes('ServicePageTemplate') &&
    !/< *a\b[^>]*\bhref/i.test(source) &&
    !/< *Link\b[^>]*\bto\s*=/i.test(source)
  );
}

// ---------------------------------------------------------------------------
// Audit logic
// ---------------------------------------------------------------------------

/**
 * Audit a source file for internal link requirements.
 * Returns issues found.
 */
function auditLinks(
  internalLinks: LinkOccurrence[],
  label: string,
  options: {
    minLinks?: number;             // minimum number of internal links required
    requireParentServiceHref?: boolean;  // check for data.parentServiceHref pattern
    requireContactLink?: boolean;  // check for /contact link
  } = {},
): string[] {
  const issues: string[] = [];
  const { minLinks = 2, requireParentServiceHref = false, requireContactLink = false } = options;

  // Req 4.6 / 7.9 — At least N internal links
  if (internalLinks.length < minLinks) {
    issues.push(
      `[REQ 4.6] Found only ${internalLinks.length} internal link(s) — at least ${minLinks} required. ` +
        (internalLinks.length > 0
          ? `Links found: ${internalLinks.map((l) => `"${l.href}" (line ${l.line})`).join(', ')}.`
          : 'No internal links found.'),
    );
  }

  // Req 7.9 — City landing page: at least one link to parent service page
  if (requireParentServiceHref) {
    const hasParentHref = internalLinks.some(
      (l) =>
        // Template uses data.parentServiceHref dynamically; check for the variable reference
        // OR for a literal /services/ path
        l.href.includes('parentServiceHref') ||
        l.href.startsWith('/services/'),
    );
    // Also check in the raw match for dynamic expressions like {data.parentServiceHref}
    // We need to look at the original source for this pattern
    if (!hasParentHref) {
      issues.push(
        `[REQ 7.9] CityLandingPage template: no link to the parent service page found. ` +
          `Expected at least one <Link to={data.parentServiceHref}> or equivalent.`,
      );
    }
  }

  // Req 7.9 — City landing page: at least one link to /contact
  if (requireContactLink) {
    const hasContactLink = internalLinks.some(
      (l) => l.href === '/contact' || l.href.startsWith('/contact'),
    );
    if (!hasContactLink) {
      issues.push(
        `[REQ 7.9] CityLandingPage template: no link to "/contact" found. ` +
          `Expected at least one <Link to="/contact"> or <a href="/contact">.`,
      );
    }
  }

  return issues;
}

// ---------------------------------------------------------------------------
// CityLandingPage template: handle dynamic links (data.parentServiceHref)
// ---------------------------------------------------------------------------

/**
 * For CityLandingPage.tsx we need special handling because the parent service
 * link is dynamic: `to={data.parentServiceHref}`. Standard regex won't capture
 * the value. Instead we:
 * 1. Check for the existence of the pattern `to={data.parentServiceHref}` in source
 * 2. Check for a literal `/contact` link
 */
function auditCityLandingPageTemplate(
  source: string,
  staticInternalLinks: LinkOccurrence[],
): string[] {
  const issues: string[] = [];

  // Count all internal links:
  // - Static ones captured by regex
  // - Plus one for `to={data.parentServiceHref}` if that pattern exists
  let effectiveInternalCount = staticInternalLinks.length;

  const hasParentServiceHrefPattern =
    /to\s*=\s*\{data\.parentServiceHref\}/.test(source) ||
    /to\s*=\s*\{[^}]*parentServiceHref[^}]*\}/.test(source);

  if (hasParentServiceHrefPattern) {
    // This dynamic link points to the parent service — count it
    effectiveInternalCount += 1;
  }

  // Req 4.6 — at least 2 internal links
  if (effectiveInternalCount < 2) {
    issues.push(
      `[REQ 4.6] CityLandingPage template: found only ${effectiveInternalCount} internal link(s) ` +
        `(including dynamic data.parentServiceHref) — at least 2 required.`,
    );
  }

  // Req 7.9 — at least one link to parent service page
  if (!hasParentServiceHrefPattern) {
    // Fall back to checking if any static link points to a /services/ path
    const hasServiceLink = staticInternalLinks.some((l) => l.href.startsWith('/services/'));
    if (!hasServiceLink) {
      issues.push(
        `[REQ 7.9] CityLandingPage template: no link to the parent service page found. ` +
          `Expected \`to={data.parentServiceHref}\` or a static \`/services/\` link.`,
      );
    }
  }

  // Req 7.9 — at least one link to /contact
  const hasContactLink = staticInternalLinks.some(
    (l) => l.href === '/contact' || l.href.startsWith('/contact'),
  );
  if (!hasContactLink) {
    issues.push(
      `[REQ 7.9] CityLandingPage template: no link to "/contact" found. ` +
        `Expected at least one link with href/to "/contact".`,
    );
  }

  return issues;
}

// ---------------------------------------------------------------------------
// cityPageData.ts — verify parentServiceHref field for all 21 entries
// ---------------------------------------------------------------------------

interface CityDataAuditResult {
  totalEntries: number;
  missingParentHref: string[];
  emptyParentHref: string[];
}

function auditCityPageData(): CityDataAuditResult {
  const result: CityDataAuditResult = {
    totalEntries: 0,
    missingParentHref: [],
    emptyParentHref: [],
  };

  let src: string;
  try {
    src = readFileSync(CITY_PAGE_DATA_PATH, 'utf-8');
  } catch (err) {
    console.warn(`⚠  Could not read cityPageData.ts: ${(err as Error).message}`);
    return result;
  }

  // Find all entry keys and their positions — patterns like: 'amazon-account-management-delhi': {
  // We match only top-level keys (service-city slug pattern) — not the interface definition.
  const entryKeyRe = /^\s*'([a-z][a-z0-9]*(?:-[a-z0-9]+){2,})':\s*\{/gm;
  let keyMatch: RegExpExecArray | null;

  interface EntryPosition {
    key: string;
    start: number;
  }
  const entries: EntryPosition[] = [];

  while ((keyMatch = entryKeyRe.exec(src)) !== null) {
    entries.push({ key: keyMatch[1], start: keyMatch.index });
  }

  result.totalEntries = entries.length;

  // For each entry, extract the source between this entry's start and the next entry's start
  // (or end of file). This avoids any fixed-size chunk limitation.
  for (let i = 0; i < entries.length; i++) {
    const { key, start } = entries[i];
    const end = i + 1 < entries.length ? entries[i + 1].start : src.length;
    const chunk = src.slice(start, end);

    // Check for parentServiceHref key
    const hasField = /parentServiceHref\s*:/.test(chunk);
    if (!hasField) {
      result.missingParentHref.push(key);
      continue;
    }

    // Check that the value is non-empty
    const valueMatch = /parentServiceHref\s*:\s*['"]([^'"]*)['"]/i.exec(chunk);
    if (!valueMatch || valueMatch[1].trim() === '') {
      result.emptyParentHref.push(key);
    }
  }

  return result;
}

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------

function main(): void {
  const results: FileAuditResult[] = [];
  let totalIssues = 0;

  // ── 1. Audit ServicePageTemplate.tsx (shared template for all 22 service pages)
  //
  // ServicePageTemplate renders HeroBanner which always includes:
  //   - breadcrumb <Link to="/">Home</Link>
  //   - breadcrumb <Link to="/services">Services</Link>
  //   - <a href="/contact"> (in HeroBanner CTAs)
  //   - <a href="/services"> (in HeroBanner CTAs)
  //
  // We scan BOTH ServicePageTemplate.tsx AND HeroBanner.tsx together to get
  // the full effective link count for service pages.
  // ---------------------------------------------------------------------------

  const templateParts: Array<{ path: string; label: string }> = [
    {
      path: resolve(COMPONENTS_DIR, 'ServicePageTemplate.tsx'),
      label: 'ServicePageTemplate.tsx',
    },
    {
      path: resolve(COMPONENTS_DIR, 'HeroBanner.tsx'),
      label: 'HeroBanner.tsx (included via ServicePageTemplate)',
    },
  ];

  {
    let combinedSource = '';
    const loadedParts: string[] = [];

    for (const part of templateParts) {
      try {
        const src = readFileSync(part.path, 'utf-8');
        combinedSource += '\n' + src;
        loadedParts.push(part.label);
      } catch (err) {
        console.warn(`⚠  Could not read ${part.path}: ${(err as Error).message}`);
      }
    }

    if (combinedSource.trim()) {
      const allLinks = extractLinks(combinedSource);
      const internalLinks = filterAllInternal(allLinks);
      const issues = auditLinks(internalLinks, 'ServicePageTemplate (+ HeroBanner)', {
        minLinks: 2,
      });

      results.push({
        file: 'src/components/ServicePageTemplate.tsx (+ HeroBanner.tsx)',
        label:
          'ServicePageTemplate.tsx + HeroBanner.tsx\n' +
          '   (combined source — represents all 22 thin-wrapper service pages)',
        links: allLinks,
        internalLinks,
        issues,
      });
    }
  }

  // ── 2. Audit CityLandingPage.tsx template
  // ---------------------------------------------------------------------------
  {
    const cityLandingPath = resolve(SERVICES_DIR, 'CityLandingPage.tsx');
    let src = '';
    try {
      src = readFileSync(cityLandingPath, 'utf-8');
    } catch (err) {
      console.warn(`⚠  Could not read CityLandingPage.tsx: ${(err as Error).message}`);
    }

    if (src) {
      const allLinks = extractLinks(src);
      const internalLinks = filterAllInternal(allLinks);
      const issues = auditCityLandingPageTemplate(src, internalLinks);

      results.push({
        file: 'src/pages/services/CityLandingPage.tsx',
        label: 'CityLandingPage.tsx (shared template for 21 city landing pages)',
        links: allLinks,
        internalLinks,
        issues,
      });
    }
  }

  // ── 3. Audit individual service page files that are NOT thin wrappers
  // ---------------------------------------------------------------------------
  let serviceFiles: string[];
  const wrapperPages: string[] = [];

  try {
    serviceFiles = readdirSync(SERVICES_DIR)
      .filter((f) => f.endsWith('.tsx') && f !== 'CityLandingPage.tsx')
      .sort();
  } catch (err) {
    console.error(`❌ Cannot read services directory: ${SERVICES_DIR}`);
    console.error((err as Error).message);
    process.exit(1);
  }

  for (const filename of serviceFiles) {
    const filePath = resolve(SERVICES_DIR, filename);
    const relPath = `src/pages/services/${filename}`;

    let src: string;
    try {
      src = readFileSync(filePath, 'utf-8');
    } catch (err) {
      console.warn(`⚠  Could not read ${relPath}: ${(err as Error).message}`);
      continue;
    }

    if (isThinWrapper(src)) {
      wrapperPages.push(relPath);
      continue;
    }

    // Non-thin-wrapper: audit its own links
    const allLinks = extractLinks(src);
    const internalLinks = filterAllInternal(allLinks);
    const issues = auditLinks(internalLinks, relPath, { minLinks: 2 });

    results.push({
      file: relPath,
      label: basename(filename, '.tsx') + ' (has own link structure)',
      links: allLinks,
      internalLinks,
      issues,
    });
  }

  // ── 4. Audit cityPageData.ts for parentServiceHref completeness
  // ---------------------------------------------------------------------------
  const cityDataAudit = auditCityPageData();

  // ── 5. Report
  // ---------------------------------------------------------------------------

  const DIVIDER = '─'.repeat(72);

  console.log('');
  console.log('╔══════════════════════════════════════════════════════════════════════╗');
  console.log('║          eCommittra — Internal Links Audit                           ║');
  console.log('║          Requirements 4.6, 7.9                                       ║');
  console.log('╚══════════════════════════════════════════════════════════════════════╝');
  console.log('');

  // Summary of thin-wrapper pages
  if (wrapperPages.length > 0) {
    console.log(`ℹ  ${wrapperPages.length} thin-wrapper service page(s) delegate to ServicePageTemplate:`);
    for (const p of wrapperPages) {
      console.log(`   • ${p}`);
    }
    console.log('   Their internal links come from ServicePageTemplate + HeroBanner — see audit below.');
    console.log('');
  }

  // Per-file results
  for (const result of results) {
    const hasIssues = result.issues.length > 0;
    const icon = hasIssues ? '❌' : '✅';

    console.log(DIVIDER);
    console.log(`${icon}  ${result.label}`);
    console.log(`   Internal links found: ${result.internalLinks.length}`);

    if (result.internalLinks.length > 0) {
      // Deduplicate hrefs for the summary
      const uniqueHrefs = [...new Set(result.internalLinks.map((l) => l.href))];
      console.log(`   Links: ${uniqueHrefs.map((h) => `"${h}"`).join(', ')}`);
    }

    if (hasIssues) {
      for (const issue of result.issues) {
        console.log(`   ⚠  ${issue}`);
        totalIssues++;
      }
    } else {
      console.log('   No issues found.');
    }
    console.log('');
  }

  // City page data audit
  console.log(DIVIDER);
  console.log(`📋  cityPageData.ts — parentServiceHref field check`);
  console.log(`   Total entries: ${cityDataAudit.totalEntries} (expected: 21)`);

  if (cityDataAudit.totalEntries !== 21) {
    const msg =
      `[REQ 7.9] cityPageData.ts has ${cityDataAudit.totalEntries} entries — expected 21 ` +
      `(7 services × 3 cities).`;
    console.log(`   ⚠  ${msg}`);
    totalIssues++;
  }

  if (cityDataAudit.missingParentHref.length > 0) {
    for (const key of cityDataAudit.missingParentHref) {
      const msg = `[REQ 7.9] Entry "${key}" is missing the parentServiceHref field entirely.`;
      console.log(`   ⚠  ${msg}`);
      totalIssues++;
    }
  }

  if (cityDataAudit.emptyParentHref.length > 0) {
    for (const key of cityDataAudit.emptyParentHref) {
      const msg = `[REQ 7.9] Entry "${key}" has an empty parentServiceHref value.`;
      console.log(`   ⚠  ${msg}`);
      totalIssues++;
    }
  }

  const cityDataClean =
    cityDataAudit.missingParentHref.length === 0 &&
    cityDataAudit.emptyParentHref.length === 0 &&
    cityDataAudit.totalEntries === 21;

  if (cityDataClean) {
    console.log('   All 21 entries have a non-empty parentServiceHref. ✅');
  }
  console.log('');

  console.log(DIVIDER);
  console.log('');

  if (totalIssues === 0) {
    console.log('✅  All internal link checks passed — 0 issues found.');
    console.log('');
    process.exit(0);
  } else {
    console.log(`❌  Audit complete — ${totalIssues} issue(s) found. Fix the above before deploying.`);
    console.log('');
    process.exit(1);
  }
}

main();
