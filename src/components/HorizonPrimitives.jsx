import React from 'react';

/**
 * HorizonCard: Frosted obsidian glass container with signature Luminous Horizon rim accent.
 */
export function HorizonCard({ children, className = '', glowTop = true, hover = true, ...props }) {
  return (
    <div
      className={`relative overflow-hidden rounded-2xl border border-slate-800/80 bg-slate-900/75 backdrop-blur-xl shadow-[0_10px_30px_rgba(0,0,0,0.5)] transition-all duration-300 ${
        hover ? 'hover:border-slate-700/80 hover:shadow-[0_0_25px_rgba(245,158,11,0.08)] hover:-translate-y-0.5' : ''
      } ${className}`}
      {...props}
    >
      {glowTop && (
        <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-amber-500/50 via-emerald-500/50 to-blue-500/50 pointer-events-none" />
      )}
      {children}
    </div>
  );
}

/**
 * HorizonGlowDivider: Signature luminous horizon line that segments thematic sections.
 */
export function HorizonGlowDivider({ className = '' }) {
  return (
    <div className={`w-full flex items-center justify-center my-8 ${className}`}>
      <div className="h-[1.5px] w-full max-w-6xl bg-gradient-to-r from-transparent via-amber-500/60 via-emerald-500/50 to-transparent shadow-[0_0_12px_rgba(245,158,11,0.3)]" />
    </div>
  );
}

/**
 * HorizonStatMetric: High-visibility impact counter with illuminated icon and label.
 */
export function HorizonStatMetric({
  icon: Icon,
  value,
  label,
  sublabel,
  variant = 'amber',
  className = '',
}) {
  const variantStyles = {
    amber: {
      glow: 'shadow-[0_0_20px_rgba(245,158,11,0.2)]',
      iconBg: 'bg-amber-500/10 text-amber-400 border-amber-500/30',
      text: 'text-amber-400',
    },
    emerald: {
      glow: 'shadow-[0_0_20px_rgba(16,185,129,0.2)]',
      iconBg: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30',
      text: 'text-emerald-400',
    },
    blue: {
      glow: 'shadow-[0_0_20px_rgba(59,130,246,0.2)]',
      iconBg: 'bg-blue-500/10 text-blue-400 border-blue-500/30',
      text: 'text-blue-400',
    },
  };

  const style = variantStyles[variant] || variantStyles.amber;

  return (
    <div
      className={`relative overflow-hidden rounded-2xl border border-slate-800/80 bg-slate-900/80 p-5 backdrop-blur-xl transition-all duration-300 hover:border-slate-700/80 ${style.glow} ${className}`}
    >
      <div className="flex items-center gap-4">
        {Icon && (
          <div className={`p-3 rounded-xl border ${style.iconBg} shrink-0`}>
            <Icon className="w-6 h-6" />
          </div>
        )}
        <div>
          <div className="text-2xl sm:text-3xl font-black text-white tracking-tight font-display">
            {value}
          </div>
          <div className="text-xs font-bold text-slate-300 uppercase tracking-wider mt-0.5">
            {label}
          </div>
          {sublabel && (
            <div className="text-[11px] text-slate-400 mt-0.5">{sublabel}</div>
          )}
        </div>
      </div>
    </div>
  );
}

/**
 * HorizonBadge: Luminous pill status chip.
 */
export function HorizonBadge({ children, variant = 'emerald', className = '', ...props }) {
  const variants = {
    emerald: 'bg-emerald-500/10 text-emerald-300 border-emerald-500/30',
    amber: 'bg-amber-500/10 text-amber-300 border-amber-500/30',
    blue: 'bg-blue-500/10 text-blue-300 border-blue-500/30',
    slate: 'bg-slate-800/80 text-slate-300 border-slate-700/80',
    red: 'bg-rose-500/10 text-rose-300 border-rose-500/30',
  };

  return (
    <span
      className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold border backdrop-blur-md ${
        variants[variant] || variants.emerald
      } ${className}`}
      {...props}
    >
      {children}
    </span>
  );
}

/**
 * HorizonButton: Radiant CTA or frosted secondary action.
 */
export function HorizonButton({
  children,
  variant = 'primary',
  className = '',
  ...props
}) {
  const variants = {
    primary:
      'bg-gradient-to-r from-amber-500 to-emerald-600 hover:from-amber-400 hover:to-emerald-500 text-slate-950 font-bold shadow-[0_0_20px_rgba(245,158,11,0.25)] border-0',
    secondary:
      'bg-slate-800/80 hover:bg-slate-800 text-white border border-slate-700/80 backdrop-blur-md',
    outline:
      'bg-transparent hover:bg-slate-800/60 text-slate-200 border border-slate-700 hover:border-slate-500',
    urgent:
      'bg-gradient-to-r from-amber-600 to-rose-600 hover:from-amber-500 hover:to-rose-500 text-white font-bold shadow-[0_0_20px_rgba(225,29,72,0.3)]',
  };

  return (
    <button
      className={`inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl font-medium text-sm transition-all duration-200 active:scale-95 disabled:opacity-50 disabled:pointer-events-none ${
        variants[variant] || variants.primary
      } ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
