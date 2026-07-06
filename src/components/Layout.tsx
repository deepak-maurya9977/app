import { Outlet, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import FloatingWhatsApp from '@/components/FloatingWhatsApp';
import FloatingCallButton from '@/components/FloatingCallButton';
import DiscountPopup from '@/components/DiscountPopup';
import { initAll } from '@/lib/animations';
import { SEO } from '@/seo/SEO';
import { pageSeoConfigs } from '@/seo/seoConfig';

export default function Layout() {
  const { pathname } = useLocation();

  useEffect(() => {
    // initialize scroll animations, counters, and progress bar
    initAll();
  }, []);

  // Look up the SEO config for the current path; undefined triggers fallback defaults inside SEO
  const seoConfig = pageSeoConfigs[pathname];

  return (
    <div className="min-h-[100dvh] flex flex-col">
      {/* Inject per-page head tags automatically for every page */}
      <SEO config={seoConfig} />

      {/* Scroll progress bar inserted globally */}
      <div id="scrollProgress" className="scroll-progress" role="progressbar" aria-label="Page scroll progress" aria-valuemin={0} aria-valuemax={100} aria-valuenow={0} />

      <Navbar />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
      <FloatingWhatsApp />
      <FloatingCallButton />
      <DiscountPopup />
    </div>
  );
}
