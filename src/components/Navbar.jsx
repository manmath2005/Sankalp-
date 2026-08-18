import React, { useState } from 'react';
import { 
  ShieldCheck, 
  Calendar, 
  History, 
  Award, 
  Building2, 
  Database, 
  User, 
  LogOut, 
  KeyRound, 
  Sparkles,
  Menu,
  X,
  UserCheck,
  Building,
  Lock,
  ChevronDown,
  Sun,
  Moon,
  Zap,
  Flame
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export const Navbar = ({ activeTab, setActiveTab }) => {
  const { currentUser, logoutUser, darkMode, toggleDarkMode } = useApp();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [loginDropdownOpen, setLoginDropdownOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 w-full px-2 sm:px-4 lg:px-6 pt-2.5 pb-2 transition-all">
      <div className="max-w-7xl mx-auto glass-panel rounded-2xl shadow-float border border-slate-200/80 dark:border-slate-800/90 dark:bg-slate-900/95 px-3 py-2 sm:px-4 flex items-center justify-between gap-2">
        
        {/* Brand Logo */}
        <div 
          onClick={() => setActiveTab('home')}
          className="flex items-center gap-2.5 cursor-pointer group shrink-0"
        >
          <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-gradient-to-tr from-sky-600 via-sky-500 to-emerald-400 p-0.5 shadow-md group-hover:scale-105 transition-transform">
            <div className="w-full h-full bg-slate-900 rounded-[10px] flex items-center justify-center">
              <ShieldCheck className="w-4 h-4 text-sky-400" />
            </div>
          </div>
          <div>
            <div className="flex items-center gap-1">
              <span className="font-black text-base sm:text-lg tracking-tight text-slate-900 dark:text-white font-sans">
                SANKALP
              </span>
            </div>
            <p className="text-[10px] text-slate-500 dark:text-slate-400 font-medium hidden xl:block leading-none mt-0.5">
              Social Awareness & Volunteer Network
            </p>
          </div>
        </div>

        {/* Compact Desktop Horizontal Navigation Toggle */}
        <nav className="hidden lg:flex items-center gap-0.5 bg-slate-100/90 dark:bg-slate-800/90 p-1 rounded-xl border border-slate-200/60 dark:border-slate-700/60 overflow-x-auto max-w-full">
          
          <button
            onClick={() => setActiveTab('home')}
            className={`flex items-center gap-1 px-2.5 py-1 rounded-lg text-[11px] font-bold transition-all whitespace-nowrap ${
              activeTab === 'home' 
                ? 'bg-white dark:bg-slate-900 text-sky-700 dark:text-sky-400 shadow-xs' 
                : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-white/50 dark:hover:bg-slate-700/50'
            }`}
          >
            <Sparkles className="w-3 h-3" />
            <span>Home</span>
          </button>

          <button
            onClick={() => setActiveTab('events')}
            className={`flex items-center gap-1 px-2.5 py-1 rounded-lg text-[11px] font-bold transition-all whitespace-nowrap ${
              activeTab === 'events' 
                ? 'bg-white dark:bg-slate-900 text-sky-700 dark:text-sky-400 shadow-xs' 
                : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-white/50 dark:hover:bg-slate-700/50'
            }`}
          >
            <Calendar className="w-3 h-3" />
            <span>Events</span>
          </button>

          <button
            onClick={() => setActiveTab('history')}
            className={`flex items-center gap-1 px-2.5 py-1 rounded-lg text-[11px] font-bold transition-all whitespace-nowrap ${
              activeTab === 'history' 
                ? 'bg-white dark:bg-slate-900 text-sky-700 dark:text-sky-400 shadow-xs' 
                : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-white/50 dark:hover:bg-slate-700/50'
            }`}
          >
            <History className="w-3 h-3" />
            <span>Records</span>
          </button>

          <button
            onClick={() => setActiveTab('corporate')}
            className={`flex items-center gap-1 px-2.5 py-1 rounded-lg text-[11px] font-bold transition-all whitespace-nowrap ${
              activeTab === 'corporate' 
                ? 'bg-white dark:bg-slate-900 text-sky-700 dark:text-sky-400 shadow-xs' 
                : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-white/50 dark:hover:bg-slate-700/50'
            }`}
          >
            <Building2 className="w-3 h-3" />
            <span>Host Drive</span>
          </button>

          {/* Compact ESG Report & Matchmaker Toggles */}
          {(currentUser?.role === 'COMPANY_PARTNER' || currentUser?.role === 'SUPER_ADMIN' || activeTab === 'matchmaker' || activeTab === 'corporate' || activeTab === 'esg-report') && (
            <>
              <button
                onClick={() => setActiveTab('esg-report')}
                className={`flex items-center gap-1 px-2.5 py-1 rounded-lg text-[11px] font-black transition-all whitespace-nowrap ${
                  activeTab === 'esg-report' 
                    ? 'bg-emerald-600 text-white shadow-xs' 
                    : 'text-emerald-800 dark:text-emerald-300 bg-emerald-100/70 dark:bg-emerald-950/60 hover:bg-emerald-200/80 border border-emerald-300/80 dark:border-emerald-700/50'
                }`}
              >
                <ShieldCheck className="w-3 h-3 text-emerald-600 dark:text-emerald-400" />
                <span>ESG Report</span>
              </button>

              <button
                onClick={() => setActiveTab('matchmaker')}
                className={`flex items-center gap-1 px-2.5 py-1 rounded-lg text-[11px] font-black transition-all whitespace-nowrap ${
                  activeTab === 'matchmaker' 
                    ? 'bg-gradient-to-r from-sky-600 to-indigo-600 text-white shadow-xs' 
                    : 'text-amber-800 dark:text-amber-300 bg-amber-100/70 dark:bg-amber-950/60 hover:bg-amber-200/80 border border-amber-300/80 dark:border-amber-700/50'
                }`}
              >
                <Sparkles className="w-3 h-3 text-amber-600 dark:text-amber-400" />
                <span>CSR Match</span>
              </button>
            </>
          )}

          {/* Volunteer Hub Access (Strictly for logged in Volunteers only) */}
          {currentUser?.role === 'VOLUNTEER' && (
            <button
              onClick={() => setActiveTab('volunteer-hub')}
              className={`flex items-center gap-1 px-2.5 py-1 rounded-lg text-[11px] font-bold transition-all whitespace-nowrap ${
                activeTab === 'volunteer-hub' 
                  ? 'bg-white dark:bg-slate-900 text-sky-700 dark:text-sky-400 shadow-xs' 
                  : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-white/50 dark:hover:bg-slate-700/50'
              }`}
            >
              <Award className="w-3 h-3 text-sky-500" />
              <span>Volunteer Hub</span>
            </button>
          )}

          {/* About Us Link */}
          <button
            onClick={() => setActiveTab('about')}
            className={`flex items-center gap-1 px-2.5 py-1 rounded-lg text-[11px] font-bold transition-all whitespace-nowrap ${
              activeTab === 'about' 
                ? 'bg-white dark:bg-slate-900 text-emerald-700 dark:text-emerald-400 shadow-xs' 
                : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-white/50 dark:hover:bg-slate-700/50'
            }`}
          >
            <Sparkles className="w-3 h-3 text-emerald-600 dark:text-emerald-400" />
            <span>About Us</span>
          </button>

          {/* NGO & Admin DBMS Access */}
          {(currentUser?.role === 'SUPER_ADMIN' || currentUser?.role === 'NGO_PARTNER' || currentUser?.role === 'NGO_STAFF') && (
            <button
              onClick={() => setActiveTab('dbms')}
              className={`flex items-center gap-1 px-2.5 py-1 rounded-lg text-[11px] font-bold transition-all whitespace-nowrap ${
                activeTab === 'dbms' 
                  ? 'bg-slate-900 text-sky-400 shadow-xs' 
                  : 'text-slate-700 dark:text-slate-300 hover:text-slate-900 hover:bg-white/50'
              }`}
            >
              <Database className="w-3 h-3 text-sky-500" />
              <span>{currentUser?.role === 'SUPER_ADMIN' ? 'Admin DBMS' : 'NGO Manager'}</span>
            </button>
          )}
        </nav>

        {/* Right Section: Dark Mode Toggle & Portals */}
        <div className="flex items-center gap-2 shrink-0">
          
          {/* Dark Mode Switch Button */}
          <button
            onClick={toggleDarkMode}
            aria-label="Toggle Light / Dark Mode"
            title={darkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
            className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-amber-300 hover:bg-slate-200 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700 transition-all press-effect"
          >
            {darkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>

          {/* User Profile / Portal Menu */}
          <div className="hidden md:flex items-center gap-2">
            {currentUser ? (
              <div className="flex items-center gap-2 bg-white/90 dark:bg-slate-800/90 p-1.5 pr-2.5 rounded-xl border border-slate-200/80 dark:border-slate-700/80 shadow-xs">
                <div className={`w-7 h-7 rounded-lg flex items-center justify-center text-xs font-bold ${
                  currentUser.role === 'SUPER_ADMIN' ? 'bg-slate-900 text-amber-400' :
                  currentUser.role === 'NGO_STAFF' ? 'bg-sky-600 text-white' :
                  currentUser.role === 'COMPANY_PARTNER' ? 'bg-indigo-600 text-white' :
                  'bg-emerald-600 text-white'
                }`}>
                  {currentUser.name.charAt(0)}
                </div>
                <div className="text-left leading-tight hidden xl:block">
                  <div className="flex items-center gap-1">
                    <span className="text-[11px] font-bold text-slate-800 dark:text-white truncate max-w-[100px]">
                      {currentUser.name}
                    </span>
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                  </div>
                  <span className="text-[8px] font-extrabold text-slate-400 uppercase tracking-wider block">
                    {currentUser.role.replace('_', ' ')}
                  </span>
                </div>

                <button
                  onClick={logoutUser}
                  title="Logout"
                  className="ml-1 text-slate-400 hover:text-red-600 p-1 rounded-lg hover:bg-red-50 dark:hover:bg-red-950/40 transition-colors"
                >
                  <LogOut className="w-3.5 h-3.5" />
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-1">
                <button
                  onClick={() => setActiveTab('volunteer-login')}
                  className="px-2.5 py-1.5 rounded-xl text-[11px] font-bold text-slate-800 dark:text-slate-200 bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700 shadow-xs flex items-center gap-1 press-effect"
                >
                  <Award className="w-3 h-3 text-sky-600 dark:text-sky-400" />
                  <span>Volunteer</span>
                </button>

                <button
                  onClick={() => setActiveTab('company-login')}
                  className="px-2.5 py-1.5 rounded-xl text-[11px] font-bold text-slate-800 dark:text-slate-200 bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700 shadow-xs flex items-center gap-1 press-effect"
                >
                  <Building className="w-3 h-3 text-indigo-600 dark:text-indigo-400" />
                  <span>Company</span>
                </button>

                <button
                  onClick={() => setActiveTab('ngo-login')}
                  className="px-2.5 py-1.5 rounded-xl text-[11px] font-bold text-white bg-slate-900 dark:bg-sky-600 hover:bg-slate-800 dark:hover:bg-sky-700 shadow-xs flex items-center gap-1 press-effect"
                >
                  <UserCheck className="w-3 h-3 text-sky-400 dark:text-white" />
                  <span>NGO</span>
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Mobile menu button */}
        <div className="flex lg:hidden items-center gap-2">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-xl text-slate-600 hover:text-slate-900 hover:bg-slate-100"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu with Full Responsiveness */}
      {mobileMenuOpen && (
        <div className="lg:hidden mt-2 p-4 glass-panel rounded-2xl border border-slate-200/90 dark:border-slate-800 bg-white/95 dark:bg-slate-900/95 shadow-float-lg space-y-2 text-left animate-in fade-in duration-200">
          
          {/* User Profile Card inside Mobile Drawer if logged in */}
          {currentUser ? (
            <div className="p-3 mb-2 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200/80 dark:border-slate-700/80 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center text-xs font-black shadow-xs ${
                  currentUser.role === 'SUPER_ADMIN' ? 'bg-slate-900 text-amber-400' :
                  currentUser.role === 'NGO_STAFF' || currentUser.role === 'NGO_PARTNER' ? 'bg-sky-600 text-white' :
                  currentUser.role === 'COMPANY_PARTNER' ? 'bg-indigo-600 text-white' :
                  'bg-emerald-600 text-white'
                }`}>
                  {currentUser.name.charAt(0)}
                </div>
                <div className="leading-tight">
                  <p className="text-xs font-bold text-slate-900 dark:text-white truncate max-w-[170px]">
                    {currentUser.name}
                  </p>
                  <p className="text-[10px] font-extrabold text-sky-600 dark:text-sky-400 uppercase tracking-wider">
                    {currentUser.role.replace('_', ' ')}
                  </p>
                </div>
              </div>

              <button
                onClick={() => { logoutUser(); setMobileMenuOpen(false); }}
                className="px-2.5 py-1.5 rounded-lg bg-red-50 dark:bg-red-950/60 hover:bg-red-100 text-red-600 dark:text-red-400 text-xs font-bold flex items-center gap-1 border border-red-200 dark:border-red-800/60"
              >
                <LogOut className="w-3.5 h-3.5" /> Logout
              </button>
            </div>
          ) : null}

          <button
            onClick={() => { setActiveTab('home'); setMobileMenuOpen(false); }}
            className={`w-full flex items-center gap-3 p-2.5 rounded-xl text-xs font-bold transition-colors ${
              activeTab === 'home' ? 'bg-sky-50 dark:bg-sky-950/80 text-sky-700 dark:text-sky-300' : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
            }`}
          >
            <Sparkles className="w-4 h-4 text-sky-600" /> Home
          </button>
          
          <button
            onClick={() => { setActiveTab('events'); setMobileMenuOpen(false); }}
            className={`w-full flex items-center gap-3 p-2.5 rounded-xl text-xs font-bold transition-colors ${
              activeTab === 'events' ? 'bg-sky-50 dark:bg-sky-950/80 text-sky-700 dark:text-sky-300' : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
            }`}
          >
            <Calendar className="w-4 h-4 text-sky-600" /> Awareness Events
          </button>

          <button
            onClick={() => { setActiveTab('history'); setMobileMenuOpen(false); }}
            className={`w-full flex items-center gap-3 p-2.5 rounded-xl text-xs font-bold transition-colors ${
              activeTab === 'history' ? 'bg-amber-50 dark:bg-amber-950/80 text-amber-700 dark:text-amber-300' : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
            }`}
          >
            <History className="w-4 h-4 text-amber-600" /> Past Records & Audits
          </button>

          <button
            onClick={() => { setActiveTab('corporate'); setMobileMenuOpen(false); }}
            className={`w-full flex items-center gap-3 p-2.5 rounded-xl text-xs font-bold transition-colors ${
              activeTab === 'corporate' ? 'bg-indigo-50 dark:bg-indigo-950/80 text-indigo-700 dark:text-indigo-300' : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
            }`}
          >
            <Building2 className="w-4 h-4 text-indigo-600" /> Host Corporate / Govt Drive
          </button>

          {/* NGO / Admin Manager inside Mobile Menu for Authorized Accounts */}
          {(currentUser?.role === 'SUPER_ADMIN' || currentUser?.role === 'NGO_PARTNER' || currentUser?.role === 'NGO_STAFF') && (
            <button
              onClick={() => { setActiveTab('dbms'); setMobileMenuOpen(false); }}
              className={`w-full flex items-center gap-3 p-2.5 rounded-xl text-xs font-bold transition-colors ${
                activeTab === 'dbms' ? 'bg-slate-900 text-sky-400' : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
            >
              <Database className="w-4 h-4 text-sky-500" /> 
              {currentUser?.role === 'SUPER_ADMIN' ? 'Admin DBMS Master Control' : 'NGO Campaign & Volunteer Manager'}
            </button>
          )}

          {/* Volunteer Hub in Mobile Menu (Strictly if logged in as Volunteer) */}
          {currentUser?.role === 'VOLUNTEER' && (
            <button
              onClick={() => { setActiveTab('volunteer-hub'); setMobileMenuOpen(false); }}
              className={`w-full flex items-center gap-3 p-2.5 rounded-xl text-xs font-bold transition-colors ${
                activeTab === 'volunteer-hub' ? 'bg-emerald-50 dark:bg-emerald-950/80 text-emerald-700 dark:text-emerald-300' : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
            >
              <Award className="w-4 h-4 text-emerald-600" /> Volunteer Hub & Certificates
            </button>
          )}

          <button
            onClick={() => { setActiveTab('about'); setMobileMenuOpen(false); }}
            className={`w-full flex items-center gap-3 p-2.5 rounded-xl text-xs font-bold transition-colors ${
              activeTab === 'about' ? 'bg-emerald-50 dark:bg-emerald-950/80 text-emerald-700 dark:text-emerald-300' : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
            }`}
          >
            <Sparkles className="w-4 h-4 text-emerald-600" /> About BridgeImpact & Founder
          </button>

          {/* If NOT Logged in: Show Separate Login Buttons */}
          {!currentUser && (
            <div className="pt-3 border-t border-slate-200 dark:border-slate-800 space-y-2">
              <p className="text-[10px] font-extrabold text-slate-400 dark:text-slate-500 uppercase tracking-wider">
                Separate Role Portals:
              </p>
              
              <button
                onClick={() => { setActiveTab('volunteer-login'); setMobileMenuOpen(false); }}
                className="w-full p-2.5 rounded-xl text-xs font-bold text-slate-800 dark:text-slate-200 bg-slate-100 dark:bg-slate-800 flex items-center gap-2 press-effect hover:bg-slate-200 dark:hover:bg-slate-700"
              >
                <Award className="w-4 h-4 text-sky-600" /> 👤 Volunteer Portal (Sign In / Register)
              </button>
              
              <button
                onClick={() => { setActiveTab('company-login'); setMobileMenuOpen(false); }}
                className="w-full p-2.5 rounded-xl text-xs font-bold text-slate-800 dark:text-slate-200 bg-slate-100 dark:bg-slate-800 flex items-center gap-2 press-effect hover:bg-slate-200 dark:hover:bg-slate-700"
              >
                <Building className="w-4 h-4 text-indigo-600" /> 🏢 Company / Institutional Login
              </button>
              
              <button
                onClick={() => { setActiveTab('ngo-login'); setMobileMenuOpen(false); }}
                className="w-full p-2.5 rounded-xl text-xs font-bold text-white bg-slate-900 dark:bg-sky-600 flex items-center gap-2 press-effect hover:bg-slate-800 dark:hover:bg-sky-700 shadow-sm"
              >
                <UserCheck className="w-4 h-4 text-sky-400 dark:text-white" /> 🛡️ Partner NGO Portal (Login / Register)
              </button>
            </div>
          )}
        </div>
      )}
    </header>
  );
};
