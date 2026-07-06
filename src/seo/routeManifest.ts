// Route manifest — single source of truth for all SEO-relevant routes
// Used by sitemap generator and property-based tests

import { servicePages } from '../lib/serviceData';

export const CORE_ROUTES: string[] = [
  '/',
  '/about',
  '/services',
  '/contact',
  '/gallery',
  '/career',
];

export const SERVICE_SLUGS: string[] = Object.keys(servicePages);

export const CITY_COMBINATIONS: Array<{ service: string; cities: string[] }> = [
  { service: 'amazon-account-management',  cities: ['delhi', 'mumbai', 'bangalore'] },
  { service: 'flipkart-account-management', cities: ['delhi', 'mumbai', 'bangalore'] },
  { service: 'meesho-account-management',  cities: ['delhi', 'mumbai', 'bangalore'] },
  { service: 'jiomart-account-management', cities: ['delhi', 'mumbai', 'bangalore'] },
  { service: 'amazon-advertisement',       cities: ['delhi', 'mumbai', 'bangalore'] },
  { service: 'digital-marketing',          cities: ['delhi', 'mumbai', 'bangalore'] },
  { service: 'website-development',        cities: ['delhi', 'mumbai', 'bangalore'] },
];
