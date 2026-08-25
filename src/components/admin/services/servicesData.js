import { ALL_CATALOG_SERVICES, CATALOG_COLLECTIONS } from '../../catalog/catalogRegistry';
import { ALL_CATEGORIES_VALUE } from '../../home/landingData';

export const SERVICES_VIEWPORT = {
  MOBILE_S: 320,
  MOBILE_M: 375,
  MOBILE_L: 425,
  TABLET: 768,
  LAPTOP: 1020,
  DESKTOP: 1440,
};

export const SERVICES_PAGE_SIZE = 8;
export const SERVICES_TOTAL_PAGES = 10;
export const SERVICES_FILTER_CHEVRON_SIZE_PX = 16;
export const SERVICES_SEED_LIMIT = SERVICES_PAGE_SIZE * SERVICES_TOTAL_PAGES;
export const SERVICES_ALL_FILTER_ID = ALL_CATEGORIES_VALUE;

export const SERVICES_PAGE_CLASS =
  'flex min-w-0 flex-col gap-5 max-[425px]:gap-5 min-[426px]:gap-6 min-[768px]:gap-8 min-[1020px]:gap-10';
export const SERVICES_HEADER_CLASS =
  'flex flex-col gap-4 min-[1020px]:flex-row min-[1020px]:items-center min-[1020px]:justify-between min-[1020px]:gap-5';
export const SERVICES_HEADER_ACTIONS_CLASS =
  'flex w-full flex-col gap-3 min-[768px]:flex-row min-[768px]:items-center min-[768px]:justify-end min-[768px]:gap-5';
export const SERVICES_TITLE_CLASS =
  'text-2xl font-medium leading-[1.2] text-[#0a0a0a] min-[376px]:text-[28px] min-[768px]:text-[32px]';
export const SERVICES_SUBTITLE_CLASS =
  'text-sm leading-5 text-[#555353] min-[426px]:text-base min-[426px]:leading-6 min-[768px]:text-xl min-[768px]:leading-[1.5]';
export const SERVICES_ADD_BUTTON_CLASS =
  'inline-flex w-full shrink-0 cursor-pointer items-center justify-center rounded-lg bg-[#fc6f32] px-6 py-3 text-base font-bold leading-6 text-white transition-colors hover:bg-brand-orange-dark focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-orange min-[768px]:w-auto';
export const SERVICES_FILTERS_CLASS =
  'flex w-full flex-col gap-3 min-[426px]:flex-row min-[426px]:items-center min-[768px]:w-auto min-[768px]:gap-3.5';
export const SERVICES_SORT_LABEL_CLASS = 'shrink-0 text-sm leading-5 text-black';
export const SERVICES_FILTER_SELECTS_CLASS =
  'flex w-full flex-col gap-3 min-[426px]:flex-row min-[426px]:items-center min-[768px]:w-auto min-[768px]:gap-4';
export const SERVICES_FILTER_SELECT_WRAP_CLASS = 'relative w-full min-[768px]:w-auto';
export const SERVICES_FILTER_SELECT_CLASS =
  'h-auto w-full min-w-0 cursor-pointer appearance-none rounded-md border border-[#d1d5db] bg-white py-2.5 pr-9 pl-[13px] text-sm leading-5 text-[#1f2937] focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-orange min-[768px]:w-auto min-[768px]:min-w-[160px]';
export const SERVICES_GRID_CLASS =
  'grid grid-cols-1 gap-5 min-[426px]:grid-cols-1 min-[768px]:grid-cols-2 min-[1020px]:grid-cols-3 min-[1440px]:grid-cols-4';
export const SERVICES_EMPTY_CLASS =
  'rounded-2xl bg-white px-4 py-10 text-center text-sm text-[#6b7280] min-[426px]:text-base';
export const SERVICES_PAGINATION_CLASS =
  'flex flex-wrap items-center justify-center gap-[5px]';
export const SERVICES_PAGINATION_CONTROL_CLASS =
  'inline-flex h-8 min-w-8 cursor-pointer items-center justify-center rounded-lg bg-white px-1 text-[13px] font-semibold text-[#333] transition-colors hover:bg-[#f8fafc] focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-orange disabled:cursor-not-allowed disabled:text-[#ccc] disabled:hover:bg-white';
export const SERVICES_PAGINATION_PAGE_CLASS =
  'inline-flex size-8 cursor-pointer items-center justify-center rounded-lg border border-[#f1f1f1] bg-white p-2.5 text-[13px] font-semibold text-[#333] transition-colors hover:bg-[#f8fafc] focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-orange';
export const SERVICES_PAGINATION_PAGE_ACTIVE_CLASS =
  'inline-flex size-8 cursor-pointer items-center justify-center rounded-lg bg-[#fc6f32] p-2.5 text-[13px] font-semibold text-white transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-orange';
export const SERVICES_PAGINATION_ELLIPSIS_CLASS =
  'inline-flex size-8 items-center justify-center rounded-lg bg-white p-2.5 text-[13px] font-semibold text-[#333]';

export const SERVICES_CATEGORY_OPTIONS = [
  { id: SERVICES_ALL_FILTER_ID, label: 'All Categories' },
  ...CATALOG_COLLECTIONS.map((collection) => ({
    id: collection.title,
    label: collection.title,
  })),
];

const uniqueSubcategories = (services) =>
  [...new Set(services.map((service) => service.category))];

export const SERVICES_SUBCATEGORY_OPTIONS = [
  {
    id: SERVICES_ALL_FILTER_ID,
    label: 'All Sub-Categories',
    categoryId: SERVICES_ALL_FILTER_ID,
  },
  ...CATALOG_COLLECTIONS.flatMap((collection) =>
    uniqueSubcategories(collection.services).map((subcategory) => ({
      id: subcategory,
      label: subcategory,
      categoryId: collection.title,
    })),
  ),
];

/** Seed enough catalog cards for Figma pagination: 8 per page × 10 pages. */
export const SERVICES_SEED = ALL_CATALOG_SERVICES.slice(0, SERVICES_SEED_LIMIT);
