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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl glass-panel rounded-3xl border border-slate-200 shadow-float-lg overflow-hidden max-h-[90vh] flex flex-col">
        
        {/* Header Image Strip */}
        <div className="relative h-48 w-full bg-slate-900">
          <img 
            src={event.image || "https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=800&q=80"} 
            alt={event.title}
            className="w-full h-full object-cover opacity-80"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent" />

          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full bg-slate-900/80 hover:bg-slate-900 text-white backdrop-blur-md transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Category & Mode Pills */}
          <div className="absolute top-4 left-4 flex gap-2">
            <span className="px-3 py-1 rounded-full bg-sky-500 text-white text-xs font-bold shadow-md">
              {event.category}
            </span>
            <span className="px-3 py-1 rounded-full bg-emerald-500 text-white text-xs font-bold shadow-md">
              {event.mode} Drive
            </span>
          </div>

          <div className="absolute bottom-4 left-6 right-6 text-left">
            <p className="text-xs font-bold text-sky-300 uppercase tracking-widest">{event.id}</p>
            <h2 className="text-xl sm:text-2xl font-extrabold text-white leading-tight">
              {event.title}
            </h2>
          </div>
        </div>

        {/* Scrollable Content Body */}
        <div className="p-6 space-y-6 overflow-y-auto text-left flex-1">
          
          {/* Key Quick Info Strip */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="p-3 rounded-2xl bg-slate-100/80 border border-slate-200/60">
              <Calendar className="w-4 h-4 text-sky-600 mb-1" />
              <p className="text-[10px] font-bold text-slate-400 uppercase">Date</p>
              <p className="text-xs font-extrabold text-slate-800">{event.date}</p>
            </div>
            
            <div className="p-3 rounded-2xl bg-slate-100/80 border border-slate-200/60">
              <Clock className="w-4 h-4 text-emerald-600 mb-1" />
              <p className="text-[10px] font-bold text-slate-400 uppercase">Time</p>
              <p className="text-xs font-extrabold text-slate-800">{event.time}</p>
            </div>

            <div className="p-3 rounded-2xl bg-slate-100/80 border border-slate-200/60">
              <Users className="w-4 h-4 text-indigo-600 mb-1" />
              <p className="text-[10px] font-bold text-slate-400 uppercase">Volunteers</p>
              <p className="text-xs font-extrabold text-slate-800">{event.volunteersRegistered} / {event.volunteerSeats}</p>
            </div>

            <div className="p-3 rounded-2xl bg-slate-100/80 border border-slate-200/60">
              <Building className="w-4 h-4 text-amber-600 mb-1" />
              <p className="text-[10px] font-bold text-slate-400 uppercase">Target</p>
              <p className="text-xs font-extrabold text-slate-800 truncate">{event.targetAudience}</p>
            </div>
          </div>

          {/* Detailed Description */}
          <div>
            <h4 className="text-xs font-extrabold text-slate-900 uppercase tracking-wider mb-2">
              Event Overview & Objectives
            </h4>
            <p className="text-sm text-slate-600 leading-relaxed bg-slate-50 p-4 rounded-2xl border border-slate-200/70">
              {event.description}
            </p>
          </div>

          {/* Venue & Location */}
          <div className="space-y-2">
            <h4 className="text-xs font-extrabold text-slate-900 uppercase tracking-wider">
              Venue & Location
            </h4>
            <div className="flex items-start gap-3 p-3.5 rounded-2xl bg-sky-50/50 border border-sky-100">
              <MapPin className="w-5 h-5 text-sky-600 shrink-0 mt-0.5" />
              <div>
                <p className="text-xs font-bold text-slate-900">{event.venue}</p>
                <p className="text-xs text-slate-500">{event.location}</p>
              </div>
            </div>
          </div>

          {/* Volunteer Tasks Required */}
          {event.tasksRequired && event.tasksRequired.length > 0 && (
            <div>
              <h4 className="text-xs font-extrabold text-slate-900 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <ListTodo className="w-4 h-4 text-sky-600" />
                Volunteer Roles & Assigned Tasks
              </h4>
              <div className="grid sm:grid-cols-2 gap-2">
                {event.tasksRequired.map((task, idx) => (
                  <div key={idx} className="flex items-center gap-2 p-2.5 rounded-xl bg-white border border-slate-200 text-xs font-semibold text-slate-700">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                    <span>{task}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Campaign Lead Coordinator Contact */}
          {/* Required Skills Strip */}
          {event.requiredSkills && event.requiredSkills.length > 0 && (
            <div className="p-4 rounded-2xl bg-sky-50/70 border border-sky-200/60 space-y-2 text-left">
              <span className="text-[11px] font-extrabold uppercase text-sky-950 tracking-wider flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-sky-600" />
                Required Competencies & Skills for this Role:
              </span>
              <div className="flex flex-wrap gap-1.5">
                {event.requiredSkills.map((s, idx) => (
                  <span key={idx} className="px-3 py-1 rounded-xl bg-white border border-sky-200 text-sky-900 text-xs font-bold shadow-xs">
                    ✨ {s}
                  </span>
                ))}
              </div>
            </div>
          )}

          <div className="p-4 rounded-2xl bg-slate-900 text-white flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-sky-500/20 text-sky-400 flex items-center justify-center font-bold">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs text-slate-400 font-medium">Event Campaign Coordinator</p>
                <p className="text-xs font-bold text-white">{event.coordinator}</p>
              </div>
            </div>
            <a 
              href={`tel:${event.organizerContact}`}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-xs font-semibold text-sky-300 transition-colors"
            >
              <PhoneCall className="w-3.5 h-3.5" />
              {event.organizerContact}
            </a>
          </div>

        </div>

        {/* Modal Footer */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between">
          <button
            onClick={onClose}
            className="px-5 py-2.5 rounded-xl border border-slate-300 text-xs font-bold text-slate-700 hover:bg-slate-100"
          >
            Close
          </button>

          {isRegistered ? (
            <span className="px-6 py-2.5 rounded-xl bg-emerald-600 text-white text-xs font-bold flex items-center gap-2 shadow-md">
              <CheckCircle2 className="w-4 h-4" />
              You are Registered for this Event
            </span>
          ) : isFull ? (
            <span className="px-6 py-2.5 rounded-xl bg-slate-200 text-slate-500 text-xs font-bold">
              Volunteer Slots Full
            </span>
          ) : (
            <button
              onClick={() => {
                registerVolunteerForEvent(event.id);
                onClose();
              }}
              className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-sky-600 to-indigo-600 hover:from-sky-700 hover:to-indigo-700 text-white text-xs font-extrabold shadow-md hover:shadow-lg transition-all flex items-center gap-2 press-effect"
            >
              {event.isMicroTask ? "⚡ Apply with 1-Click Resume" : "Confirm Volunteer Registration"}
            </button>
          )}
        </div>

      </div>
    </div>
  );
};
