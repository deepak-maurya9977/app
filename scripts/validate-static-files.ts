/**
 * scripts/validate-static-files.ts
 *
 * Validates static files required for correct SEO behaviour:
 *
 *   1. public/robots.txt  – must contain the Sitemap: directive (Req 1.1)
 *                         – must NOT block .js, .css, or image file extensions (Req 12.7)
 *   2. public/_redirects  – must NOT redirect traffic away from the canonical domain (Req 9.6)
 *
 * Exits with status 1 and prints human-readable errors on any failure.
 * Exits with status 0 and prints a success message when all checks pass.
 *
 * Requirements: 1.1, 9.6, 12.7
 */

import { readFileSync, existsSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const ROBOTS_PATH = resolve(ROOT, 'public/robots.txt');
const REDIRECTS_PATH = resolve(ROOT, 'public/_redirects');

const CANONICAL_DOMAIN = 'ecommittra.com';
const REQUIRED_SITEMAP_DIRECTIVE = `Sitemap: https://${CANONICAL_DOMAIN}/sitemap.xml`;

/**
 * Static asset extensions that robots.txt must NOT block.
 * Req 12.7: Googlebot must be able to access CSS, JS, and image resources
 * needed to render indexed pages.
 */
const BLOCKED_EXTENSIONS = ['.js', '.css', '.png', '.jpg', '.jpeg', '.webp', '.svg', '.gif', '.avif'];

// ---------------------------------------------------------------------------
// Check helpers
// ---------------------------------------------------------------------------

/**
 * Verify that robots.txt contains the required Sitemap: directive.
 * Returns an error string on failure, or null on success.
 */
function checkRobotsSitemapDirective(content: string): string | null {
  const lines = content.split('\n').map((l) => l.trim());
  const hasSitemap = lines.some((line) => line === REQUIRED_SITEMAP_DIRECTIVE);
  if (!hasSitemap) {
    return (
      `robots.txt is missing the required Sitemap directive.\n` +
      `  Expected: ${REQUIRED_SITEMAP_DIRECTIVE}\n` +
      `  Tip: Add the line above to public/robots.txt.`
    );
  }
  return null;
}

/**
 * Verify that robots.txt does not contain Disallow rules blocking static asset
 * extensions (.js, .css, images).
 * Returns an array of error strings (one per offending line).
 */
function checkRobotsNoStaticAssetDisallow(content: string): string[] {
  const errors: string[] = [];
  const lines = content.split('\n');

  for (let i = 0; i < lines.length; i++) {
    const raw = lines[i];
    const trimmed = raw.trim();

    // Only look at Disallow directives with a non-empty path
    if (!trimmed.toLowerCase().startsWith('disallow:')) continue;
    const valuePart = trimmed.slice('disallow:'.length).trim();
    if (!valuePart || valuePart === '/') continue; // disallowing root is a separate concern

    // Check if the disallow path targets a blocked extension
    for (const ext of BLOCKED_EXTENSIONS) {
      // Match patterns like /*.js, /*.css, /path/*.png, or exact extension paths
      if (valuePart.endsWith(ext) || valuePart.includes(`*${ext}`)) {
        errors.push(
          `robots.txt line ${i + 1}: Disallow rule blocks "${ext}" files — ` +
          `"${trimmed}"\n` +
          `  This prevents Googlebot from rendering indexed pages (Req 12.7).`,
        );
        break; // one error per line is sufficient
      }
    }
  }

  return errors;
}

/**
 * Verify that _redirects contains no rule that sends traffic away from
 * the canonical domain (ecommittra.com) to a different domain.
 *
 * A redirect is considered "away from canonical" if:
 *   - The destination (2nd token) starts with http:// or https://
 *   - AND the destination does NOT contain ecommittra.com
 *
 * Status codes 301/302 are the main concern, but any external redirect
 * pointing away from the canonical domain is flagged.
 *
 * Returns an array of error strings.
 */
function checkRedirectsNoCanonicalEscape(content: string): string[] {
  const errors: string[] = [];
  const lines = content.split('\n');

  for (let i = 0; i < lines.length; i++) {
    const raw = lines[i];
    const trimmed = raw.trim();

    // Skip blank lines and comments
    if (!trimmed || trimmed.startsWith('#')) continue;

    // Netlify _redirects format: <from> <to> [status] [options]
    const tokens = trimmed.split(/\s+/);
    if (tokens.length < 2) continue;

    const destination = tokens[1];

    // Only flag absolute URL destinations (http:// or https://)
    if (!destination.startsWith('http://') && !destination.startsWith('https://')) continue;

    // If the destination does not contain the canonical domain, it's an escape
    if (!destination.includes(CANONICAL_DOMAIN)) {
      errors.push(
        `_redirects line ${i + 1}: Rule redirects away from ${CANONICAL_DOMAIN}.\n` +
        `  Rule: "${trimmed}"\n` +
        `  Destination "${destination}" does not point to ${CANONICAL_DOMAIN} (Req 9.6).`,
      );
    }
  }

  return errors;
}

// ---------------------------------------------------------------------------
// File readers
// ---------------------------------------------------------------------------

function readFile(path: string, label: string): string | null {
  if (!existsSync(path)) {
    return null; // caller will report the missing-file error
  }
  try {
    return readFileSync(path, 'utf-8');
  } catch (err) {
    console.error(`❌ Failed to read ${label} at ${path}: ${(err as Error).message}`);
    process.exit(1);
  }
}

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------

function main(): void {
  const errors: string[] = [];

  // ── robots.txt ────────────────────────────────────────────────────────────
  const robotsContent = readFile(ROBOTS_PATH, 'robots.txt');
  if (robotsContent === null) {
    errors.push(`robots.txt not found at ${ROBOTS_PATH}`);
  } else {
    const sitemapError = checkRobotsSitemapDirective(robotsContent);
    if (sitemapError) errors.push(sitemapError);

    const disallowErrors = checkRobotsNoStaticAssetDisallow(robotsContent);
    errors.push(...disallowErrors);
  }

  // ── _redirects ────────────────────────────────────────────────────────────
  const redirectsContent = readFile(REDIRECTS_PATH, '_redirects');
  if (redirectsContent === null) {
    errors.push(`_redirects not found at ${REDIRECTS_PATH}`);
  } else {
    const redirectErrors = checkRedirectsNoCanonicalEscape(redirectsContent);
    errors.push(...redirectErrors);
  }

  // ── Report ────────────────────────────────────────────────────────────────
  if (errors.length > 0) {
    console.error(`❌ Static file validation failed — ${errors.length} issue(s) found:\n`);
    for (let i = 0; i < errors.length; i++) {
      console.error(`  [${i + 1}] ${errors[i]}\n`);
    }
    process.exit(1);
  }

  console.log('✅ Static file validation passed:');
  console.log(`   • robots.txt contains Sitemap: https://${CANONICAL_DOMAIN}/sitemap.xml`);
  console.log('   • robots.txt has no Disallow rules blocking static assets');
  console.log('   • _redirects has no rules redirecting away from the canonical domain');
}

main();
