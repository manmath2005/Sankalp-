import React from 'react';
import { 
  X, 
  Calendar, 
  MapPin, 
  Clock, 
  Users, 
  CheckCircle2, 
  Building, 
  PhoneCall, 
  ShieldCheck,
  ListTodo
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export const EventModal = ({ event, onClose }) => {
  const { currentUser, volunteers, registerVolunteerForEvent } = useApp();

  if (!event) return null;

  const userVolunteer = currentUser 
    ? volunteers.find(v => v.email.toLowerCase() === currentUser.email.toLowerCase())
    : null;

  const isRegistered = userVolunteer?.assignedEventIds?.includes(event.id);
  const isFull = event.volunteersRegistered >= event.volunteerSeats;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-xl animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl horizon-glass-panel rounded-3xl border border-slate-800/90 bg-slate-900/95 shadow-2xl overflow-hidden max-h-[90vh] flex flex-col text-left">
        <div className="horizon-gradient-line absolute top-0 left-0 right-0 h-1 z-20"></div>
        
        {/* Header Image Strip */}
        <div className="relative h-48 w-full bg-slate-950">
          <img 
            src={event.image || "https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=800&q=80"} 
            alt={event.title}
            className="w-full h-full object-cover opacity-70"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/50 to-transparent" />

          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full bg-slate-900/80 hover:bg-slate-800 text-white backdrop-blur-md transition-colors border border-slate-700"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Category & Mode Pills */}
          <div className="absolute top-4 left-4 flex gap-2">
            <span className="px-3 py-1 rounded-full bg-amber-500 text-slate-950 text-xs font-black shadow-md">
              {event.category}
            </span>
            <span className="px-3 py-1 rounded-full bg-emerald-500 text-slate-950 text-xs font-black shadow-md">
              {event.mode} Drive
            </span>
          </div>

          <div className="absolute bottom-4 left-6 right-6 text-left">
            <p className="text-xs font-mono font-bold text-amber-400 uppercase tracking-widest">{event.id}</p>
            <h2 className="text-xl sm:text-2xl font-black text-white leading-tight">
              {event.title}
            </h2>
          </div>
        </div>

        {/* Scrollable Content Body */}
        <div className="p-6 space-y-6 overflow-y-auto text-left flex-1">
          
          {/* Key Quick Info Strip */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="p-3 rounded-2xl bg-slate-950/80 border border-slate-800">
              <Calendar className="w-4 h-4 text-amber-400 mb-1" />
              <p className="text-[10px] font-bold text-slate-400 uppercase">Date</p>
              <p className="text-xs font-black text-white">{event.date}</p>
            </div>
            
            <div className="p-3 rounded-2xl bg-slate-950/80 border border-slate-800">
              <Clock className="w-4 h-4 text-emerald-400 mb-1" />
              <p className="text-[10px] font-bold text-slate-400 uppercase">Time</p>
              <p className="text-xs font-black text-white">{event.time}</p>
            </div>

            <div className="p-3 rounded-2xl bg-slate-950/80 border border-slate-800">
              <Users className="w-4 h-4 text-sky-400 mb-1" />
              <p className="text-[10px] font-bold text-slate-400 uppercase">Volunteers</p>
              <p className="text-xs font-black text-white">{event.volunteersRegistered} / {event.volunteerSeats}</p>
            </div>

            <div className="p-3 rounded-2xl bg-slate-950/80 border border-slate-800">
              <Building className="w-4 h-4 text-amber-400 mb-1" />
              <p className="text-[10px] font-bold text-slate-400 uppercase">Target</p>
              <p className="text-xs font-black text-white truncate">{event.targetAudience}</p>
            </div>
          </div>

          {/* Detailed Description */}
          <div>
            <h4 className="text-xs font-black text-white uppercase tracking-wider mb-2">
              Event Overview &amp; Objectives
            </h4>
            <p className="text-sm text-slate-300 leading-relaxed bg-slate-950/70 p-4 rounded-2xl border border-slate-800">
              {event.description}
            </p>
          </div>

          {/* Venue & Location */}
          <div className="space-y-2">
            <h4 className="text-xs font-black text-white uppercase tracking-wider">
              Venue &amp; Location
            </h4>
            <div className="flex items-start gap-3 p-3.5 rounded-2xl bg-slate-950/70 border border-slate-800">
              <MapPin className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
              <div>
                <p className="text-xs font-bold text-white">{event.venue}</p>
                <p className="text-xs text-slate-400">{event.location}</p>
              </div>
            </div>
          </div>

          {/* Volunteer Tasks Required */}
          {event.tasksRequired && event.tasksRequired.length > 0 && (
            <div>
              <h4 className="text-xs font-black text-white uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <ListTodo className="w-4 h-4 text-amber-400" />
                Volunteer Roles &amp; Assigned Tasks
              </h4>
              <div className="grid sm:grid-cols-2 gap-2">
                {event.tasksRequired.map((task, idx) => (
                  <div key={idx} className="flex items-center gap-2 p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs font-bold text-slate-300">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>{task}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Required Skills Strip */}
          {event.requiredSkills && event.requiredSkills.length > 0 && (
            <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-2 text-left">
              <span className="text-[11px] font-black uppercase text-amber-400 tracking-wider flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-amber-400" />
                Required Competencies &amp; Skills for this Role:
              </span>
              <div className="flex flex-wrap gap-1.5">
                {event.requiredSkills.map((s, idx) => (
                  <span key={idx} className="px-3 py-1 rounded-xl bg-slate-900 border border-slate-700 text-amber-300 text-xs font-bold shadow-xs">
                    ✨ {s}
                  </span>
                ))}
              </div>
            </div>
          )}

          <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 text-white flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-amber-500/20 border border-amber-500/30 text-amber-400 flex items-center justify-center font-bold shadow-sm">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs text-slate-400 font-medium">Event Campaign Coordinator</p>
                <p className="text-xs font-bold text-white">{event.coordinator}</p>
              </div>
            </div>
            <a 
              href={`tel:${event.organizerContact}`}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-xs font-bold text-amber-300 transition-colors"
            >
              <PhoneCall className="w-3.5 h-3.5" />
              {event.organizerContact}
            </a>
          </div>

        </div>

        {/* Modal Footer */}
        <div className="p-4 bg-slate-950 border-t border-slate-800 flex items-center justify-between">
          <button
            onClick={onClose}
            className="px-5 py-2.5 rounded-xl border border-slate-700 text-xs font-bold text-slate-300 hover:bg-slate-800 hover:text-white transition-all"
          >
            Close
          </button>

          {isRegistered ? (
            <span className="px-6 py-2.5 rounded-xl bg-emerald-600 text-white text-xs font-black flex items-center gap-2 shadow-md">
              <CheckCircle2 className="w-4 h-4" />
              You are Registered for this Event
            </span>
          ) : isFull ? (
            <span className="px-6 py-2.5 rounded-xl bg-slate-800 text-slate-500 text-xs font-bold">
              Volunteer Slots Full
            </span>
          ) : (
            <button
              onClick={() => {
                registerVolunteerForEvent(event.id);
                onClose();
              }}
              className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 via-emerald-500 to-sky-500 hover:from-amber-400 hover:to-sky-400 text-slate-950 text-xs font-black shadow-lg shadow-amber-500/10 transition-all flex items-center gap-2 press-effect"
            >
              {event.isMicroTask ? "⚡ Apply with 1-Click Resume" : "Confirm Volunteer Registration"}
            </button>
          )}
        </div>

      </div>
    </div>
  );
};
