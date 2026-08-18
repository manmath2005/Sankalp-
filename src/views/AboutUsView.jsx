import React from 'react';
import founderImg from '../assets/images/founder_manmath_sangave.jpg';
import panoramicLandscapeBg from '../assets/images/panoramic_dawn_landscape.jpg';
import { 
  ShieldCheck, 
  HeartHandshake, 
  Award, 
  Building2, 
  Globe2, 
  Users, 
  Target, 
  Sparkles, 
  CheckCircle2, 
  ArrowRight, 
  Zap, 
  TrendingUp, 
  FileCheck2, 
  Compass, 
  Mail, 
  Linkedin, 
  MapPin, 
  Quote
} from 'lucide-react';

export const AboutUsView = ({ onNavigate }) => {
  const pillars = [
    {
      icon: <Award className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />,
      title: "1-Click Digital Impact Certificates",
      desc: "Tamper-proof verifiable credentials with dynamic QR code authentication and instant 1-click LinkedIn Certification profile integration."
    },
    {
      icon: <Sparkles className="w-6 h-6 text-sky-600 dark:text-sky-400" />,
      title: "AI-Powered Corporate-NGO Matchmaker",
      desc: "Intelligent matching algorithm ranking 50+ Darpan & 80G verified NGOs by cause alignment, geographic district, and team capacity."
    },
    {
      icon: <Zap className="w-6 h-6 text-amber-600 dark:text-amber-400" />,
      title: "Skill-Based & Micro-Volunteering Hub",
      desc: "High-impact remote and quick tasks (<5 hours) empowering professionals to contribute specialized skills in legal, design, coding, and finance."
    },
    {
      icon: <HeartHandshake className="w-6 h-6 text-rose-600 dark:text-rose-400" />,
      title: "SOS Rapid Crisis & Disaster Response",
      desc: "Emergency relief dispatch network mobilizing localized volunteers and emergency resources within a 50km radius during floods and crisis."
    },
    {
      icon: <FileCheck2 className="w-6 h-6 text-teal-600 dark:text-teal-400" />,
      title: "MCA & ESG Automated Impact Reports",
      desc: "Instant download of Ministry of Corporate Affairs Section 135 compliant CSR audit reports and SDG impact distribution ledgers."
    },
    {
      icon: <ShieldCheck className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />,
      title: "Complete Institutional Transparency",
      desc: "Centralized DBMS verifying Darpan IDs, 80G tax exemptions, and authentic employee volunteering hours across all Indian states."
    }
  ];

  const milestones = [
    { metric: "50+", label: "Verified NGO Partners", sub: "Registered across 15+ Indian States" },
    { metric: "12,400+", label: "Volunteer Hours Logged", sub: "Digitally certified & tamper-proof" },
    { metric: "₹4.8 Cr+", label: "CSR Capital Mobilized", sub: "Compliant with MCA Section 135" },
    { metric: "100%", label: "Authenticity Verified", sub: "With instant QR audit trail" }
  ];

  return (
    <div className="space-y-16 pb-20 page-enter text-left">
      
      {/* 1. Hero Section (Envato Non-Profit Warm Aesthetic) */}
      <section className="relative overflow-hidden pt-12 pb-20 lg:pt-16 lg:pb-28 bg-gradient-to-b from-slate-900 via-slate-900 to-sky-950 text-white">
        <div className="absolute inset-0 -z-10 opacity-20">
          <img 
            src={panoramicLandscapeBg} 
            alt="Nonprofit Mission Background" 
            className="w-full h-full object-cover"
          />
        </div>
        <div className="absolute top-1/4 left-1/3 w-96 h-96 bg-emerald-500/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-10 right-1/4 w-96 h-96 bg-sky-500/20 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-500/20 border border-emerald-400/40 text-emerald-300 text-xs font-black tracking-wide uppercase shadow-sm">
            <Compass className="w-4 h-4 text-emerald-400" />
            About BridgeImpact Platform
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white leading-tight max-w-4xl">
            Bridging Purpose, Corporate Capital & Authentic Grassroots Change.
          </h1>

          <p className="text-base sm:text-lg text-slate-200 font-medium max-w-3xl leading-relaxed">
            BridgeImpact is India's next-generation unified CSR ecosystem connecting companies, verified non-profits, and dedicated volunteers under a single transparent, technology-driven platform.
          </p>

          {/* Quick Metrics Bar */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-8">
            {milestones.map((item, idx) => (
              <div key={idx} className="p-5 rounded-2xl bg-white/10 backdrop-blur-md border border-white/15">
                <p className="text-2xl sm:text-3xl font-black text-emerald-400 font-mono">{item.metric}</p>
                <p className="text-xs font-bold text-white mt-1">{item.label}</p>
                <p className="text-[10px] text-slate-300 mt-0.5">{item.sub}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 2. Founder Spotlight Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="glass-panel p-8 sm:p-12 rounded-3xl border border-slate-200/80 dark:border-slate-800 bg-white/95 dark:bg-slate-900/95 shadow-float-lg">
          <div className="grid lg:grid-cols-12 gap-10 items-center">
            
            {/* Founder Profile Image */}
            <div className="lg:col-span-5 flex justify-center">
              <div className="relative group">
                <div className="absolute -inset-2 bg-gradient-to-tr from-emerald-500 via-sky-500 to-indigo-600 rounded-3xl blur-md opacity-75 group-hover:opacity-100 transition duration-500"></div>
                <div className="relative w-72 sm:w-80 h-96 sm:h-[420px] rounded-2xl overflow-hidden border-2 border-white/80 dark:border-slate-800 shadow-2xl bg-slate-900">
                  <img 
                    src={founderImg} 
                    alt="Mr. Manmath N. Sangave - Founder, BridgeImpact" 
                    className="w-full h-full object-cover object-top hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4 text-white">
                    <p className="text-sm font-black">Mr. Manmath N. Sangave</p>
                    <p className="text-[11px] text-emerald-300 font-bold uppercase tracking-wider">Founder & Executive Director</p>
                    <p className="text-[10px] text-slate-300">BridgeImpact Social Awareness Network</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Founder Story & Vision */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-100 dark:bg-sky-950/60 text-sky-800 dark:text-sky-300 text-xs font-black uppercase tracking-wider border border-sky-200 dark:border-sky-800">
                <Quote className="w-3.5 h-3.5 text-sky-600 dark:text-sky-400" />
                Leadership & Vision
              </div>

              <div>
                <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight">
                  Meet the Founder: Mr. Manmath N. Sangave
                </h2>
                <p className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest mt-1">
                  Founder & Chief Architect, BridgeImpact
                </p>
              </div>

              <div className="space-y-4 text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed font-medium">
                <p>
                  Driven by a deep conviction to revolutionize social awareness, institutional collaboration, and grassroots philanthropy, <strong>Mr. Manmath N. Sangave</strong> conceived <strong>BridgeImpact</strong> to eliminate friction between corporate CSR resources and genuine community needs.
                </p>
                <p>
                  Under his visionary guidance, BridgeImpact has engineered cutting-edge digital infrastructure — incorporating cryptographic digital certificates, AI-assisted CSR partner matchmaking, and rapid SOS disaster mobilization — ensuring every volunteer hour is valued and every rupee of CSR capital creates measurable social change.
                </p>
              </div>

              {/* Founder Quote Card */}
              <div className="p-4 sm:p-5 rounded-2xl bg-emerald-50/80 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800/60 text-slate-800 dark:text-emerald-100">
                <p className="text-xs sm:text-sm italic leading-relaxed font-semibold">
                  “Real social impact shouldn't be trapped in paperwork. By leveraging transparent technology, verified credentials, and real-time community mobilization, BridgeImpact turns intent into quantifiable action.”
                </p>
                <p className="text-[11px] font-black text-emerald-700 dark:text-emerald-300 mt-2">
                  — Mr. Manmath N. Sangave
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-3 pt-2">
                <button
                  onClick={() => onNavigate('events')}
                  className="px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 dark:bg-sky-600 dark:hover:bg-sky-500 text-white font-bold text-xs shadow-md transition-all flex items-center gap-2 press-effect"
                >
                  <span>Explore Initiatives</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
                <button
                  onClick={() => onNavigate('corporate')}
                  className="px-5 py-2.5 rounded-xl bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 font-bold text-xs border border-slate-300 dark:border-slate-700 shadow-sm transition-all flex items-center gap-2 press-effect"
                >
                  <Building2 className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
                  <span>Partner With Us</span>
                </button>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 3. Core Operating Pillars */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-xs font-extrabold text-emerald-600 dark:text-emerald-400 uppercase tracking-widest bg-emerald-50 dark:bg-emerald-950/60 px-3.5 py-1 rounded-full border border-emerald-200 dark:border-emerald-800">
            Platform Capabilities
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">
            6 Core Pillars Powering BridgeImpact
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            A comprehensive suite of institutional tools for modern non-profit governance.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {pillars.map((p, idx) => (
            <div 
              key={idx}
              className="glass-panel p-6 rounded-3xl border border-slate-200/80 dark:border-slate-800 bg-white/95 dark:bg-slate-900/95 shadow-sm hover:shadow-lg transition-all space-y-3"
            >
              <div className="p-3 rounded-2xl bg-slate-100 dark:bg-slate-800 w-fit">
                {p.icon}
              </div>
              <h3 className="text-base font-black text-slate-900 dark:text-white">{p.title}</h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed font-medium">{p.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 4. Ready to Collaborate CTA */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-r from-emerald-600 via-teal-600 to-sky-700 text-white shadow-2xl flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 max-w-xl">
            <h3 className="text-2xl sm:text-3xl font-black">Ready to Amplify Your Social Impact?</h3>
            <p className="text-xs sm:text-sm text-emerald-100 font-medium leading-relaxed">
              Join 50+ verified non-profits, leading corporate CSR teams, and thousands of citizen volunteers on BridgeImpact today.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={() => onNavigate('volunteer-login')}
              className="px-6 py-3 rounded-xl bg-white text-emerald-800 hover:bg-emerald-50 font-black text-xs uppercase tracking-wider shadow-lg press-effect"
            >
              Volunteer Now
            </button>
            <button
              onClick={() => onNavigate('company-login')}
              className="px-6 py-3 rounded-xl bg-slate-900 text-white hover:bg-slate-800 font-black text-xs uppercase tracking-wider shadow-lg press-effect"
            >
              Corporate Portal
            </button>
          </div>
        </div>
      </section>

    </div>
  );
};
