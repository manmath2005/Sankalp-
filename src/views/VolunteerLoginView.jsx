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
  Sparkles
} from 'lucide-react';

export const VolunteerLoginView = ({ onNavigate }) => {
  const { loginUser, registerUser, initiateEmailOtpLogin, currentUser, logoutUser } = useApp();

  const [isRegisterMode, setIsRegisterMode] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [institution, setInstitution] = useState('');
  
  // New Volunteer Questionnaire Fields
  const [profession, setProfession] = useState('Student');
  const [city, setCity] = useState('Mumbai');
  const [age, setAge] = useState('22');

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  // Auto redirect if already logged in as Volunteer
  if (currentUser && currentUser.role === 'VOLUNTEER') {
    return (
      <div className="max-w-2xl mx-auto px-4 py-12 text-center space-y-6">
        <div className="glass-panel p-8 rounded-3xl border border-slate-200 shadow-sm space-y-4">
          <div className="w-16 h-16 rounded-2xl bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
            <CheckCircle2 className="w-8 h-8" />
          </div>
          <h2 className="text-2xl font-extrabold text-slate-900">Signed In as Verified Volunteer</h2>
          <p className="text-xs text-slate-600">Welcome, <strong>{currentUser.name}</strong> ({currentUser.email}). You are currently logged into the Volunteer Portal.</p>
          <div className="flex justify-center gap-3">
            <button
              onClick={() => onNavigate('volunteer-hub')}
              className="px-6 py-2.5 rounded-xl bg-sky-600 text-white font-bold text-xs shadow"
            >
              Go to Volunteer Hub & Certificates Studio →
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
      loginUser(email, password, 'VOLUNTEER');
      onNavigate('volunteer-hub');
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
      });
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

  const fillVolunteerDemo = () => {
    setEmail('rohan.verma@example.com');
    setPassword('volunteer123');
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-12 text-left">
      <div className="grid md:grid-cols-12 gap-8 items-center">
        
        {/* Left Column: Colorful Visual Highlight */}
        <div className="md:col-span-5 space-y-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-gradient-to-r from-sky-500 via-indigo-500 to-emerald-500 text-white text-xs font-black shadow-md">
            <Award className="w-4 h-4" />
            Official Volunteer Access Portal
          </div>

          <h1 className="text-3xl font-extrabold text-slate-900 leading-tight">
            Join the Sankalp <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-600 via-indigo-600 to-emerald-600">
              Volunteer Community
            </span>
          </h1>

          <p className="text-xs text-slate-600 leading-relaxed">
            Choose from upcoming social awareness drives in government offices, public sectors, colleges, and schools. Log service hours and earn accredited completion certificates with QR verification.
          </p>

          <div className="space-y-3 pt-2">
            <div className="flex items-start gap-3 p-3.5 rounded-2xl bg-gradient-to-r from-sky-50 to-indigo-50 border border-sky-100 shadow-sm">
              <CheckCircle2 className="w-4 h-4 text-sky-600 mt-0.5 shrink-0" />
              <p className="text-xs text-slate-700">
                <strong>Passwordless Email OTP:</strong> Sign in instantly with a 6-digit code sent directly to your email.
              </p>
            </div>

            <div className="flex items-start gap-3 p-3.5 rounded-2xl bg-gradient-to-r from-emerald-50 to-teal-50 border border-emerald-100 shadow-sm">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 mt-0.5 shrink-0" />
              <p className="text-xs text-slate-700">
                <strong>Accredited Certificates:</strong> Verified certificates with QR code audit trails.
              </p>
            </div>
          </div>
        </div>

        {/* Right Column: Dedicated Login / Register Form */}
        <div className="md:col-span-7">
          <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-float">
            
            {/* Header Tabs */}
            <div className="flex items-center justify-between border-b border-slate-200 pb-4 mb-6">
              <div>
                <h2 className="text-xl font-extrabold text-slate-900">
                  {isRegisterMode ? 'New Volunteer Registration' : 'Volunteer Login Portal'}
                </h2>
                <p className="text-xs text-slate-500 mt-0.5">
                  {isRegisterMode ? 'Complete quick questionnaire & 6-digit email OTP' : 'Sign in with Password or Passwordless Email OTP'}
                </p>
              </div>

              <div className="flex bg-slate-100 p-1 rounded-xl">
                <button
                  onClick={() => { setIsRegisterMode(false); setErrorMessage(''); }}
                  className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all ${!isRegisterMode ? 'bg-gradient-to-r from-sky-600 to-sky-700 text-white shadow-sm' : 'text-slate-600'}`}
                >
                  Sign In
                </button>
                <button
                  onClick={() => { setIsRegisterMode(true); setErrorMessage(''); }}
                  className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all ${isRegisterMode ? 'bg-gradient-to-r from-sky-600 to-sky-700 text-white shadow-sm' : 'text-slate-600'}`}
                >
                  Register
                </button>
              </div>
            </div>

            {errorMessage && (
              <div className="mb-4 p-3 rounded-xl bg-red-50 border border-red-200 text-xs font-semibold text-red-700 animate-scale-in">
                {errorMessage}
              </div>
            )}

            {!isRegisterMode ? (
              <div className="space-y-4">
                <form onSubmit={handleLoginSubmit} className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                      Volunteer Email Address
                    </label>
                    <div className="relative">
                      <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="rohan.verma@example.com"
                        className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-slate-300 text-xs font-medium focus:ring-2 focus:ring-sky-500 focus:outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                        Password
                      </label>
                      <button
                        type="button"
                        onClick={() => onNavigate('forgot-password')}
                        className="text-[11px] font-bold text-sky-600 hover:text-sky-700 hover:underline"
                      >
                        Forgot Password?
                      </button>
                    </div>
                    <div className="relative">
                      <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                      <input
                        type={showPassword ? "text" : "password"}
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
                    disabled={loading || !password}
                    className={`w-full py-2.5 rounded-xl font-bold text-xs shadow-md transition-all flex items-center justify-center gap-2 ${
                      password
                        ? 'bg-gradient-to-r from-sky-600 to-sky-700 hover:from-sky-700 hover:to-sky-800 text-white press-effect'
                        : 'bg-slate-200 text-slate-400 cursor-not-allowed'
                    }`}
                  >
                    {loading ? "Authenticating..." : "Sign In with Password"}
                  </button>
                </form>

                {/* Passwordless Email OTP Option */}
                <div className="relative flex items-center justify-center pt-1">
                  <div className="border-t border-slate-200 w-full"></div>
                  <span className="bg-white px-3 text-[11px] font-bold text-slate-400 uppercase tracking-wider absolute">
                    or passwordless
                  </span>
                </div>

                <button
                  type="button"
                  onClick={handleSendOtpLogin}
                  disabled={loading || !email}
                  className="w-full py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-bold text-xs shadow-md transition-all flex items-center justify-center gap-2 press-effect"
                >
                  <Zap className="w-3.5 h-3.5 fill-current" />
                  {loading ? "Sending OTP Code..." : "Send 6-Digit Email OTP Login Code ✉️"}
                </button>

                <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-[11px] text-slate-500 font-medium">Quick Demo:</span>
                  <button
                    type="button"
                    onClick={fillVolunteerDemo}
                    className="text-xs font-bold text-sky-700 hover:underline bg-sky-50 px-2.5 py-1 rounded-lg border border-sky-200"
                  >
                    Auto-Fill Demo Volunteer ⚡
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleRegisterSubmit} className="space-y-3">
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                      Full Name
                    </label>
                    <div className="relative">
                      <User className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                      <input
                        type="text"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Ananya Sharma"
                        className="w-full pl-9 pr-3 py-2 rounded-xl border border-slate-300 text-xs font-medium"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="+91 98000 00000"
                      className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs font-medium"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Email Address (OTP Sent Here)
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="ananya@college.edu"
                      className="w-full pl-9 pr-4 py-2 rounded-xl border border-slate-300 text-xs font-medium"
                    />
                  </div>
                </div>

                {/* VOLUNTEER QUESTIONNAIRE FIELDS: Profession, City, Age */}
                <div className="p-3 rounded-2xl bg-sky-50/70 border border-sky-200/80 space-y-2">
                  <p className="text-[11px] font-extrabold text-sky-900 uppercase">
                    Volunteer Questionnaire (Analytics & Event Matching)
                  </p>

                  <div className="grid grid-cols-3 gap-2">
                    <div>
                      <label className="block text-[10px] font-bold text-slate-600 uppercase mb-0.5">
                        Profession
                      </label>
                      <select
                        value={profession}
                        onChange={(e) => setProfession(e.target.value)}
                        className="w-full px-2 py-1.5 rounded-lg border border-slate-300 text-xs font-medium bg-white"
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
                      <label className="block text-[10px] font-bold text-slate-600 uppercase mb-0.5">
                        City
                      </label>
                      <input
                        type="text"
                        required
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        placeholder="Mumbai"
                        className="w-full px-2.5 py-1.5 rounded-lg border border-slate-300 text-xs font-medium bg-white"
                      />
                    </div>

                    <div>
                      <label className="block text-[10px] font-bold text-slate-600 uppercase mb-0.5">
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
                        className="w-full px-2.5 py-1.5 rounded-lg border border-slate-300 text-xs font-medium bg-white"
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    College / Institution
                  </label>
                  <input
                    type="text"
                    required
                    value={institution}
                    onChange={(e) => setInstitution(e.target.value)}
                    placeholder="Delhi University"
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs font-medium"
                  />
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
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs font-medium"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-2.5 rounded-xl bg-gradient-to-r from-sky-600 to-sky-700 hover:from-sky-700 hover:to-sky-800 text-white font-bold text-xs shadow-md flex items-center justify-center gap-2 mt-2"
                >
                  <Zap className="w-3.5 h-3.5 fill-current" />
                  {loading ? "Sending OTP..." : "Proceed to Email OTP Verification"}
                </button>
              </form>
            )}

          </div>
        </div>

      </div>
    </div>
  );
};
