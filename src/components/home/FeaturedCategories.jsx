import React, { memo } from 'react';
import CategoryCard from './CategoryCard';
import CarouselControl from './CarouselControl';
import useCarousel from '../../hooks/useCarousel';
import { LANDING_CONTENT } from './landingContent';
import { CATEGORY_ITEMS } from './landingData';

// Cards beyond the first visible row start off-screen, so they can load lazily.
const EAGER_CARD_COUNT = 3;

const FeaturedCategories = memo(() => {
  const { trackRef, canScrollPrev, canScrollNext, scrollToPrev, scrollToNext } = useCarousel({
    loop: true,
  });

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
              <CategoryCard
                category={category}
                loading={index < EAGER_CARD_COUNT ? 'eager' : 'lazy'}
              />
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
