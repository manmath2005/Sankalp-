import React, { useState } from 'react';
import { AppProvider } from './context/AppContext';
import { Navbar } from './components/Navbar';
import { HomeView } from './views/HomeView';
import { EventsView } from './views/EventsView';
import { PastHistoryView } from './views/PastHistoryView';
import { VolunteerDashboardView } from './views/VolunteerDashboardView';
import { CorporatePartnerView } from './views/CorporatePartnerView';
import { AdminDbmsView } from './views/AdminDbmsView';

import { CertificateVerificationView } from './views/CertificateVerificationView';
import { AiMatchmakerView } from './views/AiMatchmakerView';
import { SosEmergencyBanner } from './components/SosEmergencyBanner';
import { EsgReportGeneratorView } from './views/EsgReportGeneratorView';
import { AboutUsView } from './views/AboutUsView';

// Dedicated Separate Login Views
import { VolunteerLoginView } from './views/VolunteerLoginView';
import { NgoLoginView } from './views/NgoLoginView';
import { CompanyLoginView } from './views/CompanyLoginView';
import { HiddenAdminLoginView } from './views/HiddenAdminLoginView';
import { ForgotPasswordView } from './views/ForgotPasswordView';

// Global Modals
import { OtpVerificationModal } from './components/OtpVerificationModal';
import { DuplicateLoginModal } from './components/DuplicateLoginModal';
import { ToastNotification } from './components/ToastNotification';
import { ShieldCheck, Heart, Mail, Phone, MapPin, Lock, ArrowLeft } from 'lucide-react';

import { useApp } from './context/AppContext';

function MainLayout() {
  const [activeTab, setActiveTab] = useState(() => {
    // Check if ?verify= is in URL query parameters
    const params = new URLSearchParams(window.location.search);
    const verifyId = params.get('verify');
    if (verifyId) {
      return `verify-certificate-${verifyId}`;
    }
    return 'home';
  });

  // Navigation History Stack
  const [navHistory, setNavHistory] = useState(['home']);

  const handleNavigate = (newTab) => {
    if (newTab !== activeTab) {
      setNavHistory(prev => [...prev, activeTab]);
      setActiveTab(newTab);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleGoBack = () => {
    if (navHistory.length > 0) {
      const prevTab = navHistory[navHistory.length - 1];
      setNavHistory(prev => prev.slice(0, -1));
      setActiveTab(prevTab);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      setActiveTab('home');
    }
  };

  const { currentUser } = useApp();

  const renderView = () => {
    if (activeTab.startsWith('verify-certificate-')) {
      const certId = activeTab.replace('verify-certificate-', '');
      return <CertificateVerificationView certificateId={certId} onNavigate={handleNavigate} />;
    }

    switch (activeTab) {
      case 'esg-report':
      case 'csr-report':
      case 'csr-analytics':
        return <EsgReportGeneratorView onNavigate={handleNavigate} />;
      case 'matchmaker':
      case 'csr-matchmaker':
      case 'ai-matchmaker':
        return <AiMatchmakerView onNavigate={handleNavigate} />;
      case 'verify-certificate':
        return <CertificateVerificationView onNavigate={handleNavigate} />;
      case 'about':
      case 'about-us':
        return <AboutUsView onNavigate={handleNavigate} />;
      case 'events':
        return <EventsView />;
      case 'history':
        return <PastHistoryView />;
      case 'volunteer-hub':
        return <VolunteerDashboardView onNavigate={handleNavigate} />;
      case 'corporate':
      case 'corporate-partner':
        return <CorporatePartnerView onNavigate={handleNavigate} />;
      case 'volunteer-login':
        return <VolunteerLoginView onNavigate={handleNavigate} />;
      case 'ngo-login':
      case 'ngo-staff-login':
        return <NgoLoginView onNavigate={handleNavigate} />;
      case 'company-login':
        return <CompanyLoginView onNavigate={handleNavigate} />;
      case 'hidden-admin-login':
        return <HiddenAdminLoginView onNavigate={handleNavigate} />;
      case 'forgot-password':
      case 'reset-password':
        return <ForgotPasswordView onNavigate={handleNavigate} />;
      case 'dbms':
        // RBAC Enforcement: NGO_PARTNER, NGO_STAFF, and SUPER_ADMIN can manage campaigns, volunteers & NOCs
        if (!currentUser || (currentUser.role !== 'NGO_PARTNER' && currentUser.role !== 'NGO_STAFF' && currentUser.role !== 'SUPER_ADMIN')) {
          return <NgoLoginView onNavigate={handleNavigate} />;
        }
        return <AdminDbmsView />;
      default:
        return (
          <HomeView 
            onNavigate={handleNavigate} 
          />
        );
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-between bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 font-sans antialiased selection:bg-sky-500 selection:text-white transition-colors duration-300">
      
      {/* 1. Global Emergency Banner & Navigation Bar */}
      <div>
        <SosEmergencyBanner onSelectEvent={() => handleNavigate('events')} />
        <Navbar 
          activeTab={activeTab} 
          setActiveTab={handleNavigate} 
        />
        
        {/* Universal Top-Left Back Arrow for Internal Subpages */}
        {activeTab !== 'home' && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-3 pb-1 flex items-center">
            <button
              onClick={handleGoBack}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-white dark:bg-slate-900 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200 border border-slate-200/90 dark:border-slate-800 text-xs font-bold shadow-xs transition-all hover-lift press-effect group"
              title="Go back to previous screen"
            >
              <ArrowLeft className="w-4 h-4 text-sky-600 dark:text-sky-400 group-hover:-translate-x-1 transition-transform" />
              <span>Back</span>
            </button>
          </div>
        )}

        {/* Main Content Render */}
        <main className="transition-opacity duration-300 page-enter" key={activeTab}>
          {renderView()}
        </main>
      </div>

      {/* 2. Global Footer (Compact & Clean) */}
      <footer className="bg-slate-900 text-slate-400 border-t border-slate-800 text-left py-6 mt-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-5">
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 items-start">
            
            {/* Brand info */}
            <div className="space-y-2 md:col-span-2">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-lg bg-sky-600 flex items-center justify-center text-white">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <span className="font-extrabold text-base text-white tracking-tight">
                  SANKALP FOUNDATION
                </span>
              </div>
              <p className="text-[11px] text-slate-400 max-w-md leading-relaxed">
                Govt Registered Social Awareness Organization conducting onfield and virtual drives across government offices, public sectors, colleges, and schools. Empowering volunteers with accredited certificates and transparent corporate auditing.
              </p>
              <div className="text-[10px] text-slate-500 font-mono">
                Reg No: MAH/2018/094821 • 80G & 12A Certified
              </div>
            </div>

            {/* Separate Login Portals Links */}
            <div className="space-y-1.5">
              <h4 className="text-[11px] font-extrabold text-white uppercase tracking-wider">Role Portals</h4>
              <ul className="space-y-1 text-[11px]">
                <li>
                  <button onClick={() => setActiveTab('volunteer-login')} className="hover:text-sky-400 transition-colors">
                    👤 Volunteer Portal (OTP Sign In)
                  </button>
                </li>
                <li>
                  <button onClick={() => setActiveTab('company-login')} className="hover:text-indigo-400 transition-colors">
                    🏢 Company / Institution Login
                  </button>
                </li>
                <li>
                  <button onClick={() => setActiveTab('ngo-login')} className="hover:text-amber-400 transition-colors">
                    🛡️ Partner Portal (Login / Register)
                  </button>
                </li>
                <li>
                  <button onClick={() => setActiveTab('volunteer-hub')} className="hover:text-emerald-400 transition-colors">
                    📜 Volunteer Hub & Certificates
                  </button>
                </li>
                <li>
                  <button onClick={() => setActiveTab('forgot-password')} className="hover:text-amber-400 transition-colors">
                    🔑 Account Recovery & Password Reset
                  </button>
                </li>
              </ul>
            </div>

            {/* Contact */}
            <div className="space-y-1.5">
              <h4 className="text-[11px] font-extrabold text-white uppercase tracking-wider">Nodal Helpdesk</h4>
              <ul className="space-y-1 text-[11px]">
                <li className="flex items-center gap-2">
                  <Mail className="w-3.5 h-3.5 text-sky-400 shrink-0" />
                  <span className="truncate">contact@sankalpfoundation.org</span>
                </li>
                <li className="flex items-center gap-2">
                  <Phone className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span>+91 7030403004</span>
                </li>
                <li className="flex items-center gap-2">
                  <MapPin className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                  <span className="truncate">Govt Admin Hub, Cyber City</span>
                </li>
              </ul>
            </div>

          </div>

          {/* Copyright bar */}
          <div className="pt-4 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between text-[11px] text-slate-500 gap-2">
            <div className="flex items-center gap-2">
              <span>© 2026 Sankalp Social Foundation. All Rights Reserved.</span>
              
              {/* HIDDEN ADMIN LOGIN TRIGGER */}
              <button
                onClick={() => setActiveTab('hidden-admin-login')}
                title="Hidden Administrative Security Portal"
                className="opacity-30 hover:opacity-100 hover:text-amber-400 transition-all p-1"
              >
                <Lock className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="flex items-center gap-1">
              <span>Built with Float UI for Social Impact</span>
              <Heart className="w-3.5 h-3.5 text-red-500 fill-current ml-1" />
            </div>
          </div>

        </div>
      </footer>

      {/* Global Modals & Notifications */}
      <OtpVerificationModal />
      <DuplicateLoginModal />
      <ToastNotification />

    </div>
  );
}

export default function App() {
  return (
    <AppProvider>
      <MainLayout />
    </AppProvider>
  );
}
