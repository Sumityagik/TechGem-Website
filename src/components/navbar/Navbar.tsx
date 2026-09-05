import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Sun, Moon, LogOut, LayoutDashboard, User } from 'lucide-react';
import Logo from '@/components/common/Logo';
import { useTheme } from '@/context/ThemeContext';
import { useAuth } from '@/context/AuthContext';

const NAV_LINKS = [
  { label: 'Home', path: '/' },
  { label: 'About', path: '/about' },
  { label: 'Services', path: '/#services' },
  { label: 'Team', path: '/#team' },
  { label: 'Contact', path: '/contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const { user, profile, signOut } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    setUserMenuOpen(false);
  }, [location.pathname]);

  const handleNavClick = (path: string) => {
    if (path.includes('#')) {
      const [route, hash] = path.split('#');
      if (route === location.pathname || route === '') {
        document.getElementById(hash)?.scrollIntoView({ behavior: 'smooth' });
      } else {
        navigate(route || '/');
        setTimeout(() => document.getElementById(hash)?.scrollIntoView({ behavior: 'smooth' }), 100);
      }
    } else {
      navigate(path);
    }
  };

  return (
    <>
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className="fixed top-3 left-3 right-3 z-50"
      >
        <nav
          className={`mx-auto max-w-6xl rounded-2xl border transition-all duration-300 ${
            scrolled
              ? 'border-cyan-600/20 dark:border-cyan-400/20 bg-ink-200 dark:bg-night-400/80 backdrop-blur-xl shadow-xl shadow-cyan-600/10 dark:shadow-black/40'
              : 'border-ink-200/60 dark:border-white/10 bg-white/60 dark:bg-night-400/50 backdrop-blur-md shadow-lg shadow-ink-900/5 dark:shadow-black/20'
          }`}
        >
          {/* Gold accent line at top */}
          <div className="h-[2px] rounded-t-2xl bg-gradient-to-r from-transparent via-gold-500/50 to-transparent" />

          <div className={`flex items-center justify-between px-4 sm:px-5 transition-all duration-300 ${scrolled ? 'h-14' : 'h-16'}`}>
            <Link to="/" className="flex-shrink-0">
              <Logo size={scrolled ? 28 : 32} />
            </Link>

            {/* Desktop nav */}
            <div className="hidden md:flex items-center gap-1">
              {NAV_LINKS.map((link) => (
                <button
                  key={link.label}
                  onClick={() => handleNavClick(link.path)}
                  className="relative px-4 py-2 text-sm font-medium text-ink-700 dark:text-ink-200 hover:text-cyan-600 dark:hover:text-yellow-400 transition-colors rounded-lg hover:bg-cyan-600/10 dark:hover:bg-cyan-400/10 group"
                >
                  {link.label}
                  <span className="absolute bottom-0.5 left-1/2 -translate-x-1/2 w-0 group-hover:w-6 h-0.5 bg-gradient-to-r from-cyan-600 to-gold-500 rounded-full transition-all duration-300" />
                </button>
              ))}
            </div>

            {/* Right actions */}
            <div className="flex items-center gap-2 sm:gap-3">
              {/* Theme toggle */}
              <button
                onClick={toggleTheme}
                aria-label="Toggle theme"
                className="p-2.5 rounded-xl text-ink-600 dark:text-ink-300 hover:bg-cyan-600/10 dark:hover:bg-cyan-400/10 transition-colors"
              >
                <AnimatePresence mode="wait">
                  <motion.div
                    key={theme}
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    {theme === 'light' ? <Moon size={18} /> : <Sun size={18} />}
                  </motion.div>
                </AnimatePresence>
              </button>

              {/* Auth */}
              {user ? (
                <div className="relative hidden md:block">
                  <button
                    onClick={() => setUserMenuOpen(!userMenuOpen)}
                    className="flex items-center gap-2 px-3 py-2 rounded-xl hover:bg-cyan-600/10 dark:hover:bg-cyan-400/10 transition-colors"
                  >
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-cyan-600 to-cyan-400 flex items-center justify-center text-white text-sm font-semibold">
                      {(profile?.full_name || user.email || 'U')[0].toUpperCase()}
                    </div>
                    <span className="text-sm font-medium text-ink-700 dark:text-ink-200 max-w-[100px] truncate">
                      {profile?.full_name || 'User'}
                    </span>
                  </button>
                  <AnimatePresence>
                    {userMenuOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.2 }}
                        className="absolute right-0 mt-2 w-56 rounded-xl border border-ink-200/60 dark:border-white/10 bg-white/90 dark:bg-night-400/90 backdrop-blur-xl shadow-2xl overflow-hidden"
                      >
                        <div className="p-3 border-b border-ink-200 dark:border-white/10">
                          <p className="text-sm font-semibold text-ink-900 dark:text-white truncate">
                            {profile?.full_name || 'User'}
                          </p>
                          <p className="text-xs text-ink-500 truncate">{user.email}</p>
                        </div>
                        <div className="p-1.5">
                          {profile?.role === 'admin' && (
                            <button
                              onClick={() => navigate('/admin')}
                              className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-ink-700 dark:text-ink-200 hover:bg-cyan-600/10 hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors"
                            >
                              <LayoutDashboard size={16} /> Admin Dashboard
                            </button>
                          )}
                          <button
                            onClick={() => navigate('/dashboard')}
                            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-ink-700 dark:text-ink-200 hover:bg-cyan-600/10 hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors"
                          >
                            <User size={16} /> My Dashboard
                          </button>
                          <button
                            onClick={() => { signOut(); navigate('/'); }}
                            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-red-600 hover:bg-red-50 dark:hover:bg-red-500/10 transition-colors"
                          >
                            <LogOut size={16} /> Sign Out
                          </button>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ) : (
                <div className="hidden md:flex items-center gap-2">
                  <Link to="/login" className="px-4 py-2 text-sm font-medium text-ink-700 dark:text-ink-200 hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors">
                    Login
                  </Link>
                  <Link to="/register" className="btn-primary text-sm py-2 px-5">
                    Get Started
                  </Link>
                </div>
              )}

              {/* Mobile menu toggle */}
              <button
                onClick={() => setMobileOpen(!mobileOpen)}
                className="md:hidden p-2.5 rounded-xl text-ink-700 dark:text-ink-200 hover:bg-cyan-600/10 dark:hover:bg-cyan-400/10"
                aria-label="Menu"
              >
                {mobileOpen ? <X size={20} /> : <Menu size={20} />}
              </button>
            </div>
          </div>
        </nav>
      </motion.header>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 md:hidden"
          >
            <div className="absolute inset-0 bg-black/30 backdrop-blur-sm" onClick={() => setMobileOpen(false)} />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="absolute right-0 top-0 bottom-0 w-80 max-w-[85%] glass-strong p-6 pt-24 overflow-y-auto"
            >
              <div className="flex flex-col gap-1">
                {NAV_LINKS.map((link, i) => (
                  <motion.button
                    key={link.label}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 }}
                    onClick={() => handleNavClick(link.path)}
                    className="text-left px-4 py-3 text-base font-medium text-ink-700 dark:text-ink-200 hover:text-cyan-600 dark:hover:text-cyan-400 hover:bg-cyan-600/5 rounded-xl transition-colors"
                  >
                    {link.label}
                  </motion.button>
                ))}
              </div>

              <div className="mt-6 pt-6 border-t border-ink-200 dark:border-white/10 flex flex-col gap-3">
                {user ? (
                  <>
                    {profile?.role === 'admin' && (
                      <button onClick={() => navigate('/admin')} className="btn-secondary w-full justify-start">
                        <LayoutDashboard size={18} /> Admin Dashboard
                      </button>
                    )}
                    <button onClick={() => navigate('/dashboard')} className="btn-secondary w-full justify-start">
                      <User size={18} /> My Dashboard
                    </button>
                    <button onClick={() => { signOut(); navigate('/'); }} className="btn-secondary w-full justify-start text-red-600">
                      <LogOut size={18} /> Sign Out
                    </button>
                  </>
                ) : (
                  <>
                    <Link to="/login" className="btn-secondary w-full">Login</Link>
                    <Link to="/register" className="btn-primary w-full">Get Started</Link>
                  </>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
