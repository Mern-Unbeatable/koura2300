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
export const SERVICES_FILTER_CHEVRON_SIZE_PX = 16;
export const SERVICES_ALL_FILTER_ID = ALL_CATEGORIES_VALUE;

export const SERVICES_PAGE_CLASS =
  'flex min-w-0 flex-col gap-5 max-[425px]:gap-5 min-[426px]:gap-6 min-[768px]:gap-8 min-[1020px]:gap-10';
export const SERVICES_HEADER_CLASS =
  'flex flex-col gap-4 min-[1020px]:flex-row min-[1020px]:items-center min-[1020px]:justify-between min-[1020px]:gap-5';
export const SERVICES_HEADER_ACTIONS_CLASS =
  'flex w-full flex-col gap-3 min-[768px]:flex-row min-[768px]:items-center min-[768px]:justify-end min-[768px]:gap-5';
export const SERVICES_TITLE_CLASS =
  'whitespace-nowrap text-2xl font-medium leading-[1.2] text-[#0a0a0a] min-[376px]:text-[28px] min-[768px]:text-[32px]';
export const SERVICES_SUBTITLE_CLASS =
  'text-sm leading-5 text-[#555353] min-[426px]:text-base min-[426px]:leading-6 min-[768px]:text-xl min-[768px]:leading-[1.5]';
export const SERVICES_ADD_BUTTON_CLASS =
  'inline-flex h-10 w-full shrink-0 cursor-pointer items-center justify-center rounded-md bg-[#fc6f32] px-3 text-sm font-bold leading-5 text-white transition-colors hover:bg-brand-orange-dark focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-orange min-[768px]:w-auto';
export const SERVICES_FILTERS_CLASS =
  'flex w-full flex-col gap-3 min-[426px]:flex-row min-[426px]:items-center min-[768px]:w-auto min-[768px]:gap-3.5';
export const SERVICES_SORT_LABEL_CLASS = 'shrink-0 text-sm leading-5 text-black';
export const SERVICES_FILTER_SELECTS_CLASS =
  'flex w-full flex-col gap-3 min-[426px]:flex-row min-[426px]:items-center min-[768px]:w-auto min-[768px]:gap-3';
export const SERVICES_FILTER_SELECT_WRAP_CLASS = 'relative w-full min-[426px]:w-auto';
export const SERVICES_FILTER_TRIGGER_CLASS =
  'inline-flex h-10 w-full cursor-pointer items-center justify-between gap-2 rounded-md border border-[#e8ebf0] bg-white px-3 text-left text-sm leading-5 text-[#455163] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#ffd4c2]';
export const SERVICES_FILTER_TRIGGER_LABEL_CLASS = 'min-w-0 flex-1 truncate whitespace-nowrap';
export const SERVICES_FILTER_CATEGORY_WIDTH_CLASS = 'shrink-0 min-[426px]:w-[200px]';
export const SERVICES_FILTER_SUBCATEGORY_WIDTH_CLASS = 'shrink-0 min-[426px]:w-[200px]';
export const SERVICES_FILTER_MENU_CLASS =
  'absolute top-[calc(100%+4px)] left-0 z-30 max-h-[220px] w-full overflow-x-hidden overflow-y-auto overscroll-y-contain rounded-md border border-[#e8ebf0] bg-[#fcfcfd] py-1 shadow-[0px_8px_20px_rgba(15,23,42,0.06)] scrollbar-services-ash';
export const SERVICES_FILTER_OPTION_CLASS =
  'flex w-full cursor-pointer items-start px-3 py-1.5 text-left text-sm leading-5 text-[#536070] whitespace-normal break-words transition-colors hover:bg-[#fff7f3] focus:outline-none focus-visible:bg-[#fff7f3]';
export const SERVICES_FILTER_OPTION_WRAP_CLASS =
  'flex w-full cursor-pointer items-start px-3 py-1.5 text-left text-sm leading-5 text-[#536070] whitespace-normal break-words transition-colors hover:bg-[#fff7f3] focus:outline-none focus-visible:bg-[#fff7f3]';
export const SERVICES_FILTER_OPTION_ACTIVE_CLASS =
  'bg-[#fff1eb] text-[#fc6f32] hover:bg-[#fff1eb] focus-visible:bg-[#fff1eb]';
export const SERVICES_FILTER_MENU_MAX_HEIGHT_PX = 220;
export const SERVICES_GRID_CLASS =
  'grid grid-cols-1 gap-5 min-[426px]:grid-cols-1 min-[768px]:grid-cols-2 min-[1020px]:grid-cols-3 min-[1440px]:grid-cols-4';
export const SERVICES_EMPTY_CLASS =
  'rounded-2xl bg-white px-4 py-10 text-center text-sm text-[#6b7280] min-[426px]:text-base';
export {
  ADMIN_PAGINATION_CLASS as SERVICES_PAGINATION_CLASS,
  ADMIN_PAGINATION_CONTROL_CLASS as SERVICES_PAGINATION_CONTROL_CLASS,
  ADMIN_PAGINATION_PAGE_CLASS as SERVICES_PAGINATION_PAGE_CLASS,
  ADMIN_PAGINATION_PAGE_ACTIVE_CLASS as SERVICES_PAGINATION_PAGE_ACTIVE_CLASS,
  ADMIN_PAGINATION_ELLIPSIS_CLASS as SERVICES_PAGINATION_ELLIPSIS_CLASS,
} from '../shared/adminPaginationData';

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

/** Full landing/catalog services so every category and subcategory has cards. */
export const SERVICES_SEED = ALL_CATALOG_SERVICES;
