import { useState, useEffect, useCallback } from 'react';
import { Navigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Users, Calendar, Clock, Mail, Search, Loader2, Trash2,
  CheckCircle, XCircle, AlertCircle, LayoutDashboard, Filter,
} from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { supabase } from '@/lib/supabase';

type AdminAppointment = {
  id: string;
  user_id: string;
  service: string;
  date: string;
  appointment_time: string;
  message: string | null;
  status: string;
  created_at: string;
  full_name: string | null;
  email: string | null;
};

type AdminContact = {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  subject: string;
  message: string;
  status: string;
  created_at: string;
};

type AdminUser = {
  id: string;
  full_name: string;
  phone: string | null;
  role: string;
  created_at: string;
};

type Tab = 'overview' | 'appointments' | 'messages' | 'users';

const STATUS_STYLES: Record<string, string> = {
  pending: 'bg-yellow-100 text-yellow-700 dark:bg-yellow-500/20 dark:text-yellow-400',
  confirmed: 'bg-blue-100 text-blue-700 dark:bg-blue-500/20 dark:text-blue-400',
  completed: 'bg-green-100 text-green-700 dark:bg-green-500/20 dark:text-green-400',
  cancelled: 'bg-red-100 text-red-700 dark:bg-red-500/20 dark:text-red-400',
  new: 'bg-cyan-100 text-cyan-700 dark:bg-cyan-500/20 dark:text-cyan-400',
  read: 'bg-ink-100 text-ink-600 dark:bg-white/10 dark:text-ink-300',
  archived: 'bg-ink-100 text-ink-500 dark:bg-white/5 dark:text-ink-500',
};

export default function AdminDashboard() {
  const { user, profile, loading } = useAuth();
  const [tab, setTab] = useState<Tab>('overview');
  const [appointments, setAppointments] = useState<AdminAppointment[]>([]);
  const [contacts, setContacts] = useState<AdminContact[]>([]);
  const [users, setUsers] = useState<AdminUser[]>([]);
  const [dataLoading, setDataLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('all');

  const loadData = useCallback(async () => {
    setDataLoading(true);
    const [apptRes, contactRes, userRes] = await Promise.all([
      supabase.rpc('admin_list_appointments'),
      supabase.rpc('admin_list_contact_submissions'),
      supabase.rpc('admin_list_profiles'),
    ]);
    setAppointments((apptRes.data || []) as AdminAppointment[]);
    setContacts((contactRes.data || []) as AdminContact[]);
    setUsers((userRes.data || []) as AdminUser[]);
    setDataLoading(false);
  }, []);

  useEffect(() => {
    if (user && profile?.role === 'admin') loadData();
  }, [user, profile, loadData]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-20">
        <Loader2 size={32} className="animate-spin text-cyan-600" />
      </div>
    );
  }

  if (!user) return <Navigate to="/login" replace />;
  if (profile?.role !== 'admin') return <Navigate to="/dashboard" replace />;

  const updateAppointmentStatus = async (id: string, status: string) => {
    await supabase.rpc('admin_update_appointment_status', { apt_id: id, new_status: status });
    await loadData();
  };

  const updateContactStatus = async (id: string, status: string) => {
    await supabase.rpc('admin_update_contact_status', { sub_id: id, new_status: status });
    await loadData();
  };

  const deleteContact = async (id: string) => {
    await supabase.rpc('admin_delete_contact_submission', { sub_id: id });
    await loadData();
  };

  const pendingAppts = appointments.filter((a) => a.status === 'pending').length;

  const filteredAppointments = appointments.filter((a) => {
    const matchesSearch = !search ||
      a.service.toLowerCase().includes(search.toLowerCase()) ||
      (a.full_name || '').toLowerCase().includes(search.toLowerCase()) ||
      (a.email || '').toLowerCase().includes(search.toLowerCase());
    const matchesFilter = filter === 'all' || a.status === filter;
    return matchesSearch && matchesFilter;
  });

  const filteredContacts = contacts.filter((c) => {
    const matchesSearch = !search ||
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.email.toLowerCase().includes(search.toLowerCase()) ||
      c.subject.toLowerCase().includes(search.toLowerCase());
    const matchesFilter = filter === 'all' || c.status === filter;
    return matchesSearch && matchesFilter;
  });

  const tabs: { id: Tab; label: string; icon: typeof LayoutDashboard }[] = [
    { id: 'overview', label: 'Overview', icon: LayoutDashboard },
    { id: 'appointments', label: 'Appointments', icon: Calendar },
    { id: 'messages', label: 'Messages', icon: Mail },
    { id: 'users', label: 'Users', icon: Users },
  ];

  return (
    <div className="pt-20 min-h-screen bg-ink-50 dark:bg-night-200">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="font-display text-2xl md:text-3xl font-bold text-ink-900 dark:text-white">
            Admin Dashboard
          </h1>
          <p className="text-sm text-ink-500 dark:text-ink-400 mt-1">Manage appointments, messages, and users</p>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-6 overflow-x-auto scrollbar-hide">
          {tabs.map((t) => (
            <button
              key={t.id}
              onClick={() => { setTab(t.id); setSearch(''); setFilter('all'); }}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-all whitespace-nowrap ${
                tab === t.id
                  ? 'bg-cyan-600 text-white shadow-lg shadow-cyan-600/30'
                  : 'glass text-ink-600 dark:text-ink-300 hover:text-cyan-600'
              }`}
            >
              <t.icon size={16} /> {t.label}
            </button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          {/* Overview */}
          {tab === 'overview' && (
            <motion.div key="overview" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="space-y-6">
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                {[
                  { label: 'Total Users', value: users.length, icon: Users, color: 'cyan' },
                  { label: 'Total Appointments', value: appointments.length, icon: Calendar, color: 'blue' },
                  { label: 'Pending', value: pendingAppts, icon: Clock, color: 'gold' },
                  { label: 'Messages', value: contacts.length, icon: Mail, color: 'green' },
                ].map((s) => (
                  <div key={s.label} className="card-base p-5">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-xs text-ink-500 dark:text-ink-400 uppercase tracking-wide">{s.label}</p>
                        <p className="font-display text-2xl md:text-3xl font-bold text-ink-900 dark:text-white mt-1">{s.value}</p>
                      </div>
                      <div className={`w-11 h-11 rounded-xl flex items-center justify-center ${
                        s.color === 'cyan' ? 'bg-cyan-600/10 text-cyan-600' :
                        s.color === 'blue' ? 'bg-blue-500/10 text-blue-500' :
                        s.color === 'gold' ? 'bg-gold-500/10 text-gold-600' :
                        'bg-green-500/10 text-green-600'
                      }`}>
                        <s.icon size={20} />
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Recent activity */}
              <div className="grid lg:grid-cols-2 gap-4">
                <div className="card-base p-5">
                  <h3 className="font-display font-bold text-ink-900 dark:text-white mb-3">Recent Appointments</h3>
                  {dataLoading ? <div className="flex justify-center py-6"><Loader2 size={20} className="animate-spin text-cyan-600" /></div> :
                   appointments.length === 0 ? <p className="text-sm text-ink-500 text-center py-6">No appointments</p> : (
                    <div className="space-y-2">
                      {appointments.slice(0, 4).map((a) => (
                        <div key={a.id} className="flex items-center justify-between p-2.5 rounded-lg bg-ink-50 dark:bg-white/5">
                          <div>
                            <p className="text-sm font-medium text-ink-900 dark:text-white">{a.service}</p>
                            <p className="text-xs text-ink-500">{a.full_name || 'Unknown'} - {a.date}</p>
                          </div>
                          <span className={`badge text-xs ${STATUS_STYLES[a.status] || ''}`}>{a.status}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
                <div className="card-base p-5">
                  <h3 className="font-display font-bold text-ink-900 dark:text-white mb-3">Recent Messages</h3>
                  {dataLoading ? <div className="flex justify-center py-6"><Loader2 size={20} className="animate-spin text-cyan-600" /></div> :
                   contacts.length === 0 ? <p className="text-sm text-ink-500 text-center py-6">No messages</p> : (
                    <div className="space-y-2">
                      {contacts.slice(0, 4).map((c) => (
                        <div key={c.id} className="flex items-center justify-between p-2.5 rounded-lg bg-ink-50 dark:bg-white/5">
                          <div>
                            <p className="text-sm font-medium text-ink-900 dark:text-white">{c.subject}</p>
                            <p className="text-xs text-ink-500">{c.name} - {c.email}</p>
                          </div>
                          <span className={`badge text-xs ${STATUS_STYLES[c.status] || ''}`}>{c.status}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          )}

          {/* Appointments */}
          {tab === 'appointments' && (
            <motion.div key="appts" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
              <div className="card-base p-5">
                <div className="flex flex-col sm:flex-row gap-3 mb-4">
                  <div className="relative flex-1">
                    <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-ink-400" />
                    <input type="text" value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search appointments..." className="input-base pl-10" />
                  </div>
                  <select value={filter} onChange={(e) => setFilter(e.target.value)} className="input-base sm:w-40">
                    <option value="all">All Status</option>
                    <option value="pending">Pending</option>
                    <option value="confirmed">Confirmed</option>
                    <option value="completed">Completed</option>
                    <option value="cancelled">Cancelled</option>
                  </select>
                </div>

                {dataLoading ? (
                  <div className="flex justify-center py-12"><Loader2 size={24} className="animate-spin text-cyan-600" /></div>
                ) : filteredAppointments.length === 0 ? (
                  <div className="text-center py-12">
                    <Calendar size={36} className="text-ink-300 dark:text-ink-600 mx-auto mb-2" />
                    <p className="text-sm text-ink-500">No appointments found</p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {filteredAppointments.map((a) => (
                      <div key={a.id} className="flex flex-col md:flex-row md:items-center justify-between gap-3 p-4 rounded-xl bg-ink-50 dark:bg-white/5 border border-ink-100 dark:border-white/5">
                        <div className="flex-1">
                          <p className="text-sm font-semibold text-ink-900 dark:text-white">{a.service}</p>
                          <p className="text-xs text-ink-500 mt-0.5">
                            {a.full_name || 'Unknown'} ({a.email || 'No email'}) - {a.date} at {a.appointment_time}
                          </p>
                          {a.message && <p className="text-xs text-ink-400 mt-1 italic">"{a.message}"</p>}
                        </div>
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className={`badge text-xs ${STATUS_STYLES[a.status] || ''}`}>{a.status}</span>
                          {a.status === 'pending' && (
                            <button onClick={() => updateAppointmentStatus(a.id, 'confirmed')} className="p-1.5 rounded-lg bg-blue-500/10 text-blue-600 hover:bg-blue-500/20" title="Confirm">
                              <CheckCircle size={16} />
                            </button>
                          )}
                          {(a.status === 'pending' || a.status === 'confirmed') && (
                            <>
                              <button onClick={() => updateAppointmentStatus(a.id, 'completed')} className="p-1.5 rounded-lg bg-green-500/10 text-green-600 hover:bg-green-500/20" title="Mark completed">
                                <CheckCircle size={16} />
                              </button>
                              <button onClick={() => updateAppointmentStatus(a.id, 'cancelled')} className="p-1.5 rounded-lg bg-red-500/10 text-red-600 hover:bg-red-500/20" title="Cancel">
                                <XCircle size={16} />
                              </button>
                            </>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </motion.div>
          )}

          {/* Messages */}
          {tab === 'messages' && (
            <motion.div key="messages" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
              <div className="card-base p-5">
                <div className="flex flex-col sm:flex-row gap-3 mb-4">
                  <div className="relative flex-1">
                    <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-ink-400" />
                    <input type="text" value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search messages..." className="input-base pl-10" />
                  </div>
                  <select value={filter} onChange={(e) => setFilter(e.target.value)} className="input-base sm:w-40">
                    <option value="all">All Status</option>
                    <option value="new">New</option>
                    <option value="read">Read</option>
                    <option value="archived">Archived</option>
                  </select>
                </div>

                {dataLoading ? (
                  <div className="flex justify-center py-12"><Loader2 size={24} className="animate-spin text-cyan-600" /></div>
                ) : filteredContacts.length === 0 ? (
                  <div className="text-center py-12">
                    <Mail size={36} className="text-ink-300 dark:text-ink-600 mx-auto mb-2" />
                    <p className="text-sm text-ink-500">No messages found</p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {filteredContacts.map((c) => (
                      <div key={c.id} className="p-4 rounded-xl bg-ink-50 dark:bg-white/5 border border-ink-100 dark:border-white/5">
                        <div className="flex items-start justify-between gap-3 mb-2">
                          <div>
                            <p className="text-sm font-semibold text-ink-900 dark:text-white">{c.subject}</p>
                            <p className="text-xs text-ink-500">{c.name} - {c.email}{c.phone ? ` - ${c.phone}` : ''}</p>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className={`badge text-xs ${STATUS_STYLES[c.status] || ''}`}>{c.status}</span>
                          </div>
                        </div>
                        <p className="text-sm text-ink-600 dark:text-ink-300 mt-2">{c.message}</p>
                        <div className="flex gap-2 mt-3">
                          {c.status === 'new' && (
                            <button onClick={() => updateContactStatus(c.id, 'read')} className="text-xs px-3 py-1.5 rounded-lg bg-cyan-600/10 text-cyan-600 hover:bg-cyan-600/20 font-medium">
                              Mark Read
                            </button>
                          )}
                          {c.status !== 'archived' && (
                            <button onClick={() => updateContactStatus(c.id, 'archived')} className="text-xs px-3 py-1.5 rounded-lg bg-ink-200/50 dark:bg-white/5 text-ink-600 dark:text-ink-300 hover:bg-ink-200 dark:hover:bg-white/10 font-medium">
                              Archive
                            </button>
                          )}
                          <button onClick={() => deleteContact(c.id)} className="text-xs px-3 py-1.5 rounded-lg bg-red-500/10 text-red-600 hover:bg-red-500/20 font-medium flex items-center gap-1">
                            <Trash2 size={12} /> Delete
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </motion.div>
          )}

          {/* Users */}
          {tab === 'users' && (
            <motion.div key="users" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
              <div className="card-base p-5">
                <h3 className="font-display font-bold text-ink-900 dark:text-white mb-4">Registered Users</h3>
                {dataLoading ? (
                  <div className="flex justify-center py-12"><Loader2 size={24} className="animate-spin text-cyan-600" /></div>
                ) : users.length === 0 ? (
                  <div className="text-center py-12">
                    <Users size={36} className="text-ink-300 dark:text-ink-600 mx-auto mb-2" />
                    <p className="text-sm text-ink-500">No users found</p>
                  </div>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="text-left text-xs text-ink-500 uppercase tracking-wide border-b border-ink-200 dark:border-white/10">
                          <th className="pb-3 pr-4">Name</th>
                          <th className="pb-3 pr-4">Phone</th>
                          <th className="pb-3 pr-4">Role</th>
                          <th className="pb-3">Joined</th>
                        </tr>
                      </thead>
                      <tbody>
                        {users.map((u) => (
                          <tr key={u.id} className="border-b border-ink-100 dark:border-white/5">
                            <td className="py-3 pr-4">
                              <div className="flex items-center gap-2">
                                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-cyan-600 to-cyan-400 flex items-center justify-center text-white text-xs font-semibold">
                                  {(u.full_name || 'U')[0].toUpperCase()}
                                </div>
                                <span className="font-medium text-ink-900 dark:text-white">{u.full_name || 'Unnamed'}</span>
                              </div>
                            </td>
                            <td className="py-3 pr-4 text-ink-500">{u.phone || '—'}</td>
                            <td className="py-3 pr-4">
                              <span className={`badge text-xs ${u.role === 'admin' ? 'bg-gold-500/10 text-gold-600' : 'bg-cyan-600/10 text-cyan-600'}`}>
                                {u.role}
                              </span>
                            </td>
                            <td className="py-3 text-ink-500 text-xs">{new Date(u.created_at).toLocaleDateString()}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
