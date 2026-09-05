import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, X, AlertCircle, Loader2, Mail, Phone, MapPin, Send } from 'lucide-react';
import { supabase } from '@/lib/supabase';

type FormState = {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
};

type Errors = Partial<Record<keyof FormState, string>>;

const EMPTY: FormState = { name: '', email: '', phone: '', subject: '', message: '' };

export default function Contact() {
  const [form, setForm] = useState<FormState>(EMPTY);
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [toast, setToast] = useState(false);

  useEffect(() => {
    if (toast) {
      const t = setTimeout(() => setToast(false), 5000);
      return () => clearTimeout(t);
    }
  }, [toast]);

  const validate = (): boolean => {
    const e: Errors = {};
    if (!form.name.trim()) e.name = 'Name is required';
    if (!form.email.trim()) e.email = 'Email is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = 'Enter a valid email';
    if (form.phone && !/^[\d\s+()-]{7,}$/.test(form.phone)) e.phone = 'Enter a valid phone number';
    if (!form.subject.trim()) e.subject = 'Subject is required';
    if (!form.message.trim()) e.message = 'Message is required';
    else if (form.message.trim().length < 10) e.message = 'Message must be at least 10 characters';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleChange = (field: keyof FormState, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: undefined }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setStatus('loading');
    const { error } = await supabase.from('contact_submissions').insert({
      name: form.name.trim(),
      email: form.email.trim(),
      phone: form.phone.trim() || null,
      subject: form.subject.trim(),
      message: form.message.trim(),
    });
    if (error) {
      setStatus('error');
      setToast(true);
    } else {
      setStatus('success');
      setForm(EMPTY);
      setToast(true);
    }
    setTimeout(() => setStatus('idle'), 2000);
  };

  return (
    <div className="pt-20">
      {/* Header */}
      <section className="relative py-16 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[300px] bg-electric-600/10 dark:bg-electric-600/15 rounded-full blur-3xl" />
        <div className="relative max-w-3xl mx-auto text-center">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="badge bg-electric-600/10 text-electric-600 dark:text-electric-400 mb-4"
          >
            Get In Touch
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="font-display text-4xl md:text-5xl font-bold text-ink-900 dark:text-white mb-4 text-balance"
          >
            Let's Build Something <span className="text-gradient">Brilliant</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-ink-600 dark:text-ink-300 text-lg"
          >
            Have a project in mind? We'd love to hear from you. Send us a message and we'll get back within 24 hours.
          </motion.p>
        </div>
      </section>

      {/* Contact grid */}
      <section className="pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto grid lg:grid-cols-3 gap-8">
          {/* Info */}
          <div className="space-y-4">
            {[
              { icon: Mail, label: 'Email', value: 'hello@techgems.io', href: 'mailto:hello@techgems.io' },
              { icon: Phone, label: 'Phone', value: '+1 (555) 123-4567', href: 'tel:+15551234567' },
              { icon: MapPin, label: 'Office', value: '100 Innovation Drive, Tech City', href: '#' },
            ].map((item, i) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="card-base p-5 flex items-center gap-4 hover:border-electric-600/30 transition-colors"
              >
                <div className="w-12 h-12 rounded-xl bg-electric-600/10 dark:bg-electric-600/20 flex items-center justify-center flex-shrink-0">
                  <item.icon size={22} className="text-electric-600 dark:text-electric-400" />
                </div>
                <div>
                  <p className="text-xs text-ink-500 dark:text-ink-400 uppercase tracking-wide">{item.label}</p>
                  <a href={item.href} className="text-sm font-semibold text-ink-900 dark:text-white hover:text-electric-600 dark:hover:text-electric-400 transition-colors">
                    {item.value}
                  </a>
                </div>
              </motion.div>
            ))}

            {/* Map placeholder */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="card-base p-1 overflow-hidden h-56"
            >
              <div className="w-full h-full rounded-xl bg-gradient-to-br from-electric-600/10 via-ink-100 to-gold-500/10 dark:from-electric-600/20 dark:via-night-500 dark:to-gold-500/10 flex items-center justify-center relative">
                <div className="absolute inset-0 bg-grid-pattern opacity-30" />
                <div className="relative text-center">
                  <MapPin size={32} className="text-electric-600 dark:text-electric-400 mx-auto mb-2" />
                  <p className="text-sm font-medium text-ink-600 dark:text-ink-300">100 Innovation Drive</p>
                  <p className="text-xs text-ink-400">Tech City, TC 10001</p>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Form */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-2 card-base p-6 md:p-8"
          >
            <form onSubmit={handleSubmit} className="space-y-5" noValidate>
              <div className="grid sm:grid-cols-2 gap-5">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-ink-700 dark:text-ink-200 mb-1.5">Full Name *</label>
                  <input
                    id="name"
                    type="text"
                    value={form.name}
                    onChange={(e) => handleChange('name', e.target.value)}
                    className={`input-base ${errors.name ? 'border-red-500' : ''}`}
                    placeholder="John Doe"
                  />
                  {errors.name && <p className="mt-1 text-xs text-red-500 flex items-center gap-1"><AlertCircle size={12} /> {errors.name}</p>}
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-ink-700 dark:text-ink-200 mb-1.5">Email *</label>
                  <input
                    id="email"
                    type="email"
                    value={form.email}
                    onChange={(e) => handleChange('email', e.target.value)}
                    className={`input-base ${errors.email ? 'border-red-500' : ''}`}
                    placeholder="john@example.com"
                  />
                  {errors.email && <p className="mt-1 text-xs text-red-500 flex items-center gap-1"><AlertCircle size={12} /> {errors.email}</p>}
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-5">
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-ink-700 dark:text-ink-200 mb-1.5">Phone Number</label>
                  <input
                    id="phone"
                    type="tel"
                    value={form.phone}
                    onChange={(e) => handleChange('phone', e.target.value)}
                    className={`input-base ${errors.phone ? 'border-red-500' : ''}`}
                    placeholder="+1 (555) 000-0000"
                  />
                  {errors.phone && <p className="mt-1 text-xs text-red-500 flex items-center gap-1"><AlertCircle size={12} /> {errors.phone}</p>}
                </div>
                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-ink-700 dark:text-ink-200 mb-1.5">Subject *</label>
                  <input
                    id="subject"
                    type="text"
                    value={form.subject}
                    onChange={(e) => handleChange('subject', e.target.value)}
                    className={`input-base ${errors.subject ? 'border-red-500' : ''}`}
                    placeholder="Project Inquiry"
                  />
                  {errors.subject && <p className="mt-1 text-xs text-red-500 flex items-center gap-1"><AlertCircle size={12} /> {errors.subject}</p>}
                </div>
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-ink-700 dark:text-ink-200 mb-1.5">Message *</label>
                <textarea
                  id="message"
                  rows={5}
                  value={form.message}
                  onChange={(e) => handleChange('message', e.target.value)}
                  className={`input-base resize-none ${errors.message ? 'border-red-500' : ''}`}
                  placeholder="Tell us about your project..."
                />
                {errors.message && <p className="mt-1 text-xs text-red-500 flex items-center gap-1"><AlertCircle size={12} /> {errors.message}</p>}
              </div>

              <button
                type="submit"
                disabled={status === 'loading'}
                className="btn-primary w-full sm:w-auto disabled:opacity-50"
              >
                {status === 'loading' ? (
                  <><Loader2 size={18} className="animate-spin" /> Sending...</>
                ) : (
                  <>Send Message <Send size={16} /></>
                )}
              </button>
            </form>
          </motion.div>
        </div>
      </section>

      {/* Toast */}
      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: 50, x: '-50%' }}
            animate={{ opacity: 1, y: 0, x: '-50%' }}
            exit={{ opacity: 0, y: 50, x: '-50%' }}
            className="fixed bottom-8 left-1/2 z-50"
          >
            {status === 'success' ? (
              <div className="glass-strong rounded-2xl shadow-2xl p-4 flex items-center gap-3 max-w-md">
                <div className="w-10 h-10 rounded-full bg-green-500/20 flex items-center justify-center">
                  <CheckCircle size={22} className="text-green-500" />
                </div>
                <div>
                  <p className="font-semibold text-ink-900 dark:text-white text-sm">Message Sent!</p>
                  <p className="text-xs text-ink-500 dark:text-ink-400">Thanks! Your message has been received. We'll get back to you soon.</p>
                </div>
                <button onClick={() => setToast(false)} className="ml-2 p-1 text-ink-400 hover:text-ink-600">
                  <X size={16} />
                </button>
              </div>
            ) : (
              <div className="glass-strong rounded-2xl shadow-2xl p-4 flex items-center gap-3 max-w-md">
                <div className="w-10 h-10 rounded-full bg-red-500/20 flex items-center justify-center">
                  <AlertCircle size={22} className="text-red-500" />
                </div>
                <div>
                  <p className="font-semibold text-ink-900 dark:text-white text-sm">Something went wrong</p>
                  <p className="text-xs text-ink-500 dark:text-ink-400">Please try again later.</p>
                </div>
                <button onClick={() => setToast(false)} className="ml-2 p-1 text-ink-400 hover:text-ink-600">
                  <X size={16} />
                </button>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
