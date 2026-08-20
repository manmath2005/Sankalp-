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
        <div className="glass-panel p-8 rounded-3xl border border-slate-900 bg-slate-900 text-white shadow-float-lg space-y-4">
          <div className="w-16 h-16 rounded-2xl bg-sky-500/20 text-sky-400 flex items-center justify-center mx-auto">
            <KeyRound className="w-8 h-8" />
          </div>
          <h2 className="text-2xl font-extrabold text-white">Super Admin Access Granted</h2>
          <p className="text-xs text-slate-300">Logged in as: <strong>{currentUser.name}</strong> (Super Admin)</p>
          <div className="flex justify-center gap-3">
            <button
              onClick={() => onNavigate('dbms')}
              className="px-6 py-2.5 rounded-xl bg-sky-500 hover:bg-sky-400 text-slate-950 font-extrabold text-xs shadow"
            >
              Access Central DBMS Control Panel →
            </button>
            <button
              onClick={logoutUser}
              className="px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs"
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
      loginUser(email, password, 'SUPER_ADMIN', adminPin);
      onNavigate('dbms');
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
      <div className="glass-panel p-8 rounded-3xl bg-slate-950 text-white border border-slate-800 shadow-float-lg space-y-6">
        
        {/* Secret Header */}
        <div className="space-y-2 border-b border-slate-800 pb-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-500/20 text-red-400 text-[10px] font-extrabold uppercase tracking-widest border border-red-500/30">
            <ShieldAlert className="w-3.5 h-3.5" /> Hidden Administrative Security Gateway
          </div>
          <h1 className="text-2xl font-extrabold text-white">NGO Super Admin Access</h1>
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
            <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1">
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
                className="w-full pl-9 pr-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-xs font-medium text-white focus:ring-2 focus:ring-sky-500 focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1">
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
                className="w-full pl-9 pr-10 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-xs font-medium text-white focus:ring-2 focus:ring-sky-500 focus:outline-none"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-3 text-slate-500 hover:text-slate-300"
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
                className="w-full pl-9 pr-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-sm font-mono font-bold tracking-widest text-amber-300 focus:ring-2 focus:ring-amber-500 focus:outline-none"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-xl bg-sky-500 hover:bg-sky-400 text-slate-950 font-extrabold text-xs shadow-md transition-all flex items-center justify-center gap-2"
          >
            {loading ? "Verifying Administrative Credentials..." : "Authenticate & Open DBMS Panel"}
          </button>

          <div className="pt-3 border-t border-slate-800 flex items-center justify-between">
            <span className="text-[10px] text-slate-500 font-mono">DEBUG AUTO-FILL:</span>
            <button
              type="button"
              onClick={fillAdminDemo}
              className="text-[11px] font-bold text-sky-400 hover:underline bg-white/5 px-2.5 py-1 rounded-lg border border-white/10"
            >
              Fill Hidden Admin Credentials 🔑
            </button>
          </div>
        </form>

      </div>
    </div>
  );
};
