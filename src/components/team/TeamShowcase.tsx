import { motion } from 'framer-motion';
import { Linkedin, Github, Mails } from 'lucide-react';
import { TEAM_MEMBERS } from '@/lib/data';

function TeamCard({ member }: { member: typeof TEAM_MEMBERS[number] }) {
  return (
    <div className="group relative flex-shrink-0 w-72 md:w-80 card-base overflow-hidden">
      {/* Image */}
      <div className="relative h-64 overflow-hidden">
        <img
          src={member.image}
          alt={member.name}
          loading="lazy"
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-night-300/90 via-transparent to-transparent" />

        {/* Social overlay */}
        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">

          {member.socials?.linkedin && (
            <a
              href={member.socials.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="w-9 h-9 rounded-full glass-strong flex items-center justify-center text-night-400 dark:text-white dark:hover:text-yellow-400 hover:text-yellow-400 transition-colors"
              aria-label={`${member.name} LinkedIn profile`}
            >
              <Linkedin size={16} />
            </a>
          )}

          {member.socials?.github && (
            <a
              href={member.socials.github}
              target="_blank"
              rel="noopener noreferrer"
              className="w-9 h-9 rounded-full glass-strong flex items-center justify-center text-night-400 dark:text-white dark:hover:text-yellow-400 hover:text-yellow-400 transition-colors"
              aria-label={`${member.name} GitHub profile`}
            >
              <Github size={16} />
            </a>
          )}

          {member.socials?.email && (
            <a
              href={`mailto:${member.socials.email}`}
              className="w-9 h-9 rounded-full glass-strong flex items-center justify-center text-night-400 dark:text-white dark:hover:text-yellow-400 hover:text-yellow-400 transition-colors"
              aria-label={`Email ${member.name}`}
            >
              <Mails size={16} />
            </a>
          )}

        </div>
      </div>

      {/* Info */}
      <div className="p-5">
        <h4 className="font-display font-bold text-ink-900 dark:text-white">{member.name}</h4>
        <p className="text-sm text-cyan-600 dark:text-cyan-400 font-medium mb-2">{member.role}</p>
        <p className="text-xs text-ink-500 dark:text-ink-400 leading-relaxed">{member.bio}</p>
      </div>
    </div>
  );
}

export default function TeamShowcase() {
  const doubled = [...TEAM_MEMBERS, ...TEAM_MEMBERS];

  return (
    <section id="team" className="py-20 md:py-28 relative overflow-hidden">
      <div className="container-mx px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-14"
        >
          <span className="badge bg-gold-500/10 text-cyan-600 dark:text-gold-400 dark:bg-gold-400/10 mb-4">
            Our People
          </span>
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-ink-900 dark:text-white mb-4 text-balance">
            The Minds Behind <span className="text-gradient from-cyan-500 to-cyan-400 dark:from-yellow-500 dark:to-yellow-400">TechGems</span>
          </h2>
          <p className="text-ink-600 dark:text-ink-400 max-w-2xl mx-auto">
            A team of engineers, designers, and innovators passionate about crafting digital gems.
          </p>
        </motion.div>
      </div>

      {/* Marquee */}
      <div className="relative flex overflow-hidden group">
        {/* Fade edges */}
        <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-white dark:from-night-300 to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-white dark:from-night-300 to-transparent z-10 pointer-events-none" />

        <motion.div
          className="flex gap-6"
          animate={{ x: ['0%', '-50%'] }}
          transition={{ duration: 40, repeat: Infinity, ease: 'linear' }}
          style={{ width: 'max-content' }}
        >
          {doubled.map((member, i) => (
            <TeamCard key={`${member.name}-${i}`} member={member} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
