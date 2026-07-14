/**
 * scripts/audit-headings.ts
 *
 * Heading hierarchy auditor for ecommittra.com service pages.
 *
 * Parses all TSX files in src/pages/services/ and the shared component
 * files (ServicePageTemplate.tsx, HeroBanner.tsx, CityLandingPage.tsx)
 * for JSX heading elements, then reports:
 *   - Pages missing exactly one <h1>
 *   - Pages where an <h3> or deeper appears before the first <h2>
 *   - <h1> elements that do not contain the page's primaryKeyword
 *
 * Add to package.json:  "audit:headings": "tsx scripts/audit-headings.ts"
 *
 * Requirements: 4.1, 4.2, 4.3
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
const SEO_CONFIG_PATH = resolve(ROOT, 'src/seo/seoConfig.ts');

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface HeadingOccurrence {
  level: number; // 1–6
  line: number;
  text: string; // extracted text content (best-effort)
}

interface PageAuditResult {
  file: string;         // relative file path
  slug: string;         // route slug derived from filename
  headings: HeadingOccurrence[];
  issues: string[];
}

// ---------------------------------------------------------------------------
// Heading extraction
// ---------------------------------------------------------------------------

/**
 * Extract all JSX heading opening tags from source text using a simple regex.
 * Returns them in document (source) order with line number and best-effort text.
 */
function extractHeadings(source: string): HeadingOccurrence[] {
  const headings: HeadingOccurrence[] = [];
  const lines = source.split('\n');

  // Match any opening heading tag: <h1, <h2, …, <h6 followed by space, >, or />
  // The regex allows optional whitespace between < and h (JSX formatting).
  const tagRe = /< *h([1-6])[\s>\/]/g;
  let match: RegExpExecArray | null;

  while ((match = tagRe.exec(source)) !== null) {
    const level = parseInt(match[1], 10);

    // Determine line number (1-indexed)
    const upToMatch = source.slice(0, match.index);
    const line = upToMatch.split('\n').length;

    // Best-effort: extract text between the opening tag and </hN>
    const closingTag = `</h${level}>`;
    const openTagEnd = source.indexOf('>', match.index);
    let text = '';
    if (openTagEnd !== -1) {
      const closeIdx = source.indexOf(closingTag, openTagEnd);
      if (closeIdx !== -1) {
        // Strip inner JSX tags and collapse whitespace
        text = source
          .slice(openTagEnd + 1, closeIdx)
          .replace(/<[^>]*>/g, ' ')
          .replace(/\{[^}]*\}/g, ' ')
          .replace(/\s+/g, ' ')
          .trim();
      }
    }

    headings.push({ level, line, text });
  }

  return headings;
}

// ---------------------------------------------------------------------------
// Primary keyword extraction from seoConfig.ts
// ---------------------------------------------------------------------------

/**
 * Parse seoConfig.ts source to extract primaryKeyword values keyed by route path.
 * Uses a simple regex — good enough for a well-structured config file.
 */
function loadPrimaryKeywords(): Record<string, string> {
  const map: Record<string, string> = {};
  try {
    const src = readFileSync(SEO_CONFIG_PATH, 'utf-8');
    // Match blocks like: '/services/foo': { ... primaryKeyword: 'bar', ... }
    // We use a multi-step approach: find each route key then find its primaryKeyword.
    const routeBlockRe = /'(\/[^']+)':\s*\{([^{}]*(?:\{[^{}]*\}[^{}]*)*)\}/g;
    let routeMatch: RegExpExecArray | null;
    while ((routeMatch = routeBlockRe.exec(src)) !== null) {
      const path = routeMatch[1];
      const block = routeMatch[2];
      const kwMatch = /primaryKeyword\s*:\s*['"]([^'"]+)['"]/i.exec(block);
      if (kwMatch) {
        map[path] = kwMatch[1].toLowerCase();
      }
    }
  } catch {
    console.warn('⚠  Could not read seoConfig.ts — primaryKeyword checks will be skipped.');
  }
  return map;
}

// ---------------------------------------------------------------------------
// Slug → route path mapping
// ---------------------------------------------------------------------------

/**
 * Convert a service page filename to its route path.
 * e.g. "amazon-account-management.tsx" → "/services/amazon-account-management"
 * e.g. "CityLandingPage.tsx" → (template — no fixed slug)
 */
function fileToRoutePath(filename: string): string | null {
  const base = basename(filename, '.tsx');
  if (base === 'CityLandingPage') return null; // template, checked separately
  return `/services/${base}`;
}

// ---------------------------------------------------------------------------
// Audit logic
// ---------------------------------------------------------------------------

/**
 * Given a list of heading occurrences and the page's primaryKeyword,
 * return an array of human-readable issue strings.
 */
function auditHeadings(
  headings: HeadingOccurrence[],
  primaryKeyword: string | undefined,
  label: string,
): string[] {
  const issues: string[] = [];

  const h1s = headings.filter((h) => h.level === 1);

  // 4.1 — Exactly one <h1>
  if (h1s.length === 0) {
    issues.push(`[REQ 4.1] Missing <h1> — no <h1> element found.`);
  } else if (h1s.length > 1) {
    issues.push(
      `[REQ 4.1] Duplicate <h1> — found ${h1s.length} <h1> elements (lines ${h1s.map((h) => h.line).join(', ')}).`,
    );
  }

  // 4.2 — <h1> must contain the page's primaryKeyword
  if (primaryKeyword && h1s.length > 0) {
    for (const h1 of h1s) {
      if (!h1.text.toLowerCase().includes(primaryKeyword.toLowerCase())) {
        issues.push(
          `[REQ 4.2] <h1> at line ${h1.line} does not contain primaryKeyword "${primaryKeyword}". ` +
            `Actual text: "${h1.text || '(dynamic/empty)'}"`,
        );
      }
    }
  }

  // 4.3 — No <h3> or deeper before the first <h2>
  const firstH2Idx = headings.findIndex((h) => h.level === 2);
  if (firstH2Idx === -1 && headings.some((h) => h.level >= 3)) {
    // Has h3+ but no h2 at all
    issues.push(
      `[REQ 4.3] Heading hierarchy issue — found <h3> or deeper but no <h2> element at all.`,
    );
  } else if (firstH2Idx > -1) {
    // Check if any h3+ appears before the first h2
    const prematureDeep = headings
      .slice(0, firstH2Idx)
      .filter((h) => h.level >= 3);
    if (prematureDeep.length > 0) {
      const lines = prematureDeep.map((h) => `<h${h.level}> at line ${h.line}`).join(', ');
      issues.push(
        `[REQ 4.3] Heading hierarchy issue — ${lines} appears before the first <h2> (line ${headings[firstH2Idx].line}).`,
      );
    }
  }

  return issues;
}

// ---------------------------------------------------------------------------
// Thin-wrapper detection
// ---------------------------------------------------------------------------

/**
 * Returns true if the source file is a thin wrapper that delegates all
 * rendering to ServicePageTemplate (which itself uses HeroBanner for <h1>).
 */
function isThinWrapper(source: string): boolean {
  return (
    source.includes('ServicePageTemplate') &&
    !source.includes('<h1') &&
    !source.includes('<h2') &&
    !source.includes('<h3')
  );
}

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------

function main(): void {
  const primaryKeywords = loadPrimaryKeywords();

  // -- Part 1: Audit shared templates that define the actual heading structure

  const templateFiles: Array<{ path: string; label: string; routePath: string | null }> = [
    {
      path: resolve(COMPONENTS_DIR, 'ServicePageTemplate.tsx'),
      label: 'ServicePageTemplate.tsx (shared template for 22 service pages)',
      routePath: null,
    },
    {
      path: resolve(COMPONENTS_DIR, 'HeroBanner.tsx'),
      label: 'HeroBanner.tsx (renders <h1> for all ServicePageTemplate pages)',
      routePath: null,
    },
    {
      path: resolve(SERVICES_DIR, 'CityLandingPage.tsx'),
      label: 'CityLandingPage.tsx (shared template for 21 city landing pages)',
      routePath: null,
    },
  ];

  const results: PageAuditResult[] = [];
  const wrapperPages: string[] = [];

  // -- Part 2: Scan individual service page files

  let serviceFiles: string[];
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
    const source = readFileSync(filePath, 'utf-8');

    if (isThinWrapper(source)) {
      // Thin wrappers delegate to ServicePageTemplate — note them but don't audit headings here
      wrapperPages.push(relPath);
      continue;
    }

    // File has inline heading elements — audit it directly
    const routePath = fileToRoutePath(filename);
    const primaryKeyword = routePath ? primaryKeywords[routePath] : undefined;
    const headings = extractHeadings(source);
    const issues = auditHeadings(headings, primaryKeyword, relPath);

    results.push({ file: relPath, slug: routePath ?? filename, headings, issues });
  }

  // -- Part 3: Audit the shared template files
  for (const tmpl of templateFiles) {
    let source: string;
    try {
      source = readFileSync(tmpl.path, 'utf-8');
    } catch {
      console.warn(`⚠  Could not read template file: ${tmpl.path}`);
      continue;
    }

    const headings = extractHeadings(source);
    // For templates we only check hierarchy (h1/h2/h3 rules) — no fixed primaryKeyword
    const issues: string[] = [];

    // HeroBanner is expected to have exactly one h1
    if (tmpl.path.includes('HeroBanner')) {
      const h1s = headings.filter((h) => h.level === 1);
      if (h1s.length === 0) {
        issues.push('[REQ 4.1] HeroBanner does not render an <h1> — service pages will have no <h1>.');
      } else if (h1s.length > 1) {
        issues.push(`[REQ 4.1] HeroBanner renders ${h1s.length} <h1> elements — service pages will have multiple <h1>s.`);
      }
    }

    // ServicePageTemplate should have no h1 (h1 comes from HeroBanner) and h2 before h3
    if (tmpl.path.includes('ServicePageTemplate')) {
      const h1s = headings.filter((h) => h.level === 1);
      if (h1s.length > 0) {
        issues.push(
          `[REQ 4.1] ServicePageTemplate has ${h1s.length} <h1> element(s) — combined with HeroBanner this would produce duplicate <h1>s on service pages.`,
        );
      }
      // Check h3 before first h2 within the template body
      const firstH2Idx = headings.findIndex((h) => h.level === 2);
      if (firstH2Idx > -1) {
        const premature = headings.slice(0, firstH2Idx).filter((h) => h.level >= 3);
        if (premature.length > 0) {
          const lines = premature.map((h) => `<h${h.level}> at line ${h.line}`).join(', ');
          issues.push(`[REQ 4.3] ServicePageTemplate: ${lines} appears before first <h2> (line ${headings[firstH2Idx].line}).`);
        }
      }
    }

    // CityLandingPage — full hierarchy check + h1 count check
    if (tmpl.path.includes('CityLandingPage')) {
      const hierarchyIssues = auditHeadings(headings, undefined, tmpl.label);
      issues.push(...hierarchyIssues);
    }

    results.push({ file: tmpl.label, slug: tmpl.label, headings, issues });
  }

  // ---------------------------------------------------------------------------
  // Report
  // ---------------------------------------------------------------------------

  const DIVIDER = '─'.repeat(72);

  console.log('');
  console.log('╔══════════════════════════════════════════════════════════════════════╗');
  console.log('║          eCommittra — Heading Hierarchy Audit                        ║');
  console.log('║          Requirements 4.1, 4.2, 4.3                                 ║');
  console.log('╚══════════════════════════════════════════════════════════════════════╝');
  console.log('');

  // Summary of thin-wrapper pages
  if (wrapperPages.length > 0) {
    console.log(`ℹ  ${wrapperPages.length} thin-wrapper service page(s) delegate to ServicePageTemplate:`);
    for (const p of wrapperPages) {
      console.log(`   • ${p}`);
    }
    console.log('   Their <h1> is provided by HeroBanner — see template audit below.');
    console.log('');
  }

  let totalIssues = 0;

  for (const result of results) {
    const headingSummary = result.headings
      .map((h) => `h${h.level}`)
      .join(' → ') || '(none found)';

    const hasIssues = result.issues.length > 0;
    const icon = hasIssues ? '❌' : '✅';

    console.log(DIVIDER);
    console.log(`${icon}  ${result.file}`);
    console.log(`   Headings: ${headingSummary}`);

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

  console.log(DIVIDER);
  console.log('');

  if (totalIssues === 0) {
    console.log('✅  All heading checks passed — 0 issues found.');
    console.log('');
    process.exit(0);
  } else {
    console.log(`❌  Audit complete — ${totalIssues} issue(s) found. Fix the above before deploying.`);
    console.log('');
    process.exit(1);
  }
}

main();
