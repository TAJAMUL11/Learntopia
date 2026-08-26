// Stored badges keep their English name as their Firestore identity (the source
// of truth used for dedupe, rules, and the leaderboard mirror), but their
// DISPLAY name + tooltip are localized. This is the single source of truth for
// that mapping, shared by the dashboard medallions and the celebration overlay
// so a badge reads the same in every language everywhere it appears.
//
// Maps a stored badge name to its i18n key stem under `dashboard`
// (t("dashboard.ach<Stem>") for the label, "...Desc" for the tooltip). An
// unmapped name falls back to its raw stored value, so a future badge still
// shows something sensible instead of a bare key path.
export const BADGE_I18N = {
  "Perfect Score": "PerfectScore",
  "Sharp Memory": "SharpMemory",
  "Streak Master": "StreakMaster",
  "Python Pioneer": "PythonPioneer",
  "Math Wizard": "MathWizard",
  "Cash Master": "CashMaster",
  "Brand Genius": "BrandGenius",
  "Web Architect": "WebArchitect",
  "Digital Picasso": "DigitalPicasso",
};

// Localized badge label; falls back to the raw name when unmapped.
export const localizeBadgeName = (name, t) => {
  const stem = BADGE_I18N[name];
  return stem ? t(`dashboard.ach${stem}`) : name;
};

// Localized badge tooltip; falls back to `fallback` (or the name) when unmapped.
export const localizeBadgeDesc = (name, t, fallback) => {
  const stem = BADGE_I18N[name];
  return stem ? t(`dashboard.ach${stem}Desc`) : fallback;
};
