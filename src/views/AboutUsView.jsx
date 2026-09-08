import React from 'react';
import founderImg from '../assets/images/founder_manmath_sangave.jpg';
import panoramicLandscapeBg from '../assets/images/panoramic_dawn_landscape.jpg';
import { HorizonGlowDivider, HorizonBadge } from '../components/HorizonPrimitives';
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
      icon: <Award className="w-6 h-6 text-emerald-400" />,
      title: "1-Click Digital Impact Certificates",
      desc: "Tamper-proof verifiable credentials with dynamic QR code authentication and instant 1-click LinkedIn Certification profile integration."
    },
    {
      icon: <Sparkles className="w-6 h-6 text-sky-400" />,
      title: "AI-Powered Corporate-NGO Matchmaker",
      desc: "Intelligent matching algorithm ranking 50+ Darpan & 80G verified NGOs by cause alignment, geographic district, and team capacity."
    },
    {
      icon: <Zap className="w-6 h-6 text-amber-400" />,
      title: "Skill-Based & Micro-Volunteering Hub",
      desc: "High-impact remote and quick tasks (<5 hours) empowering professionals to contribute specialized skills in legal, design, coding, and finance."
    },
    {
      icon: <HeartHandshake className="w-6 h-6 text-rose-400" />,
      title: "SOS Rapid Crisis & Disaster Response",
      desc: "Emergency relief dispatch network mobilizing localized volunteers and emergency resources within a 50km radius during floods and crisis."
    },
    {
      icon: <FileCheck2 className="w-6 h-6 text-teal-400" />,
      title: "MCA & ESG Automated Impact Reports",
      desc: "Instant download of Ministry of Corporate Affairs Section 135 compliant CSR audit reports and SDG impact distribution ledgers."
    },
    {
      icon: <ShieldCheck className="w-6 h-6 text-indigo-400" />,
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
      
      {/* 1. Hero Section (Luminous Horizon Atmosphere) */}
      <section className="relative overflow-hidden pt-12 pb-20 lg:pt-16 lg:pb-28 bg-slate-950 text-white">
        <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-amber-500 via-emerald-400 to-sky-500 opacity-90" />
        <div className="absolute inset-0 -z-10 opacity-25">
          <img 
            src={panoramicLandscapeBg} 
            alt="Nonprofit Mission Background" 
            className="w-full h-full object-cover"
          />
        </div>
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-10 right-1/4 w-96 h-96 bg-emerald-500/15 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <HorizonBadge variant="emerald" icon={Compass}>
            About Sankalp Platform
          </HorizonBadge>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white leading-tight max-w-4xl">
            🤝 Sankalp: Connecting Help to Hope.
          </h1>

          <p className="text-base sm:text-lg text-slate-300 font-medium max-w-3xl leading-relaxed">
            Sankalp is a centralized, high-availability disaster relief coordination platform designed to bridge the gap between active crisis zones and those eager to help by connecting verified ground-level NGOs with corporate partners and volunteers.
          </p>

          {/* Quick Metrics Bar in Obsidian Glass */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-8">
            {milestones.map((item, idx) => (
              <div key={idx} className="p-5 rounded-2xl bg-slate-900/80 backdrop-blur-md border border-slate-800/90 shadow-lg">
                <p className="text-2xl sm:text-3xl font-black text-emerald-400 font-mono">{item.metric}</p>
                <p className="text-xs font-bold text-white mt-1">{item.label}</p>
                <p className="text-[10px] text-slate-400 mt-0.5">{item.sub}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 2. Founder Spotlight Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-3xl bg-slate-900/85 backdrop-blur-2xl border border-slate-800/90 p-8 sm:p-12 shadow-2xl">
          <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-amber-500/40 via-emerald-400/40 to-sky-500/40" />

          <div className="grid lg:grid-cols-12 gap-10 items-center">
            
            {/* Founder Profile Image */}
            <div className="lg:col-span-5 flex justify-center">
              <div className="relative group">
                <div className="absolute -inset-2 bg-gradient-to-tr from-amber-500 via-emerald-500 to-sky-500 rounded-3xl blur-md opacity-60 group-hover:opacity-100 transition duration-500"></div>
                <div className="relative w-72 sm:w-80 h-96 sm:h-[420px] rounded-2xl overflow-hidden border border-slate-700/80 shadow-2xl bg-slate-950">
                  <img 
                    src={founderImg} 
                    alt="Mr. Manmath N. Sangave - Founder, Sankalp" 
                    className="w-full h-full object-cover object-top hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/20 to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4 text-white">
                    <p className="text-base font-black">Mr. Manmath N. Sangave</p>
                    <p className="text-[11px] text-emerald-400 font-bold uppercase tracking-wider">Founder & Executive Director</p>
                    <p className="text-[10px] text-slate-300">Sankalp Social Awareness Network</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Founder Story & Vision */}
            <div className="lg:col-span-7 space-y-6">
              <HorizonBadge variant="sky" icon={Quote}>
                Leadership & Vision
              </HorizonBadge>

              <div>
                <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                  Meet the Founder: Mr. Manmath N. Sangave
                </h2>
                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mt-1">
                  Founder & Chief Architect, Sankalp
                </p>
              </div>

              <div className="space-y-4 text-xs sm:text-sm text-slate-300 leading-relaxed font-medium">
                <p>
                  Dedicated to leveraging software engineering for scalable humanitarian impact. <strong>Mr. Manmath N. Sangave</strong> conceptualized and engineered <strong>Sankalp</strong> out of the necessity to eliminate logistical bottlenecks and establish transparent, verifiable coordination during critical disaster response windows.
                </p>
                <p>
                  Under his visionary guidance, Sankalp has engineered high-availability digital infrastructure — incorporating cryptographic digital certificates, AI-assisted CSR partner matchmaking, and rapid SOS disaster mobilization — ensuring every volunteer hour is valued and every rupee of CSR capital creates measurable social change.
                </p>
              </div>

              {/* Founder Quote Card */}
              <div className="p-4 sm:p-5 rounded-2xl bg-slate-950/70 border border-emerald-500/30 text-emerald-100 shadow-inner">
                <p className="text-xs sm:text-sm italic leading-relaxed font-semibold">
                  “Technology is only as powerful as the impact it creates on the ground.”
                </p>
                <p className="text-[11px] font-black text-emerald-400 mt-2">
                  — Mr. Manmath N. Sangave
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-3 pt-2">
                <button
                  onClick={() => onNavigate('events')}
                  className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-slate-950 font-black text-xs shadow-lg transition-all flex items-center gap-2 press-effect"
                >
                  <span>Explore Initiatives</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
                <button
                  onClick={() => onNavigate('corporate')}
                  className="px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs border border-slate-700 shadow-sm transition-all flex items-center gap-2 press-effect"
                >
                  <Building2 className="w-4 h-4 text-sky-400" />
                  <span>Host Corporate / Govt Drive</span>
                </button>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 3. Core Pillars Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <HorizonBadge variant="amber" icon={Sparkles}>
            Built For Trust
          </HorizonBadge>
          <h2 className="text-2xl sm:text-3xl font-black text-white">
            6 Core Pillars Powering Sankalp
          </h2>
          <p className="text-xs text-slate-400">
            Engineered with modern architecture to deliver verified social impact at enterprise scale.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {pillars.map((pillar, idx) => (
            <div 
              key={idx} 
              className="p-6 rounded-3xl bg-slate-900/80 backdrop-blur-xl border border-slate-800/90 space-y-3 hover:border-slate-700 transition-all group"
            >
              <div className="p-3 rounded-2xl bg-slate-950/80 border border-slate-800 w-fit group-hover:scale-110 transition-transform">
                {pillar.icon}
              </div>
              <h3 className="text-sm font-black text-white">
                {pillar.title}
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed font-medium">
                {pillar.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* 4. Bottom Horizon CTA Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 border border-slate-800/90 p-8 sm:p-12 text-white text-center space-y-4 shadow-2xl">
          <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-amber-500 via-emerald-400 to-sky-500 opacity-90" />
          <div className="absolute -top-24 right-1/4 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

          <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
            Ready to Connect Help to Hope?
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 max-w-xl mx-auto leading-relaxed font-medium">
            Join 50+ verified non-profits, leading corporate CSR teams, and thousands of citizen volunteers on Sankalp today.
          </p>
          <div className="pt-3 flex justify-center gap-3 flex-wrap">
            <button
              onClick={() => onNavigate('volunteer-login')}
              className="px-6 py-3 rounded-2xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-slate-950 font-black text-xs shadow-lg transition press-effect"
            >
              Join as Volunteer
            </button>
            <button
              onClick={() => onNavigate('corporate')}
              className="px-6 py-3 rounded-2xl bg-slate-800 hover:bg-slate-700 text-white font-black text-xs border border-slate-700 transition press-effect"
            >
              Partner as Institution
            </button>
          </div>
        </div>
      </section>

    </div>
  );
};
