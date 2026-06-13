import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import HeroBanner from '@/components/HeroBanner';
import ScrollReveal from '@/components/ScrollReveal';
import {
  ShoppingCart, Monitor, TrendingUp, Palette, Camera, Store,
  FileText, Smartphone, Package, RotateCcw, PenTool, List,
  Warehouse, Sparkles, ShoppingBag, Megaphone, Calculator
} from 'lucide-react';
import { ALL_SERVICES, PRICING_APPROACHES } from '@/lib/constants';

const allIcons: Record<string, React.ReactNode> = {
  ShoppingCart: <ShoppingCart className="w-6 h-6 text-primary" />,
  Monitor: <Monitor className="w-6 h-6 text-primary" />,
  TrendingUp: <TrendingUp className="w-6 h-6 text-primary" />,
  Palette: <Palette className="w-6 h-6 text-primary" />,
  Camera: <Camera className="w-6 h-6 text-primary" />,
  Store: <Store className="w-6 h-6 text-primary" />,
  FileText: <FileText className="w-6 h-6 text-primary" />,
  Smartphone: <Smartphone className="w-6 h-6 text-primary" />,
  Package: <Package className="w-6 h-6 text-primary" />,
  RotateCcw: <RotateCcw className="w-6 h-6 text-primary" />,
  PenTool: <PenTool className="w-6 h-6 text-primary" />,
  List: <List className="w-6 h-6 text-primary" />,
  Warehouse: <Warehouse className="w-6 h-6 text-primary" />,
  Sparkles: <Sparkles className="w-6 h-6 text-primary" />,
  ShoppingBag: <ShoppingBag className="w-6 h-6 text-primary" />,
  Megaphone: <Megaphone className="w-6 h-6 text-primary" />,
  Calculator: <Calculator className="w-6 h-6 text-primary" />,
};

export default function Services() {
  return (
    <div>
      <HeroBanner
        title="Everything You Need to Win Online"
        subtitle="One partner. Every service. Zero excuses. Built for Indian sellers who are serious about growth."
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Services', href: '/services' },
        ]}
      />

      {/* Services Grid */}
      <section className="section-padding bg-white">
        <div className="container-main">
          <ScrollReveal>
            <div className="text-center max-w-3xl mx-auto mb-12">
              <h2 className="text-3xl md:text-4xl font-display font-semibold text-text-primary">
                The Full Arsenal — At Your Disposal
              </h2>
              <p className="mt-4 text-text-secondary leading-relaxed">
                From setting up your first Amazon account to running a 6-platform operation with ads, A+ content, a Shopify store, and a social media presence — eCommittra has the people, the process, and the commitment to make it all work together. No juggling multiple agencies. No dropped balls. Just one partner, fully accountable.
              </p>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {ALL_SERVICES.map((service, i) => (
              <ScrollReveal key={service.title} delay={i * 0.05}>
                <Link to={service.href} className="group block">
                  <div className="bg-white rounded-xl p-6 shadow-card border-l-4 border-l-primary hover:shadow-card-hover hover:-translate-y-1 transition-all h-full">
                    <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:scale-105 transition-transform">
                      {allIcons[service.icon]}
                    </div>
                    <h3 className="font-semibold text-lg text-text-primary mb-2">{service.title}</h3>
                    <p className="text-sm text-text-secondary leading-relaxed">{service.description}</p>
                    <span className="inline-flex items-center gap-1 mt-4 text-sm font-medium text-primary group-hover:gap-2 transition-all">
                      See Full Details → <ArrowRight className="w-4 h-4" />
                    </span>
                  </div>
                </Link>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="section-padding bg-surface">
        <div className="container-main">
          <ScrollReveal>
            <div className="text-center max-w-2xl mx-auto mb-12">
              <h2 className="text-3xl md:text-4xl font-display font-semibold text-text-primary">
                Transparent Pricing. No Surprises.
              </h2>
              <p className="mt-4 text-text-secondary">
                Whether you're just starting or scaling past ₹10L/month, we have a plan that fits where you are and funds where you're going.
              </p>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {PRICING_APPROACHES.map((p, i) => (
              <ScrollReveal key={p.title} delay={i * 0.1}>
                <div className="bg-white rounded-2xl p-8 shadow-card text-center">
                  <h3 className="text-xl font-semibold text-text-primary mb-4">{p.title}</h3>
                  <p className="text-sm text-text-secondary leading-relaxed mb-6">{p.description}</p>
                  <Link
                    to="/contact"
                    className="inline-flex items-center gap-2 border-2 border-primary text-primary font-medium px-6 py-2.5 rounded-lg hover:bg-primary hover:text-white transition-all"
                  >
                    Get Quote <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
