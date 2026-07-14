# Implementation Plan: SEO Optimisation — ecommittra.com

## Overview

Incrementally layer SEO infrastructure onto the existing React/TypeScript SPA. The work proceeds in six phases: (1) install dependencies and scaffold the SEO module, (2) implement the Meta_Manager and per-page configs, (3) implement the Schema_Injector, (4) build city landing pages, (5) wire up build-time tooling (sitemap generator, audit scripts, validation), and (6) update the Footer with NAP microdata. Each phase ends with a checkpoint.

---

## Tasks

- [x] 1. Install react-helmet-async and scaffold the SEO module
  - Install `react-helmet-async@^2.0.4` as a production dependency
  - Install `fast-check@^3.22.0` as a dev dependency (needed for property-based tests in later tasks)
  - Create the `src/seo/` directory with four empty files: `types.ts`, `SEO.tsx`, `SchemaInjector.tsx`, `seoConfig.ts`, `routeManifest.ts`
  - Wrap the React tree in `main.tsx` with `<HelmetProvider>` from `react-helmet-async`
  - _Requirements: 3.1, 3.3, 5.1, 6.1_

- [x] 2. Define SEO types and the route manifest
  - [x] 2.1 Implement `src/seo/types.ts`
    - Define `PageSeoConfig`, `OrganizationSchema`, `LocalBusinessSchema`, `ServiceSchema`, `FAQPageSchema`, `FAQItemSchema`, `PostalAddressSchema`, `ContactPointSchema`, `OpeningHoursSchema`, `SitemapEntry`, `KeywordDensityResult` interfaces exactly as specified in the design
    - _Requirements: 3.1–3.4, 5.1, 6.1_

  - [x] 2.2 Implement `src/seo/routeManifest.ts`
    - Export `CORE_ROUTES` array (6 entries), `SERVICE_SLUGS` (derived from `Object.keys(servicePages)` from `serviceData.ts`), and `CITY_COMBINATIONS` array (7 service × 3 cities = 21 entries) as specified in the design
    - _Requirements: 1.2, 7.6, 7.10_

- [x] 3. Implement the SEO utility functions
  - [x] 3.1 Implement `calculateKeywordDensity` in `src/seo/utils.ts`
    - Function signature: `(bodyText: string, keyword: string): KeywordDensityResult`
    - Returns `{ keyword, occurrences, totalWords, densityPercent }` where `densityPercent = occurrences / totalWords * 100`
    - Handle edge cases: empty text returns density 0, keyword not present returns occurrences 0
    - _Requirements: 12.4_

  - [x] 3.2 Write property test for `calculateKeywordDensity`
    - **Property 15: Keyword density ≤ 3% detection**
    - Generate arbitrary body text strings and keywords; verify density formula is always `occurrences / totalWords * 100`; verify density is 0 when keyword is absent; verify density is 0 when text is empty
    - **Validates: Requirements 12.4**

  - [x] 3.3 Implement `calculateContentSimilarity` in `src/seo/utils.ts`
    - Function signature: `(textA: string, textB: string): number` (returns 0.0–1.0 Jaccard trigram similarity)
    - Identical texts return 1.0; completely different texts return 0.0
    - _Requirements: 7.4_

  - [x] 3.4 Implement canonical URL resolver in `src/seo/utils.ts`
    - Function signature: `resolveCanonical(rawPath: string): string`
    - Normalise trailing slashes (prefer no trailing slash except root `/`), lowercase path segments, strip `www.` prefix, always prepend `https://ecommittra.com`
    - _Requirements: 1.6, 1.7_

  - [x] 3.5 Write property test for canonical URL resolver
    - **Property 2: URL variant normalization to canonical form**
    - Generate URL strings with random trailing slashes, mixed-case path segments, and optional `www.` prefix; verify all variants of the same logical path resolve to the same canonical URL
    - **Validates: Requirements 1.7**

- [x] 4. Implement `src/seo/seoConfig.ts` — per-page SEO configs
  - [x] 4.1 Add SEO configs for the 6 core pages
    - Entries for `/`, `/about`, `/services`, `/contact`, `/gallery`, `/career`
    - Every title must be 30–60 characters; every description must be 120–155 characters
    - Homepage title must include "eCommittra" and a primary brand keyword (Req 3.8)
    - _Requirements: 3.1–3.8_

  - [x] 4.2 Add SEO configs for all 22 service pages
    - One entry per service slug (keys matching `servicePages` in `serviceData.ts`)
    - Each entry includes `primaryKeyword`; the keyword must appear in both `title` and `description`
    - All titles unique; all descriptions unique
    - _Requirements: 3.5, 3.6, 3.7_

  - [x] 4.3 Add SEO configs for all 21 city landing pages
    - Follow slug pattern `{service-slug}-{city-slug}` (e.g. `amazon-account-management-delhi`)
    - Title includes both service name and city name within 60 characters (Req 7.3)
    - Each includes `primaryKeyword` containing both service and city (e.g. "amazon account management Delhi")
    - _Requirements: 7.3, 7.5_

  - [x] 4.4 Write proper ty tests for SEO config correctness
    - **Property 3: Title tag length [30, 60] for all pages**
    - **Property 4: Meta description length [120, 155] for all pages**
    - **Property 5: Primary keyword in both title and description for service/city pages**
    - **Property 6: All titles unique; all descriptions unique across 49 pages**
    - Sample from the full `pageSeoConfigs` map; verify each property holds for every entry
    - **Validates: Requirements 3.1–3.8**

- [x] 5. Implement `src/seo/SEO.tsx` — Meta_Manager component
  - [x] 5.1 Build the `SEO` component
    - Accept `PageSeoConfig` prop; use `react-helmet-async` `Helmet` to inject `<title>`, `<meta name="description">`, `<link rel="canonical">`, and OpenGraph/Twitter tags
    - Implement fallback defaults when config is missing (brand title, global description, `window.location.href` canonical); emit console warning in development
    - _Requirements: 3.1, 3.3, 1.6_

  - [x] 5.2 Integrate `SEO` into `src/components/Layout.tsx`
    - Resolve the current route path, look up `pageSeoConfigs`, and render `<SEO config={...} />` inside the Layout so every page gets head tags automatically
    - _Requirements: 3.1, 3.3_

  - [x] 5.3 Write property test for canonical tag injection
    - **Property 1: Every page has a canonical tag pointing to its own URL**
    - For each route path in `routeManifest`, render the `SEO` component with the matching config; extract the `<link rel="canonical" href>` value; verify it equals `https://ecommittra.com{path}` (trailing slash normalised)
    - **Validates: Requirements 1.6, 7.5**

- [x] 6. Checkpoint — Meta_Manager integration
  - Ensure all tests pass; confirm the homepage, an example service page, and an example core page all render with correct `<title>`, `<meta name="description">`, and `<link rel="canonical">` in the browser DevTools head panel. Ask the user if questions arise.

- [x] 7. Implement `src/seo/SchemaInjector.tsx` — Schema_Injector component
  - [x] 7.1 Build the `SchemaInjector` component
    - Accept an array of schema objects (union type from `types.ts`); use `react-helmet-async` `Helmet` to inject one `<script type="application/ld+json">` per schema object
    - Key each injected block on `schema["@type"] + canonical` to prevent duplication (Req 5.5)
    - Wrap `JSON.stringify` in try/catch; on failure omit the block and log a console error
    - Validate that `NAP.streetAddress` and `NAP.postalCode` are not placeholder values; log warning and omit incomplete field if so
    - _Requirements: 5.1, 5.5, 6.1_

  - [x] 7.2 Add Organization and LocalBusiness schemas to `src/pages/Home.tsx`
    - Render `<SchemaInjector schemas={[orgSchema, localBizSchema, faqSchema]} />` where `faqSchema` is built from the `FAQ_HOME` constant
    - Remove (or comment out) the two existing static `<script type="application/ld+json">` blocks from `index.html` after confirming the component renders them correctly
    - Add the `NAP` constant (with full address fields) to `src/lib/constants.ts`; mark fields that require operations team input with `// TODO: confirm with ops`
    - _Requirements: 5.1, 5.2, 5.3, 5.5_

  - [x] 7.3 Add Service + FAQPage schemas to `src/components/ServicePageTemplate.tsx`
    - Render `<SchemaInjector schemas={[serviceSchema, faqPageSchema]} />` inside the template
    - `serviceSchema.areaServed` must always include `"India"` plus `["Delhi","Mumbai","Bangalore","Hyderabad","Chennai"]`
    - `faqPageSchema` items must be derived from the `faq` prop array passed to the template
    - _Requirements: 6.1, 6.2, 6.4_

  - [x] 7.4 Write property tests for schema correctness
    - **Property 11: No duplicate JSON-LD @types per page**
    - **Property 12: Service schema includes required fields and target cities**
    - **Property 13: FAQPage schema items match rendered FAQ accordion items**
    - For P11: generate page scenarios with multiple schemas; verify @type uniqueness
    - For P12: generate arbitrary Service schema objects; verify required fields and `areaServed` inclusions
    - For P13: generate arbitrary FAQ arrays; verify schema item count and text match
    - **Validates: Requirements 5.5, 6.1, 6.4, 6.2**

- [x] 8. Checkpoint — Schema_Injector integration
  - Ensure all tests pass; validate homepage and one service page against Google Rich Results Test (or schema.org validator) to confirm zero errors for Organization, LocalBusiness, FAQPage, and Service types. Ask the user if questions arise.

- [x] 9. Build city landing page infrastructure
  - [x] 9.1 Implement `src/lib/cityPageData.ts` — content registry
    - Define the `CityPageData` interface (fields: `serviceSlug`, `serviceName`, `city`, `citySlug`, `seoConfig`, `intro`, `whyChooseContent`, `localChallenges`, `processContent`, `faq`, `parentServiceHref`)
    - Populate all 21 entries (7 services × 3 cities: Delhi, Mumbai, Bangalore) with unique content for each section
    - Each entry's combined text fields (`intro` + `whyChooseContent` + `localChallenges` + `processContent` + FAQ answers) must total ≥ 800 words when rendered
    - No two entries may share more than 30% Jaccard trigram similarity in their combined body text
    - _Requirements: 7.1, 7.2, 7.4, 7.10_

  - [x] 9.2 Implement `src/pages/services/CityLandingPage.tsx` — template component
    - Accept `{ data: CityPageData }` prop
    - Render: `<SEO config={data.seoConfig} />`, `<SchemaInjector>` with a city-specific `Service` schema where `areaServed` includes the specific city plus the five primary cities
    - Render sections: hero/intro, why-choose (city-specific), local challenges, process, FAQ accordion, internal links to parent service page and `/contact`
    - Render a 404-equivalent and log an error if `data` is undefined
    - _Requirements: 7.1, 7.5, 7.7, 7.9_

  - [x] 9.3 Write property tests for city landing page content
    - **Property 14: City page body text ≥ 800 words and pairwise similarity < 30%**
    - For each city page entry: count words in combined body content and assert ≥ 800
    - For each pair of city page entries: compute Jaccard trigram similarity and assert < 0.30
    - **Validates: Requirements 7.2, 7.4**

  - [x] 9.4 Add 21 city landing page routes to `src/App.tsx`
    - Import `CityLandingPage` and add one `<Route>` per entry in `cityPages` following the pattern `/services/{serviceSlug}-{citySlug}`
    - Pass the matching `cityPages[slug]` data object as a prop
    - _Requirements: 7.6_

- [x] 10. Checkpoint — City landing pages
  - Ensure all tests pass; verify at least three city landing pages render correctly in the browser with unique titles, correct canonical tags, Service JSON-LD with city-specific `areaServed`, and at least two internal links. Ask the user if questions arise.

- [x] 11. Build-time sitemap generator
  - [x] 11.1 Create `scripts/generate-sitemap.ts`
    - Node.js script that imports `CORE_ROUTES`, `SERVICE_SLUGS`, and `CITY_COMBINATIONS` from `routeManifest.ts`
    - Produces `public/sitemap.xml` with correct `<loc>`, `<lastmod>` (current date), `<changefreq>`, and `<priority>` values per the priority table in the design
    - Exits with non-zero status code if any route cannot be resolved (causes Netlify build to fail)
    - _Requirements: 1.2, 7.8_

  - [x] 11.2 Add `generate:sitemap` script to `package.json` and update Netlify build command
    - Add `"generate:sitemap": "tsx scripts/generate-sitemap.ts"` to `package.json` scripts
    - Update `netlify.toml` build command to `npm run generate:sitemap && npm run build`
    - Install `tsx@^4.19.2` as a dev dependency for running TypeScript scripts in Node
    - _Requirements: 1.2, 1.3_

  - [x] 11.3 Write unit tests for sitemap generator
    - Verify sitemap output includes all 49 expected URLs (6 core + 22 service + 21 city)
    - Verify each entry has `loc`, `lastmod`, `changefreq`, and `priority`
    - Verify city landing page entries have `priority="0.8"` and `changefreq="monthly"`
    - _Requirements: 1.2, 7.8_

- [x] 12. Implement robots.txt and redirects validation script
  - [x] 12.1 Create `scripts/validate-static-files.ts`
    - Check that `public/robots.txt` contains a `Sitemap:` directive pointing to `https://ecommittra.com/sitemap.xml` (Req 1.1)
    - Check that `public/robots.txt` has no `Disallow` rules blocking `.js`, `.css`, or image file extensions (Req 12.7)
    - Check that `public/_redirects` contains no rule redirecting traffic away from the canonical domain (Req 9.6)
    - Exit with non-zero status on any failure; print a human-readable error message
    - _Requirements: 1.1, 9.6, 12.7_

  - [x] 12.2 Add `validate:static` script to `package.json` and integrate into Netlify build
    - Add `"validate:static": "tsx scripts/validate-static-files.ts"` to `package.json` scripts
    - Update `netlify.toml` build command to `npm run validate:static && npm run generate:sitemap && npm run build`
    - _Requirements: 1.1, 9.6_

- [x] 13. Implement content audit scripts
  - [x] 13.1 Create `scripts/audit-headings.ts`
    - Parse all service page components in `src/pages/services/` and `CityLandingPage.tsx` for JSX heading elements
    - Report any page missing exactly one `<h1>`, any page where a `<h3>` or deeper appears before the first `<h2>`, any `<h1>` not containing the page's `primaryKeyword`
    - Add `"audit:headings": "tsx scripts/audit-headings.ts"` to `package.json`
    - _Requirements: 4.1, 4.2, 4.3_

  - [x] 13.2 Create `scripts/audit-images.ts`
    - Parse all TSX source files in `src/` for `<img>` elements
    - Report any `<img>` missing `alt`, `width`, `height`, or `loading` attributes
    - Report any `<img>` whose `alt` text matches the page `<title>` verbatim
    - Add `"audit:images": "tsx scripts/audit-images.ts"` to `package.json`
    - _Requirements: 2.4, 2.5, 4.4, 4.5_

  - [x] 13.3 Create `scripts/audit-links.ts`
    - Parse all service page components for internal `<a href="...">` elements
    - Report any service page or city landing page with fewer than two internal links
    - For city landing pages, verify at least one link points to the parent service slug and at least one points to `/contact`
    - Add `"audit:links": "tsx scripts/audit-links.ts"` to `package.json`
    - _Requirements: 4.6, 7.9_

  - [x] 13.4 Add a combined `audit:seo` script to `package.json`
    - `"audit:seo": "npm run audit:headings && npm run audit:images && npm run audit:links"`
    - _Requirements: 4.1–4.6, 7.9_

- [x] 14. Update `src/components/Footer.tsx` with NAP microdata
  - Wrap the contact address block with `itemScope itemType="https://schema.org/LocalBusiness"` on the enclosing element
  - Add `itemProp` attributes: `name` on the brand name element, `telephone` on each phone link, `email` on the email link, `address` (nested `PostalAddress` itemscope) on the address span
  - Import and use `NAP` from `src/lib/constants.ts` for all contact values to ensure single source of truth
  - _Requirements: 8.1_

- [x] 15. Final checkpoint — full integration
  - Ensure all tests pass (`npm run audit:seo` exits 0, all Vitest tests green)
  - Run `npm run generate:sitemap` and verify the generated `public/sitemap.xml` lists all 49 URLs
  - Run `npm run validate:static` and verify it exits 0
  - Confirm the Netlify build command sequence executes without errors
  - Ask the user if questions arise.

---

## Notes

- Tasks marked with `*` are optional and can be skipped for a faster MVP; they validate correctness properties from the design document
- Property-based tests use `fast-check` (installed in Task 1) and are co-located in `src/seo/__tests__/`
- Unit tests and audit scripts also live in `src/seo/__tests__/` and `scripts/` respectively
- All 15 correctness properties from the design are covered by property test sub-tasks: P1 (5.3), P2 (3.5), P3–P6 (4.4), P7–P8 (heading tests in 4.4 and 7.4 via audit script), P9 (13.2), P10 (13.3), P11–P13 (7.4), P14 (9.3), P15 (3.2)
- The `NAP` constant in `constants.ts` contains `// TODO: confirm with ops` placeholders for `streetAddress` and `postalCode`; these must be filled in before the Schema_Injector deploys live structured data
- Requirements 8.2–8.6, 9.1–9.3, 10.1–10.6, and 11.1–11.8 (GBP listing management, directory registrations, backlink strategy, domain acquisition, GSC setup) are operational tasks that cannot be performed by a coding agent and are therefore excluded from this task list
