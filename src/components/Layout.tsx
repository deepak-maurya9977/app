import { Outlet } from 'react-router-dom';
import { useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import FloatingWhatsApp from '@/components/FloatingWhatsApp';
import FloatingCallButton from '@/components/FloatingCallButton';
import DiscountPopup from '@/components/DiscountPopup';
import { initAll } from '@/lib/animations';

export default function Layout() {
  useEffect(() => {
    // initialize scroll animations, counters, and progress bar
    initAll();
  }, []);

  return (
    <div className="min-h-[100dvh] flex flex-col">
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
