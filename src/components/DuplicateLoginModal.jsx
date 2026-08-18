import React from 'react';
import { ShieldAlert, Monitor, LogOut, ArrowRight, X, AlertTriangle } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const DuplicateLoginModal = () => {
  const { sessionConflictData, setSessionConflictData, loginUser } = useApp();

  if (!sessionConflictData) return null;

  const { user, existingSession, attemptedEmail, attemptedPassword } = sessionConflictData;

  const handleForceTakeover = () => {
    loginUser(attemptedEmail, attemptedPassword, true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-md glass-panel rounded-3xl border border-amber-300 shadow-float-lg overflow-hidden flex flex-col text-left">
        
        {/* Header */}
        <div className="p-6 bg-gradient-to-r from-amber-600 to-amber-700 text-white relative">
          <button
            onClick={() => setSessionConflictData(null)}
            className="absolute top-4 right-4 p-2 rounded-full bg-black/10 hover:bg-black/20 text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-2 mb-1">
            <ShieldAlert className="w-6 h-6 text-amber-200" />
            <span className="text-xs font-bold text-amber-200 uppercase tracking-widest">
              Active Session Conflict Detected
            </span>
          </div>

          <h2 className="text-xl font-extrabold text-white">
            Duplicate Login Prevented
          </h2>
          <p className="text-xs text-amber-100 mt-1">
            Your account <strong className="text-white">{user.email}</strong> is currently logged in on another device.
          </p>
        </div>

        {/* Body Details */}
        <div className="p-6 space-y-4">
          
          <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 space-y-2 text-xs">
            <div className="flex items-center gap-2 text-amber-900 font-bold">
              <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0" />
              <span>Existing Active Session Details:</span>
            </div>

            <div className="grid grid-cols-2 gap-2 text-slate-700 pt-1">
              <div>
                <p className="text-[10px] font-bold text-slate-400 uppercase">Device Token:</p>
                <p className="font-mono font-bold text-slate-900 truncate">{existingSession.deviceToken}</p>
              </div>
              <div>
                <p className="text-[10px] font-bold text-slate-400 uppercase">Login Timestamp:</p>
                <p className="font-semibold text-slate-900">{existingSession.loginTime}</p>
              </div>
            </div>
            
            <p className="text-[11px] text-amber-800 pt-1">
              Sankalp NGO security policy enforces single active device sessions per user to prevent unauthorized access.
            </p>
          </div>

          <div className="space-y-2">
            <button
              onClick={handleForceTakeover}
              className="w-full py-3 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs shadow-md transition-all flex items-center justify-center gap-2"
            >
              <LogOut className="w-4 h-4" />
              Force Logout Other Device & Take Over Session
            </button>

            <button
              onClick={() => setSessionConflictData(null)}
              className="w-full py-2.5 rounded-xl border border-slate-300 hover:bg-slate-100 text-slate-700 font-bold text-xs transition-all"
            >
              Cancel Login
            </button>
          </div>

        </div>

      </div>
    </div>
  );
};
