import React, { memo } from 'react';
import { LANDING_CONTENT } from './landingContent';
import { TRUST_ITEMS } from './landingData';

const TrustSection = memo(() => {
  return (
    <section className="pb-16 sm:pb-22 lg:pb-28">
      <div className="mx-auto max-w-screen-2xl border-t border-brand-sand px-4 pt-16 sm:px-6 sm:pt-22 lg:px-8 lg:pt-28">
        <div className="mx-auto max-w-4xl text-center">
          <span className="inline-flex rounded-full bg-brand-navy px-4 py-1 text-sm font-semibold text-white">
            {LANDING_CONTENT.trust.eyebrow}
          </span>
          <h2 className="mt-4 text-3xl font-semibold leading-tight text-brand-blue sm:text-4xl lg:text-5xl">
            {LANDING_CONTENT.trust.title}
          </h2>
        </div>

        <ol className="mt-12 grid gap-8 sm:grid-cols-2 lg:mt-16 lg:grid-cols-5 lg:gap-6">
          {TRUST_ITEMS.map((item) => (
            <li key={item.id}>
              <span className="flex size-12 items-center justify-center rounded-full bg-brand-orange font-bold text-white">
                {item.number}
              </span>
              <h3 className="mt-7 text-lg font-medium text-black">{item.title}</h3>
              <p className="mt-2 text-sm leading-6 text-brand-muted">{item.body}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
});

TrustSection.displayName = 'TrustSection';

export default TrustSection;
