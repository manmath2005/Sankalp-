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

import { HorizonGlowDivider } from '../components/HorizonPrimitives';

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
        <div className="bg-slate-900/85 backdrop-blur-2xl p-6 sm:p-8 rounded-3xl border border-slate-800/90 shadow-[0_20px_50px_rgba(0,0,0,0.6)] relative overflow-hidden animate-float-up">
          {/* Luminous Horizon Top Rim */}
          <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-amber-500/50 via-emerald-500/50 to-blue-500/50" />
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center divide-y md:divide-y-0 md:divide-x divide-slate-800/80">
            <div className="p-2 space-y-1">
              <span className="text-3xl sm:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-amber-500 font-display">
                50+
              </span>
              <p className="text-xs font-extrabold text-white uppercase tracking-wider">Verified NGOs</p>
              <p className="text-[11px] text-slate-400 font-medium">NITI Aayog Darpan & 80G Compliant</p>
            </div>

            <div className="p-2 space-y-1 pt-4 md:pt-2">
              <span className="text-3xl sm:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-400 font-display">
                10k+
              </span>
              <p className="text-xs font-extrabold text-white uppercase tracking-wider">Citizen Volunteers</p>
              <p className="text-[11px] text-slate-400 font-medium">Active Across 38+ Districts</p>
            </div>

            <div className="p-2 space-y-1 pt-4 md:pt-2">
              <span className="text-3xl sm:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-blue-500 font-display">
                250+
              </span>
              <p className="text-xs font-extrabold text-white uppercase tracking-wider">Completed CSR Drives</p>
              <p className="text-[11px] text-slate-400 font-medium">Govt Offices, Corporates & Colleges</p>
            </div>

            <div className="p-2 space-y-1 pt-4 md:pt-2">
              <span className="text-3xl sm:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400 font-display">
                50k+
              </span>
              <p className="text-xs font-extrabold text-white uppercase tracking-wider">Service Hours Logged</p>
              <p className="text-[11px] text-slate-400 font-medium">Verifiable Digital QR Credentials</p>
            </div>
          </div>
        </div>
      </section>

      <HorizonGlowDivider />

      {/* 3. How It Works (3-Column Interactive Card Grid) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-10">
          <span className="text-xs font-extrabold text-amber-400 uppercase tracking-widest bg-amber-500/10 px-3.5 py-1 rounded-full border border-amber-500/30">
            A Unified Tri-Party Ecosystem
          </span>
          <h2 className="text-2xl sm:text-4xl font-black text-white tracking-tight font-display">
            How Sankalp Powers Seamless Social Action
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 font-medium leading-relaxed">
            Connecting companies with mandated CSR budgets, verified non-profit executors, and impassioned citizen volunteers under one authenticated roof.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 text-left">
          
          {/* Card 1: For Corporations */}
          <div className="bg-slate-900/80 backdrop-blur-xl p-7 rounded-3xl border border-slate-800/80 shadow-[0_10px_30px_rgba(0,0,0,0.5)] hover:border-blue-500/40 hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between space-y-5">
            <div className="space-y-4">
              <div className="w-14 h-14 rounded-2xl bg-blue-600 text-white flex items-center justify-center shadow-lg shadow-blue-600/30">
                <Briefcase className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-extrabold text-white font-display">For Corporations & Govts</h3>
              <p className="text-xs text-slate-300 leading-relaxed font-medium">
                Meet Section 135 CSR mandates, plan customized employee onfield engagement, inspect 50+ NGO track records, and download automated ESG audit reports.
              </p>

              <ul className="space-y-2 text-xs text-slate-300 pt-2 border-t border-slate-800/80">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-blue-400 shrink-0" />
                  <span>Curated 80G & Darpan Verified Partner List</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-blue-400 shrink-0" />
                  <span>Instant Sanction Letter & Quota Approvals</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-blue-400 shrink-0" />
                  <span>Real-Time Employee Hours Attendance Ledger</span>
                </li>
              </ul>
            </div>

            <button
              onClick={() => onNavigate('company-login')}
              className="w-full py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold transition-all shadow-md press-effect flex items-center justify-center gap-2"
            >
              <span>Corporate Portal Access</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Card 2: For NGOs */}
          <div className="bg-slate-900/80 backdrop-blur-xl p-7 rounded-3xl border border-slate-800/80 shadow-[0_10px_30px_rgba(0,0,0,0.5)] hover:border-amber-500/40 hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between space-y-5">
            <div className="space-y-4">
              <div className="w-14 h-14 rounded-2xl bg-amber-500 text-slate-950 flex items-center justify-center shadow-lg shadow-amber-500/30">
                <HeartHandshake className="w-7 h-7 text-slate-950" />
              </div>
              <h3 className="text-xl font-extrabold text-white font-display">For Non-Profits & NGOs</h3>
              <p className="text-xs text-slate-300 leading-relaxed font-medium">
                Publish upcoming public health, education, and ecological drives, mobilize dedicated volunteers, and receive direct funding requests from institutional partners.
              </p>

              <ul className="space-y-2 text-xs text-slate-300 pt-2 border-t border-slate-800/80">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
                  <span>Institutional Awareness Campaign Hosting</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
                  <span>Automated QR Certificate Generation</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
                  <span>Direct Corporate Proposal Inquiries</span>
                </li>
              </ul>
            </div>

            <button
              onClick={() => onNavigate('ngo-login')}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 text-xs font-bold transition-all shadow-[0_0_15px_rgba(245,158,11,0.25)] press-effect flex items-center justify-center gap-2"
            >
              <span>NGO Registration & Login</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Card 3: For Volunteers */}
          <div className="bg-slate-900/80 backdrop-blur-xl p-7 rounded-3xl border border-slate-800/80 shadow-[0_10px_30px_rgba(0,0,0,0.5)] hover:border-emerald-500/40 hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between space-y-5">
            <div className="space-y-4">
              <div className="w-14 h-14 rounded-2xl bg-emerald-600 text-white flex items-center justify-center shadow-lg shadow-emerald-600/30">
                <UserCheck className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-extrabold text-white font-display">For Citizen Volunteers</h3>
              <p className="text-xs text-slate-300 leading-relaxed font-medium">
                Join verified social action initiatives matching your passion and availability. Build a credible, authenticated community service portfolio with cryptographically verified QR certificates.
              </p>

              <ul className="space-y-2 text-xs text-slate-300 pt-2 border-t border-slate-800/80">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Passwordless OTP Login & Quick RSVPs</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Accredited Downloadable Certificates</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Editable Skills & Demographics Profile</span>
                </li>
              </ul>
            </div>

            <button
              onClick={() => onNavigate('volunteer-login')}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-slate-950 text-xs font-bold transition-all shadow-[0_0_15px_rgba(16,185,129,0.25)] press-effect flex items-center justify-center gap-2"
            >
              <span>Volunteer Sign In (OTP)</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

        </div>
      </section>

      <HorizonGlowDivider />

      {/* 4. Curated Cause Explorer & Upcoming Events */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-slate-900/80 backdrop-blur-2xl p-6 sm:p-8 rounded-3xl border border-slate-800/90 shadow-[0_20px_50px_rgba(0,0,0,0.6)] text-left animate-float-up space-y-6 relative overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-amber-500/50 via-emerald-500/50 to-blue-500/50" />
          
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <span className="text-xs font-extrabold text-amber-400 uppercase tracking-widest block mb-1">
                Curated Cause Explorer
              </span>
              <h2 className="text-xl sm:text-2xl font-black text-white font-display">
                Browse Live Awareness Drives by Sector
              </h2>
              <p className="text-xs text-slate-400 mt-1">
                Filter onfield drives and online webinars tailored for specific institutional environments.
              </p>
            </div>

            {/* Category Filter Pills */}
            <div className="flex flex-wrap gap-1.5 bg-slate-950/80 p-1.5 rounded-2xl border border-slate-800/80">
              {[
                { id: 'ALL', label: 'All Sectors', icon: Globe2 },
                { id: 'Government Office', label: 'Govt Offices', icon: Landmark },
                { id: 'Public Office', label: 'Public & MNCs', icon: Building2 },
                { id: 'College', label: 'Colleges', icon: GraduationCap },
                { id: 'School', label: 'Schools', icon: Users }
              ].map(cat => {
                const Icon = cat.icon;
                const active = categoryFilter === cat.id;
                return (
                  <button
                    key={cat.id}
                    onClick={() => setCategoryFilter(cat.id)}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all press-effect ${
                      active 
                        ? 'bg-gradient-to-r from-amber-500 to-emerald-600 text-slate-950 shadow-[0_0_15px_rgba(245,158,11,0.25)] font-black' 
                        : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
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
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-slate-800/80 hover:bg-slate-800 text-white text-xs font-extrabold border border-slate-700/80 transition-all shadow-md press-effect"
            >
              <span>Explore All {events.length} Upcoming Awareness Drives</span>
              <ArrowRight className="w-4 h-4 text-amber-400" />
            </button>
          </div>
        </div>
      </section>

      <HorizonGlowDivider />

      {/* 5. Corporate / ESG Metrics Section with Generated High-Tech Backdrop */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl overflow-hidden text-white shadow-[0_20px_50px_rgba(0,0,0,0.7)] text-left border border-slate-800/90">
          
          {/* Background Image with High-Tech Glow */}
          <img 
            src={corporateEsgBg} 
            alt="Corporate ESG Metrics Backdrop" 
            className="absolute inset-0 w-full h-full object-cover object-center filter brightness-60 contrast-125"
          />
          <div className="absolute inset-0 bg-slate-950/85 backdrop-blur-[2px]" />
          
          <div className="relative z-10 p-8 sm:p-12 lg:p-14 grid lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8 space-y-4">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-extrabold border border-emerald-500/40">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>Enterprise CSR & ESG Compliance Hub</span>
              </div>

              <h2 className="text-2xl sm:text-4xl font-black tracking-tight leading-tight text-white font-display">
                Institutional Awareness Campaigns with Real-Time Audit Trails
              </h2>

              <p className="text-xs sm:text-sm text-slate-300 font-medium leading-relaxed max-w-2xl">
                We partner with corporate MNCs, government secretariats, and universities to execute tailored onfield drives. Choose from 50 accredited partner NGOs, upload HR sanction letters, and monitor volunteer quotas with 100% statutory transparency.
              </p>

              <div className="flex flex-wrap items-center gap-3.5 pt-2">
                <button
                  onClick={handleInstitutionalAction}
                  className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-amber-500 to-emerald-600 hover:from-amber-400 hover:to-emerald-500 text-slate-950 font-black text-xs shadow-[0_0_25px_rgba(245,158,11,0.3)] transition-all press-effect flex items-center gap-2"
                >
                  <Building2 className="w-4 h-4 text-slate-950" />
                  <span>{currentUser?.role === 'COMPANY_PARTNER' ? 'Open Institutional Workspace' : 'Company Sign In / Register to Request Drive'}</span>
                </button>

                <button
                  onClick={() => onNavigate('corporate')}
                  className="px-5 py-3.5 rounded-xl bg-slate-900/80 hover:bg-slate-800 text-white font-bold text-xs border border-slate-700/80 transition-all press-effect"
                >
                  Browse 50 Accredited NGOs
                </button>
              </div>
            </div>

            {/* Quick ESG Checklist Box */}
            <div className="lg:col-span-4 p-6 sm:p-7 rounded-2xl bg-slate-900/90 border border-slate-800/90 shadow-2xl backdrop-blur-xl space-y-4">
              <h4 className="text-sm font-black text-white uppercase tracking-wider flex items-center gap-2 font-display">
                <TrendingUp className="w-4 h-4 text-emerald-400" />
                <span>CSR Compliance Guarantee:</span>
              </h4>
              <ul className="space-y-3 text-xs font-semibold text-slate-200">
                <li className="flex items-start gap-2.5">
                  <div className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0 mt-0.5 border border-emerald-500/40">
                    <Check className="w-3.5 h-3.5" />
                  </div>
                  <span className="text-slate-200 leading-snug">Section 135 MCA Compliant Reporting</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <div className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0 mt-0.5 border border-emerald-500/40">
                    <Check className="w-3.5 h-3.5" />
                  </div>
                  <span className="text-slate-200 leading-snug">80G Tax Exemption & Darpan Tracking</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <div className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0 mt-0.5 border border-emerald-500/40">
                    <Check className="w-3.5 h-3.5" />
                  </div>
                  <span className="text-slate-200 leading-snug">Exportable CSV/PDF Impact Dossiers</span>
                </li>
              </ul>
            </div>
          </div>

        </div>
      </section>

      <HorizonGlowDivider />

      {/* 6. Volunteer Community Action & Energy Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-slate-900/85 backdrop-blur-2xl rounded-3xl border border-slate-800/90 shadow-[0_20px_50px_rgba(0,0,0,0.6)] overflow-hidden grid lg:grid-cols-12 text-left">
          
          <div className="lg:col-span-6 p-8 sm:p-10 flex flex-col justify-between space-y-6">
            <div className="space-y-3">
              <span className="text-xs font-extrabold text-emerald-400 uppercase tracking-widest bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/30">
                Grassroots Action & Youth Energy
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight font-display">
                Empowering India's Next Generation of Civic Leaders
              </h2>
              <p className="text-xs sm:text-sm text-slate-300 font-medium leading-relaxed">
                Join thousands of university students and corporate professionals participating in lake restorations, digital literacy workshops, rural health camps, and girl child empowerment drives across the country.
              </p>
            </div>

            <div className="space-y-3">
              <div className="p-3.5 rounded-2xl bg-slate-800/60 border border-slate-700/60 flex items-center gap-3">
                <Award className="w-8 h-8 text-amber-400 shrink-0" />
                <div>
                  <h4 className="text-xs font-extrabold text-white">Accredited QR Certificate Studio</h4>
                  <p className="text-[11px] text-slate-400 font-medium">Earn recognized verifiable certificates for college credit & ESG resumes.</p>
                </div>
              </div>

              <button
                onClick={() => onNavigate('volunteer-login')}
                className="px-6 py-3.5 rounded-xl font-bold text-xs uppercase tracking-wider flex items-center gap-2 press-effect bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-slate-950 shadow-[0_0_20px_rgba(16,185,129,0.3)] transition-all"
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
              className="w-full h-full object-cover object-center filter brightness-85"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent pointer-events-none" />
            <div className="absolute bottom-4 left-4 right-4 p-3 rounded-xl bg-slate-950/85 backdrop-blur-md text-white text-[11px] font-bold border border-slate-700/80">
              🌱 Over 96,400+ hours contributed by youth volunteers in 2026.
            </div>
          </div>

        </div>
      </section>

      {/* 7. Past Impact & Auditability Wall */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-left mb-8 flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <span className="text-xs font-extrabold text-amber-400 uppercase tracking-widest block mb-1">
              Proven Track Record & Field Evidence
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-white font-display">
              Past NGO Event History & Impact Audit
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 mt-1">
              Documented field photography and verified impact metrics from top certified Indian non-profits.
            </p>
          </div>

          <button
            onClick={() => onNavigate('history')}
            className="px-4 py-2 rounded-xl bg-slate-800/80 hover:bg-slate-800 text-slate-200 border border-slate-700/80 text-xs font-bold flex items-center gap-1.5 shrink-0 self-start md:self-auto press-effect"
          >
            <span>View Full Archive ({pastEvents.length})</span>
            <ArrowRight className="w-3.5 h-3.5 text-amber-400" />
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

      <HorizonGlowDivider />

      {/* 8. Panoramic Landscape CTA Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl overflow-hidden shadow-[0_25px_60px_rgba(0,0,0,0.8)] text-white text-center border border-slate-800/90">
          <img 
            src={panoramicLandscapeBg} 
            alt="Indian Countryside Dawn Landscape" 
            className="absolute inset-0 w-full h-full object-cover object-center filter brightness-65 contrast-120"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0B1329] via-[#0B1329]/80 to-slate-950/60 backdrop-blur-[1px]" />
          
          <div className="relative z-10 py-16 px-6 sm:px-12 max-w-3xl mx-auto space-y-6">
            <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-amber-500/20 text-amber-300 text-xs font-black border border-amber-400/40">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" /> Ready to Make a Tangible Difference?
            </span>

            <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight font-display">
              Join India's Most Trusted CSR & Non-Profit Network
            </h2>

            <p className="text-xs sm:text-base text-slate-300 font-medium leading-relaxed">
              Whether you are an institution planning an awareness drive, an NGO seeking support, or a citizen ready to volunteer, your journey starts here.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
              <button
                onClick={handleInstitutionalAction}
                className="px-6 py-3.5 rounded-2xl bg-slate-900/90 hover:bg-slate-800 text-white font-black text-xs border border-slate-700 shadow-xl press-effect flex items-center gap-2"
              >
                <Building2 className="w-4 h-4 text-amber-400" />
                <span>Host Event as a Company</span>
              </button>

              <button
                onClick={() => onNavigate('volunteer-login')}
                className="px-6 py-3.5 rounded-2xl bg-gradient-to-r from-amber-500 to-emerald-600 hover:from-amber-400 hover:to-emerald-500 text-slate-950 font-black text-xs shadow-[0_0_25px_rgba(245,158,11,0.3)] press-effect flex items-center gap-2"
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

