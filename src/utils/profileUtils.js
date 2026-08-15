/**
 * profileUtils.js
 * Utility helper to safely parse custom displayName and avatarId from user profile documents.
 * Supports direct `displayName` and `avatarId` fields as well as encoded `fullName` ("Name|avatarId")
 * for 100% compatibility with strict remote Firestore security rules.
 */

export const parseProfileName = (docData, fallbackName = "Learner") => {
  if (!docData) {
    return { displayName: fallbackName, avatarId: null };
  }

  let displayName = docData.displayName || "";
  let avatarId = docData.avatarId || null;

  const rawFullName = docData.fullName || "";
  if (rawFullName.includes("|")) {
    const parts = rawFullName.split("|");
    if (!displayName) displayName = parts[0] || "";
    if (!avatarId) avatarId = parts[1] || null;
  } else if (!displayName && rawFullName) {
    displayName = rawFullName;
  }

  if (!displayName || displayName === "New User") {
    displayName = fallbackName;
  }

  return { displayName, avatarId };
};
