# ecommittra — Content Replacement Table
### Instructions for AI Agent
- Replace every string in the **CURRENT TEXT** column with the corresponding **REPLACEMENT TEXT** exactly as written.
- Match strings case-sensitively and in full — do not do partial replacements.
- File locations are noted in the **SOURCE FILE** column. Where a string appears in multiple files, apply the replacement in all of them.
- Do not alter any JSX structure, class names, variable names, or logic — text content only.
- Strings marked `[BLOCK]` span multiple lines; replace the entire block as a unit.

---

## SECTION 1 — Constants (`src/lib/constants.ts`)

| # | Field / Key | CURRENT TEXT | REPLACEMENT TEXT |
|---|-------------|--------------|------------------|
| 1 | `BUSINESS.tagline` | Your Committed Partner for eCommerce Growth | We Grow Your Business. You Keep the Profits. |
| 2 | `BUSINESS.whatsappLink (text)` | Hi ecommittra, I need help with my eCommerce business | Hi eCommittra! I want to grow my online business. Can we talk? |
| 3 | `STATS[0].label` | Happy Customers | Sellers Growing Daily |
| 4 | `STATS[1].label` | Revenue Generated | Revenue Driven for Clients |
| 5 | `STATS[2].label` | Listings Created | Live Product Listings |
| 6 | `STATS[3].label` | Years Experience | Years in the Market |

---

## SECTION 2 — Home Page (`src/pages/Home.tsx`)

| # | Element | CURRENT TEXT | REPLACEMENT TEXT |
|---|---------|--------------|------------------|
| 7 | Hero eyebrow pill | India's Trusted eCommerce Partner | 🚀 India's Most Reliable eCommerce Growth Partner |
| 8 | Hero H1 headline | Grow Your eCommerce Business Smarter with eCommittra | Sell More. Stress Less. Scale Faster with eCommittra. |
| 9 | Hero subheadline `[BLOCK]` | We help brands sell smarter across Amazon, Flipkart, Meesho, JioMart & more — with complete account management, digital marketing, website development, GST registration, and full online growth solutions. | From first listing to full-scale growth — eCommittra manages your Amazon, Flipkart, Meesho & JioMart accounts, runs your ads, builds your website, and handles everything so you can focus on what matters: your business. |
| 10 | Primary CTA button | Get Free Consultation | Get My Free Growth Plan |
| 11 | Secondary CTA button | View Our Services | Explore What We Do |
| 12 | Trust badge 1 | 500+ Happy Clients | 500+ Brands Scaled |
| 13 | Trust badge 2 | Amazon & Flipkart Verified | Marketplace Certified Experts |
| 14 | Trust badge 3 | GST Registered | 100% Compliant & Verified |
| 15 | About section eyebrow label | ABOUT US | WHO WE ARE |
| 16 | About section H2 | Smart Technology. Smarter Business. | One Partner. Every Platform. Total Growth. |
| 17 | About section subtitle | Complete eCommerce Solutions | End-to-End eCommerce Management |
| 18 | About snippet para 1 `[BLOCK]` | eCommittra helps businesses grow online with complete eCommerce account management, marketplace onboarding, website development, digital marketing and social media management services. | eCommittra is your dedicated growth engine — a full-service eCommerce partner that manages everything from marketplace account setup and daily operations to brand-building, ads, and digital marketing across India's biggest platforms. |
| 19 | About section CTA button | Get In Touch | Let's Build Together |
| 20 | Platform strip heading | We Help You Sell On | Your Brand. Every Marketplace. |
| 21 | Services section eyebrow label | WHAT WE DO | OUR EXPERTISE |
| 22 | Services section H2 | Our Complete eCommerce Services | Everything Your Online Business Needs |
| 23 | Services section subtext | From marketplace setup to full digital growth — we handle everything. | One committed team managing every part of your online success — so nothing falls through the cracks. |
| 24 | Service card CTA | Get Started | Know More → |
| 25 | Why Choose Us H2 | Why Do You Choose Us? | Why 500+ Sellers Choose eCommittra |
| 26 | Why Choose Us subtext | We combine expertise, dedication, and innovation to help your business succeed in the competitive eCommerce landscape. | While others promise results, we build them — with a team that treats your business like our own and never stops working until the numbers move. |
| 27 | Why Choose Us card CTA | Contact Now | Talk to Us → |
| 28 | Process section eyebrow | OUR PROCESS | HOW IT WORKS |
| 29 | Process section H2 | How We Work | From Zero to Growing — Here's How We Do It |
| 30 | Process section subtext | Simple 4-Step Process to Grow Your Business | A proven 4-step system that turns new sellers into confident, scaling businesses. |
| 31 | Testimonials section H2 | What Our Customers Say | Real Sellers. Real Results. |
| 32 | FAQ section H2 | Frequently Asked Questions | Got Questions? We've Got Answers. |
| 33 | Bottom CTA banner H2 | Ready to Grow Your eCommerce Business? | Your Next 10,000 Sales Start Here. |
| 34 | Bottom CTA banner subtext | Get a free consultation today. Our experts will create a custom growth plan tailored to your business. | Stop leaving money on the table. Book a free 30-minute strategy call and walk away with a clear roadmap to grow your online sales — no strings attached. |
| 35 | Bottom CTA button 1 | Call Rahul — {phone} | 📞 Call Rahul Now — {phone} |
| 36 | Bottom CTA button 2 | WhatsApp Us Now | 💬 WhatsApp for Instant Reply |

---

## SECTION 3 — Home Page Service Card Descriptions (`src/pages/Home.tsx` / `src/lib/constants.ts`)

| # | Service Title (keep as-is) | CURRENT DESCRIPTION | REPLACEMENT DESCRIPTION |
|---|---------------------------|--------------------|-----------------------|
| 37 | eCommerce Marketing | Boost your eCommerce growth with result-driven marketing strategies designed to improve visibility, attract buyers, and increase conversions across all major Indian marketplaces. | We put your products in front of the right buyers at the right time — with performance-focused strategies that drive real orders, not just traffic, across every major Indian marketplace. |
| 38 | Web Development | Build fast, responsive websites with clean design, smooth user experience, and strong online presence to convert visitors into customers. WordPress & Shopify experts. | Your website is your 24/7 salesperson. We build fast, mobile-first, SEO-ready websites on WordPress and Shopify that turn every visitor into a paying customer. |
| 39 | Digital Marketing | Grow your brand online with data-driven strategies — SEO, Google Ads, social media campaigns that improve visibility, generate quality leads, and drive revenue. | From Google Ads to SEO to social — we run every digital channel that matters, optimise relentlessly, and report honestly so your marketing budget always earns its keep. |
| 40 | Graphic Designing | Create strong brand impact with eye-catching visuals, professional creatives, and marketing designs that make your business look memorable and premium. | First impressions close deals. Our designers craft scroll-stopping visuals, marketplace creatives, and brand assets that make your business look premium and worth buying from. |
| 41 | Product Photography | Showcase your products with clean, high-quality visuals that highlight details, build customer trust, and make your online store look professional and conversion-ready. | Great products deserve great photos. We shoot clean, marketplace-compliant images that highlight every detail, build instant buyer trust, and lift your conversion rate from day one. |
| 42 | Seller Account Management | Complete account management for Amazon, Flipkart, Meesho, JioMart — listing optimization, health monitoring, order management, and performance growth. | We live inside your seller dashboard so you don't have to — managing listings, health metrics, orders, returns, and performance 24/7 across Amazon, Flipkart, Meesho, and JioMart. |
| 43 | GST Registration | Get fast and hassle-free GST registration support with complete documentation, verification, and compliance assistance for your growing business needs. | Selling online requires being compliant from day one. We handle your GST registration end-to-end — documents, verification, and filing — fast, accurate, and completely stress-free. |
| 44 | Social Media Management | Build your online presence with engaging content, strategic posting, and professional social media management to grow your brand consistently. | Your customers are on Instagram, Facebook, and YouTube every day. We create content they actually stop to read, build your following steadily, and turn likes into loyal buyers. |
| 45 | Inventory Management | Manage your stock efficiently with smart tracking solutions that help reduce errors, improve operations, and maintain better business control. | Running out of stock kills momentum; excess stock kills margins. We track, forecast, and manage your inventory across all platforms so you always have exactly what you need — nothing more, nothing less. |

---

## SECTION 4 — Why Choose Us Cards (`src/lib/constants.ts`)

| # | Card Title | CURRENT DESCRIPTION | REPLACEMENT TITLE | REPLACEMENT DESCRIPTION |
|---|-----------|--------------------|--------------------|------------------------|
| 46 | Expertise & Experience | [With years of industry experience, our team of skilled professionals brings in-depth knowledge.] | Marketplace-Deep Expertise | We have spent years inside Amazon Seller Central, Flipkart dashboards, and Meesho panels — not studying them from the outside. That operational depth means fewer mistakes and faster growth for your account. |
| 47 | Customer-First Approach | [Your satisfaction is our top priority. From consultation to completion, we work closely.] | Your Growth Is Our KPI | We don't measure success by tasks completed — we measure it by your sales, rankings, and revenue. Every decision we make is filtered through one question: does this move your numbers forward? |
| 48 | Innovative Solutions | [Our team stays ahead of industry trends with modern tech and strategy.] | Always One Step Ahead | Marketplace algorithms change. Ad formats evolve. Consumer behaviour shifts. Our team tracks every update across every platform so your business adapts instantly — and your competitors don't. |

---

## SECTION 5 — Process Steps (`src/lib/constants.ts`)

| # | Step | CURRENT TITLE | CURRENT DESCRIPTION | REPLACEMENT TITLE | REPLACEMENT DESCRIPTION |
|---|------|--------------|--------------------|--------------------|------------------------|
| 49 | Step 1 | Consultation | Tell us about your business goals & needs. | Deep-Dive Discovery | We spend real time understanding your business — your products, current challenges, target customers, and growth ambitions — before we recommend a single thing. |
| 50 | Step 2 | Strategy Plan | We craft a custom growth roadmap for you. | Custom Growth Blueprint | Based on your goals, we build a clear, platform-specific action plan — covering listings, ads, content, and marketing — with timelines and expected outcomes you can actually hold us to. |
| 51 | Step 3 | Execution | Our team deploys your plan across all channels. | Committed Execution | Our specialists go live across your accounts — optimising listings, launching campaigns, building creatives, and managing operations — with full accountability at every step. |
| 52 | Step 4 | Results & Growth | Watch your sales, traffic & brand visibility grow. | Measurable Outcomes | You get clear reports showing exactly what moved — traffic, conversions, rankings, revenue — and we keep pushing until every metric reflects the growth your business deserves. |

---

## SECTION 6 — Testimonials (`src/lib/constants.ts`)

| # | Reviewer | CURRENT TESTIMONIAL | REPLACEMENT TESTIMONIAL |
|---|---------|--------------------|-----------------------|
| 53 | Rohit Sharma, Amazon Seller | "Their team built a beautiful and functional eCommerce website for us. Our sales have doubled since launch, and their ongoing support is amazing." | "Before eCommittra, I was struggling to get even 10 orders a week. Within 3 months of handing over my Amazon account to them, I was consistently hitting 80–100 orders. The difference is night and day." |
| 54 | Anjali Mehta, Online Seller | "From web design to digital marketing, eCommittra handled everything flawlessly. They truly understand how to make a brand stand out online." | "They built our Shopify store, set up our Flipkart account, and started running our Instagram ads — all in the same month. I didn't have to follow up even once. That's exactly what 'committed partner' means." |
| 55 | Suresh Patel, Meesho Seller | "The eCommittra team helped us boost our store's visibility with targeted SEO and social campaigns. Highly recommend their eCommerce expertise!" | "Our Meesho listings were buried on page 5. eCommittra optimised everything — keywords, images, pricing strategy — and we hit page 1 in under 6 weeks. Orders jumped 4x. Genuinely impressed." |
| 56 | Pooja Verma, Flipkart Seller | "eCommittra manages our website, graphics, and marketing — all under one roof. They've been instrumental in helping us scale our business smoothly." | "What I love most is that I have one point of contact for everything — my website, my Flipkart account, my ads, my product photos. eCommittra owns it all and they actually deliver. No excuses, just results." |

---

## SECTION 7 — FAQ Home Page (`src/lib/constants.ts`)

| # | CURRENT QUESTION | REPLACEMENT QUESTION | REPLACEMENT ANSWER |
|---|-----------------|---------------------|-------------------|
| 57 | What services does eCommittra offer? | What exactly does eCommittra handle for my business? | eCommittra manages the full stack of your online business — marketplace accounts (Amazon, Flipkart, Meesho, JioMart), product listings, ads, website development, digital marketing, social media, product photography, GST registration, and inventory management. Think of us as your complete online business team, without the overhead of hiring one. |
| 58 | How can eCommittra help my business grow? | I'm already selling online. Why do I need eCommittra? | Most sellers leave significant revenue on the table because of weak listings, poor ad targeting, missed keywords, and inconsistent account management. eCommittra plugs every one of those gaps with specialists who do this every single day — so your existing products start performing the way they should. |
| 59 | Do you work with clients outside India? | Do you only work with sellers in India? | We're based in India and serve primarily Indian marketplace sellers, but we also support Indian brands selling on international platforms and Indian exporters listing on Amazon Global. Wherever you sell, if it's eCommerce, we can help. |
| 60 | Which marketplaces do you work with? | Which platforms do you actively manage? | We actively manage seller accounts on Amazon India, Flipkart, Meesho, JioMart, AJIO, Nykaa, and Myntra. We also build and manage independent eCommerce websites on WordPress (WooCommerce) and Shopify for brands who want their own direct sales channel. |
| 61 | How can I get started with eCommittra? | How quickly can we get started? | Fast. Call or WhatsApp Rahul Dwivedi (+91 8821953915) or Himanshu Mishra (+91 7489881387) and we'll schedule a free discovery call within 24 hours. After that call, you'll have a clear action plan in hand — no waiting, no runaround. |
| 62 | Do you offer fixed packages or custom pricing? | What does it cost and are there fixed packages? | We offer both structured platform packages (e.g. Amazon-only, Flipkart + Meesho combo) and fully custom plans built around your specific needs and budget. Pricing is transparent — no hidden fees, no surprise charges. Contact us and we'll give you a clear quote in the same conversation. |

---

## SECTION 8 — About Page (`src/pages/About.tsx`)

| # | Element | CURRENT TEXT | REPLACEMENT TEXT |
|---|---------|--------------|------------------|
| 63 | Hero H1 | About eCommittra | The Team Behind Your Growth |
| 64 | Hero subtext | Your Trusted Partner for eCommerce Growth | Built by Sellers, Run by Experts, Committed to Your Success |
| 65 | Section eyebrow | OUR STORY | THE ECOMMITTRA STORY |
| 66 | Story H2 | About eCommittra | We Started Because Sellers Deserved Better |
| 67 | Story para 1 `[BLOCK]` | eCommittra helps businesses grow online with complete eCommerce account management, marketplace onboarding, website development, digital marketing and social media management services. | eCommittra was built on one belief: that every Indian seller — from a first-time entrepreneur to an established brand — deserves a partner who is as invested in their growth as they are. We provide complete account management, marketplace onboarding, website development, digital marketing, and social media services all under one roof. |
| 68 | Story para 2 `[BLOCK]` | We support sellers and brands on platforms like Amazon, Flipkart, Meesho, AJIO, Nykaa and Myntra with smart strategies, optimized listings and result-focused execution. | Today we support hundreds of sellers and brands across Amazon, Flipkart, Meesho, AJIO, Nykaa and Myntra — with strategies grounded in data, listings built for conversion, and execution that never stops at "good enough." |
| 69 | Story para 3 / mission `[BLOCK]` | Our mission is simple: to be your most committed partner in the eCommerce journey — from Day 1 to sustained growth. | Our mission is non-negotiable: be the most committed eCommerce partner our clients have ever worked with — from their very first product listing to the day they become the category leader. |
| 70 | Feature pill 1 | eCommerce Support | Full-Stack Marketplace Support |
| 71 | Feature pill 2 | Marketplace Growth | Multi-Platform Sales Growth |
| 72 | Feature pill 3 | Website & Branding | Website, Brand & Creative |
| 73 | Feature pill 4 | Result-Driven Marketing | Performance Marketing & Ads |
| 74 | Team section H2 | Meet Our Leadership Team | The People Committed to Your Growth |
| 75 | Rahul Dwivedi bio `[BLOCK]` | Rahul leads eCommittra's client growth strategy, ensuring every business we partner with achieves measurable results across Indian eCommerce marketplaces. | Rahul built eCommittra from the ground up with a single focus: making sure every client sees real, measurable growth. He personally oversees client strategy, account performance, and the standards that make eCommittra different from every other agency you've tried. |
| 76 | Himanshu Mishra bio `[BLOCK]` | Himanshu drives eCommittra's technology vision and operations, overseeing website development, digital marketing, and platform partnerships for all clients. | Himanshu is the technology and marketing engine behind eCommittra. He leads website development, digital strategy, ad campaigns, and platform partnerships — ensuring that every tool, every tactic, and every rupee spent works as hard as possible for our clients. |
| 77 | Values section H2 | Our Values | What We Stand For |
| 78 | Value 1 title | Commitment | Unbreakable Commitment |
| 79 | Value 1 description | We stay dedicated to your growth from onboarding to results | We don't disappear after onboarding. We stay in your corner — accountable, reachable, and relentlessly focused on moving your business forward until results arrive and then well beyond. |
| 80 | Value 2 title | Transparency | Radical Transparency |
| 81 | Value 2 description | Clear communication, honest pricing, and real reporting | You see exactly what we're doing, exactly what it costs, and exactly what it's producing — every week, in plain language. No inflated metrics. No vague "brand awareness" excuses. |
| 82 | Value 3 title | Innovation | Constant Innovation |
| 83 | Value 3 description | Constantly adopting new tools and strategies to keep you ahead | Marketplaces evolve daily. We stay obsessively current — testing new ad formats, algorithm changes, content strategies, and tools — so your business is always ahead of the competition, not catching up to it. |
| 84 | About FAQ H2 | Frequently Asked Questions | Everything You Wanted to Ask Us |

---

## SECTION 9 — Services Page (`src/pages/Services.tsx`)

| # | Element | CURRENT TEXT | REPLACEMENT TEXT |
|---|---------|--------------|------------------|
| 85 | Hero H1 | Our Services | Everything You Need to Win Online |
| 86 | Hero subtext | Complete eCommerce & Digital Solutions for Indian Businesses | One partner. Every service. Zero excuses. Built for Indian sellers who are serious about growth. |
| 87 | Services section H2 | eCommerce & Digital Marketing Services | The Full Arsenal — At Your Disposal |
| 88 | Services body para `[BLOCK]` | eCommittra provides complete eCommerce account management, marketplace onboarding, website development, product listing, graphic designing, digital marketing and GST registration services. We are your one-stop solution for online business growth. | From setting up your first Amazon account to running a 6-platform operation with ads, A+ content, a Shopify store, and a social media presence — eCommittra has the people, the process, and the commitment to make it all work together. No juggling multiple agencies. No dropped balls. Just one partner, fully accountable. |
| 89 | Pricing section H2 | Smart Pricing for Every Stage | Transparent Pricing. No Surprises. |
| 90 | Pricing section subtext | Choose the pricing model that fits your business needs | Whether you're just starting or scaling past ₹10L/month, we have a plan that fits where you are and funds where you're going. |
| 91 | Pricing card 1 title | Platform-Based Pricing | Single-Platform Packages |
| 92 | Pricing card 1 body `[BLOCK]` | Our platform-based pricing helps sellers choose the right plan for Amazon, Flipkart, Meesho and other marketplaces, with support focused on sales, visibility and account growth. | Built for sellers who are focused on one platform and want to dominate it. Choose Amazon, Flipkart, Meesho, or JioMart — and get deep, specialist-level support for that one channel at a price that makes sense. |
| 93 | Pricing card 2 title | Service-Level Packages | Pick What You Need |
| 94 | Pricing card 2 body `[BLOCK]` | Pay only for the services your business needs, including marketplace account management, SEO-friendly product listing, catalog optimization, website development, digital marketing and social media management. | Not every business needs everything. Choose only the services your growth stage demands — listing optimisation, ads management, website development, social media, or photography — and pay only for what you actually use. |
| 95 | Pricing card 3 title | Flexible Monthly & Custom Plans | Full-Stack Custom Plans |
| 96 | Pricing card 3 body `[BLOCK]` | We offer flexible monthly and quarterly growth plans for online sellers, startups and brands looking for complete eCommerce support, marketing strategy and long-term business growth. | For brands who want eCommittra managing everything — accounts, ads, content, website, and marketing — we build a fully custom monthly plan around your exact needs, with clear deliverables and honest pricing agreed upfront. |
| 97 | Service card CTA | Learn More | See Full Details → |
| 98 | Pricing card CTA | Get Quote | Get My Quote → |

---

## SECTION 10 — Contact Page (`src/pages/Contact.tsx`)

| # | Element | CURRENT TEXT | REPLACEMENT TEXT |
|---|---------|--------------|------------------|
| 99 | Hero H1 | Contact Us | Let's Start Your Growth Story |
| 100 | Hero subtext | Get in touch with our team. We respond within 24 hours. | One message, one call, or one WhatsApp — and you'll have a real conversation with our team within 24 hours. No bots, no automated replies. |
| 101 | Info card 1 label | Mail Us | Drop Us an Email |
| 102 | Info card 2 label | Our Office | Find Us Here |
| 103 | Info card 3 label | Call Us | Speak to Us Directly |
| 104 | Form section H2 | Send Us a Message | Tell Us About Your Business |
| 105 | Social section H2 | Follow Us On Social Media | Stay Connected — We Post Useful Stuff |

---

## SECTION 11 — Components: Navbar, Footer, Floating Buttons

| # | Component | CURRENT TEXT | REPLACEMENT TEXT |
|---|-----------|--------------|------------------|
| 106 | Navbar logo text | ecommittra | ecommittra |
| 107 | Footer tagline (under logo) | Your Committed Partner for eCommerce Growth | We Grow Your Business. You Keep the Profits. |
| 108 | Footer services col heading | Our Services | What We Do |
| 109 | Footer contact col heading | Contact Us | Reach Us Directly |
| 110 | Footer bottom line | © 2025 ecommittra. All rights reserved. | © 2025 ecommittra — Built to grow Indian businesses. All rights reserved. |
| 111 | Floating call button `aria-label` | Call Now | Call Us Now |
| 112 | Floating WhatsApp button `aria-label` | WhatsApp | WhatsApp Us |

---

## SECTION 12 — Contact Form Validation & Toast Messages (`src/components/ContactForm.tsx`)

| # | Message Key | CURRENT TEXT | REPLACEMENT TEXT |
|---|------------|--------------|------------------|
| 113 | Validation: name empty | First name is required | Please tell us your name — we like knowing who we're talking to. |
| 114 | Validation: phone empty | Phone number is required | We'll need your phone number to reach you quickly. |
| 115 | Validation: phone format | Please enter a valid 10-digit phone number | That doesn't look like a valid Indian mobile number — please check and try again. |
| 116 | Validation: email format | Please enter a valid email | Please double-check your email address — something looks off. |
| 117 | Validation: message empty | Message is required | Please add a short note about your business — it helps us prepare for your call. |
| 118 | Success toast | Thank you! We'll contact you within 24 hours. | 🎉 Message received! Rahul or Himanshu will personally reach out within 24 hours. |
| 119 | Config error | Form service not configured. Please call us directly. | Our form isn't set up yet — please call +91 8821953915 directly and we'll sort you out immediately. |
| 120 | Submit error | Something went wrong. Please call us directly. | Something went wrong on our end — sorry about that. Please call us at +91 8821953915 and we'll pick up right away. |
| 121 | Primary form submit button | Get Free Consultation | Send My Message → |
| 122 | Contact page form submit button | Send Message | Get My Free Strategy Call → |

---

## SECTION 13 — Pricing Approach Card Descriptions (`src/lib/constants.ts`)

| # | Card | CURRENT TITLE | REPLACEMENT TITLE | REPLACEMENT DESCRIPTION |
|---|------|--------------|-------------------|------------------------|
| 123 | Pricing 1 | Platform-Based Pricing | Single-Platform Packages | Dominate one marketplace before you expand. Our platform packages give you deep, specialist support for Amazon, Flipkart, Meesho, or JioMart — with pricing that scales as your account does. |
| 124 | Pricing 2 | Service-Level Packages | Build Your Own Bundle | Only need listings and photography? Just ads and social? Pick exactly the services your stage demands and pay for nothing you don't use — with the option to add on as you grow. |
| 125 | Pricing 3 | Flexible Monthly & Custom Plans | The Full Commitment Plan | For sellers who want one partner managing everything. We build a custom monthly engagement with agreed deliverables, clear pricing, and a dedicated team — so you can stop managing vendors and start watching numbers grow. |

---

## SECTION 14 — Job Position Descriptions (`src/pages/Career.tsx`)

| # | Position | CURRENT TITLE | REPLACEMENT TITLE | REPLACEMENT SHORT DESCRIPTION |
|---|---------|--------------|-------------------|-------------------------------|
| 126 | Role 1 | eCommerce Executive | eCommerce Growth Executive | Manage and grow seller accounts across Amazon, Flipkart, Meesho and JioMart. You love dashboards, optimising listings, and watching order counts climb. |
| 127 | Role 2 | Digital Marketing Specialist | Performance Marketing Specialist | Plan and run paid + organic campaigns across Google, Meta, and marketplaces. Data-first mindset. You measure everything and optimise until the ROAS is right. |
| 128 | Role 3 | Web Developer | eCommerce Web Developer | Build fast, conversion-focused websites on WordPress and Shopify. Clean code, mobile-first thinking, and a genuine understanding of what makes online stores sell. |
| 129 | Role 4 | Content Writer | eCommerce Content Strategist | Write listing copy, ad scripts, blogs, and social content that drives clicks and conversions — not just words on a screen. SEO knowledge and a hunger for great writing required. |

---

## SECTION 15 — Career Page Hero & Section (`src/pages/Career.tsx`)

| # | Element | CURRENT TEXT | REPLACEMENT TEXT |
|---|---------|--------------|------------------|
| 130 | Career hero H1 | Join the eCommittra Team | Come Build the Future of Indian eCommerce With Us |
| 131 | Career hero subtext | Be part of a fast-growing eCommerce solutions company where your skills create real impact for hundreds of Indian businesses. | eCommittra is not a big corporation with endless hierarchies. We're a fast-moving team of specialists who care deeply about client results — and we're looking for people who feel the same way. If you want your work to genuinely matter, you're in the right place. |
| 132 | Why join section H2 | Why Join Us | Why eCommittra Is Different |
| 133 | Why join pill 1 | Fast-Growing Company | Real Ownership From Day 1 |
| 134 | Why join pill 2 | Competitive Compensation | Performance-Linked Pay |
| 135 | Why join pill 3 | Learning & Development | Learn the Full eCommerce Stack |
| 136 | Why join pill 4 | Collaborative Culture | A Team That Has Your Back |
| 137 | Why join pill 5 | Flexible Work Options | Flexible Work, Serious Results |
| 138 | Why join pill 6 | Real Responsibility from Day 1 | Your Ideas Actually Get Implemented |
| 139 | Open positions section H2 | Open Positions | We're Hiring — Come Grow With Us |
| 140 | Apply Now button | Apply Now | Apply for This Role → |

---

## SECTION 16 — Company Values Extended Descriptions (`src/lib/constants.ts`)

> These are the long-form value descriptions used in the About page values section.

| # | Value | CURRENT DESCRIPTION | REPLACEMENT DESCRIPTION |
|---|-------|--------------------|-----------------------|
| 141 | Commitment | We stay dedicated to your growth from onboarding to results | We don't celebrate onboarding. We celebrate your first 100 orders, your first ₹1L month, your first category rank. Commitment to us means we're in it with you for the long haul — not just the first invoice. |
| 142 | Transparency | Clear communication, honest pricing, and real reporting | Every report we send tells the full truth — including what didn't work and why. We'd rather have an honest, uncomfortable conversation than let you believe a number that isn't real. |
| 143 | Innovation | Constantly adopting new tools and strategies to keep you ahead | eCommerce is the fastest-moving industry in India. Our team actively tests new tools, monitors platform changes, and shares what's working — so your strategy is always current and your competitors are always catching up to you. |

---

## AGENT INSTRUCTIONS SUMMARY

1. **Apply all replacements exactly as written** — no paraphrasing, no reformatting.
2. **`[BLOCK]` replacements** replace the entire multi-sentence paragraph, not individual sentences within it.
3. **Do not change** any variable names, component names, import paths, JSX props, CSS class names, or Tailwind classes.
4. **After all replacements**, run `npm run build` to verify no compilation errors were introduced.
5. **The logo text `ecommittra`** (row 106) is intentionally unchanged — the brand name casing stays as-is.
6. **Phone number placeholders `{phone}`** — leave the variable syntax intact; only replace the surrounding button label text.
7. **Row 130 Career H1** is long — ensure it fits within the hero container; if it wraps onto 3 lines at mobile, the fallback short version is: `Build the Future of Indian eCommerce With Us`.
