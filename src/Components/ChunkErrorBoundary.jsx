import { Component } from "react";
import Icon from "./ui/Icon";

class ChunkErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    // Check if the error is a ChunkLoadError (common during code updates or flaky connections)
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error("ChunkErrorBoundary caught an error:", error, errorInfo);
  }

  handleReload = () => {
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="container-page flex min-h-[50vh] flex-col items-center justify-center py-16 text-center">
          <div className="relative mb-6 flex h-20 w-20 items-center justify-center rounded-2xl border border-red-500/20 bg-red-500/10 text-red-400">
            <Icon name="warning" size={36} />
          </div>
          <h2 className="text-2xl font-black tracking-tight text-ink-hi sm:text-3xl">
            Connection Interrupted
          </h2>
          <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-ink-low sm:text-base">
            We couldn't load the required page resources. This usually happens due to a temporary network drop or application update.
          </p>
          <button
            onClick={this.handleReload}
            className="mt-6 flex items-center gap-2 rounded-xl bg-gradient-to-r from-violet-600 to-violet-500 px-5 py-3 text-sm font-bold text-white shadow-[0_4px_20px_-4px_rgba(139,99,227,0.4)] transition-all duration-200 hover:brightness-110"
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
