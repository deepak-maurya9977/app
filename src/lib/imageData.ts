export type ImageFamily =
  | 'marketplace-amazon'
  | 'marketplace-flipkart'
  | 'marketplace-meesho'
  | 'marketplace-jiomart'
  | 'creative'
  | 'operations'
  | 'marketing'
  | 'web'
  | 'hero'
  | 'gallery'
  | 'team'
  | 'icon';

export interface ImageMetadata {
  slug: string;
  src: string;
  alt: string;
  aspectRatio: number;
  family: ImageFamily;
  tags?: string[];
}

export const IMAGE_DATA: Record<string, ImageMetadata> = {
  homepage: {
    slug: 'homepage',
    src: '/images/hero/marketplace-hero.svg',
    alt: 'Indian SME seller dashboard mockup showing multi-marketplace operations across Amazon, Flipkart, Meesho and JioMart',
    aspectRatio: 16 / 9,
    family: 'marketplace-amazon',
  },
  about: {
    slug: 'about',
    src: '/images/hero/team-placeholder.svg',
    alt: 'Placeholder team and office image for eCommittra, replace with real photo',
    aspectRatio: 4 / 3,
    family: 'team',
    tags: ['placeholder', 'team'],
  },
  career: {
    slug: 'career',
    src: '/images/hero/team-placeholder.svg',
    alt: 'Placeholder company culture image for career page, replace with real team photo',
    aspectRatio: 4 / 3,
    family: 'team',
    tags: ['placeholder', 'culture'],
  },
  gallery: {
    slug: 'gallery',
    src: '/images/gallery/gallery-placeholder.svg',
    alt: 'Gallery placeholder showing sample marketplace and product visuals',
    aspectRatio: 4 / 3,
    family: 'gallery',
  },
  contact: {
    slug: 'contact',
    src: '/images/hero/team-placeholder.svg',
    alt: 'Placeholder location image for contact page, replace with real business location or map photo',
    aspectRatio: 4 / 3,
    family: 'team',
    tags: ['placeholder', 'contact'],
  },

  'amazon-account-launch': {
    slug: 'amazon-account-launch',
    src: '/images/hero/marketplace-hero.svg',
    alt: 'Amazon seller account launch dashboard mockup showing new account setup progress',
    aspectRatio: 16 / 9,
    family: 'marketplace-amazon',
  },
  'amazon-account-management': {
    slug: 'amazon-account-management',
    src: '/images/hero/marketplace-hero.svg',
    alt: 'Amazon account management dashboard mockup displaying account health and performance metrics',
    aspectRatio: 16 / 9,
    family: 'marketplace-amazon',
  },
  'amazon-advertisement': {
    slug: 'amazon-advertisement',
    src: '/images/hero/marketplace-hero.svg',
    alt: 'Amazon advertisement campaign dashboard mockup showing PPC performance and ROAS metrics',
    aspectRatio: 16 / 9,
    family: 'marketplace-amazon',
  },
  'flipkart-account-launch': {
    slug: 'flipkart-account-launch',
    src: '/images/hero/marketplace-hero.svg',
    alt: 'Flipkart seller account launch dashboard mockup showing account activation and product setup',
    aspectRatio: 16 / 9,
    family: 'marketplace-flipkart',
  },
  'flipkart-account-management': {
    slug: 'flipkart-account-management',
    src: '/images/hero/marketplace-hero.svg',
    alt: 'Flipkart account management dashboard mockup displaying catalog and order performance',
    aspectRatio: 16 / 9,
    family: 'marketplace-flipkart',
  },
  'flipkart-advertisement': {
    slug: 'flipkart-advertisement',
    src: '/images/hero/marketplace-hero.svg',
    alt: 'Flipkart advertisement dashboard mockup showing ad spend, clicks, and conversions',
    aspectRatio: 16 / 9,
    family: 'marketplace-flipkart',
  },
  'meesho-account-launch': {
    slug: 'meesho-account-launch',
    src: '/images/hero/marketplace-hero.svg',
    alt: 'Meesho account launch dashboard mockup showing new seller onboarding and catalog setup',
    aspectRatio: 16 / 9,
    family: 'marketplace-meesho',
  },
  'meesho-account-management': {
    slug: 'meesho-account-management',
    src: '/images/hero/marketplace-hero.svg',
    alt: 'Meesho account management dashboard mockup showing reseller orders and growth metrics',
    aspectRatio: 16 / 9,
    family: 'marketplace-meesho',
  },
  'meesho-advertisement': {
    slug: 'meesho-advertisement',
    src: '/images/hero/marketplace-hero.svg',
    alt: 'Meesho advertisement dashboard mockup showing paid campaign performance and key metrics',
    aspectRatio: 16 / 9,
    family: 'marketplace-meesho',
  },
  'jiomart-account-launch': {
    slug: 'jiomart-account-launch',
    src: '/images/hero/marketplace-hero.svg',
    alt: 'JioMart account launch dashboard mockup showing seller onboarding and product setup progress',
    aspectRatio: 16 / 9,
    family: 'marketplace-jiomart',
  },
  'jiomart-account-management': {
    slug: 'jiomart-account-management',
    src: '/images/hero/marketplace-hero.svg',
    alt: 'JioMart account management dashboard mockup showing catalog performance and order insights',
    aspectRatio: 16 / 9,
    family: 'marketplace-jiomart',
  },
  'jiomart-advertisement': {
    slug: 'jiomart-advertisement',
    src: '/images/hero/marketplace-hero.svg',
    alt: 'JioMart advertisement dashboard mockup showing ad visibility and conversions',
    aspectRatio: 16 / 9,
    family: 'marketplace-jiomart',
  },
  'brand-logo-design': {
    slug: 'brand-logo-design',
    src: '/images/hero/creative-hero.svg',
    alt: 'Creative design mockup for brand logo design and identity development',
    aspectRatio: 16 / 9,
    family: 'creative',
  },
  'brand-store': {
    slug: 'brand-store',
    src: '/images/hero/creative-hero.svg',
    alt: 'Creative brand store design mockup showing online storefront experience',
    aspectRatio: 16 / 9,
    family: 'creative',
  },
  'enhance-brand-content': {
    slug: 'enhance-brand-content',
    src: '/images/hero/creative-hero.svg',
    alt: 'Creative product content mockup for enhanced brand content and A+ listing visuals',
    aspectRatio: 16 / 9,
    family: 'creative',
  },
  'product-photography': {
    slug: 'product-photography',
    src: '/images/hero/creative-hero.svg',
    alt: 'Creative product photography mockup showing premium product visuals and staging',
    aspectRatio: 16 / 9,
    family: 'creative',
  },
  'accounting-taxation': {
    slug: 'accounting-taxation',
    src: '/images/hero/operations-hero.svg',
    alt: 'Operations dashboard mockup for accounting and taxation services showing compliance metrics',
    aspectRatio: 16 / 9,
    family: 'operations',
  },
  'warehouse-facility': {
    slug: 'warehouse-facility',
    src: '/images/hero/operations-hero.svg',
    alt: 'Operations dashboard mockup for warehouse and fulfillment coordination',
    aspectRatio: 16 / 9,
    family: 'operations',
  },
  'seller-reinstatement': {
    slug: 'seller-reinstatement',
    src: '/images/hero/operations-hero.svg',
    alt: 'Operations dashboard mockup for seller account reinstatement and policy compliance',
    aspectRatio: 16 / 9,
    family: 'operations',
  },
  'listing-cataloging': {
    slug: 'listing-cataloging',
    src: '/images/hero/operations-hero.svg',
    alt: 'Operations dashboard mockup for listing and cataloging services across marketplaces',
    aspectRatio: 16 / 9,
    family: 'operations',
  },
  'digital-marketing': {
    slug: 'digital-marketing',
    src: '/images/hero/web-hero.svg',
    alt: 'Digital marketing mockup showing campaign analytics, audience reach, and conversion insights',
    aspectRatio: 16 / 9,
    family: 'marketing',
  },
  'website-development': {
    slug: 'website-development',
    src: '/images/hero/web-hero.svg',
    alt: 'Website development mockup for fast responsive eCommerce website design',
    aspectRatio: 16 / 9,
    family: 'web',
  },
};
