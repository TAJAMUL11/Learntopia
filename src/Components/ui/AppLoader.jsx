/**
 * AppLoader — full-screen branded splash shown while auth resolves.
 *
 * Visually matches the instant HTML splash in index.html, so the handoff from
 * "page loading" (pre-React) to "signing in" (React, auth pending) is seamless
 * — the user never sees a blank frame between them.
 */
const AppLoader = () => (
  <div className="fixed inset-0 z-[9999] flex flex-col items-center justify-center gap-[22px] bg-[#0B0713]">
    <img
      src="/favicon.svg"
      alt="Learntopia"
      width={56}
      height={56}
      className="h-14 w-14 drop-shadow-[0_0_22px_rgba(139,99,227,0.55)]"
    />
    <div
      role="status"
      aria-label="Loading"
      className="h-10 w-10 animate-spin rounded-full border-[3px] border-white/12 border-t-[#8b63e3] motion-reduce:animate-none"
    />
  </div>
);

export default AppLoader;
