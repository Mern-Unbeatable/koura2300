import React, { memo, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { Clock3, Plus } from 'lucide-react';
import { buildServiceDetailsRoute } from '../../config';
import { LANDING_CONTENT } from '../home/landingContent';
import ServiceRatingStars from './ServiceRatingStars';
import { SERVICE_DETAILS_CONTENT } from './serviceDetailsCopy';
import {
  ADD_ICON_SIZE,
  CLOCK_ICON_SIZE,
  RELATED_CARD_CLASS,
  RELATED_IMAGE_CLASS,
  RELATED_IMAGE_HEIGHT,
  RELATED_IMAGE_WIDTH,
  RELATED_MEDIA_CLASS,
} from './serviceDetailsData';

const ServiceDetailsRelatedCard = memo(({ service, onAdd }) => {
  const detailsPath = buildServiceDetailsRoute(service.id);

  const handleAdd = useCallback(
    (event) => {
      event.preventDefault();
      event.stopPropagation();
      onAdd(service);
    },
    [onAdd, service],
  );

  return (
    <article className={RELATED_CARD_CLASS}>
      <Link to={detailsPath} tabIndex={-1} aria-hidden="true" className={RELATED_MEDIA_CLASS}>
        <img
          src={service.image}
          alt=""
          width={RELATED_IMAGE_WIDTH}
          height={RELATED_IMAGE_HEIGHT}
          className={RELATED_IMAGE_CLASS}
        />
        <span className="absolute left-3 top-3 rounded-full bg-brand-blue px-3 py-1 text-xs font-semibold text-white">
          {service.catalogTitle}
        </span>
      </Link>
      <div className="flex min-w-0 flex-1 flex-col p-4">
        <h3 className="font-semibold text-brand-ink">
          <Link
            to={detailsPath}
            className="line-clamp-2 break-words focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-orange"
          >
            {service.title}
          </Link>
        </h3>
        <p className="mt-2 line-clamp-3 text-sm leading-5 text-gray-500">{service.description}</p>
        <span className="mt-4 flex items-center gap-1 text-sm text-gray-500">
          <Clock3 size={CLOCK_ICON_SIZE} aria-hidden="true" />
          {service.duration}
        </span>
        <div className="mt-auto flex min-w-0 flex-wrap items-end justify-between gap-3 pt-3">
          <div>
            <p className="text-xl font-bold text-brand-blue">
              {SERVICE_DETAILS_CONTENT.related.startingAt} ${service.price}
            </p>
            <div className="flex items-center gap-1">
              <ServiceRatingStars />
              <span className="text-xs text-gray-500">{service.rating}</span>
            </div>
          </div>
          <button
            type="button"
            onClick={handleAdd}
            aria-label={`Add ${service.title} to cart`}
            className="flex items-center gap-1 rounded-lg bg-brand-orange px-5 py-2 text-sm font-semibold text-white transition-colors hover:bg-brand-orange-dark focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-orange focus-visible:ring-offset-2"
          >
            <Plus size={ADD_ICON_SIZE} aria-hidden="true" />
            {LANDING_CONTENT.services.add}
          </button>
        </div>
      </div>
    </article>
  );
});

ServiceDetailsRelatedCard.displayName = 'ServiceDetailsRelatedCard';

export default ServiceDetailsRelatedCard;
