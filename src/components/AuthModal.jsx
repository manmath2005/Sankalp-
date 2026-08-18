import React, { useState } from 'react';
import { 
  X, 
  Lock, 
  Mail, 
  User, 
  ShieldCheck, 
  Building, 
  Eye, 
  EyeOff, 
  Sparkles,
  Zap,
  Phone,
  Check
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export const AuthModal = () => {
  const { 
    authModalOpen, 
    setAuthModalOpen, 
    authMode, 
    setAuthMode, 
    loginUser, 
    registerUser,
    showToast 
  } = useApp();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [institution, setInstitution] = useState('');
  const [role, setRole] = useState('VOLUNTEER'); // VOLUNTEER or NGO_ADMIN
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  if (!authModalOpen) return null;

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    setErrorMessage('');
    setLoading(true);

    try {
      loginUser(email, password);
    } catch (err) {
      setErrorMessage(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');
    setLoading(true);

    try {
      await registerUser({
        name,
        email,
        password,
        phone,
        institution,
        role
      });
      // Verification modal will open automatically via AppContext
    } catch (err) {
      setErrorMessage(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Quick Demo Account Login Shortcuts
  const fillDemoAccount = (demoRole) => {
    if (demoRole === 'admin') {
      setEmail('admin@sankalp.org');
      setPassword('admin123password');
    } else {
      setEmail('rohan.verma@example.com');
      setPassword('volunteer123');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-md glass-panel rounded-3xl border border-slate-200 shadow-float-lg overflow-hidden flex flex-col text-left">
        
        {/* Modal Header */}
        <div className="p-6 bg-slate-900 text-white relative">
          <button
            onClick={() => setAuthModalOpen(false)}
            className="absolute top-4 right-4 p-2 rounded-full bg-white/10 hover:bg-white/20 text-slate-300 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-2 mb-1">
            <ShieldCheck className="w-5 h-5 text-sky-400" />
            <span className="text-xs font-bold text-sky-400 uppercase tracking-widest">
              Sankalp Security Gateway
            </span>
          </div>

          <h2 className="text-xl font-extrabold text-white">
            {authMode === 'login' ? 'Welcome Back' : 'Join as a Verified Volunteer'}
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            {authMode === 'login' 
              ? 'Access your events, certificates, and NGO administration.' 
              : 'Sign up with interactive email OTP verification.'}
          </p>

          {/* Mode Switcher Tabs */}
          <div className="grid grid-cols-2 gap-1 mt-4 bg-white/10 p-1 rounded-xl">
            <button
              onClick={() => { setAuthMode('login'); setErrorMessage(''); }}
              className={`py-1.5 rounded-lg text-xs font-bold transition-all ${
                authMode === 'login' 
                  ? 'bg-sky-500 text-white shadow' 
                  : 'text-slate-300 hover:text-white'
              }`}
            >
              Sign In
            </button>
            <button
              onClick={() => { setAuthMode('register'); setErrorMessage(''); }}
              className={`py-1.5 rounded-lg text-xs font-bold transition-all ${
                authMode === 'register' 
                  ? 'bg-sky-500 text-white shadow' 
                  : 'text-slate-300 hover:text-white'
              }`}
            >
              Register
            </button>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-4">
          
          {errorMessage && (
            <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-xs font-medium text-red-700">
              {errorMessage}
            </div>
          )}

          {authMode === 'login' ? (
            <form onSubmit={handleLoginSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="name@example.com"
                    className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-slate-300 text-xs font-medium focus:ring-2 focus:ring-sky-500 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Password
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
                className="w-full py-3 rounded-xl bg-sky-600 hover:bg-sky-700 text-white font-bold text-xs shadow-md transition-all flex items-center justify-center gap-2"
              >
                {loading ? "Authenticating..." : "Sign In to Account"}
              </button>

              {/* Demo Account Shortcuts */}
              <div className="pt-3 border-t border-slate-100">
                <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2">
                  Quick Demo One-Click Fill:
                </p>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => fillDemoAccount('volunteer')}
                    className="px-2.5 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-[11px] font-semibold text-left border border-slate-200"
                  >
                    👤 Demo Volunteer
                  </button>
                  <button
                    type="button"
                    onClick={() => fillDemoAccount('admin')}
                    className="px-2.5 py-1.5 rounded-lg bg-sky-50 hover:bg-sky-100 text-sky-800 text-[11px] font-semibold text-left border border-sky-200"
                  >
                    🛡️ Demo NGO Admin
                  </button>
                </div>
              </div>
            </form>
          ) : (
            <form onSubmit={handleRegisterSubmit} className="space-y-3">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Full Name
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Ananya Sharma"
                    className="w-full pl-9 pr-4 py-2 rounded-xl border border-slate-300 text-xs font-medium focus:ring-2 focus:ring-sky-500 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Email Address (Verification OTP sent here)
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="ananya@college.edu"
                    className="w-full pl-9 pr-4 py-2 rounded-xl border border-slate-300 text-xs font-medium focus:ring-2 focus:ring-sky-500 focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Phone Number
                  </label>
                  <div className="relative">
                    <Phone className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                    <input
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="+91 98000 00000"
                      className="w-full pl-9 pr-3 py-2 rounded-xl border border-slate-300 text-xs font-medium focus:ring-2 focus:ring-sky-500 focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Role Category
                  </label>
                  <select
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs font-medium focus:ring-2 focus:ring-sky-500 focus:outline-none bg-white"
                  >
                    <option value="VOLUNTEER">Volunteer</option>
                    <option value="NGO_ADMIN">NGO Administrative Staff</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  College / School / Organization
                </label>
                <div className="relative">
                  <Building className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                  <input
                    type="text"
                    required
                    value={institution}
                    onChange={(e) => setInstitution(e.target.value)}
                    placeholder="e.g. National Institute of Tech"
                    className="w-full pl-9 pr-3 py-2 rounded-xl border border-slate-300 text-xs font-medium focus:ring-2 focus:ring-sky-500 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Create Password
                </label>
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="At least 6 characters"
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs font-medium focus:ring-2 focus:ring-sky-500 focus:outline-none"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-2.5 rounded-xl bg-gradient-to-r from-sky-600 to-sky-700 hover:from-sky-700 hover:to-sky-800 text-white font-bold text-xs shadow-md transition-all flex items-center justify-center gap-2 mt-2"
              >
                <Zap className="w-3.5 h-3.5 fill-current" />
                {loading ? "Sending OTP..." : "Proceed to Email OTP Verification"}
              </button>
            </form>
          )}

        </div>

      </div>
    </div>
  );
};
