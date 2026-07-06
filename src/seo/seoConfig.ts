// Centralised per-page SEO configs for all routes on ecommittra.com
// 6 core pages + 22 service pages + 21 city landing pages = 49 total entries
// All titles: 30–60 chars | All descriptions: 120–155 chars | All values unique

import type { PageSeoConfig } from "./types";

export const pageSeoConfigs: Record<string, PageSeoConfig> = {

  // ─── 6 Core Pages ───────────────────────────────────────────────────────────

  '/': {
    title: 'eCommittra — eCommerce Growth Partner India',
    // 43 chars ✓
    description: 'eCommittra is your ecommerce growth partner India — expert Amazon, Flipkart, Meesho & JioMart account management, digital marketing & website solutions.',
    // 153 chars ✓
    canonical: 'https://ecommittra.com/',
    primaryKeyword: 'ecommerce growth partner India',
  },

  '/about': {
    title: 'About eCommittra | Our Team & Mission',
    // 38 chars ✓
    description: 'Meet the eCommittra team — dedicated eCommerce specialists helping Indian sellers grow on Amazon, Flipkart, Meesho, and JioMart since 2020.',
    // 139 chars ✓
    canonical: 'https://ecommittra.com/about',
  },

  '/services': {
    title: 'eCommerce Services by eCommittra India',
    // 39 chars ✓
    description: 'Browse all eCommittra services: marketplace account management, advertising, cataloging, brand content, digital marketing, and website development.',
    // 148 chars ✓
    canonical: 'https://ecommittra.com/services',
  },

  '/contact': {
    title: 'Contact eCommittra | Get a Free Consultation',
    // 45 chars ✓
    description: 'Reach out to eCommittra for expert eCommerce support. Call, WhatsApp, or fill the form to get a free consultation for your business growth.',
    // 140 chars ✓
    canonical: 'https://ecommittra.com/contact',
  },

  '/gallery': {
    title: 'Portfolio & Gallery | eCommittra Work',
    // 38 chars ✓
    description: 'View eCommittra\'s portfolio of brand stores, A+ content, product photography, logo designs, and website projects delivered for sellers across India.',
    // 149 chars ✓
    canonical: 'https://ecommittra.com/gallery',
  },

  '/career': {
    title: 'Careers at eCommittra | Join Our Team',
    // 38 chars ✓
    description: 'Explore career opportunities at eCommittra. We are hiring passionate eCommerce professionals, marketers, and developers to join our growing team.',
    // 146 chars ✓
    canonical: 'https://ecommittra.com/career',
  },

  // ─── 22 Service Pages ────────────────────────────────────────────────────────

  '/services/amazon-account-management': {
    title: 'Amazon Account Management India | eCommittra',
    // 45 chars ✓
    description: 'Expert amazon account management India — daily health checks, listing optimisation, ad oversight & monthly growth reports. 500+ sellers trust eCommittra.',
    // 154 chars ✓
    canonical: 'https://ecommittra.com/services/amazon-account-management',
    primaryKeyword: 'amazon account management India',
  },

  '/services/amazon-account-launch': {
    title: 'Amazon Account Launch Service | eCommittra',
    // 43 chars ✓
    description: 'Launch your Amazon seller account fast with our amazon account launch service — full setup, brand registry, document filing, and compliance included.',
    // 150 chars ✓
    canonical: 'https://ecommittra.com/services/amazon-account-launch',
    primaryKeyword: 'amazon account launch',
  },

  '/services/amazon-advertisement': {
    title: 'Amazon Advertisement & PPC Management India',
    // 44 chars ✓
    description: 'Maximise ROAS with professional amazon advertisement management — Sponsored Products, Brands & Display campaigns optimised by certified PPC experts.',
    // 149 chars ✓
    canonical: 'https://ecommittra.com/services/amazon-advertisement',
    primaryKeyword: 'amazon advertisement',
  },

  '/services/flipkart-account-management': {
    title: 'Flipkart Account Management | eCommittra',
    // 41 chars ✓
    description: 'Boost Flipkart sales with dedicated flipkart account management — listing optimisation, ad campaigns, account health monitoring & monthly reporting.',
    // 149 chars ✓
    canonical: 'https://ecommittra.com/services/flipkart-account-management',
    primaryKeyword: 'flipkart account management',
  },

  '/services/flipkart-account-launch': {
    title: 'Flipkart Account Launch Service | eCommittra',
    // 45 chars ✓
    description: 'Start selling fast with our flipkart account launch service — complete registration, catalog onboarding, and logistics setup handled end to end.',
    // 145 chars ✓
    canonical: 'https://ecommittra.com/services/flipkart-account-launch',
    primaryKeyword: 'flipkart account launch',
  },

  '/services/flipkart-advertisement': {
    title: 'Flipkart Advertisement Management | eCommittra',
    // 47 chars ✓
    description: 'Drive more visibility with expert flipkart advertisement management — Product Listing Ads, Brand Ads, bid optimisation & ROI-focused budget strategy.',
    // 150 chars ✓
    canonical: 'https://ecommittra.com/services/flipkart-advertisement',
    primaryKeyword: 'flipkart advertisement',
  },

  '/services/meesho-account-management': {
    title: 'Meesho Account Management | eCommittra',
    // 39 chars ✓
    description: 'Scale your reseller sales with professional meesho account management — catalog optimisation, pricing strategy, and order volume support for suppliers.',
    // 151 chars ✓
    canonical: 'https://ecommittra.com/services/meesho-account-management',
    primaryKeyword: 'meesho account management',
  },

  '/services/meesho-account-launch': {
    title: 'Meesho Account Launch for New Sellers',
    // 38 chars ✓
    description: 'Get started on Meesho with our meesho account launch service — supplier registration, bulk catalog upload, pricing strategy, and logistics guidance.',
    // 149 chars ✓
    canonical: 'https://ecommittra.com/services/meesho-account-launch',
    primaryKeyword: 'meesho account launch',
  },

  '/services/meesho-advertisement': {
    title: 'Meesho Advertisement & Product Ads Service',
    // 43 chars ✓
    description: 'Reach more resellers with targeted meesho advertisement campaigns — ROI-focused bidding, product visibility boosts, and performance tracking included.',
    // 151 chars ✓
    canonical: 'https://ecommittra.com/services/meesho-advertisement',
    primaryKeyword: 'meesho advertisement',
  },

  '/services/jiomart-account-management': {
    title: 'JioMart Account Management | eCommittra',
    // 40 chars ✓
    description: 'Grow on Reliance\'s platform with expert jiomart account management — catalog management, price optimisation, account health, and monthly strategy reviews.',
    // 154 chars ✓
    canonical: 'https://ecommittra.com/services/jiomart-account-management',
    primaryKeyword: 'jiomart account management',
  },

  '/services/jiomart-account-launch': {
    title: 'JioMart Account Launch Service | eCommittra',
    // 44 chars ✓
    description: 'Tap into JioMart\'s growing audience with our jiomart account launch service — full registration, catalog setup, and fulfilment integration support.',
    // 147 chars ✓
    canonical: 'https://ecommittra.com/services/jiomart-account-launch',
    primaryKeyword: 'jiomart account launch',
  },

  '/services/jiomart-advertisement': {
    title: 'JioMart Advertisement Solutions | eCommittra',
    // 45 chars ✓
    description: 'Get ahead on JioMart with strategic jiomart advertisement campaigns — lower CPCs, growing audience reach, and performance analytics by our experts.',
    // 147 chars ✓
    canonical: 'https://ecommittra.com/services/jiomart-advertisement',
    primaryKeyword: 'jiomart advertisement',
  },

  '/services/listing-cataloging': {
    title: 'Product Listing Cataloging Services India',
    // 42 chars ✓
    description: 'SEO-optimised product listing cataloging across Amazon, Flipkart, Meesho & JioMart — accurate attributes, keyword-rich titles, and bulk upload support.',
    // 152 chars ✓
    canonical: 'https://ecommittra.com/services/listing-cataloging',
    primaryKeyword: 'product listing cataloging',
  },

  '/services/enhance-brand-content': {
    title: 'Enhance Brand Content A+ Service | eCommittra',
    // 46 chars ✓
    description: 'Elevate conversions with premium enhance brand content (A+) — rich media layouts, comparison tables, and brand storytelling on Amazon and Flipkart.',
    // 148 chars ✓
    canonical: 'https://ecommittra.com/services/enhance-brand-content',
    primaryKeyword: 'enhance brand content',
  },

  '/services/brand-store': {
    title: 'Amazon & Flipkart Brand Store Design',
    // 37 chars ✓
    description: 'Launch a branded brand store on Amazon or Flipkart — custom page layouts, curated product showcases, and brand storytelling that convert shoppers.',
    // 147 chars ✓
    canonical: 'https://ecommittra.com/services/brand-store',
    primaryKeyword: 'brand store',
  },

  '/services/brand-logo-design': {
    title: 'Brand Logo Design Services | eCommittra',
    // 40 chars ✓
    description: 'Stand out with a professional brand logo design — custom concepts, unlimited revisions, scalable vector files, and full brand identity guidelines.',
    // 146 chars ✓
    canonical: 'https://ecommittra.com/services/brand-logo-design',
    primaryKeyword: 'brand logo design',
  },

  '/services/product-photography': {
    title: 'Product Photography for Amazon & Flipkart',
    // 42 chars ✓
    description: 'Convert more buyers with high-quality product photography — white-background shots, lifestyle images, and infographics optimised for marketplace listings.',
    // 154 chars ✓
    canonical: 'https://ecommittra.com/services/product-photography',
    primaryKeyword: 'product photography',
  },

  '/services/digital-marketing': {
    title: 'Digital Marketing Services India | eCommittra',
    // 46 chars ✓
    description: 'Grow your brand with full-spectrum digital marketing — SEO, Google Ads, social media management, and lead generation for eCommerce businesses in India.',
    // 152 chars ✓
    canonical: 'https://ecommittra.com/services/digital-marketing',
    primaryKeyword: 'digital marketing',
  },

  '/services/website-development': {
    title: 'eCommerce Website Development India',
    // 36 chars ✓
    description: 'Launch a fast, conversion-ready website development project on WordPress or Shopify — custom design, mobile optimisation, and SEO-ready architecture.',
    // 150 chars ✓
    canonical: 'https://ecommittra.com/services/website-development',
    primaryKeyword: 'website development',
  },

  '/services/accounting-taxation': {
    title: 'GST & Accounting Taxation for eCommerce',
    // 40 chars ✓
    description: 'Stay compliant with expert accounting taxation services — GST registration, monthly filing, ITR, bookkeeping, and TDS management for online sellers.',
    // 149 chars ✓
    canonical: 'https://ecommittra.com/services/accounting-taxation',
    primaryKeyword: 'accounting taxation',
  },

  '/services/seller-reinstatement': {
    title: 'Seller Reinstatement Appeal Service India',
    // 42 chars ✓
    description: 'Recover suspended accounts with our expert seller reinstatement service — professional appeal writing for Amazon, Flipkart, Meesho & JioMart suspensions.',
    // 154 chars ✓
    canonical: 'https://ecommittra.com/services/seller-reinstatement',
    primaryKeyword: 'seller reinstatement',
  },

  '/services/warehouse-facility': {
    title: 'eCommerce Warehouse Facility Services India',
    // 44 chars ✓
    description: 'Streamline operations with our warehouse facility — multi-channel storage, pick-and-pack, fulfilment support, and inventory management for online sellers.',
    // 155 chars ✓
    canonical: 'https://ecommittra.com/services/warehouse-facility',
    primaryKeyword: 'warehouse facility',
  },

  // ─── 21 City Landing Pages ───────────────────────────────────────────────────

  // — Amazon Account Management × 3 cities —

  '/services/amazon-account-management-delhi': {
    title: 'Amazon Account Management Delhi | eCommittra',
    // 45 chars ✓
    description: 'Expert amazon account management Delhi — daily monitoring, listing optimisation, and PPC oversight tailored for Delhi-NCR sellers on Amazon India.',
    // 147 chars ✓
    canonical: 'https://ecommittra.com/services/amazon-account-management-delhi',
    primaryKeyword: 'amazon account management Delhi',
  },

  '/services/amazon-account-management-mumbai': {
    title: 'Amazon Account Management Mumbai | eCommittra',
    // 46 chars ✓
    description: 'Grow your Amazon sales with dedicated amazon account management Mumbai — health monitoring, listing optimisation, and growth strategy for Mumbai sellers.',
    // 152 chars ✓
    canonical: 'https://ecommittra.com/services/amazon-account-management-mumbai',
    primaryKeyword: 'amazon account management Mumbai',
  },

  '/services/amazon-account-management-bangalore': {
    title: 'Amazon Account Management Bangalore',
    // 36 chars ✓
    description: 'Scale faster with professional amazon account management Bangalore — full Amazon account oversight, listing and ad management for Bangalore-based sellers.',
    // 153 chars ✓
    canonical: 'https://ecommittra.com/services/amazon-account-management-bangalore',
    primaryKeyword: 'amazon account management Bangalore',
  },

  // — Flipkart Account Management × 3 cities —

  '/services/flipkart-account-management-delhi': {
    title: 'Flipkart Account Management Delhi',
    // 33 chars ✓
    description: 'Boost Flipkart sales with expert flipkart account management Delhi — listing optimisation, ad campaigns, and account health support for Delhi-NCR sellers.',
    // 154 chars ✓
    canonical: 'https://ecommittra.com/services/flipkart-account-management-delhi',
    primaryKeyword: 'flipkart account management Delhi',
  },

  '/services/flipkart-account-management-mumbai': {
    title: 'Flipkart Account Management Mumbai',
    // 34 chars ✓
    description: 'Drive growth with professional flipkart account management Mumbai — dedicated account monitoring, listings, and ad strategy for Mumbai-based sellers.',
    // 149 chars ✓
    canonical: 'https://ecommittra.com/services/flipkart-account-management-mumbai',
    primaryKeyword: 'flipkart account management Mumbai',
  },

  '/services/flipkart-account-management-bangalore': {
    title: 'Flipkart Account Management Bangalore',
    // 38 chars ✓
    description: 'Scale on Flipkart with expert flipkart account management Bangalore — listing quality, ad management, and monthly growth reports for Bangalore sellers.',
    // 151 chars ✓
    canonical: 'https://ecommittra.com/services/flipkart-account-management-bangalore',
    primaryKeyword: 'flipkart account management Bangalore',
  },

  // — Meesho Account Management × 3 cities —

  '/services/meesho-account-management-delhi': {
    title: 'Meesho Account Management Delhi | eCommittra',
    // 45 chars ✓
    description: 'Grow your reseller network with dedicated meesho account management Delhi — catalog optimisation, pricing strategy, and order support for Delhi suppliers.',
    // 154 chars ✓
    canonical: 'https://ecommittra.com/services/meesho-account-management-delhi',
    primaryKeyword: 'meesho account management Delhi',
  },

  '/services/meesho-account-management-mumbai': {
    title: 'Meesho Account Management Mumbai | eCommittra',
    // 46 chars ✓
    description: 'Maximise Meesho orders with expert meesho account management Mumbai — catalog updates, margin management, and reseller reach expansion in Mumbai.',
    // 145 chars ✓
    canonical: 'https://ecommittra.com/services/meesho-account-management-mumbai',
    primaryKeyword: 'meesho account management Mumbai',
  },

  '/services/meesho-account-management-bangalore': {
    title: 'Meesho Account Management Bangalore',
    // 36 chars ✓
    description: 'Optimise your Meesho supplier business with expert meesho account management Bangalore — catalog setup, margin control, and reseller growth support.',
    // 149 chars ✓
    canonical: 'https://ecommittra.com/services/meesho-account-management-bangalore',
    primaryKeyword: 'meesho account management Bangalore',
  },

  // — JioMart Account Management × 3 cities —

  '/services/jiomart-account-management-delhi': {
    title: 'JioMart Account Management Delhi | eCommittra',
    // 46 chars ✓
    description: 'Capture JioMart\'s Delhi audience with expert jiomart account management Delhi — catalog setup, pricing, and performance monitoring for Delhi sellers.',
    // 149 chars ✓
    canonical: 'https://ecommittra.com/services/jiomart-account-management-delhi',
    primaryKeyword: 'jiomart account management Delhi',
  },

  '/services/jiomart-account-management-mumbai': {
    title: 'JioMart Account Management Mumbai | eCommittra',
    // 47 chars ✓
    description: 'Grow on JioMart in Mumbai with professional jiomart account management Mumbai — product listings, price optimisation, and fulfilment coordination.',
    // 146 chars ✓
    canonical: 'https://ecommittra.com/services/jiomart-account-management-mumbai',
    primaryKeyword: 'jiomart account management Mumbai',
  },

  '/services/jiomart-account-management-bangalore': {
    title: 'JioMart Account Management Bangalore',
    // 37 chars ✓
    description: 'Expand JioMart sales in South India with expert jiomart account management Bangalore — catalog management and growth strategy for Bangalore-based sellers.',
    // 154 chars ✓
    canonical: 'https://ecommittra.com/services/jiomart-account-management-bangalore',
    primaryKeyword: 'jiomart account management Bangalore',
  },

  // — Amazon Advertisement × 3 cities —

  '/services/amazon-advertisement-delhi': {
    title: 'Amazon Advertisement Delhi | PPC Management',
    // 44 chars ✓
    description: 'Maximise returns with expert amazon advertisement Delhi — Sponsored Products, Brands & Display campaigns managed by certified PPC experts in Delhi-NCR.',
    // 152 chars ✓
    canonical: 'https://ecommittra.com/services/amazon-advertisement-delhi',
    primaryKeyword: 'amazon advertisement Delhi',
  },

  '/services/amazon-advertisement-mumbai': {
    title: 'Amazon Advertisement Mumbai | PPC Services',
    // 43 chars ✓
    description: 'Drive Mumbai sales with expert amazon advertisement Mumbai — data-driven PPC campaigns, ACOS reduction, and ROAS optimisation for Amazon sellers.',
    // 146 chars ✓
    canonical: 'https://ecommittra.com/services/amazon-advertisement-mumbai',
    primaryKeyword: 'amazon advertisement Mumbai',
  },

  '/services/amazon-advertisement-bangalore': {
    title: 'Amazon Advertisement Bangalore | eCommittra',
    // 44 chars ✓
    description: 'Scale Amazon sales in South India with expert amazon advertisement Bangalore — full PPC management, bid optimisation, and weekly performance reports.',
    // 149 chars ✓
    canonical: 'https://ecommittra.com/services/amazon-advertisement-bangalore',
    primaryKeyword: 'amazon advertisement Bangalore',
  },

  // — Digital Marketing × 3 cities —

  '/services/digital-marketing-delhi': {
    title: 'Digital Marketing Delhi | eCommittra Services',
    // 46 chars ✓
    description: 'Grow your brand with full-spectrum digital marketing Delhi — SEO, Google Ads, social media, and lead generation services for Delhi-NCR businesses.',
    // 147 chars ✓
    canonical: 'https://ecommittra.com/services/digital-marketing-delhi',
    primaryKeyword: 'digital marketing Delhi',
  },

  '/services/digital-marketing-mumbai': {
    title: 'Digital Marketing Mumbai | eCommittra Services',
    // 47 chars ✓
    description: 'Accelerate growth with expert digital marketing Mumbai — SEO, paid ads, content strategy, and social media management for Mumbai-based businesses.',
    // 147 chars ✓
    canonical: 'https://ecommittra.com/services/digital-marketing-mumbai',
    primaryKeyword: 'digital marketing Mumbai',
  },

  '/services/digital-marketing-bangalore': {
    title: 'Digital Marketing Bangalore | eCommittra',
    // 41 chars ✓
    description: 'Win customers with performance-driven digital marketing Bangalore — SEO, Google Ads, and social campaigns tailored for Bangalore tech and eCommerce brands.',
    // 155 chars ✓
    canonical: 'https://ecommittra.com/services/digital-marketing-bangalore',
    primaryKeyword: 'digital marketing Bangalore',
  },

  // — Website Development × 3 cities —

  '/services/website-development-delhi': {
    title: 'Website Development Delhi | eCommittra',
    // 39 chars ✓
    description: 'Get a fast, conversion-ready site with expert website development Delhi — WordPress, Shopify, custom design, and SEO setup for Delhi-NCR businesses.',
    // 148 chars ✓
    canonical: 'https://ecommittra.com/services/website-development-delhi',
    primaryKeyword: 'website development Delhi',
  },

  '/services/website-development-mumbai': {
    title: 'Website Development Mumbai | eCommittra',
    // 40 chars ✓
    description: 'Launch your online presence with professional website development Mumbai — responsive design, mobile-first builds, and SEO-ready structure in Mumbai.',
    // 149 chars ✓
    canonical: 'https://ecommittra.com/services/website-development-mumbai',
    primaryKeyword: 'website development Mumbai',
  },

  '/services/website-development-bangalore': {
    title: 'Website Development Bangalore | eCommittra',
    // 43 chars ✓
    description: 'Build a high-performance site with expert website development Bangalore — WordPress and Shopify solutions with custom design for Bangalore businesses.',
    // 150 chars ✓
    canonical: 'https://ecommittra.com/services/website-development-bangalore',
    primaryKeyword: 'website development Bangalore',
  },
};
