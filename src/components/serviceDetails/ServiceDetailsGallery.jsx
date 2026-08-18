import React, { memo, useCallback, useState } from 'react';
import { SERVICE_DETAILS_CONTENT } from './serviceDetailsCopy';
import {
  FIRST_PHOTO_NUMBER,
  GALLERY_THUMBNAIL_COUNT,
  GALLERY_THUMBNAIL_GRID_CLASS,
  HERO_IMAGE_CLASS,
  HERO_IMAGE_HEIGHT,
  HERO_IMAGE_WIDTH,
  INITIAL_IMAGE_INDEX,
  THUMBNAIL_IMAGE_CLASS,
  THUMBNAIL_IMAGE_HEIGHT,
} from './serviceDetailsData';

const SELECTED_THUMBNAIL_CLASS =
  'overflow-hidden rounded-lg ring-2 ring-brand-orange focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-orange';
const IDLE_THUMBNAIL_CLASS =
  'overflow-hidden rounded-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-orange';

const GalleryThumbnail = memo(({ image, imageAlt, imageIndex, isSelected, onSelectImage }) => {
  const handleSelect = useCallback(() => {
    onSelectImage(imageIndex);
  }, [imageIndex, onSelectImage]);

  return (
    <button
      type="button"
      onClick={handleSelect}
      aria-label={SERVICE_DETAILS_CONTENT.gallery.thumbnailLabel(imageIndex + FIRST_PHOTO_NUMBER)}
      aria-pressed={isSelected}
      className={isSelected ? SELECTED_THUMBNAIL_CLASS : IDLE_THUMBNAIL_CLASS}
    >
      <img
        src={image}
        alt={imageAlt}
        width={HERO_IMAGE_WIDTH}
        height={THUMBNAIL_IMAGE_HEIGHT}
        className={THUMBNAIL_IMAGE_CLASS}
      />
    </button>
  );
});

GalleryThumbnail.displayName = 'GalleryThumbnail';

const ServiceDetailsGallery = memo(({ image, imageAlt }) => {
  const [selectedImageIndex, setSelectedImageIndex] = useState(INITIAL_IMAGE_INDEX);

  return (
    <div className="flex flex-col gap-5">
      <img
        src={image}
        alt={imageAlt}
        width={HERO_IMAGE_WIDTH}
        height={HERO_IMAGE_HEIGHT}
        className={HERO_IMAGE_CLASS}
      />
      <div className={`grid gap-3 ${GALLERY_THUMBNAIL_GRID_CLASS}`}>
        {Array.from({ length: GALLERY_THUMBNAIL_COUNT }, (_, imageIndex) => (
          <GalleryThumbnail
            key={imageIndex}
            image={image}
            imageAlt={imageAlt}
            imageIndex={imageIndex}
            isSelected={selectedImageIndex === imageIndex}
            onSelectImage={setSelectedImageIndex}
          />
        ))}
      </div>
    </div>
  );
});

ServiceDetailsGallery.displayName = 'ServiceDetailsGallery';

export default ServiceDetailsGallery;
