import { useRef, useState, useEffect } from 'react';
import { useInView } from 'framer-motion';
import { STATS } from '@/lib/constants';

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
    <div ref={ref} className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
      {STATS.map((stat, i) => (
        <div
          key={stat.label}
          className="bg-white rounded-xl p-5 md:p-6 shadow-card text-center"
          style={{ animationDelay: `${i * 0.15}s` }}
        >
          <div className="text-3xl md:text-4xl font-display font-bold text-primary">
            <Counter value={stat.value} suffix={stat.suffix} isInView={isInView} />
          </div>
          <p className="mt-1 text-sm text-text-secondary font-medium">{stat.label}</p>
        </div>
      ))}
    </div>
  );
}
