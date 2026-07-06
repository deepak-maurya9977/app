import { useRef, useState, useEffect } from 'react';
import { useInView } from 'framer-motion';
import { ShoppingCart, TrendingUp, Package, Award } from 'lucide-react';
import { STATS } from '@/lib/constants';

const statIcons = [
  <ShoppingCart key="0" className="w-6 h-6 text-primary" />,
  <TrendingUp key="1" className="w-6 h-6 text-primary" />,
  <Package key="2" className="w-6 h-6 text-primary" />,
  <Award key="3" className="w-6 h-6 text-primary" />,
];

function Counter({ value, suffix, isInView }: { value: number; suffix: string; isInView: boolean }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isInView) return;
    let start = 0;
    const duration = 2000;
    const increment = value / (duration / 16);
    const timer = setInterval(() => {
      start += increment;
      if (start >= value) {
        setCount(value);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);
    return () => clearInterval(timer);
  }, [isInView, value]);

  const formatNumber = (n: number) => {
    if (n >= 1000) return n.toLocaleString();
    return n.toString();
  };

  return (
    <span>
      {formatNumber(count)}
      {suffix}
    </span>
  );
}

export default function StatsCounter() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <div ref={ref} className="bg-secondary py-16 md:py-20 relative overflow-hidden">
      {/* Pattern overlay */}
      <div className="absolute inset-0 opacity-[0.03]" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.03'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
      }} />
      
      <div className="container-main relative z-10">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {STATS.map((stat, i) => (
            <div
              key={stat.label}
              className="text-center p-5 md:p-6 transition-transform hover:-translate-y-1"
              style={{ animationDelay: `${i * 0.15}s` }}
            >
              <div className="flex justify-center mb-3">
                {statIcons[i % statIcons.length]}
              </div>
              <div className="text-4xl md:text-5xl font-display font-bold text-primary">
                <Counter value={stat.value} suffix={stat.suffix} isInView={isInView} />
              </div>
              <p className="mt-2 text-sm text-white/70 font-medium">{stat.label}</p>
              {i < STATS.length - 1 && (
                <div className="hidden lg:block absolute top-1/2 right-0 w-px h-12 bg-white/10 -translate-y-1/2" />
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
