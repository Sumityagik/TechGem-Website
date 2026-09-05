import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Calendar, Sparkles } from 'lucide-react';
import TechGemLogo3D from '@/components/common/TechGemLogo3D';
import techGemLogo from '../assets/favicon.png';

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden pt-20">
      {/* Background */}
      <div className="absolute inset-0 bg-grid-pattern opacity-40 dark:opacity-20" />
      <div className="absolute top-1/4 -left-32 w-96 h-96 bg-electric-600/10 dark:bg-electric-600/20 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-gold-500/5 dark:bg-gold-500/10 rounded-full blur-3xl" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left: Text */}
          <div className="text-center lg:text-left">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-6"
            >
              <Sparkles size={16} className="text-gold-500" />
              <span className="text-sm font-medium text-ink-700 dark:text-ink-200">Premium Technology Solutions</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="font-display text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold tracking-tight text-balance"
            >
              <span className="text-gradient-hero">Turning Ideas</span>
              <br />
              <span className="text-gradient">Into Digital Gems.</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mt-6 text-lg text-ink-600 dark:text-ink-300 max-w-xl mx-auto lg:mx-0 leading-relaxed"
            >
              TechGems builds modern websites, applications, intelligent digital solutions, and scalable technology products that help businesses grow.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="mt-8 flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
            >
              <Link to="/register" className="btn-primary group">
                Get Started
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link to="/contact" className="btn-secondary group">
                <Calendar size={18} />
                Book Appointment
              </Link>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="mt-12 flex gap-8 justify-center lg:justify-start"
            >
              {[
                { value: '10+', label: 'Projects' },
                { value: '5+', label: 'Clients' },
                { value: '3+', label: 'Years' },
                { value: '99%', label: 'Satisfaction' },
              ].map((s) => (
                <div key={s.label}>
                  <p className="font-display text-2xl font-bold text-gradient">{s.value}</p>
                  <p className="text-xs text-ink-500 dark:text-ink-400 mt-0.5">{s.label}</p>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Right: 3D Diamond */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="flex justify-center lg:justify-end"
          >
            <TechGemLogo3D size={450} logoSrc={techGemLogo} className="max-w-full" />
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="w-6 h-10 rounded-full border-2 border-ink-300 dark:border-ink-500 flex justify-center pt-2"
        >
          <div className="w-1 h-2 bg-ink-400 dark:bg-ink-400 rounded-full" />
        </motion.div>
      </motion.div>
    </section>
  );
}
