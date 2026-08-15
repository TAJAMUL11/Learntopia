/**
 * avatarData.jsx
 * 16 clean, modern, minimalist HEADSHOT vector avatars for kids & teens.
 * Designed with simple geometric shapes, soft pastel background circles,
 * and high aesthetic clarity (Duolingo / Figma style) without over-styling.
 *
 * Categories: "feminine" | "masculine"
 */

// ── Feminine Headshots ───────────────────────────────────────────────────────

const feminineAvatars = [
  {
    id: "astro-girl",
    label: "Space Explorer",
    category: "feminine",
    svg: (size = 48) => (
      <svg viewBox="0 0 100 100" width={size} height={size} fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Soft Circle Background */}
        <circle cx="50" cy="50" r="46" fill="#EEF2FF" stroke="#C7D2FE" strokeWidth="2" />
        {/* Suit Collar */}
        <path d="M30 82 C30 72 40 68 50 68 C60 68 70 72 70 82 V96 H30 V82Z" fill="#6366F1" />
        <path d="M42 68 L50 76 L58 68" stroke="#38BDF8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
        {/* Helmet Outer */}
        <circle cx="50" cy="46" r="28" fill="#FFFFFF" stroke="#CBD5E1" strokeWidth="2" />
        {/* Face inside helmet */}
        <circle cx="50" cy="46" r="21" fill="#FDE68A" />
        {/* Bangs */}
        <path d="M34 38 Q50 30 66 38 Q58 42 50 40 Q42 42 34 38Z" fill="#312E81" />
        {/* Eyes */}
        <circle cx="42" cy="46" r="2.5" fill="#1E1B4B" />
        <circle cx="58" cy="46" r="2.5" fill="#1E1B4B" />
        <circle cx="43" cy="45" r="0.8" fill="#FFFFFF" />
        <circle cx="59" cy="45" r="0.8" fill="#FFFFFF" />
        {/* Smile */}
        <path d="M45 52 Q50 56 55 52" stroke="#9A3412" strokeWidth="1.8" strokeLinecap="round" fill="none" />
        {/* Visor Glare */}
        <path d="M32 38 Q50 28 68 38" stroke="#38BDF8" strokeWidth="2.5" strokeLinecap="round" opacity="0.7" fill="none" />
      </svg>
    ),
  },
  {
    id: "pixel-princess",
    label: "Cyber Princess",
    category: "feminine",
    svg: (size = 48) => (
      <svg viewBox="0 0 100 100" width={size} height={size} fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Soft Circle Background */}
        <circle cx="50" cy="50" r="46" fill="#FCE7F3" stroke="#F472B6" strokeWidth="2" />
        {/* Pink Flowing Hair */}
        <path d="M24 45 Q20 70 28 92 Q50 96 72 92 Q80 70 76 45 Q70 24 50 24 Q30 24 24 45Z" fill="#EC4899" />
        {/* Dress Top */}
        <path d="M32 78 Q50 72 68 78 V96 H32 V78Z" fill="#F472B6" />
        {/* Face */}
        <circle cx="50" cy="48" r="20" fill="#FED7AA" />
        {/* Bangs */}
        <path d="M32 38 Q42 32 50 40 Q58 32 68 38 Q60 28 50 28 Q40 28 32 38Z" fill="#BE123C" />
        {/* Simple Tiara */}
        <path d="M38 24 L44 14 L50 21 L56 14 L62 24 Z" fill="#FBBF24" />
        <circle cx="50" cy="16" r="1.5" fill="#EF4444" />
        {/* Eyes */}
        <circle cx="43" cy="48" r="2.5" fill="#431407" />
        <circle cx="57" cy="48" r="2.5" fill="#431407" />
        <circle cx="44" cy="47" r="0.8" fill="#FFFFFF" />
        <circle cx="58" cy="47" r="0.8" fill="#FFFFFF" />
        {/* Blush */}
        <circle cx="38" cy="53" r="2.5" fill="#F43F5E" opacity="0.4" />
        <circle cx="62" cy="53" r="2.5" fill="#F43F5E" opacity="0.4" />
        {/* Smile */}
        <path d="M45 54 Q50 58 55 54" stroke="#9F1239" strokeWidth="1.8" strokeLinecap="round" fill="none" />
      </svg>
    ),
  },
  {
    id: "skater-girl",
    label: "Skater Star",
    category: "feminine",
    svg: (size = 48) => (
      <svg viewBox="0 0 100 100" width={size} height={size} fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Soft Circle Background */}
        <circle cx="50" cy="50" r="46" fill="#F3E8FF" stroke="#C084FC" strokeWidth="2" />
        {/* Hair Back */}
        <path d="M26 44 Q22 68 28 92 Q50 96 72 92 Q78 68 74 44Z" fill="#7E22CE" />
        {/* Jacket Collar */}
        <path d="M30 78 Q50 70 70 78 V96 H30 V78Z" fill="#A855F7" />
        {/* Face */}
        <circle cx="50" cy="46" r="19" fill="#FECACA" />
        {/* Backwards Cap */}
        <path d="M30 38 C30 22 42 16 50 16 C58 16 70 22 70 38 Z" fill="#F43F5E" />
        <rect x="24" y="38" width="52" height="5" rx="2.5" fill="#E11D48" />
        {/* Sunglasses */}
        <rect x="34" y="42" width="14" height="9" rx="3" fill="#1E293B" />
        <rect x="52" y="42" width="14" height="9" rx="3" fill="#1E293B" />
        <line x1="48" y1="46" x2="52" y2="46" stroke="#F43F5E" strokeWidth="2" />
        {/* Playful Smile */}
        <path d="M44 56 Q50 62 56 56" stroke="#881337" strokeWidth="1.8" strokeLinecap="round" fill="none" />
      </svg>
    ),
  },
  {
    id: "wizard-girl",
    label: "Spell Caster",
    category: "feminine",
    svg: (size = 48) => (
      <svg viewBox="0 0 100 100" width={size} height={size} fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Soft Circle Background */}
        <circle cx="50" cy="50" r="46" fill="#EDE9FE" stroke="#A78BFA" strokeWidth="2" />
        {/* Hair */}
        <path d="M26 48 Q22 72 30 92 Q50 96 70 92 Q78 72 74 48Z" fill="#EC4899" />
        {/* Robe Collar */}
        <path d="M30 78 Q50 72 70 78 V96 H30 V78Z" fill="#6D28D9" />
        {/* Face */}
        <circle cx="50" cy="50" r="19" fill="#FDE68A" />
        {/* Wizard Hat */}
        <path d="M50 4 L68 38 L32 38 Z" fill="#7C3AED" />
        <ellipse cx="50" cy="38" rx="24" ry="5" fill="#5B21B6" />
        <polygon points="50,18 52,22 56,22 53,25 54,29 50,26 46,29 47,25 44,22 48,22" fill="#FDE047" />
        {/* Eyes */}
        <circle cx="43" cy="50" r="2.5" fill="#4C1D95" />
        <circle cx="57" cy="50" r="2.5" fill="#4C1D95" />
        <circle cx="44" cy="49" r="0.8" fill="#FFFFFF" />
        <circle cx="58" cy="49" r="0.8" fill="#FFFFFF" />
        {/* Smile */}
        <path d="M45 56 Q50 60 55 56" stroke="#78350F" strokeWidth="1.8" strokeLinecap="round" fill="none" />
      </svg>
    ),
  },
  {
    id: "music-girl",
    label: "Beat Maker",
    category: "feminine",
    svg: (size = 48) => (
      <svg viewBox="0 0 100 100" width={size} height={size} fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Soft Circle Background */}
        <circle cx="50" cy="50" r="46" fill="#FEF3C7" stroke="#FBBF24" strokeWidth="2" />
        {/* Hair Buns */}
        <circle cx="28" cy="30" r="12" fill="#D97706" />
        <circle cx="72" cy="30" r="12" fill="#D97706" />
        {/* Hair Base */}
        <path d="M26 44 Q22 68 28 92 Q50 96 72 92 Q78 68 74 44Z" fill="#B45309" />
        {/* Hoodie Collar */}
        <path d="M30 78 Q50 70 70 78 V96 H30 V78Z" fill="#DB2777" />
        {/* Face */}
        <circle cx="50" cy="46" r="19" fill="#FED7AA" />
        {/* Headphones Band */}
        <path d="M28 42 Q28 18 50 18 Q72 18 72 42" stroke="#06B6D4" strokeWidth="4" fill="none" strokeLinecap="round" />
        <rect x="20" y="36" width="9" height="16" rx="4.5" fill="#0891B2" />
        <rect x="71" y="36" width="9" height="16" rx="4.5" fill="#0891B2" />
        {/* Eyes */}
        <circle cx="43" cy="46" r="2.5" fill="#431407" />
        <circle cx="57" cy="46" r="2.5" fill="#431407" />
        <circle cx="44" cy="45" r="0.8" fill="#FFFFFF" />
        <circle cx="58" cy="45" r="0.8" fill="#FFFFFF" />
        {/* Smile */}
        <path d="M44 53 Q50 58 56 53" stroke="#78350F" strokeWidth="1.8" strokeLinecap="round" fill="none" />
      </svg>
    ),
  },
  {
    id: "coder-girl",
    label: "Code Queen",
    category: "feminine",
    svg: (size = 48) => (
      <svg viewBox="0 0 100 100" width={size} height={size} fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Soft Circle Background */}
        <circle cx="50" cy="50" r="46" fill="#DCFCE7" stroke="#34D399" strokeWidth="2" />
        {/* Dark Hair Bob */}
        <path d="M26 42 Q20 68 28 92 Q50 96 72 92 Q80 68 74 42 Q68 22 50 22 Q32 22 26 42Z" fill="#1F2937" />
        {/* Sweater Collar */}
        <path d="M30 78 Q50 72 70 78 V96 H30 V78Z" fill="#059669" />
        {/* Face */}
        <circle cx="50" cy="46" r="19" fill="#FECDD3" />
        {/* Bangs */}
        <path d="M32 36 Q50 30 68 36 V40 Q50 34 32 40 Z" fill="#111827" />
        {/* Glasses */}
        <rect x="33" y="40" width="15" height="11" rx="3" fill="#1F2937" stroke="#10B981" strokeWidth="1.5" />
        <rect x="52" y="40" width="15" height="11" rx="3" fill="#1F2937" stroke="#10B981" strokeWidth="1.5" />
        <line x1="48" y1="45" x2="52" y2="45" stroke="#10B981" strokeWidth="2" />
        <circle cx="40.5" cy="45.5" r="1.8" fill="#34D399" />
        <circle cx="59.5" cy="45.5" r="1.8" fill="#34D399" />
        {/* Smile */}
        <path d="M45 55 Q50 59 55 55" stroke="#881337" strokeWidth="1.8" strokeLinecap="round" fill="none" />
      </svg>
    ),
  },
  {
    id: "artist-girl",
    label: "Art Star",
    category: "feminine",
    svg: (size = 48) => (
      <svg viewBox="0 0 100 100" width={size} height={size} fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Soft Circle Background */}
        <circle cx="50" cy="50" r="46" fill="#E0F2FE" stroke="#38BDF8" strokeWidth="2" />
        {/* Auburn Curly Hair */}
        <path d="M24 44 Q20 68 28 92 Q50 96 72 92 Q80 68 76 44Z" fill="#9A3412" />
        {/* Apron Collar */}
        <path d="M30 78 Q50 70 70 78 V96 H30 V78Z" fill="#2563EB" />
        {/* Face */}
        <circle cx="50" cy="46" r="19" fill="#FED7AA" />
        {/* Red Beret */}
        <path d="M28 32 C28 20 42 16 56 18 C70 20 78 26 74 34 C64 38 40 38 28 32Z" fill="#E11D48" />
        <circle cx="50" cy="16" r="2.5" fill="#BE123C" />
        {/* Eyes */}
        <circle cx="43" cy="46" r="2.5" fill="#1E1B4B" />
        <circle cx="57" cy="46" r="2.5" fill="#1E1B4B" />
        <circle cx="44" cy="45" r="0.8" fill="#FFFFFF" />
        <circle cx="58" cy="45" r="0.8" fill="#FFFFFF" />
        {/* Paint Smudge */}
        <ellipse cx="37" cy="52" rx="2.5" ry="1.5" fill="#38BDF8" opacity="0.8" transform="rotate(-15 37 52)" />
        {/* Smile */}
        <path d="M44 54 Q50 59 56 54" stroke="#7C2D12" strokeWidth="1.8" strokeLinecap="round" fill="none" />
      </svg>
    ),
  },
  {
    id: "science-girl",
    label: "Lab Genius",
    category: "feminine",
    svg: (size = 48) => (
      <svg viewBox="0 0 100 100" width={size} height={size} fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Soft Circle Background */}
        <circle cx="50" cy="50" r="46" fill="#F5D0FE" stroke="#E879F9" strokeWidth="2" />
        {/* Ponytail Hair */}
        <path d="M24 44 Q20 68 28 92 Q50 96 72 92 Q80 68 76 44Z" fill="#C084FC" />
        {/* Lab Coat Collar */}
        <path d="M30 78 Q50 72 70 78 V96 H30 V78Z" fill="#F8FAFC" />
        <path d="M42 78 L50 86 L58 78" fill="#38BDF8" />
        {/* Face */}
        <circle cx="50" cy="46" r="19" fill="#FDE68A" />
        {/* Safety Goggles on forehead */}
        <rect x="32" y="26" width="16" height="10" rx="3" fill="#1E293B" stroke="#06B6D4" strokeWidth="1.5" />
        <rect x="52" y="26" width="16" height="10" rx="3" fill="#1E293B" stroke="#06B6D4" strokeWidth="1.5" />
        <line x1="48" y1="31" x2="52" y2="31" stroke="#06B6D4" strokeWidth="2" />
        {/* Eyes */}
        <circle cx="43" cy="46" r="2.5" fill="#431407" />
        <circle cx="57" cy="46" r="2.5" fill="#431407" />
        <circle cx="44" cy="45" r="0.8" fill="#FFFFFF" />
        <circle cx="58" cy="45" r="0.8" fill="#FFFFFF" />
        {/* Smile */}
        <path d="M44 54 Q50 58 56 54" stroke="#78350F" strokeWidth="1.8" strokeLinecap="round" fill="none" />
      </svg>
    ),
  },
];

// ── Masculine Headshots ──────────────────────────────────────────────────────

const masculineAvatars = [
  {
    id: "ninja-boy",
    label: "Cyber Ninja",
    category: "masculine",
    svg: (size = 48) => (
      <svg viewBox="0 0 100 100" width={size} height={size} fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Soft Circle Background */}
        <circle cx="50" cy="50" r="46" fill="#F1F5F9" stroke="#94A3B8" strokeWidth="2" />
        {/* Ninja Suit Shoulders */}
        <path d="M30 78 Q50 72 70 78 V96 H30 V78Z" fill="#1E293B" />
        {/* Ninja Mask Head */}
        <circle cx="50" cy="46" r="22" fill="#0F172A" />
        {/* Red Headband */}
        <rect x="28" y="32" width="44" height="6" rx="2" fill="#EF4444" />
        <path d="M72 32 L84 28 L80 40 Z" fill="#EF4444" />
        {/* Eye Slot */}
        <rect x="34" y="40" width="32" height="12" rx="4" fill="#020617" stroke="#22D3EE" strokeWidth="1.5" />
        {/* Glowing Eyes */}
        <ellipse cx="43" cy="46" rx="3.5" ry="2" fill="#22D3EE" />
        <ellipse cx="57" cy="46" rx="3.5" ry="2" fill="#22D3EE" />
        <circle cx="43" cy="46" r="1" fill="#FFFFFF" />
        <circle cx="57" cy="46" r="1" fill="#FFFFFF" />
      </svg>
    ),
  },
  {
    id: "gamer-boy",
    label: "Pro Gamer",
    category: "masculine",
    svg: (size = 48) => (
      <svg viewBox="0 0 100 100" width={size} height={size} fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Soft Circle Background */}
        <circle cx="50" cy="50" r="46" fill="#DBEAFE" stroke="#60A5FA" strokeWidth="2" />
        {/* Spiky Blue Hair */}
        <path d="M28 40 L34 20 L42 28 L50 14 L58 26 L66 16 L72 38 L70 68 L30 68 Z" fill="#2563EB" />
        {/* Hoodie Collar */}
        <path d="M30 78 Q50 70 70 78 V96 H30 V78Z" fill="#1F2937" />
        {/* Face */}
        <circle cx="50" cy="48" r="19" fill="#FECACA" />
        {/* Hair Front Fringe */}
        <path d="M34 38 L42 42 L50 34 L58 42 L66 36 Q50 28 34 38Z" fill="#1D4ED8" />
        {/* Gaming Headset */}
        <path d="M28 42 Q28 20 50 20 Q72 20 72 42" stroke="#10B981" strokeWidth="4" fill="none" strokeLinecap="round" />
        <rect x="20" y="36" width="9" height="16" rx="4.5" fill="#1E293B" stroke="#10B981" strokeWidth="1.5" />
        <rect x="71" y="36" width="9" height="16" rx="4.5" fill="#1E293B" stroke="#10B981" strokeWidth="1.5" />
        {/* Eyes */}
        <circle cx="43" cy="48" r="2.5" fill="#0F172A" />
        <circle cx="57" cy="48" r="2.5" fill="#0F172A" />
        <circle cx="44" cy="47" r="0.8" fill="#FFFFFF" />
        <circle cx="58" cy="47" r="0.8" fill="#FFFFFF" />
        {/* Grin */}
        <path d="M44 55 Q50 61 56 55" stroke="#7F1D1D" strokeWidth="1.8" strokeLinecap="round" fill="none" />
      </svg>
    ),
  },
  {
    id: "robot-boy",
    label: "Mecha Bot",
    category: "masculine",
    svg: (size = 48) => (
      <svg viewBox="0 0 100 100" width={size} height={size} fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Soft Circle Background */}
        <circle cx="50" cy="50" r="46" fill="#E2E8F0" stroke="#94A3B8" strokeWidth="2" />
        {/* Antenna */}
        <line x1="50" y1="10" x2="50" y2="22" stroke="#64748B" strokeWidth="3" strokeLinecap="round" />
        <circle cx="50" cy="8" r="4" fill="#EF4444" />
        {/* Robot Shoulders */}
        <path d="M30 76 Q50 70 70 76 V96 H30 V76Z" fill="#475569" />
        {/* Robot Head */}
        <rect x="28" y="22" width="44" height="40" rx="10" fill="#94A3B8" stroke="#475569" strokeWidth="2" />
        {/* Screen Face */}
        <rect x="34" y="28" width="32" height="20" rx="6" fill="#0F172A" />
        {/* Glowing Screen Eyes */}
        <rect x="39" y="33" width="9" height="10" rx="2.5" fill="#38BDF8" />
        <rect x="52" y="33" width="9" height="10" rx="2.5" fill="#38BDF8" />
        <circle cx="42.5" cy="36.5" r="1.5" fill="#FFFFFF" />
        <circle cx="55.5" cy="36.5" r="1.5" fill="#FFFFFF" />
        {/* Mouth Grille */}
        <line x1="42" y1="54" x2="58" y2="54" stroke="#22C55E" strokeWidth="2" strokeDasharray="2 2" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    id: "skater-boy",
    label: "Board Rider",
    category: "masculine",
    svg: (size = 48) => (
      <svg viewBox="0 0 100 100" width={size} height={size} fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Soft Circle Background */}
        <circle cx="50" cy="50" r="46" fill="#FFEDD5" stroke="#F97316" strokeWidth="2" />
        {/* Blonde Spiky Hair */}
        <path d="M26 40 L30 18 L40 26 L48 12 L56 24 L68 14 L74 40 L70 68 L30 68 Z" fill="#FBBF24" />
        {/* Hoodie Collar */}
        <path d="M30 78 Q50 70 70 78 V96 H30 V78Z" fill="#EA580C" />
        {/* Face */}
        <circle cx="50" cy="48" r="19" fill="#FDE68A" />
        {/* Hair Front Spikes */}
        <path d="M34 38 L42 42 L50 34 L58 42 L66 36 Q50 28 34 38Z" fill="#D97706" />
        {/* Sunglasses */}
        <rect x="33" y="42" width="15" height="10" rx="3" fill="#1E293B" />
        <rect x="52" y="42" width="15" height="10" rx="3" fill="#1E293B" />
        <line x1="48" y1="46" x2="52" y2="46" stroke="#F97316" strokeWidth="2" />
        {/* Smirk */}
        <path d="M44 56 Q51 60 56 55" stroke="#78350F" strokeWidth="1.8" strokeLinecap="round" fill="none" />
      </svg>
    ),
  },
  {
    id: "explorer-boy",
    label: "Wild Explorer",
    category: "masculine",
    svg: (size = 48) => (
      <svg viewBox="0 0 100 100" width={size} height={size} fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Soft Circle Background */}
        <circle cx="50" cy="50" r="46" fill="#D1FAE5" stroke="#10B981" strokeWidth="2" />
        {/* Hair Back */}
        <path d="M26 44 Q22 68 28 92 Q50 96 72 92 Q78 68 74 44Z" fill="#78350F" />
        {/* Safari Vest Collar */}
        <path d="M30 78 Q50 70 70 78 V96 H30 V78Z" fill="#047857" />
        {/* Face */}
        <circle cx="50" cy="48" r="19" fill="#FED7AA" />
        {/* Explorer Safari Hat */}
        <ellipse cx="50" cy="34" rx="26" ry="5" fill="#B45309" />
        <path d="M32 34 Q32 16 50 16 Q68 16 68 34 Z" fill="#D97706" />
        <rect x="32" y="31" width="36" height="3" fill="#451A03" />
        {/* Eyes */}
        <circle cx="43" cy="48" r="2.5" fill="#1E1B4B" />
        <circle cx="57" cy="48" r="2.5" fill="#1E1B4B" />
        <circle cx="44" cy="47" r="0.8" fill="#FFFFFF" />
        <circle cx="58" cy="47" r="0.8" fill="#FFFFFF" />
        {/* Smile */}
        <path d="M44 55 Q50 60 56 55" stroke="#7C2D12" strokeWidth="1.8" strokeLinecap="round" fill="none" />
      </svg>
    ),
  },
  {
    id: "rocket-boy",
    label: "Rocket Kid",
    category: "masculine",
    svg: (size = 48) => (
      <svg viewBox="0 0 100 100" width={size} height={size} fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Soft Circle Background */}
        <circle cx="50" cy="50" r="46" fill="#CFFAFE" stroke="#06B6D4" strokeWidth="2" />
        {/* Pilot Collar */}
        <path d="M30 78 Q50 70 70 78 V96 H30 V78Z" fill="#2563EB" />
        {/* Space Helmet */}
        <circle cx="50" cy="46" r="28" fill="#F8FAFC" stroke="#CBD5E1" strokeWidth="2" />
        {/* Face Inside Helmet */}
        <circle cx="50" cy="46" r="21" fill="#FECACA" />
        {/* Spiky Brown Hair */}
        <path d="M36 36 L42 28 L48 34 L56 26 L62 34 L66 30 Q50 28 36 36Z" fill="#78350F" />
        {/* Eyes */}
        <circle cx="43" cy="46" r="2.5" fill="#0F172A" />
        <circle cx="57" cy="46" r="2.5" fill="#0F172A" />
        <circle cx="44" cy="45" r="0.8" fill="#FFFFFF" />
        <circle cx="58" cy="45" r="0.8" fill="#FFFFFF" />
        {/* Open Smile */}
        <path d="M44 52 Q50 58 56 52" stroke="#7F1D1D" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" fill="none" />
        {/* Visor Curve Rim */}
        <path d="M32 38 Q50 28 68 38" stroke="#F59E0B" strokeWidth="2.5" opacity="0.8" strokeLinecap="round" fill="none" />
      </svg>
    ),
  },
  {
    id: "sport-boy",
    label: "All-Star",
    category: "masculine",
    svg: (size = 48) => (
      <svg viewBox="0 0 100 100" width={size} height={size} fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Soft Circle Background */}
        <circle cx="50" cy="50" r="46" fill="#FEE2E2" stroke="#F87171" strokeWidth="2" />
        {/* Dark Hair */}
        <path d="M26 44 Q22 68 28 92 Q50 96 72 92 Q78 68 74 44Z" fill="#0F172A" />
        {/* Jersey Collar */}
        <path d="M30 78 Q50 70 70 78 V96 H30 V78Z" fill="#EA580C" />
        {/* Face */}
        <circle cx="50" cy="48" r="19" fill="#D4A373" />
        {/* Red Athletic Headband */}
        <rect x="28" y="32" width="44" height="7" rx="2" fill="#EF4444" />
        <line x1="28" y1="35.5" x2="72" y2="35.5" stroke="#FFFFFF" strokeWidth="1" />
        {/* Eyes */}
        <circle cx="43" cy="48" r="2.5" fill="#0F172A" />
        <circle cx="57" cy="48" r="2.5" fill="#0F172A" />
        <circle cx="44" cy="47" r="0.8" fill="#FFFFFF" />
        <circle cx="58" cy="47" r="0.8" fill="#FFFFFF" />
        {/* Smile */}
        <path d="M44 55 L50 58 L56 55" stroke="#431407" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
      </svg>
    ),
  },
  {
    id: "dino-boy",
    label: "Dino Rider",
    category: "masculine",
    svg: (size = 48) => (
      <svg viewBox="0 0 100 100" width={size} height={size} fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Soft Circle Background */}
        <circle cx="50" cy="50" r="46" fill="#DCFCE7" stroke="#10B981" strokeWidth="2" />
        {/* Green Dino Hood Back */}
        <path d="M24 44 Q20 68 28 92 Q50 96 72 92 Q80 68 76 44Z" fill="#10B981" />
        {/* Hoodie Collar */}
        <path d="M30 78 Q50 70 70 78 V96 H30 V78Z" fill="#047857" />
        {/* Dino Spikes on top */}
        <polygon points="46,14 43,4 51,12" fill="#FDE047" />
        <polygon points="38,18 33,8 43,16" fill="#FDE047" />
        <polygon points="54,18 59,8 49,16" fill="#FDE047" />
        {/* Face inside Dino Hood */}
        <circle cx="50" cy="50" r="19" fill="#FDE68A" />
        {/* Dino Hood Frame */}
        <path d="M28 44 C28 26 40 20 50 20 C60 20 72 26 72 44 C72 48 68 46 68 40 C68 28 60 24 50 24 C40 24 32 28 32 40 C32 46 28 48 28 44 Z" fill="#059669" />
        {/* Eyes */}
        <circle cx="43" cy="48" r="2.5" fill="#1E1B4B" />
        <circle cx="57" cy="48" r="2.5" fill="#1E1B4B" />
        <circle cx="44" cy="47" r="0.8" fill="#FFFFFF" />
        <circle cx="58" cy="47" r="0.8" fill="#FFFFFF" />
        {/* Happy Smile */}
        <path d="M44 55 Q50 61 56 55" stroke="#78350F" strokeWidth="1.8" strokeLinecap="round" fill="none" />
      </svg>
    ),
  },
];

// ── Combined & Exported ──────────────────────────────────────────────────────

export const AVATARS = [...feminineAvatars, ...masculineAvatars];

/** Look up a single avatar by ID. Returns undefined if not found. */
export const getAvatarById = (id) => AVATARS.find((a) => a.id === id);

/** Default avatar ID for brand-new users who haven't picked one yet. */
export const DEFAULT_AVATAR_ID = null;
