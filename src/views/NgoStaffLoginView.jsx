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
        <div className="glass-panel p-8 rounded-3xl border border-slate-200 shadow-sm space-y-4">
          <div className="w-16 h-16 rounded-2xl bg-sky-100 text-sky-600 flex items-center justify-center mx-auto font-bold text-xl">
            <ShieldCheck className="w-8 h-8" />
          </div>
          <h2 className="text-2xl font-extrabold text-slate-900">Signed In as NGO Administrative Staff</h2>
          <p className="text-xs text-slate-600">Officer: <strong>{currentUser.name}</strong> ({currentUser.email})</p>
          <div className="flex justify-center gap-3">
            <button
              onClick={() => onNavigate('dbms')}
              className="px-6 py-2.5 rounded-xl bg-slate-900 text-white font-bold text-xs shadow"
            >
              Open NGO Operations & DBMS →
            </button>
            <button
              onClick={logoutUser}
              className="px-4 py-2.5 rounded-xl bg-slate-100 text-slate-700 font-bold text-xs"
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
      <div className="glass-panel p-8 rounded-3xl border border-slate-200 shadow-float space-y-6 hover-lift animate-scale-in">
        
        <div className="space-y-2 border-b border-slate-200 pb-4">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-sky-100 text-sky-800 text-[11px] font-extrabold uppercase">
            <UserCheck className="w-3.5 h-3.5" /> NGO Staff Internal Gateway
          </div>
          <h1 className="text-2xl font-extrabold text-slate-900">NGO Operations Login</h1>
          <p className="text-xs text-slate-500">
            For Sankalp Campaign Coordinators, Logistics Officers, and Field Leads.
          </p>
        </div>

        {errorMessage && (
          <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-xs font-semibold text-red-700">
            {errorMessage}
          </div>
        )}

        <form onSubmit={handleLoginSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
              Official Staff Email
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="staff@sankalp.org"
                className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-slate-300 text-xs font-medium focus:ring-2 focus:ring-sky-500 focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
              Staff Password
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
              <input
                type={showPassword ? "text" : "password"}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-9 pr-10 py-2.5 rounded-xl border border-slate-300 text-xs font-medium focus:ring-2 focus:ring-sky-500 focus:outline-none"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-3 text-slate-400 hover:text-slate-600"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs shadow-md transition-all press-effect"
          >
            {loading ? "Authenticating Staff..." : "Sign In to NGO Staff Dashboard"}
          </button>

          <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
            <span className="text-[11px] text-slate-500">Staff Demo Credentials:</span>
            <button
              type="button"
              onClick={fillStaffDemo}
              className="text-xs font-bold text-sky-700 hover:underline bg-sky-50 px-2.5 py-1 rounded-lg border border-sky-200 press-effect"
            >
              Fill Staff Credentials ⚡
            </button>
          </div>
        </form>

      </div>
    </div>
  );
};
