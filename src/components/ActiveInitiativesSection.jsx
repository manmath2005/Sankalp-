import React, { useState } from 'react';
import { 
  TreePine, 
  Droplets, 
  BookOpen, 
  ArrowRight, 
  MapPin, 
  TrendingUp, 
  Heart, 
  CheckCircle2, 
  Sparkles 
} from 'lucide-react';
import { INITIAL_INITIATIVES } from '../data/mockData';

export const ActiveInitiativesSection = ({ onOpenDonate }) => {
  const [activeTab, setActiveTab] = useState('ALL'); // 'ALL', 'Reforestation', 'Clean Water', 'Education'

  const filtered = INITIAL_INITIATIVES.filter(item => {
    if (activeTab === 'ALL') return true;
    return item.category === activeTab;
  });

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 text-left">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-forest-100 text-forest-800 text-xs font-bold uppercase tracking-wider mb-2">
            <Sparkles className="w-3.5 h-3.5 text-forest-600" />
            Active Field Campaigns
          </div>
          <h2 className="text-2xl sm:text-3xl font-heading font-extrabold text-forest-900">
            Active Initiatives & Eco Projects
          </h2>
          <p className="text-xs sm:text-sm text-charcoal-400 max-w-xl mt-1">
            Explore and directly support our active community projects across reforestation, clean water purification, and girl education.
          </p>
        </div>

        {/* Interactive Tabs */}
        <div className="flex flex-wrap gap-1.5 bg-sand-100 p-1.5 rounded-2xl border border-sand-300/80 shrink-0">
          {[
            { id: 'ALL', label: 'All Projects' },
            { id: 'Reforestation', label: '🌱 Reforestation' },
            { id: 'Clean Water', label: '💧 Clean Water' },
            { id: 'Education', label: '📚 Education' }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-heading font-bold transition-all press-effect ${
                activeTab === tab.id
                  ? 'bg-forest-700 text-white shadow-sm'
                  : 'text-charcoal-600 hover:text-forest-900 hover:bg-white/60'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Asymmetric Cards Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((item, idx) => (
          <div
            key={item.id}
            className={`glass-panel rounded-3xl border border-sage/60 shadow-soft hover-lift overflow-hidden flex flex-col justify-between animate-float-up stagger-${(idx % 6) + 1}`}
          >
            <div>
              {/* Card Image Banner with Tag */}
              <div className="relative h-48 overflow-hidden group">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-3 left-3 bg-white/95 backdrop-blur-md px-2.5 py-1 rounded-full text-[10px] font-extrabold text-forest-800 border border-sage shadow-sm flex items-center gap-1">
                  {item.category === 'Reforestation' && <TreePine className="w-3 h-3 text-forest-600" />}
                  {item.category === 'Clean Water' && <Droplets className="w-3 h-3 text-sky-600" />}
                  {item.category === 'Education' && <BookOpen className="w-3 h-3 text-amber-600" />}
                  {item.tag}
                </div>
                <div className="absolute bottom-3 right-3 bg-forest-900/90 text-sage backdrop-blur-md px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold">
                  {item.impact}
                </div>
              </div>

              {/* Card Content */}
              <div className="p-6 space-y-4">
                <div>
                  <div className="flex items-center gap-1.5 text-[11px] text-charcoal-400 font-medium mb-1">
                    <MapPin className="w-3 h-3 text-forest-600" />
                    <span>{item.location}</span>
                  </div>
                  <h3 className="text-base font-heading font-extrabold text-forest-900 leading-snug">
                    {item.title}
                  </h3>
                  <p className="text-xs text-charcoal-500 mt-1.5 leading-relaxed font-sans">
                    {item.subtitle}
                  </p>
                </div>

                {/* Progress Completion Bar */}
                <div className="space-y-1.5 pt-2 border-t border-sand-200">
                  <div className="flex items-center justify-between text-xs font-bold">
                    <span className="text-forest-800 font-heading">{item.raised} Raised</span>
                    <span className="text-charcoal-400">{item.percent}% of {item.goal}</span>
                  </div>

                  {/* Visual Bar */}
                  <div className="w-full h-2.5 rounded-full bg-sand-200 overflow-hidden">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-forest-600 to-forest-400 transition-all duration-700"
                      style={{ width: `${item.percent}%` }}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Card Action Footer */}
            <div className="p-4 bg-sand-50/70 border-t border-sand-200 flex items-center justify-between">
              <span className="text-[11px] font-bold text-forest-700 flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5 text-forest-600" /> Verified Audit
              </span>

              <button
                type="button"
                onClick={onOpenDonate}
                className="px-4 py-2 rounded-xl bg-forest-700 hover:bg-forest-800 text-white text-xs font-heading font-bold shadow-sm transition-all press-effect flex items-center gap-1.5"
              >
                <Heart className="w-3.5 h-3.5 text-sand-200 fill-sand-200" />
                Support This Project
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
