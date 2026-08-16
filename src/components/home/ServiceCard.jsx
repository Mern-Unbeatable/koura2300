import React, { memo, useCallback } from 'react';
import { Clock3, Plus, Star } from 'lucide-react';
import { LANDING_CONTENT } from './landingContent';

const RATING_STARS = 5;
const SERVICE_IMAGE_WIDTH = 360;
const SERVICE_IMAGE_HEIGHT = 192;
const CLOCK_ICON_SIZE = 14;
const STAR_ICON_SIZE = 12;
const ADD_ICON_SIZE = 14;

/**
 * Shared presentational card for a single top-rated service.
 * Section orchestration (cart dispatch, grid layout) stays in TopServices.
 */
const ServiceCard = memo(({ service, onAdd }) => {
  const handleAdd = useCallback(() => {
    onAdd(service);
  }, [onAdd, service]);

  return (
    <article className="flex h-full flex-col overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
      <div className="relative">
        <img
          src={service.image}
          alt={service.imageAlt}
          width={SERVICE_IMAGE_WIDTH}
          height={SERVICE_IMAGE_HEIGHT}
          loading="lazy"
          className="h-48 w-full object-cover"
        />
        <span className="absolute left-3 top-3 rounded-full bg-brand-blue px-3 py-1 text-xs font-semibold text-white">
          {service.category}
        </span>
      </div>

      <div className="flex flex-1 flex-col gap-2 p-4">
        <h3 className="font-semibold text-brand-blue">{service.title}</h3>
        <p className="line-clamp-2 text-sm leading-5 text-gray-500">{service.description}</p>
        <span className="mt-1 flex items-center gap-1 text-sm text-gray-500">
          <Clock3 size={CLOCK_ICON_SIZE} aria-hidden="true" />
          {service.duration}
        </span>

        <div className="mt-auto flex items-end justify-between gap-3 pt-3">
          <div>
            <p className="text-lg font-bold text-brand-blue">Starting at ${service.price}</p>
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
            className="flex items-center gap-1 rounded-lg bg-brand-orange px-4 py-2 text-sm font-semibold text-white transition-all duration-200 ease-in-out hover:bg-brand-orange-dark focus:outline-none focus:ring-2 focus:ring-brand-orange focus:ring-offset-2"
          >
            <Plus size={ADD_ICON_SIZE} aria-hidden="true" />
            {LANDING_CONTENT.services.add}
          </button>
        </div>
      </div>
    </article>
  );
});

ServiceCard.displayName = 'ServiceCard';

export default ServiceCard;
