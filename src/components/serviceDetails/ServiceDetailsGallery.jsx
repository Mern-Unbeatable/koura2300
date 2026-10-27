import React, { memo, useCallback, useMemo, useState } from 'react';
import { SERVICE_DETAILS_CONTENT } from './serviceDetailsCopy';
import {
  FIRST_PHOTO_NUMBER,
  GALLERY_THUMBNAIL_GRID_CLASS,
  HERO_IMAGE_CLASS,
  HERO_IMAGE_HEIGHT,
  HERO_IMAGE_WIDTH,
  INITIAL_IMAGE_INDEX,
  THUMBNAIL_IMAGE_CLASS,
  THUMBNAIL_IMAGE_HEIGHT,
  buildGalleryImageList,
} from './serviceDetailsData';

const SELECTED_THUMBNAIL_CLASS =
  'min-w-0 w-full overflow-hidden rounded-lg ring-2 ring-brand-orange focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-orange';
const IDLE_THUMBNAIL_CLASS =
  'min-w-0 w-full overflow-hidden rounded-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-orange';

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

const ServiceDetailsGallery = memo(({ image, imageAlt, images }) => {
  const [selectedImageIndex, setSelectedImageIndex] = useState(INITIAL_IMAGE_INDEX);
  const galleryImages = useMemo(() => {
    if (Array.isArray(images) && images.length > 0) {
      return images;
    }

    return buildGalleryImageList(image);
  }, [image, images]);
  const heroImage = galleryImages[selectedImageIndex] ?? galleryImages[0] ?? image;

  return (
    <div className="flex h-full min-h-0 min-w-0 flex-col gap-3 lg:gap-5">
      <img
        src={heroImage}
        alt={imageAlt}
        width={HERO_IMAGE_WIDTH}
        height={HERO_IMAGE_HEIGHT}
        className={HERO_IMAGE_CLASS}
      />
      <div className={`grid gap-3 ${GALLERY_THUMBNAIL_GRID_CLASS}`}>
        {galleryImages.map((galleryImage, imageIndex) => (
          <GalleryThumbnail
            key={`${galleryImage}-${imageIndex}`}
            image={galleryImage}
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
