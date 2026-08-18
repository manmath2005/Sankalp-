import React, { useState } from 'react';
import { Hero } from '../components/Hero';
import { EventCard } from '../components/EventCard';
import { EventModal } from '../components/EventModal';
import { useApp } from '../context/AppContext';

// High-resolution Generated Image Assets
import corporateEsgBg from '../assets/images/corporate_esg_bg.jpg';
import volunteerCelebrationImg from '../assets/images/volunteer_celebration.jpg';
import panoramicLandscapeBg from '../assets/images/panoramic_dawn_landscape.jpg';

import { 
  Building2, 
  Landmark, 
  GraduationCap, 
  Users, 
  ArrowRight, 
  ShieldCheck, 
  CheckCircle2, 
  Sparkles,
  Award,
  Globe2,
  Calendar,
  Lock,
  Briefcase,
  HeartHandshake,
  UserCheck,
  TrendingUp,
  FileCheck2,
  BookOpen,
  Heart,
  TreePine,
  Utensils,
  Accessibility,
  Flame,
  Check
} from 'lucide-react';

export const HomeView = ({ onNavigate }) => {
  const { events, pastEvents, currentUser } = useApp();
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [categoryFilter, setCategoryFilter] = useState('ALL');

  const filteredUpcoming = events.filter(e => {
    if (categoryFilter === 'ALL') return true;
    return e.category === categoryFilter;
  });

  const handleInstitutionalAction = () => {
    if (currentUser?.role === 'COMPANY_PARTNER') {
      onNavigate('corporate');
    } else {
      onNavigate('company-login');
    }
  };

  return (
    <div className="space-y-16 pb-16 page-enter">
      {/* 1. Hero Section with Cinematic Community Backdrop */}
      <Hero 
        onExploreEvents={() => onNavigate('events')}
        onHostEvent={handleInstitutionalAction}
      />

      {/* 2. Impact Metric Strip (4-Column Counter Strip) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-6">
        <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-white/80 shadow-float-lg bg-white/95 backdrop-blur-xl animate-float-up">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center divide-y md:divide-y-0 md:divide-x divide-slate-100">
            <div className="p-2 space-y-1">
              <span className="text-3xl sm:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-sky-600 to-indigo-600">
                50+
              </span>
              <p className="text-xs font-extrabold text-slate-800 uppercase tracking-wider">Verified NGOs</p>
              <p className="text-[11px] text-slate-500 font-medium">NITI Aayog Darpan & 80G Compliant</p>
            </div>

            <div className="p-2 space-y-1 pt-4 md:pt-2">
              <span className="text-3xl sm:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-teal-600">
                10k+
              </span>
              <p className="text-xs font-extrabold text-slate-800 uppercase tracking-wider">Citizen Volunteers</p>
              <p className="text-[11px] text-slate-500 font-medium">Active Across 38+ Districts</p>
            </div>

            <div className="p-2 space-y-1 pt-4 md:pt-2">
              <span className="text-3xl sm:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-amber-500 to-orange-600">
                250+
              </span>
              <p className="text-xs font-extrabold text-slate-800 uppercase tracking-wider">Completed CSR Drives</p>
              <p className="text-[11px] text-slate-500 font-medium">Govt Offices, Corporates & Colleges</p>
            </div>

            <div className="p-2 space-y-1 pt-4 md:pt-2">
              <span className="text-3xl sm:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600">
                50k+
              </span>
              <p className="text-xs font-extrabold text-slate-800 uppercase tracking-wider">Service Hours Logged</p>
              <p className="text-[11px] text-slate-500 font-medium">Verifiable Digital QR Credentials</p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. How It Works (3-Column Interactive Card Grid) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-10">
          <span className="text-xs font-extrabold text-sky-600 uppercase tracking-widest bg-sky-50 px-3.5 py-1 rounded-full border border-sky-200">
            A Unified Tri-Party Ecosystem
          </span>
          <h2 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight">
            How ImpactBridge Powers Seamless Social Action
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 font-medium leading-relaxed">
            Connecting companies with mandated CSR budgets, verified non-profit executors, and impassioned citizen volunteers under one authenticated roof.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 text-left">
          
          {/* Card 1: For Corporations */}
          <div className="glass-panel p-7 rounded-3xl border border-indigo-100/80 shadow-sm hover-lift flex flex-col justify-between space-y-5 bg-gradient-to-b from-white to-indigo-50/30">
            <div className="space-y-4">
              <div className="w-14 h-14 rounded-2xl bg-indigo-600 text-white flex items-center justify-center shadow-lg shadow-indigo-600/20">
                <Briefcase className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-extrabold text-slate-900">For Corporations & Govts</h3>
              <p className="text-xs text-slate-600 leading-relaxed font-medium">
                Meet Section 135 CSR mandates, plan customized employee onfield engagement, inspect 50+ NGO track records, and download automated ESG audit reports.
              </p>

              <ul className="space-y-2 text-xs text-slate-700 pt-2 border-t border-slate-100">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-indigo-600 shrink-0" />
                  <span>Curated 80G & Darpan Verified Partner List</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-indigo-600 shrink-0" />
                  <span>Instant Sanction Letter & Quota Approvals</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-indigo-600 shrink-0" />
                  <span>Real-Time Employee Hours Attendance Ledger</span>
                </li>
              </ul>
            </div>

            <button
              onClick={() => onNavigate('company-login')}
              className="w-full py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold transition-all shadow-md press-effect flex items-center justify-center gap-2"
            >
              <span>Corporate Portal Access</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Card 2: For NGOs */}
          <div className="glass-panel p-7 rounded-3xl border border-amber-100/80 shadow-sm hover-lift flex flex-col justify-between space-y-5 bg-gradient-to-b from-white to-amber-50/30">
            <div className="space-y-4">
              <div className="w-14 h-14 rounded-2xl bg-amber-600 text-white flex items-center justify-center shadow-lg shadow-amber-600/20">
                <HeartHandshake className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-extrabold text-slate-900">For Non-Profits & NGOs</h3>
              <p className="text-xs text-slate-600 leading-relaxed font-medium">
                Publish upcoming public health, education, and ecological drives, mobilize dedicated volunteers, and receive direct funding requests from institutional partners.
              </p>

              <ul className="space-y-2 text-xs text-slate-700 pt-2 border-t border-slate-100">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-amber-600 shrink-0" />
                  <span>Institutional Awareness Campaign Hosting</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-amber-600 shrink-0" />
                  <span>Automated QR Certificate Generation</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-amber-600 shrink-0" />
                  <span>Direct Corporate Proposal Inquiries</span>
                </li>
              </ul>
            </div>

            <button
              onClick={() => onNavigate('ngo-login')}
              className="w-full py-3 rounded-xl bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold transition-all shadow-md press-effect flex items-center justify-center gap-2"
            >
              <span>NGO Registration & Login</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Card 3: For Volunteers */}
          <div className="glass-panel p-7 rounded-3xl border border-emerald-100/80 shadow-sm hover-lift flex flex-col justify-between space-y-5 bg-gradient-to-b from-white to-emerald-50/30">
            <div className="space-y-4">
              <div className="w-14 h-14 rounded-2xl bg-emerald-600 text-white flex items-center justify-center shadow-lg shadow-emerald-600/20">
                <UserCheck className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-extrabold text-slate-900">For Citizen Volunteers</h3>
              <p className="text-xs text-slate-600 leading-relaxed font-medium">
                Join verified social action initiatives matching your passion and availability. Build a credible, authenticated community service portfolio with cryptographically verified QR certificates.
              </p>

              <ul className="space-y-2 text-xs text-slate-700 pt-2 border-t border-slate-100">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Passwordless OTP Login & Quick RSVPs</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Accredited Downloadable Certificates</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Editable Skills & Demographics Profile</span>
                </li>
              </ul>
            </div>

            <button
              onClick={() => onNavigate('volunteer-login')}
              className="w-full py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition-all shadow-md press-effect flex items-center justify-center gap-2"
            >
              <span>Volunteer Sign In (OTP)</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

        </div>
      </section>

      {/* 4. Curated Cause Explorer & Upcoming Events */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm text-left animate-float-up space-y-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <span className="text-xs font-extrabold text-sky-600 uppercase tracking-widest block mb-1">
                Curated Cause Explorer
              </span>
              <h2 className="text-xl sm:text-2xl font-black text-slate-900">
                Browse Live Awareness Drives by Sector
              </h2>
              <p className="text-xs text-slate-500 mt-1">
                Filter onfield drives and online webinars tailored for specific institutional environments.
              </p>
            </div>

            {/* Category Filter Pills */}
            <div className="flex flex-wrap gap-1.5 bg-slate-100 p-1.5 rounded-2xl border border-slate-200/80">
              {[
                { id: 'ALL', label: 'All Sectors', icon: Globe2, color: 'bg-sky-600' },
                { id: 'Government Office', label: 'Govt Offices', icon: Landmark, color: 'bg-amber-600' },
                { id: 'Public Office', label: 'Public & MNCs', icon: Building2, color: 'bg-sky-600' },
                { id: 'College', label: 'Colleges', icon: GraduationCap, color: 'bg-indigo-600' },
                { id: 'School', label: 'Schools', icon: Users, color: 'bg-emerald-600' }
              ].map(cat => {
                const Icon = cat.icon;
                const active = categoryFilter === cat.id;
                return (
                  <button
                    key={cat.id}
                    onClick={() => setCategoryFilter(cat.id)}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all press-effect ${
                      active ? `${cat.color} text-white shadow-sm` : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    <Icon className="w-3.5 h-3.5" />
                    <span>{cat.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Upcoming Event Cards Grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredUpcoming.slice(0, 3).map(evt => (
              <EventCard 
                key={evt.id} 
                event={evt} 
                onSelect={(e) => setSelectedEvent(e)}
              />
            ))}
          </div>

          <div className="text-center pt-2">
            <button
              onClick={() => onNavigate('events')}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-extrabold transition-all shadow-md press-effect"
            >
              <span>Explore All {events.length} Upcoming Awareness Drives</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>

      {/* 5. Corporate / ESG Metrics Section with Generated High-Tech Backdrop */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl overflow-hidden text-white shadow-float-lg text-left border border-slate-800">
          
          {/* Background Image with High-Tech Glow */}
          <img 
            src={corporateEsgBg} 
            alt="Corporate ESG Metrics Backdrop" 
            className="absolute inset-0 w-full h-full object-cover object-center filter brightness-95"
          />
          <div className="absolute inset-0 bg-slate-950/80 backdrop-blur-[3px]" />
          
          <div className="relative z-10 p-8 sm:p-12 lg:p-14 grid lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8 space-y-4">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-extrabold border border-emerald-500/30">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>Enterprise CSR & ESG Compliance Hub</span>
              </div>

              <h2 className="text-2xl sm:text-4xl font-black tracking-tight leading-tight text-white">
                Institutional Awareness Campaigns with Real-Time Audit Trails
              </h2>

              <p className="text-xs sm:text-sm text-slate-300 font-medium leading-relaxed max-w-2xl">
                We partner with corporate MNCs, government secretariats, and universities to execute tailored onfield drives. Choose from 50 accredited partner NGOs, upload HR sanction letters, and monitor volunteer quotas with 100% statutory transparency.
              </p>

              <div className="flex flex-wrap items-center gap-3.5 pt-2">
                <button
                  onClick={handleInstitutionalAction}
                  className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-slate-950 font-black text-xs shadow-lg transition-all press-effect flex items-center gap-2"
                >
                  <Building2 className="w-4 h-4" />
                  <span>{currentUser?.role === 'COMPANY_PARTNER' ? 'Open Institutional Workspace' : 'Company Sign In / Register to Request Drive'}</span>
                </button>

                <button
                  onClick={() => onNavigate('corporate')}
                  className="px-5 py-3.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs border border-white/20 transition-all press-effect"
                >
                  Browse 50 Accredited NGOs
                </button>
              </div>
            </div>

            {/* Quick ESG Checklist Box with High-Contrast Dark Card & Crisp Legible Typography */}
            <div className="lg:col-span-4 p-6 sm:p-7 rounded-2xl bg-slate-950/90 border border-slate-700/80 shadow-2xl backdrop-blur-xl space-y-4">
              <h4 className="text-sm font-black text-white uppercase tracking-wider flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-emerald-400" />
                <span>CSR Compliance Guarantee:</span>
              </h4>
              <ul className="space-y-3 text-xs font-semibold text-slate-100">
                <li className="flex items-start gap-2.5">
                  <div className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0 mt-0.5 border border-emerald-500/40">
                    <Check className="w-3.5 h-3.5" />
                  </div>
                  <span className="text-slate-100 leading-snug">Section 135 MCA Compliant Reporting</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <div className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0 mt-0.5 border border-emerald-500/40">
                    <Check className="w-3.5 h-3.5" />
                  </div>
                  <span className="text-slate-100 leading-snug">80G Tax Exemption & Darpan Tracking</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <div className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0 mt-0.5 border border-emerald-500/40">
                    <Check className="w-3.5 h-3.5" />
                  </div>
                  <span className="text-slate-100 leading-snug">Exportable CSV/PDF Impact Dossiers</span>
                </li>
              </ul>
            </div>
          </div>

        </div>
      </section>

      {/* 6. Volunteer Community Action & Energy Section (with Photo) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="glass-panel rounded-3xl border border-slate-200 shadow-sm overflow-hidden grid lg:grid-cols-12 text-left">
          
          <div className="lg:col-span-6 p-8 sm:p-10 flex flex-col justify-between space-y-6">
            <div className="space-y-3">
              <span className="text-xs font-extrabold text-emerald-600 uppercase tracking-widest bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
                Grassroots Action & Youth Energy
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                Empowering India's Next Generation of Civic Leaders
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 font-medium leading-relaxed">
                Join thousands of university students and corporate professionals participating in lake restorations, digital literacy workshops, rural health camps, and girl child empowerment drives across the country.
              </p>
            </div>

            <div className="space-y-3">
              <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-100 flex items-center gap-3">
                <Award className="w-8 h-8 text-amber-500 shrink-0" />
                <div>
                  <h4 className="text-xs font-extrabold text-slate-900">Accredited QR Certificate Studio</h4>
                  <p className="text-[11px] text-slate-500 font-medium">Earn recognized verifiable certificates for college credit & ESG resumes.</p>
                </div>
              </div>

              <button
                onClick={() => onNavigate('volunteer-login')}
                className="btn-glow-primary px-6 py-3.5 rounded-xl font-bold text-xs uppercase tracking-wider flex items-center gap-2 press-effect shadow-md"
              >
                <UserCheck className="w-4 h-4" />
                <span>Join as a Verified Volunteer (OTP Sign In)</span>
              </button>
            </div>
          </div>

          <div className="lg:col-span-6 relative min-h-[300px]">
            <img 
              src={volunteerCelebrationImg} 
              alt="Volunteers Celebrating Clean-up Drive in India" 
              className="w-full h-full object-cover object-center"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/40 via-transparent to-transparent pointer-events-none" />
            <div className="absolute bottom-4 left-4 right-4 p-3 rounded-xl bg-slate-900/85 backdrop-blur-md text-white text-[11px] font-bold border border-white/20">
              🌱 Over 96,400+ hours contributed by youth volunteers in 2026.
            </div>
          </div>

        </div>
      </section>

      {/* 7. Past Impact & Auditability Wall (Photo-Documented Evidence) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-left mb-8 flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <span className="text-xs font-extrabold text-sky-600 uppercase tracking-widest block mb-1">
              Proven Track Record & Field Evidence
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900">
              Past NGO Event History & Impact Audit
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Documented field photography and verified impact metrics from top certified Indian non-profits.
            </p>
          </div>

          <button
            onClick={() => onNavigate('history')}
            className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold flex items-center gap-1.5 shrink-0 self-start md:self-auto press-effect"
          >
            <span>View Full Archive ({pastEvents.length})</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {pastEvents.map(evt => (
            <EventCard 
              key={evt.id} 
              event={evt} 
              isPast={true}
              onSelect={(e) => setSelectedEvent(e)}
            />
          ))}
        </div>
      </section>

      {/* 8. Panoramic Landscape CTA Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl overflow-hidden shadow-float-lg text-white text-center border border-slate-800">
          <img 
            src={panoramicLandscapeBg} 
            alt="Indian Countryside Dawn Landscape" 
            className="absolute inset-0 w-full h-full object-cover object-center filter brightness-90 contrast-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/75 to-slate-900/60 backdrop-blur-[1px]" />
          
          <div className="relative z-10 py-16 px-6 sm:px-12 max-w-3xl mx-auto space-y-6">
            <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-black border border-emerald-400/30">
              <Sparkles className="w-3.5 h-3.5" /> Ready to Make a Tangible Difference?
            </span>

            <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight">
              Join India's Most Trusted CSR & Non-Profit Network
            </h2>

            <p className="text-xs sm:text-base text-slate-200 font-medium leading-relaxed">
              Whether you are an institution planning an awareness drive, an NGO seeking support, or a citizen ready to volunteer, your journey starts here.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
              <button
                onClick={handleInstitutionalAction}
                className="px-6 py-3.5 rounded-2xl bg-white hover:bg-slate-100 text-slate-900 font-black text-xs shadow-xl press-effect flex items-center gap-2"
              >
                <Building2 className="w-4 h-4 text-sky-600" />
                <span>Host Event as a Company</span>
              </button>

              <button
                onClick={() => onNavigate('volunteer-login')}
                className="px-6 py-3.5 rounded-2xl btn-glow-primary font-black text-xs shadow-xl press-effect flex items-center gap-2"
              >
                <UserCheck className="w-4 h-4" />
                <span>Sign Up as a Volunteer</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Event Details Modal */}
      {selectedEvent && (
        <EventModal 
          event={selectedEvent} 
          onClose={() => setSelectedEvent(null)} 
        />
      )}
    </div>
  );
};
