# Requirements Document

## Introduction

This feature covers the end-to-end SEO optimisation of ecommittra.com, an Indian e-commerce enablement agency offering Amazon, Flipkart, Meesho, and JioMart account management, digital marketing, website development, and GST registration services.

The site is a React/TypeScript SPA (Vite + Tailwind + shadcn/ui) deployed on Netlify. The scope spans eight distinct areas: technical SEO, on-page optimisation, structured data, geo-targeted content landing pages, local/brand SEO, backlink strategy, domain protection, and monthly performance reporting.

All work must comply with Google's Webmaster Guidelines. Black-hat tactics (keyword stuffing, hidden text, link farms, cloaking) are explicitly prohibited.

---

## Glossary

- **Site**: The ecommittra.com React/TypeScript website.
- **SEO_Audit_Tool**: The automated tooling (Screaming Frog, Lighthouse, Google Search Console) used to identify technical defects.
- **Meta_Manager**: The React component or Vite plugin responsible for injecting per-page `<title>` and `<meta>` tags into the document `<head>` at render time.
- **Schema_Injector**: The component or utility that embeds JSON-LD structured data blocks into page `<head>` or `<body>` on a per-page basis.
- **City_Landing_Page**: A dedicated service + city combination page (e.g., `/services/amazon-account-management-delhi`) containing at least 800 words of unique, genuinely useful content.
- **GBP**: Google Business Profile for eCommittra.
- **NAP**: Name, Address, Phone — the canonical contact data for eCommittra.
- **GSC**: Google Search Console.
- **Canonical_Domain**: `https://ecommittra.com` — the single authoritative domain for all content.
- **Misspell_Variant**: A 301-redirect source domain representing a common misspelling of ecommittra.com (e.g., ecomittra.com, ecommitra.com, ecommetra.com).
- **CWV**: Core Web Vitals — LCP, INP (formerly FID), and CLS as measured by Google PageSpeed Insights.
- **EARS**: Easy Approach to Requirements Syntax — the pattern set used for all acceptance criteria.
- **White_Hat**: SEO practices compliant with Google's Webmaster Guidelines.

---

## Requirements

### Requirement 1: Technical SEO — Crawlability and Indexability

**User Story:** As an SEO strategist, I want the Site to be fully crawlable and indexable by search engines, so that every page can be discovered and ranked by Google.

#### Acceptance Criteria

1. THE SEO_Audit_Tool SHALL verify that `public/robots.txt` contains a valid `Sitemap:` directive pointing to `https://ecommittra.com/sitemap.xml`.
2. THE SEO_Audit_Tool SHALL verify that `public/sitemap.xml` lists all 28 currently routed pages (6 core + 22 service pages) with correct `<loc>`, `<lastmod>`, `<changefreq>`, and `<priority>` values.
3. WHEN a new route is added to `src/App.tsx`, THE SEO_Audit_Tool SHALL detect that `public/sitemap.xml` does not yet include the new route's URL within 1 business day of deployment.
4. THE SEO_Audit_Tool SHALL confirm that no page returns an HTTP 4xx or 5xx status code when crawled.
5. THE SEO_Audit_Tool SHALL confirm that zero redirect chains longer than one hop exist between any two internal URLs.
6. THE SEO_Audit_Tool SHALL confirm that every page specifies a `<link rel="canonical">` tag pointing to its own Canonical_Domain URL.
7. WHEN a duplicate URL pattern is detected (e.g., trailing slash vs. no trailing slash), THE Meta_Manager SHALL emit a canonical tag resolving to the preferred form.
8. THE SEO_Audit_Tool SHALL confirm that `public/robots.txt` does not block any URL path that is intended to be indexed.

---

### Requirement 2: Technical SEO — Core Web Vitals and Performance

**User Story:** As an SEO strategist, I want the Site to pass Google's Core Web Vitals thresholds, so that page experience signals do not suppress search rankings.

#### Acceptance Criteria

1. THE Site SHALL achieve an LCP score of 2.5 seconds or less on mobile as measured by Google PageSpeed Insights on the homepage.
2. THE Site SHALL achieve a CLS score of 0.1 or less on all pages as measured by Google PageSpeed Insights.
3. THE Site SHALL achieve an INP score of 200 milliseconds or less on all pages as measured by Google PageSpeed Insights.
4. THE Site SHALL serve all images in WebP or AVIF format with explicit `width` and `height` attributes to prevent layout shift.
5. THE Site SHALL include `loading="lazy"` on all images below the fold and `loading="eager"` on all above-the-fold hero images.
6. THE Site SHALL pass Google's Mobile-Friendly Test for every routed page.
7. THE Site SHALL serve all pages over HTTPS with a valid TLS certificate; HTTP requests SHALL be redirected to HTTPS via Netlify configuration.
8. WHEN a Lighthouse audit is run on any service page, THE Site SHALL achieve a Lighthouse Performance score of 80 or above on desktop.

---

### Requirement 3: On-Page SEO — Title Tags and Meta Descriptions

**User Story:** As an SEO strategist, I want every page to have a unique, keyword-rich title tag and meta description, so that search result snippets are compelling and click-through rates improve.

#### Acceptance Criteria

1. THE Meta_Manager SHALL inject a unique `<title>` tag into every page's `<head>` at render time.
2. THE Meta_Manager SHALL ensure every `<title>` tag is between 30 and 60 characters in length.
3. THE Meta_Manager SHALL inject a unique `<meta name="description">` tag into every page's `<head>` at render time.
4. THE Meta_Manager SHALL ensure every meta description is between 120 and 155 characters in length.
5. WHEN a service page is rendered, THE Meta_Manager SHALL include the primary target keyword for that service in both the `<title>` tag and the meta description.
6. THE SEO_Audit_Tool SHALL confirm that no two pages share an identical `<title>` value across the Site.
7. THE SEO_Audit_Tool SHALL confirm that no two pages share an identical `<meta name="description">` value across the Site.
8. WHEN the homepage is rendered, THE Meta_Manager SHALL set the `<title>` to a value that includes "eCommittra" and a primary brand keyword within 60 characters.

---

### Requirement 4: On-Page SEO — Heading Hierarchy and Content Structure

**User Story:** As an SEO strategist, I want every page to have a correct H1/H2 heading hierarchy, so that search engines can understand the page's topic and structure.

#### Acceptance Criteria

1. THE SEO_Audit_Tool SHALL confirm that every routed page contains exactly one `<h1>` element.
2. THE SEO_Audit_Tool SHALL confirm that the `<h1>` on each service page includes the primary target keyword for that service.
3. THE SEO_Audit_Tool SHALL confirm that `<h2>` elements on service pages follow the single `<h1>` without any `<h3>` or deeper heading appearing before an `<h2>`.
4. THE SEO_Audit_Tool SHALL confirm that all body images on service pages carry a non-empty, descriptive `alt` attribute.
5. THE SEO_Audit_Tool SHALL confirm that no `alt` attribute contains the same text as the page `<title>` verbatim (keyword stuffing).
6. THE SEO_Audit_Tool SHALL confirm that each service page contains at least two internal links pointing to other service pages or core site pages.
7. WHEN a service page is rendered, THE Meta_Manager SHALL ensure the primary keyword appears in the first 100 words of visible body text.

---

### Requirement 5: Structured Data — Homepage and Organization

**User Story:** As an SEO strategist, I want the homepage to embed valid Organization and LocalBusiness schema, so that Google can display rich results including business name, address, phone, and hours.

#### Acceptance Criteria

1. THE Schema_Injector SHALL embed an `Organization` JSON-LD block on the homepage that includes `name`, `url`, `logo`, `description`, `address`, `contactPoint`, and `sameAs` properties.
2. THE Schema_Injector SHALL embed a `LocalBusiness` JSON-LD block on the homepage that includes `name`, `image`, `telephone`, `address` (with `streetAddress`, `addressLocality`, `addressRegion`, `postalCode`, and `addressCountry`), `openingHoursSpecification`, and `priceRange` properties.
3. THE Schema_Injector SHALL embed a `FAQPage` JSON-LD block on the homepage that contains every FAQ item displayed in the FAQ section, with matching `name` and `acceptedAnswer` values.
4. WHEN Google's Rich Results Test is run against the homepage, THE Schema_Injector SHALL produce zero validation errors for all three schema types.
5. THE Schema_Injector SHALL not duplicate existing JSON-LD blocks already present in `index.html`; it SHALL replace or extend them.
6. THE Schema_Injector SHALL ensure the `telephone` value in both schema blocks uses the format `+91-XXXXXXXXXX` consistently.

---

### Requirement 6: Structured Data — Service Pages

**User Story:** As an SEO strategist, I want each service page to embed valid Service and FAQPage schema, so that Google can display rich results and understand the service offering.

#### Acceptance Criteria

1. THE Schema_Injector SHALL embed a `Service` JSON-LD block on each of the 22 service pages, including `name`, `description`, `provider` (referencing the Organization), `serviceType`, and `areaServed` properties.
2. THE Schema_Injector SHALL embed a `FAQPage` JSON-LD block on each service page that contains every FAQ item displayed in the `FAQAccordion` component on that page, with matching `name` and `acceptedAnswer` values.
3. WHEN Google's Rich Results Test is run against any service page, THE Schema_Injector SHALL produce zero validation errors for both schema types.
4. THE Schema_Injector SHALL ensure the `areaServed` field in the `Service` schema lists India and at least the top five cities targeted by the City_Landing_Page strategy (Delhi, Mumbai, Bangalore, Hyderabad, Chennai).
5. WHEN a City_Landing_Page is rendered, THE Schema_Injector SHALL inject a `Service` JSON-LD block where `areaServed` includes the specific city for that page.

---

### Requirement 7: City-Targeted Landing Pages

**User Story:** As an SEO strategist, I want dedicated landing pages for each service–city combination, so that eCommittra ranks for high-intent local searches like "Amazon account management Delhi."

#### Acceptance Criteria

1. THE Site SHALL include at least one City_Landing_Page for each of the following services: Amazon account management, Flipkart account management, Meesho account management, JioMart account management, Amazon advertisement, digital marketing, and website development.
2. WHEN a City_Landing_Page is rendered, THE Meta_Manager SHALL ensure it contains at least 800 words of visible body text unique to that service–city combination.
3. THE Meta_Manager SHALL set the `<title>` of each City_Landing_Page to a value that includes both the service name and the city name within 60 characters.
4. THE SEO_Audit_Tool SHALL confirm that no two City_Landing_Pages share more than 30% of their body text content (to prevent duplicate content penalties).
5. WHEN a City_Landing_Page is rendered, THE Meta_Manager SHALL include a `<link rel="canonical">` tag pointing to the City_Landing_Page's own Canonical_Domain URL.
6. THE Site SHALL route City_Landing_Pages at URLs following the pattern `/services/{service-slug}-{city-slug}` (e.g., `/services/amazon-account-management-delhi`).
7. THE Schema_Injector SHALL inject a `Service` JSON-LD block on each City_Landing_Page with `areaServed` set to the specific city for that page.
8. THE Site SHALL add all City_Landing_Page URLs to `public/sitemap.xml` with a `<priority>` of 0.8 and `<changefreq>` of `monthly`.
9. WHEN a City_Landing_Page is rendered, THE Meta_Manager SHALL include at least two internal links: one to the parent service page and one to the `/contact` page.
10. THE initial City_Landing_Page rollout SHALL cover Delhi, Mumbai, and Bangalore for each of the seven services listed in criterion 1, producing a minimum of 21 City_Landing_Pages.

---

### Requirement 8: Local SEO and Brand Consistency (NAP)

**User Story:** As an SEO strategist, I want eCommittra's NAP to be consistent across all online directories, so that Google's local ranking signals are strengthened and searchers find correct contact details.

#### Acceptance Criteria

1. THE Site's Footer component SHALL display the NAP (Name: eCommittra, Address: full street address, Phone: canonical phone number) in a machine-readable format using `itemprop` microdata or JSON-LD.
2. THE GBP listing SHALL include the canonical business name "eCommittra", the canonical phone number, the canonical website URL `https://ecommittra.com`, business category "E-Commerce Service", and at least five service areas covering Delhi, Mumbai, Bangalore, Hyderabad, and Chennai.
3. THE GBP listing SHALL include a complete description of 750 characters or more covering all core services.
4. THE NAP SHALL be registered on JustDial, IndiaMART, and Sulekha with the canonical business name "eCommittra" and identical address and phone values.
5. WHEN a brand variant spelling (e.g., "eComittra", "eCommitra", "E-Committra") is used in a directory that does not allow editing, THE operations team SHALL document the variant in a brand-variants register and disavow associated low-quality links if any appear.
6. THE GBP listing SHALL be updated with at least four posts per month linking to relevant service pages or City_Landing_Pages on the Site.

---

### Requirement 9: Domain Protection and Misspell Redirects

**User Story:** As an SEO strategist, I want common misspelled variants of ecommittra.com to 301-redirect to the Canonical_Domain, so that brand search traffic is not lost and domain authority is consolidated.

#### Acceptance Criteria

1. THE domain portfolio SHALL include at least three Misspell_Variants acquired and pointed to the Canonical_Domain.
2. WHEN a browser requests any URL on a Misspell_Variant domain, THE server SHALL respond with an HTTP 301 status code and a `Location` header set to the corresponding Canonical_Domain URL.
3. THE 301 redirect from each Misspell_Variant SHALL preserve the URL path (e.g., `ecomittra.com/services` SHALL redirect to `https://ecommittra.com/services`).
4. THE SEO_Audit_Tool SHALL verify that the canonical domain `https://ecommittra.com` returns HTTP 200 for the homepage.
5. THE SEO_Audit_Tool SHALL verify that no Misspell_Variant domain is indexed by Google (i.e., each carries a `noindex` or is fully covered by the 301 chain before Google can index content).
6. THE netlify.toml or `public/_redirects` file SHALL not contain any rule that redirects traffic away from the Canonical_Domain to a Misspell_Variant.

---

### Requirement 10: Backlink Strategy (White-Hat Only)

**User Story:** As an SEO strategist, I want a documented white-hat backlink acquisition process, so that eCommittra's domain authority increases without risking manual penalties.

#### Acceptance Criteria

1. THE backlink strategy SHALL include outreach to at least five Indian e-commerce or business-focused blogs for guest post opportunities each quarter.
2. WHEN a guest post or external article is published, THE article SHALL include a contextual link to a relevant service page or City_Landing_Page on the Site using descriptive anchor text.
3. THE backlink strategy SHALL include at least two client case studies published on the Site per quarter, each with client permission documented.
4. WHEN a new backlink is acquired, THE operations team SHALL log the source domain, target URL, anchor text, and acquisition date in a backlink register.
5. THE SEO_Audit_Tool SHALL confirm that no links in the backlink register originate from known link-farm or paid-link domains as flagged by a domain-authority checker (Ahrefs or Moz DR < 10 with no organic traffic).
6. IF a potentially harmful backlink is discovered in the backlink register, THEN THE operations team SHALL submit a Google Disavow file update within 5 business days.

---

### Requirement 11: GSC Reporting and Monthly Tracking

**User Story:** As an SEO strategist, I want monthly performance reports from Google Search Console covering rankings, impressions, clicks, CTR, and position, so that the impact of optimisation work is measurable and decisions are data-driven.

#### Acceptance Criteria

1. THE Site SHALL have GSC ownership verified via either HTML file upload to `public/` or DNS TXT record before any SEO work is deployed.
2. THE Site SHALL have a GSC property configured for the Canonical_Domain `https://ecommittra.com` (HTTPS, non-www preferred).
3. THE operations team SHALL export a GSC Performance report on the first working day of each calendar month covering the previous 28 days and including metrics: Impressions, Clicks, CTR, and Average Position.
4. THE monthly report SHALL include a keyword segment tracking at least 20 target keywords including: "amazon account management India", "flipkart seller account management", "meesho account management", "ecommerce agency India", "amazon account management Delhi", "amazon account management Mumbai", "amazon account management Bangalore", "JioMart account management", "eCommittra", and at least 11 additional brand and service keywords.
5. THE monthly report SHALL include a page-level segment identifying the top 10 pages by clicks and the top 10 pages by impressions.
6. WHEN average position for a tracked keyword increases by more than 5 positions month-over-month, THE report SHALL flag the keyword as a "Mover" for follow-up analysis.
7. WHEN average position for a tracked keyword decreases by more than 5 positions month-over-month, THE report SHALL flag the keyword as a "Decliner" and initiate a content or technical review within 10 business days.
8. THE operations team SHALL monitor GSC Coverage report monthly and resolve any "Excluded" or "Error" URLs within 10 business days of detection.

---

### Requirement 12: White-Hat Compliance and Penalty Avoidance

**User Story:** As an SEO strategist, I want all optimisation activities to comply with Google's Webmaster Guidelines, so that eCommittra does not receive a manual action or algorithmic penalty.

#### Acceptance Criteria

1. THE Site SHALL not contain any hidden text or hidden links (e.g., text in the same colour as the background, or elements with `display:none` used to inflate keyword density).
2. THE Site SHALL not use cloaking — the HTML served to Googlebot SHALL be identical to the HTML served to regular users.
3. THE Site SHALL not participate in link exchange schemes or acquire links from known link farms.
4. WHEN keyword density for any target keyword on a page exceeds 3% of total word count, THE content editor SHALL revise the page to bring density below 3% before publishing.
5. THE Site SHALL not use doorway pages — each City_Landing_Page SHALL provide unique, genuinely useful content rather than serving only as a redirect funnel to the homepage.
6. IF a Google Search Console manual action notification is received, THEN THE operations team SHALL file a reconsideration request within 5 business days of receipt after addressing the cited issue.
7. THE Site's `public/robots.txt` SHALL not include `Disallow` rules that prevent Googlebot from accessing CSS, JavaScript, or image resources required to render any indexed page.
