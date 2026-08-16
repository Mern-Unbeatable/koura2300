import React, { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { Star } from 'lucide-react';
import { CATEGORY_ITEMS } from './landingData';

const FeaturedCategories = memo(() => {
  const { t } = useTranslation();

  return (
    <section
      id="featured-categories"
      aria-label={t('landing.categories.sectionLabel')}
      className="mx-auto max-w-screen-2xl px-4 py-8 sm:px-6 lg:px-8"
    >
      <div className="grid gap-5 md:grid-cols-3">
        {CATEGORY_ITEMS.map((category) => (
          <article key={category.id} className="rounded-lg bg-brand-orange-light p-4 sm:p-5">
            <h2 className="text-xl font-semibold text-brand-blue sm:text-2xl">
              {t(category.titleKey)}
            </h2>
            <div className="mt-3 flex items-center justify-between gap-3 text-sm">
              <span className="flex items-center gap-2 font-medium text-brand-ink">
                <Star
                  size={16}
                  fill="currentColor"
                  aria-hidden="true"
                  className="text-brand-orange"
                />
                {t('landing.categories.rating')}
              </span>
              <span className="font-bold text-brand-orange">{t(category.priceKey)}</span>
            </div>
            <img
              src={category.image}
              alt={t(`landing.categories.${category.id}Alt`)}
              width="459"
              height="414"
              loading="eager"
              className="mt-4 aspect-11/10 w-full rounded object-cover"
            />
          </article>
        ))}
      </div>
    </section>
  );
});

FeaturedCategories.displayName = 'FeaturedCategories';

export default FeaturedCategories;
