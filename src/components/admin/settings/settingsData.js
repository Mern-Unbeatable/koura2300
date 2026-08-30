import { SETTINGS_COPY } from './settingsCopy';

export const SETTINGS_EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const SETTINGS_VISIBILITY_VISIBLE = 'visible';
export const SETTINGS_VISIBILITY_HIDDEN = 'hidden';

/** Figma 352:8292 — page stack gap 30px */
export const SETTINGS_PAGE_CLASS = 'flex w-full min-w-0 flex-col gap-[30px]';

/** Figma 352:8300 — Invite your team card */
export const SETTINGS_INVITE_CARD_CLASS =
  'flex w-full max-w-[717px] flex-col items-start justify-center gap-3 overflow-hidden rounded-2xl border border-solid border-[#e5e5e5] bg-white p-6';

export const SETTINGS_INVITE_TITLE_CLASS =
  'whitespace-nowrap text-[32px] font-normal leading-10 text-[#f59e0b] max-[425px]:whitespace-normal max-[425px]:text-[28px] max-[425px]:leading-9';

export const SETTINGS_INVITE_DESCRIPTION_CLASS =
  'w-full text-base font-normal text-[#4c545c]';

export const SETTINGS_INVITE_FORM_CLASS =
  'flex flex-row flex-wrap items-center gap-3';

export const SETTINGS_INVITE_FIELD_CLASS =
  'box-border w-[289px] max-w-full shrink-0 rounded-lg border-0 bg-[#fef5e7] px-2.5 py-2 text-sm font-normal leading-5 text-[#161d24] placeholder:text-[#979797] outline-none focus:ring-2 focus:ring-[#f59e0b]';

export const SETTINGS_INVITE_BUTTON_CLASS =
  'box-border inline-flex shrink-0 cursor-pointer items-center justify-center rounded-lg border-0 bg-[#f59e0b] px-2.5 py-2 text-sm font-normal leading-5 text-[#fef5e7] transition hover:bg-[#e08e09] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#f59e0b] focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50';

export const SETTINGS_MATRIX_PANEL_CLASS =
  'box-border h-auto w-full shrink-0 rounded-lg bg-[#fefaf6] pb-1';

export const SETTINGS_MATRIX_TITLE_ROW_CLASS =
  'flex w-full items-center justify-between px-5 pt-5 pb-0';

export const SETTINGS_MATRIX_TITLE_CLASS =
  'text-2xl font-bold leading-normal text-[#161d24]';

export const SETTINGS_MATRIX_TITLE_VISIBILITY_CLASS =
  'text-2xl font-bold leading-normal text-[#1f2933]';

export const SETTINGS_MATRIX_SCROLL_CLASS = 'mt-5 w-full overflow-x-auto';

/** Full-width rows so justify-between matches Figma column spread */
export const SETTINGS_MATRIX_HEADER_BAR_CLASS =
  'flex w-full min-w-[640px] items-center justify-between bg-[#fef5e7] px-4';

export const SETTINGS_MATRIX_ROW_CLASS =
  'flex w-full min-w-[640px] items-center justify-between border-b border-solid border-[#efefef] px-4 last:border-b-0';

export const SETTINGS_MATRIX_HEADER_CELL_CLASS =
  'shrink-0 px-2.5 py-3 text-base font-normal leading-normal text-[#697076]';

/** Figma row cells use py-[24px] */
export const SETTINGS_MATRIX_MODULE_CELL_CLASS =
  'w-[221px] shrink-0 px-2.5 py-6 text-base font-medium leading-normal text-[#161d24]';

export const SETTINGS_MATRIX_MODULE_CELL_VISIBILITY_CLASS =
  'w-[221px] shrink-0 px-2.5 py-6 text-base font-medium leading-normal text-[#1f2933]';

export const SETTINGS_MATRIX_MODERATOR_CELL_CLASS =
  'flex w-[180px] shrink-0 items-center px-2.5 py-6';

export const SETTINGS_MATRIX_ACTION_CELL_CLASS =
  'flex w-[160px] shrink-0 items-center px-2.5 py-6';

export const SETTINGS_MATRIX_VISIBILITY_STATUS_CLASS =
  'w-[180px] shrink-0 px-2.5 py-6 text-base font-normal leading-6 text-[#1f2933]';

export const SETTINGS_TOGGLE_TRACK_CLASS =
  'relative h-[22px] w-10 shrink-0 rounded-full transition-colors';

export const SETTINGS_TOGGLE_ON_CLASS = 'bg-[#059669]';
export const SETTINGS_TOGGLE_OFF_CLASS = 'bg-[#d2d5da]';

export const SETTINGS_TOGGLE_THUMB_CLASS =
  'absolute top-0.5 size-[18px] rounded-full bg-white shadow-[0px_2px_4px_0px_rgba(39,39,39,0.1)] transition-[left]';

export const SETTINGS_TOGGLE_THUMB_ON_LEFT = 'left-5';
export const SETTINGS_TOGGLE_THUMB_OFF_LEFT = 'left-0.5';

export const SETTINGS_DOWNLOAD_BUTTON_CLASS =
  'inline-flex cursor-pointer items-center gap-3.5 rounded-lg bg-[#f59e0b] px-5 py-2.5 text-lg font-medium leading-normal text-[#f0eae1] transition hover:bg-[#e08e09] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#f59e0b] focus-visible:ring-offset-2';

export const SETTINGS_DELETE_ICON_SIZE_PX = 24;
export const SETTINGS_DOWNLOAD_ICON_SIZE_PX = 24;

export const SETTINGS_HEADER_TITLE_CLASS =
  'text-[36px] font-semibold leading-normal text-[#050609] max-[768px]:text-3xl max-[425px]:text-2xl';

export const SETTINGS_HEADER_SUBTITLE_CLASS =
  'text-base font-normal leading-normal text-[#464646]';

export const SETTINGS_DELETE_BUTTON_CLASS =
  'inline-flex cursor-pointer items-center justify-center rounded-md p-0 text-[#d00000] transition hover:opacity-80 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500';

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
