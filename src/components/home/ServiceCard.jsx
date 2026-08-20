import React, { memo, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { Clock3, Plus, Star } from 'lucide-react';
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

export const SERVICE_CARD_VARIANTS = {
  DEFAULT: 'default',
  CATALOG: 'catalog',
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
};

const ServiceCardMedia = memo(({ service, variantStyles }) => (
  <div className="relative">
    <img
      src={service.image}
      alt={service.imageAlt}
      width={variantStyles.imageWidth}
      height={variantStyles.imageHeight}
      loading="lazy"
      className={`w-full object-cover ${variantStyles.image}`}
    />
    <span className="absolute left-3 top-3 rounded-full bg-brand-blue px-3 py-1 text-xs font-semibold text-white">
      {service.category}
    </span>
  </div>
));

ServiceCardMedia.displayName = 'ServiceCardMedia';

/**
 * Shared presentational card for a single top-rated service.
 * Section orchestration (cart dispatch, grid layout) stays in TopServices.
 */
const ServiceCard = memo(
  ({ service, onAdd, variant = SERVICE_CARD_VARIANTS.DEFAULT, detailsPath }) => {
    const variantStyles = VARIANT_STYLES[variant] ?? VARIANT_STYLES[SERVICE_CARD_VARIANTS.DEFAULT];

    const handleAdd = useCallback(
      (event) => {
        event.preventDefault();
        event.stopPropagation();
        onAdd(service);
      },
      [onAdd, service],
    );

    return (
      <article
        className={`relative flex flex-col overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm ${variantStyles.article}`}
      >
        {detailsPath ? (
          <Link
            to={detailsPath}
            aria-label={`View ${service.title}`}
            className={CARD_STRETCHED_LINK_CLASS}
          />
        ) : null}

        <ServiceCardMedia service={service} variantStyles={variantStyles} />

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

            <button
              type="button"
              onClick={handleAdd}
              aria-label={`Add ${service.title} to cart`}
              className={`${CARD_ACTION_LAYER_CLASS} flex items-center gap-1 rounded-lg bg-brand-orange py-2 text-sm font-semibold text-white transition-all duration-200 ease-in-out hover:bg-brand-orange-dark focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-orange focus-visible:ring-offset-2 ${variantStyles.button}`}
            >
              <Plus size={ADD_ICON_SIZE} aria-hidden="true" />
              {LANDING_CONTENT.services.add}
            </button>
          </div>
        </div>
      </article>
    );
  },
);

ServiceCard.displayName = 'ServiceCard';

export default ServiceCard;
