import React from 'react';
import { 
  Users, 
  Building2, 
  Heart, 
  ArrowRight, 
  CheckCircle2, 
  Sparkles, 
  ShieldCheck, 
  FileText 
} from 'lucide-react';

export const GetInvolvedActionHub = ({ onVolunteerClick, onPartnerClick, onDonateClick }) => {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 text-left">
      <div className="text-center max-w-2xl mx-auto mb-10 space-y-2">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-forest-100 text-forest-800 text-xs font-bold uppercase tracking-wider">
          <Sparkles className="w-3.5 h-3.5 text-forest-600" />
          Choose Your Pathway to Action
        </div>
        <h2 className="text-3xl sm:text-4xl font-heading font-extrabold text-forest-900">
          Get Involved & Drive Real Change
        </h2>
        <p className="text-xs sm:text-sm text-charcoal-400">
          Whether you want to offer your time on the field, host a campaign at your workplace, or fund micro-canopies—every action counts.
        </p>
      </div>

      {/* 3-Tier Layout Block: Volunteer, Partner, Donate */}
      <div className="grid md:grid-cols-3 gap-6 items-stretch">
        
        {/* Tier 1: Volunteer */}
        <div className="glass-panel p-8 rounded-3xl border border-sage/70 shadow-soft hover-lift flex flex-col justify-between space-y-6">
          <div className="space-y-4">
            <div className="w-14 h-14 rounded-2xl bg-forest-100 text-forest-700 flex items-center justify-center shadow-sm">
              <Users className="w-7 h-7" />
            </div>

            <div>
              <span className="text-[10px] font-extrabold text-forest-700 uppercase tracking-widest block">
                Pathway 01
              </span>
              <h3 className="text-xl font-heading font-extrabold text-forest-900 mt-0.5">
                Join as Field Volunteer
              </h3>
              <p className="text-xs text-charcoal-500 mt-2 leading-relaxed">
                Participate in hands-on reforestation, clean water distribution, and school mentoring drives. Receive official QR-verified certificates.
              </p>
            </div>

            <div className="space-y-2 pt-2 border-t border-sand-200 text-xs text-charcoal-600">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-forest-600 shrink-0" />
                <span>Choose onfield or virtual campaigns</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-forest-600 shrink-0" />
                <span>Demographic skill-matching for events</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-forest-600 shrink-0" />
                <span>Instant SVG certificate verification</span>
              </div>
            </div>
          </div>

          <button
            type="button"
            onClick={onVolunteerClick}
            className="w-full py-3 rounded-xl bg-forest-700 hover:bg-forest-800 text-white font-heading font-bold text-xs uppercase tracking-wider shadow-sm transition-all press-effect flex items-center justify-center gap-2"
          >
            Register as Volunteer
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* Tier 2: Partner (Featured / Highlighted) */}
        <div className="rounded-3xl bg-gradient-to-br from-forest-800 via-forest-700 to-forest-800 text-white p-8 border border-sage/40 shadow-float-lg hover-lift flex flex-col justify-between space-y-6 relative overflow-hidden">
          <div className="absolute top-4 right-4 bg-sage/20 border border-sage/40 text-sand-100 text-[10px] font-extrabold uppercase px-2.5 py-0.5 rounded-full">
            ESG & CSR Ready
          </div>

          <div className="space-y-4">
            <div className="w-14 h-14 rounded-2xl bg-white/10 text-sand-100 border border-white/20 flex items-center justify-center shadow-sm">
              <Building2 className="w-7 h-7" />
            </div>

            <div>
              <span className="text-[10px] font-extrabold text-sage uppercase tracking-widest block">
                Pathway 02
              </span>
              <h3 className="text-xl font-heading font-extrabold text-white mt-0.5">
                Corporate & Gov Partner
              </h3>
              <p className="text-xs text-sage/90 mt-2 leading-relaxed">
                Host an awareness or sustainability drive at your corporate MNC, government ministry, college, or school with verified activity logs.
              </p>
            </div>

            <div className="space-y-2 pt-2 border-t border-white/10 text-xs text-sage/90">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-sand-200 shrink-0" />
                <span>Browse 80G accredited NGO directory</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-sand-200 shrink-0" />
                <span>Secure HR/CEO permission letter upload</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-sand-200 shrink-0" />
                <span>Full impact audit & ESG compliance report</span>
              </div>
            </div>
          </div>

          <button
            type="button"
            onClick={onPartnerClick}
            className="w-full py-3 rounded-xl bg-sand-100 hover:bg-white text-forest-900 font-heading font-extrabold text-xs uppercase tracking-wider shadow-md transition-all press-effect flex items-center justify-center gap-2"
          >
            Submit Corporate Inquiry
            <ArrowRight className="w-4 h-4 text-forest-700" />
          </button>
        </div>

        {/* Tier 3: Donate */}
        <div className="glass-panel p-8 rounded-3xl border border-sage/70 shadow-soft hover-lift flex flex-col justify-between space-y-6">
          <div className="space-y-4">
            <div className="w-14 h-14 rounded-2xl bg-sand-200 text-forest-800 flex items-center justify-center shadow-sm">
              <Heart className="w-7 h-7 text-forest-700 fill-forest-700" />
            </div>

            <div>
              <span className="text-[10px] font-extrabold text-forest-700 uppercase tracking-widest block">
                Pathway 03
              </span>
              <h3 className="text-xl font-heading font-extrabold text-forest-900 mt-0.5">
                Fund Direct Initiatives
              </h3>
              <p className="text-xs text-charcoal-500 mt-2 leading-relaxed">
                Empower grassroots drives with micro-donations. Select exact causes including sapling plantation, clean water filters, and girl STEM kits.
              </p>
            </div>

            <div className="space-y-2 pt-2 border-t border-sand-200 text-xs text-charcoal-600">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-forest-600 shrink-0" />
                <span>USD ($) & INR (₹) multi-currency support</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-forest-600 shrink-0" />
                <span>Instant 80G tax exemption tax receipts</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-forest-600 shrink-0" />
                <span>100% transparent fund utilization</span>
              </div>
            </div>
          </div>

          <button
            type="button"
            onClick={onDonateClick}
            className="w-full py-3 rounded-xl btn-glow-forest font-heading font-bold text-xs uppercase tracking-wider shadow-sm flex items-center justify-center gap-2 press-effect"
          >
            <Heart className="w-4 h-4 text-sand-200 fill-sand-200" />
            Donate with Custom Amount
          </button>
        </div>

      </div>
    </section>
  );
};
