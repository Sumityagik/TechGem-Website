import { motion } from 'framer-motion';
import * as LucideIcons from 'lucide-react';
import { WHY_CHOOSE_US } from '@/lib/data';

export default function WhyChooseUs() {
  return (
    <section className="section-pad relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-cyan-600/5 dark:bg-cyan-600/10 rounded-full blur-3xl" />

      <div className="container-mx relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-14"
        >
          <span className="badge bg-cyan-600/10 text-cyan-600 dark:text-gold-400 dark:bg-gold-400/10 mb-4">
            Why Choose Us
          </span>
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-ink-900 dark:text-white mb-4 text-balance">
            The TechGems <span className="text-gradient from-cyan-600 to-cyan-400 dark:from-yellow-600 dark:to-yellow-400" >Advantage</span>
          </h2>
          <p className="text-ink-600 dark:text-ink-400 max-w-2xl mx-auto">
            We bring the qualities of a gem — value, precision, quality, and uniqueness — to every project.
          </p>
        </motion.div>

        {/* Bento grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-5">
          {WHY_CHOOSE_US.map((item, i) => {
            const Icon = (LucideIcons as unknown as Record<string, React.ComponentType<{ size?: number; className?: string }>>)[item.icon] || LucideIcons.Star;
            // Make some cards span 2 cols for bento effect
            const isWide = i === 0 || i === 3;
            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
                whileHover={{ y: -5 }}
                className={`group card-base p-5 md:p-6 hover:shadow-lg hover:shadow-cyan-600/10 dark:hover:shadow-yellow-600/20 hover:border-cyan-600/30 dark:hover:border-yellow-400/30 ${isWide ? 'col-span-2 lg:col-span-1' : ''}`}
              >
                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-11 h-11 rounded-xl bg-cyan-600/10 dark:bg-yellow-600/10 flex items-center justify-center group-hover:bg-cyan-600 dark:group-hover:bg-yellow-600 transition-colors duration-300">
                    <Icon size={20} className="text-cyan-600 dark:text-yellow-400 dark:group-yellow-400/10 group-hover:text-white dark:group-hover:text-white transition-colors" />
                  </div>
                  <div>
                    <h3 className="font-display font-bold text-sm md:text-base text-ink-900 dark:text-white mb-1">
                      {item.title}
                    </h3>
                    <p className="text-xs text-ink-500 dark:text-ink-400 leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>
                {/* Gold accent dot */}
                <div className="absolute top-3 right-3 w-1.5 h-1.5 rounded-full bg-gold-500/50 group-hover:bg-gold-500 dark:bg-cyan-500/50 dark:group-hover:bg-cyan-500 transition-colors" />
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
