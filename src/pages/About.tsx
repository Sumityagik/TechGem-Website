import { motion } from 'framer-motion';
import { Target, Eye, Heart, Gem } from 'lucide-react';
import * as LucideIcons from 'lucide-react';
import { VALUES, JOURNEY } from '@/lib/data';

export default function About() {
  return (
    <div className="pt-20">
      {/* Hero */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-30 dark:opacity-15" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-cyan-600/10 dark:bg-cyan-600/15 rounded-full blur-3xl" />

        <div className="relative max-w-4xl mx-auto text-center">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="badge bg-yellow-500/10 text-yellow-600 dark:text-yellow-400 mb-4"
          >
            About TechGems
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-ink-900 dark:text-white mb-6 text-balance"
          >
            Technology <span className="text-gradient-yellow">Crafted Like a Gem</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-lg text-ink-600 dark:text-ink-300 leading-relaxed"
          >
            We are a premium technology company that transforms ideas into reliable, scalable, and beautiful digital products. Every solution we build reflects our commitment to quality, precision, and innovation.
          </motion.p>
        </div>
      </section>

      {/* Who We Are */}
      <section className="section-pad">
        <div className="container-mx grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="font-display text-3xl font-bold text-ink-900 dark:text-white mb-4">Who We Are</h2>
            <p className="text-ink-600 dark:text-ink-300 leading-relaxed mb-4">
              TechGems is a team of engineers, designers, and innovators united by a single belief: technology should be crafted with the same care and precision as a gem. We don't just write code — we refine, polish, and perfect until every product shines.
            </p>
            <p className="text-ink-600 dark:text-ink-300 leading-relaxed">
              From startups to enterprises, we partner with businesses to build digital solutions that are not only functional but exceptional. Our approach combines modern engineering with thoughtful design.
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="grid grid-cols-2 gap-4"
          >
            {[
              { value: '10+', label: 'Projects Delivered' },
              { value: '5+', label: 'Happy Clients' },
              { value: '5+', label: 'Team Members' },
              { value: '3+', label: 'Years Experience' },
            ].map((s, i) => (
              <div key={s.label} className={`card-base p-6 text-center ${i % 2 === 1 ? 'mt-8' : ''}`}>
                <p className="font-display text-3xl font-bold text-gradient">{s.value}</p>
                <p className="text-sm text-ink-500 dark:text-ink-400 mt-1">{s.label}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="section-pad bg-ink-50 dark:bg-night-400">
        <div className="container-mx grid md:grid-cols-2 gap-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="card-base p-8 lg:p-10 relative overflow-hidden"
          >
            <div className="absolute -top-10 -right-10 w-32 h-32 bg-cyan-600/10 rounded-full blur-2xl" />
            <div className="relative">
              <div className="w-14 h-14 rounded-2xl bg-cyan-600/10 flex items-center justify-center mb-5">
                <Target size={28} className="text-cyan-600 dark:text-cyan-400" />
              </div>
              <h3 className="font-display text-2xl font-bold text-ink-900 dark:text-white mb-3">Our Mission</h3>
              <p className="text-ink-600 dark:text-ink-300 leading-relaxed">
                To transform ideas into reliable digital products by combining modern engineering, thoughtful design, and a relentless focus on quality. We exist to make technology work for your business.
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="card-base p-8 lg:p-10 relative overflow-hidden"
          >
            <div className="absolute -top-10 -right-10 w-32 h-32 bg-yellow-500/10 rounded-full blur-2xl" />
            <div className="relative">
              <div className="w-14 h-14 rounded-2xl bg-yellow-500/10 flex items-center justify-center mb-5">
                <Eye size={28} className="text-yellow-600 dark:text-yellow-400" />
              </div>
              <h3 className="font-display text-2xl font-bold text-ink-900 dark:text-white mb-3">Our Vision</h3>
              <p className="text-ink-600 dark:text-ink-300 leading-relaxed">
                To become the most trusted technology partner for businesses worldwide, known for delivering digital gems — solutions that are valuable, refined, and built to endure.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Values */}
      <section className="section-pad">
        <div className="container-mx">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-14"
          >
            <span className="badge bg-cyan-600/10 text-cyan-600 dark:text-cyan-400 mb-4">Our Values</span>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-ink-900 dark:text-white mb-4">
              What We <span className="text-gradient">Stand For</span>
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {VALUES.map((value, i) => {
              const Icon = (LucideIcons as unknown as Record<string, React.ComponentType<{ size?: number; className?: string }>>)[value.icon] || Heart;
              return (
                <motion.div
                  key={value.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                  className="card-base p-6 hover:shadow-lg hover:border-cyan-600/30 transition-all"
                >
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-cyan-600/10 dark:bg-cyan-600/20 flex items-center justify-center flex-shrink-0">
                      <Icon size={22} className="text-cyan-600 dark:text-cyan-400" />
                    </div>
                    <div>
                      <h4 className="font-display font-bold text-ink-900 dark:text-white mb-1">{value.title}</h4>
                      <p className="text-sm text-ink-500 dark:text-ink-400 leading-relaxed">{value.description}</p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Journey Timeline */}
      <section className="section-pad bg-ink-50 dark:bg-night-400">
        <div className="container-mx">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-14"
          >
            <span className="badge bg-yellow-500/10 text-yellow-600 dark:text-yellow-400 mb-4">Our Journey</span>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-ink-900 dark:text-white mb-4">
              From Spark to <span className="text-gradient-yellow">Gem</span>
            </h2>
          </motion.div>

          <div className="relative max-w-3xl mx-auto">
            {/* Vertical line */}
            <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-cyan-600 via-yellow-500 to-cyan-600 md:-translate-x-1/2" />

            {JOURNEY.map((item, i) => (
              <motion.div
                key={item.year}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.5 }}
                className={`relative flex items-start gap-6 mb-10 md:w-1/2 ${
                  i % 2 === 0 ? 'md:pr-12 md:text-right' : 'md:ml-auto md:pl-12'
                }`}
              >
                {/* Dot */}
                <div className={`absolute left-4 md:left-auto w-3 h-3 rounded-full bg-yellow-500 ring-4 ring-white dark:ring-night-400 z-10 mt-2 ${
                  i % 2 === 0 ? 'md:-right-1.5 md:translate-x-1/2' : 'md:-left-1.5 md:-translate-x-1/2'
                }`} />

                <div className="ml-10 md:ml-0 card-base p-5 flex-1">
                  <span className="text-sm font-bold text-gradient">{item.year}</span>
                  <h4 className="font-display font-bold text-ink-900 dark:text-white mt-1 mb-1">{item.title}</h4>
                  <p className="text-sm text-ink-500 dark:text-ink-400 leading-relaxed">{item.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-pad">
        <div className="container-mx">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative rounded-3xl bg-gradient-to-br from-cyan-600 to-cyan-800 p-10 md:p-16 text-center overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-yellow-500/20 rounded-full blur-3xl" />
            <div className="relative">
              <Gem size={40} className="text-yellow-400 mx-auto mb-4" />
              <h2 className="font-display text-3xl md:text-4xl font-bold text-white mb-4 text-balance">
                Ready to Build Your Digital Gem?
              </h2>
              <p className="text-cyan-100 max-w-xl mx-auto mb-8">
                Let's turn your idea into a polished, powerful product. Get started today.
              </p>
              <a href="/register" className="btn-yellow inline-flex">Get Started</a>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
