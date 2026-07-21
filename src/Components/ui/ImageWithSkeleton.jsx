import { useState } from "react";

// Renders a shimmer skeleton in place of an image until it finishes loading,
// then fades the image in. Drop it inside a `relative` container that defines
// the box size (the skeleton fills that box via inset-0).
const ImageWithSkeleton = ({ src, alt = "", imgClassName = "", skeletonClassName = "", ...rest }) => {
  const [loaded, setLoaded] = useState(false);
  return (
    <>
      {!loaded && <span className={`skeleton absolute inset-0 ${skeletonClassName}`} aria-hidden="true" />}
      <img
        src={src}
        alt={alt}
        loading="lazy"
        onLoad={() => setLoaded(true)}
        onError={() => setLoaded(true)}
        // Caller supplies the opacity transition in imgClassName so it can be
        // combined with other transitions (e.g. hover scale) without conflict.
        className={`${imgClassName} ${loaded ? "opacity-100" : "opacity-0"}`}
        {...rest}
      />
    </>
  );
};

export default ImageWithSkeleton;
