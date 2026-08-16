import React, { memo } from 'react';
import LandingPicture from './LandingPicture';
import { LANDING_CONTENT } from './landingContent';
import { SERVICE_CAPABILITIES, SOLUTION_IMAGES } from './landingData';

const ServiceOverview = memo(() => {
  const { cleaning, laundry } = SOLUTION_IMAGES;

  return (
    <section className="py-16 sm:py-22 lg:py-28">
      <div className="mx-auto grid max-w-screen-2xl items-center gap-12 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
        <div>
          <span className="inline-flex rounded-full bg-brand-navy px-4 py-1 text-sm font-semibold text-white">
            {LANDING_CONTENT.overview.eyebrow}
          </span>
          <h2 className="mt-4 max-w-2xl text-3xl font-semibold leading-tight text-brand-blue sm:text-4xl lg:text-5xl">
            {LANDING_CONTENT.overview.title}
          </h2>
          <p className="mt-4 max-w-2xl text-base leading-7 text-brand-ink lg:text-lg">
            {LANDING_CONTENT.overview.description}
          </p>

          <ul className="mt-8 grid gap-5 sm:grid-cols-2">
            {SERVICE_CAPABILITIES.map(({ id, label, icon: Icon }) => (
              <li key={id} className="flex items-center gap-4 font-semibold text-brand-ink">
                <span className="flex size-12 shrink-0 items-center justify-center rounded-md bg-brand-sand">
                  <Icon size={22} aria-hidden="true" />
                </span>
                {label}
              </li>
            ))}
          </ul>
        </div>

        <div className="relative mx-auto min-h-100 w-full max-w-xl sm:min-h-130">
          <LandingPicture
            webpSrc={cleaning.webp}
            pngSrc={cleaning.png}
            alt={LANDING_CONTENT.overview.primaryImageAlt}
            width={cleaning.width}
            height={cleaning.height}
            className="ml-auto block h-90 w-4/5 overflow-hidden rounded-md sm:h-124"
          />
          <LandingPicture
            webpSrc={laundry.webp}
            pngSrc={laundry.png}
            alt={LANDING_CONTENT.overview.secondaryImageAlt}
            width={laundry.width}
            height={laundry.height}
            className="absolute bottom-0 left-0 block h-44 w-3/5 overflow-hidden rounded-md border-r-16 border-t-16 border-white sm:h-72"
          />
        </div>
      </div>
    </section>
  );
});

ServiceOverview.displayName = 'ServiceOverview';

export default ServiceOverview;
