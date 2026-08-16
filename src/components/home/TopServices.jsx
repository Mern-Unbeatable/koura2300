import React, { memo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { ROUTES } from '../../config';
import { addToCart } from '../../store/slices/cartSlice';
import ServiceCard from './ServiceCard';

const TopServices = memo(({ services }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const handleAddService = useCallback(
    (service) => {
      dispatch(
        addToCart({
          id: service.id,
          price: service.price,
          titleKey: service.titleKey,
        }),
      );
    },
    [dispatch],
  );

  return (
    <section
      id="top-services"
      aria-label={t('landing.services.title')}
      className="bg-gray-50 py-14 sm:py-18 lg:py-20"
    >
      <div className="mx-auto max-w-screen-2xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between gap-5">
          <div>
            <h2 className="text-3xl font-extrabold text-brand-blue sm:text-4xl">
              {t('landing.services.title')}
            </h2>
            <p className="mt-2 text-base text-gray-500">{t('landing.services.subtitle')}</p>
          </div>
          <Link
            to={ROUTES.SERVICES}
            className="hidden items-center gap-2 text-sm font-semibold text-brand-orange sm:flex"
          >
            {t('landing.common.viewAll')}
            <ArrowRight size={16} aria-hidden="true" />
          </Link>
        </div>

        {services.length > 0 ? (
          <div className="mt-10 grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
            {services.map((service) => (
              <ServiceCard key={service.id} service={service} onAdd={handleAddService} />
            ))}
          </div>
        ) : (
          <p className="mt-10 rounded-xl bg-white p-8 text-center text-gray-500">
            {t('landing.services.noResults')}
          </p>
        )}
      </div>
    </section>
  );
});

TopServices.displayName = 'TopServices';

export default TopServices;
