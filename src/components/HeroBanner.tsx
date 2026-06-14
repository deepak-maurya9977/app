import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';

interface HeroBannerProps {
  title: string;
  subtitle?: string;
  breadcrumbs: { label: string; href: string }[];
}

export default function HeroBanner({ title, subtitle, breadcrumbs }: HeroBannerProps) {
  return (
    <section className="gradient-hero pt-28 pb-16 md:pt-36 md:pb-20 relative overflow-hidden">
      <div className="container-main text-center">
        {/* Breadcrumbs */}
        <nav className="flex items-center justify-center gap-1 text-sm mb-5">
          {breadcrumbs.map((crumb, i) => (
            <span key={crumb.href} className="flex items-center gap-1">
              {i > 0 && <ChevronRight className="w-3.5 h-3.5 text-white/40" />}
              {i === breadcrumbs.length - 1 ? (
                <span className="text-white/60">{crumb.label}</span>
              ) : (
                <Link to={crumb.href} className="text-white/80 hover:text-white transition-colors">
                  {crumb.label}
                </Link>
              )}
            </span>
          ))}
        </nav>

        <h1 className="font-display font-semibold text-3xl md:text-5xl text-white">
          {title}
        </h1>
        {subtitle && (
          <p className="mt-4 text-lg text-white/75 max-w-2xl mx-auto">
            {subtitle}
          </p>
        )}

        {/* CTA buttons */}
        <div className="mt-6 flex items-center justify-center gap-4">
          <a href="/contact" className="inline-flex items-center gap-2 bg-primary text-white text-lg font-semibold px-6 py-3 rounded-full shadow-sm hover:bg-primary-dark transition-all">
            Get Free Consultation
          </a>
          <a href="/services" className="inline-flex items-center gap-2 bg-white/10 text-white text-lg font-semibold px-5 py-3 rounded-full border border-white/20 hover:bg-white/20 transition-all">
            Explore Services
          </a>
        </div>
      </div>

      {/* Floating badges */}
      <div className="hero-badge hero-badge--top-right animate-pulse-ring">
        <span className="badge-icon">🛒</span>
        <div>
          <span className="badge-number">500+</span>
          <span className="text-[12px] text-text-muted">Happy Sellers</span>
        </div>
      </div>

      <div className="hero-badge hero-badge--mid-right animate-pulse-ring" style={{ animationDelay: '400ms' }}>
        <span className="badge-icon">⭐</span>
        <div>
          <span className="badge-number">4.9/5</span>
          <span className="text-[12px] text-text-muted">Avg Rating</span>
        </div>
      </div>

      <div className="hero-badge hero-badge--bottom-left animate-pulse-ring" style={{ animationDelay: '800ms' }}>
        <span className="badge-icon">📈</span>
        <div>
          <span className="badge-number">3x</span>
          <span className="text-[12px] text-text-muted">Avg Growth</span>
        </div>
      </div>
    </section>
  );
}
