import { Check, ArrowRight, Phone, MessageCircle } from 'lucide-react';
import HeroBanner from '@/components/HeroBanner';
import ScrollReveal from '@/components/ScrollReveal';
import FAQAccordion from '@/components/FAQAccordion';
import ContactForm from '@/components/ContactForm';
import SchemaInjector from '@/seo/SchemaInjector';
import { BUSINESS, PLATFORM_LOGOS, NAP } from '@/lib/constants';
import type { ServiceSchema, FAQPageSchema } from '@/seo/types';

interface ServicePageTemplateProps {
  serviceName: string;
  heroDescription: string;
  overview: string;
  features: string[];
  benefits: { title: string; description: string; icon: string }[];
  process: { step: number; title: string; description: string }[];
  faq: { question: string; answer: string }[];
  platforms?: string[];
}

const iconMap: Record<string, React.ReactNode> = {
  Check: <Check className="w-6 h-6 text-primary" />,
  ArrowRight: <ArrowRight className="w-6 h-6 text-primary" />,
  Phone: <Phone className="w-6 h-6 text-primary" />,
  MessageCircle: <MessageCircle className="w-6 h-6 text-primary" />,
  Award: <span className="text-primary text-2xl">&#9733;</span>,
  Zap: <span className="text-primary text-2xl">&#9889;</span>,
  Shield: <span className="text-primary text-2xl">&#128737;</span>,
  TrendingUp: <span className="text-primary text-2xl">&#128200;</span>,
  Users: <span className="text-primary text-2xl">&#128101;</span>,
  Target: <span className="text-primary text-2xl">&#127919;</span>,
};

export default function ServicePageTemplate({
  serviceName,
  heroDescription,
  overview,
  features,
  benefits,
  process,
  faq,
  platforms = ['Amazon', 'Flipkart', 'Meesho', 'JioMart'],
}: ServicePageTemplateProps) {
  // --- Structured Data (Requirements 6.1, 6.2, 6.4) ---
  const TARGET_CITIES = ['India', 'Delhi', 'Mumbai', 'Bangalore', 'Hyderabad', 'Chennai'];

  const serviceSchema: ServiceSchema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: serviceName,
    description: overview,
    provider: {
      '@type': 'Organization',
      name: NAP.name,
      url: NAP.website,
    },
    serviceType: serviceName,
    areaServed: TARGET_CITIES,
  };

  const faqPageSchema: FAQPageSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faq.map((item) => ({
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
      <SchemaInjector schemas={[serviceSchema, faqPageSchema]} />
      <HeroBanner
        title={serviceName}
        subtitle={heroDescription}
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Services', href: '/services' },
          { label: serviceName, href: '#' },
        ]}
      />

      {/* Overview Section */}
      <section className="section-padding bg-white">
        <div className="container-main">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <ScrollReveal>
              <div className="bg-gradient-to-br from-primary/10 to-accent/10 rounded-2xl p-8 md:p-12 flex items-center justify-center min-h-[300px] animate-on-scroll">
                <div className="text-center">
                  <span className="text-6xl md:text-8xl font-display font-bold text-gradient-orange">
                    {serviceName.charAt(0)}
                  </span>
                  <p className="mt-2 text-text-secondary font-medium">{serviceName}</p>
                </div>
              </div>
            </ScrollReveal>
            <ScrollReveal delay={0.1}>
              <div className="animate-on-scroll">
                <span className="text-xs font-utility font-bold uppercase tracking-wider text-primary">
                  Service Overview
                </span>
                <h2 className="mt-2 text-2xl md:text-3xl font-display font-semibold text-text-primary">
                  {serviceName}
                </h2>
                <p className="mt-4 text-text-secondary leading-relaxed">{overview}</p>
                <ul className="mt-6 space-y-3">
                  {features.map((f, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                      <span className="text-text-primary">{f}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="section-padding bg-surface">
        <div className="container-main">
          <ScrollReveal>
            <h2 className="text-2xl md:text-3xl font-display font-semibold text-text-primary text-center mb-10">
              Why Choose Our {serviceName}
            </h2>
          </ScrollReveal>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {benefits.map((b, i) => (
              <ScrollReveal key={i} delay={i * 0.1}>
                <div className="bg-white rounded-xl p-6 shadow-card border border-gray-100 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 relative overflow-hidden group">
                  <div className="absolute top-0 left-0 right-0 h-[3px] bg-primary transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
                  <div className="w-14 h-14 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary group-hover:scale-105 group-hover:-rotate-3 transition-all duration-300">
                    <div className="group-hover:filter group-hover:brightness-0 group-hover:invert">
                      {iconMap[b.icon] || <Check className="w-6 h-6 text-primary" />}
                    </div>
                  </div>
                  <h3 className="font-semibold text-lg text-text-primary mb-2">{b.title}</h3>
                  <p className="text-sm text-text-secondary leading-relaxed">{b.description}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="section-padding bg-white">
        <div className="container-main">
          <ScrollReveal>
            <h2 className="text-2xl md:text-3xl font-display font-semibold text-text-primary text-center mb-10">
              How It Works
            </h2>
          </ScrollReveal>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {process.map((p, i) => (
              <ScrollReveal key={i} delay={i * 0.1}>
                <div className="relative text-center">
                  <div className="w-14 h-14 rounded-full bg-primary text-white flex items-center justify-center mx-auto mb-4 font-display font-bold text-xl">
                    {p.step}
                  </div>
                  {i < process.length - 1 && (
                    <div className="hidden lg:block absolute top-7 left-[60%] w-[80%] border-t-2 border-dashed border-primary/30" />
                  )}
                  <h3 className="font-semibold text-lg text-text-primary mb-2">{p.title}</h3>
                  <p className="text-sm text-text-secondary">{p.description}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Platforms Covered */}
      <section className="section-padding bg-surface">
        <div className="container-main text-center">
          <ScrollReveal>
            <h2 className="text-2xl font-display font-semibold text-text-primary mb-8">
              Platforms We Cover
            </h2>
          </ScrollReveal>
          <div className="flex flex-wrap justify-center gap-6 md:gap-10">
            {PLATFORM_LOGOS.filter(p => platforms.includes(p.name)).map((p) => (
              <ScrollReveal key={p.name}>
                <div className="group flex flex-col items-center gap-2">
                  <div className="w-16 h-16 md:w-20 md:h-20 rounded-xl bg-white shadow-card flex items-center justify-center p-3">
                    {p.logo ? (
                      <img src={p.logo} alt={p.name} className="w-full h-full object-contain" />
                    ) : (
                      <span className="text-lg md:text-xl font-display font-bold text-text-muted group-hover:text-primary transition-colors">{p.initials}</span>
                    )}
                  </div>
                  <span className="text-xs text-text-secondary font-medium">{p.name}</span>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="section-padding bg-white">
        <div className="max-w-3xl mx-auto px-4">
          <ScrollReveal>
            <h2 className="text-2xl md:text-3xl font-display font-semibold text-text-primary text-center mb-8">
              Frequently Asked Questions
            </h2>
          </ScrollReveal>
          <ScrollReveal delay={0.1}>
            <FAQAccordion items={faq} />
          </ScrollReveal>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="gradient-cta py-16 md:py-20">
        <div className="container-main text-center">
          <ScrollReveal>
            <h2 className="text-2xl md:text-4xl font-display font-semibold text-white mb-4">
              Ready to Get Started?
            </h2>
            <p className="text-white/90 mb-8 max-w-xl mx-auto">
              Let our experts handle your {serviceName.toLowerCase()} while you focus on growing your business.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href={`tel:${BUSINESS.phone1}`}
                className="inline-flex items-center gap-2 bg-white text-primary font-medium px-8 py-3.5 rounded-lg hover:shadow-lg transition-all hover:scale-[1.02]"
              >
                <Phone className="w-5 h-5" />
                Call {BUSINESS.phone1}
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

      {/* Contact Form */}
      <section className="section-padding bg-surface">
        <div className="container-main max-w-2xl">
          <ScrollReveal>
            <div className="bg-white rounded-2xl p-6 md:p-10 shadow-card">
              <h3 className="text-xl font-display font-semibold text-text-primary text-center mb-6">
                Get a Free Consultation
              </h3>
              <ContactForm showService />
            </div>
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
}
