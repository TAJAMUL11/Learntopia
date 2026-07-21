import Skeleton, { CardSkeleton } from "./Skeleton";

// Generic full-page loading fallback shown while a lazily-loaded route's code
// (and its data) is still arriving. Neutral shape that suits any page.
const PageSkeleton = () => (
  <div className="container-page py-16 md:py-20" aria-busy="true" aria-label="Loading page">
    {/* Heading block */}
    <div className="mx-auto max-w-2xl text-center">
      <Skeleton className="mx-auto h-3.5 w-24" />
      <Skeleton className="mx-auto mt-4 h-9 w-3/4" />
      <Skeleton className="mx-auto mt-4 h-4 w-full" />
      <Skeleton className="mx-auto mt-2 h-4 w-2/3" />
    </div>

    {/* Content grid */}
    <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: 6 }).map((_, i) => (
        <CardSkeleton key={i} />
      ))}
    </div>
  </div>
);

export default PageSkeleton;
