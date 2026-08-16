import React, { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { ROUTES } from '../../config';
import { LANDING_ASSET_PATH, SERVICE_CAPABILITIES } from './landingData';

const ServiceOverview = memo(() => {
  const { t } = useTranslation();

  return (
    <section className="py-16 sm:py-22 lg:py-28">
      <div className="mx-auto grid max-w-screen-2xl items-center gap-12 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
        <div>
          <span className="inline-flex rounded-full bg-brand-navy px-4 py-1 text-sm font-semibold text-white">
            {t('landing.overview.eyebrow')}
          </span>
          <h2 className="mt-4 max-w-2xl text-3xl font-semibold leading-tight text-brand-blue sm:text-4xl lg:text-5xl">
            {t('landing.overview.title')}
          </h2>
          <p className="mt-4 max-w-2xl text-base leading-7 text-brand-ink lg:text-lg">
            {t('landing.overview.description')}
          </p>

          <ul className="mt-8 grid gap-5 sm:grid-cols-2">
            {SERVICE_CAPABILITIES.map(({ id, labelKey, icon: Icon }) => (
              <li key={id} className="flex items-center gap-4 font-semibold text-brand-ink">
                <span className="flex size-12 shrink-0 items-center justify-center rounded-md bg-brand-sand">
                  <Icon size={22} aria-hidden="true" />
                </span>
                {t(labelKey)}
              </li>
            ))}
          </ul>

          <Link
            to={ROUTES.CONTACT}
            className="mt-10 inline-flex rounded-md bg-brand-orange px-6 py-3 text-sm font-bold text-white transition-all duration-200 ease-in-out hover:bg-brand-orange-dark focus:outline-none focus:ring-2 focus:ring-brand-orange focus:ring-offset-2"
          >
            {t('landing.common.contact')}
          </Link>
        </div>

        <div className="relative mx-auto min-h-100 w-full max-w-xl sm:min-h-130">
          <img
            src={`${LANDING_ASSET_PATH}/solution-cleaning.png`}
            alt={t('landing.overview.primaryImageAlt')}
            width="511"
            height="495"
            loading="lazy"
            className="ml-auto h-90 w-4/5 rounded-md object-cover sm:h-124"
          />
          <img
            src={`${LANDING_ASSET_PATH}/solution-laundry.png`}
            alt={t('landing.overview.secondaryImageAlt')}
            width="350"
            height="288"
            loading="lazy"
            className="absolute bottom-0 left-0 h-44 w-3/5 rounded-md border-r-16 border-t-16 border-white object-cover sm:h-72"
          />
        </div>
      </div>
    </section>
  );
});

ServiceOverview.displayName = 'ServiceOverview';

export default ServiceOverview;
