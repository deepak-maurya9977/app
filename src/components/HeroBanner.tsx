import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';

interface HeroBannerProps {
  title: string;
  subtitle?: string;
  breadcrumbs: { label: string; href: string }[];
}

export default function HeroBanner({ title, subtitle, breadcrumbs }: HeroBannerProps) {
  return (
    <section className="gradient-hero pt-28 pb-16 md:pt-36 md:pb-20">
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
      </div>
    </section>
  );
}
