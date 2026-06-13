import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  ShoppingCart, Monitor, TrendingUp, Palette, Camera, Store,
  FileText, Smartphone, Package, Award, Heart, Lightbulb,
  ChevronDown, Star, Quote, Check, ArrowRight, Phone, MessageCircle,
  Sparkles
} from 'lucide-react';
import ScrollReveal from '@/components/ScrollReveal';
import StatsCounter from '@/components/StatsCounter';
import FAQAccordion from '@/components/FAQAccordion';
import ContactForm from '@/components/ContactForm';
import {
  BUSINESS, HOME_SERVICES, WHY_CHOOSE_US, PROCESS_STEPS,
  TESTIMONIALS, FAQ_HOME, PLATFORM_LOGOS,
} from '@/lib/constants';

const iconMap: Record<string, React.ReactNode> = {
  ShoppingCart: <ShoppingCart className="w-6 h-6 text-primary" />,
  Monitor: <Monitor className="w-6 h-6 text-primary" />,
  TrendingUp: <TrendingUp className="w-6 h-6 text-primary" />,
  Palette: <Palette className="w-6 h-6 text-primary" />,
  Camera: <Camera className="w-6 h-6 text-primary" />,
  Store: <Store className="w-6 h-6 text-primary" />,
  FileText: <FileText className="w-6 h-6 text-primary" />,
  Smartphone: <Smartphone className="w-6 h-6 text-primary" />,
  Package: <Package className="w-6 h-6 text-primary" />,
};

const whyIconMap: Record<string, React.ReactNode> = {
  Award: <Award className="w-10 h-10 text-primary" />,
  Heart: <Heart className="w-10 h-10 text-primary" />,
  Lightbulb: <Lightbulb className="w-10 h-10 text-primary" />,
};

const getInitials = (name: string) => {
  const parts = name.split(' ');
  return parts.map(p => p[0]).join('').toUpperCase();
};

const getAvatarColor = (name: string) => {
  const colors = ['bg-primary', 'bg-secondary', 'bg-accent', 'bg-green-500', 'bg-purple-500'];
  let hash = 0;
  for (let i = 0; i < name.length; i++) hash = name.charCodeAt(i) + ((hash << 5) - hash);
  return colors[Math.abs(hash) % colors.length];
};

export default function Home() {
  const heroRef = useRef(null);

  return (
    <div>
      {/* HERO SECTION */}
      <section ref={heroRef} className="relative min-h-[100dvh] gradient-hero overflow-hidden flex items-center">
        {/* Animated Grid Background */}
        <div className="absolute inset-0 opacity-[0.03]" style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.3) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.3) 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px',
        }} />

        {/* Floating Decorative Elements */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 bg-primary/30 rounded-full"
              style={{
                left: `${15 + i * 15}%`,
                top: `${20 + (i % 3) * 25}%`,
              }}
              animate={{
                y: [0, -15, 0],
                opacity: [0.3, 0.7, 0.3],
              }}
              transition={{
                duration: 3 + i * 0.5,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            />
          ))}
        </div>

        <div className="container-main relative z-10 py-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
            >
              {/* Eyebrow Pill */}
              <span className="inline-block bg-primary text-white text-xs font-utility font-bold uppercase tracking-[2px] px-4 py-2 rounded-full mb-6">
                🚀 India's Most Reliable eCommerce Growth Partner
              </span>

              <h1 className="font-display font-semibold text-4xl md:text-5xl lg:text-[56px] text-white leading-[1.1]">
                Sell More. Stress Less. Scale Faster with{' '}
                <span className="text-gradient-orange">eCommittra</span>
              </h1>

              <p className="mt-6 text-lg text-white/75 max-w-lg leading-relaxed">
                From first listing to full-scale growth — eCommittra manages your Amazon, Flipkart, Meesho & JioMart accounts, runs your ads, builds your website, and handles everything so you can focus on what matters: your business.
              </p>

              {/* CTA Buttons */}
              <div className="mt-8 flex flex-wrap gap-4">
                <Link
                  to="/contact"
                  className="inline-flex items-center gap-2 bg-primary text-white font-medium px-7 py-3.5 rounded-lg hover:bg-primary-dark transition-all hover:shadow-cta hover:scale-[1.02]"
                >
                  <Sparkles className="w-5 h-5" />
                  Get My Free Growth Plan
                </Link>
                <Link
                  to="/services"
                  className="inline-flex items-center gap-2 border border-white/40 text-white font-medium px-7 py-3.5 rounded-lg hover:bg-white hover:text-secondary transition-all"
                >
                  Explore What We Do
                </Link>
              </div>

              {/* Trust Badges */}
              <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-white/60">
                <span className="flex items-center gap-1.5">
                  <Check className="w-4 h-4 text-primary" />
                  500+ Brands Scaled
                </span>
                <span className="flex items-center gap-1.5">
                  <Check className="w-4 h-4 text-primary" />
                  Marketplace Certified Experts
                </span>
                <span className="flex items-center gap-1.5">
                  <Check className="w-4 h-4 text-primary" />
                  100% Compliant &amp; Verified
                </span>
              </div>
            </motion.div>

            {/* Right — Contact Form Card */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="hidden lg:block"
            >
              <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md ml-auto">
                <h3 className="text-xl font-display font-semibold text-text-primary mb-1">
                  Get Free Consultation
                </h3>
                <p className="text-sm text-text-secondary mb-5">
                  Fill in your details and we&apos;ll get back to you within 24 hours.
                </p>
                <ContactForm compact />
              </div>
            </motion.div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          className="absolute bottom-6 left-1/2 -translate-x-1/2 text-white/40"
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <ChevronDown className="w-6 h-6" />
        </motion.div>
      </section>

      {/* TRUSTED BY SECTION */}
      <section className="py-10 bg-white border-b border-gray-100">
        <div className="container-main">
          <p className="text-center text-xs font-utility font-bold uppercase tracking-[2px] text-text-secondary mb-6">
            Your Brand. Every Marketplace.
          </p>
          <div className="flex flex-wrap justify-center items-center gap-6 md:gap-10">
            {PLATFORM_LOGOS.map((p) => (
              <div key={p.name} className="group flex items-center gap-2 text-text-muted hover:text-primary transition-colors">
                <span className="text-sm md:text-base font-display font-semibold tracking-wide">{p.name}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ABOUT SNIPPET */}
      <section className="section-padding bg-surface">
        <div className="container-main">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <ScrollReveal>
              <div className="bg-gradient-to-br from-primary/5 via-accent/5 to-secondary/5 rounded-2xl p-8 md:p-12 flex items-center justify-center min-h-[350px]">
                <div className="text-center">
                  <div className="flex items-center justify-center gap-4 mb-6">
                    <Store className="w-12 h-12 text-primary" />
                    <TrendingUp className="w-12 h-12 text-accent" />
                    <Monitor className="w-12 h-12 text-secondary-light" />
                  </div>
                  <p className="text-2xl font-display font-bold text-gradient-orange">
                    eCommittra
                  </p>
                  <p className="mt-2 text-text-secondary">Complete eCommerce Solutions</p>
                </div>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={0.1}>
              <span className="text-xs font-utility font-bold uppercase tracking-[2px] text-primary">
                WHO WE ARE
              </span>
              <h2 className="mt-3 text-3xl md:text-4xl font-display font-semibold text-text-primary orange-underline">
                One Partner. Every Platform. Total Growth.
              </h2>
                <p className="mt-6 text-text-secondary leading-relaxed">
                eCommittra is your dedicated growth engine — a full-service eCommerce partner that manages everything from marketplace account setup and daily operations to brand-building, ads, and digital marketing across India's biggest platforms.
              </p>
              <ul className="mt-6 space-y-3">
                {[
                  'Seller account management & marketplace growth',
                  'Website design & development (WordPress & Shopify)',
                  'Digital marketing, SEO, Google Ads, social media',
                  'Content creation, product photoshoots, video marketing',
                  'GST registration and accounting support',
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                    <span className="text-text-primary">{item}</span>
                  </li>
                ))}
              </ul>
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 mt-6 border-2 border-primary text-primary font-medium px-6 py-2.5 rounded-lg hover:bg-primary hover:text-white transition-all"
              >
                Let's Build Together <ArrowRight className="w-4 h-4" />
              </Link>
            </ScrollReveal>
          </div>

          {/* Stats */}
          <div className="mt-16">
            <StatsCounter />
          </div>
        </div>
      </section>

      {/* SERVICES SECTION */}
      <section className="section-padding bg-white">
        <div className="container-main">
          <ScrollReveal>
            <div className="text-center max-w-2xl mx-auto mb-12">
              <span className="text-xs font-utility font-bold uppercase tracking-[2px] text-primary">
                OUR EXPERTISE
              </span>
              <h2 className="mt-3 text-3xl md:text-4xl font-display font-semibold text-text-primary">
                Everything Your Online Business Needs
              </h2>
              <p className="mt-4 text-text-secondary">
                One committed team managing every part of your online success — so nothing falls through the cracks.
              </p>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {HOME_SERVICES.map((service, i) => (
              <ScrollReveal key={service.title} delay={i * 0.08}>
                <Link to={service.href} className="group block">
                  <div className="bg-white rounded-xl p-6 shadow-card border-l-4 border-l-primary hover:shadow-card-hover hover:-translate-y-1 transition-all h-full">
                    <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:scale-105 transition-transform">
                      {iconMap[service.icon]}
                    </div>
                    <h3 className="font-semibold text-lg text-text-primary mb-2">{service.title}</h3>
                    <p className="text-sm text-text-secondary leading-relaxed line-clamp-2">{service.description}</p>
                    <span className="inline-flex items-center gap-1 mt-4 text-sm font-medium text-primary group-hover:gap-2 transition-all">
                      Know More → <ArrowRight className="w-4 h-4" />
                    </span>
                  </div>
                </Link>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* WHY CHOOSE US */}
      <section className="section-padding gradient-hero text-white">
        <div className="container-main">
          <ScrollReveal>
            <div className="text-center max-w-2xl mx-auto mb-12">
              <h2 className="text-3xl md:text-4xl font-display font-semibold">
                Why 500+ Sellers Choose eCommittra
              </h2>
              <p className="mt-4 text-white/70">
                While others promise results, we build them — with a team that treats your business like our own and never stops working until the numbers move.
              </p>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {WHY_CHOOSE_US.map((item, i) => (
              <ScrollReveal key={item.title} delay={i * 0.1}>
                <div className="text-center">
                  <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center mx-auto mb-5">
                    {whyIconMap[item.icon]}
                  </div>
                  <h3 className="font-semibold text-xl mb-3">{item.title}</h3>
                  <p className="text-white/70 text-sm leading-relaxed">{item.description}</p>
                  <Link
                    to="/contact"
                    className="inline-flex items-center gap-1 mt-5 text-sm font-medium text-primary hover:gap-2 transition-all"
                  >
                    Talk to Us → <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* PROCESS SECTION */}
      <section className="section-padding bg-surface">
        <div className="container-main">
          <ScrollReveal>
            <div className="text-center max-w-2xl mx-auto mb-12">
              <span className="text-xs font-utility font-bold uppercase tracking-[2px] text-primary">
                HOW IT WORKS
              </span>
              <h2 className="mt-3 text-3xl md:text-4xl font-display font-semibold text-text-primary">
                From Zero to Growing — Here's How We Do It
              </h2>
              <p className="mt-4 text-text-secondary">
                A proven 4-step system that turns new sellers into confident, scaling businesses.
              </p>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {PROCESS_STEPS.map((step, i) => (
              <ScrollReveal key={step.step} delay={i * 0.1}>
                <div className="relative text-center">
                  <div className="w-14 h-14 rounded-full bg-primary text-white flex items-center justify-center mx-auto mb-4 font-display font-bold text-xl shadow-cta">
                    {step.step}
                  </div>
                  {i < PROCESS_STEPS.length - 1 && (
                    <div className="hidden lg:block absolute top-7 left-[60%] w-[80%] border-t-2 border-dashed border-primary/30" />
                  )}
                  <h3 className="font-semibold text-lg text-text-primary mb-2">{step.title}</h3>
                  <p className="text-sm text-text-secondary leading-relaxed">{step.description}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="section-padding bg-white">
        <div className="container-main">
          <ScrollReveal>
            <h2 className="text-3xl md:text-4xl font-display font-semibold text-text-primary text-center mb-12">
              Real Sellers. Real Results.
            </h2>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {TESTIMONIALS.map((t, i) => (
              <ScrollReveal key={t.name} delay={i * 0.1}>
                <div className="bg-white rounded-2xl p-6 md:p-8 shadow-card border border-gray-50">
                  <Quote className="w-10 h-10 text-primary/30 mb-4" />
                  <div className="flex gap-1 mb-4">
                    {[...Array(t.rating)].map((_, j) => (
                      <Star key={j} className="w-4 h-4 text-accent fill-accent" />
                    ))}
                  </div>
                  <p className="text-text-primary italic leading-relaxed mb-6">&ldquo;{t.text}&rdquo;</p>
                  <div className="flex items-center gap-3 pt-4 border-t border-gray-100">
                    <div className={`w-11 h-11 rounded-full ${getAvatarColor(t.name)} flex items-center justify-center text-white font-semibold text-sm`}>
                      {getInitials(t.name)}
                    </div>
                    <div>
                      <p className="font-semibold text-sm text-text-primary">{t.name}</p>
                      <p className="text-xs text-text-secondary">{t.role}</p>
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ SECTION */}
      <section className="section-padding bg-surface">
        <div className="max-w-3xl mx-auto px-4">
          <ScrollReveal>
            <h2 className="text-3xl md:text-4xl font-display font-semibold text-text-primary text-center mb-10"> 
              Got Questions? We've Got Answers.
            </h2>
          </ScrollReveal>
          <ScrollReveal delay={0.1}>
            <FAQAccordion items={FAQ_HOME} />
          </ScrollReveal>
        </div>
      </section>

      {/* CTA BANNER */}
      <section className="gradient-cta py-16 md:py-20">
        <div className="container-main text-center">
          <ScrollReveal>
            <h2 className="text-3xl md:text-4xl font-display font-semibold text-white mb-4">
              Your Next 10,000 Sales Start Here.
            </h2>
            <p className="text-white/90 mb-8 max-w-xl mx-auto">
              Stop leaving money on the table. Book a free 30-minute strategy call and walk away with a clear roadmap to grow your online sales — no strings attached.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href={`tel:${BUSINESS.phone1}`}
                className="inline-flex items-center gap-2 bg-white text-primary font-medium px-8 py-3.5 rounded-lg hover:shadow-lg transition-all hover:scale-[1.02]"
              >
                <Phone className="w-5 h-5" />
                📞 Call Rahul Now — {BUSINESS.phone1}
              </a>
              <a
                href={BUSINESS.whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-transparent border-2 border-white text-white font-medium px-8 py-3.5 rounded-lg hover:bg-white hover:text-primary transition-all"
              >
                <MessageCircle className="w-5 h-5" />
                💬 WhatsApp for Instant Reply
              </a>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
}
