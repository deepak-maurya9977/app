// Meta_Manager component — injects <title>, <meta>, <link rel="canonical">, OG, and Twitter tags
// Uses react-helmet-async for SPA head management
// Requirements: 3.1, 3.3, 1.6

import type { ReactElement } from 'react';
import { Helmet } from 'react-helmet-async';
import type { PageSeoConfig } from './types';

// Default fallback values used when no config is provided
const DEFAULT_TITLE = 'eCommittra — eCommerce Growth Partner India';
const DEFAULT_DESCRIPTION =
  'eCommittra helps Indian businesses grow on Amazon, Flipkart, Meesho & JioMart with expert account management, digital marketing & website development.';
const DEFAULT_CANONICAL =
  typeof window !== 'undefined' ? window.location.href : 'https://ecommittra.com';

interface SEOProps {
  config?: PageSeoConfig;
}

/**
 * SEO (Meta_Manager) component.
 *
 * Injects into <head>:
 *   - <title>
 *   - <meta name="description">
 *   - <link rel="canonical">
 *   - OpenGraph tags (og:title, og:description, og:url, og:type, og:site_name, og:image if present)
 *   - Twitter Card tags (twitter:card, twitter:title, twitter:description)
 *
 * Falls back to brand defaults when config is missing, and emits a console.warn
 * in development mode.
 */
export function SEO({ config }: SEOProps): ReactElement {
  if (!config) {
    if (import.meta.env.DEV) {
      console.warn(
        '[SEO] No PageSeoConfig provided. Using fallback defaults. ' +
          'Add an entry for this path in src/seo/seoConfig.ts.'
      );
    }
  }

  const title = config?.title ?? DEFAULT_TITLE;
  const description = config?.description ?? DEFAULT_DESCRIPTION;
  const canonical = config?.canonical ?? DEFAULT_CANONICAL;
  const ogImage = config?.ogImage;

  return (
    <Helmet>
      {/* Primary meta */}
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={canonical} />

      {/* OpenGraph */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={canonical} />
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content="eCommittra" />
      {ogImage && <meta property="og:image" content={ogImage} />}

      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
    </Helmet>
  );
}
