import { SETTINGS_COPY } from './settingsCopy';

export const SETTINGS_EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const SETTINGS_ROLE_MODERATOR = 'moderator';

export const SETTINGS_ROLE_OPTIONS = [
  { value: SETTINGS_ROLE_MODERATOR, label: 'Moderator' },
];

export const SETTINGS_VISIBILITY_VISIBLE = 'visible';
export const SETTINGS_VISIBILITY_HIDDEN = 'hidden';

export const SETTINGS_PAGE_CLASS = 'flex w-full min-w-0 flex-col gap-6 sm:gap-7 lg:gap-[30px]';

export const SETTINGS_INVITE_CARD_CLASS =
  'flex w-full max-w-[717px] flex-col gap-3 rounded-2xl border border-[#e5e5e5] bg-white p-4 sm:p-5 lg:p-6';

export const SETTINGS_INVITE_TITLE_CLASS =
  'text-2xl leading-10 text-[#f59e0b] sm:text-[28px] lg:text-[32px]';

export const SETTINGS_INVITE_FIELD_CLASS =
  'w-full min-w-0 rounded-lg bg-[#fef5e7] px-2.5 py-2 text-sm text-[#161d24] placeholder:text-[#979797] outline-none transition focus:ring-2 focus:ring-[#f59e0b] sm:w-[289px]';

export const SETTINGS_INVITE_SELECT_CLASS =
  'w-full min-w-0 cursor-pointer rounded-lg bg-[#fef5e7] px-2.5 py-2 text-sm text-[#f59e0b] outline-none transition focus:ring-2 focus:ring-[#f59e0b] sm:w-auto';

export const SETTINGS_INVITE_BUTTON_CLASS =
  'inline-flex shrink-0 cursor-pointer items-center justify-center rounded-lg bg-[#f59e0b] px-2.5 py-2 text-sm text-[#fef5e7] transition hover:bg-[#e08e09] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#f59e0b] focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50';

export const SETTINGS_MATRIX_PANEL_CLASS =
  'w-full overflow-hidden rounded-lg bg-[#fefaf6]';

export const SETTINGS_MATRIX_HEADER_BAR_CLASS =
  'flex min-w-[520px] items-center justify-between bg-[#fef5e7] px-4';

export const SETTINGS_MATRIX_ROW_CLASS =
  'flex min-w-[520px] items-center justify-between border-b border-[#efefef] px-4 last:border-b-0';

export const SETTINGS_MATRIX_MODULE_CELL_CLASS =
  'w-[140px] shrink-0 px-1.5 py-4 text-sm font-medium text-[#161d24] sm:w-[180px] sm:px-2.5 sm:py-6 sm:text-base lg:w-[221px]';

export const SETTINGS_MATRIX_MODERATOR_CELL_CLASS =
  'w-[120px] shrink-0 px-1.5 py-4 sm:w-[150px] sm:px-2.5 sm:py-6 lg:w-[180px]';

export const SETTINGS_MATRIX_ACTION_CELL_CLASS =
  'w-[100px] shrink-0 px-1.5 py-4 sm:w-[130px] sm:px-2.5 sm:py-6 lg:w-[160px]';

export const SETTINGS_TOGGLE_TRACK_CLASS =
  'relative h-[22px] w-10 shrink-0 rounded-full transition-colors';

export const SETTINGS_TOGGLE_ON_CLASS = 'bg-[#059669]';
export const SETTINGS_TOGGLE_OFF_CLASS = 'bg-[#d2d5da]';

export const SETTINGS_TOGGLE_THUMB_CLASS =
  'absolute top-0.5 size-[18px] rounded-full bg-white shadow-[0px_2px_4px_0px_rgba(39,39,39,0.1)] transition-[left]';

export const SETTINGS_TOGGLE_THUMB_ON_LEFT = 'left-5';
export const SETTINGS_TOGGLE_THUMB_OFF_LEFT = 'left-0.5';

export const SETTINGS_DOWNLOAD_BUTTON_CLASS =
  'inline-flex cursor-pointer items-center gap-2.5 rounded-lg bg-[#f59e0b] px-4 py-2.5 text-base font-medium text-[#f0eae1] transition hover:bg-[#e08e09] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#f59e0b] focus-visible:ring-offset-2 sm:gap-3.5 sm:px-5 sm:text-lg';

export const SETTINGS_DELETE_ICON_SIZE_PX = 24;
export const SETTINGS_DOWNLOAD_ICON_SIZE_PX = 24;

export const SETTINGS_HEADER_TITLE_CLASS =
  'text-2xl font-semibold text-[#050609] sm:text-3xl lg:text-[36px]';

export const SETTINGS_HEADER_SUBTITLE_CLASS =
  'text-sm leading-normal text-[#464646] sm:text-base';

export const SETTINGS_DELETE_BUTTON_CLASS =
  'inline-flex cursor-pointer rounded-md p-1 text-[#d00000] transition hover:bg-red-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500';

export const SETTINGS_TOGGLE_FOCUS_CLASS =
  'cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#059669] focus-visible:ring-offset-2';


export const SETTINGS_VISIBILITY_CSV_FILENAME = 'visibility-matrix.csv';

/** Figma Edit Matrix seed rows. */
export const SETTINGS_EDIT_MATRIX_SEED = [
  { id: 'dashboard', name: 'Dashboard/ Overview', canEdit: false },
  { id: 'bookings', name: 'Bookings', canEdit: true },
  { id: 'customers', name: 'Customers', canEdit: true },
  { id: 'services', name: 'Services', canEdit: true },
  { id: 'categories', name: 'Categories Management', canEdit: false },
  { id: 'reviews', name: 'Reviews', canEdit: false },
  { id: 'blog', name: 'Blog Post', canEdit: false },
  { id: 'ads', name: 'Ads Management', canEdit: false },
  { id: 'messages', name: 'Messages', canEdit: false },
];

/** Figma Visibility Matrix seed rows (labels match design, including Overview / Analytics). */
export const SETTINGS_VISIBILITY_MATRIX_SEED = [
  {
    id: 'overview',
    name: 'Overview / Analytics',
    visibility: SETTINGS_VISIBILITY_HIDDEN,
  },
  { id: 'bookings', name: 'Bookings', visibility: SETTINGS_VISIBILITY_VISIBLE },
  { id: 'customers', name: 'Customers', visibility: SETTINGS_VISIBILITY_VISIBLE },
  { id: 'services', name: 'Services', visibility: SETTINGS_VISIBILITY_VISIBLE },
  {
    id: 'categories',
    name: 'Categories Management',
    visibility: SETTINGS_VISIBILITY_VISIBLE,
  },
  { id: 'reviews', name: 'Reviews', visibility: SETTINGS_VISIBILITY_HIDDEN },
  { id: 'blog', name: 'Blog Post', visibility: SETTINGS_VISIBILITY_HIDDEN },
  { id: 'ads', name: 'Ads Management', visibility: SETTINGS_VISIBILITY_HIDDEN },
  { id: 'messages', name: 'Messages', visibility: SETTINGS_VISIBILITY_HIDDEN },
];

export const getVisibilityLabel = (visibility, copy = SETTINGS_COPY) =>
  visibility === SETTINGS_VISIBILITY_VISIBLE
    ? copy.visibilityMatrix.visible
    : copy.visibilityMatrix.hidden;
