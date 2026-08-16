import React, { memo } from 'react';

/**
 * Serves a WebP candidate with a PNG fallback for older browsers.
 * Layout classes belong on the picture wrapper so absolute positioning works.
 */
const LandingPicture = memo(({ webpSrc, pngSrc, alt, width, height, className }) => (
  <picture className={className}>
    <source srcSet={webpSrc} type="image/webp" />
    <img
      src={pngSrc}
      alt={alt}
      width={width}
      height={height}
      loading="lazy"
      className="h-full w-full object-cover"
    />
  </picture>
));

LandingPicture.displayName = 'LandingPicture';

export default LandingPicture;
