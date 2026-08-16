import React, { memo } from 'react';
import { Star } from 'lucide-react';
import CarouselControl from './CarouselControl';
import useCarousel from '../../hooks/useCarousel';
import { LANDING_CONTENT } from './landingContent';
import { CATEGORY_ITEMS } from './landingData';

// Cards beyond the first visible row start off-screen, so they can load lazily.
const EAGER_CARD_COUNT = 3;

const FeaturedCategories = memo(() => {
  const { trackRef, canScrollPrev, canScrollNext, scrollToPrev, scrollToNext } = useCarousel();

  return (
    <section
      id="featured-categories"
      aria-label={LANDING_CONTENT.categories.sectionLabel}
      className="mx-auto max-w-screen-2xl scroll-mt-32 px-4 py-8 sm:px-6 lg:px-8"
    >
      <div className="relative">
        <div
          ref={trackRef}
          className="scrollbar-none -mx-2.5 flex snap-x snap-mandatory scroll-smooth overflow-x-auto"
        >
          {CATEGORY_ITEMS.map((category, index) => (
            <div key={category.id} className="w-full shrink-0 snap-start px-2.5 md:w-1/3">
              <article className="h-full rounded-lg bg-brand-orange-light p-4 sm:p-5">
                <h2 className="text-xl font-semibold text-brand-blue sm:text-2xl">
                  {category.title}
                </h2>
                <div className="mt-3 flex items-center justify-between gap-3 text-sm">
                  <span className="flex items-center gap-2 font-medium text-brand-ink">
                    <Star
                      size={16}
                      fill="currentColor"
                      aria-hidden="true"
                      className="text-brand-orange"
                    />
                    {LANDING_CONTENT.categories.rating}
                  </span>
                  <span className="font-bold text-brand-orange">
                    {LANDING_CONTENT.categories.price}
                  </span>
                </div>
                <img
                  src={category.image}
                  alt={category.imageAlt}
                  width="459"
                  height="414"
                  loading={index < EAGER_CARD_COUNT ? 'eager' : 'lazy'}
                  className="mt-4 aspect-11/10 w-full rounded object-cover"
                />
              </article>
            </div>
          ))}
        </div>

        <CarouselControl
          direction="previous"
          label={LANDING_CONTENT.categories.previousLabel}
          disabled={!canScrollPrev}
          onClick={scrollToPrev}
        />
        <CarouselControl
          direction="next"
          label={LANDING_CONTENT.categories.nextLabel}
          disabled={!canScrollNext}
          onClick={scrollToNext}
        />
      </div>
    </section>
  );
});

FeaturedCategories.displayName = 'FeaturedCategories';

export default FeaturedCategories;
