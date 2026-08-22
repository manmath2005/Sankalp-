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
  Sparkles, 
  Menu, 
  X, 
  UserCheck, 
  Building, 
  Heart, 
  Globe, 
  ChevronDown, 
  FileText 
} from 'lucide-react';
import { SankalpBrandLogo } from './SankalpBrandLogo';
import { useApp } from '../context/AppContext';

export const GlobalNavbar = ({ activeTab, setActiveTab, onOpenDonate }) => {
  const { currentUser, logoutUser } = useApp();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [currentLang, setCurrentLang] = useState('EN');
  const [langDropdownOpen, setLangDropdownOpen] = useState(false);

  const languages = [
    { code: 'EN', label: 'English' },
    { code: 'HI', label: 'हिंदी (Hindi)' },
    { code: 'MR', label: 'मराठी (Marathi)' }
  ];

  return (
    <header className="sticky top-0 z-40 w-full px-4 sm:px-6 lg:px-8 pt-3 pb-2 transition-all">
      <div className="max-w-7xl mx-auto glass-panel rounded-2xl shadow-soft border border-sage/60 px-4 py-3 sm:px-6 flex items-center justify-between">
        
        {/* Brand Logo */}
        <div 
          onClick={() => setActiveTab('home')}
          className="flex items-center gap-3 cursor-pointer group"
        >
          <SankalpBrandLogo size="md" />
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-extrabold text-lg sm:text-xl tracking-tight text-forest-900 font-heading">
                SANKALP
              </span>
              <span className="bg-sage text-forest-800 text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider border border-forest-600/20">
                EARTH & CIVIC
              </span>
            </div>
            <p className="text-[11px] text-charcoal-400 font-medium hidden sm:block">
              Empowering Communities • Restoring Earth
            </p>
          </div>
        </div>


        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-1 bg-sand-100/80 p-1 rounded-xl border border-sand-200">
          <button
            onClick={() => setActiveTab('home')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
              activeTab === 'home' 
                ? 'bg-forest-700 text-white shadow-sm' 
                : 'text-charcoal-500 hover:text-forest-900 hover:bg-white/60'
            }`}
          >
            Mission
          </button>

          <button
            onClick={() => setActiveTab('events')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
              activeTab === 'events' 
                ? 'bg-forest-700 text-white shadow-sm' 
                : 'text-charcoal-500 hover:text-forest-900 hover:bg-white/60'
            }`}
          >
            Projects & Drives
          </button>

          <button
            onClick={() => setActiveTab('history')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
              activeTab === 'history' 
                ? 'bg-forest-700 text-white shadow-sm' 
                : 'text-charcoal-500 hover:text-forest-900 hover:bg-white/60'
            }`}
          >
            Impact & Transparency
          </button>

          <button
            onClick={() => setActiveTab('corporate')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
              activeTab === 'corporate' 
                ? 'bg-forest-700 text-white shadow-sm' 
                : 'text-charcoal-500 hover:text-forest-900 hover:bg-white/60'
            }`}
          >
            Partner Network
          </button>

          <button
            onClick={() => setActiveTab('volunteer-hub')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
              activeTab === 'volunteer-hub' 
                ? 'bg-forest-700 text-white shadow-sm' 
                : 'text-charcoal-500 hover:text-forest-900 hover:bg-white/60'
            }`}
          >
            Volunteer Hub
          </button>

          {/* Admin DBMS Access */}
          {(currentUser?.role === 'SUPER_ADMIN' || currentUser?.role === 'NGO_STAFF' || currentUser?.role === 'NGO_PARTNER' || activeTab === 'dbms') && (
            <button
              onClick={() => setActiveTab('dbms')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                activeTab === 'dbms' 
                  ? 'bg-forest-900 text-sage shadow-sm' 
                  : 'text-forest-800 hover:text-forest-900 hover:bg-white/60'
              }`}
            >
              <Database className="w-3.5 h-3.5 text-sage" />
              DBMS Panel
            </button>
          )}
        </nav>

        {/* Right Section: Language Selector, Portals & Glowing Donate Button */}
        <div className="hidden md:flex items-center gap-2">
          
          {/* Language Selector Dropdown */}
          <div className="relative">
            <button
              type="button"
              onClick={() => setLangDropdownOpen(!langDropdownOpen)}
              className="px-2.5 py-1.5 rounded-xl text-xs font-bold text-charcoal-600 bg-sand-100/90 hover:bg-sand-200/80 border border-sand-300 flex items-center gap-1 transition-all"
            >
              <Globe className="w-3.5 h-3.5 text-forest-600" />
              <span>{currentLang}</span>
              <ChevronDown className="w-3 h-3 text-charcoal-400" />
            </button>

            {langDropdownOpen && (
              <div className="absolute right-0 mt-1 w-32 glass-panel rounded-xl shadow-float border border-sage/80 py-1 z-50 animate-scale-in">
                {languages.map(lang => (
                  <button
                    key={lang.code}
                    onClick={() => {
                      setCurrentLang(lang.code);
                      setLangDropdownOpen(false);
                    }}
                    className={`w-full text-left px-3 py-1.5 text-xs font-medium hover:bg-sand-100 ${
                      currentLang === lang.code ? 'font-bold text-forest-700 bg-sage/30' : 'text-charcoal-600'
                    }`}
                  >
                    {lang.label}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* User Session or Portal Buttons */}
          {currentUser ? (
            <div className="flex items-center gap-2 bg-white/90 p-1.5 pr-3 rounded-xl border border-sage/60 shadow-sm">
              <div className={`w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold ${
                currentUser.role === 'SUPER_ADMIN' ? 'bg-forest-900 text-amber-300' :
                currentUser.role === 'NGO_PARTNER' || currentUser.role === 'NGO_STAFF' ? 'bg-forest-700 text-white' :
                currentUser.role === 'COMPANY_PARTNER' ? 'bg-forest-800 text-sand-100' :
                'bg-forest-600 text-white'
              }`}>
                {currentUser.name.charAt(0)}
              </div>
              <div className="text-left leading-tight">
                <div className="flex items-center gap-1.5">
                  <span className="text-xs font-bold text-charcoal-800 truncate max-w-[110px]">
                    {currentUser.name}
                  </span>
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                </div>
                <span className="text-[9px] font-extrabold text-charcoal-400 uppercase tracking-wider block">
                  {currentUser.role.replace('_', ' ')}
                </span>
              </div>

              <button
                onClick={logoutUser}
                title="Logout Session"
                className="p-1 rounded-lg hover:bg-sand-100 text-charcoal-400 hover:text-red-600 transition-colors ml-1"
              >
                <LogOut className="w-3.5 h-3.5" />
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-1">
              <button
                onClick={() => setActiveTab('volunteer-login')}
                className="px-2.5 py-1.5 rounded-xl text-xs font-bold text-charcoal-700 bg-white hover:bg-sand-50 border border-sand-300 shadow-sm transition-all"
              >
                Volunteer
              </button>
              <button
                onClick={() => setActiveTab('ngo-login')}
                className="px-2.5 py-1.5 rounded-xl text-xs font-bold text-charcoal-700 bg-white hover:bg-sand-50 border border-sand-300 shadow-sm transition-all"
              >
                NGO Portal
              </button>
            </div>
          )}

          {/* GLOWING PRIMARY ACTION BUTTON: "Donate Now" */}
          <button
            type="button"
            onClick={onOpenDonate}
            className="btn-glow-forest px-4 py-2 rounded-xl font-heading font-extrabold text-xs tracking-wider uppercase flex items-center gap-1.5"
          >
            <Heart className="w-3.5 h-3.5 text-sand-200 fill-sand-200 animate-pulse" />
            Donate Now
          </button>

        </div>

        {/* Mobile menu button */}
        <div className="flex lg:hidden items-center gap-2">
          <button
            type="button"
            onClick={onOpenDonate}
            className="btn-glow-forest px-3 py-1.5 rounded-xl font-heading font-bold text-[11px] uppercase flex items-center gap-1"
          >
            <Heart className="w-3 h-3 text-sand-200 fill-sand-200" /> Donate
          </button>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-xl text-charcoal-600 hover:text-forest-900 hover:bg-sand-100"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden mt-2 p-4 glass-panel rounded-2xl border border-sage/80 shadow-float-lg space-y-2 text-left animate-in fade-in duration-200">
          <button
            onClick={() => { setActiveTab('home'); setMobileMenuOpen(false); }}
            className="w-full flex items-center gap-3 p-2.5 rounded-xl text-xs font-bold text-charcoal-700 hover:bg-sand-100"
          >
            <Sparkles className="w-4 h-4 text-forest-600" /> Mission & Vision
          </button>
          <button
            onClick={() => { setActiveTab('events'); setMobileMenuOpen(false); }}
            className="w-full flex items-center gap-3 p-2.5 rounded-xl text-xs font-bold text-charcoal-700 hover:bg-sand-100"
          >
            <Calendar className="w-4 h-4 text-forest-600" /> Projects & Awareness Drives
          </button>
          <button
            onClick={() => { setActiveTab('history'); setMobileMenuOpen(false); }}
            className="w-full flex items-center gap-3 p-2.5 rounded-xl text-xs font-bold text-charcoal-700 hover:bg-sand-100"
          >
            <History className="w-4 h-4 text-forest-600" /> Impact Records & Transparency
          </button>
          <button
            onClick={() => { setActiveTab('corporate'); setMobileMenuOpen(false); }}
            className="w-full flex items-center gap-3 p-2.5 rounded-xl text-xs font-bold text-charcoal-700 hover:bg-sand-100"
          >
            <Building2 className="w-4 h-4 text-forest-600" /> Partner Network (Gov & Corp)
          </button>
          <button
            onClick={() => { setActiveTab('volunteer-hub'); setMobileMenuOpen(false); }}
            className="w-full flex items-center gap-3 p-2.5 rounded-xl text-xs font-bold text-charcoal-700 hover:bg-sand-100"
          >
            <Award className="w-4 h-4 text-forest-600" /> Volunteer Hub & Certificates
          </button>

          <div className="pt-3 border-t border-sand-300 space-y-2">
            <p className="text-[10px] font-extrabold text-charcoal-400 uppercase tracking-widest">Portals:</p>
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => { setActiveTab('volunteer-login'); setMobileMenuOpen(false); }}
                className="p-2 rounded-xl text-xs font-bold text-forest-800 bg-sand-100 text-center"
              >
                Volunteer Portal
              </button>
              <button
                onClick={() => { setActiveTab('ngo-login'); setMobileMenuOpen(false); }}
                className="p-2 rounded-xl text-xs font-bold text-forest-800 bg-sand-100 text-center"
              >
                NGO Portal
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
