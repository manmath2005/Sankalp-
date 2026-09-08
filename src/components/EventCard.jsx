import React, { useState } from 'react';
import { 
  Calendar, 
  MapPin, 
  Users, 
  Clock, 
  Building, 
  GraduationCap, 
  Landmark, 
  CheckCircle2, 
  ArrowRight,
  ShieldAlert,
  Monitor,
  Sparkles,
  Zap,
  BookmarkCheck
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export const EventCard = ({ event, onSelect, isPast = false }) => {
  const { currentUser, volunteers, registerVolunteerForEvent } = useApp();
  const [isHovered, setIsHovered] = useState(false);

  const userVolunteer = currentUser 
    ? volunteers.find(v => v.email.toLowerCase() === currentUser.email.toLowerCase())
    : null;

  const isRegistered = userVolunteer?.assignedEventIds?.includes(event.id);

  const renderCategoryIcon = (category) => {
    switch (category) {
      case 'Government Office':
        return <Landmark className="w-3.5 h-3.5 text-amber-600" />;
      case 'College':
        return <GraduationCap className="w-3.5 h-3.5 text-indigo-600" />;
      case 'School':
        return <Users className="w-3.5 h-3.5 text-emerald-600" />;
      default:
        return <Building className="w-3.5 h-3.5 text-sky-600" />;
    }
  };

  const isFull = event.volunteersRegistered >= event.volunteerSeats;
  const fillPercentage = Math.min(100, Math.round((event.volunteersRegistered / event.volunteerSeats) * 100));

  return (
    <div 
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group bg-slate-900/80 backdrop-blur-xl border border-slate-800/80 hover:border-slate-700 hover:shadow-[0_0_25px_rgba(245,158,11,0.12)] rounded-3xl overflow-hidden flex flex-col justify-between text-left relative transition-all duration-300 hover:-translate-y-1"
    >
      {/* Top subtle horizon glow on hover */}
      <div className="absolute top-0 left-0 right-0 h-[1.5px] bg-gradient-to-r from-amber-500/60 via-emerald-500/50 to-blue-500/60 opacity-0 group-hover:opacity-100 transition-opacity z-20" />

      <div>
        {/* Card Banner Image & Badges */}
        <div className="relative h-48 w-full overflow-hidden bg-slate-950">
          <img 
            src={event.image || "https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=800&q=80"} 
            alt={event.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out opacity-85 group-hover:opacity-95"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/50 to-transparent" />

          {/* Top Floating Badges */}
          <div className="absolute top-3 left-3 right-3 flex items-center justify-between pointer-events-none">
            <div className="flex items-center gap-1.5 flex-wrap">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-slate-950/80 backdrop-blur-md text-white border border-slate-700/80 text-[11px] font-extrabold shadow-sm">
                {renderCategoryIcon(event.category)}
                {event.category}
              </span>

              {event.isMicroTask && (
                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-xl bg-amber-400 text-slate-950 text-[10px] font-black shadow-sm">
                  <Zap className="w-3 h-3 fill-current" />
                  {event.estimatedHours || 3}h Quick Task
                </span>
              )}
            </div>

            <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-xl text-[11px] font-extrabold backdrop-blur-md shadow-sm border ${
              event.mode === 'Online' || event.isVirtual
                ? 'bg-purple-950/80 text-purple-200 border-purple-400/40'
                : 'bg-emerald-950/80 text-emerald-200 border-emerald-400/40'
            }`}>
              {event.mode === 'Online' || event.isVirtual ? <Monitor className="w-3 h-3 text-purple-300" /> : <MapPin className="w-3 h-3 text-emerald-300" />}
              {event.isVirtual ? 'Remote' : event.mode}
            </span>
          </div>

          {/* Bottom Title on Image */}
          <div className="absolute bottom-3 left-3 right-3 text-left">
            <span className="text-[10px] font-black text-amber-400 uppercase tracking-widest block mb-0.5">
              {isPast ? `Completed on ${event.completedDate}` : event.date}
            </span>
            <h3 className="text-base font-extrabold text-white leading-snug line-clamp-2 drop-shadow-sm font-display">
              {event.title}
            </h3>
          </div>
        </div>

        {/* Card Body Details */}
        <div className="p-5 space-y-3.5 text-left">
          <p className="text-xs text-slate-300 line-clamp-2 leading-relaxed font-medium">
            {isPast ? event.summary : event.description}
          </p>

          {/* Required Skills Badges Array */}
          {event.requiredSkills && event.requiredSkills.length > 0 && (
            <div className="flex flex-wrap gap-1 pt-1">
              {event.requiredSkills.slice(0, 3).map((skill, sIdx) => (
                <span key={sIdx} className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-slate-800 text-amber-300 border border-slate-700/80">
                  ✨ {skill}
                </span>
              ))}
              {event.requiredSkills.length > 3 && (
                <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-md bg-slate-800 text-slate-400">
                  +{event.requiredSkills.length - 3}
                </span>
              )}
            </div>
          )}

          <div className="space-y-2 pt-2 border-t border-slate-800/80 text-xs text-slate-400">
            <div className="flex items-center gap-2">
              <MapPin className="w-3.5 h-3.5 text-amber-400 shrink-0" />
              <span className="truncate font-semibold text-slate-200">{event.venue}</span>
            </div>
            
            {!isPast && (
              <div className="flex items-center gap-2">
                <Clock className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span className="font-semibold text-slate-200">{event.time}</span>
              </div>
            )}

            {/* Target Audience */}
            <div className="flex items-center gap-2">
              <Users className="w-3.5 h-3.5 text-sky-400 shrink-0" />
              <span className="font-medium text-slate-300">Expected: {event.expectedAudience}</span>
            </div>
          </div>

          {/* Seat Capacity Progress (for upcoming) */}
          {!isPast && (
            <div className="pt-2 space-y-1.5">
              <div className="flex items-center justify-between text-[11px]">
                <span className="font-bold text-slate-400">Volunteer Slots</span>
                <span className="font-mono font-bold text-amber-400">
                  {event.volunteersRegistered} / {event.volunteerSeats} Filled
                </span>
              </div>
              <div className="w-full bg-slate-800 rounded-full h-2 overflow-hidden border border-slate-700/60">
                <div 
                  className={`h-full rounded-full transition-all duration-500 ${
                    fillPercentage >= 100 ? 'bg-amber-500' : 'bg-gradient-to-r from-amber-400 via-emerald-400 to-sky-400'
                  }`}
                  style={{ width: `${fillPercentage}%` }}
                />
              </div>
            </div>
          )}

          {/* Impact Stats for Past Events */}
          {isPast && (
            <div className="space-y-2 pt-1">
              {event.ngoName && (
                <div className="p-2 rounded-xl bg-slate-800/60 border border-slate-700/60 text-left">
                  <span className="text-[10px] font-bold text-slate-400 uppercase block">Conducted By Verified NGO:</span>
                  <span className="text-xs font-black text-amber-300">{event.ngoName}</span>
                </div>
              )}
              <div className="grid grid-cols-2 gap-2">
                <div className="p-2 rounded-xl bg-slate-800/60 border border-slate-700/60 text-center">
                  <p className="text-[10px] font-bold text-slate-400 uppercase">Impact Record</p>
                  <p className="text-xs font-black text-white">{event.impactMetric || event.impact || `${event.attendees}+ Citizens`}</p>
                </div>
                <div className="p-2 rounded-xl bg-emerald-950/40 border border-emerald-800/60 text-center">
                  <p className="text-[10px] font-bold text-emerald-400 uppercase">Certificates</p>
                  <p className="text-xs font-black text-emerald-300">{event.certificatesIssued || event.certificatesGenerated || event.volunteersEngaged} Issued</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Action Footer */}
      <div className="p-5 pt-0">
        <button
          onClick={() => onSelect(event)}
          className={`w-full py-2.5 px-4 rounded-xl font-extrabold text-xs transition-all flex items-center justify-center gap-2 press-effect ${
            isRegistered 
              ? 'bg-emerald-500/10 text-emerald-300 border border-emerald-500/30'
              : isPast
                ? 'bg-slate-800/80 hover:bg-slate-800 text-white border border-slate-700/80'
                : 'bg-gradient-to-r from-amber-500 to-emerald-600 hover:from-amber-400 hover:to-emerald-500 text-slate-950 font-bold shadow-[0_0_15px_rgba(245,158,11,0.2)]'
          }`}
        >
          {isRegistered ? (
            <>
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>You Are Registered For This Drive</span>
            </>
          ) : isPast ? (
            <>
              <span>View Audit & Photo Gallery</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </>
          ) : (
            <>
              <span>View Drive Details & Sign Up</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </>
          )}
        </button>
      </div>
    </div>
  );
};
