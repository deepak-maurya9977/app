// City landing page template component
// Requirements: 7.1, 7.5, 7.7, 7.9

import { Phone, MessageCircle, MapPin, ArrowRight } from 'lucide-react';
import { SEO } from '@/seo/SEO';
import SchemaInjector from '@/seo/SchemaInjector';
import FAQAccordion from '@/components/FAQAccordion';
import ScrollReveal from '@/components/ScrollReveal';
import type { CityPageData } from '@/lib/cityPageData';
import type { ServiceSchema } from '@/seo/types';
import { NAP, BUSINESS } from '@/lib/constants';

interface CityLandingPageProps {
  data: CityPageData;
}

// City-specific Service schema with city in areaServed (Req 7.7)
const TARGET_CITIES = ['India', 'Delhi', 'Mumbai', 'Bangalore', 'Hyderabad', 'Chennai'];

export default function CityLandingPage({ data }: CityLandingPageProps) {
  // 404-equivalent guard if data is undefined (Req 7.1 error handling)
  if (!data) {
    console.error('[CityLandingPage] No data provided. Check cityPageData.ts for missing entries.');
    return (
      <div className="min-h-screen flex items-center justify-center bg-surface">
        <div className="text-center">
          <h1 className="text-4xl font-display font-bold text-text-primary mb-4">404</h1>
          <p className="text-text-secondary mb-6">This city page could not be found.</p>
          <a href="/" className="text-primary underline">Return to Home</a>
        </div>
      </div>
    );
  }

  // Build city-specific areaServed — include specific city + all target cities, deduplicated
  const areaServedSet = new Set([data.city, ...TARGET_CITIES]);
  const areaServed = Array.from(areaServedSet);

  const cityServiceSchema: ServiceSchema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: `${data.serviceName} in ${data.city}`,
    description: data.seoConfig.description,
    provider: {
      '@type': 'Organization',
      name: NAP.name,
      url: NAP.website,
    },
    serviceType: data.serviceName,
    areaServed,
  };

  return (
    <div>
      {/* SEO meta tags (Req 7.5) */}
      <SEO config={data.seoConfig} />

      {/* Schema injection (Req 7.7) */}
      <SchemaInjector
        schemas={[cityServiceSchema]}
        canonical={data.seoConfig.canonical}
      />

      {/* ─── Hero / Intro Section ─────────────────────────────────────────── */}
      <section className="bg-gradient-to-br from-primary/10 via-white to-accent/10 py-16 md:py-24">
        <div className="container-main">
          <ScrollReveal>
            <div className="flex items-center gap-2 text-sm text-text-secondary mb-4">
              <a href="/" className="hover:text-primary transition-colors">Home</a>
              <span>/</span>
              <a href="/services" className="hover:text-primary transition-colors">Services</a>
              <span>/</span>
              <a href={data.parentServiceHref} className="hover:text-primary transition-colors">
                {data.serviceName}
              </a>
              <span>/</span>
              <span className="text-text-primary">{data.city}</span>
            </div>
            <div className="flex items-center gap-2 text-primary text-sm font-medium uppercase tracking-wider mb-3">
              <MapPin className="w-4 h-4" />
              <span>{data.city}</span>
            </div>
            <h1 className="text-3xl md:text-5xl font-display font-bold text-text-primary mb-6 leading-tight">
              {data.serviceName} in {data.city}
            </h1>
            <p className="text-lg text-text-secondary leading-relaxed max-w-3xl mb-8">
              {data.intro}
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href="/contact"
                className="inline-flex items-center justify-center gap-2 bg-primary text-white font-medium px-8 py-3.5 rounded-lg hover:bg-primary/90 hover:shadow-lg transition-all hover:scale-[1.02]"
              >
                Get Free Consultation
                <ArrowRight className="w-5 h-5" />
              </a>
              <a
                href={`tel:${BUSINESS.phone1}`}
                className="inline-flex items-center justify-center gap-2 bg-white border-2 border-primary text-primary font-medium px-8 py-3.5 rounded-lg hover:bg-primary/5 transition-all"
              >
                <Phone className="w-5 h-5" />
                Call Us Now
              </a>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ─── Why Choose eCommittra in [City] ─────────────────────────────── */}
      <section className="section-padding bg-white">
        <div className="container-main">
          <ScrollReveal>
            <span className="text-xs font-utility font-bold uppercase tracking-wider text-primary">
              Why eCommittra
            </span>
            <h2 className="mt-2 text-2xl md:text-3xl font-display font-semibold text-text-primary mb-6">
              Why Choose eCommittra for {data.serviceName} in {data.city}
            </h2>
            <p className="text-text-secondary leading-relaxed max-w-4xl">
              {data.whyChooseContent}
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* ─── Local Challenges Section ─────────────────────────────────────── */}
      <section className="section-padding bg-surface">
        <div className="container-main">
          <ScrollReveal>
            <span className="text-xs font-utility font-bold uppercase tracking-wider text-primary">
              Local Market Insights
            </span>
            <h2 className="mt-2 text-2xl md:text-3xl font-display font-semibold text-text-primary mb-6">
              {data.serviceName} Challenges in {data.city}
            </h2>
            <p className="text-text-secondary leading-relaxed max-w-4xl">
              {data.localChallenges}
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* ─── Our Process Section ─────────────────────────────────────────── */}
      <section className="section-padding bg-white">
        <div className="container-main">
          <ScrollReveal>
            <span className="text-xs font-utility font-bold uppercase tracking-wider text-primary">
              How We Work
            </span>
            <h2 className="mt-2 text-2xl md:text-3xl font-display font-semibold text-text-primary mb-6">
              Our {data.serviceName} Process in {data.city}
            </h2>
            <p className="text-text-secondary leading-relaxed max-w-4xl">
              {data.processContent}
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* ─── FAQ Section ─────────────────────────────────────────────────── */}
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

      {/* ─── CTA Banner ──────────────────────────────────────────────────── */}
      <section className="gradient-cta py-16 md:py-20">
        <div className="container-main text-center">
          <ScrollReveal>
            <h2 className="text-2xl md:text-4xl font-display font-semibold text-white mb-4">
              Ready to Grow Your Business in {data.city}?
            </h2>
            <p className="text-white/90 mb-8 max-w-xl mx-auto">
              Let eCommittra handle your {data.serviceName.toLowerCase()} in {data.city} while you focus on scaling your business.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href="/contact"
                className="inline-flex items-center gap-2 bg-white text-primary font-medium px-8 py-3.5 rounded-lg hover:shadow-lg transition-all hover:scale-[1.02]"
              >
                <ArrowRight className="w-5 h-5" />
                Get a Free Consultation
              </a>
              <a
                href={BUSINESS.whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-transparent border-2 border-white text-white font-medium px-8 py-3.5 rounded-lg hover:bg-white hover:text-primary transition-all"
              >
                <MessageCircle className="w-5 h-5" />
                WhatsApp Us
              </a>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ─── Internal Links Section (Req 7.9) ───────────────────────────── */}
      <section className="section-padding bg-white">
        <div className="container-main">
          <ScrollReveal>
            <h2 className="text-xl font-display font-semibold text-text-primary mb-6">
              Explore More
            </h2>
            <div className="flex flex-wrap gap-4">
              <a
                href={data.parentServiceHref}
                className="inline-flex items-center gap-2 text-primary font-medium hover:underline transition-colors"
              >
                <ArrowRight className="w-4 h-4" />
                {data.serviceName} — Full Service Page
              </a>
              <a
                href="/contact"
                className="inline-flex items-center gap-2 text-primary font-medium hover:underline transition-colors"
              >
                <ArrowRight className="w-4 h-4" />
                Contact Us for {data.serviceName} in {data.city}
              </a>
              <a
                href="/services"
                className="inline-flex items-center gap-2 text-text-secondary hover:text-primary font-medium hover:underline transition-colors"
              >
                <ArrowRight className="w-4 h-4" />
                All eCommittra Services
              </a>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
}
