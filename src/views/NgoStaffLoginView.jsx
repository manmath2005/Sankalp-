import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { ShieldCheck, Mail, Lock, CheckCircle2, Eye, EyeOff, UserCheck, Sparkles } from 'lucide-react';

export const NgoStaffLoginView = ({ onNavigate }) => {
  const { loginUser, currentUser, logoutUser } = useApp();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  if (currentUser && currentUser.role === 'NGO_STAFF') {
    return (
      <div className="max-w-2xl mx-auto px-4 py-12 text-center space-y-6">
        <div className="horizon-glass-panel p-8 rounded-3xl border border-slate-800/90 shadow-2xl relative overflow-hidden backdrop-blur-2xl space-y-4">
          <div className="horizon-gradient-line absolute top-0 left-0 right-0 h-1"></div>
          <div className="w-16 h-16 rounded-2xl bg-amber-500/20 border border-amber-500/30 text-amber-400 flex items-center justify-center mx-auto font-bold text-xl shadow-lg">
            <ShieldCheck className="w-8 h-8" />
          </div>
          <h2 className="text-2xl font-black text-white">Signed In as NGO Administrative Staff</h2>
          <p className="text-xs text-slate-300">Officer: <strong>{currentUser.name}</strong> ({currentUser.email})</p>
          <div className="flex justify-center gap-3 pt-2">
            <button
              onClick={() => onNavigate('dbms')}
              className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 via-emerald-500 to-sky-500 hover:from-amber-400 hover:to-sky-400 text-slate-950 font-black text-xs shadow-lg transition-all press-effect"
            >
              Open NGO Operations &amp; DBMS →
            </button>
            <button
              onClick={logoutUser}
              className="px-4 py-2.5 rounded-xl bg-slate-800/80 hover:bg-slate-800 border border-slate-700 text-slate-200 font-bold text-xs transition-all"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    );
  }

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    setErrorMessage('');
    setLoading(true);

    try {
      loginUser(email, password, 'NGO_STAFF');
      onNavigate('dbms');
    } catch (err) {
      setErrorMessage(err.message);
    } finally {
      setLoading(false);
    }
  };

  const fillStaffDemo = () => {
    setEmail('staff@sankalp.org');
    setPassword('staff123password');
    setErrorMessage('');
  };

  return (
    <div className="max-w-md mx-auto px-4 py-12 text-left page-enter">
      <div className="horizon-glass-panel p-8 rounded-3xl border border-slate-800/90 bg-slate-900/90 shadow-2xl relative overflow-hidden backdrop-blur-2xl space-y-6 hover-lift animate-scale-in">
        <div className="horizon-gradient-line absolute top-0 left-0 right-0 h-1"></div>
        
        <div className="space-y-2 border-b border-slate-800 pb-4">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-950 border border-amber-500/30 text-amber-300 text-[11px] font-black uppercase tracking-wider">
            <UserCheck className="w-3.5 h-3.5 text-amber-400" /> NGO Staff Internal Gateway
          </div>
          <h1 className="text-2xl font-black text-white">NGO Operations Login</h1>
          <p className="text-xs text-slate-400">
            For Sankalp Campaign Coordinators, Logistics Officers, and Field Leads.
          </p>
        </div>

        {errorMessage && (
          <div className="p-3 rounded-xl bg-red-950/80 border border-red-800 text-xs font-semibold text-red-200">
            {errorMessage}
          </div>
        )}

        <form onSubmit={handleLoginSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1">
              Official Staff Email
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-slate-500 absolute left-3 top-3" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="staff@sankalp.org"
                className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-slate-700/80 bg-slate-950 text-xs font-bold text-white focus:border-amber-500 focus:ring-1 focus:ring-amber-500 focus:outline-none placeholder:text-slate-500 transition-all"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1">
              Staff Password
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 text-slate-500 absolute left-3 top-3" />
              <input
                type={showPassword ? "text" : "password"}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-9 pr-10 py-2.5 rounded-xl border border-slate-700/80 bg-slate-950 text-xs font-bold text-white focus:border-amber-500 focus:ring-1 focus:ring-amber-500 focus:outline-none placeholder:text-slate-500 transition-all"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-3 text-slate-400 hover:text-slate-200"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-xl bg-gradient-to-r from-amber-500 via-emerald-500 to-sky-500 hover:from-amber-400 hover:to-sky-400 text-slate-950 font-black text-xs uppercase tracking-wider shadow-lg transition-all press-effect shadow-amber-500/10"
          >
            {loading ? "Authenticating Staff..." : "Sign In to NGO Staff Dashboard"}
          </button>

          <div className="pt-3 border-t border-slate-800 flex items-center justify-between">
            <span className="text-[11px] text-slate-400">Staff Demo Credentials:</span>
            <button
              type="button"
              onClick={fillStaffDemo}
              className="text-xs font-black text-amber-300 hover:text-amber-200 bg-slate-950 px-2.5 py-1 rounded-lg border border-amber-500/30 press-effect"
            >
              Fill Staff Credentials ⚡
            </button>
          </div>
        </form>

      </div>
    </div>
  );
};
