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
  Check,
  Smartphone,
  Send
} from 'lucide-react';
import { FirebasePhoneAuth } from './FirebasePhoneAuth';
import { useApp } from '../context/AppContext';

export const AuthModal = () => {
  const { 
    authModalOpen, 
    setAuthModalOpen, 
    authMode, 
    setAuthMode, 
    loginUser, 
    registerUser,
    initiateMobileOtpLogin,
    showToast 
  } = useApp();

  const [loginMethod, setLoginMethod] = useState('email_password'); // 'email_password' or 'mobile_otp'
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [institution, setInstitution] = useState('');
  const [role, setRole] = useState('VOLUNTEER'); // VOLUNTEER or NGO_ADMIN
  const [regVerificationMethod, setRegVerificationMethod] = useState('EMAIL'); // 'EMAIL' or 'MOBILE'
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

  const handleMobileOtpSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');
    const cleanDigits = mobileNumber.replace(/\D/g, '');
    if (!cleanDigits || cleanDigits.length < 10) {
      setErrorMessage('Please enter a valid 10-digit mobile number.');
      return;
    }
    setLoading(true);
    try {
      await initiateMobileOtpLogin(mobileNumber);
      setAuthModalOpen(false);
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
      }, regVerificationMethod);
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
            <div className="space-y-4">
              {/* Method Switcher Tabs: Email/Password vs Mobile OTP */}
              <div className="flex p-1 rounded-2xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                <button
                  type="button"
                  onClick={() => { setLoginMethod('email_password'); setErrorMessage(''); }}
                  className={`flex-1 py-2 rounded-xl text-xs font-black transition-all flex items-center justify-center gap-1.5 ${
                    loginMethod === 'email_password'
                      ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-xs'
                      : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
                  }`}
                >
                  <Mail className="w-3.5 h-3.5 text-sky-600" />
                  <span>Email &amp; Password</span>
                </button>

                <button
                  type="button"
                  onClick={() => { setLoginMethod('mobile_otp'); setErrorMessage(''); }}
                  className={`flex-1 py-2 rounded-xl text-xs font-black transition-all flex items-center justify-center gap-1.5 ${
                    loginMethod === 'mobile_otp'
                      ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-xs'
                      : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
                  }`}
                >
                  <Smartphone className="w-3.5 h-3.5" />
                  <span>Mobile OTP</span>
                  <span className="text-[9px] px-1.5 py-0.2 rounded-full bg-amber-400 text-slate-950 font-black">5 MIN</span>
                </button>
              </div>

              {loginMethod === 'email_password' ? (
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
                        className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 text-xs font-bold text-slate-900 dark:text-white bg-white dark:bg-slate-900 focus:ring-2 focus:ring-sky-500 focus:outline-none placeholder:text-slate-400 dark:placeholder:text-slate-500"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1">
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
                        className="w-full pl-9 pr-10 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 text-xs font-bold text-slate-900 dark:text-white bg-white dark:bg-slate-900 focus:ring-2 focus:ring-sky-500 focus:outline-none placeholder:text-slate-400 dark:placeholder:text-slate-500"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-3 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
                      >
                        {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-3 rounded-xl bg-gradient-to-r from-emerald-600 via-teal-600 to-sky-600 hover:from-emerald-700 hover:to-sky-700 text-white font-black text-xs uppercase tracking-wider shadow-md transition-all flex items-center justify-center gap-2 press-effect"
                  >
                    {loading ? "Authenticating..." : "Sign In to Account"}
                  </button>
                </form>
              ) : (
                <div className="pt-1">
                  <FirebasePhoneAuth 
                    expectedRole={null} 
                    onSuccess={() => setAuthModalOpen(false)} 
                  />
                </div>
              )}
            </div>
          ) : (

            <form onSubmit={handleRegisterSubmit} className="space-y-3">
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1">
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
                    className="w-full pl-9 pr-4 py-2 rounded-xl border border-slate-300 dark:border-slate-700 text-xs font-bold text-slate-900 dark:text-white bg-white dark:bg-slate-900 focus:ring-2 focus:ring-sky-500 focus:outline-none placeholder:text-slate-400 dark:placeholder:text-slate-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1">
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
                    className="w-full pl-9 pr-4 py-2 rounded-xl border border-slate-300 dark:border-slate-700 text-xs font-bold text-slate-900 dark:text-white bg-white dark:bg-slate-900 focus:ring-2 focus:ring-sky-500 focus:outline-none placeholder:text-slate-400 dark:placeholder:text-slate-500"
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

              {/* Preferred Verification Channel */}
              <div className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 space-y-2">
                <div className="flex items-center justify-between">
                  <label className="text-[11px] font-extrabold text-slate-700 dark:text-slate-300 uppercase tracking-wider">
                    Preferred Verification Method
                  </label>
                  <span className="text-[10px] font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60 px-2 py-0.5 rounded-md border border-emerald-200 dark:border-emerald-800">
                    5-Min OTP
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setRegVerificationMethod('EMAIL')}
                    className={`p-2.5 rounded-xl border-2 text-left transition-all flex items-center gap-2 ${
                      regVerificationMethod === 'EMAIL'
                        ? 'border-sky-500 bg-sky-50/80 text-sky-900 shadow-xs'
                        : 'border-slate-200 bg-white text-slate-600 hover:border-slate-300'
                    }`}
                  >
                    <div className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 ${regVerificationMethod === 'EMAIL' ? 'bg-sky-500 text-white' : 'bg-slate-100 text-slate-500'}`}>
                      <Mail className="w-3.5 h-3.5" />
                    </div>
                    <div>
                      <div className="text-xs font-bold leading-none">Email OTP</div>
                      <div className="text-[10px] text-slate-500 mt-0.5">Code to Inbox</div>
                    </div>
                  </button>

                  <button
                    type="button"
                    onClick={() => setRegVerificationMethod('MOBILE')}
                    className={`p-2.5 rounded-xl border-2 text-left transition-all flex items-center gap-2 ${
                      regVerificationMethod === 'MOBILE'
                        ? 'border-emerald-500 bg-emerald-50/80 text-emerald-900 shadow-xs'
                        : 'border-slate-200 bg-white text-slate-600 hover:border-slate-300'
                    }`}
                  >
                    <div className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 ${regVerificationMethod === 'MOBILE' ? 'bg-emerald-500 text-white' : 'bg-slate-100 text-slate-500'}`}>
                      <Smartphone className="w-3.5 h-3.5" />
                    </div>
                    <div>
                      <div className="text-xs font-bold leading-none">Mobile OTP</div>
                      <div className="text-[10px] text-slate-500 mt-0.5">Code to (+91)</div>
                    </div>
                  </button>
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className={`w-full py-2.5 rounded-xl text-white font-bold text-xs shadow-md transition-all flex items-center justify-center gap-2 mt-2 ${
                  regVerificationMethod === 'MOBILE'
                    ? 'bg-gradient-to-r from-teal-600 to-emerald-600 hover:from-teal-700 hover:to-emerald-700'
                    : 'bg-gradient-to-r from-sky-600 to-sky-700 hover:from-sky-700 hover:to-sky-800'
                }`}
              >
                <Zap className="w-3.5 h-3.5 fill-current" />
                {loading 
                  ? "Generating 5-Min OTP..." 
                  : (regVerificationMethod === 'MOBILE' ? "Proceed to Mobile OTP Verification (5 Min)" : "Proceed to Email OTP Verification (5 Min)")}
              </button>
            </form>
          )}

        </div>

      </div>
    </div>
  );
};
