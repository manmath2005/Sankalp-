import React, { useState } from 'react';
import { 
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
  Flame,
  ShieldCheck
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { SankalpBrandLogo } from './SankalpBrandLogo';

export const Navbar = ({ activeTab, setActiveTab }) => {
  const { currentUser, logoutUser, darkMode, toggleDarkMode } = useApp();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [loginDropdownOpen, setLoginDropdownOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 w-full px-2 sm:px-4 lg:px-6 pt-3 pb-2 transition-all">
      <div className="max-w-7xl mx-auto bg-slate-950/85 backdrop-blur-2xl rounded-2xl shadow-[0_10px_30px_rgba(0,0,0,0.6)] border border-slate-800/90 relative overflow-hidden px-3.5 py-2.5 sm:px-4 flex items-center justify-between gap-2">
        {/* Luminous Horizon Accent Rim */}
        <div className="absolute top-0 left-0 right-0 h-[1.5px] bg-gradient-to-r from-amber-500/60 via-emerald-500/50 to-blue-500/60 shadow-[0_0_10px_rgba(245,158,11,0.3)]" />
        
        {/* Brand Logo */}
        <div 
          onClick={() => setActiveTab('home')}
          className="flex items-center gap-2.5 cursor-pointer group shrink-0"
        >
          <SankalpBrandLogo size="md" />
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-black text-base sm:text-lg tracking-tight text-white font-display">
                SANKALP
              </span>
              <span className="text-[9px] font-extrabold px-1.5 py-0.5 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/30">
                HORIZON
              </span>
            </div>
            <p className="text-[10px] text-slate-400 font-medium hidden xl:block leading-none mt-0.5">
              Connecting Help to Hope
            </p>
          </div>
        </div>

        {/* Compact Desktop Horizontal Navigation Toggle */}
        <nav className="hidden lg:flex items-center gap-1 bg-slate-900/80 p-1 rounded-xl border border-slate-800/80 overflow-x-auto max-w-full">
          
          <button
            onClick={() => setActiveTab('home')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all whitespace-nowrap ${
              activeTab === 'home' 
                ? 'bg-slate-800 text-amber-400 shadow-[0_0_15px_rgba(245,158,11,0.2)] border border-amber-500/30' 
                : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>Home</span>
          </button>

          <button
            onClick={() => setActiveTab('events')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all whitespace-nowrap ${
              activeTab === 'events' 
                ? 'bg-slate-800 text-amber-400 shadow-[0_0_15px_rgba(245,158,11,0.2)] border border-amber-500/30' 
                : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
            }`}
          >
            <Calendar className="w-3.5 h-3.5" />
            <span>Events</span>
          </button>

          <button
            onClick={() => setActiveTab('history')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all whitespace-nowrap ${
              activeTab === 'history' 
                ? 'bg-slate-800 text-amber-400 shadow-[0_0_15px_rgba(245,158,11,0.2)] border border-amber-500/30' 
                : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
            }`}
          >
            <History className="w-3.5 h-3.5" />
            <span>Records</span>
          </button>

          <button
            onClick={() => setActiveTab('corporate')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all whitespace-nowrap ${
              activeTab === 'corporate' 
                ? 'bg-slate-800 text-amber-400 shadow-[0_0_15px_rgba(245,158,11,0.2)] border border-amber-500/30' 
                : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
            }`}
          >
            <Building2 className="w-3.5 h-3.5" />
            <span>Host Drive</span>
          </button>

          {/* Compact ESG Report & Matchmaker Toggles */}
          {(currentUser?.role === 'COMPANY_PARTNER' || currentUser?.role === 'SUPER_ADMIN' || activeTab === 'matchmaker' || activeTab === 'corporate' || activeTab === 'esg-report') && (
            <>
              <button
                onClick={() => setActiveTab('esg-report')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-black transition-all whitespace-nowrap ${
                  activeTab === 'esg-report' 
                    ? 'bg-emerald-600/90 text-white shadow-[0_0_15px_rgba(16,185,129,0.3)] border border-emerald-400/50' 
                    : 'text-emerald-300 bg-emerald-950/50 hover:bg-emerald-900/60 border border-emerald-800/60'
                }`}
              >
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                <span>ESG Report</span>
              </button>

              <button
                onClick={() => setActiveTab('matchmaker')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-black transition-all whitespace-nowrap ${
                  activeTab === 'matchmaker' 
                    ? 'bg-gradient-to-r from-amber-500 to-emerald-600 text-slate-950 shadow-[0_0_15px_rgba(245,158,11,0.3)]' 
                    : 'text-amber-300 bg-amber-950/50 hover:bg-amber-900/60 border border-amber-800/60'
                }`}
              >
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                <span>CSR Match</span>
              </button>
            </>
          )}

          {/* Volunteer Hub Access */}
          {currentUser?.role === 'VOLUNTEER' && (
            <button
              onClick={() => setActiveTab('volunteer-hub')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all whitespace-nowrap ${
                activeTab === 'volunteer-hub' 
                  ? 'bg-slate-800 text-amber-400 shadow-[0_0_15px_rgba(245,158,11,0.2)] border border-amber-500/30' 
                  : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              <Award className="w-3.5 h-3.5 text-amber-400" />
              <span>Volunteer Hub</span>
            </button>
          )}

          {/* About Us Link */}
          <button
            onClick={() => setActiveTab('about')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all whitespace-nowrap ${
              activeTab === 'about' 
                ? 'bg-slate-800 text-emerald-400 shadow-[0_0_15px_rgba(16,185,129,0.2)] border border-emerald-500/30' 
                : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
            <span>About Us</span>
          </button>

          {/* NGO & Admin DBMS Access */}
          {(currentUser?.role === 'SUPER_ADMIN' || currentUser?.role === 'NGO_PARTNER' || currentUser?.role === 'NGO_STAFF') && (
            <button
              onClick={() => setActiveTab('dbms')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all whitespace-nowrap ${
                activeTab === 'dbms' 
                  ? 'bg-slate-800 text-sky-400 shadow-[0_0_15px_rgba(59,130,246,0.2)] border border-sky-500/30' 
                  : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              <Database className="w-3.5 h-3.5 text-sky-400" />
              <span>{currentUser?.role === 'SUPER_ADMIN' ? 'Admin DBMS' : 'NGO Manager'}</span>
            </button>
          )}

          {/* Corporate Dashboard */}
          {currentUser?.role === 'COMPANY_PARTNER' && (
            <button
              onClick={() => setActiveTab('corporate')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all whitespace-nowrap ${
                activeTab === 'corporate' 
                  ? 'bg-blue-600 text-white shadow-xs' 
                  : 'text-blue-300 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              <Building className="w-3.5 h-3.5" />
              <span>Corporate Hub</span>
            </button>
          )}
        </nav>

        {/* Right Section: Theme Toggle & Portals */}
        <div className="flex items-center gap-2 shrink-0">
          
          <button
            onClick={toggleDarkMode}
            aria-label="Toggle Atmosphere"
            className="p-2 rounded-xl bg-slate-900/80 text-amber-400 hover:bg-slate-800 border border-slate-700/80 transition-all press-effect"
          >
            {darkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>

          {/* User Profile / Portal Menu */}
          <div className="hidden md:flex items-center gap-2">
            {currentUser ? (
              <div className="flex items-center gap-2 bg-slate-900/90 p-1.5 pr-2.5 rounded-xl border border-slate-700/80 shadow-xs">
                <div className={`w-7 h-7 rounded-lg flex items-center justify-center text-xs font-black ${
                  currentUser.role === 'SUPER_ADMIN' ? 'bg-amber-500 text-slate-950 font-extrabold' :
                  currentUser.role === 'NGO_STAFF' ? 'bg-sky-600 text-white' :
                  currentUser.role === 'COMPANY_PARTNER' ? 'bg-blue-600 text-white' :
                  'bg-emerald-600 text-white'
                }`}>
                  {((currentUser.companyName || currentUser.name || currentUser.email || 'U')).charAt(0).toUpperCase()}
                </div>
                <div className="text-left leading-tight hidden xl:block">
                  <div className="flex items-center gap-1">
                    <span className="text-[11px] font-bold text-white truncate max-w-[100px]">
                      {currentUser.companyName || currentUser.name || currentUser.email}
                    </span>
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                  </div>
                  <span className="text-[8px] font-extrabold text-slate-400 uppercase tracking-wider block">
                    {currentUser.role.replace('_', ' ')}
                  </span>
                </div>

                <button
                  onClick={logoutUser}
                  title="Logout"
                  className="ml-1 text-slate-400 hover:text-red-400 p-1 rounded-lg hover:bg-red-950/40 transition-colors"
                >
                  <LogOut className="w-3.5 h-3.5" />
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-1.5">
                <button
                  onClick={() => setActiveTab('volunteer-login')}
                  className="px-3 py-1.5 rounded-xl text-xs font-bold text-slate-200 bg-slate-900/80 hover:bg-slate-800 border border-slate-700/80 shadow-xs flex items-center gap-1.5 press-effect"
                >
                  <Award className="w-3.5 h-3.5 text-amber-400" />
                  <span>Volunteer</span>
                </button>

                <button
                  onClick={() => setActiveTab('company-login')}
                  className="px-3 py-1.5 rounded-xl text-xs font-bold text-slate-200 bg-slate-900/80 hover:bg-slate-800 border border-slate-700/80 shadow-xs flex items-center gap-1.5 press-effect"
                >
                  <Building className="w-3.5 h-3.5 text-blue-400" />
                  <span>Company</span>
                </button>

                <button
                  onClick={() => setActiveTab('ngo-login')}
                  className="px-3 py-1.5 rounded-xl text-xs font-bold text-slate-950 bg-gradient-to-r from-amber-500 to-emerald-500 hover:from-amber-400 hover:to-emerald-400 shadow-[0_0_15px_rgba(245,158,11,0.25)] flex items-center gap-1.5 press-effect"
                >
                  <UserCheck className="w-3.5 h-3.5 text-slate-950" />
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

      {/* Mobile Drawer Menu with Luminous Horizon Aesthetics */}
      {mobileMenuOpen && (
        <div className="lg:hidden mt-2 p-4 rounded-2xl border border-slate-800/90 bg-slate-950/95 backdrop-blur-2xl shadow-[0_20px_50px_rgba(0,0,0,0.8)] space-y-2 text-left animate-in fade-in duration-200 relative overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-[1.5px] bg-gradient-to-r from-amber-500/60 via-emerald-500/50 to-blue-500/60 shadow-[0_0_10px_rgba(245,158,11,0.3)]" />
          
          {/* User Profile Card inside Mobile Drawer if logged in */}
          {currentUser ? (
            <div className="p-3 mb-2 rounded-xl bg-slate-900/90 border border-slate-800/90 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center text-xs font-black shadow-xs ${
                  currentUser.role === 'SUPER_ADMIN' ? 'bg-amber-500 text-slate-950 font-extrabold' :
                  currentUser.role === 'NGO_STAFF' || currentUser.role === 'NGO_PARTNER' ? 'bg-sky-600 text-white' :
                  currentUser.role === 'COMPANY_PARTNER' ? 'bg-blue-600 text-white' :
                  'bg-emerald-600 text-white'
                }`}>
                  {((currentUser.companyName || currentUser.name || currentUser.email || 'U')).charAt(0).toUpperCase()}
                </div>
                <div className="leading-tight">
                  <p className="text-xs font-bold text-white truncate max-w-[170px]">
                    {currentUser.companyName || currentUser.name || currentUser.email}
                  </p>
                  <p className="text-[10px] font-extrabold text-amber-400 uppercase tracking-wider">
                    {currentUser.role.replace('_', ' ')}
                  </p>
                </div>
              </div>

              <button
                onClick={() => { logoutUser(); setMobileMenuOpen(false); }}
                className="px-2.5 py-1.5 rounded-lg bg-red-950/40 hover:bg-red-900/60 text-red-400 text-xs font-bold flex items-center gap-1 border border-red-800/60"
              >
                <LogOut className="w-3.5 h-3.5" /> Logout
              </button>
            </div>
          ) : null}

          <button
            onClick={() => { setActiveTab('home'); setMobileMenuOpen(false); }}
            className={`w-full flex items-center gap-3 p-2.5 rounded-xl text-xs font-bold transition-colors ${
              activeTab === 'home' ? 'bg-slate-800 text-amber-400 border border-amber-500/30' : 'text-slate-300 hover:bg-slate-900 hover:text-white'
            }`}
          >
            <Sparkles className="w-4 h-4 text-amber-400" /> Home
          </button>
          
          <button
            onClick={() => { setActiveTab('events'); setMobileMenuOpen(false); }}
            className={`w-full flex items-center gap-3 p-2.5 rounded-xl text-xs font-bold transition-colors ${
              activeTab === 'events' ? 'bg-slate-800 text-amber-400 border border-amber-500/30' : 'text-slate-300 hover:bg-slate-900 hover:text-white'
            }`}
          >
            <Calendar className="w-4 h-4 text-amber-400" /> Awareness Events
          </button>

          <button
            onClick={() => { setActiveTab('history'); setMobileMenuOpen(false); }}
            className={`w-full flex items-center gap-3 p-2.5 rounded-xl text-xs font-bold transition-colors ${
              activeTab === 'history' ? 'bg-slate-800 text-amber-400 border border-amber-500/30' : 'text-slate-300 hover:bg-slate-900 hover:text-white'
            }`}
          >
            <History className="w-4 h-4 text-amber-400" /> Past Records & Audits
          </button>

          <button
            onClick={() => { setActiveTab('corporate'); setMobileMenuOpen(false); }}
            className={`w-full flex items-center gap-3 p-2.5 rounded-xl text-xs font-bold transition-colors ${
              activeTab === 'corporate' ? 'bg-slate-800 text-blue-400 border border-blue-500/30' : 'text-slate-300 hover:bg-slate-900 hover:text-white'
            }`}
          >
            <Building2 className="w-4 h-4 text-blue-400" /> Host Corporate / Govt Drive
          </button>

          {/* NGO / Admin Manager inside Mobile Menu */}
          {(currentUser?.role === 'SUPER_ADMIN' || currentUser?.role === 'NGO_PARTNER' || currentUser?.role === 'NGO_STAFF') && (
            <button
              onClick={() => { setActiveTab('dbms'); setMobileMenuOpen(false); }}
              className={`w-full flex items-center gap-3 p-2.5 rounded-xl text-xs font-bold transition-colors ${
                activeTab === 'dbms' ? 'bg-slate-800 text-sky-400 border border-sky-500/30' : 'text-slate-300 hover:bg-slate-900 hover:text-white'
              }`}
            >
              <Database className="w-4 h-4 text-sky-400" /> 
              {currentUser?.role === 'SUPER_ADMIN' ? 'Admin DBMS Master Control' : 'NGO Campaign & Volunteer Manager'}
            </button>
          )}

          {/* Volunteer Hub in Mobile Menu */}
          {currentUser?.role === 'VOLUNTEER' && (
            <button
              onClick={() => { setActiveTab('volunteer-hub'); setMobileMenuOpen(false); }}
              className={`w-full flex items-center gap-3 p-2.5 rounded-xl text-xs font-bold transition-colors ${
                activeTab === 'volunteer-hub' ? 'bg-slate-800 text-emerald-400 border border-emerald-500/30' : 'text-slate-300 hover:bg-slate-900 hover:text-white'
              }`}
            >
              <Award className="w-4 h-4 text-emerald-400" /> Volunteer Hub & Certificates
            </button>
          )}

          {/* Corporate Dashboard in Mobile Menu */}
          {currentUser?.role === 'COMPANY_PARTNER' && (
            <button
              onClick={() => { setActiveTab('corporate'); setMobileMenuOpen(false); }}
              className={`w-full flex items-center gap-3 p-2.5 rounded-xl text-xs font-bold transition-colors ${
                activeTab === 'corporate' ? 'bg-slate-800 text-blue-400 border border-blue-500/30' : 'text-slate-300 hover:bg-slate-900 hover:text-white'
              }`}
            >
              <Building className="w-4 h-4 text-blue-400" /> Corporate Dashboard
            </button>
          )}

          <button
            onClick={() => { setActiveTab('about'); setMobileMenuOpen(false); }}
            className={`w-full flex items-center gap-3 p-2.5 rounded-xl text-xs font-bold transition-colors ${
              activeTab === 'about' ? 'bg-slate-800 text-emerald-400 border border-emerald-500/30' : 'text-slate-300 hover:bg-slate-900 hover:text-white'
            }`}
          >
            <Sparkles className="w-4 h-4 text-emerald-400" /> About Sankalp & Founder
          </button>

          {/* If NOT Logged in: Show Separate Login Buttons */}
          {!currentUser && (
            <div className="pt-3 border-t border-slate-800/80 space-y-2">
              <p className="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider">
                Separate Role Portals:
              </p>
              
              <button
                onClick={() => { setActiveTab('volunteer-login'); setMobileMenuOpen(false); }}
                className="w-full p-2.5 rounded-xl text-xs font-bold text-slate-200 bg-slate-900/80 flex items-center gap-2 border border-slate-700/80 hover:bg-slate-800"
              >
                <Award className="w-4 h-4 text-amber-400" /> 👤 Volunteer Portal (Sign In / Register)
              </button>
              
              <button
                onClick={() => { setActiveTab('company-login'); setMobileMenuOpen(false); }}
                className="w-full p-2.5 rounded-xl text-xs font-bold text-slate-200 bg-slate-900/80 flex items-center gap-2 border border-slate-700/80 hover:bg-slate-800"
              >
                <Building className="w-4 h-4 text-blue-400" /> 🏢 Company / Institutional Login
              </button>
              
              <button
                onClick={() => { setActiveTab('ngo-login'); setMobileMenuOpen(false); }}
                className="w-full p-2.5 rounded-xl text-xs font-bold text-slate-950 bg-gradient-to-r from-amber-500 to-emerald-500 hover:from-amber-400 hover:to-emerald-400 flex items-center gap-2 shadow-[0_0_15px_rgba(245,158,11,0.25)]"
              >
                <UserCheck className="w-4 h-4 text-slate-950" /> 🛡️ Partner NGO Portal (Login / Register)
              </button>
            </div>
          )}
        </div>
      )}

    </header>
  );
};
