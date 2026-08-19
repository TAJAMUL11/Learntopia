/**
 * AppLoader — full-screen branded loader shown while auth resolves.
 *
 * Reuses the same `.app-splash` markup/classes defined in index.html's inline
 * <style>, so the handoff from the pre-React HTML splash to this React loader is
 * seamless (identical orbiting-sparks animation). Reduced motion is respected
 * via the media query in index.html.
 */
const AppLoader = () => (
  <div className="app-splash" role="status" aria-label="Loading">
    <div className="stage">
      <img className="mark" src="/favicon.svg" alt="Learntopia" width={52} height={52} />
      <div className="orbit">
        <span />
        <span />
        <span />
      </div>
    </div>
    <div className="word">
      <b>Learntopia</b>
      <i />
      <i />
      <i />
    </div>
  </div>
);

export default AppLoader;
