import { Component } from "react";
import Icon from "./ui/Icon";
import { reportError } from "../lib/monitoring";

class ChunkErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, isChunk: false };
  }

  static getDerivedStateFromError(error) {
    // Separate a chunk/network failure (self-healing, network-sounding copy)
    // from a genuine render crash (generic copy), so the message isn't
    // misleading — a crash is not a "connection" problem.
    return { hasError: true, isChunk: ChunkErrorBoundary.isChunkError(error) };
  }

  // A stale-chunk error happens when a new version is deployed while a user has
  // the app open: their cached index.html asks for JS chunks whose hashes no
  // longer exist. Detect that case so we can silently self-heal with a reload.
  static isChunkError(error) {
    const msg = (error && error.message) || "";
    const name = (error && error.name) || "";
    return (
      name === "ChunkLoadError" ||
      /Loading chunk [\w-]+ failed/i.test(msg) ||
      /Loading CSS chunk/i.test(msg) ||
      /(failed to fetch|error loading) dynamically imported module/i.test(msg) ||
      /import.*module.*(text\/html|MIME)/i.test(msg)
    );
  }

  componentDidCatch(error, errorInfo) {
    console.error("ChunkErrorBoundary caught an error:", error, errorInfo);

    // Report to error monitoring (no-op unless Sentry is configured). A stale
    // chunk error is expected/self-healing, so only report real render crashes.
    if (!ChunkErrorBoundary.isChunkError(error)) {
      reportError(error, { componentStack: errorInfo?.componentStack });
    }

    // For a stale-chunk error, reload once to pull the new index.html + chunks.
    // A sessionStorage timestamp guards against a reload loop if it keeps failing.
    if (ChunkErrorBoundary.isChunkError(error)) {
      try {
        const last = Number(sessionStorage.getItem("ltp_chunk_reload_at") || 0);
        if (Date.now() - last > 10000) {
          sessionStorage.setItem("ltp_chunk_reload_at", String(Date.now()));
          window.location.reload();
        }
      } catch {
        window.location.reload();
      }
    }
  }

  componentDidUpdate(prevProps) {
    if (this.state.hasError && prevProps.children !== this.props.children) {
      this.setState({ hasError: false, isChunk: false });
    }
  }

  handleReload = () => {
    this.setState({ hasError: false });
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      const isChunk = this.state.isChunk;
      return (
        <div className="container-page flex min-h-[50vh] flex-col items-center justify-center py-16 text-center">
          <div className="relative mb-6 flex h-20 w-20 items-center justify-center rounded-2xl border border-state-danger/20 bg-state-danger/10 text-state-danger">
            <Icon name="warning" size={36} />
          </div>
          <h2 className="text-2xl font-black tracking-tight text-ink-hi sm:text-3xl">
            {isChunk ? "Connection Interrupted" : "Something went wrong"}
          </h2>
          <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-ink-low sm:text-base">
            {isChunk
              ? "We couldn't load the required page resources. This usually happens after a temporary network drop or an app update."
              : "An unexpected error interrupted this page. Reloading usually fixes it."}
          </p>
          <button
            onClick={this.handleReload}
            className="mt-6 flex items-center gap-2 rounded-xl bg-violet-600 px-5 py-3 text-sm font-bold text-white shadow-clay-btn transition-all duration-200 hover:bg-violet-500"
          >
            <Icon name="refresh-cw" size={16} />
            Reload Page
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ChunkErrorBoundary;
