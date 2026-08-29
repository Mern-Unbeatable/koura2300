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
  'grid items-start gap-x-10 gap-y-8 min-[768px]:grid-cols-2 min-[1440px]:grid-cols-3';

export const ADMIN_BLOG_ACTIONS_CLASS = 'flex w-full items-center gap-5';

export const ADMIN_BLOG_EDIT_BUTTON_CLASS =
  'inline-flex flex-1 cursor-pointer items-center justify-center rounded-full bg-[#fc6f32] px-2.5 py-1.5 text-base font-semibold leading-6 text-white transition-colors hover:bg-[#e8632b] focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-orange';

export const ADMIN_BLOG_DELETE_BUTTON_CLASS =
  'inline-flex flex-1 cursor-pointer items-center justify-center rounded-full bg-[#f52e0b] px-2.5 py-1.5 text-base font-semibold leading-6 text-white transition-colors hover:bg-[#d92809] focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-orange';

export const ADMIN_BLOG_EMPTY_CLASS =
  'rounded-2xl bg-white px-4 py-10 text-center text-sm text-[#6b7280]';

export const ADMIN_BLOG_DELETE_CLOSE_ICON_SIZE_PX = 18;

export const ADMIN_BLOG_DELETE_OVERLAY_CLASS =
  'animate-fade-in fixed inset-0 z-[100] flex items-center justify-center bg-[rgba(0,0,0,0.7)] backdrop-blur-[17.4px] p-3 min-[376px]:p-4';

export const ADMIN_BLOG_DELETE_DIALOG_CLASS =
  'animate-page-enter flex w-full max-w-[470px] flex-col overflow-hidden rounded-xl bg-white shadow-[0px_75px_88.5px_0px_rgba(14,20,35,0.25)]';

export const ADMIN_BLOG_DELETE_HEADER_CLASS =
  'flex items-start justify-between gap-3 border-b border-[#edf0f3] px-4 py-4 min-[376px]:px-6 min-[376px]:pb-[21px] min-[376px]:pt-5';

export const ADMIN_BLOG_DELETE_TITLE_CLASS =
  'pt-1 text-lg font-bold leading-7 tracking-[-0.5px] text-[#202838] min-[376px]:text-xl';

export const ADMIN_BLOG_DELETE_CLOSE_CLASS =
  'cursor-pointer rounded-full p-1 text-[#536070] transition-colors hover:text-[#202838] focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-orange';

export const ADMIN_BLOG_DELETE_BODY_CLASS =
  'flex flex-col gap-4 px-4 py-4 min-[376px]:gap-6 min-[376px]:px-6 min-[376px]:py-5';

export const ADMIN_BLOG_DELETE_DESCRIPTION_CLASS =
  'text-sm leading-5 text-[#455163] min-[376px]:text-base min-[376px]:leading-6';

export const ADMIN_BLOG_DELETE_ACTIONS_CLASS =
  'flex flex-col-reverse gap-2 min-[376px]:flex-row min-[376px]:items-center min-[376px]:justify-end';

export const ADMIN_BLOG_DELETE_CANCEL_CLASS =
  'inline-flex h-9 w-full cursor-pointer items-center justify-center rounded-md border border-[#dfe4ea] px-4 text-xs text-[#536070] transition-colors hover:bg-[#f8fafc] focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-orange min-[376px]:w-auto';

export const ADMIN_BLOG_DELETE_CONFIRM_CLASS =
  'inline-flex h-9 w-full cursor-pointer items-center justify-center rounded-md bg-[#f52e0b] px-4 text-xs text-white shadow-[0px_1px_1.5px_rgba(0,0,0,0.1),0px_1px_1px_rgba(0,0,0,0.1)] transition-colors hover:bg-[#d92809] focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-orange min-[376px]:w-auto';

export {
  ADMIN_PAGINATION_CLASS as ADMIN_BLOG_PAGINATION_CLASS,
  ADMIN_PAGINATION_CONTROL_CLASS as ADMIN_BLOG_PAGINATION_CONTROL_CLASS,
  ADMIN_PAGINATION_PAGE_CLASS as ADMIN_BLOG_PAGINATION_PAGE_CLASS,
  ADMIN_PAGINATION_PAGE_ACTIVE_CLASS as ADMIN_BLOG_PAGINATION_PAGE_ACTIVE_CLASS,
  ADMIN_PAGINATION_ELLIPSIS_CLASS as ADMIN_BLOG_PAGINATION_ELLIPSIS_CLASS,
} from '../shared/adminPaginationData';

export const ADMIN_BLOG_SEED = ARTICLE_ITEMS.map((article) => ({
  ...article,
  readMinutes: ADMIN_BLOG_DEFAULT_READ_MINUTES,
  readTimeLabel: formatReadMinutesLabel(ADMIN_BLOG_DEFAULT_READ_MINUTES),
}));
