import { ALL_CATALOG_SERVICES, CATALOG_COLLECTIONS } from '../../catalog/catalogRegistry';
import { ALL_CATEGORIES_VALUE } from '../../home/landingData';

export const ADS_VIEWPORT = {
  MOBILE_S: 320,
  MOBILE_M: 375,
  MOBILE_L: 425,
  TABLET: 768,
  LAPTOP: 1020,
  DESKTOP: 1440,
};

export const ADS_PAGE_SIZE = 8;
export const ADS_FIRST_PAGE = 1;
export const ADS_FILTER_CHEVRON_SIZE_PX = 16;
export const ADS_FILTER_CHEVRON_CLASS = 'shrink-0 text-[#4a5154]';
export const ADS_ALL_FILTER_ID = ALL_CATEGORIES_VALUE;
export const ADS_DELETE_CLOSE_ICON_SIZE_PX = 18;

export const ADS_PAGE_CLASS =
  'flex min-w-0 flex-col gap-5 max-[425px]:gap-5 min-[426px]:gap-6 min-[768px]:gap-8 min-[1020px]:gap-10';

export const ADS_HEADER_CLASS =
  'flex flex-col gap-4 min-[1020px]:flex-row min-[1020px]:items-center min-[1020px]:justify-between min-[1020px]:gap-5';

export const ADS_HEADER_TEXT_CLASS = 'flex shrink-0 flex-col gap-1';

export const ADS_HEADER_ACTIONS_CLASS =
  'flex w-full flex-col gap-3 min-[768px]:flex-row min-[768px]:items-center min-[768px]:justify-end min-[768px]:gap-5';

export const ADS_TITLE_CLASS =
  'whitespace-nowrap text-2xl font-medium leading-[1.2] text-[#0a0a0a] min-[376px]:text-[28px] min-[768px]:text-[32px]';

export const ADS_SUBTITLE_CLASS =
  'text-sm leading-5 text-[#555353] min-[426px]:text-base min-[426px]:leading-6 min-[768px]:text-xl min-[768px]:leading-[1.5]';

export const ADS_ADD_BUTTON_CLASS =
  'inline-flex w-full shrink-0 cursor-pointer items-center justify-center rounded-lg bg-[#fc6f32] px-6 py-3 text-base font-bold leading-6 text-white transition-colors hover:bg-brand-orange-dark focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-orange min-[768px]:w-auto';

export const ADS_FILTERS_CLASS =
  'flex w-full flex-col gap-3 min-[426px]:flex-row min-[426px]:items-center min-[768px]:w-auto min-[768px]:gap-3.5';

export const ADS_SORT_LABEL_CLASS = 'shrink-0 text-sm leading-5 text-black';

export const ADS_FILTER_SELECTS_CLASS =
  'flex w-full flex-col gap-3 min-[426px]:flex-row min-[426px]:items-center min-[768px]:w-auto min-[768px]:gap-3';

export const ADS_FILTER_SELECT_WRAP_CLASS = 'relative w-full min-[426px]:w-auto';

export const ADS_FILTER_TRIGGER_CLASS =
  'inline-flex h-10 w-full cursor-pointer items-center justify-between gap-2 rounded-md border border-[#e8ebf0] bg-white px-3 text-left text-sm leading-5 text-[#455163] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#ffd4c2]';

export const ADS_FILTER_TRIGGER_LABEL_CLASS = 'min-w-0 flex-1 truncate whitespace-nowrap';

export const ADS_FILTER_CATEGORY_WIDTH_CLASS = 'shrink-0 min-[426px]:w-[200px]';

export const ADS_FILTER_SUBCATEGORY_WIDTH_CLASS = 'shrink-0 min-[426px]:w-[200px]';

export const ADS_FILTER_MENU_CLASS =
  'absolute top-[calc(100%+4px)] left-0 z-30 max-h-[220px] w-full overflow-x-hidden overflow-y-auto overscroll-y-contain rounded-md border border-[#e8ebf0] bg-[#fcfcfd] py-1 shadow-[0px_8px_20px_rgba(15,23,42,0.06)] scrollbar-services-ash';

export const ADS_FILTER_OPTION_CLASS =
  'flex w-full cursor-pointer items-start px-3 py-1.5 text-left text-sm leading-5 text-[#536070] whitespace-normal break-words transition-colors hover:bg-[#fff7f3] focus:outline-none focus-visible:bg-[#fff7f3]';

export const ADS_FILTER_OPTION_ACTIVE_CLASS =
  'bg-[#fff1eb] text-[#fc6f32] hover:bg-[#fff1eb] focus-visible:bg-[#fff1eb]';

export const ADS_GRID_CLASS =
  'grid grid-cols-1 gap-5 min-[426px]:grid-cols-1 min-[768px]:grid-cols-2 min-[1020px]:grid-cols-3 min-[1440px]:grid-cols-4';

export const ADS_EMPTY_CLASS =
  'rounded-2xl bg-white px-4 py-10 text-center text-sm text-[#6b7280] min-[426px]:text-base';

export const ADS_DELETE_OVERLAY_CLASS =
  'animate-fade-in fixed inset-0 z-[100] flex items-center justify-center bg-[rgba(0,0,0,0.7)] backdrop-blur-[17.4px] p-3 min-[376px]:p-4';

export const ADS_DELETE_DIALOG_CLASS =
  'animate-page-enter flex w-full max-w-[470px] flex-col overflow-hidden rounded-xl bg-white shadow-[0px_75px_88.5px_0px_rgba(14,20,35,0.25)]';

export const ADS_DELETE_HEADER_CLASS =
  'flex items-start justify-between gap-3 border-b border-[#edf0f3] px-4 py-4 min-[376px]:px-6 min-[376px]:pb-[21px] min-[376px]:pt-5';

export const ADS_DELETE_TITLE_CLASS =
  'pt-1 text-lg font-bold leading-7 tracking-[-0.5px] text-[#202838] min-[376px]:text-xl';

export const ADS_DELETE_CLOSE_CLASS =
  'cursor-pointer rounded-full p-1 text-[#536070] transition-colors hover:text-[#202838] focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-orange';

export const ADS_DELETE_BODY_CLASS =
  'flex flex-col gap-4 px-4 py-4 min-[376px]:gap-6 min-[376px]:px-6 min-[376px]:py-5';

export const ADS_DELETE_DESCRIPTION_CLASS =
  'text-sm leading-5 text-[#455163] min-[376px]:text-base min-[376px]:leading-6';

export const ADS_DELETE_ACTIONS_CLASS =
  'flex flex-col-reverse gap-2 min-[376px]:flex-row min-[376px]:items-center min-[376px]:justify-end';

export const ADS_DELETE_CANCEL_CLASS =
  'inline-flex h-9 w-full cursor-pointer items-center justify-center rounded-md border border-[#dfe4ea] px-4 text-xs text-[#536070] transition-colors hover:bg-[#f8fafc] focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-orange min-[376px]:w-auto';

export const ADS_DELETE_CONFIRM_CLASS =
  'inline-flex h-9 w-full cursor-pointer items-center justify-center rounded-md bg-[#f52e0b] px-4 text-xs text-white shadow-[0px_1px_1.5px_rgba(0,0,0,0.1),0px_1px_1px_rgba(0,0,0,0.1)] transition-colors hover:bg-[#d92809] focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-orange min-[376px]:w-auto';

export const ADS_CATEGORY_OPTIONS = [
  { id: ADS_ALL_FILTER_ID, label: 'All Categories' },
  ...CATALOG_COLLECTIONS.map((collection) => ({
    id: collection.title,
    label: collection.title,
  })),
];

const uniqueSubcategories = (services) =>
  [...new Set(services.map((service) => service.category))];

export const ADS_SUBCATEGORY_OPTIONS = [
  {
    id: ADS_ALL_FILTER_ID,
    label: 'All Sub-Categories',
    categoryId: ADS_ALL_FILTER_ID,
  },
  ...CATALOG_COLLECTIONS.flatMap((collection) =>
    uniqueSubcategories(collection.services).map((subcategory) => ({
      id: subcategory,
      label: subcategory,
      categoryId: collection.title,
    })),
  ),
];

export const ADS_SEED = ALL_CATALOG_SERVICES;
