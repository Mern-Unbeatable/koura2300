import { memo, useCallback, useState } from 'react';
import {
  ADMIN_SERVICE_DETAILS_FIRST_PHOTO,
  ADMIN_SERVICE_DETAILS_HERO_HEIGHT,
  ADMIN_SERVICE_DETAILS_HERO_IMAGE_CLASS,
  ADMIN_SERVICE_DETAILS_HERO_WIDTH,
  ADMIN_SERVICE_DETAILS_THUMB_GRID_CLASS,
  ADMIN_SERVICE_DETAILS_THUMB_HEIGHT,
  ADMIN_SERVICE_DETAILS_THUMB_IMAGE_CLASS,
} from './adminServiceDetailsData';

const NO_THUMBNAIL_SELECTED = null;
const SELECTED_THUMB_CLASS =
  'min-w-0 w-full overflow-hidden rounded-lg ring-2 ring-brand-orange focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-orange';
const IDLE_THUMB_CLASS =
  'min-w-0 w-full overflow-hidden rounded-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-orange';

const GalleryThumbnail = memo(
  ({ image, imageAlt, imageIndex, isSelected, onSelectImage, thumbnailLabel }) => {
    const handleSelect = useCallback(() => {
      onSelectImage(imageIndex);
    }, [imageIndex, onSelectImage]);

    return (
      <button
        type="button"
        onClick={handleSelect}
        aria-label={thumbnailLabel(imageIndex + ADMIN_SERVICE_DETAILS_FIRST_PHOTO)}
        aria-pressed={isSelected}
        className={isSelected ? SELECTED_THUMB_CLASS : IDLE_THUMB_CLASS}
      >
        <img
          src={image}
          alt={imageAlt}
          width={ADMIN_SERVICE_DETAILS_HERO_WIDTH}
          height={ADMIN_SERVICE_DETAILS_THUMB_HEIGHT}
          className={ADMIN_SERVICE_DETAILS_THUMB_IMAGE_CLASS}
        />
      </button>
    );
  },
);

GalleryThumbnail.displayName = 'GalleryThumbnail';

const AdminServiceDetailsGallery = memo(({ copy, gallery, imageAlt }) => {
  const [selectedThumbIndex, setSelectedThumbIndex] = useState(NO_THUMBNAIL_SELECTED);
  const activeImage =
    selectedThumbIndex === NO_THUMBNAIL_SELECTED
      ? gallery.hero
      : gallery.thumbnails[selectedThumbIndex];

  return (
    <div
      role="region"
      aria-label={copy.gallery.regionLabel}
      className="flex min-w-0 flex-col gap-3 min-[768px]:gap-4 min-[1440px]:gap-5"
    >
      <img
        src={activeImage}
        alt={imageAlt}
        width={ADMIN_SERVICE_DETAILS_HERO_WIDTH}
        height={ADMIN_SERVICE_DETAILS_HERO_HEIGHT}
        className={ADMIN_SERVICE_DETAILS_HERO_IMAGE_CLASS}
      />
      <div className={ADMIN_SERVICE_DETAILS_THUMB_GRID_CLASS}>
        {gallery.thumbnails.map((image, imageIndex) => (
          <GalleryThumbnail
            key={`${image}-${imageIndex}`}
            image={image}
            imageAlt={imageAlt}
            imageIndex={imageIndex}
            isSelected={selectedThumbIndex === imageIndex}
            onSelectImage={setSelectedThumbIndex}
            thumbnailLabel={copy.gallery.thumbnailLabel}
          />
        ))}
      </div>
    </div>
  );
});

AdminServiceDetailsGallery.displayName = 'AdminServiceDetailsGallery';

export default AdminServiceDetailsGallery;
