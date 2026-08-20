import { SERVICE_ITEMS } from '../home/landingData';

export const TOP_RATED_PAGE_SIZE = 12;
export const TOP_RATED_PAGE_COUNT = 3;
export const TOP_RATED_PAGE_NUMBER_OFFSET = 1;
export const TOP_RATED_VIEW_ALL_ICON_SIZE = 16;
export const TOP_RATED_PAGINATION_ICON_SIZE = 18;

export const TOP_RATED_PAGE_CLASS =
  'min-h-screen overflow-x-clip bg-white font-inter text-brand-ink';
export const TOP_RATED_MAIN_CLASS =
  'animate-page-enter mx-auto max-w-screen-2xl px-4 pb-24 pt-10 sm:px-6 sm:pt-12 lg:px-8 lg:pb-28';
export const TOP_RATED_HEADER_CLASS = 'flex items-end justify-between gap-5';
export const TOP_RATED_TITLE_CLASS =
  'text-3xl font-extrabold text-brand-blue sm:text-4xl';
export const TOP_RATED_SUBTITLE_CLASS = 'mt-2 text-base text-gray-500';
export const TOP_RATED_VIEW_ALL_CLASS =
  'inline-flex shrink-0 items-center gap-2 text-sm font-semibold text-brand-orange transition-colors hover:text-brand-orange-dark focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-orange';
export const TOP_RATED_GRID_CLASS = 'mt-10 grid gap-5 sm:grid-cols-2 xl:grid-cols-4';
export const TOP_RATED_EMPTY_CLASS =
  'mt-10 rounded-xl border border-gray-200 bg-gray-50 p-8 text-center text-gray-500';
export const TOP_RATED_PAGINATION_WRAP_CLASS = 'mt-16';
export const TOP_RATED_PAGINATION_NAV_CLASS =
  'flex flex-wrap items-center justify-center gap-2';
export const TOP_RATED_PAGINATION_ARROW_CLASS =
  'flex size-8 cursor-pointer items-center justify-center rounded border border-[#dfe3e8] bg-white text-[#212b36] transition-colors hover:border-brand-orange hover:text-brand-orange focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-orange disabled:cursor-not-allowed disabled:border-transparent disabled:bg-[#919eab] disabled:text-white disabled:opacity-50';
export const TOP_RATED_PAGINATION_PAGE_IDLE =
  'flex size-8 cursor-pointer items-center justify-center rounded border border-[#dfe3e8] bg-white text-sm font-bold text-[#212b36] transition-colors hover:border-brand-orange hover:text-brand-orange focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-orange';
export const TOP_RATED_PAGINATION_PAGE_ACTIVE =
  'flex size-8 cursor-pointer items-center justify-center rounded border border-brand-orange bg-brand-orange text-sm font-bold text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-orange';

const createTopRatedServiceCopy = (service, copyIndex) => ({
  ...service,
  id: `${service.id}-${copyIndex + 1}`,
});

export const buildTopRatedServices = (
  baseServices = SERVICE_ITEMS,
  pageSize = TOP_RATED_PAGE_SIZE,
  pageCount = TOP_RATED_PAGE_COUNT,
) => {
  const totalItems = pageSize * pageCount;

  return Array.from({ length: totalItems }, (_, index) =>
    createTopRatedServiceCopy(baseServices[index % baseServices.length], index),
  );
};

export const TOP_RATED_SERVICES = buildTopRatedServices();
