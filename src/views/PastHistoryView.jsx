import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { EventCard } from '../components/EventCard';
import { AuditGalleryModal } from '../components/AuditGalleryModal';
import { History, Award, CheckCircle2, Building2, ShieldCheck, FileCheck, Layers } from 'lucide-react';

export const PastHistoryView = () => {
  const { pastEvents, ngoInfo } = useApp();
  const [selectedEvent, setSelectedEvent] = useState(null);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10 text-left">
      
      {/* Header */}
      <div className="glass-panel p-8 rounded-3xl border border-slate-200 shadow-sm space-y-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-amber-50 border border-amber-200 text-amber-600 flex items-center justify-center font-bold">
            <History className="w-6 h-6" />
          </div>
          <div>
            <span className="text-xs font-extrabold text-amber-700 uppercase tracking-widest block">
              Transparent Activity Ledger & Corporate Audit
            </span>
            <h1 className="text-3xl font-extrabold text-slate-900">
              NGO Historical Events & Completed Tasks
            </h1>
          </div>
        </div>

        <p className="text-xs sm:text-sm text-slate-600 max-w-3xl">
          Companies, government ministries, and partner institutions can review the complete verifiable history of {ngoInfo.name}'s social awareness drives, impact metrics, volunteer involvement, and completed task ledgers.
        </p>

        {/* Aggregate Stats Summary */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-3">
          <div className="p-3.5 rounded-2xl bg-white border border-slate-200/80">
            <p className="text-xl font-extrabold text-slate-900">{ngoInfo.stats.eventsCompleted}</p>
            <p className="text-[10px] font-bold text-slate-400 uppercase">Total Drives Completed</p>
          </div>
          <div className="p-3.5 rounded-2xl bg-white border border-slate-200/80">
            <p className="text-xl font-extrabold text-sky-700">{ngoInfo.stats.impactedCitizens}</p>
            <p className="text-[10px] font-bold text-slate-400 uppercase">Citizens Impacted</p>
          </div>
          <div className="p-3.5 rounded-2xl bg-white border border-slate-200/80">
            <p className="text-xl font-extrabold text-emerald-700">{ngoInfo.stats.partnerInstitutions}</p>
            <p className="text-[10px] font-bold text-slate-400 uppercase">Partner Institutions</p>
          </div>
          <div className="p-3.5 rounded-2xl bg-white border border-slate-200/80">
            <p className="text-xl font-extrabold text-amber-700">{ngoInfo.stats.certificatesIssued}</p>
            <p className="text-[10px] font-bold text-slate-400 uppercase">Certificates Issued</p>
          </div>
        </div>
      </div>

      {/* Completed Drives Wall */}
      <div className="space-y-6">
        <h2 className="text-xl font-extrabold text-slate-900 flex items-center gap-2">
          <FileCheck className="w-5 h-5 text-emerald-600" />
          Completed Awareness Campaigns & Verified Task Ledgers
        </h2>

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
      </div>

      {/* Corporate Partner Feedback & Endorsements */}
      <div className="glass-panel p-8 rounded-3xl border border-slate-200 space-y-6">
        <h2 className="text-xl font-extrabold text-slate-900 flex items-center gap-2">
          <Building2 className="w-5 h-5 text-sky-600" />
          Institutional Partner Testimonials & Audit Feedback
        </h2>

        <div className="grid sm:grid-cols-2 gap-6">
          {pastEvents.map(evt => (
            <div key={evt.id} className="p-5 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-3">
              <div className="flex items-center gap-3 border-b border-slate-200/60 pb-3">
                <div className="w-8 h-8 rounded-lg bg-sky-100 text-sky-700 flex items-center justify-center font-bold text-xs">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-extrabold text-slate-900">{evt.partnerName}</h4>
                  <p className="text-[10px] text-slate-500">Partnered on: {evt.title}</p>
                </div>
              </div>

              <p className="text-xs text-slate-700 italic leading-relaxed">
                "{evt.partnerFeedback}"
              </p>

              <div className="pt-2">
                <p className="text-[10px] font-bold text-slate-400 uppercase">Tasks Completed Log:</p>
                <div className="space-y-1 mt-1">
                  {evt.tasksCompleted?.map((t, idx) => (
                    <div key={idx} className="flex items-center gap-1.5 text-[11px] text-slate-700 font-medium">
                      <CheckCircle2 className="w-3 h-3 text-emerald-500 shrink-0" />
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
