import React from 'react';
import { CheckCircle2, AlertCircle, Info, AlertTriangle } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const ToastNotification = () => {
  const { toastMessage } = useApp();

  if (!toastMessage) return null;

  const renderIcon = (type) => {
    switch (type) {
      case 'success':
        return <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" />;
      case 'warning':
        return <AlertTriangle className="w-5 h-5 text-amber-500 shrink-0" />;
      case 'error':
        return <AlertCircle className="w-5 h-5 text-red-500 shrink-0" />;
      default:
        return <Info className="w-5 h-5 text-sky-500 shrink-0" />;
    }
  };

  return (
    <div 
      role="status" 
      aria-live="polite" 
      className="fixed bottom-6 right-6 z-50 animate-in slide-in-from-bottom-5 duration-300 pointer-events-none"
    >
      <div className="glass-panel px-4 py-3 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-float-lg flex items-center gap-3 max-w-md pointer-events-auto bg-white/95 dark:bg-slate-900/95 backdrop-blur-md">
        {renderIcon(toastMessage.type)}
        <p className="text-xs font-bold text-slate-800 dark:text-slate-100 text-left">
          {toastMessage.message}
        </p>
      </div>
    </div>
  );
};
