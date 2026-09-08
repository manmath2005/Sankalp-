import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  Award, 
  Mail, 
  Lock, 
  User, 
  Building, 
  Phone, 
  Zap, 
  CheckCircle2, 
  Eye, 
  EyeOff,
  Briefcase,
  MapPin,
  Calendar,
  Sparkles,
  Smartphone,
  Send
} from 'lucide-react';
import { FirebasePhoneAuth } from '../components/FirebasePhoneAuth';

export const VolunteerLoginView = ({ onNavigate }) => {
  const { loginUser, registerUser, initiateEmailOtpLogin, initiateMobileOtpLogin, continueWithGoogleOAuth, currentUser, logoutUser } = useApp();

  const [isRegisterMode, setIsRegisterMode] = useState(false);
  const [loginMethod, setLoginMethod] = useState('email_password'); // 'email_password' or 'mobile_otp'
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [institution, setInstitution] = useState('');

  
  // New Volunteer Questionnaire Fields
  const [profession, setProfession] = useState('Student');
  const [city, setCity] = useState('Mumbai');
  const [age, setAge] = useState('22');
  const [regVerificationMethod, setRegVerificationMethod] = useState('EMAIL'); // 'EMAIL' or 'MOBILE'

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleGoogleSignIn = async () => {
    setErrorMessage('');
    setLoading(true);
    try {
      const user = await continueWithGoogleOAuth('VOLUNTEER');
      if (user) {
        onNavigate('volunteer-hub');
      }
    } catch (err) {
      setErrorMessage(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Auto redirect if already logged in as Volunteer
  if (currentUser && currentUser.role === 'VOLUNTEER') {
    return (
      <div className="max-w-2xl mx-auto px-4 py-12 text-center space-y-6">
        <div className="horizon-glass-panel p-8 rounded-3xl border border-slate-800/90 shadow-2xl relative overflow-hidden backdrop-blur-2xl space-y-4">
          <div className="horizon-gradient-line absolute top-0 left-0 right-0 h-1"></div>
          <div className="w-16 h-16 rounded-2xl bg-emerald-500/20 border border-emerald-500/30 text-emerald-400 flex items-center justify-center mx-auto shadow-lg">
            <CheckCircle2 className="w-8 h-8" />
          </div>
          <h2 className="text-2xl font-black text-white">Signed In as Verified Volunteer</h2>
          <p className="text-xs text-slate-300">Welcome, <strong>{currentUser?.name || currentUser?.email}</strong> ({currentUser?.email}). You are currently logged into the Volunteer Portal.</p>
          <div className="flex justify-center gap-3 pt-2">
            <button
              onClick={() => onNavigate('volunteer-hub')}
              className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 via-emerald-500 to-sky-500 hover:from-amber-400 hover:to-sky-400 text-slate-950 font-black text-xs shadow-lg transition-all press-effect"
            >
              Go to Volunteer Hub & Certificates Studio →
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
      loginUser(email, password, 'VOLUNTEER');
      // OTP modal opens automatically upon entering correct password
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
        profession,
        city,
        age,
        role: 'VOLUNTEER'
      }, regVerificationMethod);
      // Verification OTP modal opens automatically
    } catch (err) {
      setErrorMessage(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSendOtpLogin = async () => {
    setErrorMessage('');
    if (!email) {
      setErrorMessage('Please enter your registered volunteer email to receive OTP.');
      return;
    }
    setLoading(true);
    try {
      await initiateEmailOtpLogin(email, 'VOLUNTEER');
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
      setErrorMessage('Please enter a valid 10-digit Indian mobile number.');
      return;
    }
    setLoading(true);
    try {
      await initiateMobileOtpLogin(mobileNumber, 'VOLUNTEER');
    } catch (err) {
      setErrorMessage(err.message);
    } finally {
      setLoading(false);
    }
  };

  const fillVolunteerDemo = () => {
    setEmail('rohan.verma@example.com');
    setPassword('volunteer123');
  };

  const fillVolunteerPhoneDemo = () => {
    setMobileNumber('9811233445');
  };


  return (
    <div className="max-w-4xl mx-auto px-4 py-12 text-left">
      <div className="grid md:grid-cols-12 gap-8 items-center">
        
        {/* Left Column: Colorful Visual Highlight */}
        <div className="md:col-span-5 space-y-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900/90 border border-amber-500/30 text-amber-300 text-xs font-black shadow-md">
            <Award className="w-4 h-4 text-amber-400" />
            Official Volunteer Access Portal
          </div>

          <h1 className="text-3xl sm:text-4xl font-black text-white leading-tight">
            Join the Sankalp <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-emerald-400 to-sky-400">
              Volunteer Community
            </span>
          </h1>

          <p className="text-xs text-slate-300 leading-relaxed">
            Choose from upcoming social awareness drives in government offices, public sectors, colleges, and schools. Log service hours and earn accredited completion certificates with QR verification.
          </p>

          <div className="space-y-3 pt-2">
            <div className="flex items-start gap-3 p-3.5 rounded-2xl bg-slate-900/80 border border-slate-800 shadow-sm">
              <CheckCircle2 className="w-4 h-4 text-amber-400 mt-0.5 shrink-0" />
              <p className="text-xs text-slate-300">
                <strong className="text-white">Passwordless Email OTP:</strong> Sign in instantly with a 6-digit code sent directly to your email.
              </p>
            </div>

            <div className="flex items-start gap-3 p-3.5 rounded-2xl bg-slate-900/80 border border-slate-800 shadow-sm">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 mt-0.5 shrink-0" />
              <p className="text-xs text-slate-300">
                <strong className="text-white">Accredited Certificates:</strong> Verified certificates with QR code audit trails.
              </p>
            </div>
          </div>
        </div>

        {/* Right Column: Dedicated Login / Register Form */}
        <div className="md:col-span-7">
          <div className="horizon-glass-panel p-6 sm:p-8 rounded-3xl border border-slate-800/90 bg-slate-900/90 shadow-2xl relative overflow-hidden backdrop-blur-2xl">
            <div className="horizon-gradient-line absolute top-0 left-0 right-0 h-1"></div>
            
            {/* Header Tabs */}
            <div className="flex items-center justify-between border-b border-slate-800 pb-4 mb-6">
              <div>
                <h2 className="text-xl font-black text-white">
                  {isRegisterMode ? 'New Volunteer Registration' : 'Volunteer Login Portal'}
                </h2>
                <p className="text-xs text-slate-400 mt-0.5">
                  {isRegisterMode ? 'Complete quick questionnaire & 6-digit email OTP' : 'Sign in with Password or Passwordless Email OTP'}
                </p>
              </div>

              <div className="flex bg-slate-950 p-1 rounded-xl border border-slate-800">
                <button
                  onClick={() => { setIsRegisterMode(false); setErrorMessage(''); }}
                  className={`px-3.5 py-1.5 rounded-lg text-xs font-black transition-all ${!isRegisterMode ? 'bg-gradient-to-r from-amber-500 to-emerald-500 text-slate-950 shadow-sm' : 'text-slate-400 hover:text-white'}`}
                >
                  Sign In
                </button>
                <button
                  onClick={() => { setIsRegisterMode(true); setErrorMessage(''); }}
                  className={`px-3.5 py-1.5 rounded-lg text-xs font-black transition-all ${isRegisterMode ? 'bg-gradient-to-r from-amber-500 to-emerald-500 text-slate-950 shadow-sm' : 'text-slate-400 hover:text-white'}`}
                >
                  Register
                </button>
              </div>
            </div>

            {errorMessage && (
              <div className="mb-4 p-3 rounded-xl bg-red-950/80 border border-red-800/80 text-xs font-semibold text-red-200 animate-scale-in">
                {errorMessage}
              </div>
            )}

            {!isRegisterMode ? (
              <div className="space-y-4">
                
                {/* Method Switcher Tabs: Email/Password vs Mobile OTP */}
                <div className="flex p-1 rounded-2xl bg-slate-950 border border-slate-800">
                  <button
                    type="button"
                    onClick={() => { setLoginMethod('email_password'); setErrorMessage(''); }}
                    className={`flex-1 py-2 rounded-xl text-xs font-black transition-all flex items-center justify-center gap-1.5 ${
                      loginMethod === 'email_password'
                        ? 'bg-slate-800 text-white shadow-xs'
                        : 'text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    <Mail className="w-3.5 h-3.5 text-amber-400" />
                    <span>Email &amp; Password</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => { setLoginMethod('mobile_otp'); setErrorMessage(''); }}
                    className={`flex-1 py-2 rounded-xl text-xs font-black transition-all flex items-center justify-center gap-1.5 ${
                      loginMethod === 'mobile_otp'
                        ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-xs'
                        : 'text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    <Smartphone className="w-3.5 h-3.5" />
                    <span>Mobile Number OTP</span>
                    <span className="text-[9px] px-1.5 py-0.2 rounded-full bg-amber-400 text-slate-950 font-black">5 MIN</span>
                  </button>
                </div>

                {loginMethod === 'email_password' ? (
                  <form onSubmit={handleLoginSubmit} className="space-y-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1">
                        Volunteer Email Address
                      </label>
                      <div className="relative">
                        <Mail className="w-4 h-4 text-slate-500 absolute left-3 top-3" />
                        <input
                          type="email"
                          required
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="rohan.verma@example.com"
                          className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-slate-700/80 text-xs font-bold text-white bg-slate-950 focus:border-amber-500 focus:ring-1 focus:ring-amber-500 focus:outline-none placeholder:text-slate-500 transition-all"
                        />
                      </div>
                    </div>

                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider">
                          Password
                        </label>
                        <button
                          type="button"
                          onClick={() => onNavigate('forgot-password')}
                          className="text-[11px] font-bold text-amber-400 hover:text-amber-300 hover:underline"
                        >
                          Forgot Password?
                        </button>
                      </div>
                      <div className="relative">
                        <Lock className="w-4 h-4 text-slate-500 absolute left-3 top-3" />
                        <input
                          type={showPassword ? "text" : "password"}
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          placeholder="••••••••"
                          className="w-full pl-9 pr-10 py-2.5 rounded-xl border border-slate-700/80 text-xs font-bold text-white bg-slate-950 focus:border-amber-500 focus:ring-1 focus:ring-amber-500 focus:outline-none placeholder:text-slate-500 transition-all"
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
                      disabled={loading || !password}
                      className={`w-full py-2.5 rounded-xl font-black text-xs uppercase tracking-wider shadow-md transition-all flex items-center justify-center gap-2 ${
                        password
                          ? 'bg-gradient-to-r from-amber-500 via-emerald-500 to-sky-500 hover:from-amber-400 hover:to-sky-400 text-slate-950 press-effect shadow-lg shadow-amber-500/10'
                          : 'bg-slate-800 text-slate-500 cursor-not-allowed'
                      }`}
                    >
                      {loading ? "Authenticating..." : "Sign In with Password"}
                    </button>
                  </form>
                ) : (
                  <div className="pt-1">
                    <FirebasePhoneAuth 
                      expectedRole="VOLUNTEER" 
                      onSuccess={() => onNavigate('volunteer-hub')} 
                    />
                  </div>
                )}


                {/* Quick 1-Click Google / Gmail Sign In Option */}
                <div className="relative flex items-center justify-center pt-2">
                  <div className="border-t border-slate-800 w-full"></div>
                  <span className="bg-slate-900 px-3 text-[11px] font-bold text-slate-500 uppercase tracking-wider absolute">
                    or instant access
                  </span>
                </div>

                <button
                  type="button"
                  onClick={handleGoogleSignIn}
                  disabled={loading}
                  className="w-full py-2.5 rounded-xl bg-slate-950 hover:bg-slate-800 text-white border border-slate-700 font-extrabold text-xs tracking-wide shadow-xs transition-all flex items-center justify-center gap-2.5 press-effect"
                >
                  <svg className="w-4 h-4" viewBox="0 0 24 24">
                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
                  </svg>
                  <span>Continue with Google / Gmail</span>
                </button>
              </div>
            ) : (
              <form onSubmit={handleRegisterSubmit} className="space-y-3">
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1">
                      Full Name
                    </label>
                    <div className="relative">
                      <User className="w-4 h-4 text-slate-500 absolute left-3 top-2.5" />
                      <input
                        type="text"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Ananya Sharma"
                        className="w-full pl-9 pr-3 py-2 rounded-xl border border-slate-700/80 text-xs font-bold text-white bg-slate-950 focus:border-amber-500 focus:ring-1 focus:ring-amber-500 focus:outline-none placeholder:text-slate-500"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="+91 98000 00000"
                      className="w-full px-3 py-2 rounded-xl border border-slate-700/80 text-xs font-bold text-white bg-slate-950 focus:border-amber-500 focus:ring-1 focus:ring-amber-500 focus:outline-none placeholder:text-slate-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1">
                    Email Address (OTP Sent Here)
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-slate-500 absolute left-3 top-2.5" />
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="ananya@college.edu"
                      className="w-full pl-9 pr-4 py-2 rounded-xl border border-slate-700/80 text-xs font-bold text-white bg-slate-950 focus:border-amber-500 focus:ring-1 focus:ring-amber-500 focus:outline-none placeholder:text-slate-500"
                    />
                  </div>
                </div>

                {/* VOLUNTEER QUESTIONNAIRE FIELDS: Profession, City, Age */}
                <div className="p-3 rounded-2xl bg-slate-950/70 border border-slate-800 space-y-2">
                  <p className="text-[11px] font-black text-amber-300 uppercase tracking-wider">
                    Volunteer Questionnaire (Analytics &amp; Event Matching)
                  </p>

                  <div className="grid grid-cols-3 gap-2">
                    <div>
                      <label className="block text-[10px] font-bold text-slate-400 uppercase mb-0.5">
                        Profession
                      </label>
                      <select
                        value={profession}
                        onChange={(e) => setProfession(e.target.value)}
                        className="w-full px-2 py-1.5 rounded-lg border border-slate-700 text-xs font-bold text-white bg-slate-900 focus:border-amber-500"
                      >
                        <option value="Student">Student</option>
                        <option value="Software Engineer">IT / Software</option>
                        <option value="Doctor / Healthcare">Doctor / Medical</option>
                        <option value="Teacher / Educator">Teacher / Educator</option>
                        <option value="Government Staff">Govt Employee</option>
                        <option value="Other Professional">Other</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-[10px] font-bold text-slate-400 uppercase mb-0.5">
                        City
                      </label>
                      <input
                        type="text"
                        required
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        placeholder="Mumbai"
                        className="w-full px-2.5 py-1.5 rounded-lg border border-slate-700 text-xs font-bold text-white bg-slate-900 focus:border-amber-500"
                      />
                    </div>

                    <div>
                      <label className="block text-[10px] font-bold text-slate-400 uppercase mb-0.5">
                        Age
                      </label>
                      <input
                        type="number"
                        min="16"
                        max="80"
                        required
                        value={age}
                        onChange={(e) => setAge(e.target.value)}
                        placeholder="22"
                        className="w-full px-2.5 py-1.5 rounded-lg border border-slate-700 text-xs font-bold text-white bg-slate-900 focus:border-amber-500"
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1">
                    College / Institution
                  </label>
                  <input
                    type="text"
                    required
                    value={institution}
                    onChange={(e) => setInstitution(e.target.value)}
                    placeholder="Delhi University"
                    className="w-full px-3 py-2 rounded-xl border border-slate-700/80 text-xs font-bold text-white bg-slate-950 focus:border-amber-500 focus:ring-1 focus:ring-amber-500 focus:outline-none placeholder:text-slate-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1">
                    Create Password
                  </label>
                  <input
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="At least 6 characters"
                    className="w-full px-3 py-2 rounded-xl border border-slate-700/80 text-xs font-bold text-white bg-slate-950 focus:border-amber-500 focus:ring-1 focus:ring-amber-500 focus:outline-none placeholder:text-slate-500"
                  />
                </div>

                {/* Verification Channel Option: Email OTP vs Mobile OTP */}
                <div className="p-3 rounded-2xl bg-slate-950/70 border border-slate-800 space-y-2">
                  <div className="flex items-center justify-between">
                    <label className="text-[11px] font-extrabold text-slate-300 uppercase tracking-wider">
                      Preferred Verification Method
                    </label>
                    <span className="text-[10px] font-bold text-emerald-400 bg-emerald-950/80 px-2 py-0.5 rounded-md border border-emerald-800">
                      5-Min OTP
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={() => setRegVerificationMethod('EMAIL')}
                      className={`p-2.5 rounded-xl border-2 text-left transition-all flex items-center gap-2 ${
                        regVerificationMethod === 'EMAIL'
                          ? 'border-amber-500 bg-amber-950/30 text-white shadow-xs'
                          : 'border-slate-800 bg-slate-900 text-slate-400 hover:border-slate-700'
                      }`}
                    >
                      <div className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 ${regVerificationMethod === 'EMAIL' ? 'bg-amber-500 text-slate-950 font-bold' : 'bg-slate-800 text-slate-400'}`}>
                        <Mail className="w-3.5 h-3.5" />
                      </div>
                      <div>
                        <div className="text-xs font-bold leading-none">Email OTP</div>
                        <div className="text-[10px] text-slate-400 mt-0.5">Code to Inbox</div>
                      </div>
                    </button>

                    <button
                      type="button"
                      onClick={() => setRegVerificationMethod('MOBILE')}
                      className={`p-2.5 rounded-xl border-2 text-left transition-all flex items-center gap-2 ${
                        regVerificationMethod === 'MOBILE'
                          ? 'border-emerald-500 bg-emerald-950/30 text-white shadow-xs'
                          : 'border-slate-800 bg-slate-900 text-slate-400 hover:border-slate-700'
                      }`}
                    >
                      <div className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 ${regVerificationMethod === 'MOBILE' ? 'bg-emerald-500 text-slate-950 font-bold' : 'bg-slate-800 text-slate-400'}`}>
                        <Smartphone className="w-3.5 h-3.5" />
                      </div>
                      <div>
                        <div className="text-xs font-bold leading-none">Mobile OTP</div>
                        <div className="text-[10px] text-slate-400 mt-0.5">Code to Phone (+91)</div>
                      </div>
                    </button>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-2.5 rounded-xl text-slate-950 font-black text-xs uppercase tracking-wider shadow-lg flex items-center justify-center gap-2 mt-2 press-effect bg-gradient-to-r from-amber-500 via-emerald-500 to-sky-500 hover:from-amber-400 hover:to-sky-400 shadow-amber-500/10"
                >
                  <Zap className="w-3.5 h-3.5 fill-current" />
                  {loading 
                    ? "Generating 5-Min OTP..." 
                    : (regVerificationMethod === 'MOBILE' ? "Proceed to Mobile OTP Verification (5 Min)" : "Proceed to Email OTP Verification (5 Min)")}
                </button>

                <div className="relative flex items-center justify-center pt-2">
                  <div className="border-t border-slate-800 w-full"></div>
                  <span className="bg-slate-900 px-3 text-[11px] font-bold text-slate-500 uppercase tracking-wider absolute">
                    or instant signup
                  </span>
                </div>

                <button
                  type="button"
                  onClick={handleGoogleSignIn}
                  disabled={loading}
                  className="w-full py-2.5 rounded-xl bg-slate-950 hover:bg-slate-800 text-white border border-slate-700 font-extrabold text-xs tracking-wide shadow-xs transition-all flex items-center justify-center gap-2.5 press-effect"
                >
                  <svg className="w-4 h-4" viewBox="0 0 24 24">
                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
                  </svg>
                  <span>Sign Up Instantly with Google / Gmail</span>
                </button>
              </form>
            )}

          </div>
        </div>

      </div>
    </div>
  );
};
