import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X, Send, Minus } from 'lucide-react';
import Logo from '@/components/common/Logo';

type Message = {
  id: number;
  role: 'bot' | 'user';
  text: string;
};

const PREDEFINED_RESPONSES: Record<string, string> = {
  services: 'We offer Web Development, Mobile Apps, AI/ML, Cloud Solutions, UI/UX Design, and Custom Software. Which one interests you?',
  pricing: 'Pricing depends on your project scope. Book an appointment and we\'ll provide a tailored quote!',
  contact: 'You can reach us at hello@techgems.io or call +1 (555) 123-4567. You can also use our contact page.',
  appointment: 'You can book an appointment from your dashboard after registering. Would you like me to guide you there?',
  hello: 'Hi there! How can I help you today? Ask me about our services, pricing, or booking an appointment.',
  default: 'That\'s a great question! For more details, feel free to reach out via our contact page or book an appointment with our team.',
};

function getResponse(input: string): string {
  const lower = input.toLowerCase();
  if (lower.includes('service') || lower.includes('what do you do')) return PREDEFINED_RESPONSES.services;
  if (lower.includes('price') || lower.includes('cost') || lower.includes('pricing')) return PREDEFINED_RESPONSES.pricing;
  if (lower.includes('contact') || lower.includes('email') || lower.includes('phone')) return PREDEFINED_RESPONSES.contact;
  if (lower.includes('appointment') || lower.includes('book') || lower.includes('schedule')) return PREDEFINED_RESPONSES.appointment;
  if (lower.includes('hello') || lower.includes('hi') || lower.includes('hey')) return PREDEFINED_RESPONSES.hello;
  return PREDEFINED_RESPONSES.default;
}

export default function Chatbot() {
  const [open, setOpen] = useState(false);
  const [minimized, setMinimized] = useState(false);
  const [input, setInput] = useState('');
  const [typing, setTyping] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { id: 0, role: 'bot', text: "Hi! I'm the TechGems assistant. How can I help you today?" },
  ]);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' });
  }, [messages, typing]);

  const sendMessage = () => {
    if (!input.trim()) return;
    const userMsg: Message = { id: Date.now(), role: 'user', text: input.trim() };
    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setTyping(true);
    setTimeout(() => {
      const botMsg: Message = { id: Date.now() + 1, role: 'bot', text: getResponse(userMsg.text) };
      setMessages((prev) => [...prev, botMsg]);
      setTyping(false);
    }, 1200);
  };

  return (
    <>
      {/* Floating button */}
      <AnimatePresence>
        {!open && (
          <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            onClick={() => { setOpen(true); setMinimized(false); }}
            className="fixed bottom-6 right-6 z-50 flex items-center gap-2 px-5 py-3.5 rounded-full bg-electric-600 text-white shadow-lg shadow-electric-600/40 hover:shadow-xl hover:shadow-electric-600/50 hover:scale-105 transition-all"
            aria-label="Open chat"
          >
            <MessageCircle size={22} />
            <span className="font-semibold text-sm hidden sm:inline">Ask TechGems</span>
            <motion.div
              className="absolute -top-1 -right-1 w-3 h-3 bg-gold-500 rounded-full"
              animate={{ scale: [1, 1.3, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Chat window */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.9 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className={`fixed bottom-6 right-6 z-50 ${minimized ? 'w-72' : 'w-[calc(100vw-3rem)] sm:w-96'} glass-strong rounded-2xl shadow-2xl overflow-hidden flex flex-col`}
            style={{ height: minimized ? 'auto' : 'min(560px, calc(100vh - 3rem))' }}
          >
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-3 bg-electric-600 text-white">
              <div className="flex items-center gap-2.5">
                <Logo size={24} showText={false} />
                <div>
                  <p className="font-display font-semibold text-sm">TechGems Assistant</p>
                  <p className="text-xs text-electric-100 flex items-center gap-1">
                    <span className="w-1.5 h-1.5 bg-green-400 rounded-full" /> Online
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-1">
                <button onClick={() => setMinimized(!minimized)} className="p-1.5 hover:bg-white/10 rounded-lg transition-colors" aria-label="Minimize">
                  <Minus size={16} />
                </button>
                <button onClick={() => { setOpen(false); setMinimized(false); }} className="p-1.5 hover:bg-white/10 rounded-lg transition-colors" aria-label="Close">
                  <X size={16} />
                </button>
              </div>
            </div>

            {!minimized && (
              <>
                {/* Messages */}
                <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-3 scrollbar-hide">
                  {messages.map((msg) => (
                    <motion.div
                      key={msg.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div
                        className={`max-w-[80%] px-4 py-2.5 rounded-2xl text-sm ${
                          msg.role === 'user'
                            ? 'bg-electric-600 text-white rounded-br-md'
                            : 'bg-ink-100 dark:bg-white/10 text-ink-800 dark:text-ink-100 rounded-bl-md'
                        }`}
                      >
                        {msg.text}
                      </div>
                    </motion.div>
                  ))}
                  {typing && (
                    <div className="flex justify-start">
                      <div className="px-4 py-3 rounded-2xl rounded-bl-md bg-ink-100 dark:bg-white/10">
                        <div className="flex gap-1">
                          {[0, 1, 2].map((i) => (
                            <motion.div
                              key={i}
                              className="w-2 h-2 bg-ink-400 dark:bg-ink-300 rounded-full"
                              animate={{ y: [0, -4, 0] }}
                              transition={{ duration: 0.6, repeat: Infinity, delay: i * 0.15 }}
                            />
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Input */}
                <div className="p-3 border-t border-ink-200 dark:border-white/10">
                  <div className="flex items-center gap-2">
                    <input
                      type="text"
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
                      placeholder="Type your message..."
                      className="flex-1 px-3 py-2.5 rounded-xl bg-ink-50 dark:bg-white/5 border border-ink-200 dark:border-white/10 text-sm text-ink-900 dark:text-white placeholder-ink-400 focus:outline-none focus:ring-2 focus:ring-electric-600/50"
                    />
                    <button
                      onClick={sendMessage}
                      className="p-2.5 rounded-xl bg-electric-600 text-white hover:bg-electric-700 transition-colors"
                      aria-label="Send"
                    >
                      <Send size={18} />
                    </button>
                  </div>
                </div>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
