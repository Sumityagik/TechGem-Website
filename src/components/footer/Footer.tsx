import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Linkedin, Github, Instagram, Twitter, Mail, MapPin, Phone, Send, CheckCircle } from 'lucide-react';
import Logo from '@/components/common/Logo';
import { supabase } from '@/lib/supabase';

const FOOTER_LINKS = {
  company: [
    { label: 'About', path: '/about' },
    { label: 'Services', path: '/#services' },
    { label: 'Team', path: '/#team' },
    { label: 'Contact', path: '/contact' },
  ],
  services: [
    { label: 'Web Development', path: '/#services' },
    { label: 'App Development', path: '/#services' },
    { label: 'AI/ML', path: '/#services' },
    { label: 'Cloud', path: '/#services' },
    { label: 'UI/UX', path: '/#services' },
    { label: 'Custom Software', path: '/#services' },
  ],
  resources: [
    { label: 'Privacy Policy', path: '#' },
    { label: 'Terms & Conditions', path: '#' },
    { label: 'FAQ', path: '#' },
  ],
};

const SOCIAL_LINKS = [
  { icon: Linkedin, label: 'LinkedIn', href: 'https://www.linkedin.com/company/techgem-india/' },
  { icon: Github, label: 'GitHub', href: '#' },
  { icon: Instagram, label: 'Instagram', href: 'https://www.instagram.com/techgems206' },
  { icon: Twitter, label: 'X/Twitter', href: '#' },
];

export default function Footer() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setStatus('error');
      return;
    }
    setStatus('loading');
    // Simulate newsletter signup (could store in Supabase later)
    await new Promise((r) => setTimeout(r, 1000));
    setStatus('success');
    setEmail('');
    setTimeout(() => setStatus('idle'), 4000);
  };

  return (
    <footer className="relative bg-night-300 dark:bg-night-200 text-ink-300 overflow-hidden">
      {/* Decorative gem pattern */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold-500/50 to-transparent" />
      <div className="absolute -top-20 -right-20 w-64 h-64 opacity-5">
        <svg viewBox="0 0 48 48" fill="none" className="w-full h-full">
          <path d="M24 3 L41 17 L24 45 L7 17 Z" fill="#d4af37" />
        </svg>
      </div>
      <div className="absolute -bottom-20 -left-20 w-48 h-48 opacity-5">
        <svg viewBox="0 0 48 48" fill="none" className="w-full h-full">
          <path d="M24 3 L41 17 L24 45 L7 17 Z" fill="#0066ff" />
        </svg>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-12">
          {/* Brand + Newsletter */}
          <div className="lg:col-span-2">
            <Logo size={36} />
            <p className="mt-4 text-sm text-ink-400 leading-relaxed max-w-xs">
              Turning ideas into digital gems. We craft modern technology solutions that help businesses grow.
            </p>
            <div className="mt-6 space-y-2">
              <div className="flex items-center gap-2 text-sm text-ink-400">
                <Mail size={16} className="text-cyan-400" /> hello@techgems.io
              </div>
              <div className="flex items-center gap-2 text-sm text-ink-400">
                <Phone size={16} className="text-cyan-400" /> +91 75718 54256
              </div>
              <div className="flex items-center gap-2 text-sm text-ink-400">
                <MapPin size={16} className="text-cyan-400" /> Kanpur Institute of Technology, Industrial area Rooma, Kanpur, Uttar Pradesh 208001
              </div>
            </div>
            <div className="mt-6 flex gap-3">
              {SOCIAL_LINKS.map((s) => (
                <motion.a
                  key={s.label}
                  href={s.href}
                  aria-label={s.label}
                  whileHover={{ y: -3, scale: 1.1 }}
                  className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-ink-400 hover:text-cyan-400 hover:border-cyan-400/50 transition-colors"
                >
                  <s.icon size={18} />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Links */}
          <div>
            <h4 className="font-display font-semibold text-white text-sm mb-4">Company</h4>
            <ul className="space-y-2.5">
              {FOOTER_LINKS.company.map((l) => (
                <li key={l.label}>
                  <Link to={l.path} className="text-sm text-ink-400 hover:text-cyan-400 transition-colors">{l.label}</Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="font-display font-semibold text-white text-sm mb-4">Services</h4>
            <ul className="space-y-2.5">
              {FOOTER_LINKS.services.map((l) => (
                <li key={l.label}>
                  <Link to={l.path} className="text-sm text-ink-400 hover:text-cyan-400 transition-colors">{l.label}</Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="font-display font-semibold text-white text-sm mb-4">Resources</h4>
            <ul className="space-y-2.5">
              {FOOTER_LINKS.resources.map((l) => (
                <li key={l.label}>
                  <Link to={l.path} className="text-sm text-ink-400 hover:text-cyan-400 transition-colors">{l.label}</Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Newsletter */}
        <div className="mt-12 pt-8 border-t border-white/10">
          <div className="flex flex-col md:flex-row md:items-center gap-4">
            <div className="flex-1">
              <h4 className="font-display font-semibold text-white text-sm mb-1">Stay in the loop</h4>
              <p className="text-sm text-ink-400">Subscribe to our newsletter for the latest updates and insights.</p>
            </div>
            <form onSubmit={handleSubscribe} className="flex gap-2 w-full md:w-auto">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="flex-1 md:w-64 px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white placeholder-ink-500 text-sm focus:outline-none focus:ring-2 focus:ring-cyan-600/50"
              />
              <button
                type="submit"
                disabled={status === 'loading'}
                className="btn-primary py-2.5 px-5 text-sm whitespace-nowrap disabled:opacity-50"
              >
                {status === 'loading' ? '...' : status === 'success' ? (
                  <><CheckCircle size={16} /> Subscribed</>
                ) : (
                  <>Subscribe <Send size={14} /></>
                )}
              </button>
            </form>
          </div>
          {status === 'error' && <p className="mt-2 text-xs text-red-400">Please enter a valid email address.</p>}
          {status === 'success' && <p className="mt-2 text-xs text-green-400">Thanks for subscribing!</p>}
        </div>

        {/* Copyright */}
        <div className="mt-8 pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-ink-500">© 2026 TechGems. All rights reserved.</p>
          <p className="text-xs text-ink-600">Technology, Refined.</p>
        </div>
      </div>
    </footer>
  );
}
