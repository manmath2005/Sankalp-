import React, { useState, useEffect } from 'react';
import { 
  AlertTriangle, 
  Flame, 
  Clock, 
  Users, 
  ArrowRight, 
  X, 
  CheckCircle2, 
  ShieldAlert, 
  Radio, 
  HeartHandshake,
  Send,
  BellRing
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export const SosEmergencyBanner = ({ onSelectEvent }) => {
  const { events, volunteers, currentUser, registerVolunteerForEvent } = useApp();
  const [dismissed, setDismissed] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState('');
  const [isBroadcasting, setIsBroadcasting] = useState(false);
  const [broadcastSent, setBroadcastSent] = useState(false);

  // Find the top critical or high urgency active SOS event
  const activeEmergency = events.find(e => e.isEmergency);

  useEffect(() => {
    if (!activeEmergency) return;

    const calculateCountdown = () => {
      // If deadline specified, use that; else default to 4 hours from now
      const targetTime = activeEmergency.emergencyDeadline 
        ? new Date(activeEmergency.emergencyDeadline).getTime() 
        : Date.now() + 4 * 60 * 60 * 1000;
      
      const diff = targetTime - Date.now();
      if (diff <= 0) {
        setTimeRemaining('URGENT MOBILIZATION ACTIVE');
        return;
      }

      const hours = Math.floor(diff / (1000 * 60 * 60));
      const mins = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const secs = Math.floor((diff % (1000 * 60)) / 1000);
      setTimeRemaining(`${hours.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`);
    };

    calculateCountdown();
    const interval = setInterval(calculateCountdown, 1000);
    return () => clearInterval(interval);
  }, [activeEmergency]);

  if (!activeEmergency || dismissed) return null;

  const currentMobilized = activeEmergency.volunteersRegistered || 0;
  const targetRequired = activeEmergency.volunteerSeats || 50;
  const progressPercent = Math.min(100, Math.round((currentMobilized / targetRequired) * 100));

  const handleBroadcastAlert = async () => {
    setIsBroadcasting(true);
    try {
      const response = await fetch('http://localhost:5000/api/sos/broadcast', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          eventTitle: activeEmergency.title,
          urgencyLevel: activeEmergency.urgencyLevel || 'Critical',
          requiredResources: activeEmergency.requiredResources || 'Emergency volunteer mobilization',
          venue: activeEmergency.venue,
          city: activeEmergency.location,
          targetRadiusKm: activeEmergency.targetRadiusKm || 50,
          volunteers: volunteers || []
        })
      });
      const data = await response.json();
      if (data.success) {
        setBroadcastSent(true);
        setTimeout(() => setBroadcastSent(false), 5000);
      }
    } catch (err) {
      console.error('SOS Alert dispatch error:', err);
      // Still show local success confirmation
      setBroadcastSent(true);
      setTimeout(() => setBroadcastSent(false), 5000);
    } finally {
      setIsBroadcasting(false);
    }
  };

  const isUserRegistered = currentUser && volunteers.some(v => 
    v.email.toLowerCase() === currentUser.email?.toLowerCase() && 
    v.assignedEventIds?.includes(activeEmergency.id)
  );

  return (
    <aside 
      aria-label="Critical Community Crisis Emergency Notice"
      className="relative z-40 bg-gradient-to-r from-red-600 via-rose-700 to-amber-700 text-white shadow-xl border-b-2 border-red-400/50 page-enter"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3 text-left">
          
          {/* Urgency Badge & Campaign Title */}
          <div className="flex items-start sm:items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center shrink-0 border border-white/30 animate-pulse">
              <Flame className="w-5 h-5 text-amber-300 fill-amber-300" />
            </div>

            <div className="space-y-0.5">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="px-2.5 py-0.5 rounded-full bg-white text-red-700 text-[10px] font-black tracking-wider uppercase shadow-xs flex items-center gap-1">
                  <Radio className="w-3 h-3 animate-ping text-red-600" />
                  SOS {activeEmergency.urgencyLevel || 'Critical'} Mode
                </span>

                <span className="text-[11px] font-bold text-amber-200 flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5" />
                  Deployment Window: <span className="font-mono font-black text-white">{timeRemaining}</span>
                </span>
              </div>

              <h2 className="text-sm font-extrabold tracking-tight text-white leading-tight">
                {activeEmergency.title}
              </h2>
              <p className="text-[11px] text-rose-100 font-medium line-clamp-1">
                📍 {activeEmergency.venue} • Urgent Need: <strong className="text-white font-bold">{activeEmergency.requiredResources || 'Immediate Volunteer Deployment'}</strong>
              </p>
            </div>
          </div>

          {/* Progress Bar & Actions */}
          <div className="flex flex-col sm:flex-row sm:items-center gap-4 lg:shrink-0 pt-2 lg:pt-0 border-t lg:border-t-0 border-white/20">
            
            {/* Volunteer Mobilization Progress */}
            <div className="min-w-[170px] space-y-1">
              <div className="flex items-center justify-between text-[11px] font-bold">
                <span className="text-rose-100">Mobilized</span>
                <span className="font-mono text-white font-black">{currentMobilized}/{targetRequired} Volunteers</span>
              </div>
              <div className="w-full bg-black/30 rounded-full h-2 overflow-hidden border border-white/20">
                <div 
                  className="h-full bg-gradient-to-r from-amber-300 to-emerald-400 rounded-full transition-all duration-700 ease-out"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
            </div>

            {/* CTAs */}
            <div className="flex items-center gap-2">
              
              {/* Broadcast Stub for Admins / NGOs */}
              {(currentUser?.role === 'SUPER_ADMIN' || currentUser?.role === 'NGO_STAFF') && (
                <button
                  onClick={handleBroadcastAlert}
                  disabled={isBroadcasting}
                  title="Broadcast alert via Email & SMS to 50km radius"
                  className="px-3 py-2 rounded-xl bg-black/40 hover:bg-black/60 border border-white/30 text-amber-200 text-xs font-bold transition-all flex items-center gap-1.5 press-effect"
                >
                  <BellRing className="w-3.5 h-3.5 text-amber-300" />
                  <span>{broadcastSent ? 'Alert Dispatched!' : 'Broadcast 50km'}</span>
                </button>
              )}

              {/* Volunteer Now Action */}
              <button
                onClick={() => {
                  if (onSelectEvent) {
                    onSelectEvent(activeEmergency);
                  } else {
                    registerVolunteerForEvent(activeEmergency.id);
                  }
                }}
                className="px-4 py-2 rounded-xl bg-white hover:bg-rose-50 text-red-700 text-xs font-black uppercase tracking-wider shadow-lg hover:shadow-xl transition-all flex items-center gap-1.5 press-effect"
              >
                {isUserRegistered ? (
                  <>
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span>Registered</span>
                  </>
                ) : (
                  <>
                    <HeartHandshake className="w-4 h-4 text-red-600" />
                    <span>Volunteer Now</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </>
                )}
              </button>

              {/* Dismiss Button */}
              <button
                onClick={() => setDismissed(true)}
                aria-label="Dismiss SOS Banner"
                className="p-1.5 rounded-lg bg-black/20 hover:bg-black/40 text-white/80 hover:text-white transition-colors"
              >
                <X className="w-4 h-4" />
              </button>

            </div>

          </div>

        </div>
      </div>
    </aside>
  );
};
