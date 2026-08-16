import React, { memo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { Clock3, Plus, Star } from 'lucide-react';

const RATING_STARS = 5;
const SERVICE_IMAGE_WIDTH = 360;
const SERVICE_IMAGE_HEIGHT = 192;

const ServiceCard = memo(({ service, onAdd }) => {
  const { t } = useTranslation();
  const title = t(service.titleKey);
  const handleAdd = useCallback(() => {
    onAdd(service);
  }, [onAdd, service]);

  return (
    <article className="flex h-full flex-col overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
      <div className="relative">
        <img
          src={service.image}
          alt={t(service.imageAltKey)}
          width={SERVICE_IMAGE_WIDTH}
          height={SERVICE_IMAGE_HEIGHT}
          loading="lazy"
          className="h-48 w-full object-cover"
        />
        <span className="absolute left-3 top-3 rounded-full bg-brand-blue px-3 py-1 text-xs font-semibold text-white">
          {t(service.categoryKey)}
        </span>
      </div>

      <div className="flex flex-1 flex-col gap-2 p-4">
        <h3 className="font-semibold text-brand-blue">{title}</h3>
        <p className="line-clamp-2 text-sm leading-5 text-gray-500">{t(service.descriptionKey)}</p>
        <span className="mt-1 flex items-center gap-1 text-sm text-gray-500">
          <Clock3 size={14} aria-hidden="true" />
          {t(service.durationKey)}
        </span>

        <div className="mt-auto flex items-end justify-between gap-3 pt-3">
          <div>
            <p className="text-lg font-bold text-brand-blue">
              {t('landing.services.startingPrice', { price: service.price })}
            </p>
            <div className="flex items-center gap-1">
              <span className="flex text-brand-orange" aria-hidden="true">
                {Array.from({ length: RATING_STARS }, (_, starIndex) => (
                  <Star key={starIndex} size={12} fill="currentColor" />
                ))}
              </span>
              <span className="text-xs text-gray-500">{service.rating}</span>
            </div>
          </div>
          <button
            type="button"
            onClick={handleAdd}
            aria-label={t('landing.services.addLabel', { service: title })}
            className="flex items-center gap-1 rounded-lg bg-brand-orange px-4 py-2 text-sm font-semibold text-white transition-all duration-200 ease-in-out hover:bg-brand-orange-dark focus:outline-none focus:ring-2 focus:ring-brand-orange focus:ring-offset-2"
          >
            <Plus size={14} aria-hidden="true" />
            {t('landing.services.add')}
          </button>
        </div>
      </div>
    </article>
  );
});

ServiceCard.displayName = 'ServiceCard';

export default ServiceCard;
