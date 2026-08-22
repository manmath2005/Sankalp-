import React from 'react';

/**
 * SankalpBrandLogo - Modern, unique brand logo symbol with sleek geometry and glowing gradient.
 * Features interconnected nodes / infinity vow ribbons representing NGO, Corporate, and Volunteer solidarity.
 */
export const SankalpBrandLogo = ({ size = "md", className = "" }) => {
  const sizeMap = {
    sm: "w-7 h-7",
    md: "w-8 h-8 sm:w-9 sm:h-9",
    lg: "w-10 h-10 sm:w-11 sm:h-11",
    xl: "w-12 h-12"
  };

  const dim = sizeMap[size] || sizeMap.md;

  return (
    <div className={`relative ${dim} rounded-xl bg-gradient-to-tr from-sky-600 via-indigo-600 to-emerald-400 p-[1.5px] shadow-lg shadow-sky-500/20 group-hover:scale-105 group-hover:shadow-sky-500/35 transition-all duration-300 shrink-0 ${className}`}>
      <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center p-1 relative overflow-hidden">
        {/* Glow ambient background inside logo */}
        <div className="absolute inset-0 bg-gradient-to-br from-sky-500/20 via-transparent to-emerald-500/20 pointer-events-none" />
        
        {/* Unique SVG Emblem: S-infinity intertwining flame & hands of unity */}
        <svg
          viewBox="0 0 32 32"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full relative z-10 drop-shadow-[0_2px_8px_rgba(56,189,248,0.5)]"
        >
          <defs>
            <linearGradient id="sankalpSkyGradient" x1="2" y1="4" x2="30" y2="28" gradientUnits="userSpaceOnUse">
              <stop stopColor="#38bdf8" />
              <stop offset="0.5" stopColor="#818cf8" />
              <stop offset="1" stopColor="#34d399" />
            </linearGradient>
            <linearGradient id="sankalpAccentGradient" x1="16" y1="2" x2="16" y2="30" gradientUnits="userSpaceOnUse">
              <stop stopColor="#67e8f9" />
              <stop offset="1" stopColor="#059669" />
            </linearGradient>
          </defs>

          {/* Left Wing / NGO Hand */}
          <path
            d="M8 19.5C6.5 17 6 13.5 7.5 10.5C9.2 7 13.5 5.5 17 7.2C19 8.2 20.5 10 21 12.2"
            stroke="url(#sankalpSkyGradient)"
            strokeWidth="2.75"
            strokeLinecap="round"
          />

          {/* Right Wing / Corporate Bridge */}
          <path
            d="M24 12.5C25.5 15 26 18.5 24.5 21.5C22.8 25 18.5 26.5 15 24.8C13 23.8 11.5 22 11 19.8"
            stroke="url(#sankalpSkyGradient)"
            strokeWidth="2.75"
            strokeLinecap="round"
          />

          {/* Core Central Sankalp Knot / Radiant Star */}
          <circle cx="16" cy="16" r="3.2" fill="url(#sankalpAccentGradient)" />
          <circle cx="16" cy="16" r="1.2" fill="#ffffff" />

          {/* Dynamic Top-Right Catalyst Spark */}
          <path
            d="M23 7L24 9.5L26.5 10.5L24 11.5L23 14L22 11.5L19.5 10.5L22 9.5L23 7Z"
            fill="#38bdf8"
            opacity="0.9"
          />
        </svg>
      </div>
    </div>
  );
};
