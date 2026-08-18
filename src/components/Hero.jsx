import React, { useState } from 'react';
import heroBgImage from '../assets/images/hero_csr_impact.jpg';
import { 
  Building, 
  GraduationCap, 
  Landmark, 
  Users, 
  ArrowRight, 
  ShieldCheck, 
  Award, 
  CheckCircle2, 
  Globe2, 
  CalendarCheck2, 
  Sparkles, 
  Zap, 
  PlayCircle 
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export const Hero = ({ onExploreEvents, onHostEvent }) => {
  const { ngoInfo, events } = useApp();
  const [activeTabSector, setActiveTabSector] = useState('Govt');

  return (
    <section className="relative overflow-hidden pt-8 pb-16 lg:pt-14 lg:pb-24">
      {/* Dynamic Cinematic Hero Image Backdrop with Premium Atmospheric Dark Gradient */}
      <div className="absolute inset-0 -z-20 overflow-hidden">
        <img 
          src={heroBgImage} 
          alt="Indian Community CSR Event" 
          className="w-full h-full object-cover object-center scale-105 transform filter brightness-90 contrast-105"
        />
        {/* Soft Multi-Layer Light & Mesh Overlay for Maximum Legibility */}
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950/90 via-slate-900/75 to-slate-900/60 backdrop-blur-[2px]" />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-slate-950/70" />
      </div>

      {/* Decorative ambient background glow orbs */}
      <div className="absolute top-10 left-1/4 w-[500px] h-[300px] bg-sky-400/20 blur-[140px] rounded-full pointer-events-none -z-10 animate-pulse-subtle" />
      <div className="absolute top-1/3 right-1/4 w-[450px] h-[300px] bg-emerald-500/15 blur-[140px] rounded-full pointer-events-none -z-10 animate-pulse-subtle" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Headline & Interactive Call To Action */}
          <div className="lg:col-span-7 space-y-6 text-left animate-float-up text-white">
            
            {/* Animated Interactive Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-900/80 border border-sky-400/40 text-sky-300 text-xs font-bold tracking-wide shadow-lg backdrop-blur-md">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-sky-400"></span>
              </span>
              <span>India's Unified CSR Ecosystem • 80G & Darpan Verified</span>
            </div>

            {/* Main Punchy Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-[1.12]">
              Connecting Purpose with Action: <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 via-teal-300 to-emerald-400">
                Bridge Companies, NGOs & Volunteers
              </span>
            </h1>

            {/* Subtitle */}
            <p className="text-base sm:text-lg text-slate-200 font-normal leading-relaxed max-w-2xl drop-shadow-sm">
              Discover 50+ accredited non-profits, host structured awareness campaigns across government ministries, corporate campuses & colleges, and issue automated verifiable QR certificates.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-3.5 pt-2">
              <button
                onClick={onExploreEvents}
                className="btn-glow-primary px-6 py-3.5 rounded-2xl font-bold text-xs uppercase tracking-wider flex items-center gap-2 group press-effect shadow-xl"
              >
                <span>Browse & Participate in Events</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                onClick={onHostEvent}
                className="px-6 py-3.5 rounded-2xl bg-white hover:bg-slate-100 text-slate-900 font-bold text-xs uppercase tracking-wider border border-white/80 shadow-lg hover:shadow-xl transition-all flex items-center gap-2 press-effect"
              >
                <Building className="w-4 h-4 text-sky-600" />
                <span>Conduct Corporate Drive</span>
              </button>
            </div>

            {/* Interactive Sector Highlights */}
            <div className="pt-4 border-t border-white/15">
              <p className="text-xs font-extrabold uppercase tracking-wider text-slate-300 mb-3 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-sky-400" />
                Targeted Awareness Across Key Institutions:
              </p>
              <div className="flex flex-wrap gap-2">
                {[
                  { id: 'Govt', label: 'Government Offices', icon: Landmark, color: 'text-amber-300 bg-slate-900/80 border-amber-500/30' },
                  { id: 'Corporate', label: 'Public & Corporate MNCs', icon: Building, color: 'text-sky-300 bg-slate-900/80 border-sky-500/30' },
                  { id: 'Colleges', label: 'Colleges & Universities', icon: GraduationCap, color: 'text-indigo-300 bg-slate-900/80 border-indigo-500/30' },
                  { id: 'Schools', label: 'Schools & Communities', icon: Users, color: 'text-emerald-300 bg-slate-900/80 border-emerald-500/30' }
                ].map(sector => {
                  const Icon = sector.icon;
                  return (
                    <span 
                      key={sector.id}
                      className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border text-xs font-bold shadow-md transition-all hover-lift cursor-default backdrop-blur-md ${sector.color}`}
                    >
                      <Icon className="w-3.5 h-3.5 shrink-0" />
                      {sector.label}
                    </span>
                  );
                })}
              </div>
            </div>

          </div>

          {/* Right Column: Glassmorphic Interactive Dashboard Card */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              
              {/* Primary Glassmorphism 2.0 Card */}
              <div className="glass-panel p-6 sm:p-7 rounded-3xl border border-white/80 shadow-float-lg relative z-10 overflow-hidden space-y-5">
                
                {/* Header Strip inside Card */}
                <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-sky-500 to-indigo-600 flex items-center justify-center text-white font-bold shadow-md shadow-sky-500/20">
                      <ShieldCheck className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="font-extrabold text-slate-900 text-sm">{ngoInfo.name}</h3>
                      <span className="text-[11px] text-slate-400 font-mono">DARPAN ID: MH/2018/019482</span>
                    </div>
                  </div>
                  <span className="bg-emerald-50 text-emerald-800 text-[10px] font-extrabold px-3 py-1 rounded-full uppercase tracking-wider border border-emerald-200 flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                    Verified
                  </span>
                </div>

                {/* Feature Highlights inside Card */}
                <div className="space-y-2.5">
                  <div className="flex items-start gap-3 p-3 rounded-2xl bg-slate-50/90 border border-slate-100/90 hover:bg-white transition-colors">
                    <CheckCircle2 className="w-4 h-4 text-sky-600 mt-0.5 shrink-0" />
                    <div className="text-xs text-slate-700">
                      <strong className="text-slate-900">Onfield & Online Modes:</strong> Tailored drives for administrative complexes and live interactive webinars.
                    </div>
                  </div>
                  <div className="flex items-start gap-3 p-3 rounded-2xl bg-slate-50/90 border border-slate-100/90 hover:bg-white transition-colors">
                    <Award className="w-4 h-4 text-emerald-600 mt-0.5 shrink-0" />
                    <div className="text-xs text-slate-700">
                      <strong className="text-slate-900">QR-Verified Certificates:</strong> Cryptographically authentic volunteer credentials.
                    </div>
                  </div>
                  <div className="flex items-start gap-3 p-3 rounded-2xl bg-slate-50/90 border border-slate-100/90 hover:bg-white transition-colors">
                    <Globe2 className="w-4 h-4 text-indigo-600 mt-0.5 shrink-0" />
                    <div className="text-xs text-slate-700">
                      <strong className="text-slate-900">Corporate Auditability:</strong> Real-time task logs, HR permission letters, and ESG metrics.
                    </div>
                  </div>
                </div>

                {/* Live Stats summary strip */}
                <div className="grid grid-cols-3 gap-2.5 pt-3 border-t border-slate-100 text-center">
                  <div className="p-2.5 rounded-2xl bg-sky-50/70 border border-sky-100 hover-lift">
                    <p className="text-xl font-black text-sky-700">{ngoInfo.stats.eventsCompleted}</p>
                    <p className="text-[10px] font-extrabold text-slate-500 uppercase tracking-wider">Completed</p>
                  </div>
                  <div className="p-2.5 rounded-2xl bg-emerald-50/70 border border-emerald-100 hover-lift">
                    <p className="text-xl font-black text-emerald-700">{ngoInfo.stats.volunteersRegistered}</p>
                    <p className="text-[10px] font-extrabold text-slate-500 uppercase tracking-wider">Volunteers</p>
                  </div>
                  <div className="p-2.5 rounded-2xl bg-indigo-50/70 border border-indigo-100 hover-lift">
                    <p className="text-xl font-black text-indigo-700">{ngoInfo.stats.certificatesIssued}</p>
                    <p className="text-[10px] font-extrabold text-slate-500 uppercase tracking-wider">Certificates</p>
                  </div>
                </div>

              </div>

              {/* Floating Live Badge */}
              <div className="absolute -bottom-6 -left-6 z-20 glass-panel p-3.5 rounded-2xl shadow-float border border-white/80 hidden sm:flex items-center gap-3 animate-bounce-soft">
                <div className="w-10 h-10 rounded-xl bg-amber-500 text-white flex items-center justify-center shadow-md shadow-amber-500/20">
                  <CalendarCheck2 className="w-5 h-5" />
                </div>
                <div className="text-left">
                  <span className="text-[10px] font-extrabold text-amber-600 uppercase tracking-wider block">
                    Next Awareness Drive
                  </span>
                  <p className="text-xs font-bold text-slate-900">Municipal Collectorate Complex</p>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
