import React from "react";

/**
 * BotAvatar — Custom vector SVG robot avatars for AI Tutors.
 * Provides unique, kid-friendly, colorful vector designs for each tutor persona:
 * - Robo-Py (Coding / Python)
 * - Count AI-Cula (Math)
 * - CoinBot (Financial Literacy)
 * - PixelBot (HTML / CSS Web Design)
 * - MarketBot (Digital Marketing)
 * - ArtBot (Digital Art & Design)
 */
const BOT_THEMES = {
  "Robo-Py": {
    bg: "from-cyan-500/20 via-sky-500/10 to-blue-600/20 border-cyan-500/40",
    glow: "shadow-[0_0_20px_rgba(6,182,212,0.35)]",
    svg: (
      <svg viewBox="0 0 100 100" className="w-full h-full">
        <defs>
          <linearGradient id="roboPyBody" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#06b6d4" />
            <stop offset="100%" stopColor="#0284c7" />
          </linearGradient>
          <linearGradient id="roboPyVisor" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#0f172a" />
            <stop offset="100%" stopColor="#1e293b" />
          </linearGradient>
        </defs>
        {/* Antennas */}
        <line x1="50" y1="20" x2="50" y2="10" stroke="#38bdf8" strokeWidth="4" strokeLinecap="round" />
        <circle cx="50" cy="8" r="4" fill="#38bdf8" className="animate-pulse" />
        <path d="M 22 42 Q 15 42 15 50 Q 15 58 22 58" fill="none" stroke="#06b6d4" strokeWidth="4" strokeLinecap="round" />
        <path d="M 78 42 Q 85 42 85 50 Q 85 58 78 58" fill="none" stroke="#06b6d4" strokeWidth="4" strokeLinecap="round" />
        {/* Head */}
        <rect x="22" y="20" width="56" height="52" rx="16" fill="url(#roboPyBody)" stroke="#38bdf8" strokeWidth="2.5" />
        {/* Visor */}
        <rect x="28" y="30" width="44" height="26" rx="8" fill="url(#roboPyVisor)" stroke="#06b6d4" strokeWidth="1.5" />
        {/* Eyes */}
        <circle cx="40" cy="43" r="5" fill="#38bdf8" />
        <circle cx="40" cy="43" r="2" fill="#ffffff" />
        <circle cx="60" cy="43" r="5" fill="#38bdf8" />
        <circle cx="60" cy="43" r="2" fill="#ffffff" />
        {/* Smile */}
        <path d="M 42 62 Q 50 67 58 62" fill="none" stroke="#38bdf8" strokeWidth="3" strokeLinecap="round" />
        {/* Chest code accent */}
        <rect x="36" y="74" width="28" height="14" rx="4" fill="#0f172a" stroke="#38bdf8" strokeWidth="1.5" />
        <text x="50" y="84" textAnchor="middle" fill="#38bdf8" fontSize="9" fontWeight="bold" fontFamily="monospace">&lt;/&gt;</text>
      </svg>
    ),
  },
  "Count AI-Cula": {
    bg: "from-purple-500/20 via-violet-500/10 to-indigo-600/20 border-purple-500/40",
    glow: "shadow-[0_0_20px_rgba(168,85,247,0.35)]",
    svg: (
      <svg viewBox="0 0 100 100" className="w-full h-full">
        <defs>
          <linearGradient id="mathBody" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#a855f7" />
            <stop offset="100%" stopColor="#6366f1" />
          </linearGradient>
        </defs>
        {/* Star Antenna */}
        <line x1="50" y1="20" x2="50" y2="10" stroke="#c084fc" strokeWidth="4" strokeLinecap="round" />
        <polygon points="50,4 52,9 57,9 53,12 55,17 50,14 45,17 47,12 43,9 48,9" fill="#fde047" />
        {/* Head */}
        <rect x="22" y="20" width="56" height="52" rx="18" fill="url(#mathBody)" stroke="#c084fc" strokeWidth="2.5" />
        {/* Glasses */}
        <circle cx="38" cy="42" r="10" fill="#1e1b4b" stroke="#fde047" strokeWidth="2.5" />
        <circle cx="62" cy="42" r="10" fill="#1e1b4b" stroke="#fde047" strokeWidth="2.5" />
        <line x1="48" y1="42" x2="52" y2="42" stroke="#fde047" strokeWidth="2.5" />
        {/* Eyes inside glasses */}
        <circle cx="38" cy="42" r="4" fill="#a855f7" />
        <circle cx="62" cy="42" r="4" fill="#a855f7" />
        {/* Cute Vampish Smile */}
        <path d="M 40 60 Q 50 67 60 60" fill="none" stroke="#fde047" strokeWidth="2.5" strokeLinecap="round" />
        <polygon points="46,60 48,64 50,60" fill="#ffffff" />
        <polygon points="50,60 52,64 54,60" fill="#ffffff" />
        {/* Chest Math Symbol */}
        <rect x="36" y="74" width="28" height="14" rx="4" fill="#1e1b4b" stroke="#fde047" strokeWidth="1.5" />
        <text x="50" y="85" textAnchor="middle" fill="#fde047" fontSize="11" fontWeight="extrabold">∑</text>
      </svg>
    ),
  },
  "CoinBot": {
    bg: "from-emerald-500/20 via-teal-500/10 to-green-600/20 border-emerald-500/40",
    glow: "shadow-[0_0_20px_rgba(16,185,129,0.35)]",
    svg: (
      <svg viewBox="0 0 100 100" className="w-full h-full">
        <defs>
          <linearGradient id="coinBody" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#10b981" />
            <stop offset="100%" stopColor="#059669" />
          </linearGradient>
        </defs>
        {/* Coin Antenna */}
        <line x1="50" y1="20" x2="50" y2="12" stroke="#34d399" strokeWidth="4" strokeLinecap="round" />
        <circle cx="50" cy="9" r="6" fill="#fbbf24" stroke="#f59e0b" strokeWidth="1.5" />
        {/* Head */}
        <rect x="22" y="20" width="56" height="52" rx="16" fill="url(#coinBody)" stroke="#34d399" strokeWidth="2.5" />
        {/* Coin Slot Visor */}
        <rect x="28" y="30" width="44" height="24" rx="8" fill="#064e3b" stroke="#34d399" strokeWidth="1.5" />
        <circle cx="40" cy="42" r="5" fill="#34d399" />
        <circle cx="40" cy="42" r="2" fill="#ffffff" />
        <circle cx="60" cy="42" r="5" fill="#34d399" />
        <circle cx="60" cy="42" r="2" fill="#ffffff" />
        {/* Smile */}
        <path d="M 42 61 Q 50 66 58 61" fill="none" stroke="#34d399" strokeWidth="2.5" strokeLinecap="round" />
        {/* Chest Dollar Badge */}
        <circle cx="50" cy="81" r="9" fill="#fbbf24" stroke="#f59e0b" strokeWidth="1.5" />
        <text x="50" y="85" textAnchor="middle" fill="#78350f" fontSize="11" fontWeight="extrabold">$</text>
      </svg>
    ),
  },
  "PixelBot": {
    bg: "from-sky-500/20 via-indigo-500/10 to-purple-600/20 border-sky-500/40",
    glow: "shadow-[0_0_20px_rgba(56,189,248,0.35)]",
    svg: (
      <svg viewBox="0 0 100 100" className="w-full h-full">
        <defs>
          <linearGradient id="pixelBody" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#38bdf8" />
            <stop offset="100%" stopColor="#818cf8" />
          </linearGradient>
        </defs>
        {/* HTML Antenna */}
        <line x1="50" y1="20" x2="50" y2="10" stroke="#7dd3fc" strokeWidth="4" strokeLinecap="round" />
        <rect x="44" y="4" width="12" height="10" rx="3" fill="#38bdf8" />
        {/* Head */}
        <rect x="22" y="20" width="56" height="52" rx="14" fill="url(#pixelBody)" stroke="#7dd3fc" strokeWidth="2.5" />
        {/* Grid Visor */}
        <rect x="28" y="30" width="44" height="26" rx="6" fill="#0f172a" stroke="#38bdf8" strokeWidth="1.5" />
        {/* Pixel Eyes */}
        <rect x="36" y="38" width="8" height="8" rx="2" fill="#38bdf8" />
        <rect x="56" y="38" width="8" height="8" rx="2" fill="#38bdf8" />
        {/* Smile */}
        <path d="M 42 62 Q 50 67 58 62" fill="none" stroke="#7dd3fc" strokeWidth="2.5" strokeLinecap="round" />
        {/* Chest Palette */}
        <rect x="36" y="74" width="28" height="14" rx="4" fill="#0f172a" stroke="#7dd3fc" strokeWidth="1.5" />
        <circle cx="43" cy="81" r="2.5" fill="#f43f5e" />
        <circle cx="50" cy="81" r="2.5" fill="#eab308" />
        <circle cx="57" cy="81" r="2.5" fill="#06b6d4" />
      </svg>
    ),
  },
  "MarketBot": {
    bg: "from-amber-500/20 via-orange-500/10 to-yellow-600/20 border-amber-500/40",
    glow: "shadow-[0_0_20px_rgba(245,158,11,0.35)]",
    svg: (
      <svg viewBox="0 0 100 100" className="w-full h-full">
        <defs>
          <linearGradient id="marketBody" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#f59e0b" />
            <stop offset="100%" stopColor="#ea580c" />
          </linearGradient>
        </defs>
        {/* Rocket Arrow Antenna */}
        <line x1="50" y1="20" x2="50" y2="12" stroke="#fbbf24" strokeWidth="4" strokeLinecap="round" />
        <polygon points="50,4 56,12 44,12" fill="#f59e0b" stroke="#fef08a" strokeWidth="1" />
        {/* Head */}
        <rect x="22" y="20" width="56" height="52" rx="16" fill="url(#marketBody)" stroke="#fef08a" strokeWidth="2.5" />
        {/* Visor */}
        <rect x="28" y="30" width="44" height="24" rx="8" fill="#451a03" stroke="#fef08a" strokeWidth="1.5" />
        <circle cx="40" cy="42" r="5" fill="#fbbf24" />
        <circle cx="40" cy="42" r="2" fill="#ffffff" />
        <circle cx="60" cy="42" r="5" fill="#fbbf24" />
        <circle cx="60" cy="42" r="2" fill="#ffffff" />
        {/* Wide Energetic Smile */}
        <path d="M 40 60 Q 50 68 60 60" fill="none" stroke="#fef08a" strokeWidth="3" strokeLinecap="round" />
        {/* Chest Chart Badge */}
        <rect x="36" y="74" width="28" height="14" rx="4" fill="#451a03" stroke="#fef08a" strokeWidth="1.5" />
        <polyline points="40,84 45,80 50,82 58,77" fill="none" stroke="#22c55e" strokeWidth="2" strokeLinecap="round" />
      </svg>
    ),
  },
  "ArtBot": {
    bg: "from-rose-500/20 via-pink-500/10 to-fuchsia-600/20 border-rose-500/40",
    glow: "shadow-[0_0_20px_rgba(244,63,94,0.35)]",
    svg: (
      <svg viewBox="0 0 100 100" className="w-full h-full">
        <defs>
          <linearGradient id="artBody" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#f43f5e" />
            <stop offset="100%" stopColor="#c026d3" />
          </linearGradient>
        </defs>
        {/* Paintbrush Antenna */}
        <line x1="50" y1="20" x2="50" y2="12" stroke="#fda4af" strokeWidth="4" strokeLinecap="round" />
        <path d="M 47 12 C 47 6, 53 6, 53 12 Z" fill="#e11d48" />
        {/* Head */}
        <rect x="22" y="20" width="56" height="52" rx="18" fill="url(#artBody)" stroke="#fda4af" strokeWidth="2.5" />
        {/* Visor */}
        <rect x="28" y="30" width="44" height="24" rx="8" fill="#4c0519" stroke="#fda4af" strokeWidth="1.5" />
        {/* Sparkle Eyes */}
        <circle cx="40" cy="42" r="5" fill="#f43f5e" />
        <circle cx="40" cy="42" r="2" fill="#ffffff" />
        <circle cx="60" cy="42" r="5" fill="#f43f5e" />
        <circle cx="60" cy="42" r="2" fill="#ffffff" />
        {/* Cute Blush & Smile */}
        <circle cx="34" cy="48" r="3" fill="#fb7185" opacity="0.6" />
        <circle cx="66" cy="48" r="3" fill="#fb7185" opacity="0.6" />
        <path d="M 42 60 Q 50 65 58 60" fill="none" stroke="#fda4af" strokeWidth="2.5" strokeLinecap="round" />
        {/* Chest Sparkle */}
        <circle cx="50" cy="81" r="7" fill="#4c0519" stroke="#fda4af" strokeWidth="1.5" />
        <polygon points="50,76 51,80 55,81 51,82 50,86 49,82 45,81 49,80" fill="#fde047" />
      </svg>
    ),
  },
};

const NAME_MAP = {
  "Robo-Py": "Robo-Py",
  "RoboPy": "Robo-Py",
  "Count AI-Cula": "Count AI-Cula",
  "Count AICula": "Count AI-Cula",
  "Penny Bot": "CoinBot",
  "CoinBot": "CoinBot",
  "Coin Bot": "CoinBot",
  "WebWeaver": "PixelBot",
  "PixelBot": "PixelBot",
  "Viral AI": "MarketBot",
  "MarketBot": "MarketBot",
  "Market Bot": "MarketBot",
  "Pixel Bot": "ArtBot",
  "ArtBot": "ArtBot",
  "Art Bot": "ArtBot",
};

const BotAvatar = ({ name = "Robo-Py", size = "md", className = "" }) => {
  const key = NAME_MAP[name] || "Robo-Py";
  const theme = BOT_THEMES[key] || BOT_THEMES["Robo-Py"];

  const sizeClasses = {
    sm: "w-10 h-10 p-1.5",
    md: "w-20 h-20 p-2.5",
    lg: "w-24 h-24 p-3",
  }[size] || "w-20 h-20 p-2.5";

  return (
    <div
      className={`relative flex items-center justify-center rounded-full bg-gradient-to-br border ${theme.bg} ${theme.glow} transition-transform duration-300 hover:scale-105 ${sizeClasses} ${className}`}
    >
      {theme.svg}
    </div>
  );
};

export default BotAvatar;
