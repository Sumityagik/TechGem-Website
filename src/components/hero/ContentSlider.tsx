import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import * as LucideIcons from 'lucide-react';
import { HERO_SLIDES } from '@/lib/data';

export default function ContentSlider() {
  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);

  const next = useCallback(() => setCurrent((p) => (p + 1) % HERO_SLIDES.length), []);
  const prev = () => setCurrent((p) => (p - 1 + HERO_SLIDES.length) % HERO_SLIDES.length);

  useEffect(() => {
    if (paused) return;
    const timer = setInterval(next, 5000);
    return () => clearInterval(timer);
  }, [paused, next]);

  const slide = HERO_SLIDES[current];
  const IconComponent = (LucideIcons as unknown as Record<string, React.ComponentType<{ size?: number; className?: string }>>)[slide.icon] || LucideIcons.Sparkles;

  return (
    <section
      className="relative py-20 px-4 sm:px-6 lg:px-8"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="max-w-5xl mx-auto">
        <div className="relative glass rounded-3xl overflow-hidden shadow-xl">
          {/* Background accent */}
          <div className="absolute inset-0 bg-gradient-to-br from-electric-600/5 via-transparent to-gold-500/5" />

          <div className="relative p-8 md:p-12 min-h-[320px] flex items-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={current}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.4 }}
                className="flex flex-col md:flex-row items-center gap-8 w-full"
              >
                {/* Icon */}
                <div className="flex-shrink-0">
                  <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-cyan-400 to-cyan-600 dark:from-yellow-400 dark:to-yellow-600 flex items-center justify-center shadow-lg shadow-electric-600/30">
                    <IconComponent size={40} className="text-white" />
                  </div>
                </div>

                {/* Content */}
                <div className="flex-1 text-center md:text-left">
                  <span className="badge bg-yellow-400/10 text-yellow-600 dark:text-cyan-400 mb-3">
                    Slide {current + 1} / {HERO_SLIDES.length}
                  </span>
                  <h3 className="font-display text-2xl md:text-3xl font-bold text-ink-900 dark:text-white mb-3">
                    {slide.title}
                  </h3>
                  <p className="text-ink-600 dark:text-ink-300 leading-relaxed max-w-2xl">
                    {slide.description}
                  </p>
                  <Link to={slide.ctaLink} className="inline-flex items-center gap-2 mt-5  bg-yellow-400/10 text-yellow-600 dark:text-cyan-400 font-semibold hover:gap-4 transition-all">
                    {slide.cta} <ArrowRight size={16} />
                  </Link>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Controls */}
          <button
            onClick={prev}
            aria-label="Previous slide"
            className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full glass-strong flex items-center justify-center text-ink-600 dark:text-ink-200 hover:text-cyan-600 dark:hover:text-yellow-400 transition-colors"
          >
            <ChevronLeft size={20} />
          </button>
          <button
            onClick={next}
            aria-label="Next slide"
            className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full glass-strong flex items-center justify-center text-ink-600 dark:text-ink-200 hover:text-cyan-600 dark:hover:text-yellow-400 transition-colors"
          >
            <ChevronRight size={20} />
          </button>

          {/* Indicators */}
          <div className="flex justify-center gap-2 pb-5">
            {HERO_SLIDES.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                aria-label={`Go to slide ${i + 1}`}
                className={`h-2 rounded-full transition-all duration-300 ${
                  i === current ? 'w-8 bg-cyan-500 dark:bg-yellow-500' : 'w-2 bg-ink-300 dark:bg-ink-600 hover:bg-electric-400'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
