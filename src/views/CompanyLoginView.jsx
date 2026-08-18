import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Building2, Mail, Lock, CheckCircle2, Eye, EyeOff, Building, Send, Shield, Globe2, Award, Users, Zap, ArrowRight } from 'lucide-react';

export const CompanyLoginView = ({ onNavigate }) => {
  const { loginUser, registerUser, initiateEmailOtpLogin, currentUser, logoutUser } = useApp();

  const [isRegisterMode, setIsRegisterMode] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [contactPerson, setContactPerson] = useState('');
  const [phone, setPhone] = useState('');
  const [institutionType, setInstitutionType] = useState('Public Office');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  if (currentUser && currentUser.role === 'COMPANY_PARTNER') {
    return (
      <div className="max-w-2xl mx-auto px-4 py-12 text-center space-y-6 page-enter">
        <div className="glass-panel p-8 rounded-3xl border border-slate-200 shadow-sm space-y-4 hover-lift">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-indigo-500 to-sky-400 text-white flex items-center justify-center mx-auto animate-bounce-soft">
            <Building2 className="w-8 h-8" />
          </div>
          <h2 className="text-2xl font-extrabold text-slate-900">Welcome, Institutional Partner</h2>
          <p className="text-xs text-slate-600">
            Organization: <strong>{currentUser.companyName || currentUser.name}</strong> ({currentUser.email})
          </p>
          <div className="flex justify-center gap-3">
            <button
              onClick={() => onNavigate('corporate-partner')}
              className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-indigo-600 to-sky-600 text-white font-bold text-xs shadow-md press-effect flex items-center gap-2"
            >
              Browse NGO Profiles & Request Events <ArrowRight className="w-4 h-4" />
            </button>
            <button
              onClick={logoutUser}
              className="px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs press-effect"
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
      onNavigate('corporate-partner');
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
      });
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
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-gradient-to-r from-indigo-500 to-sky-500 text-white text-xs font-black shadow-md">
            <Building2 className="w-4 h-4" />
            Corporate & Gov Sector Portal
          </div>

          <h1 className="text-3xl font-extrabold text-slate-900 leading-tight">
            Partner with <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-sky-600 to-emerald-600">
              Verified NGOs for Social Impact
            </span>
          </h1>

          <p className="text-xs text-slate-600 leading-relaxed">
            Register your company, government office, college, or school to browse verified NGO profiles, inspect complete event histories, and submit awareness drive requests.
          </p>

          <div className="space-y-3 pt-2">
            <div className="flex items-start gap-3 p-3.5 rounded-2xl bg-gradient-to-r from-indigo-50 to-sky-50 border border-indigo-100 shadow-sm hover-lift cursor-default">
              <Globe2 className="w-5 h-5 text-indigo-600 mt-0.5 shrink-0" />
              <div>
                <p className="text-xs font-bold text-slate-900">Browse NGO Profiles & Track Records</p>
                <p className="text-[11px] text-slate-600 mt-0.5">View verified event history, impact reports, partner testimonials, and completed task audits.</p>
              </div>
            </div>

            <div className="flex items-start gap-3 p-3.5 rounded-2xl bg-gradient-to-r from-emerald-50 to-teal-50 border border-emerald-100 shadow-sm hover-lift cursor-default">
              <Shield className="w-5 h-5 text-emerald-600 mt-0.5 shrink-0" />
              <div>
                <p className="text-xs font-bold text-slate-900">Secure HR/CEO Permission Upload</p>
                <p className="text-[11px] text-slate-600 mt-0.5">Attach official sanction letters (PDF/Image) for compliance.</p>
              </div>
            </div>

            <div className="flex items-start gap-3 p-3.5 rounded-2xl bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-100 shadow-sm hover-lift cursor-default">
              <Award className="w-5 h-5 text-amber-600 mt-0.5 shrink-0" />
              <div>
                <p className="text-xs font-bold text-slate-900">ESG Impact Reporting</p>
                <p className="text-[11px] text-slate-600 mt-0.5">Post-event documentation with volunteer logs, certificates, and citizen reach metrics.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Login / Register Card */}
        <div className="md:col-span-7">
          <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-float animate-scale-in">
            
            {/* Tab Switcher */}
            <div className="flex items-center justify-between border-b border-slate-200 pb-4 mb-6">
              <div>
                <h2 className="text-xl font-extrabold text-slate-900">
                  {isRegisterMode ? 'Register Your Institution' : 'Institutional Partner Login'}
                </h2>
                <p className="text-xs text-slate-500 mt-0.5">
                  {isRegisterMode ? 'Create account with email OTP verification' : 'Sign in to browse NGOs & manage event requests'}
                </p>
              </div>

              <div className="flex bg-slate-100 p-1 rounded-xl">
                <button
                  onClick={() => { setIsRegisterMode(false); setErrorMessage(''); }}
                  className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all press-effect ${!isRegisterMode ? 'bg-gradient-to-r from-indigo-600 to-sky-600 text-white shadow-sm' : 'text-slate-600 hover:text-slate-900'}`}
                >
                  Sign In
                </button>
                <button
                  onClick={() => { setIsRegisterMode(true); setErrorMessage(''); }}
                  className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all press-effect ${isRegisterMode ? 'bg-gradient-to-r from-indigo-600 to-sky-600 text-white shadow-sm' : 'text-slate-600 hover:text-slate-900'}`}
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
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1">Official Corporate / Gov Email</label>
                    <div className="relative">
                      <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                      <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} placeholder="corporate@sbi-staff.org" className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 text-xs font-bold text-slate-900 dark:text-white bg-white dark:bg-slate-900 focus:ring-2 focus:ring-indigo-500 focus:outline-none transition-all placeholder:text-slate-400 dark:placeholder:text-slate-500" />
                    </div>
                  </div>
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider">Password</label>
                      <button
                        type="button"
                        onClick={() => onNavigate('forgot-password')}
                        className="text-[11px] font-bold text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 hover:underline"
                      >
                        Forgot Password?
                      </button>
                    </div>
                    <div className="relative">
                      <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                      <input type={showPassword ? 'text' : 'password'} value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••" className="w-full pl-9 pr-10 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 text-xs font-bold text-slate-900 dark:text-white bg-white dark:bg-slate-900 focus:ring-2 focus:ring-indigo-500 focus:outline-none transition-all placeholder:text-slate-400 dark:placeholder:text-slate-500" />
                      <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-3 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors">
                        {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>
                  <button type="submit" disabled={loading || !password} className={`w-full py-2.5 rounded-xl font-black text-xs uppercase tracking-wider shadow-md transition-all ${password ? 'bg-gradient-to-r from-indigo-600 via-sky-600 to-emerald-600 hover:from-indigo-700 hover:to-emerald-700 text-white press-effect' : 'bg-slate-200 dark:bg-slate-800 text-slate-400 cursor-not-allowed'}`}>
                    {loading ? 'Authenticating...' : 'Sign In with Password'}
                  </button>
                </form>

                {/* Passwordless Email OTP Option */}
                <div className="relative flex items-center justify-center pt-1">
                  <div className="border-t border-slate-200 dark:border-slate-700 w-full"></div>
                  <span className="bg-white dark:bg-slate-900 px-3 text-[11px] font-bold text-slate-400 uppercase tracking-wider absolute">
                    or passwordless
                  </span>
                </div>

                <button
                  type="button"
                  onClick={async () => {
                    setErrorMessage('');
                    if (!email) {
                      setErrorMessage('Please enter your official corporate/gov email to receive OTP.');
                      return;
                    }
                    setLoading(true);
                    try {
                      await initiateEmailOtpLogin(email, 'COMPANY_PARTNER');
                    } catch (err) {
                      setErrorMessage(err.message);
                    } finally {
                      setLoading(false);
                    }
                  }}
                  disabled={loading || !email}
                  className="w-full py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-black text-xs uppercase tracking-wider shadow-md transition-all flex items-center justify-center gap-2 press-effect"
                >
                  <Zap className="w-3.5 h-3.5 fill-current" />
                  {loading ? "Sending OTP Code..." : "Send 6-Digit Email OTP Login Code ✉️"}
                </button>

                <div className="pt-2 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                  <span className="text-[11px] text-slate-500 font-medium">Demo Credentials:</span>
                  <button type="button" onClick={fillCompanyDemo} className="text-xs font-bold text-indigo-700 dark:text-indigo-300 hover:underline bg-indigo-50 dark:bg-indigo-950/40 px-2.5 py-1 rounded-lg border border-indigo-200 dark:border-indigo-800 press-effect">Fill Corporate Demo ⚡</button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleRegisterSubmit} className="space-y-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1">Organization / Company / Institution Name</label>
                  <div className="relative">
                    <Building className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                    <input type="text" required value={companyName} onChange={(e) => setCompanyName(e.target.value)} placeholder="State Bank Staff College / TechCorp India" className="w-full pl-9 pr-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 text-xs font-bold text-slate-900 dark:text-white bg-white dark:bg-slate-900 focus:ring-2 focus:ring-indigo-500 focus:outline-none transition-all placeholder:text-slate-400 dark:placeholder:text-slate-500" />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1">Nodal Officer / Contact Person</label>
                    <input type="text" required value={contactPerson} onChange={(e) => setContactPerson(e.target.value)} placeholder="Rajesh Kumar (HR)" className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 text-xs font-bold text-slate-900 dark:text-white bg-white dark:bg-slate-900 focus:ring-2 focus:ring-indigo-500 focus:outline-none placeholder:text-slate-400 dark:placeholder:text-slate-500" />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1">Institution Type</label>
                    <select value={institutionType} onChange={(e) => setInstitutionType(e.target.value)} className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 text-xs font-bold text-slate-900 dark:text-white bg-white dark:bg-slate-900 focus:ring-2 focus:ring-indigo-500">
                      <option value="Government Office">Government Office</option>
                      <option value="Public Office">Corporate / MNC</option>
                      <option value="College">College / University</option>
                      <option value="School">School / Trust</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1">Official Email (OTP Verification Sent Here)</label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                    <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} placeholder="admin@company.com" className="w-full pl-9 pr-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 text-xs font-bold text-slate-900 dark:text-white bg-white dark:bg-slate-900 focus:ring-2 focus:ring-indigo-500 focus:outline-none placeholder:text-slate-400 dark:placeholder:text-slate-500" />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1">Phone Number</label>
                    <input type="tel" required value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="+91 98000 00000" className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 text-xs font-bold text-slate-900 dark:text-white bg-white dark:bg-slate-900 focus:ring-2 focus:ring-indigo-500 focus:outline-none placeholder:text-slate-400 dark:placeholder:text-slate-500" />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1">Create Password</label>
                    <input type="password" required value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Min 6 chars" className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 text-xs font-bold text-slate-900 dark:text-white bg-white dark:bg-slate-900 focus:ring-2 focus:ring-indigo-500 focus:outline-none placeholder:text-slate-400 dark:placeholder:text-slate-500" />
                  </div>
                </div>
                <button type="submit" disabled={loading} className="w-full py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 via-teal-600 to-sky-600 hover:from-emerald-700 hover:to-sky-700 text-white font-black text-xs uppercase tracking-wider shadow-md press-effect flex items-center justify-center gap-2 mt-2">
                  <Zap className="w-3.5 h-3.5 fill-current" />
                  {loading ? 'Sending OTP...' : 'Proceed to Email OTP Verification'}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
