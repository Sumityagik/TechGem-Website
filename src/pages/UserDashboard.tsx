import { useState, useEffect, useCallback } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  User, Mail, Phone, Calendar, Clock, Plus, X, Loader2, CheckCircle,
  AlertCircle, CalendarPlus, LayoutDashboard, UserCircle, CalendarDays,
} from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { supabase, type Appointment } from '@/lib/supabase';
import { SERVICES, TIME_SLOTS } from '@/lib/data';

type Tab = 'overview' | 'appointments' | 'profile';

const STATUS_STYLES: Record<string, string> = {
  pending: 'bg-yellow-100 text-yellow-700 dark:bg-yellow-500/20 dark:text-yellow-400',
  confirmed: 'bg-blue-100 text-blue-700 dark:bg-blue-500/20 dark:text-blue-400',
  completed: 'bg-green-100 text-green-700 dark:bg-green-500/20 dark:text-green-400',
  cancelled: 'bg-red-100 text-red-700 dark:bg-red-500/20 dark:text-red-400',
};

export default function UserDashboard() {
  const { user, profile, loading, signOut, refreshProfile } = useAuth();
  const navigate = useNavigate();
  const [tab, setTab] = useState<Tab>('overview');
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [apptLoading, setApptLoading] = useState(true);
  const [showBookModal, setShowBookModal] = useState(false);
  const [booking, setBooking] = useState({ service: '', date: '', time: '', message: '' });
  const [bookingStatus, setBookingStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [profileEdit, setProfileEdit] = useState({ name: '', phone: '' });
  const [profileStatus, setProfileStatus] = useState<'idle' | 'loading' | 'success'>('idle');

  const loadAppointments = useCallback(async () => {
    if (!user) return;
    setApptLoading(true);
    const { data } = await supabase
      .from('appointments')
      .select('*')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false });
    setAppointments((data || []) as Appointment[]);
    setApptLoading(false);
  }, [user]);

  useEffect(() => {
    if (user) {
      loadAppointments();
      setProfileEdit({ name: profile?.full_name || '', phone: profile?.phone || '' });
    }
  }, [user, profile, loadAppointments]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-20">
        <Loader2 size={32} className="animate-spin text-cyan-600" />
      </div>
    );
  }

  if (!user) return <Navigate to="/login" replace />;

  const handleBook = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!booking.service || !booking.date || !booking.time) return;
    setBookingStatus('loading');
    const { error } = await supabase.from('appointments').insert({
      user_id: user.id,
      service: booking.service,
      date: booking.date,
      appointment_time: booking.time,
      message: booking.message.trim() || null,
    });
    if (error) {
      setBookingStatus('error');
    } else {
      setBookingStatus('success');
      await loadAppointments();
      setTimeout(() => {
        setShowBookModal(false);
        setBooking({ service: '', date: '', time: '', message: '' });
        setBookingStatus('idle');
      }, 1500);
    }
  };

  const handleCancel = async (id: string) => {
    await supabase.from('appointments').update({ status: 'cancelled' }).eq('id', id);
    await loadAppointments();
  };

  const handleProfileSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setProfileStatus('loading');
    await supabase.from('profiles').update({
      full_name: profileEdit.name.trim(),
      phone: profileEdit.phone.trim() || null,
    }).eq('id', user.id);
    await refreshProfile();
    setProfileStatus('success');
    setTimeout(() => setProfileStatus('idle'), 2000);
  };

  const pendingCount = appointments.filter((a) => a.status === 'pending').length;
  const confirmedCount = appointments.filter((a) => a.status === 'confirmed').length;

  const tabs: { id: Tab; label: string; icon: typeof LayoutDashboard }[] = [
    { id: 'overview', label: 'Overview', icon: LayoutDashboard },
    { id: 'appointments', label: 'Appointments', icon: CalendarDays },
    { id: 'profile', label: 'Profile', icon: UserCircle },
  ];

  return (
    <div className="pt-20 min-h-screen bg-ink-50 dark:bg-night-200">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="font-display text-2xl md:text-3xl font-bold text-ink-900 dark:text-white">
              Welcome, {profile?.full_name || 'User'}
            </h1>
            <p className="text-sm text-ink-500 dark:text-ink-400 mt-1">Manage your appointments and profile</p>
          </div>
          <button onClick={() => setShowBookModal(true)} className="btn-primary text-sm">
            <CalendarPlus size={18} /> Book Appointment
          </button>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-6 overflow-x-auto scrollbar-hide">
          {tabs.map((t) => (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-all whitespace-nowrap ${
                tab === t.id
                  ? 'bg-cyan-600 text-white shadow-lg shadow-cyan-600/30'
                  : 'glass text-ink-600 dark:text-ink-300 hover:text-cyan-600 dark:bg-yellow-600'
              }`}
            >
              <t.icon size={16} /> {t.label}
            </button>
          ))}
        </div>

        {/* Content */}
        <AnimatePresence mode="wait">
          {tab === 'overview' && (
            <motion.div key="overview" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {[
                  { label: 'Total Appointments', value: appointments.length, icon: Calendar, color: 'cyan' },
                  { label: 'Pending', value: pendingCount, icon: Clock, color: 'gold' },
                  { label: 'Confirmed', value: confirmedCount, icon: CheckCircle, color: 'green' },
                ].map((s) => (
                  <div key={s.label} className="card-base p-5">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-xs text-ink-500 dark:text-ink-400 uppercase tracking-wide">{s.label}</p>
                        <p className="font-display text-3xl font-bold text-ink-900 dark:text-white mt-1">{s.value}</p>
                      </div>
                      <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                        s.color === 'cyan' ? 'bg-cyan-600/10 text-cyan-600' :
                        s.color === 'gold' ? 'bg-gold-500/10 text-gold-600' :
                        'bg-green-500/10 text-green-600'
                      }`}>
                        <s.icon size={22} />
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="card-base p-6">
                <h3 className="font-display font-bold text-ink-900 dark:text-white mb-4">Recent Appointments</h3>
                {apptLoading ? (
                  <div className="flex justify-center py-8"><Loader2 size={24} className="animate-spin text-cyan-600" /></div>
                ) : appointments.length === 0 ? (
                  <p className="text-sm text-ink-500 dark:text-ink-400 text-center py-8">No appointments yet. Book your first one!</p>
                ) : (
                  <div className="space-y-3">
                    {appointments.slice(0, 3).map((a) => (
                      <div key={a.id} className="flex items-center justify-between p-3 rounded-xl bg-ink-50 dark:bg-white/5">
                        <div>
                          <p className="text-sm font-semibold text-ink-900 dark:text-white">{a.service}</p>
                          <p className="text-xs text-ink-500">{a.date} at {a.appointment_time}</p>
                        </div>
                        <span className={`badge ${STATUS_STYLES[a.status]}`}>{a.status}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </motion.div>
          )}

          {tab === 'appointments' && (
            <motion.div key="appts" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
              <div className="card-base p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-display font-bold text-ink-900 dark:text-white">Your Appointments</h3>
                  <button onClick={() => setShowBookModal(true)} className="btn-secondary text-sm py-2 px-4">
                    <Plus size={16} /> New
                  </button>
                </div>
                {apptLoading ? (
                  <div className="flex justify-center py-8"><Loader2 size={24} className="animate-spin text-cyan-600" /></div>
                ) : appointments.length === 0 ? (
                  <div className="text-center py-12">
                    <CalendarDays size={40} className="text-ink-300 dark:text-ink-600 mx-auto mb-3" />
                    <p className="text-sm text-ink-500 dark:text-ink-400 mb-4">No appointments yet</p>
                    <button onClick={() => setShowBookModal(true)} className="btn-primary text-sm">Book Your First Appointment</button>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {appointments.map((a) => (
                      <div key={a.id} className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 rounded-xl bg-ink-50 dark:bg-white/5 border border-ink-100 dark:border-white/5">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-xl bg-cyan-600/10 flex items-center justify-center flex-shrink-0">
                            <Calendar size={18} className="text-cyan-600" />
                          </div>
                          <div>
                            <p className="text-sm font-semibold text-ink-900 dark:text-white">{a.service}</p>
                            <p className="text-xs text-ink-500">{a.date} at {a.appointment_time}</p>
                            {a.message && <p className="text-xs text-ink-400 mt-1 italic">"{a.message}"</p>}
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <span className={`badge ${STATUS_STYLES[a.status]}`}>{a.status}</span>
                          {a.status === 'pending' && (
                            <button onClick={() => handleCancel(a.id)} className="text-xs text-red-500 hover:text-red-600 font-medium">
                              Cancel
                            </button>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </motion.div>
          )}

          {tab === 'profile' && (
            <motion.div key="profile" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
              <div className="card-base p-6 max-w-2xl">
                <h3 className="font-display font-bold text-ink-900 dark:text-white mb-6">Profile Settings</h3>
                <form onSubmit={handleProfileSave} className="space-y-5">
                  <div>
                    <label className="block text-sm font-medium text-ink-700 dark:text-ink-200 mb-1.5">Email (cannot change)</label>
                    <div className="relative">
                      <Mail size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-ink-400" />
                      <input type="email" value={user.email || ''} disabled className="input-base pl-10 opacity-60 cursor-not-allowed" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-ink-700 dark:text-ink-200 mb-1.5">Full Name</label>
                    <div className="relative">
                      <User size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-ink-400" />
                      <input type="text" value={profileEdit.name} onChange={(e) => setProfileEdit((p) => ({ ...p, name: e.target.value }))} className="input-base pl-10" placeholder="Your name" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-ink-700 dark:text-ink-200 mb-1.5">Phone</label>
                    <div className="relative">
                      <Phone size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-ink-400" />
                      <input type="tel" value={profileEdit.phone} onChange={(e) => setProfileEdit((p) => ({ ...p, phone: e.target.value }))} className="input-base pl-10" placeholder="+1 (555) 000-0000" />
                    </div>
                  </div>
                  <button type="submit" disabled={profileStatus === 'loading'} className="btn-primary disabled:opacity-50">
                    {profileStatus === 'loading' ? <><Loader2 size={18} className="animate-spin" /> Saving...</> :
                     profileStatus === 'success' ? <><CheckCircle size={18} /> Saved!</> : 'Save Changes'}
                  </button>
                </form>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Booking Modal */}
      <AnimatePresence>
        {showBookModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
          >
            <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setShowBookModal(false)} />
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative glass-strong rounded-2xl p-6 w-full max-w-lg max-h-[90vh] overflow-y-auto"
            >
              <div className="flex items-center justify-between mb-5">
                <h3 className="font-display text-lg font-bold text-ink-900 dark:text-white">Book Appointment</h3>
                <button onClick={() => setShowBookModal(false)} className="p-2 text-ink-400 hover:text-ink-600"><X size={20} /></button>
              </div>

              {bookingStatus === 'success' ? (
                <div className="text-center py-8">
                  <CheckCircle size={48} className="text-green-500 mx-auto mb-3" />
                  <p className="font-semibold text-ink-900 dark:text-white">Appointment Booked!</p>
                  <p className="text-sm text-ink-500 mt-1">We'll confirm your appointment soon.</p>
                </div>
              ) : (
                <form onSubmit={handleBook} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-ink-700 dark:text-ink-200 mb-1.5">Service *</label>
                    <select value={booking.service} onChange={(e) => setBooking((b) => ({ ...b, service: e.target.value }))} className="input-base" required>
                      <option value="">Select a service</option>
                      {SERVICES.map((s) => <option key={s.id} value={s.title}>{s.title}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-ink-700 dark:text-ink-200 mb-1.5">Date *</label>
                    <input type="date" min={new Date().toISOString().split('T')[0]} value={booking.date} onChange={(e) => setBooking((b) => ({ ...b, date: e.target.value }))} className="input-base" required />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-ink-700 dark:text-ink-200 mb-1.5">Time *</label>
                    <div className="grid grid-cols-4 gap-2">
                      {TIME_SLOTS.map((t) => (
                        <button
                          key={t}
                          type="button"
                          onClick={() => setBooking((b) => ({ ...b, time: t }))}
                          className={`px-2 py-2 rounded-lg text-xs font-medium transition-all ${
                            booking.time === t
                              ? 'bg-cyan-600 text-white'
                              : 'bg-ink-100 dark:bg-white/5 text-ink-600 dark:text-ink-300 hover:bg-cyan-600/10'
                          }`}
                        >
                          {t}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-ink-700 dark:text-ink-200 mb-1.5">Additional Requirements</label>
                    <textarea rows={3} value={booking.message} onChange={(e) => setBooking((b) => ({ ...b, message: e.target.value }))} className="input-base resize-none" placeholder="Any specific requirements..." />
                  </div>
                  {bookingStatus === 'error' && (
                    <p className="text-sm text-red-500 flex items-center gap-1"><AlertCircle size={14} /> Failed to book. Please try again.</p>
                  )}
                  <button type="submit" disabled={bookingStatus === 'loading'} className="btn-primary w-full disabled:opacity-50">
                    {bookingStatus === 'loading' ? <><Loader2 size={18} className="animate-spin" /> Booking...</> : 'Confirm Booking'}
                  </button>
                </form>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
