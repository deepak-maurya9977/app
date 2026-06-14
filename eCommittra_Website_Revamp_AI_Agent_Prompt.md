
You are an expert frontend developer tasked with upgrading the eCommittra website. The site is built with **Astro** and deployed on **Netlify**. Before making any change, scan the project's `src/` folder to understand the existing file structure, component names, layout files, and CSS approach. All changes must:

1. Be compatible with Astro's `.astro` component format
2. Not break existing routing or page structure
3. Use CSS that works without JavaScript where possible (CSS transitions, animations via `@keyframes`, scroll-driven animations via `@keyframes` + `animation-timeline: scroll()` where browser support allows)
4. Use progressive enhancement — the page must still be readable/usable if JS fails
5. Preserve all existing content and copy — only enhance the visual presentation and interactivity
6. Be mobile-first — all changes must work on screens from 320px to 1440px+
7. Target Indian users on Android Chrome on mid-range devices — keep animations smooth at 60fps and avoid heavy JS bundles

---

## SECTION 1 — GLOBAL STYLES & DESIGN TOKENS

**File to modify:** `src/styles/global.css` (or wherever the root stylesheet is)

### 1.1 Add CSS Custom Properties (Design Tokens)

Add the following block at the `:root` level. These tokens will be used across all components for consistency:

```css
:root {
  /* Brand Colors */
  --color-primary: #FF6B2B;         /* eCommittra orange — use for CTAs, highlights */
  --color-primary-dark: #E55A1C;    /* Hover state for primary */
  --color-primary-light: #FFF0E8;   /* Soft background for primary sections */
  --color-secondary: #1A2B4A;       /* Deep navy — use for headings and footer */
  --color-accent: #00C896;          /* Green — use for success states, pricing ticks */

  /* Neutrals */
  --color-text-primary: #1A1A2E;
  --color-text-secondary: #4A5568;
  --color-text-muted: #718096;
  --color-bg-white: #FFFFFF;
  --color-bg-soft: #F8F9FA;
  --color-bg-card: #FFFFFF;
  --color-border: #E2E8F0;

  /* Typography */
  --font-heading: 'Poppins', 'Inter', system-ui, sans-serif;
  --font-body: 'Inter', system-ui, sans-serif;
  --font-size-xs: 0.75rem;
  --font-size-sm: 0.875rem;
  --font-size-base: 1rem;
  --font-size-lg: 1.125rem;
  --font-size-xl: 1.25rem;
  --font-size-2xl: 1.5rem;
  --font-size-3xl: 2rem;
  --font-size-4xl: 2.75rem;
  --font-size-5xl: 3.5rem;

  /* Spacing */
  --space-xs: 0.25rem;
  --space-sm: 0.5rem;
  --space-md: 1rem;
  --space-lg: 1.5rem;
  --space-xl: 2rem;
  --space-2xl: 3rem;
  --space-3xl: 5rem;

  /* Radius */
  --radius-sm: 6px;
  --radius-md: 12px;
  --radius-lg: 20px;
  --radius-xl: 32px;
  --radius-full: 9999px;

  /* Shadows */
  --shadow-sm: 0 1px 3px rgba(0,0,0,0.08), 0 1px 2px rgba(0,0,0,0.05);
  --shadow-md: 0 4px 16px rgba(0,0,0,0.10), 0 2px 6px rgba(0,0,0,0.06);
  --shadow-lg: 0 12px 40px rgba(0,0,0,0.12), 0 4px 12px rgba(0,0,0,0.08);
  --shadow-primary: 0 4px 20px rgba(255, 107, 43, 0.30);

  /* Transitions */
  --transition-fast: 150ms ease;
  --transition-base: 250ms ease;
  --transition-slow: 400ms ease;

  /* Z-index scale */
  --z-base: 1;
  --z-dropdown: 100;
  --z-sticky: 200;
  --z-overlay: 300;
  --z-modal: 400;
  --z-toast: 500;
}
```

### 1.2 Import Google Fonts

Add to the `<head>` of `src/layouts/BaseLayout.astro` (or equivalent layout file):

```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Poppins:wght@600;700;800&family=Inter:wght@400;500;600&display=swap" rel="stylesheet">
```

### 1.3 Add Global Animation Utilities

Add to `global.css`:

```css
/* Fade-in-up animation — used on sections and cards */
@keyframes fadeInUp {
  from { opacity: 0; transform: translateY(24px); }
  to   { opacity: 1; transform: translateY(0); }
}

/* Float animation — used on hero illustration or icon badges */
@keyframes float {
  0%, 100% { transform: translateY(0px); }
  50%       { transform: translateY(-10px); }
}

/* Pulse ring — used on CTA buttons and WhatsApp floating button */
@keyframes pulseRing {
  0%   { transform: scale(0.95); box-shadow: 0 0 0 0 rgba(255, 107, 43, 0.5); }
  70%  { transform: scale(1);    box-shadow: 0 0 0 12px rgba(255, 107, 43, 0); }
  100% { transform: scale(0.95); box-shadow: 0 0 0 0 rgba(255, 107, 43, 0); }
}

/* Slide-in from left */
@keyframes slideInLeft {
  from { opacity: 0; transform: translateX(-32px); }
  to   { opacity: 1; transform: translateX(0); }
}

/* Counter count-up — used on stats section */
@keyframes countUp {
  from { opacity: 0; }
  to   { opacity: 1; }
}

/* Shimmer loading skeleton */
@keyframes shimmer {
  0%   { background-position: -468px 0; }
  100% { background-position: 468px 0; }
}

/* Utility class — attach to any element that should animate on scroll */
.animate-on-scroll {
  opacity: 0;
  transform: translateY(24px);
  transition: opacity 0.6s ease, transform 0.6s ease;
}
.animate-on-scroll.is-visible {
  opacity: 1;
  transform: translateY(0);
}
```

---

## SECTION 2 — NAVIGATION (HEADER)

**File to modify:** `src/components/Header.astro` (or `Navbar.astro`)

### 2.1 Make the Header Sticky with Scroll Blur Effect

Wrap the `<header>` element with:

```css
/* In the component's <style> block */
header {
  position: sticky;
  top: 0;
  z-index: var(--z-sticky);
  background: rgba(255, 255, 255, 0.85);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border-bottom: 1px solid var(--color-border);
  transition: box-shadow var(--transition-base), background var(--transition-base);
  padding: 0.75rem 0;
}

header.scrolled {
  background: rgba(255, 255, 255, 0.97);
  box-shadow: var(--shadow-md);
}
```

Add a `<script>` tag inside the Header component (after the HTML):

```javascript
<script>
  const header = document.querySelector('header');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 60) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  }, { passive: true });
</script>
```

### 2.2 Add a Highlight CTA Button in the Navigation

In the nav links area, ensure the last nav item (likely "Contact Us" or "Get Started") uses a button-style:

```html
<a href="/contact" class="nav-cta">
  Get Free Consultation
</a>
```

```css
.nav-cta {
  background: var(--color-primary);
  color: white !important;
  padding: 0.5rem 1.25rem;
  border-radius: var(--radius-full);
  font-weight: 600;
  font-size: var(--font-size-sm);
  text-decoration: none;
  transition: background var(--transition-fast), transform var(--transition-fast), box-shadow var(--transition-fast);
  white-space: nowrap;
}

.nav-cta:hover {
  background: var(--color-primary-dark);
  transform: translateY(-1px);
  box-shadow: var(--shadow-primary);
}

.nav-cta:active {
  transform: translateY(0);
}
```

### 2.3 Mobile Hamburger Menu Animation

Ensure the mobile menu toggle has smooth animation. Find the existing hamburger button and add:

```css
.hamburger-line {
  display: block;
  width: 24px;
  height: 2px;
  background: var(--color-secondary);
  border-radius: 2px;
  transition: transform var(--transition-base), opacity var(--transition-base);
  transform-origin: center;
}

.hamburger-btn.is-open .hamburger-line:nth-child(1) {
  transform: rotate(45deg) translate(5px, 5px);
}
.hamburger-btn.is-open .hamburger-line:nth-child(2) {
  opacity: 0;
  transform: scaleX(0);
}
.hamburger-btn.is-open .hamburger-line:nth-child(3) {
  transform: rotate(-45deg) translate(5px, -5px);
}

.mobile-menu {
  max-height: 0;
  overflow: hidden;
  transition: max-height 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}
.mobile-menu.is-open {
  max-height: 500px;
}
```

---

## SECTION 3 — HERO SECTION

**File to modify:** `src/pages/index.astro` OR `src/components/Hero.astro`

### 3.1 Add Entry Animation to Hero Content

Wrap the hero text elements to animate in sequentially. In the hero's `<style>`:

```css
.hero-eyebrow {
  animation: fadeInUp 0.6s ease both;
  animation-delay: 0.1s;
}
.hero-heading {
  animation: fadeInUp 0.6s ease both;
  animation-delay: 0.25s;
}
.hero-subheading {
  animation: fadeInUp 0.6s ease both;
  animation-delay: 0.4s;
}
.hero-cta-group {
  animation: fadeInUp 0.6s ease both;
  animation-delay: 0.55s;
}
.hero-trust-badges {
  animation: fadeInUp 0.6s ease both;
  animation-delay: 0.7s;
}
```

### 3.2 Add a Gradient Background to the Hero

Replace the plain white/solid hero background with a subtle gradient:

```css
.hero-section {
  background: linear-gradient(135deg, #FFF8F4 0%, #F0F4FF 50%, #F8FFF6 100%);
  position: relative;
  overflow: hidden;
}

/* Decorative blobs — purely CSS, no images needed */
.hero-section::before {
  content: '';
  position: absolute;
  width: 600px;
  height: 600px;
  top: -200px;
  right: -200px;
  background: radial-gradient(circle, rgba(255, 107, 43, 0.08) 0%, transparent 70%);
  border-radius: 50%;
  pointer-events: none;
}

.hero-section::after {
  content: '';
  position: absolute;
  width: 400px;
  height: 400px;
  bottom: -100px;
  left: -100px;
  background: radial-gradient(circle, rgba(0, 200, 150, 0.07) 0%, transparent 70%);
  border-radius: 50%;
  pointer-events: none;
}
```

### 3.3 Add Floating Metric Badges on the Hero

These are animated "social proof" chips that float around the hero image or illustration. Add these HTML elements inside the hero section:

```html
<div class="hero-badge hero-badge--top-right animate-float" style="animation-delay: 0s;">
  <span class="badge-icon">🛒</span>
  <div>
    <span class="badge-number">500+</span>
    <span class="badge-label">Happy Sellers</span>
  </div>
</div>

<div class="hero-badge hero-badge--bottom-left animate-float" style="animation-delay: 0.5s;">
  <span class="badge-icon">⭐</span>
  <div>
    <span class="badge-number">4.9/5</span>
    <span class="badge-label">Avg Rating</span>
  </div>
</div>

<div class="hero-badge hero-badge--mid-right animate-float" style="animation-delay: 1s;">
  <span class="badge-icon">📈</span>
  <div>
    <span class="badge-number">3x Growth</span>
    <span class="badge-label">Avg Sales Boost</span>
  </div>
</div>
```

```css
.hero-badge {
  position: absolute;
  display: flex;
  align-items: center;
  gap: 10px;
  background: white;
  border-radius: var(--radius-md);
  padding: 10px 14px;
  box-shadow: var(--shadow-md);
  border: 1px solid var(--color-border);
  font-family: var(--font-body);
}

.hero-badge .badge-icon {
  font-size: 1.5rem;
}

.hero-badge .badge-number {
  display: block;
  font-weight: 700;
  font-size: var(--font-size-base);
  color: var(--color-secondary);
  line-height: 1.2;
}

.hero-badge .badge-label {
  display: block;
  font-size: var(--font-size-xs);
  color: var(--color-text-muted);
  line-height: 1.2;
}

.animate-float {
  animation: float 3s ease-in-out infinite;
}

.hero-badge--top-right    { top: 10%; right: 8%; }
.hero-badge--bottom-left  { bottom: 20%; left: 5%; }
.hero-badge--mid-right    { top: 55%; right: 4%; }

/* Hide on mobile to avoid overlap */
@media (max-width: 768px) {
  .hero-badge { display: none; }
}
```

### 3.4 Improve the Primary CTA Button

Find the main hero CTA button and replace its styles with:

```css
.btn-primary {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  background: var(--color-primary);
  color: white;
  padding: 0.875rem 2rem;
  border-radius: var(--radius-full);
  font-weight: 600;
  font-size: var(--font-size-lg);
  text-decoration: none;
  border: none;
  cursor: pointer;
  transition: background var(--transition-fast), transform var(--transition-fast), box-shadow var(--transition-fast);
  animation: pulseRing 2s infinite;
}

.btn-primary:hover {
  background: var(--color-primary-dark);
  transform: translateY(-2px);
  box-shadow: var(--shadow-primary);
  animation: none;
}

.btn-primary:active {
  transform: translateY(0);
}

.btn-secondary {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  background: transparent;
  color: var(--color-secondary);
  padding: 0.875rem 1.75rem;
  border-radius: var(--radius-full);
  font-weight: 600;
  font-size: var(--font-size-lg);
  text-decoration: none;
  border: 2px solid var(--color-border);
  cursor: pointer;
  transition: all var(--transition-fast);
}

.btn-secondary:hover {
  border-color: var(--color-primary);
  color: var(--color-primary);
  background: var(--color-primary-light);
}
```

### 3.5 Add Trust Badges Below the Hero CTA

Below the CTA buttons, add a row of platform logos (Amazon, Flipkart, Meesho, JioMart) to visually communicate platform expertise:

```html
<div class="hero-trust">
  <p class="trust-label">Helping sellers on</p>
  <div class="trust-logos">
    <!-- Replace src with actual logo image paths in your project -->
    <img src="/images/logos/amazon.svg" alt="Amazon" height="24" loading="lazy">
    <img src="/images/logos/flipkart.svg" alt="Flipkart" height="24" loading="lazy">
    <img src="/images/logos/meesho.svg" alt="Meesho" height="24" loading="lazy">
    <img src="/images/logos/jiomart.svg" alt="JioMart" height="24" loading="lazy">
  </div>
</div>
```

```css
.hero-trust {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-top: 1.5rem;
  flex-wrap: wrap;
}

.trust-label {
  font-size: var(--font-size-sm);
  color: var(--color-text-muted);
  white-space: nowrap;
}

.trust-logos {
  display: flex;
  align-items: center;
  gap: 1.25rem;
  flex-wrap: wrap;
}

.trust-logos img {
  height: 24px;
  width: auto;
  filter: grayscale(60%);
  opacity: 0.75;
  transition: filter var(--transition-base), opacity var(--transition-base);
}

.trust-logos img:hover {
  filter: grayscale(0%);
  opacity: 1;
}
```

---

## SECTION 4 — STATS / NUMBERS SECTION

**File to modify:** Find the section that shows business stats (clients, sellers, etc.) — likely `src/components/Stats.astro` or inside an index page section

### 4.1 Make the Numbers Count Up on Scroll

Find each stat number element and add a `data-count` attribute with the target number:

```html
<!-- Example — apply to each stat card's number element -->
<span class="stat-number" data-count="500">0</span>
<span class="stat-suffix">+</span>
```

Add this script to the page (either in a `<script>` tag in the component or in a shared `src/scripts/animations.js` file):

```javascript
function animateCounters() {
  const counters = document.querySelectorAll('.stat-number[data-count]');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !entry.target.dataset.animated) {
        entry.target.dataset.animated = 'true';
        const target = parseInt(entry.target.dataset.count, 10);
        const duration = 1800;
        const start = performance.now();

        function update(now) {
          const elapsed = now - start;
          const progress = Math.min(elapsed / duration, 1);
          // Ease-out cubic
          const eased = 1 - Math.pow(1 - progress, 3);
          entry.target.textContent = Math.floor(eased * target);
          if (progress < 1) requestAnimationFrame(update);
          else entry.target.textContent = target;
        }

        requestAnimationFrame(update);
      }
    });
  }, { threshold: 0.5 });

  counters.forEach(el => observer.observe(el));
}

document.addEventListener('DOMContentLoaded', animateCounters);
```

### 4.2 Style the Stats Section

Update the stats container:

```css
.stats-section {
  background: var(--color-secondary);
  padding: var(--space-3xl) 0;
  position: relative;
  overflow: hidden;
}

.stats-section::before {
  content: '';
  position: absolute;
  inset: 0;
  background: url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.03'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
  gap: var(--space-xl);
  position: relative;
  z-index: 1;
}

.stat-card {
  text-align: center;
  padding: var(--space-lg);
}

.stat-number {
  display: block;
  font-family: var(--font-heading);
  font-size: var(--font-size-5xl);
  font-weight: 800;
  color: var(--color-primary);
  line-height: 1;
  margin-bottom: 4px;
}

.stat-suffix {
  font-size: var(--font-size-3xl);
  color: var(--color-primary);
  font-weight: 800;
}

.stat-label {
  font-size: var(--font-size-sm);
  color: rgba(255, 255, 255, 0.7);
  margin-top: 8px;
  line-height: 1.4;
}

.stat-divider {
  width: 1px;
  background: rgba(255, 255, 255, 0.1);
  align-self: stretch;
}

@media (max-width: 640px) {
  .stat-divider { display: none; }
  .stats-grid { grid-template-columns: repeat(2, 1fr); gap: var(--space-lg); }
}
```

---

## SECTION 5 — SERVICES SECTION

**File to modify:** `src/pages/services/website-development.astro` and all other service pages, plus `src/components/ServicesGrid.astro` (or similar)

### 5.1 Upgrade Service Cards with Hover Interactions

Find the service card component and update its styles:

```css
.service-card {
  background: var(--color-bg-card);
  border-radius: var(--radius-lg);
  padding: var(--space-xl);
  border: 1px solid var(--color-border);
  transition: transform var(--transition-base), box-shadow var(--transition-base), border-color var(--transition-base);
  position: relative;
  overflow: hidden;
  cursor: default;
}

/* Top accent bar that expands on hover */
.service-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 3px;
  background: var(--color-primary);
  transform: scaleX(0);
  transform-origin: left;
  transition: transform var(--transition-slow);
}

.service-card:hover {
  transform: translateY(-6px);
  box-shadow: var(--shadow-lg);
  border-color: rgba(255, 107, 43, 0.2);
}

.service-card:hover::before {
  transform: scaleX(1);
}

/* Icon container inside each card */
.service-icon {
  width: 56px;
  height: 56px;
  border-radius: var(--radius-md);
  background: var(--color-primary-light);
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: var(--space-lg);
  transition: background var(--transition-base), transform var(--transition-base);
}

.service-card:hover .service-icon {
  background: var(--color-primary);
  transform: scale(1.05) rotate(-3deg);
}

.service-icon img, .service-icon svg {
  width: 28px;
  height: 28px;
  transition: filter var(--transition-base);
}

.service-card:hover .service-icon img,
.service-card:hover .service-icon svg {
  filter: brightness(0) invert(1);
}

.service-title {
  font-family: var(--font-heading);
  font-size: var(--font-size-xl);
  font-weight: 600;
  color: var(--color-secondary);
  margin-bottom: var(--space-sm);
}

.service-description {
  font-size: var(--font-size-base);
  color: var(--color-text-secondary);
  line-height: 1.7;
  margin-bottom: var(--space-lg);
}

.service-link {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  color: var(--color-primary);
  font-weight: 600;
  font-size: var(--font-size-sm);
  text-decoration: none;
  transition: gap var(--transition-fast);
}

.service-link:hover {
  gap: 10px;
}

.service-link .arrow {
  transition: transform var(--transition-fast);
}

.service-link:hover .arrow {
  transform: translateX(3px);
}
```

### 5.2 Add Scroll-Triggered Reveal for Service Cards

Add this script (in a shared animations file or inside the relevant page/component):

```javascript
function initScrollAnimations() {
  const elements = document.querySelectorAll('.animate-on-scroll');

  if (!elements.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        // Stagger cards: each delays by 80ms × its index within visible batch
        setTimeout(() => {
          entry.target.classList.add('is-visible');
        }, entry.target.dataset.delay || 0);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15, rootMargin: '0px 0px -60px 0px' });

  elements.forEach((el, i) => {
    el.dataset.delay = (i % 3) * 80; // stagger in groups of 3
    observer.observe(el);
  });
}

document.addEventListener('DOMContentLoaded', initScrollAnimations);
```

Add `class="animate-on-scroll"` to each `.service-card` element in the HTML.

---

## SECTION 6 — TESTIMONIALS / SOCIAL PROOF

**File to modify:** `src/components/Testimonials.astro` (or wherever testimonials are rendered)

### 6.1 Add Auto-Scrolling Testimonial Marquee

If the site currently shows static testimonials, replace the layout with an auto-scrolling marquee for "alive" feel. Wrap existing testimonial cards in:

```html
<div class="testimonials-track-wrapper" aria-label="Customer testimonials">
  <div class="testimonials-track">
    <!-- Repeat all testimonial cards TWICE for infinite loop effect -->
    <!-- Card 1 -->
    <div class="testimonial-card">...</div>
    <!-- Card 2 -->
    <div class="testimonial-card">...</div>
    <!-- ... all cards ... -->
    <!-- Duplicate all cards below for seamless loop -->
    <div class="testimonial-card" aria-hidden="true">...</div>
    <!-- ... duplicates ... -->
  </div>
</div>
```

```css
.testimonials-section {
  padding: var(--space-3xl) 0;
  background: var(--color-bg-soft);
  overflow: hidden;
}

.testimonials-track-wrapper {
  overflow: hidden;
  mask-image: linear-gradient(to right, transparent, black 10%, black 90%, transparent);
  -webkit-mask-image: linear-gradient(to right, transparent, black 10%, black 90%, transparent);
}

.testimonials-track {
  display: flex;
  gap: var(--space-lg);
  width: max-content;
  animation: marquee 30s linear infinite;
}

/* Pause on hover — accessibility and usability */
.testimonials-track:hover,
.testimonials-track-wrapper:focus-within .testimonials-track {
  animation-play-state: paused;
}

@keyframes marquee {
  from { transform: translateX(0); }
  to   { transform: translateX(-50%); } /* Move by 50% since cards are duplicated */
}

.testimonial-card {
  background: var(--color-bg-card);
  border-radius: var(--radius-lg);
  padding: var(--space-xl);
  border: 1px solid var(--color-border);
  width: 320px;
  flex-shrink: 0;
  box-shadow: var(--shadow-sm);
}

.testimonial-stars {
  color: #F59E0B;
  font-size: var(--font-size-base);
  margin-bottom: var(--space-md);
  letter-spacing: 2px;
}

.testimonial-quote {
  font-size: var(--font-size-base);
  color: var(--color-text-secondary);
  line-height: 1.7;
  margin-bottom: var(--space-lg);
  font-style: italic;
}

.testimonial-author {
  display: flex;
  align-items: center;
  gap: 10px;
}

.author-avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: var(--color-primary-light);
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  font-size: var(--font-size-sm);
  color: var(--color-primary);
  flex-shrink: 0;
}

.author-name {
  font-weight: 600;
  font-size: var(--font-size-sm);
  color: var(--color-secondary);
}

.author-business {
  font-size: var(--font-size-xs);
  color: var(--color-text-muted);
}

@media (prefers-reduced-motion: reduce) {
  .testimonials-track {
    animation: none;
    flex-wrap: wrap;
    width: 100%;
    justify-content: center;
  }
}
```

---

## SECTION 7 — PRICING / PACKAGES SECTION

**File to modify:** Any page or component that displays service pricing or packages

### 7.1 Add a "Popular" Highlight and Hover Depth to Pricing Cards

```css
.pricing-card {
  background: var(--color-bg-card);
  border-radius: var(--radius-lg);
  padding: var(--space-2xl) var(--space-xl);
  border: 1px solid var(--color-border);
  transition: transform var(--transition-base), box-shadow var(--transition-base);
  position: relative;
}

.pricing-card:hover {
  transform: translateY(-4px);
  box-shadow: var(--shadow-md);
}

.pricing-card--popular {
  border: 2px solid var(--color-primary);
  box-shadow: var(--shadow-primary);
}

.pricing-card--popular::before {
  content: '⭐ Most Popular';
  position: absolute;
  top: -14px;
  left: 50%;
  transform: translateX(-50%);
  background: var(--color-primary);
  color: white;
  font-size: var(--font-size-xs);
  font-weight: 700;
  padding: 4px 16px;
  border-radius: var(--radius-full);
  white-space: nowrap;
  letter-spacing: 0.5px;
}

.pricing-price {
  font-family: var(--font-heading);
  font-size: var(--font-size-4xl);
  font-weight: 800;
  color: var(--color-secondary);
}

.pricing-price .currency {
  font-size: var(--font-size-xl);
  font-weight: 600;
  vertical-align: super;
  color: var(--color-text-secondary);
}

.pricing-features li {
  display: flex;
  align-items: flex-start;
  gap: 8px;
  padding: 6px 0;
  font-size: var(--font-size-sm);
  color: var(--color-text-secondary);
  border-bottom: 1px solid var(--color-border);
}

.pricing-features li::before {
  content: '✓';
  color: var(--color-accent);
  font-weight: 700;
  flex-shrink: 0;
  margin-top: 1px;
}
```

---

## SECTION 8 — WHATSAPP FLOATING BUTTON

**File to modify:** `src/layouts/BaseLayout.astro` (add globally, visible on all pages)

Add before the closing `</body>` tag:

```html
<a
  href="https://wa.me/91XXXXXXXXXX?text=Hi%20eCommittra%2C%20I%20want%20a%20free%20consultation"
  class="whatsapp-fab"
  target="_blank"
  rel="noopener noreferrer"
  aria-label="Chat with us on WhatsApp"
>
  <!-- WhatsApp SVG icon -->
  <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="white" aria-hidden="true">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
  </svg>
  <span class="whatsapp-fab-label">Chat with Us</span>
</a>
```

```css
.whatsapp-fab {
  position: fixed;
  bottom: 24px;
  right: 24px;
  z-index: var(--z-toast);
  display: flex;
  align-items: center;
  gap: 8px;
  background: #25D366;
  color: white;
  text-decoration: none;
  padding: 12px 18px 12px 14px;
  border-radius: var(--radius-full);
  box-shadow: 0 4px 20px rgba(37, 211, 102, 0.4);
  font-weight: 600;
  font-size: var(--font-size-sm);
  font-family: var(--font-body);
  transition: transform var(--transition-fast), box-shadow var(--transition-fast), padding var(--transition-slow);
  animation: pulseRing 2.5s infinite;
  animation-name: whatsappPulse;
  white-space: nowrap;
}

@keyframes whatsappPulse {
  0%   { box-shadow: 0 0 0 0 rgba(37, 211, 102, 0.5); }
  70%  { box-shadow: 0 0 0 14px rgba(37, 211, 102, 0); }
  100% { box-shadow: 0 0 0 0 rgba(37, 211, 102, 0); }
}

.whatsapp-fab:hover {
  transform: scale(1.05);
  box-shadow: 0 6px 28px rgba(37, 211, 102, 0.5);
  animation: none;
}

.whatsapp-fab-label {
  display: none;
}

@media (min-width: 768px) {
  .whatsapp-fab-label {
    display: inline;
  }
}

@media (max-width: 767px) {
  .whatsapp-fab {
    padding: 14px;
    border-radius: 50%;
  }
}
```

**IMPORTANT:** Replace `91XXXXXXXXXX` in the WhatsApp href with the actual eCommittra WhatsApp business number (with country code, no + or spaces).

---

## SECTION 9 — SCROLL PROGRESS INDICATOR

**File to modify:** `src/layouts/BaseLayout.astro`

Add inside `<body>` (as the very first element after the opening tag):

```html
<div class="scroll-progress" id="scrollProgress" role="progressbar" aria-label="Page scroll progress" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100"></div>
```

```css
.scroll-progress {
  position: fixed;
  top: 0;
  left: 0;
  height: 3px;
  width: 0%;
  background: linear-gradient(90deg, var(--color-primary), var(--color-accent));
  z-index: calc(var(--z-sticky) + 1);
  transition: width 50ms linear;
  pointer-events: none;
}
```

```javascript
<script>
  const bar = document.getElementById('scrollProgress');
  function updateBar() {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const pct = docHeight > 0 ? Math.round((scrollTop / docHeight) * 100) : 0;
    bar.style.width = pct + '%';
    bar.setAttribute('aria-valuenow', pct);
  }
  window.addEventListener('scroll', updateBar, { passive: true });
  updateBar();
</script>
```

---

## SECTION 10 — CONTACT / CTA BANNER SECTION

**File to modify:** `src/components/CTABanner.astro` (or wherever the bottom CTA is)

### 10.1 Add a Visually Engaging CTA Section

Replace the plain CTA section with:

```css
.cta-section {
  background: linear-gradient(135deg, var(--color-secondary) 0%, #2D3F6B 100%);
  padding: var(--space-3xl) 0;
  position: relative;
  overflow: hidden;
  text-align: center;
}

.cta-section::before {
  content: '';
  position: absolute;
  width: 500px;
  height: 500px;
  top: -250px;
  right: -100px;
  background: radial-gradient(circle, rgba(255, 107, 43, 0.15) 0%, transparent 65%);
  border-radius: 50%;
  pointer-events: none;
}

.cta-section::after {
  content: '';
  position: absolute;
  width: 300px;
  height: 300px;
  bottom: -150px;
  left: -50px;
  background: radial-gradient(circle, rgba(0, 200, 150, 0.12) 0%, transparent 65%);
  border-radius: 50%;
  pointer-events: none;
}

.cta-eyebrow {
  font-size: var(--font-size-sm);
  font-weight: 600;
  letter-spacing: 2px;
  text-transform: uppercase;
  color: var(--color-primary);
  margin-bottom: var(--space-md);
}

.cta-heading {
  font-family: var(--font-heading);
  font-size: var(--font-size-4xl);
  font-weight: 800;
  color: white;
  margin-bottom: var(--space-lg);
  line-height: 1.2;
}

.cta-subtext {
  font-size: var(--font-size-lg);
  color: rgba(255, 255, 255, 0.7);
  margin-bottom: var(--space-2xl);
  max-width: 560px;
  margin-left: auto;
  margin-right: auto;
  line-height: 1.7;
}

.cta-buttons {
  display: flex;
  gap: var(--space-md);
  justify-content: center;
  flex-wrap: wrap;
}

@media (max-width: 640px) {
  .cta-heading { font-size: var(--font-size-3xl); }
  .cta-buttons { flex-direction: column; align-items: center; }
  .cta-buttons a { width: 100%; max-width: 280px; justify-content: center; }
}
```

---

## SECTION 11 — FOOTER

**File to modify:** `src/components/Footer.astro`

### 11.1 Footer Responsive Grid

Ensure the footer uses a responsive grid and has proper spacing:

```css
.footer {
  background: var(--color-secondary);
  color: rgba(255, 255, 255, 0.75);
  padding: var(--space-3xl) 0 var(--space-xl);
}

.footer-grid {
  display: grid;
  grid-template-columns: 2fr repeat(3, 1fr);
  gap: var(--space-2xl);
}

.footer-brand-description {
  font-size: var(--font-size-sm);
  line-height: 1.7;
  color: rgba(255, 255, 255, 0.6);
  margin-top: var(--space-md);
  max-width: 280px;
}

.footer-heading {
  font-weight: 600;
  font-size: var(--font-size-sm);
  letter-spacing: 1px;
  text-transform: uppercase;
  color: white;
  margin-bottom: var(--space-md);
}

.footer-links {
  list-style: none;
  padding: 0;
  margin: 0;
}

.footer-links li {
  margin-bottom: var(--space-sm);
}

.footer-links a {
  font-size: var(--font-size-sm);
  color: rgba(255, 255, 255, 0.6);
  text-decoration: none;
  transition: color var(--transition-fast);
}

.footer-links a:hover {
  color: var(--color-primary);
}

.footer-bottom {
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  margin-top: var(--space-2xl);
  padding-top: var(--space-lg);
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: var(--space-md);
  font-size: var(--font-size-sm);
}

@media (max-width: 768px) {
  .footer-grid {
    grid-template-columns: 1fr 1fr;
    gap: var(--space-xl);
  }
  .footer-brand { grid-column: 1 / -1; }
}

@media (max-width: 480px) {
  .footer-grid { grid-template-columns: 1fr; }
}
```

---

## SECTION 12 — RESPONSIVE TYPOGRAPHY SCALE

**File to modify:** `global.css`

Add fluid typography that scales with viewport:

```css
/* Fluid type scale — adapts from mobile to desktop smoothly */
h1 {
  font-family: var(--font-heading);
  font-size: clamp(2rem, 5vw, 3.5rem);
  font-weight: 800;
  line-height: 1.15;
  color: var(--color-secondary);
}

h2 {
  font-family: var(--font-heading);
  font-size: clamp(1.5rem, 3.5vw, 2.5rem);
  font-weight: 700;
  line-height: 1.25;
  color: var(--color-secondary);
}

h3 {
  font-family: var(--font-heading);
  font-size: clamp(1.125rem, 2.5vw, 1.5rem);
  font-weight: 600;
  line-height: 1.3;
  color: var(--color-secondary);
}

p, li {
  font-size: var(--font-size-base);
  line-height: 1.75;
  color: var(--color-text-secondary);
}

/* Section padding responsive */
.section {
  padding: clamp(3rem, 8vw, 6rem) 0;
}

/* Container */
.container {
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 clamp(1rem, 4vw, 2rem);
}
```

---

## SECTION 13 — GLOBAL SCRIPT FILE

Create a new file at `src/scripts/main.js` and import it in `BaseLayout.astro` using `<script src="/scripts/main.js">` or via Astro's script handling. Paste the following (consolidates all JS from above):

```javascript
// === Scroll Animations (Intersection Observer) ===
function initScrollAnimations() {
  const elements = document.querySelectorAll('.animate-on-scroll');
  if (!elements.length) return;
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        setTimeout(() => entry.target.classList.add('is-visible'), parseInt(entry.target.dataset.delay) || 0);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });
  elements.forEach((el, i) => { el.dataset.delay = (i % 4) * 80; observer.observe(el); });
}

// === Counter Animation ===
function initCounters() {
  const counters = document.querySelectorAll('.stat-number[data-count]');
  if (!counters.length) return;
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !entry.target.dataset.animated) {
        entry.target.dataset.animated = 'true';
        const target = parseInt(entry.target.dataset.count, 10);
        const duration = 1800;
        const start = performance.now();
        function update(now) {
          const elapsed = now - start;
          const eased = 1 - Math.pow(1 - Math.min(elapsed / duration, 1), 3);
          entry.target.textContent = Math.floor(eased * target);
          if (elapsed < duration) requestAnimationFrame(update);
          else entry.target.textContent = target;
        }
        requestAnimationFrame(update);
      }
    });
  }, { threshold: 0.5 });
  counters.forEach(el => observer.observe(el));
}

// === Sticky Header ===
function initStickyHeader() {
  const header = document.querySelector('header');
  if (!header) return;
  window.addEventListener('scroll', () => {
    header.classList.toggle('scrolled', window.scrollY > 60);
  }, { passive: true });
}

// === Scroll Progress Bar ===
function initScrollProgress() {
  const bar = document.getElementById('scrollProgress');
  if (!bar) return;
  window.addEventListener('scroll', () => {
    const pct = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
    bar.style.width = Math.min(100, pct) + '%';
  }, { passive: true });
}

// === Mobile Menu ===
function initMobileMenu() {
  const btn = document.querySelector('.hamburger-btn');
  const menu = document.querySelector('.mobile-menu');
  if (!btn || !menu) return;
  btn.addEventListener('click', () => {
    const open = btn.classList.toggle('is-open');
    menu.classList.toggle('is-open', open);
    btn.setAttribute('aria-expanded', open);
  });
}

// === Init All ===
document.addEventListener('DOMContentLoaded', () => {
  initScrollAnimations();
  initCounters();
  initStickyHeader();
  initScrollProgress();
  initMobileMenu();
});
```

---

## SECTION 14 — SERVICE-SPECIFIC PAGE (Website Development)

**File to modify:** `src/pages/services/website-development.astro`

This is the URL the client provided. Ensure this page has:

1. A **hero with breadcrumb** at the top (`Home > Services > Website Development`)
2. **Feature highlights grid** (3 columns, with icons, using `.service-card` styles from Section 5)
3. **Process steps** — a numbered timeline of how eCommittra delivers the service (e.g. Step 1: Discovery → Step 2: Design → Step 3: Build → Step 4: Launch)
4. **Portfolio/samples** section (even if placeholder images are used)
5. **FAQ accordion** with smooth open/close animation
6. **CTA banner** at the bottom of the page

Apply `.animate-on-scroll` to every major block on this page so it animates in as the user scrolls.

For the FAQ accordion, add this HTML pattern:

```html
<div class="faq-item">
  <button class="faq-question" aria-expanded="false">
    What is included in your website development service?
    <span class="faq-icon" aria-hidden="true">+</span>
  </button>
  <div class="faq-answer" hidden>
    <p>Your answer text here...</p>
  </div>
</div>
```

```css
.faq-item {
  border-bottom: 1px solid var(--color-border);
}

.faq-question {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding: var(--space-lg) 0;
  background: none;
  border: none;
  text-align: left;
  font-size: var(--font-size-lg);
  font-weight: 500;
  color: var(--color-secondary);
  cursor: pointer;
  gap: var(--space-md);
  transition: color var(--transition-fast);
}

.faq-question:hover { color: var(--color-primary); }

.faq-icon {
  font-size: 1.5rem;
  font-weight: 300;
  line-height: 1;
  transition: transform var(--transition-base);
  color: var(--color-primary);
  flex-shrink: 0;
}

.faq-question[aria-expanded="true"] .faq-icon {
  transform: rotate(45deg);
}

.faq-answer {
  overflow: hidden;
  max-height: 0;
  transition: max-height 0.35s ease, padding 0.35s ease;
  padding: 0;
}

.faq-answer.is-open {
  max-height: 600px;
  padding-bottom: var(--space-lg);
}

.faq-answer p {
  color: var(--color-text-secondary);
  line-height: 1.75;
}
```

```javascript
// FAQ Accordion
document.querySelectorAll('.faq-question').forEach(btn => {
  btn.addEventListener('click', () => {
    const expanded = btn.getAttribute('aria-expanded') === 'true';
    // Close all others
    document.querySelectorAll('.faq-question').forEach(b => {
      b.setAttribute('aria-expanded', 'false');
      b.nextElementSibling.classList.remove('is-open');
    });
    // Toggle current
    if (!expanded) {
      btn.setAttribute('aria-expanded', 'true');
      btn.nextElementSibling.classList.add('is-open');
    }
  });
});
```

---

## IMPLEMENTATION CHECKLIST FOR THE AI AGENT

Work through the following in order. Verify each step before moving to the next:

- [ ] **Step 1** — Read all files in `src/` to understand existing structure before writing any code
- [ ] **Step 2** — Add CSS design tokens to `global.css` (Section 1.1)
- [ ] **Step 3** — Add Google Fonts `<link>` to the base layout head (Section 1.2)
- [ ] **Step 4** — Add all `@keyframes` and `.animate-on-scroll` utility to `global.css` (Section 1.3)
- [ ] **Step 5** — Update the Header component: sticky, blur, scroll class, nav CTA button, mobile menu animation (Section 2)
- [ ] **Step 6** — Update the Hero section: gradient bg, entry animations, floating badges, improved CTAs, trust logos (Section 3)
- [ ] **Step 7** — Update the Stats section: count-up animation, dark background style, responsive grid (Section 4)
- [ ] **Step 8** — Update all Service cards: hover effect, icon animation, scroll reveal (Section 5)
- [ ] **Step 9** — Update Testimonials: auto-scrolling marquee layout (Section 6)
- [ ] **Step 10** — Update Pricing cards: popular highlight, hover lift (Section 7)
- [ ] **Step 11** — Add WhatsApp FAB globally in BaseLayout (Section 8) — **update phone number**
- [ ] **Step 12** — Add scroll progress bar to BaseLayout (Section 9)
- [ ] **Step 13** — Update CTA banner section (Section 10)
- [ ] **Step 14** — Update Footer grid to be responsive (Section 11)
- [ ] **Step 15** — Add fluid typography and `.container` utility to global CSS (Section 12)
- [ ] **Step 16** — Create `src/scripts/main.js` with all consolidated JS (Section 13)
- [ ] **Step 17** — Enhance `/services/website-development` page specifically with breadcrumb, process timeline, FAQ accordion, and bottom CTA (Section 14)
- [ ] **Step 18** — Add `class="animate-on-scroll"` to every major section, card, and content block across all pages
- [ ] **Step 19** — Test all pages on a 375px viewport (iPhone SE) and a 1280px viewport to verify no layout breaks
- [ ] **Step 20** — Run Astro build (`npm run build`) and confirm zero errors before completing

---

## IMPORTANT CONSTRAINTS

- Do NOT change any existing copy/text content — only enhance visual presentation
- Do NOT remove any existing page routes or links
- Do NOT add heavy third-party libraries (no jQuery, no GSAP, no Bootstrap) — use vanilla JS and CSS only
- Do NOT use `!important` in CSS unless absolutely necessary to override a third-party default
- All animations must respect `@media (prefers-reduced-motion: reduce)` — wrap non-essential animations in a check:

```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

- WhatsApp phone number must be updated with the actual number before deployment
- All image `src` paths in examples (logos, avatars) are placeholders — use actual paths from the project's `public/` folder
