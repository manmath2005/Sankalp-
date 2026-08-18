import React from 'react';
import { 
  DollarSign, 
  Users, 
  MapPin, 
  Clock, 
  TreePine, 
  Droplets, 
  Sparkles, 
  ArrowUpRight 
} from 'lucide-react';
import { GLOBAL_IMPACT_METRICS } from '../data/mockData';

export const ImpactStatisticsGrid = () => {
  const stats = [
    {
      id: 'funds',
      label: 'Funds Deployed to Field',
      value: GLOBAL_IMPACT_METRICS.fundsRaisedUSD,
      subValue: GLOBAL_IMPACT_METRICS.fundsRaisedINR,
      icon: DollarSign,
      color: 'text-forest-700 bg-forest-100 border-forest-300',
      description: '100% audited for clean water, greening & literacy drives'
    },
    {
      id: 'lives',
      label: 'Citizen Lives Impacted',
      value: GLOBAL_IMPACT_METRICS.livesImpacted,
      subValue: 'Across 4 Institutional Sectors',
      icon: Users,
      color: 'text-amber-700 bg-sand-200 border-sand-300',
      description: 'Students, public officials, corporate workers & citizens'
    },
    {
      id: 'regions',
      label: 'Active Regions Covered',
      value: GLOBAL_IMPACT_METRICS.activeRegions,
      subValue: 'Government & Public Offices',
      icon: MapPin,
      color: 'text-emerald-700 bg-emerald-100 border-emerald-300',
      description: 'Collectorates, schools, colleges, and MNC campuses'
    },
    {
      id: 'volunteer-hours',
      label: 'Field Volunteer Hours',
      value: GLOBAL_IMPACT_METRICS.volunteerHours,
      subValue: 'Verified with Digital QR',
      icon: Clock,
      color: 'text-indigo-700 bg-indigo-100 border-indigo-300',
      description: 'Hands-on sapling plantation, education & sanitization'
    }
  ];

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 text-left">
      <div className="mb-6">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-forest-100 text-forest-800 text-xs font-bold uppercase tracking-wider mb-2">
          <Sparkles className="w-3.5 h-3.5 text-forest-600" />
          Real-Time Audit & Proven Scale
        </div>
        <h2 className="text-2xl sm:text-3xl font-heading font-extrabold text-forest-900">
          Impact Statistics Ledger
        </h2>
        <p className="text-xs sm:text-sm text-charcoal-400 max-w-xl mt-1">
          Every rupee and volunteer hour is logged with transparent verification across active onfield districts.
        </p>
      </div>

      {/* 4-Column Counter Cards Grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {stats.map((stat, idx) => {
          const Icon = stat.icon;
          return (
            <div
              key={stat.id}
              className={`glass-panel p-6 rounded-3xl border border-sage/60 shadow-soft hover-lift flex flex-col justify-between space-y-4 animate-float-up stagger-${idx + 1}`}
            >
              <div className="flex items-start justify-between">
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center border shadow-sm ${stat.color}`}>
                  <Icon className="w-6 h-6" />
                </div>
                <span className="text-[10px] font-extrabold text-forest-700 bg-forest-50 px-2 py-0.5 rounded-full border border-forest-200/60">
                  Live Audit
                </span>
              </div>

              <div>
                <h3 className="text-3xl font-heading font-black text-forest-900 tracking-tight">
                  {stat.value}
                </h3>
                <p className="text-xs font-bold text-forest-700 mt-0.5">
                  {stat.label}
                </p>
                <p className="text-[11px] text-charcoal-400 mt-1 leading-relaxed">
                  {stat.description}
                </p>
              </div>

              <div className="pt-2 border-t border-sand-200/80 text-[10px] font-bold text-charcoal-400 flex items-center justify-between">
                <span>{stat.subValue}</span>
                <ArrowUpRight className="w-3.5 h-3.5 text-forest-600" />
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
