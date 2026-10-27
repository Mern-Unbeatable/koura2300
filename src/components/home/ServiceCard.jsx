import React, { memo, useCallback, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Clock3, Plus, Star } from 'lucide-react';
import { POSTED_MEDIA_DEFAULT_IMAGE } from '../../services/postedMediaStore';
import { LANDING_CONTENT } from './landingContent';

const RATING_STARS = 5;
const SERVICE_IMAGE_WIDTH = 360;
const SERVICE_IMAGE_HEIGHT = 192;
const CATALOG_IMAGE_WIDTH = 367;
const CATALOG_IMAGE_HEIGHT = 208;
const CLOCK_ICON_SIZE = 14;
const STAR_ICON_SIZE = 12;
const ADD_ICON_SIZE = 14;
const CARD_STRETCHED_LINK_CLASS = 'absolute inset-0 z-[1]';
const CARD_ACTION_LAYER_CLASS = 'relative z-[2]';
const CATEGORY_BADGE_CLASS =
  'rounded-full bg-brand-blue px-3 py-1 text-xs font-semibold text-white';
const SUBCATEGORY_BADGE_CLASS =
  'rounded-full bg-[#4f6589] px-3 py-1 text-xs font-semibold text-white';
const ADMIN_EDIT_BUTTON_CLASS = `${CARD_ACTION_LAYER_CLASS} inline-flex flex-1 cursor-pointer items-center justify-center rounded-full bg-brand-orange px-2.5 py-1.5 text-base font-semibold text-white transition-colors hover:bg-brand-orange-dark focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-orange`;
const ADMIN_DELETE_BUTTON_CLASS = `${CARD_ACTION_LAYER_CLASS} inline-flex flex-1 cursor-pointer items-center justify-center rounded-full bg-[#f52e0b] px-2.5 py-1.5 text-base font-semibold text-white transition-colors hover:bg-[#d6280a] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#f52e0b]`;

export const SERVICE_CARD_VARIANTS = {
  DEFAULT: 'default',
  CATALOG: 'catalog',
  ADMIN: 'admin',
};

const VARIANT_STYLES = {
  [SERVICE_CARD_VARIANTS.DEFAULT]: {
    article: 'h-full',
    image: 'h-48',
    description: 'line-clamp-2',
    price: 'text-lg',
    button: 'px-4',
    imageWidth: SERVICE_IMAGE_WIDTH,
    imageHeight: SERVICE_IMAGE_HEIGHT,
  },
  [SERVICE_CARD_VARIANTS.CATALOG]: {
    article: 'h-110',
    image: 'h-52',
    description: 'line-clamp-3',
    price: 'text-xl',
    button: 'px-5',
    imageWidth: CATALOG_IMAGE_WIDTH,
    imageHeight: CATALOG_IMAGE_HEIGHT,
  },
  [SERVICE_CARD_VARIANTS.ADMIN]: {
    article: 'h-full',
    image: 'h-52',
    description: 'line-clamp-3',
    price: 'text-xl',
    button: 'px-5',
    imageWidth: CATALOG_IMAGE_WIDTH,
    imageHeight: CATALOG_IMAGE_HEIGHT,
  },
};

const ServiceCardMedia = memo(({ service, variantStyles, isAdmin }) => {
  const categoryLabel = service.catalogTitle ?? service.category;
  const subcategoryLabel = service.catalogTitle ? service.category : service.subcategory;
  const [imageSrc, setImageSrc] = useState(
    () => service.image || POSTED_MEDIA_DEFAULT_IMAGE,
  );

  useEffect(() => {
    setImageSrc(service.image || POSTED_MEDIA_DEFAULT_IMAGE);
  }, [service.image]);

  const handleImageError = useCallback(() => {
    setImageSrc((current) =>
      current === POSTED_MEDIA_DEFAULT_IMAGE ? current : POSTED_MEDIA_DEFAULT_IMAGE,
    );
  }, []);

  return (
    <div className="relative">
      <img
        src={imageSrc}
        alt={service.imageAlt}
        width={variantStyles.imageWidth}
        height={variantStyles.imageHeight}
        loading="lazy"
        onError={handleImageError}
        className={`w-full object-cover ${variantStyles.image}`}
      />
      <div className="absolute left-3 top-3 z-[1] flex max-w-[calc(100%-1.5rem)] flex-wrap gap-2">
        <span className={CATEGORY_BADGE_CLASS}>{categoryLabel}</span>
        {isAdmin && subcategoryLabel ? (
          <span className={SUBCATEGORY_BADGE_CLASS}>{subcategoryLabel}</span>
        ) : null}
      </div>
    </div>
  );
});

ServiceCardMedia.displayName = 'ServiceCardMedia';

const ServiceCardCartAction = memo(({ service, onAdd, buttonClassName }) => {
  const handleAdd = useCallback(
    (event) => {
      event.preventDefault();
      event.stopPropagation();
      onAdd(service);
    },
    [onAdd, service],
  );

  return (
    <button
      type="button"
      onClick={handleAdd}
      aria-label={`Add ${service.title} to cart`}
      className={`${CARD_ACTION_LAYER_CLASS} flex items-center gap-1 rounded-lg bg-brand-orange py-2 text-sm font-semibold text-white transition-all duration-200 ease-in-out hover:bg-brand-orange-dark focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-orange focus-visible:ring-offset-2 ${buttonClassName}`}
    >
      <Plus size={ADD_ICON_SIZE} aria-hidden="true" />
      {LANDING_CONTENT.services.add}
    </button>
  );
});

ServiceCardCartAction.displayName = 'ServiceCardCartAction';

const ServiceCardAdminActions = memo(({ service, onEdit, onDelete, editLabel, deleteLabel }) => {
  const handleEdit = useCallback(
    (event) => {
      event.preventDefault();
      event.stopPropagation();
      onEdit(service.id);
    },
    [onEdit, service.id],
  );

  const handleDelete = useCallback(
    (event) => {
      event.preventDefault();
      event.stopPropagation();
      onDelete(service.id);
    },
    [onDelete, service.id],
  );

  return (
    <div className="mt-2 flex w-full gap-5">
      <button type="button" className={ADMIN_EDIT_BUTTON_CLASS} onClick={handleEdit}>
        {editLabel}
      </button>
      <button type="button" className={ADMIN_DELETE_BUTTON_CLASS} onClick={handleDelete}>
        {deleteLabel}
      </button>
    </div>
  );
});

ServiceCardAdminActions.displayName = 'ServiceCardAdminActions';

/**
 * Shared presentational card for landing, catalog, and admin service management.
 */
const ServiceCard = memo(
  ({
    service,
    onAdd,
    onEdit,
    onDelete,
    variant = SERVICE_CARD_VARIANTS.DEFAULT,
    detailsPath,
    editLabel = 'Edit',
    deleteLabel = 'Delete',
  }) => {
    const variantStyles = VARIANT_STYLES[variant] ?? VARIANT_STYLES[SERVICE_CARD_VARIANTS.DEFAULT];
    const isAdmin = variant === SERVICE_CARD_VARIANTS.ADMIN;

    return (
      <article
        data-testid={`services-card-${service.id}`}
        className={`relative flex flex-col overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm ${variantStyles.article}`}
      >
        {detailsPath ? (
          <Link
            to={detailsPath}
            aria-label={`View ${service.title}`}
            className={CARD_STRETCHED_LINK_CLASS}
          />
        ) : null}

        <ServiceCardMedia service={service} variantStyles={variantStyles} isAdmin={isAdmin} />

        <div className="flex flex-1 flex-col gap-2 p-4">
          <h3 className="font-semibold text-brand-blue">{service.title}</h3>
          <p className={`${variantStyles.description} text-sm leading-5 text-gray-500`}>
            {service.description}
          </p>
          <span className="mt-1 flex items-center gap-1 text-sm text-gray-500">
            <Clock3 size={CLOCK_ICON_SIZE} aria-hidden="true" />
            {service.duration}
          </span>

          <div className="mt-auto flex items-end justify-between gap-3 pt-3">
            <div>
              <p className={`${variantStyles.price} font-bold text-brand-blue`}>
                Starting at ${service.price}
              </p>
              <div className="flex items-center gap-1">
                <span className="flex text-brand-orange" aria-hidden="true">
                  {Array.from({ length: RATING_STARS }, (_, starIndex) => (
                    <Star key={starIndex} size={STAR_ICON_SIZE} fill="currentColor" />
                  ))}
                </span>
                <span className="text-xs text-gray-500">{service.rating}</span>
              </div>
            </div>

            {isAdmin ? null : (
              <ServiceCardCartAction
                service={service}
                onAdd={onAdd}
                buttonClassName={variantStyles.button}
              />
            )}
          </div>

          {isAdmin ? (
            <ServiceCardAdminActions
              service={service}
              onEdit={onEdit}
              onDelete={onDelete}
              editLabel={editLabel}
              deleteLabel={deleteLabel}
            />
          ) : null}
        </div>
      </article>
    );
  },
);

ServiceCard.displayName = 'ServiceCard';

export default ServiceCard;
