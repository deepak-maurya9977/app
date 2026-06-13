import { Phone } from 'lucide-react';
import { BUSINESS } from '@/lib/constants';

export default function FloatingCallButton() {
  return (
    <a
      href={`tel:${BUSINESS.phone1}`}
      className="fixed bottom-6 left-6 z-50 w-14 h-14 bg-primary rounded-full flex items-center justify-center shadow-lg hover:scale-105 transition-transform md:hidden"
      aria-label="Call Now"
    >
      <span className="absolute inset-0 rounded-full bg-primary animate-pulse-ring" />
      <Phone className="w-6 h-6 text-white relative z-10" />
    </a>
  );
}
