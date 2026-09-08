import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { EventCard } from '../components/EventCard';
import { AuditGalleryModal } from '../components/AuditGalleryModal';
import { HorizonGlowDivider, HorizonBadge } from '../components/HorizonPrimitives';
import { History, Award, CheckCircle2, Building2, ShieldCheck, FileCheck, Layers, Sparkles } from 'lucide-react';

export const PastHistoryView = () => {
  const { pastEvents, ngoInfo } = useApp();
  const [selectedEvent, setSelectedEvent] = useState(null);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10 text-left page-enter">
      
      {/* Header Banner - Luminous Horizon Glass */}
      <div className="relative overflow-hidden rounded-3xl bg-slate-900/85 backdrop-blur-2xl border border-slate-800/90 p-8 shadow-2xl space-y-6">
        <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-amber-500 via-emerald-400 to-sky-500 opacity-90" />
        <div className="absolute -top-24 -right-24 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-amber-500 to-emerald-400 text-slate-950 flex items-center justify-center font-bold shadow-lg shadow-amber-500/20 shrink-0">
              <History className="w-6 h-6" />
            </div>
            <div>
              <HorizonBadge variant="amber" icon={Sparkles}>
                Transparent Activity Ledger & Corporate Audit
              </HorizonBadge>
              <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight mt-1">
                NGO Historical Drives & Completed Tasks
              </h1>
            </div>
          </div>
        </div>

        <p className="text-xs sm:text-sm text-slate-300 max-w-3xl leading-relaxed">
          Companies, government ministries, and partner institutions can review the complete verifiable history of {ngoInfo?.name || 'Sankalp'}'s social awareness drives, impact metrics, volunteer involvement, and completed task ledgers.
        </p>

        <HorizonGlowDivider />

        {/* Aggregate Stats Summary */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-1">
          <div className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800/80 backdrop-blur-md">
            <p className="text-2xl font-black text-white font-mono">{ngoInfo?.stats?.eventsCompleted || 32}</p>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mt-0.5">Total Drives Completed</p>
          </div>
          <div className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800/80 backdrop-blur-md">
            <p className="text-2xl font-black text-sky-400 font-mono">{ngoInfo?.stats?.impactedCitizens || '15,000+'}</p>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mt-0.5">Citizens Impacted</p>
          </div>
          <div className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800/80 backdrop-blur-md">
            <p className="text-2xl font-black text-emerald-400 font-mono">{ngoInfo?.stats?.partnerInstitutions || 18}</p>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mt-0.5">Partner Institutions</p>
          </div>
          <div className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800/80 backdrop-blur-md">
            <p className="text-2xl font-black text-amber-400 font-mono">{ngoInfo?.stats?.certificatesIssued || '450+'}</p>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mt-0.5">Certificates Issued</p>
          </div>
        </div>
      </div>

      {/* Completed Drives Wall */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-black text-white flex items-center gap-2 tracking-tight">
            <FileCheck className="w-5 h-5 text-emerald-400" />
            Completed Awareness Campaigns & Verified Task Ledgers
          </h2>
          <span className="text-xs font-bold text-slate-400">
            {pastEvents?.length || 0} Drives Verified
          </span>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {pastEvents?.map(evt => (
            <EventCard 
              key={evt.id} 
              event={evt} 
              isPast={true}
              onSelect={(e) => setSelectedEvent(e)}
            />
          ))}
        </div>
      </div>

      {/* Corporate Partner Feedback & Endorsements */}
      <div className="relative overflow-hidden rounded-3xl bg-slate-900/80 backdrop-blur-2xl border border-slate-800/80 p-8 shadow-xl space-y-6">
        <div className="flex items-center justify-between border-b border-slate-800/80 pb-4">
          <h2 className="text-xl font-black text-white flex items-center gap-2">
            <Building2 className="w-5 h-5 text-sky-400" />
            Institutional Partner Testimonials & Audit Feedback
          </h2>
          <span className="text-xs font-mono text-emerald-400 font-bold">100% Verified Corporate Partners</span>
        </div>

        <div className="grid sm:grid-cols-2 gap-6">
          {pastEvents?.map(evt => (
            <div key={evt.id} className="p-5 rounded-2xl bg-slate-950/60 border border-slate-800/80 space-y-3 hover:border-slate-700/80 transition-all">
              <div className="flex items-center gap-3 border-b border-slate-800/60 pb-3">
                <div className="w-9 h-9 rounded-xl bg-sky-500/20 text-sky-400 border border-sky-400/30 flex items-center justify-center font-bold text-xs shrink-0">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-extrabold text-white">{evt.partnerName}</h4>
                  <p className="text-[10px] text-slate-400">Partnered on: <span className="text-slate-300 font-semibold">{evt.title}</span></p>
                </div>
              </div>

              <p className="text-xs text-slate-300 italic leading-relaxed">
                "{evt.partnerFeedback}"
              </p>

              <div className="pt-2">
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Tasks Completed Log:</p>
                <div className="space-y-1.5 mt-2">
                  {evt.tasksCompleted?.map((t, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-[11px] text-slate-300 font-medium">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                      <span>{t}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Verified Audit, Photo Gallery & Social Media Modal */}
      {selectedEvent && (
        <AuditGalleryModal 
          event={selectedEvent} 
          onClose={() => setSelectedEvent(null)} 
        />
      )}
    </div>
  );
};
