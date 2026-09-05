import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import * as LucideIcons from 'lucide-react';
import { SERVICES } from '@/lib/data';

type ServiceCardProps = {
  service: typeof SERVICES[number];
  index: number;
};

function ServiceCard({ service, index }: ServiceCardProps) {
  const IconComponent = (LucideIcons as unknown as Record<string, React.ComponentType<{ size?: number; className?: string }>>)[service.icon] || LucideIcons.Code2;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      whileHover={{ y: -8 }}
      className="group relative card-base p-6 lg:p-7 hover:shadow-xl hover:shadow-cyan-600/10 hover:border-cyan-600/30 dark:hover:border-yellow-400/30 overflow-hidden"
    >
      {/* Gold corner accent */}
      <div className="absolute top-0 right-0 w-20 h-20 -translate-y-10 translate-x-10 group-hover:translate-x-0 group-hover:translate-y-0 transition-transform duration-500">
        <div className="w-full h-full bg-gradient-to-br from-yellow-500/20  dark:from-cyan-500/20 to-transparent rounded-bl-3xl " />
      </div>

      {/* Icon */}
      <div className="relative w-14 h-14 rounded-2xl bg-cyan-600/10 dark:bg-yellow-600/10 flex items-center justify-center mb-5 group-hover:bg-cyan-600 dark:group-hover:bg-yellow-600  group-hover:scale-110 transition-all duration-300">
        <IconComponent size={26} className="text-cyan-600 dark:text-yellow-400 group-hover:text-white  transition-colors" />
      </div>

      <h3 className="font-display text-lg font-bold text-ink-900 dark:text-white mb-2">
        {service.title}
      </h3>
      <p className="text-sm text-ink-600 dark:text-ink-400 leading-relaxed mb-4">
        {service.description}
      </p>

      <ul className="space-y-1.5 mb-5">
        {service.features.map((f) => (
          <li key={f} className="flex items-center gap-2 text-xs text-ink-500 dark:text-ink-400">
            <span className="w-1 h-1 rounded-full bg-yellow-500" />
            {f}
          </li>
        ))}
      </ul>

      <button className="inline-flex items-center gap-1.5 text-sm font-semibold text-cyan-600 dark:text-cyan-400 dark:hover:text-yellow-400 group-hover:gap-2.5 transition-all">
        Explore Service
        <ArrowUpRight size={16} />
      </button>
    </motion.div>
  );
}

export default function Services() {
  return (
    <section id="services" className="section-pad relative">
      <div className="container-mx">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-14"
        >
          <span className="badge bg-cyan-600/10 text-teal-600 dark:text-yellow-400 dark:bg-yellow-600/10 mb-4">
            What We Do
          </span>
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-ink-900 dark:text-white mb-4 text-balance">
            Premium Services, <span className="text-gradient dark:from-yellow-500 dark:to-yellow-300">Crafted Like Gems</span>
          </h2>
          <p className="text-ink-600 dark:text-ink-400 max-w-2xl mx-auto">
            From web platforms to AI systems, we deliver technology solutions that are refined, valuable, and built to last.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {SERVICES.map((service, i) => (
            <ServiceCard key={service.id} service={service} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
