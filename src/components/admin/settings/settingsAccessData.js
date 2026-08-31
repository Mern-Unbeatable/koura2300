import {
  SETTINGS_MODERATOR_STATUS_ACTIVE,
  SETTINGS_MODERATOR_STATUS_DISABLED,
} from './settingsData';

export { SETTINGS_MODERATOR_STATUS_ACTIVE, SETTINGS_MODERATOR_STATUS_DISABLED };

export const SETTINGS_MODERATOR_ACCESS_MAX_WIDTH_PX = 470;
export const SETTINGS_MODERATOR_ACCESS_CLOSE_ICON_SIZE_PX = 18;
export const SETTINGS_MODERATOR_ACCESS_CHECKBOX_SIZE_PX = 18;
export const SETTINGS_MODERATOR_ACCESS_CHECK_ICON_SIZE_PX = 14;

export const SETTINGS_MODERATOR_ACCESS_PERMISSION_OVERVIEW = 'overview-analytics';
export const SETTINGS_MODERATOR_ACCESS_PERMISSION_BOOKINGS = 'bookings';
export const SETTINGS_MODERATOR_ACCESS_PERMISSION_CUSTOMERS = 'customers';
export const SETTINGS_MODERATOR_ACCESS_PERMISSION_SERVICES = 'services';
export const SETTINGS_MODERATOR_ACCESS_PERMISSION_CATEGORIES = 'categories-management';
export const SETTINGS_MODERATOR_ACCESS_PERMISSION_REVIEWS = 'reviews';
export const SETTINGS_MODERATOR_ACCESS_PERMISSION_BLOG = 'blog-post';
export const SETTINGS_MODERATOR_ACCESS_PERMISSION_ADS = 'ads-management';
export const SETTINGS_MODERATOR_ACCESS_PERMISSION_MESSAGE = 'message';

/** Figma 678:1930 — access label aliases used by seed rows */
export const SETTINGS_MODERATOR_ACCESS_LABEL_ALIASES = {
  'Dashboard/ Overview': SETTINGS_MODERATOR_ACCESS_PERMISSION_OVERVIEW,
  'Overview / Analytics': SETTINGS_MODERATOR_ACCESS_PERMISSION_OVERVIEW,
  Bookings: SETTINGS_MODERATOR_ACCESS_PERMISSION_BOOKINGS,
  Customers: SETTINGS_MODERATOR_ACCESS_PERMISSION_CUSTOMERS,
  Services: SETTINGS_MODERATOR_ACCESS_PERMISSION_SERVICES,
  'Categories Management': SETTINGS_MODERATOR_ACCESS_PERMISSION_CATEGORIES,
  Reviews: SETTINGS_MODERATOR_ACCESS_PERMISSION_REVIEWS,
  'Blog Post': SETTINGS_MODERATOR_ACCESS_PERMISSION_BLOG,
  'Ads Management': SETTINGS_MODERATOR_ACCESS_PERMISSION_ADS,
  Message: SETTINGS_MODERATOR_ACCESS_PERMISSION_MESSAGE,
};

export const SETTINGS_MODERATOR_ACCESS_PERMISSIONS = [
  {
    id: SETTINGS_MODERATOR_ACCESS_PERMISSION_OVERVIEW,
    label: 'Overview / Analytics',
  },
  {
    id: SETTINGS_MODERATOR_ACCESS_PERMISSION_BOOKINGS,
    label: 'Bookings',
  },
  {
    id: SETTINGS_MODERATOR_ACCESS_PERMISSION_CUSTOMERS,
    label: 'Customers',
  },
  {
    id: SETTINGS_MODERATOR_ACCESS_PERMISSION_SERVICES,
    label: 'Services',
  },
  {
    id: SETTINGS_MODERATOR_ACCESS_PERMISSION_CATEGORIES,
    label: 'Categories Management',
  },
  {
    id: SETTINGS_MODERATOR_ACCESS_PERMISSION_REVIEWS,
    label: 'Reviews',
  },
  {
    id: SETTINGS_MODERATOR_ACCESS_PERMISSION_BLOG,
    label: 'Blog Post',
  },
  {
    id: SETTINGS_MODERATOR_ACCESS_PERMISSION_ADS,
    label: 'Ads Management',
  },
  {
    id: SETTINGS_MODERATOR_ACCESS_PERMISSION_MESSAGE,
    label: 'Message',
  },
];

export const SETTINGS_MODERATOR_ACCESS_OVERLAY_CLASS =
  'animate-fade-in fixed inset-0 z-[100] flex items-center justify-center bg-[rgba(0,0,0,0.7)] backdrop-blur-[17.4px] p-3 min-[376px]:p-4';

export const SETTINGS_MODERATOR_ACCESS_DIALOG_CLASS =
  'animate-page-enter flex w-full max-w-[470px] flex-col overflow-hidden rounded-xl bg-white shadow-[0px_75px_88.5px_0px_rgba(14,20,35,0.25)]';

export const SETTINGS_MODERATOR_ACCESS_HEADER_CLASS =
  'flex items-start justify-between gap-3 border-b border-[#edf0f3] px-4 py-4 min-[376px]:px-6 min-[376px]:pb-[21px] min-[376px]:pt-5';

export const SETTINGS_MODERATOR_ACCESS_TITLE_CLASS =
  'pt-1 text-lg font-bold leading-7 tracking-[-0.5px] text-[#202838] min-[376px]:text-xl';

export const SETTINGS_MODERATOR_ACCESS_CLOSE_CLASS =
  'cursor-pointer rounded-full p-1 text-[#536070] transition-colors hover:text-[#202838] focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-orange';

export const SETTINGS_MODERATOR_ACCESS_BODY_CLASS =
  'flex flex-col gap-3 px-4 py-4 min-[376px]:px-6 min-[376px]:py-5';

export const SETTINGS_MODERATOR_ACCESS_OPTION_CLASS =
  'flex cursor-pointer items-center gap-3 text-left';

export const SETTINGS_MODERATOR_ACCESS_CHECKBOX_BASE_CLASS =
  'inline-flex size-[18px] shrink-0 items-center justify-center rounded-[2px] p-0.5 transition-colors';

export const SETTINGS_MODERATOR_ACCESS_CHECKBOX_CHECKED_CLASS =
  `${SETTINGS_MODERATOR_ACCESS_CHECKBOX_BASE_CLASS} border-0 bg-[#fc6f32] text-white`;

export const SETTINGS_MODERATOR_ACCESS_CHECKBOX_UNCHECKED_CLASS =
  `${SETTINGS_MODERATOR_ACCESS_CHECKBOX_BASE_CLASS} border border-black bg-white text-transparent`;

export const SETTINGS_MODERATOR_ACCESS_OPTION_LABEL_CLASS =
  'text-sm font-medium leading-normal text-[#2a2a2a] min-[376px]:text-base';

export const SETTINGS_MODERATOR_ACCESS_ACTIONS_CLASS =
  'mt-3 flex flex-col-reverse gap-2 pt-3 min-[376px]:mt-0 min-[376px]:flex-row min-[376px]:items-center min-[376px]:justify-end min-[376px]:pt-6';

export const SETTINGS_MODERATOR_ACCESS_STATUS_BUTTON_CLASS =
  'inline-flex h-9 w-full cursor-pointer items-center justify-center rounded-md border border-[#dfe4ea] px-[17px] py-[9px] text-xs leading-4 text-[#536070] transition-colors hover:bg-[#f8fafc] focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-orange min-[376px]:w-auto';

export const SETTINGS_MODERATOR_ACCESS_STATUS_BUTTON_ACTIVE_CLASS =
  `${SETTINGS_MODERATOR_ACCESS_STATUS_BUTTON_CLASS} border-[#fc6f32] text-[#fc6f32]`;

export const SETTINGS_MODERATOR_ACCESS_SAVE_CLASS =
  'inline-flex h-9 w-full cursor-pointer items-center justify-center rounded-md bg-[#fc6f32] px-4 py-2 text-xs leading-4 text-white shadow-[0px_1px_1.5px_rgba(0,0,0,0.1),0px_1px_1px_rgba(0,0,0,0.1)] transition-colors hover:bg-brand-orange-dark focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-orange min-[376px]:w-auto';
