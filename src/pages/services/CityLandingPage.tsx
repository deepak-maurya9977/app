// City Landing Page template component
// Renders a fully structured city-specific service page with SEO metadata and structured data
// Requirements: 7.1, 7.5, 7.7, 7.9

import { Link } from 'react-router-dom';
import { Check, Phone, MessageCircle, MapPin, ArrowRight } from 'lucide-react';
import { SEO } from '@/seo/SEO';
import { SchemaInjector } from '@/seo/SchemaInjector';
import FAQAccordion from '@/components/FAQAccordion';
import ScrollReveal from '@/components/ScrollReveal';
import ContactForm from '@/components/ContactForm';
import HeroBanner from '@/components/HeroBanner';
import type { CityPageData } from '@/lib/cityPageData';
import type { ServiceSchema, FAQPageSchema } from '@/seo/types';
import { NAP, BUSINESS } from '@/lib/constants';

// The five primary cities always included in areaServed (Req 6.4 / 7.7)
const PRIMARY_CITIES = ['India', 'Delhi', 'Mumbai', 'Bangalore', 'Hyderabad', 'Chennai'];

interface CityLandingPageProps {
  data: CityPageData;
}

export default function CityLandingPage({ data }: CityLandingPageProps) {
  // Req 7.7 / error handling: if data is undefined/null, show 404-equivalent
  if (!data) {
    console.error(
      '[CityLandingPage] Page data is undefined. ' +
        'Ensure an entry exists in src/lib/cityPageData.ts for this city/service combination.'
    );
    return (
      <div className="min-h-screen flex flex-col items-center justify-center px-4 text-center bg-surface">
        <div className="max-w-md">
          <span className="text-7xl font-display font-bold text-primary">404</span>
          <h1 className="mt-4 text-2xl font-display font-semibold text-text-primary">
            Page Not Found
          </h1>
          <p className="mt-3 text-text-secondary">
            We couldn't find the city service page you were looking for. It may not have been
            published yet.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/services"
              className="inline-flex items-center gap-2 bg-primary text-white font-medium px-6 py-3 rounded-lg hover:bg-primary/90 transition-colors"
            >
              Browse All Services
            </Link>
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 border border-primary text-primary font-medium px-6 py-3 rounded-lg hover:bg-primary/5 transition-colors"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // Build the Service schema — areaServed = specific city + the five primary cities (deduped)
  const areaServed = Array.from(new Set([data.city, ...PRIMARY_CITIES]));

  const serviceSchema: ServiceSchema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: `${data.serviceName} in ${data.city}`,
    description: data.intro,
    provider: {
      '@type': 'Organization',
      name: NAP.name,
      url: NAP.website,
    },
    serviceType: data.serviceName,
    areaServed,
  };

  const faqPageSchema: FAQPageSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: data.faq.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
    })),
  };

  return (
    <div>
      {/* SEO meta tags — canonical points to this city page URL (Req 7.5) */}
      <SEO config={data.seoConfig} />

      {/* JSON-LD structured data (Req 7.7) */}
      <SchemaInjector
        schemas={[serviceSchema, faqPageSchema]}
        canonical={data.seoConfig.canonical}
      />

      {/* ── Hero / Intro ──────────────────────────────────────────────────────── */}
      <HeroBanner
        title={`${data.serviceName} in ${data.city}`}
        subtitle={`Professional ${data.serviceName.toLowerCase()} services for businesses in ${data.city}. Expert account management, growth strategy, and hands-on execution.`}
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Services', href: '/services' },
          { label: data.serviceName, href: data.parentServiceHref },
          { label: data.city, href: '#' },
        ]}
      />

      {/* ── City-Specific Intro ───────────────────────────────────────────────── */}
      <section className="section-padding bg-white">
        <div className="container-main">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <ScrollReveal>
              <div className="bg-gradient-to-br from-primary/10 to-accent/10 rounded-2xl p-8 md:p-12 flex items-center justify-center min-h-[280px]">
                <div className="text-center">
                  <MapPin className="w-16 h-16 text-primary mx-auto mb-4" aria-hidden="true" />
                  <span className="block text-4xl md:text-5xl font-display font-bold text-gradient-orange">
                    {data.city}
                  </span>
                  <p className="mt-2 text-text-secondary font-medium">{data.serviceName}</p>
                </div>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={0.1}>
              <span className="text-xs font-utility font-bold uppercase tracking-wider text-primary">
                {data.city} — Local Expertise
              </span>
              {/* Single H1 per page (Req 4.1) — includes primary keyword (service + city) */}
              <h1 className="mt-2 text-2xl md:text-3xl font-display font-semibold text-text-primary">
                {data.serviceName} in {data.city}
              </h1>
              <p className="mt-4 text-text-secondary leading-relaxed">{data.intro}</p>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* ── Why Choose eCommittra (City-Specific) ────────────────────────────── */}
      <section className="section-padding bg-surface">
        <div className="container-main">
          <ScrollReveal>
            <h2 className="text-2xl md:text-3xl font-display font-semibold text-text-primary text-center mb-10">
              Why {data.city} Businesses Choose eCommittra
            </h2>
          </ScrollReveal>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
            <ScrollReveal delay={0.05}>
              <p className="text-text-secondary leading-relaxed">{data.whyChooseContent}</p>
            </ScrollReveal>
            <ScrollReveal delay={0.1}>
              <ul className="space-y-4">
                {[
                  `Deep knowledge of the ${data.city} marketplace landscape`,
                  'Dedicated account manager assigned to your business',
                  'Monthly performance reviews with real Seller Central data',
                  'Proactive alerts — you hear from us before problems escalate',
                  'Proven track record with 500+ sellers across India',
                ].map((point, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <Check
                      className="w-5 h-5 text-primary flex-shrink-0 mt-0.5"
                      aria-hidden="true"
                    />
                    <span className="text-text-primary">{point}</span>
                  </li>
                ))}
              </ul>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* ── Local Challenges ─────────────────────────────────────────────────── */}
      <section className="section-padding bg-white">
        <div className="container-main max-w-4xl mx-auto">
          <ScrollReveal>
            <h2 className="text-2xl md:text-3xl font-display font-semibold text-text-primary text-center mb-6">
              Challenges Unique to {data.city} Sellers
            </h2>
          </ScrollReveal>
          <ScrollReveal delay={0.1}>
            <div className="bg-surface rounded-2xl p-6 md:p-10 border border-gray-100">
              <p className="text-text-secondary leading-relaxed">{data.localChallenges}</p>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ── Our Process ──────────────────────────────────────────────────────── */}
      <section className="section-padding bg-surface">
        <div className="container-main max-w-4xl mx-auto">
          <ScrollReveal>
            <h2 className="text-2xl md:text-3xl font-display font-semibold text-text-primary text-center mb-10">
              How We Work With {data.city} Clients
            </h2>
          </ScrollReveal>
          <ScrollReveal delay={0.1}>
            <p className="text-text-secondary leading-relaxed">{data.processContent}</p>
          </ScrollReveal>
        </div>
      </section>

      {/* ── Internal Navigation Links (Req 7.9) ──────────────────────────────── */}
      {/* At least two internal links: one to parent service page, one to /contact */}
      <section className="section-padding bg-white">
        <div className="container-main">
          <ScrollReveal>
            <h2 className="text-2xl font-display font-semibold text-text-primary text-center mb-8">
              Explore More
            </h2>
          </ScrollReveal>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            {/* Internal link 1: parent service page (Req 7.9) */}
            <Link
              to={data.parentServiceHref}
              className="inline-flex items-center gap-2 bg-primary text-white font-medium px-6 py-3.5 rounded-lg hover:bg-primary/90 hover:shadow-lg transition-all hover:scale-[1.02]"
            >
              <ArrowRight className="w-5 h-5" aria-hidden="true" />
              View {data.serviceName} Overview
            </Link>
            {/* Internal link 2: /contact (Req 7.9) */}
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 border-2 border-primary text-primary font-medium px-6 py-3.5 rounded-lg hover:bg-primary hover:text-white transition-all"
            >
              <Phone className="w-5 h-5" aria-hidden="true" />
              Contact Us
            </Link>
          </div>
        </div>
      </section>

      {/* ── FAQ Accordion ─────────────────────────────────────────────────────── */}
      <section className="section-padding bg-surface">
        <div className="max-w-3xl mx-auto px-4">
          <ScrollReveal>
            <h2 className="text-2xl md:text-3xl font-display font-semibold text-text-primary text-center mb-8">
              Frequently Asked Questions
            </h2>
          </ScrollReveal>
          <ScrollReveal delay={0.1}>
            <FAQAccordion items={data.faq} />
          </ScrollReveal>
        </div>
      </section>

      {/* ── CTA Banner ───────────────────────────────────────────────────────── */}
      <section className="gradient-cta py-16 md:py-20">
        <div className="container-main text-center">
          <ScrollReveal>
            <h2 className="text-2xl md:text-4xl font-display font-semibold text-white mb-4">
              Start Growing Your {data.city} Business Today
            </h2>
            <p className="text-white/90 mb-8 max-w-xl mx-auto">
              Let our {data.city}-experienced team handle your{' '}
              {data.serviceName.toLowerCase()} while you focus on building your brand.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href={`tel:${BUSINESS.phone1}`}
                className="inline-flex items-center gap-2 bg-white text-primary font-medium px-8 py-3.5 rounded-lg hover:shadow-lg transition-all hover:scale-[1.02]"
              >
                <Phone className="w-5 h-5" aria-hidden="true" />
                Call {BUSINESS.phone1}
              </a>
              <a
                href={BUSINESS.whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-transparent border-2 border-white text-white font-medium px-8 py-3.5 rounded-lg hover:bg-white hover:text-primary transition-all"
              >
                <MessageCircle className="w-5 h-5" aria-hidden="true" />
                WhatsApp Us
              </a>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ── Contact Form ─────────────────────────────────────────────────────── */}
      <section className="section-padding bg-surface">
        <div className="container-main max-w-2xl">
          <ScrollReveal>
            <div className="bg-white rounded-2xl p-6 md:p-10 shadow-card">
              <h3 className="text-xl font-display font-semibold text-text-primary text-center mb-6">
                Get a Free Consultation for {data.city}
              </h3>
              <ContactForm showService />
            </div>
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
}
