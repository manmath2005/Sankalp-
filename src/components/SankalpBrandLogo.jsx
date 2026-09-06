import React, { useState } from 'react';

/**
 * SankalpBrandLogo - Official circular brand emblem.
 * Represents "Sankalp: Connecting Help to Hope"
 */
export const SankalpBrandLogo = ({ size = "md", className = "" }) => {
  const [imageError, setImageError] = useState(false);

  const sizeMap = {
    xs: "w-6 h-6",
    sm: "w-7 h-7",
    md: "w-8 h-8 sm:w-9 sm:h-9",
    lg: "w-10 h-10 sm:w-11 sm:h-11",
    xl: "w-14 h-14",
    "2xl": "w-20 h-20"
  };

  const dim = sizeMap[size] || sizeMap.md;

  return (
    <div className={`relative ${dim} rounded-full bg-white dark:bg-slate-900 p-0.5 shadow-md shadow-sky-500/20 group-hover:scale-105 group-hover:shadow-sky-500/35 transition-all duration-300 shrink-0 border border-sky-200 dark:border-sky-800/80 overflow-hidden flex items-center justify-center ${className}`}>
      {!imageError ? (
        <img
          src="/sankalp_logo.png"
          alt="Sankalp Logo"
          onError={() => setImageError(true)}
          className="w-full h-full object-contain rounded-full bg-white select-none"
        />
      ) : (
        <div className="w-full h-full rounded-full bg-gradient-to-tr from-sky-600 via-indigo-600 to-emerald-500 flex items-center justify-center text-white font-black text-xs">
          S
        </div>
      )}
    </div>
  );
};
