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
import { ShieldCheck, Heart, Mail, Phone, MapPin, Lock } from 'lucide-react';

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
  const { currentUser } = useApp();

  const renderView = () => {
    if (activeTab.startsWith('verify-certificate-')) {
      const certId = activeTab.replace('verify-certificate-', '');
      return <CertificateVerificationView certificateId={certId} onNavigate={(tab) => setActiveTab(tab)} />;
    }

    switch (activeTab) {
      case 'esg-report':
      case 'csr-report':
      case 'csr-analytics':
        return <EsgReportGeneratorView onNavigate={(tab) => setActiveTab(tab)} />;
      case 'matchmaker':
      case 'csr-matchmaker':
      case 'ai-matchmaker':
        return <AiMatchmakerView onNavigate={(tab) => setActiveTab(tab)} />;
      case 'verify-certificate':
        return <CertificateVerificationView onNavigate={(tab) => setActiveTab(tab)} />;
      case 'events':
        return <EventsView />;
      case 'history':
        return <PastHistoryView />;
      case 'volunteer-hub':
        return <VolunteerDashboardView onNavigate={(tab) => setActiveTab(tab)} />;
      case 'corporate':
      case 'corporate-partner':
        return <CorporatePartnerView onNavigate={(tab) => setActiveTab(tab)} />;
      case 'volunteer-login':
        return <VolunteerLoginView onNavigate={(tab) => setActiveTab(tab)} />;
      case 'ngo-login':
      case 'ngo-staff-login':
        return <NgoLoginView onNavigate={(tab) => setActiveTab(tab)} />;
      case 'company-login':
        return <CompanyLoginView onNavigate={(tab) => setActiveTab(tab)} />;
      case 'hidden-admin-login':
        return <HiddenAdminLoginView onNavigate={(tab) => setActiveTab(tab)} />;
      case 'forgot-password':
      case 'reset-password':
        return <ForgotPasswordView onNavigate={(tab) => setActiveTab(tab)} />;
      case 'dbms':
        // RBAC Enforcement Guard: Only NGO_PARTNER, NGO_STAFF, or SUPER_ADMIN can view DBMS
        if (!currentUser || (currentUser.role !== 'NGO_PARTNER' && currentUser.role !== 'NGO_STAFF' && currentUser.role !== 'SUPER_ADMIN')) {
          return <NgoLoginView onNavigate={(tab) => setActiveTab(tab)} />;
        }
        return <AdminDbmsView />;
      default:
        return (
          <HomeView 
            onNavigate={(tab) => setActiveTab(tab)} 
          />
        );
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-between bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 font-sans antialiased selection:bg-sky-500 selection:text-white transition-colors duration-300">
      
      {/* 1. Global Emergency Banner & Navigation Bar */}
      <div>
        <SosEmergencyBanner onSelectEvent={() => setActiveTab('events')} />
        <Navbar 
          activeTab={activeTab} 
          setActiveTab={setActiveTab} 
        />
        
        {/* Main Content Render */}
        <main className="transition-opacity duration-300 page-enter" key={activeTab}>
          {renderView()}
        </main>
      </div>

      {/* 2. Global Footer */}
      <footer className="bg-slate-900 text-slate-400 border-t border-slate-800 text-left pt-12 pb-8 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            
            {/* NGO info */}
            <div className="space-y-3 md:col-span-2">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-sky-600 flex items-center justify-center text-white">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <span className="font-extrabold text-lg text-white tracking-tight">
                  SANKALP FOUNDATION NGO
                </span>
              </div>
              <p className="text-xs text-slate-400 max-w-md leading-relaxed">
                Govt Registered Social Awareness Organization conducting onfield and virtual drives across government offices, public sectors, colleges, and schools. Empowering volunteers with accredited certificates and corporate transparent auditing.
              </p>
              <div className="text-[11px] text-slate-500 font-mono">
                Reg No: NGO/MAH/2018/094821 • 80G & 12A Certified
              </div>
            </div>

            {/* Separate Login Portals Links */}
            <div className="space-y-2">
              <h4 className="text-xs font-extrabold text-white uppercase tracking-wider">Role Access Portals</h4>
              <ul className="space-y-1.5 text-xs">
                <li>
                  <button onClick={() => setActiveTab('volunteer-login')} className="hover:text-sky-400 transition-colors">
                    👤 Volunteer Login & Signup (OTP)
                  </button>
                </li>
                <li>
                  <button onClick={() => setActiveTab('company-login')} className="hover:text-indigo-400 transition-colors">
                    🏢 Company / Institution Login
                  </button>
                </li>
                <li>
                  <button onClick={() => setActiveTab('ngo-login')} className="hover:text-amber-400 transition-colors">
                    🛡️ NGO Portal (Login / Register)
                  </button>
                </li>
                <li>
                  <button onClick={() => setActiveTab('volunteer-hub')} className="hover:text-emerald-400 transition-colors">
                    📜 Volunteer Hub & Certificates
                  </button>
                </li>
                <li>
                  <button onClick={() => setActiveTab('forgot-password')} className="hover:text-amber-400 transition-colors">
                    🔑 Account Recovery & Reset Password
                  </button>
                </li>
              </ul>
            </div>

            {/* Contact */}
            <div className="space-y-2">
              <h4 className="text-xs font-extrabold text-white uppercase tracking-wider">Nodal Helpdesk</h4>
              <ul className="space-y-2 text-xs">
                <li className="flex items-center gap-2">
                  <Mail className="w-3.5 h-3.5 text-sky-400" />
                  <span>contact@sankalpfoundation.org</span>
                </li>
                <li className="flex items-center gap-2">
                  <Phone className="w-3.5 h-3.5 text-emerald-400" />
                  <span>+91 7030403004</span>
                </li>
                <li className="flex items-center gap-2">
                  <MapPin className="w-3.5 h-3.5 text-amber-400" />
                  <span>Govt Admin Hub, Sector 12, Cyber City</span>
                </li>
              </ul>
            </div>

          </div>

          {/* Copyright bar with Secret Hidden Super Admin Entry */}
          <div className="pt-8 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
            <div className="flex items-center gap-2">
              <span>© 2026 Sankalp Social Foundation. All Rights Reserved.</span>
              
              {/* HIDDEN ADMIN LOGIN TRIGGER (Discrete Lock Icon) */}
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
