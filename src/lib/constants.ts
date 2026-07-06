export const NAP = {
  name: 'eCommittra',
  streetAddress: '[full street address TBD by operations team]', // TODO: confirm with ops
  addressLocality: 'Lucknow',
  addressRegion: 'Uttar Pradesh',
  postalCode: '[postal code TBD]', // TODO: confirm with ops
  addressCountry: 'IN' as const,
  telephone: '+91-8821953915',
  telephone2: '+91-7489881387',
  email: 'support@ecommittra.com',
  website: 'https://ecommittra.com',
};

export const BUSINESS = {
  name: "eCommittra",
  tagline: "Your Committed Partner for eCommerce Growth",
  phone1: "+91 8821953915",
  phone2: "+91 7489881387",
  phone1Label: "Rahul Dwivedi (Founder & Owner)",
  phone2Label: "Himanshu Mishra (CEO & Co-Owner)",
  whatsappLink: "https://wa.me/918821953915?text=Hi%20eCommittra%21%20I%20want%20to%20grow%20my%20online%20business.%20Can%20we%20talk%3F",
  email: "support@ecommittra.com",
  address: "India",
  year: "2025",
};

export const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Gallery", href: "/gallery" },
  { label: "Career", href: "/career" },
  { label: "Contact Us", href: "/contact" },
];

export const SOCIAL_LINKS = [
  { label: "Instagram", href: "#", icon: "Instagram" },
  { label: "Facebook", href: "#", icon: "Facebook" },
  { label: "YouTube", href: "#", icon: "Youtube" },
  { label: "LinkedIn", href: "#", icon: "Linkedin" },
];

export const SERVICES_DROPDOWN = {
  accountLaunch: [
    { label: "Amazon Account Launch", href: "/services/amazon-account-launch" },
    { label: "Flipkart Account Launch", href: "/services/flipkart-account-launch" },
    { label: "Meesho Account Launch", href: "/services/meesho-account-launch" },
    { label: "JioMart Account Launch", href: "/services/jiomart-account-launch" },
  ],
  advertisement: [
    { label: "Amazon Advertisement", href: "/services/amazon-advertisement" },
    { label: "Flipkart Advertisement", href: "/services/flipkart-advertisement" },
    { label: "Meesho Advertisement", href: "/services/meesho-advertisement" },
    { label: "JioMart Advertisement", href: "/services/jiomart-advertisement" },
  ],
  management: [
    { label: "Amazon Account Management", href: "/services/amazon-account-management" },
    { label: "Flipkart Account Management", href: "/services/flipkart-account-management" },
    { label: "Meesho Account Management", href: "/services/meesho-account-management" },
    { label: "JioMart Account Management", href: "/services/jiomart-account-management" },
  ],
  moreServices: [
    { label: "Accounting & Taxation", href: "/services/accounting-taxation" },
    { label: "Website Development", href: "/services/website-development" },
    { label: "Brand Store", href: "/services/brand-store" },
    { label: "Brand Logo Design", href: "/services/brand-logo-design" },
    { label: "Listing / Cataloging", href: "/services/listing-cataloging" },
    { label: "Warehouse Facility", href: "/services/warehouse-facility" },
    { label: "Seller Reinstatement", href: "/services/seller-reinstatement" },
    { label: "Product Photography", href: "/services/product-photography" },
    { label: "Digital Marketing", href: "/services/digital-marketing" },
    { label: "Enhance Brand Content (A+)", href: "/services/enhance-brand-content" },
  ],
};

export const HOME_SERVICES = [
  {
    icon: "ShoppingCart",
    title: "eCommerce Marketing",
    description: "Boost your eCommerce growth with result-driven marketing strategies designed to improve visibility, attract buyers, and increase conversions across all major Indian marketplaces.",
    href: "/services/digital-marketing",
  },
  {
    icon: "Monitor",
    title: "Web Development",
    description: "Build fast, responsive websites with clean design, smooth user experience, and strong online presence to convert visitors into customers. WordPress & Shopify experts.",
    href: "/services/website-development",
  },
  {
    icon: "TrendingUp",
    title: "Digital Marketing",
    description: "Grow your brand online with data-driven strategies — SEO, Google Ads, social media campaigns that improve visibility, generate quality leads, and drive revenue.",
    href: "/services/digital-marketing",
  },
  {
    icon: "Palette",
    title: "Graphic Designing",
    description: "Create strong brand impact with eye-catching visuals, professional creatives, and marketing designs that make your business look memorable and premium.",
    href: "/services/brand-logo-design",
  },
  {
    icon: "Camera",
    title: "Product Photography",
    description: "Showcase your products with clean, high-quality visuals that highlight details, build customer trust, and make your online store look professional and conversion-ready.",
    href: "/services/product-photography",
  },
  {
    icon: "Store",
    title: "Seller Account Management",
    description: "Complete account management for Amazon, Flipkart, Meesho, JioMart — listing optimization, health monitoring, order management, and performance growth.",
    href: "/services/amazon-account-management",
  },
  {
    icon: "FileText",
    title: "GST Registration",
    description: "Get fast and hassle-free GST registration support with complete documentation, verification, and compliance assistance for your growing business needs.",
    href: "/services/accounting-taxation",
  },
  {
    icon: "Smartphone",
    title: "Social Media Management",
    description: "Build your online presence with engaging content, strategic posting, and professional social media management to grow your brand consistently.",
    href: "/services/digital-marketing",
  },
  {
    icon: "Package",
    title: "Inventory Management",
    description: "Manage your stock efficiently with smart tracking solutions that help reduce errors, improve operations, and maintain better business control.",
    href: "/services/warehouse-facility",
  },
];

export const ALL_SERVICES = [
  ...HOME_SERVICES,
  {
    icon: "RotateCcw",
    title: "Seller Reinstatement",
    description: "Expert account reinstatement support for suspended Amazon, Flipkart, Meesho, and JioMart seller accounts. We help you get back to selling fast.",
    href: "/services/seller-reinstatement",
  },
  {
    icon: "PenTool",
    title: "Brand Logo Design",
    description: "Professional brand logo design and complete company profile creation for a strong and memorable business identity across all platforms.",
    href: "/services/brand-logo-design",
  },
  {
    icon: "List",
    title: "Listing / Cataloging",
    description: "SEO-optimized product listing and full catalog management across all major Indian eCommerce platforms. Improve visibility and drive more sales.",
    href: "/services/listing-cataloging",
  },
  {
    icon: "Warehouse",
    title: "Multi-Channel Warehouse",
    description: "Centralized warehouse and fulfillment support for multi-platform sellers — FBA prep, FBF, and self-ship logistics coordination.",
    href: "/services/warehouse-facility",
  },
  {
    icon: "Sparkles",
    title: "Enhance Brand Content (A+)",
    description: "Premium A+ content and Brand Store creation to make your Amazon and Flipkart listings stand out and convert more customers.",
    href: "/services/enhance-brand-content",
  },
  {
    icon: "ShoppingBag",
    title: "Brand Store Design",
    description: "Design and set up your official Brand Store on Amazon and Flipkart for a premium branded shopping experience that builds trust.",
    href: "/services/brand-store",
  },
  {
    icon: "Megaphone",
    title: "Advertisement Optimization",
    description: "Data-driven PPC campaign management on Amazon, Flipkart, Meesho and JioMart for maximum ROAS and sales growth.",
    href: "/services/amazon-advertisement",
  },
  {
    icon: "Calculator",
    title: "Accounting & Taxation",
    description: "Complete GST filing, ITR, bookkeeping and accounting support for online sellers and eCommerce businesses in India.",
    href: "/services/accounting-taxation",
  },
];

export const STATS = [
  { value: 500, suffix: "+", label: "Sellers Growing Daily" },
  { value: 50, suffix: "K+", label: "Revenue Driven for Clients" },
  { value: 10000, suffix: "+", label: "Live Product Listings" },
  { value: 5, suffix: "+", label: "Years in the Market" },
];

export const WHY_CHOOSE_US = [
  {
    icon: "Award",
    title: "Marketplace-Deep Expertise",
    description: "We have spent years inside Amazon Seller Central, Flipkart dashboards, and Meesho panels — not studying them from the outside. That operational depth means fewer mistakes and faster growth for your account.",
  },
  {
    icon: "Heart",
    title: "Your Growth Is Our KPI",
    description: "We don't measure success by tasks completed — we measure it by your sales, rankings, and revenue. Every decision we make is filtered through one question: does this move your numbers forward?",
  },
  {
    icon: "Lightbulb",
    title: "Always One Step Ahead",
    description: "Marketplace algorithms change. Ad formats evolve. Consumer behaviour shifts. Our team tracks every update across every platform so your business adapts instantly — and your competitors don't.",
  },
];

export const PROCESS_STEPS = [
  { step: 1, title: "Deep-Dive Discovery", description: "We spend real time understanding your business — your products, current challenges, target customers, and growth ambitions — before we recommend a single thing." },
  { step: 2, title: "Custom Growth Blueprint", description: "Based on your goals, we build a clear, platform-specific action plan — covering listings, ads, content, and marketing — with timelines and expected outcomes you can actually hold us to." },
  { step: 3, title: "Committed Execution", description: "Our specialists go live across your accounts — optimising listings, launching campaigns, building creatives, and managing operations — with full accountability at every step." },
  { step: 4, title: "Measurable Outcomes", description: "You get clear reports showing exactly what moved — traffic, conversions, rankings, revenue — and we keep pushing until every metric reflects the growth your business deserves." },
];

export const TESTIMONIALS = [
  {
    name: "Rohit Sharma",
    role: "Business Owner",
    rating: 5,
    text: "Before eCommittra, I was struggling to get even 10 orders a week. Within 3 months of handing over my Amazon account to them, I was consistently hitting 80–100 orders. The difference is night and day.",
  },
  {
    name: "Anjali Mehta",
    role: "Online Seller",
    rating: 5,
    text: "They built our Shopify store, set up our Flipkart account, and started running our Instagram ads — all in the same month. I didn't have to follow up even once. That's exactly what 'committed partner' means.",
  },
  {
    name: "Suresh Patel",
    role: "Amazon Seller",
    rating: 5,
    text: "Our Meesho listings were buried on page 5. eCommittra optimised everything — keywords, images, pricing strategy — and we hit page 1 in under 6 weeks. Orders jumped 4x. Genuinely impressed.",
  },
  {
    name: "Pooja Verma",
    role: "Flipkart Seller",
    rating: 5,
    text: "What I love most is that I have one point of contact for everything — my website, my Flipkart account, my ads, my product photos. eCommittra owns it all and they actually deliver. No excuses, just results.",
  },
];

export const FAQ_HOME = [
  {
    question: "What exactly does eCommittra handle for my business?",
    answer: "eCommittra manages the full stack of your online business — marketplace accounts (Amazon, Flipkart, Meesho, JioMart), product listings, ads, website development, digital marketing, social media, product photography, GST registration, and inventory management. Think of us as your complete online business team, without the overhead of hiring one.",
  },
  {
    question: "I'm already selling online. Why do I need eCommittra?",
    answer: "Most sellers leave significant revenue on the table because of weak listings, poor ad targeting, missed keywords, and inconsistent account management. eCommittra plugs every one of those gaps with specialists who do this every single day — so your existing products start performing the way they should.",
  },
  {
    question: "Do you only work with sellers in India?",
    answer: "We're based in India and serve primarily Indian marketplace sellers, but we also support Indian brands selling on international platforms and Indian exporters listing on Amazon Global. Wherever you sell, if it's eCommerce, we can help.",
  },
  {
    question: "Which platforms do you actively manage?",
    answer: "We actively manage seller accounts on Amazon India, Flipkart, Meesho, JioMart, AJIO, Nykaa, and Myntra. We also build and manage independent eCommerce websites on WordPress (WooCommerce) and Shopify for brands who want their own direct sales channel.",
  },
  {
    question: "How quickly can we get started?",
    answer: "Fast. Call or WhatsApp Rahul Dwivedi (+91 8821953915) or Himanshu Mishra (+91 7489881387) and we'll schedule a free discovery call within 24 hours. After that call, you'll have a clear action plan in hand — no waiting, no runaround.",
  },
  {
    question: "What does it cost and are there fixed packages?",
    answer: "We offer both structured platform packages (e.g. Amazon-only, Flipkart + Meesho combo) and fully custom plans built around your specific needs and budget. Pricing is transparent — no hidden fees, no surprise charges. Contact us and we'll give you a clear quote in the same conversation.",
  },
];

export const TEAM_MEMBERS = [
  {
    initials: "RD",
    name: "Rahul Dwivedi",
    role: "Owner",
    phone: "+91 8821953915",
    bio: "Rahul built eCommittra from the ground up with a single focus: making sure every client sees real, measurable growth. He personally oversees client strategy, account performance, and the standards that make eCommittra different from every other agency you've tried.",
    color: "bg-primary",
  },
  {
    initials: "HM",
    name: "Himanshu Mishra",
    role: "CEO & Co-Owner",
    phone: "+91 7489881387",
    bio: "Himanshu is the technology and marketing engine behind eCommittra. He leads website development, digital strategy, ad campaigns, and platform partnerships — ensuring that every tool, every tactic, and every rupee spent works as hard as possible for our clients.",
    color: "bg-secondary",
  },
];

export const COMPANY_VALUES = [
  {
    icon: "Target",
    title: "Commitment",
    description: "We stay dedicated to your growth from onboarding to results. Your success is our success, and we never walk away until you see real, measurable outcomes.",
  },
  {
    icon: "Eye",
    title: "Transparency",
    description: "Clear communication, honest pricing, and real reporting. No hidden fees, no surprises — just straightforward partnership and accountable results.",
  },
  {
    icon: "Zap",
    title: "Innovation",
    description: "Constantly adopting new tools and strategies to keep you ahead. We embrace the latest marketplace features, ad formats, and digital trends.",
  },
];

export const PRICING_APPROACHES = [
  {
    title: "Platform-Based Pricing",
    description: "Our platform-based pricing helps sellers choose the right plan for Amazon, Flipkart, Meesho and other marketplaces, with support focused on sales, visibility and account growth.",
  },
  {
    title: "Service-Level Packages",
    description: "Pay only for the services your business needs, including marketplace account management, SEO-friendly product listing, catalog optimization, website development, digital marketing and social media management.",
  },
  {
    title: "Flexible Monthly & Custom Plans",
    description: "We offer flexible monthly and quarterly growth plans for online sellers, startups and brands looking for complete eCommerce support, marketing strategy and long-term business growth.",
  },
];

export const JOB_POSITIONS = [
  { title: "eCommerce Executive", location: "India", type: "Full-time" },
  { title: "Digital Marketing Specialist", location: "India", type: "Full-time" },
  { title: "Web Developer", location: "India", type: "Full-time" },
  { title: "Content Writer", location: "India", type: "Full-time" },
];

export const PLATFORM_LOGOS = [
  { name: "Amazon", logo: "/amazon.png" },
  { name: "Flipkart", logo: "/flipkart.png" },
  { name: "Meesho", logo: "/meesho.png" },
  { name: "JioMart", logo: "/jiomart.webp" },
  { name: "AJIO", initials: "AJ" },
  { name: "Nykaa", initials: "Nk" },
  { name: "Myntra", initials: "My" },
  { name: "Etsy", initials: "Et" },
];

export const SERVICE_NAMES_FOR_DROPDOWN = [
  "eCommerce Marketing",
  "Web Development",
  "Digital Marketing",
  "Graphic Designing",
  "Product Photography",
  "Seller Account Management",
  "GST Registration",
  "Social Media Management",
  "Inventory Management",
  "Seller Reinstatement",
  "Brand Logo Design",
  "Listing / Cataloging",
  "Multi-Channel Warehouse",
  "Enhance Brand Content (A+)",
  "Brand Store Design",
  "Advertisement Optimization",
  "Accounting & Taxation",
  "Amazon Account Launch",
  "Flipkart Account Launch",
  "Meesho Account Launch",
  "JioMart Account Launch",
];
