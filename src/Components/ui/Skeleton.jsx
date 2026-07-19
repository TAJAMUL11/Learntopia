// Content-shaped loading placeholders with a soft shimmer (see .skeleton in
// index.css) so the layout doesn't jump when data arrives.

export const Skeleton = ({ className = "" }) => (
  <div className={`skeleton ${className}`} aria-hidden="true" />
);

// A card-shaped placeholder that mirrors the course card footprint.
export const CardSkeleton = ({ className = "" }) => (
  <div className={`glass rounded-2xl p-5 shadow-card ${className}`} aria-hidden="true">
    <Skeleton className="mb-4 h-28 w-full rounded-xl" />
    <Skeleton className="mb-3 h-5 w-3/5" />
    <Skeleton className="mb-2 h-3 w-full" />
    <Skeleton className="mb-5 h-3 w-4/5" />
    <div className="flex items-center justify-between border-t border-white/[0.07] pt-4">
      <Skeleton className="h-3 w-24" />
      <Skeleton className="h-8 w-20 rounded-lg" />
    </div>
  </div>
);

export default Skeleton;
