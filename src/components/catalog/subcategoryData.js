export const SUBCATEGORY_VIEWPORT = {
  MOBILE_S: 320,
  MOBILE_M: 375,
  MOBILE_L: 425,
  TABLET: 768,
  LAPTOP: 1020,
  DESKTOP: 1440,
};

export const SUBCATEGORY_RATING_STARS = 5;
export const SUBCATEGORY_STAR_SIZE_PX = 12;
export const SUBCATEGORY_BACK_ICON_SIZE_PX = 16;
export const SUBCATEGORY_CARD_OVERLAY_CLASS = 'absolute inset-0 bg-black/30';
export const SUBCATEGORY_CARD_RADIUS_CLASS = 'rounded-[12px]';

export const SUBCATEGORY_GRID_CLASS =
  'grid grid-cols-1 gap-5 min-[768px]:grid-cols-2 min-[1440px]:grid-cols-3';

export const SUBCATEGORY_CARD_CLASS =
  'group relative flex min-h-[240px] w-full cursor-pointer overflow-hidden rounded-[12px] text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-orange focus-visible:ring-offset-2 min-[768px]:min-h-[320px] min-[1440px]:min-h-[420px]';

export const SUBCATEGORY_CARD_IMAGE_CLASS =
  'absolute inset-0 size-full object-cover transition-transform duration-300 ease-out group-hover:scale-105';

export const SUBCATEGORY_CARD_CONTENT_CLASS =
  'relative z-[1] mt-auto flex w-full flex-col items-start p-5 min-[768px]:p-7 min-[1440px]:p-8';

export const SUBCATEGORY_CARD_TITLE_CLASS =
  'text-xl font-semibold leading-[1.5] text-white min-[768px]:text-2xl min-[1440px]:text-[32px]';

export const SUBCATEGORY_CARD_PRICE_CLASS =
  'mt-1 text-base font-medium leading-7 text-white min-[768px]:text-lg min-[1440px]:text-xl';

export const SUBCATEGORY_CARD_RATING_CLASS =
  'mt-0.5 flex items-center gap-1 text-brand-orange';

export const SUBCATEGORY_CARD_RATING_TEXT_CLASS =
  'text-xs leading-4 text-white';

export const SUBCATEGORY_BACK_BUTTON_CLASS =
  'inline-flex cursor-pointer items-center gap-2 text-sm font-medium text-brand-ink transition-colors hover:text-brand-orange focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-orange';

export const DEFAULT_SUBCATEGORY_COPY = {
  gridLabel: 'Browse service subcategories',
  backLabel: 'Back to subcategories',
  startingAt: (price) => `Starting at $${price}`,
};

export const buildSubcategoryCards = (services, allCategory) => {
  const cardsByCategory = new Map();

  services.forEach((service) => {
    if (!service?.category || service.category === allCategory) {
      return;
    }

    const existing = cardsByCategory.get(service.category);
    if (!existing) {
      cardsByCategory.set(service.category, {
        id: service.category,
        title: service.category,
        image: service.image,
        imageAlt: service.imageAlt ?? service.category,
        startingPrice: service.price,
        rating: service.rating,
      });
      return;
    }

    if (service.price < existing.startingPrice) {
      cardsByCategory.set(service.category, {
        ...existing,
        startingPrice: service.price,
        image: service.image,
        imageAlt: service.imageAlt ?? existing.imageAlt,
        rating: service.rating ?? existing.rating,
      });
    }
  });

  return [...cardsByCategory.values()];
};
