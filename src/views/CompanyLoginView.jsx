import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Building2, Mail, Lock, CheckCircle2, Eye, EyeOff, Building, Send, Shield, Globe2, Award, Users, Zap, ArrowRight, Smartphone } from 'lucide-react';
import { FirebasePhoneAuth } from '../components/FirebasePhoneAuth';

export const CompanyLoginView = ({ onNavigate }) => {
  const { loginUser, registerUser, initiateEmailOtpLogin, initiateMobileOtpLogin, continueWithGoogleOAuth, currentUser, logoutUser } = useApp();

  const [isRegisterMode, setIsRegisterMode] = useState(false);
  const [loginMethod, setLoginMethod] = useState('email_password'); // 'email_password' or 'mobile_otp'
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [contactPerson, setContactPerson] = useState('');
  const [phone, setPhone] = useState('');
  const [institutionType, setInstitutionType] = useState('Public Office');
  const [regVerificationMethod, setRegVerificationMethod] = useState('EMAIL'); // 'EMAIL' or 'MOBILE'
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleMobileOtpSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');
    const cleanDigits = mobileNumber.replace(/\D/g, '');
    if (!cleanDigits || cleanDigits.length < 10) {
      setErrorMessage('Please enter a valid 10-digit registered mobile number.');
      return;
    }
    setLoading(true);
    try {
      await initiateMobileOtpLogin(mobileNumber, 'COMPANY_PARTNER');
    } catch (err) {
      setErrorMessage(err.message);
    } finally {
      setLoading(false);
    }
  };


  const handleGoogleSignIn = async () => {
    setErrorMessage('');
    setLoading(true);
    try {
      const user = await continueWithGoogleOAuth('COMPANY_PARTNER');
      if (user) {
        onNavigate('corporate-partner');
      }
    } catch (err) {
      setErrorMessage(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (currentUser && currentUser.role === 'COMPANY_PARTNER') {
    return (
      <div className="max-w-2xl mx-auto px-4 py-12 text-center space-y-6 page-enter">
        <div className="horizon-glass-panel p-8 rounded-3xl border border-slate-800/90 shadow-2xl space-y-4 hover-lift relative overflow-hidden text-white">
          <div className="horizon-gradient-line absolute top-0 left-0 right-0 h-[2px]" />
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-amber-500 via-emerald-500 to-sky-400 text-white flex items-center justify-center mx-auto shadow-lg shadow-emerald-950/50 animate-bounce-soft">
            <Building2 className="w-8 h-8 text-slate-950" />
          </div>
          <h2 className="text-2xl font-black text-white">Welcome, Institutional Partner</h2>
          <p className="text-xs text-slate-300">
            Organization: <strong className="text-white font-bold">{currentUser.companyName || currentUser.name}</strong> ({currentUser.email})
          </p>
          <div className="flex justify-center gap-3 pt-2">
            <button
              onClick={() => onNavigate('corporate-partner')}
              className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 via-emerald-600 to-teal-600 hover:from-amber-600 hover:to-teal-700 text-white font-extrabold text-xs shadow-lg shadow-emerald-900/30 press-effect flex items-center gap-2 hover-lift"
            >
              Browse NGO Profiles & Request Events <ArrowRight className="w-4 h-4" />
            </button>
            <button
              onClick={logoutUser}
              className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white border border-slate-700 font-bold text-xs press-effect"
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
      loginUser(email, password, 'COMPANY_PARTNER');
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
        name: `${contactPerson} (${companyName})`,
        email,
        password,
        phone,
        institution: companyName,
        role: 'COMPANY_PARTNER',
        profession: institutionType,
        city: 'Corporate HQ',
        age: '30',
        companyName
      }, regVerificationMethod);
    } catch (err) {
      setErrorMessage(err.message);
    } finally {
      setLoading(false);
    }
  };

  const fillCompanyDemo = () => {
    setEmail('corporate@sbi-staff.org');
    setPassword('company123password');
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-12 text-left page-enter">
      <div className="grid md:grid-cols-12 gap-8 items-stretch">
        
        {/* Left Column: Partnership Benefits Visual */}
        <div className="md:col-span-5 space-y-5">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-gradient-to-r from-amber-500/20 via-emerald-500/20 to-sky-500/20 border border-amber-500/30 text-amber-300 text-xs font-mono font-bold uppercase tracking-wider shadow-inner">
            <Building2 className="w-4 h-4 text-amber-400" />
            Corporate & Gov Sector Portal
          </div>

          <h1 className="text-3xl font-black text-white leading-tight">
            Partner with <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-emerald-400 to-sky-400">
              Verified NGOs for Social Impact
            </span>
          </h1>

          <p className="text-xs text-slate-300 leading-relaxed font-medium">
            Register your company, government office, college, or school to browse verified NGO profiles, inspect complete event histories, and submit awareness drive requests.
          </p>

          <div className="space-y-3 pt-2">
            <div className="flex items-start gap-3 p-4 rounded-2xl horizon-glass-panel border border-slate-800/80 shadow-md hover-lift cursor-default">
              <Globe2 className="w-5 h-5 text-amber-400 mt-0.5 shrink-0" />
              <div>
                <p className="text-xs font-extrabold text-white">Browse NGO Profiles & Track Records</p>
                <p className="text-[11px] text-slate-400 mt-0.5 leading-relaxed">View verified event history, impact reports, partner testimonials, and completed task audits.</p>
              </div>
            </div>

            <div className="flex items-start gap-3 p-4 rounded-2xl horizon-glass-panel border border-slate-800/80 shadow-md hover-lift cursor-default">
              <Shield className="w-5 h-5 text-emerald-400 mt-0.5 shrink-0" />
              <div>
                <p className="text-xs font-extrabold text-white">Secure HR/CEO Permission Upload</p>
                <p className="text-[11px] text-slate-400 mt-0.5 leading-relaxed">Attach official sanction letters (PDF/Image) for compliance.</p>
              </div>
            </div>

            <div className="flex items-start gap-3 p-4 rounded-2xl horizon-glass-panel border border-slate-800/80 shadow-md hover-lift cursor-default">
              <Award className="w-5 h-5 text-teal-400 mt-0.5 shrink-0" />
              <div>
                <p className="text-xs font-extrabold text-white">ESG Impact Reporting</p>
                <p className="text-[11px] text-slate-400 mt-0.5 leading-relaxed">Post-event documentation with volunteer logs, certificates, and citizen reach metrics.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Login / Register Card */}
        <div className="md:col-span-7">
          <div className="horizon-glass-panel p-6 sm:p-8 rounded-3xl border border-slate-800/90 shadow-2xl animate-scale-in relative overflow-hidden">
            <div className="horizon-gradient-line absolute top-0 left-0 right-0 h-[2px]" />
            
            {/* Tab Switcher */}
            <div className="flex items-center justify-between border-b border-slate-800 pb-4 mb-6">
              <div>
                <h2 className="text-xl font-black text-white">
                  {isRegisterMode ? 'Register Your Institution' : 'Institutional Partner Login'}
                </h2>
                <p className="text-xs text-slate-400 mt-0.5">
                  {isRegisterMode ? 'Create account with email OTP verification' : 'Sign in to browse NGOs & manage event requests'}
                </p>
              </div>

              <div className="flex bg-slate-900 border border-slate-800 p-1 rounded-xl">
                <button
                  onClick={() => { setIsRegisterMode(false); setErrorMessage(''); }}
                  className={`px-3.5 py-1.5 rounded-lg text-xs font-extrabold transition-all press-effect ${!isRegisterMode ? 'bg-gradient-to-r from-amber-500 via-emerald-600 to-teal-600 text-white shadow-md' : 'text-slate-400 hover:text-white'}`}
                >
                  Sign In
                </button>
                <button
                  onClick={() => { setIsRegisterMode(true); setErrorMessage(''); }}
                  className={`px-3.5 py-1.5 rounded-lg text-xs font-extrabold transition-all press-effect ${isRegisterMode ? 'bg-gradient-to-r from-amber-500 via-emerald-600 to-teal-600 text-white shadow-md' : 'text-slate-400 hover:text-white'}`}
                >
                  Register
                </button>
              </div>
            </div>

            {errorMessage && (
              <div className="mb-4 p-3 rounded-xl bg-red-950/70 border border-red-800/80 text-xs font-semibold text-red-300 animate-scale-in">
                {errorMessage}
              </div>
            )}

            {!isRegisterMode ? (
              <div className="space-y-4">
                
                {/* Method Switcher Tabs: Email/Password vs Mobile OTP */}
                <div className="flex p-1 rounded-2xl bg-slate-950/80 border border-slate-800">
                  <button
                    type="button"
                    onClick={() => { setLoginMethod('email_password'); setErrorMessage(''); }}
                    className={`flex-1 py-2 rounded-xl text-xs font-black transition-all flex items-center justify-center gap-1.5 ${
                      loginMethod === 'email_password'
                        ? 'bg-slate-900 text-white shadow-xs border border-slate-750'
                        : 'text-slate-400 hover:text-white'
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
                        ? 'bg-gradient-to-r from-amber-500 via-emerald-600 to-teal-600 text-white shadow-md'
                        : 'text-slate-400 hover:text-white'
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
                      <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1">Official Corporate / Gov Email</label>
                      <div className="relative">
                        <Mail className="w-4 h-4 text-slate-500 absolute left-3 top-3" />
                        <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} placeholder="corporate@sbi-staff.org" className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-slate-700 text-xs font-bold text-white bg-slate-950 focus:border-amber-500 outline-hidden transition-all placeholder:text-slate-500 font-mono" />
                      </div>
                    </div>
                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider">Password</label>
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
                        <input type={showPassword ? 'text' : 'password'} value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••" className="w-full pl-9 pr-10 py-2.5 rounded-xl border border-slate-700 text-xs font-bold text-white bg-slate-950 focus:border-amber-500 outline-hidden transition-all placeholder:text-slate-500 font-mono" />
                        <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-3 text-slate-400 hover:text-white transition-colors">
                          {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                        </button>
                      </div>
                    </div>
                    <button type="submit" disabled={loading || !password} className={`w-full py-3 rounded-xl font-black text-xs uppercase tracking-wider shadow-lg transition-all ${password ? 'bg-gradient-to-r from-amber-500 via-emerald-600 to-teal-600 hover:from-amber-600 hover:to-teal-700 text-white shadow-emerald-900/30 press-effect hover-lift' : 'bg-slate-850 text-slate-500 cursor-not-allowed border border-slate-800'}`}>
                      {loading ? 'Authenticating...' : 'Sign In with Password'}
                    </button>
                  </form>
                ) : (
                  <div className="pt-1">
                    <FirebasePhoneAuth 
                      expectedRole="COMPANY_PARTNER" 
                      onSuccess={() => onNavigate('corporate-partner')} 
                    />
                  </div>
                )}

                {/* Instant Google / Gmail Sign In */}
                <div className="relative flex items-center justify-center pt-2">
                  <div className="border-t border-slate-800 w-full"></div>
                  <span className="bg-slate-900 px-3 text-[11px] font-bold text-slate-400 uppercase tracking-wider absolute">
                    or instant access
                  </span>
                </div>

                <button
                  type="button"
                  onClick={handleGoogleSignIn}
                  disabled={loading}
                  className="w-full py-2.5 rounded-xl bg-slate-950 hover:bg-slate-850 text-white border border-slate-700 hover:border-slate-600 font-extrabold text-xs tracking-wide shadow-xs transition-all flex items-center justify-center gap-2.5 press-effect"
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
                <div>
                  <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1">Organization / Company / Institution Name</label>
                  <div className="relative">
                    <Building className="w-4 h-4 text-slate-500 absolute left-3 top-2.5" />
                    <input type="text" required value={companyName} onChange={(e) => setCompanyName(e.target.value)} placeholder="State Bank Staff College / TechCorp India" className="w-full pl-9 pr-3 py-2 rounded-xl border border-slate-700 text-xs font-bold text-white bg-slate-950 focus:border-amber-500 outline-hidden transition-all placeholder:text-slate-500" />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1">Nodal Officer / Contact Person</label>
                    <input type="text" required value={contactPerson} onChange={(e) => setContactPerson(e.target.value)} placeholder="Rajesh Kumar (HR)" className="w-full px-3 py-2 rounded-xl border border-slate-700 text-xs font-bold text-white bg-slate-950 focus:border-amber-500 outline-hidden placeholder:text-slate-500" />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1">Institution Type</label>
                    <select value={institutionType} onChange={(e) => setInstitutionType(e.target.value)} className="w-full px-3 py-2 rounded-xl border border-slate-700 text-xs font-bold text-white bg-slate-950 focus:border-amber-500 outline-hidden">
                      <option value="Government Office">Government Office</option>
                      <option value="Public Office">Corporate / MNC</option>
                      <option value="College">College / University</option>
                      <option value="School">School / Trust</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1">Official Email (OTP Verification Sent Here)</label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-slate-500 absolute left-3 top-2.5" />
                    <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} placeholder="admin@company.com" className="w-full pl-9 pr-3 py-2 rounded-xl border border-slate-700 text-xs font-bold text-white bg-slate-950 focus:border-amber-500 outline-hidden placeholder:text-slate-500 font-mono" />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1">Phone Number</label>
                    <input type="tel" required value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="+91 98000 00000" className="w-full px-3 py-2 rounded-xl border border-slate-700 text-xs font-bold text-white bg-slate-950 focus:border-amber-500 outline-hidden placeholder:text-slate-500 font-mono" />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1">Create Password</label>
                    <input type="password" required value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Min 6 chars" className="w-full px-3 py-2 rounded-xl border border-slate-700 text-xs font-bold text-white bg-slate-950 focus:border-amber-500 outline-hidden placeholder:text-slate-500 font-mono" />
                  </div>
                </div>

                {/* Preferred Verification Channel */}
                <div className="p-3 rounded-2xl bg-slate-950/70 border border-slate-800 space-y-2">
                  <div className="flex items-center justify-between">
                    <label className="text-[11px] font-mono font-extrabold text-slate-300 uppercase tracking-wider">
                      Preferred Verification Method
                    </label>
                    <span className="text-[10px] font-mono font-bold text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded-md border border-emerald-800/60">
                      5-Min OTP
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={() => setRegVerificationMethod('EMAIL')}
                      className={`p-2.5 rounded-xl border text-left transition-all flex items-center gap-2 ${
                        regVerificationMethod === 'EMAIL'
                          ? 'border-emerald-500 bg-emerald-950/40 text-emerald-200 shadow-xs'
                          : 'border-slate-800 bg-slate-900 text-slate-400 hover:border-slate-700'
                      }`}
                    >
                      <div className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 ${regVerificationMethod === 'EMAIL' ? 'bg-emerald-500 text-slate-950' : 'bg-slate-800 text-slate-400'}`}>
                        <Mail className="w-3.5 h-3.5" />
                      </div>
                      <div>
                        <div className="text-xs font-bold leading-none text-white">Official Email</div>
                        <div className="text-[10px] text-slate-400 mt-0.5">Code to Inbox</div>
                      </div>
                    </button>

                    <button
                      type="button"
                      onClick={() => setRegVerificationMethod('MOBILE')}
                      className={`p-2.5 rounded-xl border text-left transition-all flex items-center gap-2 ${
                        regVerificationMethod === 'MOBILE'
                          ? 'border-amber-500 bg-amber-950/40 text-amber-200 shadow-xs'
                          : 'border-slate-800 bg-slate-900 text-slate-400 hover:border-slate-700'
                      }`}
                    >
                      <div className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 ${regVerificationMethod === 'MOBILE' ? 'bg-amber-500 text-slate-950' : 'bg-slate-800 text-slate-400'}`}>
                        <Smartphone className="w-3.5 h-3.5" />
                      </div>
                      <div>
                        <div className="text-xs font-bold leading-none text-white">Mobile OTP</div>
                        <div className="text-[10px] text-slate-400 mt-0.5">Code to Phone (+91)</div>
                      </div>
                    </button>
                  </div>
                </div>

                <button 
                  type="submit" 
                  disabled={loading} 
                  className="w-full py-3 rounded-xl text-white font-black text-xs uppercase tracking-wider shadow-lg shadow-emerald-900/30 press-effect flex items-center justify-center gap-2 mt-2 bg-gradient-to-r from-amber-500 via-emerald-600 to-teal-600 hover:from-amber-600 hover:to-teal-700 hover-lift transition-all"
                >
                  <Zap className="w-3.5 h-3.5 fill-current text-amber-300" />
                  {loading 
                    ? 'Sending OTP...' 
                    : (regVerificationMethod === 'MOBILE' ? 'Proceed to Mobile OTP Verification (5 Min)' : 'Proceed to Email OTP Verification (5 Min)')}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
