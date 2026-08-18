import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  Building2, 
  Mail, 
  Lock, 
  CheckCircle2, 
  Eye, 
  EyeOff, 
  ShieldCheck, 
  Award, 
  Globe2, 
  Plus, 
  FileText, 
  Sparkles, 
  Phone, 
  MapPin, 
  User, 
  Zap, 
  ArrowRight,
  Landmark,
  GraduationCap,
  Users
} from 'lucide-react';

export const NgoLoginView = ({ onNavigate }) => {
  const { loginUser, registerNewNgo, initiateEmailOtpLogin, currentUser, logoutUser, ngos } = useApp();

  const [isRegisterMode, setIsRegisterMode] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  // Login Form States
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Registration Form States
  const [ngoName, setNgoName] = useState('');
  const [directorName, setDirectorName] = useState('');
  const [registrationNo, setRegistrationNo] = useState('');
  const [darpanId, setDarpanId] = useState('');
  const [regPhone, setRegPhone] = useState('');
  const [regEmail, setRegEmail] = useState('');
  const [regCity, setRegCity] = useState('Mumbai');
  const [regState, setRegState] = useState('Maharashtra');
  const [regAddress, setRegAddress] = useState('');
  const [specialization, setSpecialization] = useState('');
  const [regPassword, setRegPassword] = useState('');
  const [selectedSectors, setSelectedSectors] = useState(['Government Office', 'College']);

  const toggleSector = (sector) => {
    if (selectedSectors.includes(sector)) {
      setSelectedSectors(selectedSectors.filter(s => s !== sector));
    } else {
      setSelectedSectors([...selectedSectors, sector]);
    }
  };

  if (currentUser && (currentUser.role === 'NGO_PARTNER' || currentUser.role === 'NGO_STAFF')) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-12 text-center space-y-6 page-enter">
        <div className="glass-panel p-8 rounded-3xl border border-slate-200 shadow-float space-y-4 hover-lift">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-sky-600 to-indigo-600 text-white flex items-center justify-center mx-auto shadow-md animate-bounce-soft">
            <ShieldCheck className="w-8 h-8" />
          </div>
          <h2 className="text-2xl font-extrabold text-slate-900">Signed In as Accredited NGO Partner</h2>
          <p className="text-xs text-slate-600">
            Organization: <strong>{currentUser.ngoName || currentUser.name}</strong> ({currentUser.email})
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <button
              onClick={() => onNavigate('dbms')}
              className="px-6 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs shadow-md press-effect flex items-center gap-2"
            >
              Open NGO Drives & Volunteer Manager <ArrowRight className="w-4 h-4" />
            </button>
            <button
              onClick={() => onNavigate('events')}
              className="px-4 py-2.5 rounded-xl bg-sky-50 dark:bg-sky-950/60 text-sky-700 dark:text-sky-300 font-bold text-xs border border-sky-200 dark:border-sky-800 press-effect"
            >
              Browse Public Drives
            </button>
            <button
              onClick={logoutUser}
              className="px-4 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 font-bold text-xs press-effect"
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
      loginUser(email, password, 'NGO_PARTNER');
      onNavigate('dbms');
    } catch (err) {
      setErrorMessage(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');

    if (selectedSectors.length === 0) {
      setErrorMessage('Please select at least one primary sector where your NGO conducts drives.');
      return;
    }

    setLoading(true);

    try {
      await registerNewNgo({
        ngoName,
        email: regEmail,
        phone: regPhone,
        directorName,
        registrationNo,
        darpanId,
        city: regCity,
        state: regState,
        address: regAddress,
        primarySectors: selectedSectors,
        specialization,
        password: regPassword
      });
      // OTP verification modal opens automatically
    } catch (err) {
      setErrorMessage(err.message);
    } finally {
      setLoading(false);
    }
  };

  const fillDemoNgo = (ngoEmail, ngoPass) => {
    setEmail(ngoEmail);
    setPassword(ngoPass);
    setErrorMessage('');
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-12 text-left page-enter">
      <div className="grid md:grid-cols-12 gap-8 items-stretch">
        
        {/* Left Column: NGO Network Information */}
        <div className="md:col-span-5 space-y-5">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-gradient-to-r from-sky-600 to-indigo-600 text-white text-xs font-black shadow-md">
            <ShieldCheck className="w-4 h-4" />
            NGO Partner Access & Onboarding
          </div>

          <h1 className="text-3xl font-extrabold text-slate-900 leading-tight">
            National Directory of <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-600 via-indigo-600 to-emerald-600">
              Verified Social NGOs
            </span>
          </h1>

          <p className="text-xs text-slate-600 leading-relaxed">
            Register your NGO organization or sign in to access the National Awareness Events Management DBMS. Conduct drives for colleges, government bodies, schools, and corporate institutions.
          </p>

          <div className="space-y-3 pt-2">
            <div className="flex items-start gap-3 p-3.5 rounded-2xl bg-gradient-to-r from-sky-50 to-indigo-50 border border-sky-100 shadow-sm hover-lift cursor-default">
              <Award className="w-5 h-5 text-sky-600 mt-0.5 shrink-0" />
              <div>
                <p className="text-xs font-bold text-slate-900">National Awareness Network</p>
                <p className="text-[11px] text-slate-600 mt-0.5">Receive event requests directly from verified government offices, universities, and corporate MNCs.</p>
              </div>
            </div>

            <div className="flex items-start gap-3 p-3.5 rounded-2xl bg-gradient-to-r from-emerald-50 to-teal-50 border border-emerald-100 shadow-sm hover-lift cursor-default">
              <FileText className="w-5 h-5 text-emerald-600 mt-0.5 shrink-0" />
              <div>
                <p className="text-xs font-bold text-slate-900">Automated QR Certificate Studio</p>
                <p className="text-[11px] text-slate-600 mt-0.5">Issue cryptographically authentic SVG certificates with dynamic QR code verification.</p>
              </div>
            </div>

            <div className="flex items-start gap-3 p-3.5 rounded-2xl bg-gradient-to-r from-purple-50 to-indigo-50 border border-purple-100 shadow-sm hover-lift cursor-default">
              <Globe2 className="w-5 h-5 text-purple-600 mt-0.5 shrink-0" />
              <div>
                <p className="text-xs font-bold text-slate-900">80G & 12A Verified Directory</p>
                <p className="text-[11px] text-slate-600 mt-0.5">Showcase your organization's impact metrics, past events timeline, and partner ratings.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Dual-Mode Login / Register Card */}
        <div className="md:col-span-7">
          <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-float animate-scale-in">
            
            {/* Tab Switcher */}
            <div className="flex items-center justify-between border-b border-slate-200 pb-4 mb-6">
              <div>
                <h2 className="text-xl font-extrabold text-slate-900">
                  {isRegisterMode ? 'Register New NGO Partner' : 'NGO Partner Login'}
                </h2>
                <p className="text-xs text-slate-500 mt-0.5">
                  {isRegisterMode ? 'Onboard your NGO with 6-digit email OTP' : 'Sign in to access DBMS and campaign management'}
                </p>
              </div>

              <div className="flex bg-slate-100 p-1 rounded-xl">
                <button
                  type="button"
                  onClick={() => { setIsRegisterMode(false); setErrorMessage(''); }}
                  className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all press-effect ${!isRegisterMode ? 'bg-gradient-to-r from-sky-600 to-indigo-600 text-white shadow-sm' : 'text-slate-600 hover:text-slate-900'}`}
                >
                  Sign In
                </button>
                <button
                  type="button"
                  onClick={() => { setIsRegisterMode(true); setErrorMessage(''); }}
                  className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all press-effect ${isRegisterMode ? 'bg-gradient-to-r from-sky-600 to-indigo-600 text-white shadow-sm' : 'text-slate-600 hover:text-slate-900'}`}
                >
                  Register NGO
                </button>
              </div>
            </div>

            {errorMessage && (
              <div className="mb-4 p-3 rounded-xl bg-red-50 border border-red-200 text-xs font-semibold text-red-700 animate-scale-in">
                {errorMessage}
              </div>
            )}

            {!isRegisterMode ? (
              /* NGO SIGN IN FORM */
              <form onSubmit={handleLoginSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1">
                    Official NGO Email
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="contact@sankalpfoundation.org"
                      className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 text-xs font-bold text-slate-900 dark:text-white bg-white dark:bg-slate-900 focus:ring-2 focus:ring-sky-500 focus:outline-none transition-all placeholder:text-slate-400 dark:placeholder:text-slate-500"
                    />
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider">
                      Password
                    </label>
                    <button
                      type="button"
                      onClick={() => onNavigate('forgot-password')}
                      className="text-[11px] font-bold text-sky-600 dark:text-sky-400 hover:text-sky-700 hover:underline"
                    >
                      Forgot Password?
                    </button>
                  </div>
                  <div className="relative">
                    <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                    <input
                      type={showPassword ? 'text' : 'password'}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••"
                      className="w-full pl-9 pr-10 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 text-xs font-bold text-slate-900 dark:text-white bg-white dark:bg-slate-900 focus:ring-2 focus:ring-sky-500 focus:outline-none transition-all placeholder:text-slate-400 dark:placeholder:text-slate-500"
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
                  disabled={loading || !password}
                  className={`w-full py-2.5 rounded-xl font-black text-xs uppercase tracking-wider shadow-md transition-all ${
                    password ? 'bg-gradient-to-r from-emerald-600 via-teal-600 to-sky-600 hover:from-emerald-700 hover:to-sky-700 text-white press-effect' : 'bg-slate-200 dark:bg-slate-800 text-slate-400 cursor-not-allowed'
                  }`}
                >
                  {loading ? 'Authenticating NGO Account...' : 'Sign In with Password'}
                </button>

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
                      setErrorMessage('Please enter your official NGO email to receive OTP.');
                      return;
                    }
                    setLoading(true);
                    try {
                      await initiateEmailOtpLogin(email, 'NGO_PARTNER');
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
                  {loading ? "Sending OTP Code..." : "Send 6-Digit Official Email OTP Login Code ✉️"}
                </button>
              </form>
            ) : (
              /* NEW NGO REGISTRATION FORM */
              <form onSubmit={handleRegisterSubmit} className="space-y-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    NGO / Foundation Name
                  </label>
                  <div className="relative">
                    <Building2 className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                    <input
                      type="text"
                      required
                      value={ngoName}
                      onChange={(e) => setNgoName(e.target.value)}
                      placeholder="e.g. Hope Social Foundation"
                      className="w-full pl-9 pr-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 text-xs font-bold text-slate-900 dark:text-white bg-white dark:bg-slate-900 focus:ring-2 focus:ring-sky-500 focus:outline-none placeholder:text-slate-400 dark:placeholder:text-slate-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1">
                      Director / Key Contact Person
                    </label>
                    <input
                      type="text"
                      required
                      value={directorName}
                      onChange={(e) => setDirectorName(e.target.value)}
                      placeholder="Dr. S. K. Verma"
                      className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 text-xs font-bold text-slate-900 dark:text-white bg-white dark:bg-slate-900 focus:ring-2 focus:ring-sky-500 focus:outline-none placeholder:text-slate-400 dark:placeholder:text-slate-500"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      required
                      value={regPhone}
                      onChange={(e) => setRegPhone(e.target.value)}
                      placeholder="+91 98000 00000"
                      className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 text-xs font-bold text-slate-900 dark:text-white bg-white dark:bg-slate-900 focus:ring-2 focus:ring-sky-500 focus:outline-none placeholder:text-slate-400 dark:placeholder:text-slate-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1">
                      Registration No. (Trust/Society)
                    </label>
                    <input
                      type="text"
                      required
                      value={registrationNo}
                      onChange={(e) => setRegistrationNo(e.target.value)}
                      placeholder="NGO/MAH/2026/0129"
                      className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 text-xs font-bold font-mono text-slate-900 dark:text-white bg-white dark:bg-slate-900 focus:ring-2 focus:ring-sky-500 focus:outline-none placeholder:text-slate-400 dark:placeholder:text-slate-500"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1">
                      NITI Aayog Darpan ID (Optional)
                    </label>
                    <input
                      type="text"
                      value={darpanId}
                      onChange={(e) => setDarpanId(e.target.value)}
                      placeholder="MH/2026/00912"
                      className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 text-xs font-bold font-mono text-slate-900 dark:text-white bg-white dark:bg-slate-900 focus:ring-2 focus:ring-sky-500 focus:outline-none placeholder:text-slate-400 dark:placeholder:text-slate-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1">
                    Official Email (OTP Verification Sent Here)
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                    <input
                      type="email"
                      required
                      value={regEmail}
                      onChange={(e) => setRegEmail(e.target.value)}
                      placeholder="director@hopesocial.org"
                      className="w-full pl-9 pr-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 text-xs font-bold text-slate-900 dark:text-white bg-white dark:bg-slate-900 focus:ring-2 focus:ring-sky-500 focus:outline-none placeholder:text-slate-400 dark:placeholder:text-slate-500"
                    />
                  </div>
                </div>

                {/* Primary Sectors Selection */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1.5">
                    Target Sectors for Awareness Drives (Select all that apply)
                  </label>
                  <div className="grid grid-cols-2 gap-1.5">
                    {[
                      { id: 'Government Office', icon: Landmark, color: 'text-amber-600' },
                      { id: 'Public Office', icon: Building2, color: 'text-sky-600' },
                      { id: 'College', icon: GraduationCap, color: 'text-indigo-600' },
                      { id: 'School', icon: Users, color: 'text-emerald-600' }
                    ].map(sec => {
                      const Icon = sec.icon;
                      const isSelected = selectedSectors.includes(sec.id);
                      return (
                        <button
                          key={sec.id}
                          type="button"
                          onClick={() => toggleSector(sec.id)}
                          className={`flex items-center gap-2 p-2 rounded-xl text-xs font-bold border transition-all text-left ${
                            isSelected 
                              ? 'bg-sky-50 dark:bg-sky-950/80 border-sky-300 dark:border-sky-700 text-sky-900 dark:text-sky-200 shadow-sm' 
                              : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800'
                          }`}
                        >
                          <Icon className={`w-3.5 h-3.5 ${sec.color}`} />
                          <span className="truncate">{sec.id}</span>
                          {isSelected && <CheckCircle2 className="w-3.5 h-3.5 text-sky-600 ml-auto" />}
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1">
                      City & State
                    </label>
                    <input
                      type="text"
                      required
                      value={regCity}
                      onChange={(e) => setRegCity(e.target.value)}
                      placeholder="Mumbai, Maharashtra"
                      className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 text-xs font-bold text-slate-900 dark:text-white bg-white dark:bg-slate-900 focus:ring-2 focus:ring-sky-500 focus:outline-none placeholder:text-slate-400 dark:placeholder:text-slate-500"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1">
                      Account Password
                    </label>
                    <input
                      type="password"
                      required
                      value={regPassword}
                      onChange={(e) => setRegPassword(e.target.value)}
                      placeholder="Min 6 characters"
                      className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 text-xs font-bold text-slate-900 dark:text-white bg-white dark:bg-slate-900 focus:ring-2 focus:ring-sky-500 focus:outline-none placeholder:text-slate-400 dark:placeholder:text-slate-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1">
                    Specialization & Campaign Focus
                  </label>
                  <input
                    type="text"
                    required
                    value={specialization}
                    onChange={(e) => setSpecialization(e.target.value)}
                    placeholder="e.g. Women Safety, Anti-Substance Abuse, Mental Health, Road Safety"
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 text-xs font-bold text-slate-900 dark:text-white bg-white dark:bg-slate-900 focus:ring-2 focus:ring-sky-500 focus:outline-none placeholder:text-slate-400 dark:placeholder:text-slate-500"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 via-teal-600 to-sky-600 hover:from-emerald-700 hover:to-sky-700 text-white font-black text-xs uppercase tracking-wider shadow-md press-effect flex items-center justify-center gap-2 mt-2"
                >
                  <Zap className="w-3.5 h-3.5 fill-current" />
                  {loading ? 'Submitting Registration...' : 'Proceed to Email OTP Verification'}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
