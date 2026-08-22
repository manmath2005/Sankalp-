import React, { useState } from 'react';
import { 
  ShieldCheck, 
  Heart, 
  Mail, 
  Phone, 
  MapPin, 
  Lock, 
  Send, 
  CheckCircle2, 
  ArrowRight, 
  TreePine, 
  Droplets, 
  BookOpen, 
  Globe 
} from 'lucide-react';
import { SankalpBrandLogo } from './SankalpBrandLogo';
import { useApp } from '../context/AppContext';

export const EarthyFooter = ({ onNavigate, onOpenDonate }) => {
  const { showToast } = useApp();
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [error, setError] = useState('');

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!newsletterEmail || !newsletterEmail.includes('@')) {
      setError('Please enter a valid email address.');
      return;
    }
    setError('');
    setIsSubscribed(true);
    showToast(`Thank you! ${newsletterEmail} subscribed to field impact updates.`, 'success');
  };

  return (
    <footer className="bg-forest-900 text-sand-100 mt-20 pt-16 pb-12 border-t border-forest-800 text-left">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Top Newsletter & Mission Strip */}
        <div className="glass-forest p-8 rounded-3xl border border-sage/20 flex flex-col lg:flex-row items-center justify-between gap-6">
          <div className="space-y-1 max-w-xl">
            <h3 className="text-xl font-heading font-extrabold text-white">
              Stay Connected to Field Impact
            </h3>
            <p className="text-xs text-sage/80">
              Receive monthly transparent audit dispatches, new project launches, and volunteer mobilization calls.
            </p>
          </div>

          {/* Newsletter Input with Instant Validation State */}
          <form onSubmit={handleSubscribe} className="w-full lg:w-auto flex-1 max-w-md">
            {!isSubscribed ? (
              <div className="space-y-1.5">
                <div className="flex bg-forest-800/80 p-1.5 rounded-2xl border border-sage/30 focus-within:border-sage focus-within:ring-2 focus-within:ring-sage/20 transition-all">
                  <div className="flex items-center pl-3 text-sage/70">
                    <Mail className="w-4 h-4" />
                  </div>
                  <input
                    type="email"
                    required
                    value={newsletterEmail}
                    onChange={(e) => {
                      setNewsletterEmail(e.target.value);
                      if (error) setError('');
                    }}
                    placeholder="Enter your email address"
                    className="w-full bg-transparent px-3 py-2 text-xs text-white placeholder:text-sage/40 focus:outline-none"
                  />
                  <button
                    type="submit"
                    className="px-4 py-2 rounded-xl bg-forest-600 hover:bg-forest-500 text-sand-100 text-xs font-heading font-extrabold shadow-sm transition-all press-effect shrink-0 flex items-center gap-1"
                  >
                    Subscribe
                    <Send className="w-3.5 h-3.5" />
                  </button>
                </div>
                {error && <p className="text-[11px] text-amber-300 pl-2 font-medium">{error}</p>}
              </div>
            ) : (
              <div className="flex items-center gap-2 p-2.5 rounded-2xl bg-sage/20 border border-sage/40 text-sage text-xs font-bold">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>Subscribed! Check your inbox for verified audit dispatches.</span>
              </div>
            )}
          </form>
        </div>

        {/* Multi-Column Main Footer Links */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          
          {/* Col 1: Organization Overview */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-2.5">
              <SankalpBrandLogo size="md" />
              <span className="font-heading font-extrabold text-lg text-white">SANKALP FOUNDATION</span>
            </div>


            <p className="text-xs text-sage/80 max-w-sm leading-relaxed font-sans">
              A national social & environmental NGO conducting verified awareness events and restoration campaigns across government offices, public sectors, universities, and schools.
            </p>

            <div className="text-[11px] text-sage/60 font-mono space-y-0.5">
              <p>Govt Trust Reg: NGO/MAH/2018/094821</p>
              <p>NITI Aayog Darpan: MH/2018/019482 • 80G & 12A Certified</p>
            </div>
          </div>

          {/* Col 2: Core Vertical Projects */}
          <div className="space-y-3">
            <h4 className="text-xs font-heading font-extrabold text-white uppercase tracking-wider">
              Core Initiatives
            </h4>
            <ul className="space-y-2 text-xs text-sage/80">
              <li>
                <button onClick={() => onNavigate('events')} className="hover:text-sand-100 transition-colors flex items-center gap-1.5">
                  <TreePine className="w-3.5 h-3.5 text-forest-400" />
                  Reforestation & Canopies
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('events')} className="hover:text-sand-100 transition-colors flex items-center gap-1.5">
                  <Droplets className="w-3.5 h-3.5 text-sky-400" />
                  Clean School Water Filters
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('events')} className="hover:text-sand-100 transition-colors flex items-center gap-1.5">
                  <BookOpen className="w-3.5 h-3.5 text-amber-400" />
                  Girl STEM & Civic Literacy
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('events')} className="hover:text-sand-100 transition-colors flex items-center gap-1.5">
                  <Globe className="w-3.5 h-3.5 text-emerald-400" />
                  Anti-Plastic Movements
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Role Portals */}
          <div className="space-y-3">
            <h4 className="text-xs font-heading font-extrabold text-white uppercase tracking-wider">
              Access Portals
            </h4>
            <ul className="space-y-2 text-xs text-sage/80">
              <li>
                <button onClick={() => onNavigate('volunteer-login')} className="hover:text-sand-100 transition-colors">
                  👤 Volunteer Login & Sign Up
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('company-login')} className="hover:text-sand-100 transition-colors">
                  🏢 Institutional / Company Portal
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('ngo-login')} className="hover:text-sand-100 transition-colors">
                  🛡️ NGO Partner Portal
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('volunteer-hub')} className="hover:text-sand-100 transition-colors">
                  📜 Certificate Verification Studio
                </button>
              </li>
              <li>
                <button onClick={onOpenDonate} className="hover:text-sand-100 transition-colors text-amber-300 font-bold">
                  ❤️ Donate & Direct Funding
                </button>
              </li>
            </ul>
          </div>

          {/* Col 4: Contact & Nodal Office */}
          <div className="space-y-3">
            <h4 className="text-xs font-heading font-extrabold text-white uppercase tracking-wider">
              Nodal Office
            </h4>
            <ul className="space-y-2 text-xs text-sage/80">
              <li className="flex items-start gap-2">
                <Mail className="w-3.5 h-3.5 text-sage mt-0.5 shrink-0" />
                <span>contact@sankalpfoundation.org</span>
              </li>
              <li className="flex items-start gap-2">
                <Phone className="w-3.5 h-3.5 text-sage mt-0.5 shrink-0" />
                <span>+91 7030403004</span>
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="w-3.5 h-3.5 text-sage mt-0.5 shrink-0" />
                <span>Sector 12, Administrative Hub, Cyber City</span>
              </li>
            </ul>
          </div>

        </div>

        {/* Copyright, WCAG Compliance & Discrete Hidden Admin */}
        <div className="pt-8 border-t border-forest-800 flex flex-col sm:flex-row items-center justify-between text-xs text-sage/60 gap-4">
          <div className="flex items-center gap-2">
            <span>© 2026 Sankalp Social Foundation. All Rights Reserved.</span>
            
            {/* Hidden Admin Login Pin Icon */}
            <button
              onClick={() => onNavigate('hidden-admin-login')}
              title="Hidden Administrative Security Console"
              className="opacity-30 hover:opacity-100 hover:text-amber-300 transition-all p-1"
              aria-label="Admin Security Entry"
            >
              <Lock className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="flex items-center gap-4">
            <span className="text-[11px]">WCAG 2.1 AA Compliant • 80G Certified</span>
            <div className="flex items-center gap-1 text-sand-200 font-medium">
              <span>Restoring Earth</span>
              <Heart className="w-3 h-3 text-amber-300 fill-amber-300 ml-0.5" />
            </div>
          </div>
        </div>

      </div>
    </footer>
  );
};
