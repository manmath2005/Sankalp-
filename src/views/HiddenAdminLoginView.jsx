import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { KeyRound, ShieldAlert, Lock, Mail, CheckCircle2, Eye, EyeOff, Terminal, ShieldCheck } from 'lucide-react';

export const HiddenAdminLoginView = ({ onNavigate }) => {
  const { loginUser, currentUser, logoutUser } = useApp();

  const [email, setEmail] = useState('admin@sankalp.org');
  const [password, setPassword] = useState('secretAdmin2026!');
  const [adminPin, setAdminPin] = useState('9944');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');


  if (currentUser && currentUser.role === 'SUPER_ADMIN') {
    return (
      <div className="max-w-2xl mx-auto px-4 py-12 text-center space-y-6">
        <div className="horizon-glass-panel p-8 rounded-3xl border border-slate-800/90 bg-slate-900/90 text-white shadow-2xl relative overflow-hidden backdrop-blur-2xl space-y-4">
          <div className="horizon-gradient-line absolute top-0 left-0 right-0 h-1"></div>
          <div className="w-16 h-16 rounded-2xl bg-amber-500/20 border border-amber-500/30 text-amber-400 flex items-center justify-center mx-auto shadow-lg">
            <KeyRound className="w-8 h-8" />
          </div>
          <h2 className="text-2xl font-black text-white">Super Admin Access Granted</h2>
          <p className="text-xs text-slate-300">Logged in as: <strong>{currentUser.name}</strong> (Super Admin)</p>
          <div className="flex justify-center gap-3 pt-2">
            <button
              onClick={() => onNavigate('dbms')}
              className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 via-emerald-500 to-sky-500 hover:from-amber-400 hover:to-sky-400 text-slate-950 font-black text-xs shadow-lg transition-all press-effect"
            >
              Access Central DBMS Control Panel →
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

  const handleAdminSubmit = (e) => {
    e.preventDefault();
    setErrorMessage('');
    setLoading(true);

    try {
      const result = loginUser(email, password, 'SUPER_ADMIN', adminPin);
      if (!result) {
        setErrorMessage('Authentication failed. Please check your credentials.');
      }
    } catch (err) {
      setErrorMessage(err.message);
    } finally {
      setLoading(false);
    }
  };

  const fillAdminDemo = () => {
    setEmail('admin@sankalp.org');
    setPassword('secretAdmin2026!');
    setAdminPin('9944');
  };

  return (
    <div className="max-w-md mx-auto px-4 py-12 text-left">
      <div className="horizon-glass-panel p-8 rounded-3xl bg-slate-900/90 text-white border border-slate-800/90 shadow-2xl relative overflow-hidden backdrop-blur-2xl space-y-6">
        <div className="horizon-gradient-line absolute top-0 left-0 right-0 h-1"></div>
        
        {/* Secret Header */}
        <div className="space-y-2 border-b border-slate-800 pb-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-500/10 text-red-400 text-[10px] font-black uppercase tracking-widest border border-red-500/30">
            <ShieldAlert className="w-3.5 h-3.5" /> Hidden Administrative Security Gateway
          </div>
          <h1 className="text-2xl font-black text-white">NGO Super Admin Access</h1>
          <p className="text-xs text-slate-400">
            Restricted access point for DBMS Central System Control. Requires double-layer security PIN authentication.
          </p>
        </div>

        {errorMessage && (
          <div className="p-3 rounded-xl bg-red-950/80 border border-red-800 text-xs font-semibold text-red-200">
            {errorMessage}
          </div>
        )}

        <form onSubmit={handleAdminSubmit} className="space-y-4">
          <div>
            <label className="block text-[11px] font-bold text-slate-300 uppercase tracking-wider mb-1">
              Admin Super Email
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-slate-500 absolute left-3 top-3" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@sankalp.org"
                className="w-full pl-9 pr-4 py-2.5 rounded-xl bg-slate-950 border border-slate-700/80 text-xs font-bold text-white focus:border-amber-500 focus:ring-1 focus:ring-amber-500 focus:outline-none transition-all placeholder:text-slate-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-[11px] font-bold text-slate-300 uppercase tracking-wider mb-1">
              Master Password
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 text-slate-500 absolute left-3 top-3" />
              <input
                type={showPassword ? "text" : "password"}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••••"
                className="w-full pl-9 pr-10 py-2.5 rounded-xl bg-slate-950 border border-slate-700/80 text-xs font-bold text-white focus:border-amber-500 focus:ring-1 focus:ring-amber-500 focus:outline-none transition-all placeholder:text-slate-500"
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

          <div>
            <label className="block text-[11px] font-bold text-amber-400 uppercase tracking-wider mb-1 flex items-center justify-between">
              <span>Secondary Security PIN (4-Digits)</span>
              <span className="text-[9px] text-slate-500 font-mono">Demo PIN: 9944</span>
            </label>
            <div className="relative">
              <KeyRound className="w-4 h-4 text-amber-500 absolute left-3 top-3" />
              <input
                type="password"
                maxLength={4}
                required
                value={adminPin}
                onChange={(e) => setAdminPin(e.target.value.replace(/\D/g, ''))}
                placeholder="••••"
                className="w-full pl-9 pr-4 py-2.5 rounded-xl bg-slate-950 border border-amber-500/40 text-sm font-mono font-bold tracking-widest text-amber-300 focus:border-amber-400 focus:ring-2 focus:ring-amber-500/20 focus:outline-none"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-xl bg-gradient-to-r from-amber-500 via-emerald-500 to-sky-500 hover:from-amber-400 hover:to-sky-400 text-slate-950 font-black text-xs uppercase tracking-wider shadow-lg transition-all flex items-center justify-center gap-2 press-effect shadow-amber-500/10"
          >
            {loading ? "Verifying Administrative Credentials..." : "Authenticate & Open DBMS Panel"}
          </button>

          <div className="pt-3 border-t border-slate-800 flex items-center justify-between">
            <span className="text-[10px] text-slate-400 font-mono">DEBUG AUTO-FILL:</span>
            <button
              type="button"
              onClick={fillAdminDemo}
              className="text-[11px] font-black text-amber-300 hover:text-amber-200 bg-slate-950 px-2.5 py-1 rounded-lg border border-amber-500/30 press-effect"
            >
              Fill Hidden Admin Credentials 🔑
            </button>
          </div>
        </form>

      </div>
    </div>
  );
};
