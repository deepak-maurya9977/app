import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import HeroBanner from '@/components/HeroBanner';
import ScrollReveal from '@/components/ScrollReveal';

const categories = ['All', 'Team', 'Office', 'Client Work', 'Events'];

const galleryItems = [
  { id: 1, category: 'Team', color: 'from-primary/20 to-accent/20', label: 'Team Meeting' },
  { id: 2, category: 'Office', color: 'from-secondary/20 to-primary/20', label: 'Office Space' },
  { id: 3, category: 'Client Work', color: 'from-accent/20 to-green-400/20', label: 'Client Call' },
  { id: 4, category: 'Events', color: 'from-purple-400/20 to-primary/20', label: 'Workshop' },
  { id: 5, category: 'Team', color: 'from-primary/20 to-blue-400/20', label: 'Team Lunch' },
  { id: 6, category: 'Office', color: 'from-secondary/20 to-accent/20', label: 'Work Station' },
  { id: 7, category: 'Client Work', color: 'from-green-400/20 to-primary/20', label: 'Strategy Session' },
  { id: 8, category: 'Team', color: 'from-accent/20 to-secondary/20', label: 'Training Day' },
  { id: 9, category: 'Events', color: 'from-primary/20 to-purple-400/20', label: 'Award Ceremony' },
  { id: 10, category: 'Office', color: 'from-blue-400/20 to-primary/20', label: 'Conference Room' },
  { id: 11, category: 'Client Work', color: 'from-primary/20 to-secondary/20', label: 'Product Shoot' },
  { id: 12, category: 'Team', color: 'from-secondary/20 to-accent/20', label: 'Brainstorming' },
];

export default function Gallery() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const filtered = activeCategory === 'All'
    ? galleryItems
    : galleryItems.filter(item => item.category === activeCategory);

  const openLightbox = (index: number) => setLightboxIndex(index);
  const closeLightbox = () => setLightboxIndex(null);

  const goPrev = () => {
    if (lightboxIndex !== null) {
      setLightboxIndex(lightboxIndex === 0 ? filtered.length - 1 : lightboxIndex - 1);
    }
  };

  const goNext = () => {
    if (lightboxIndex !== null) {
      setLightboxIndex(lightboxIndex === filtered.length - 1 ? 0 : lightboxIndex + 1);
    }
  };

  return (
    <div>
      <HeroBanner
        title="Our Gallery"
        subtitle="A glimpse into the eCommittra team, office, and client success stories."
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Gallery', href: '/gallery' },
        ]}
      />

      <section className="section-padding bg-white">
        <div className="container-main">
          {/* Tabs */}
          <ScrollReveal>
            <div className="flex flex-wrap justify-center gap-2 mb-10">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => { setActiveCategory(cat); setLightboxIndex(null); }}
                  className={`px-5 py-2 rounded-full text-sm font-medium transition-all ${
                    activeCategory === cat
                      ? 'bg-primary text-white'
                      : 'bg-surface text-text-secondary hover:bg-primary/10 hover:text-primary'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </ScrollReveal>

          {/* Grid */}
          <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 space-y-4">
            {filtered.map((item, i) => (
              <ScrollReveal key={item.id} delay={i * 0.05}>
                <div
                  className="break-inside-avoid rounded-xl overflow-hidden cursor-pointer group"
                  onClick={() => openLightbox(i)}
                >
                  <div className={`bg-gradient-to-br ${item.color} aspect-square flex items-center justify-center relative`}>
                    <span className="text-2xl font-display font-bold text-text-primary/30">{item.label}</span>
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors" />
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center"
            onClick={closeLightbox}
          >
            <button
              className="absolute top-4 right-4 w-12 h-12 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-white/20 transition-colors z-10"
              onClick={closeLightbox}
            >
              <X className="w-6 h-6" />
            </button>

            <button
              className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-white/20 transition-colors z-10"
              onClick={(e) => { e.stopPropagation(); goPrev(); }}
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            <button
              className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-white/20 transition-colors z-10"
              onClick={(e) => { e.stopPropagation(); goNext(); }}
            >
              <ChevronRight className="w-6 h-6" />
            </button>

            <motion.div
              key={lightboxIndex}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className={`bg-gradient-to-br ${filtered[lightboxIndex].color} w-[85vw] h-[70vh] max-w-4xl rounded-2xl flex items-center justify-center`}
              onClick={(e) => e.stopPropagation()}
            >
              <span className="text-4xl font-display font-bold text-text-primary/40">
                {filtered[lightboxIndex].label}
              </span>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
