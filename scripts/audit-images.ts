/**
 * scripts/audit-images.ts
 *
 * Image attribute auditor for ecommittra.com TSX source files.
 *
 * Recursively scans all .tsx files under src/ (excluding node_modules and dist)
 * and reports:
 *   - Any <img> element missing `alt`, `width`, `height`, or `loading` attributes
 *   - Any <img> whose `alt` text matches the page <title> verbatim (keyword stuffing)
 *
 * Add to package.json:  "audit:images": "tsx scripts/audit-images.ts"
 *
 * Requirements: 2.4, 2.5, 4.4, 4.5
 */

import { readdirSync, readFileSync, statSync } from 'fs';
import { resolve, dirname, relative, extname } from 'path';
import { fileURLToPath } from 'url';

// ---------------------------------------------------------------------------
// Paths
// ---------------------------------------------------------------------------

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, '..');
const SRC_DIR = resolve(ROOT, 'src');
const SEO_CONFIG_PATH = resolve(ROOT, 'src/seo/seoConfig.ts');

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface ImageIssue {
  file: string;       // relative path from project root
  line: number;       // 1-indexed line number where the <img appears
  imgSnippet: string; // first 80 chars of the matched <img> for context
  issues: string[];   // list of problem strings for this <img>
}

// ---------------------------------------------------------------------------
// Recursive TSX file discovery
// ---------------------------------------------------------------------------

/**
 * Recursively collect all .tsx files under a directory,
 * skipping node_modules and dist subtrees.
 */
function collectTsxFiles(dir: string): string[] {
  const results: string[] = [];
  const SKIP_DIRS = new Set(['node_modules', 'dist', '.git']);

  function walk(current: string): void {
    let entries: string[];
    try {
      entries = readdirSync(current);
    } catch {
      return;
    }
    for (const entry of entries) {
      if (SKIP_DIRS.has(entry)) continue;
      const full = resolve(current, entry);
      let stat;
      try {
        stat = statSync(full);
      } catch {
        continue;
      }
      if (stat.isDirectory()) {
        walk(full);
      } else if (stat.isFile() && extname(entry) === '.tsx') {
        results.push(full);
      }
    }
  }

  walk(dir);
  return results.sort();
}

// ---------------------------------------------------------------------------
// Page title extraction from seoConfig.ts
// ---------------------------------------------------------------------------

/**
 * Parse seoConfig.ts source to build a map of route path → title.
 * Best-effort regex — matches well-structured config entries.
 */
function loadPageTitles(): Record<string, string> {
  const map: Record<string, string> = {};
  try {
    const src = readFileSync(SEO_CONFIG_PATH, 'utf-8');
    // Match blocks like: '/some/path': { title: 'Some Title', ... }
    const routeBlockRe = /'(\/[^']*)':\s*\{([^{}]*(?:\{[^{}]*\}[^{}]*)*)\}/g;
    let routeMatch: RegExpExecArray | null;
    while ((routeMatch = routeBlockRe.exec(src)) !== null) {
      const path = routeMatch[1];
      const block = routeMatch[2];
      const titleMatch = /\btitle\s*:\s*['"]([^'"]+)['"]/i.exec(block);
      if (titleMatch) {
        map[path] = titleMatch[1];
      }
    }
  } catch {
    console.warn('⚠  Could not read seoConfig.ts — alt-vs-title checks will be skipped.');
  }
  return map;
}

/**
 * Derive the route path from a source file path, for looking up page titles.
 * e.g. src/pages/services/amazon-account-management.tsx
 *      → /services/amazon-account-management
 * Returns null when a mapping cannot be determined.
 */
function filePathToRoutePath(filePath: string): string | null {
  const rel = relative(SRC_DIR, filePath).replace(/\\/g, '/');

  // pages/index.tsx or pages/Home.tsx → '/'
  if (rel === 'pages/index.tsx' || rel === 'pages/Home.tsx') return '/';

  // pages/<PageName>.tsx → map known names
  const corePageMap: Record<string, string> = {
    'pages/About.tsx': '/about',
    'pages/Services.tsx': '/services',
    'pages/Contact.tsx': '/contact',
    'pages/Gallery.tsx': '/gallery',
    'pages/Career.tsx': '/career',
  };
  if (rel in corePageMap) return corePageMap[rel];

  // pages/services/<slug>.tsx → /services/<slug>
  const serviceMatch = /^pages\/services\/([^/]+)\.tsx$/.exec(rel);
  if (serviceMatch) {
    const slug = serviceMatch[1];
    // Skip templates/generic files — they don't have their own route
    if (slug === 'CityLandingPage' || slug === 'index') return null;
    return `/services/${slug}`;
  }

  return null;
}

// ---------------------------------------------------------------------------
// Attribute extraction helpers
// ---------------------------------------------------------------------------

/**
 * Given the raw attribute string captured from a <img ...> tag,
 * extract the value of a named attribute.
 * Returns null if the attribute is absent; returns '' if present but empty.
 */
function extractAttrValue(attrStr: string, attrName: string): string | null {
  // Match: attrName="value" | attrName='value' | attrName={value} | attrName (boolean)
  const re = new RegExp(
    `\\b${attrName}\\s*=\\s*(?:"([^"]*)"|'([^']*)'|\\{([^}]*)\\})`,
    'i',
  );
  const match = re.exec(attrStr);
  if (!match) {
    // Check for bare boolean form: attrName followed by whitespace/> (no value)
    const boolRe = new RegExp(`\\b${attrName}(?=\\s|>|\\/)`, 'i');
    if (boolRe.test(attrStr)) return ''; // present with no value
    return null; // absent
  }
  // One of the three capture groups will be set
  return match[1] ?? match[2] ?? match[3] ?? '';
}

/**
 * Check whether an attribute is present (regardless of value).
 */
function hasAttr(attrStr: string, attrName: string): boolean {
  return extractAttrValue(attrStr, attrName) !== null;
}

/**
 * Extract the string value of `alt`, handling the common JSX patterns:
 *   alt="some text"      → "some text"
 *   alt='some text'      → "some text"
 *   alt={"some text"}    → "some text"
 *   alt={`some text`}    → "some text" (template literal without expressions)
 * Returns null if alt is not present.
 * Returns '' if alt is present but empty or dynamic.
 */
function extractAltValue(attrStr: string): string | null {
  const raw = extractAttrValue(attrStr, 'alt');
  if (raw === null) return null;

  // Strip surrounding quotes/backticks from JSX expression captures
  const stripped = raw.replace(/^['"`]|['"`]$/g, '').trim();
  return stripped;
}

// ---------------------------------------------------------------------------
// Line number helper
// ---------------------------------------------------------------------------

/** Return the 1-indexed line number for a character offset in source text. */
function lineOf(source: string, charIndex: number): number {
  return source.slice(0, charIndex).split('\n').length;
}

// ---------------------------------------------------------------------------
// Core audit
// ---------------------------------------------------------------------------

interface AuditContext {
  pageTitle: string | undefined; // page title from seoConfig for alt-vs-title check
}

/**
 * Scan one TSX file for <img> issues.
 */
function auditFile(filePath: string, ctx: AuditContext): ImageIssue[] {
  let source: string;
  try {
    source = readFileSync(filePath, 'utf-8');
  } catch {
    console.warn(`⚠  Could not read: ${filePath}`);
    return [];
  }

  const relPath = relative(ROOT, filePath).replace(/\\/g, '/');
  const fileIssues: ImageIssue[] = [];

  // Match each <img ...> or <img .../> element, including multi-line
  // Capture group 1 = everything between <img and the closing > or />
  const imgRe = /<img\b([^>]*?)(\/?>)/gs;
  let match: RegExpExecArray | null;

  while ((match = imgRe.exec(source)) !== null) {
    const fullMatch = match[0];
    const attrStr = match[1]; // raw attribute string
    const line = lineOf(source, match.index);
    const snippet = fullMatch.replace(/\s+/g, ' ').slice(0, 80);

    const issues: string[] = [];

    // ── REQ 2.4 / 4.4: alt must be present and non-empty ───────────────────
    const altValue = extractAltValue(attrStr);
    if (altValue === null) {
      issues.push('[REQ 4.4] Missing `alt` attribute.');
    } else if (altValue === '') {
      // An empty alt (alt="" or alt={""}) is valid for decorative images per
      // HTML spec, but the requirements demand a non-empty descriptive alt.
      // Flag it unless it looks explicitly decorative (aria-hidden="true").
      const ariaHidden = extractAttrValue(attrStr, 'aria-hidden');
      if (ariaHidden !== 'true') {
        issues.push('[REQ 4.4] `alt` attribute is empty — provide a descriptive value or add aria-hidden="true" for purely decorative images.');
      }
    }

    // ── REQ 2.4: width must be present ─────────────────────────────────────
    if (!hasAttr(attrStr, 'width')) {
      issues.push('[REQ 2.4] Missing `width` attribute — explicit dimensions prevent layout shift (CLS).');
    }

    // ── REQ 2.4: height must be present ────────────────────────────────────
    if (!hasAttr(attrStr, 'height')) {
      issues.push('[REQ 2.4] Missing `height` attribute — explicit dimensions prevent layout shift (CLS).');
    }

    // ── REQ 2.5: loading must be present ───────────────────────────────────
    if (!hasAttr(attrStr, 'loading')) {
      issues.push('[REQ 2.5] Missing `loading` attribute — add `loading="lazy"` (below-fold) or `loading="eager"` (hero images).');
    }

    // ── REQ 4.5: alt must not verbatim match the page <title> ──────────────
    if (ctx.pageTitle && altValue && altValue.length > 0) {
      if (altValue.trim() === ctx.pageTitle.trim()) {
        issues.push(
          `[REQ 4.5] \`alt\` text verbatim matches page title "${ctx.pageTitle}" — this is keyword stuffing.`,
        );
      }
    }

    if (issues.length > 0) {
      fileIssues.push({ file: relPath, line, imgSnippet: snippet, issues });
    }
  }

  return fileIssues;
}

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------

function main(): void {
  const pageTitles = loadPageTitles();
  const tsxFiles = collectTsxFiles(SRC_DIR);

  const allIssues: ImageIssue[] = [];
  let totalImgCount = 0;
  let filesWithImgs = 0;

  for (const filePath of tsxFiles) {
    const routePath = filePathToRoutePath(filePath);
    const pageTitle = routePath ? pageTitles[routePath] : undefined;

    const source = (() => {
      try { return readFileSync(filePath, 'utf-8'); } catch { return ''; }
    })();

    // Quick pre-check: skip files with no <img at all
    if (!/<img\b/i.test(source)) continue;

    filesWithImgs++;
    // Count images for stats
    const imgMatches = source.match(/<img\b/gi);
    totalImgCount += imgMatches ? imgMatches.length : 0;

    const issues = auditFile(filePath, { pageTitle });
    allIssues.push(...issues);
  }

  // ---------------------------------------------------------------------------
  // Report
  // ---------------------------------------------------------------------------

  const DIVIDER = '─'.repeat(72);

  console.log('');
  console.log('╔══════════════════════════════════════════════════════════════════════╗');
  console.log('║          eCommittra — Image Attribute Audit                          ║');
  console.log('║          Requirements 2.4, 2.5, 4.4, 4.5                            ║');
  console.log('╚══════════════════════════════════════════════════════════════════════╝');
  console.log('');
  console.log(`ℹ  Scanned ${tsxFiles.length} TSX file(s) in src/`);
  console.log(`ℹ  Found ${totalImgCount} <img> element(s) across ${filesWithImgs} file(s)`);
  console.log('');

  if (allIssues.length === 0) {
    console.log('✅  All image checks passed — 0 issues found.');
    console.log('');
    process.exit(0);
  }

  // Group issues by file for a cleaner report
  const byFile = new Map<string, ImageIssue[]>();
  for (const issue of allIssues) {
    const list = byFile.get(issue.file) ?? [];
    list.push(issue);
    byFile.set(issue.file, list);
  }

  let totalIssueCount = 0;

  for (const [file, issues] of byFile) {
    console.log(DIVIDER);
    console.log(`❌  ${file}`);
    console.log('');
    for (const issue of issues) {
      console.log(`   Line ${issue.line}: ${issue.imgSnippet}`);
      for (const msg of issue.issues) {
        console.log(`     ⚠  ${msg}`);
        totalIssueCount++;
      }
      console.log('');
    }
  }

  console.log(DIVIDER);
  console.log('');
  console.log(`❌  Audit complete — ${totalIssueCount} issue(s) found across ${byFile.size} file(s).`);
  console.log('    Fix the above before deploying to avoid CLS and SEO penalties.');
  console.log('');
  process.exit(1);
}

main();
