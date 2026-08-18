import React from 'react';
import { 
  ArrowRight, 
  ShieldCheck, 
  Sparkles, 
  CheckCircle2, 
  TreePine, 
  Droplets, 
  BookOpen, 
  Award, 
  Globe2, 
  Users 
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { GLOBAL_IMPACT_METRICS } from '../data/mockData';

export const EarthyHero = ({ onOurImpact, onGetInvolved, onOpenDonate }) => {
  const { ngoInfo } = useApp();

  return (
    <section className="relative overflow-hidden pt-8 pb-16 lg:pt-14 lg:pb-24 text-left">
      {/* Organic Subtle Glow Accents */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-gradient-to-tr from-sage/30 via-sand-200/40 to-forest-100/30 blur-3xl rounded-full pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Bold Headline, Subheading & Action Buttons */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Earth Tag Pill Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-forest-50 border border-forest-600/30 text-forest-800 text-xs font-bold tracking-wide shadow-sm">
              <span className="w-2 h-2 rounded-full bg-forest-600 animate-ping"></span>
              Grassroots Environmental & Civic Social Network
            </div>

            {/* Bold Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-heading font-extrabold text-forest-900 tracking-tight leading-[1.12]">
              Empowering Communities, <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-forest-700 via-forest-600 to-forest-500">
                Restoring Earth.
              </span>
            </h1>

            {/* Sub-headline */}
            <p className="text-base sm:text-lg text-charcoal-500 font-normal leading-relaxed max-w-2xl font-sans">
              We mobilize citizen volunteers, corporate institutions, and public governance bodies to lead verifiable campaigns in reforestation, clean water purification, and community digital literacy.
            </p>

            {/* Two Action Buttons: "Our Impact" and "Get Involved" */}
            <div className="flex flex-wrap items-center gap-3.5 pt-2">
              <button
                type="button"
                onClick={onOurImpact}
                className="px-6 py-3.5 rounded-xl bg-forest-700 hover:bg-forest-800 text-white font-heading font-extrabold text-xs uppercase tracking-wider shadow-float hover:-translate-y-0.5 transition-all flex items-center gap-2 press-effect group"
              >
                Our Impact
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                type="button"
                onClick={onGetInvolved}
                className="px-6 py-3.5 rounded-xl bg-white hover:bg-sand-50 text-forest-900 font-heading font-bold text-xs uppercase tracking-wider border border-sand-300 shadow-soft hover:shadow transition-all flex items-center gap-2 press-effect"
              >
                <Users className="w-4 h-4 text-forest-600" />
                Get Involved
              </button>
            </div>

            {/* Quick Sector Tags */}
            <div className="pt-4 border-t border-sand-300/80">
              <p className="text-[11px] font-extrabold uppercase tracking-widest text-charcoal-400 mb-2.5">
                Active Conduction Verticals:
              </p>
              <div className="flex flex-wrap gap-2">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-white border border-sage text-xs font-semibold text-charcoal-700 shadow-sm">
                  <TreePine className="w-3.5 h-3.5 text-forest-600" />
                  Reforestation & Canopies
                </span>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-white border border-sage text-xs font-semibold text-charcoal-700 shadow-sm">
                  <Droplets className="w-3.5 h-3.5 text-sky-600" />
                  Clean Water Filtration
                </span>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-white border border-sage text-xs font-semibold text-charcoal-700 shadow-sm">
                  <BookOpen className="w-3.5 h-3.5 text-amber-600" />
                  Civic & STEM Literacy
                </span>
              </div>
            </div>

          </div>

          {/* Right Column: Dynamic Photo Collage & Floating Glassmorphism Metric Card */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              
              {/* Asymmetric Dynamic Photo Collage */}
              <div className="grid grid-cols-12 gap-3 relative z-10">
                {/* Main Large Image */}
                <div className="col-span-8 overflow-hidden rounded-3xl shadow-float border border-sage/60 group">
                  <img 
                    src="https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&w=800&q=80" 
                    alt="Volunteers planting trees" 
                    className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>

                {/* Secondary Top Right Image */}
                <div className="col-span-4 space-y-3">
                  <div className="overflow-hidden rounded-2xl shadow-soft border border-sage/60 group">
                    <img 
                      src="https://images.unsplash.com/photo-1541252260730-0412e8e2108e?auto=format&fit=crop&w=400&q=80" 
                      alt="Clean water installation" 
                      className="w-full h-30 object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="overflow-hidden rounded-2xl shadow-soft border border-sage/60 group">
                    <img 
                      src="https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=400&q=80" 
                      alt="Community education" 
                      className="w-full h-30 object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                </div>
              </div>

              {/* Floating Glassmorphism Metric Card ("150k+ Trees Planted") */}
              <div className="absolute -bottom-6 -left-6 z-20 glass-forest p-4 sm:p-5 rounded-3xl shadow-float-lg border border-sage/40 text-white max-w-xs animate-float-up">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-sage/20 border border-sage/40 flex items-center justify-center text-sand-100 font-bold shrink-0">
                    <TreePine className="w-6 h-6 text-sand-200" />
                  </div>
                  <div>
                    <span className="text-[10px] font-extrabold text-sage uppercase tracking-widest block">
                      Live Field Metric
                    </span>
                    <h4 className="text-xl font-heading font-black text-white">
                      {GLOBAL_IMPACT_METRICS.treesPlanted}
                    </h4>
                    <p className="text-[11px] text-sage/80 font-medium">
                      Trees planted across 38 micro-districts
                    </p>
                  </div>
                </div>
              </div>

              {/* Floating Verified Trust Badge */}
              <div className="absolute -top-4 -right-4 z-20 glass-panel px-3 py-2 rounded-2xl shadow-soft border border-sage/80 flex items-center gap-2 hidden sm:flex">
                <ShieldCheck className="w-4 h-4 text-forest-600" />
                <span className="text-xs font-bold text-forest-900">80G & 12A Accredited</span>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
