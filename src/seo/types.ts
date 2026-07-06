// SEO type definitions for ecommittra.com
// Used by Meta_Manager (SEO.tsx), Schema_Injector (SchemaInjector.tsx), and seoConfig.ts

export interface PageSeoConfig {
  title: string;           // 30–60 chars
  description: string;     // 120–155 chars
  canonical: string;       // full canonical URL, e.g. https://ecommittra.com/services/amazon-account-management
  primaryKeyword?: string; // primary target keyword for service pages
  ogImage?: string;        // optional OG image URL
}

export interface PostalAddressSchema {
  "@type": "PostalAddress";
  streetAddress: string;
  addressLocality: string;
  addressRegion: string;
  postalCode: string;
  addressCountry: "IN";
}

export interface ContactPointSchema {
  "@type": "ContactPoint";
  telephone: string;
  contactType: string;
  availableLanguage: string;
}

export interface OpeningHoursSchema {
  "@type": "OpeningHoursSpecification";
  dayOfWeek: string[];
  opens: string;
  closes: string;
}

export interface OrganizationSchema {
  "@context": "https://schema.org";
  "@type": "Organization";
  name: string;
  url: string;
  logo: string;
  description: string;
  address: PostalAddressSchema;
  contactPoint: ContactPointSchema;
  sameAs: string[];
}

export interface LocalBusinessSchema {
  "@context": "https://schema.org";
  "@type": "LocalBusiness";
  name: string;
  image: string;
  telephone: string;       // format: +91-XXXXXXXXXX
  address: PostalAddressSchema;
  openingHoursSpecification: OpeningHoursSchema;
  priceRange: string;
}

export interface ServiceSchema {
  "@context": "https://schema.org";
  "@type": "Service";
  name: string;
  description: string;
  provider: { "@type": "Organization"; name: string; url: string };
  serviceType: string;
  areaServed: string[];
}

export interface FAQItemSchema {
  "@type": "Question";
  name: string;
  acceptedAnswer: { "@type": "Answer"; text: string };
}

export interface FAQPageSchema {
  "@context": "https://schema.org";
  "@type": "FAQPage";
  mainEntity: FAQItemSchema[];
}

export interface SitemapEntry {
  loc: string;          // full URL
  lastmod: string;      // ISO date YYYY-MM-DD
  changefreq: "always" | "hourly" | "daily" | "weekly" | "monthly" | "yearly" | "never";
  priority: number;     // 0.0–1.0
}

export interface KeywordDensityResult {
  keyword: string;
  occurrences: number;
  totalWords: number;
  densityPercent: number; // occurrences / totalWords * 100
}
