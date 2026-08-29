import { ARTICLE_ITEMS } from '../../home/landingData';
import { formatReadMinutesLabel } from './blogUtils';

export const ADMIN_BLOG_VIEWPORT = {
  MOBILE_S: 320,
  MOBILE_M: 375,
  MOBILE_L: 425,
  TABLET: 768,
  LAPTOP: 1020,
  DESKTOP: 1440,
};

export const ADMIN_BLOG_PAGE_SIZE = 12;
export const ADMIN_BLOG_DEFAULT_READ_MINUTES = 10;
export const ADMIN_BLOG_DEFAULT_AUTHOR = 'Ahmed Awad';

export const ADMIN_BLOG_PAGE_CLASS =
  'flex min-w-0 flex-col gap-6 max-[425px]:gap-5 min-[426px]:gap-6 min-[768px]:gap-8 min-[1020px]:gap-[30px]';

export const ADMIN_BLOG_HEADER_CLASS =
  'flex flex-col gap-4 min-[768px]:flex-row min-[768px]:items-center min-[768px]:justify-between';

export const ADMIN_BLOG_HEADER_TEXT_CLASS = 'flex min-w-0 flex-col gap-2';

export const ADMIN_BLOG_TITLE_CLASS =
  'text-[28px] font-semibold leading-[1.2] text-[#050609] min-[376px]:text-[32px] min-[768px]:text-[36px]';

export const ADMIN_BLOG_SUBTITLE_CLASS =
  'text-sm leading-5 text-[#333] min-[768px]:text-sm min-[768px]:leading-normal';

export const ADMIN_BLOG_ADD_BUTTON_CLASS =
  'inline-flex w-full cursor-pointer items-center justify-center rounded-lg bg-[#fc6f32] px-6 py-3 text-base font-medium leading-6 text-white transition-colors hover:bg-[#e8632b] focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-orange min-[426px]:w-auto';

export const ADMIN_BLOG_GRID_CLASS =
  'grid items-start gap-x-10 gap-y-8 min-[768px]:grid-cols-2 min-[1020px]:grid-cols-3';

export const ADMIN_BLOG_ACTIONS_CLASS = 'flex w-full items-center gap-5';

export const ADMIN_BLOG_EDIT_BUTTON_CLASS =
  'inline-flex flex-1 cursor-pointer items-center justify-center rounded-full bg-[#fc6f32] px-2.5 py-1.5 text-base font-semibold leading-6 text-white transition-colors hover:bg-[#e8632b] focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-orange';

export const ADMIN_BLOG_DELETE_BUTTON_CLASS =
  'inline-flex flex-1 cursor-pointer items-center justify-center rounded-full bg-[#f52e0b] px-2.5 py-1.5 text-base font-semibold leading-6 text-white transition-colors hover:bg-[#d92809] focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-orange';

export const ADMIN_BLOG_EMPTY_CLASS =
  'rounded-2xl bg-white px-4 py-10 text-center text-sm text-[#6b7280]';

export const ADMIN_BLOG_PAGINATION_CLASS =
  'flex flex-wrap items-center justify-center gap-[5px]';

export const ADMIN_BLOG_PAGINATION_CONTROL_CLASS =
  'inline-flex h-8 min-w-8 cursor-pointer items-center justify-center rounded-lg bg-white px-1 text-[13px] font-semibold text-[#333] transition-colors hover:bg-[#f8fafc] focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-orange disabled:cursor-not-allowed disabled:text-[#ccc] disabled:hover:bg-white';

export const ADMIN_BLOG_PAGINATION_PAGE_CLASS =
  'inline-flex size-8 cursor-pointer items-center justify-center rounded-lg border border-[#f1f1f1] bg-white p-2.5 text-[13px] font-semibold text-[#333] transition-colors hover:bg-[#f8fafc] focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-orange';

export const ADMIN_BLOG_PAGINATION_PAGE_ACTIVE_CLASS =
  'inline-flex size-8 cursor-pointer items-center justify-center rounded-lg bg-[#fc6f32] p-2.5 text-[13px] font-semibold text-white transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-orange';

export const ADMIN_BLOG_PAGINATION_ELLIPSIS_CLASS =
  'inline-flex size-8 items-center justify-center rounded-lg bg-white p-2.5 text-[13px] font-semibold text-[#333]';

const ADMIN_BLOG_AUTHORS_BY_ID = {
  plumbing: 'Ahmed Awad',
  electrician: 'Ahmed Awad',
  repairs: 'Ahmed Awad',
  shape: 'Ahmed Awad',
  winter: 'Ahmed Awad',
  routine: 'Ahmed Awad',
};

export const ADMIN_BLOG_SEED = ARTICLE_ITEMS.map((article) => ({
  ...article,
  author: ADMIN_BLOG_AUTHORS_BY_ID[article.id] || ADMIN_BLOG_DEFAULT_AUTHOR,
  readMinutes: ADMIN_BLOG_DEFAULT_READ_MINUTES,
  readTimeLabel: formatReadMinutesLabel(ADMIN_BLOG_DEFAULT_READ_MINUTES),
}));
