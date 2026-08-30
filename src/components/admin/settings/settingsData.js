import { SETTINGS_COPY } from './settingsCopy';

export const SETTINGS_EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const SETTINGS_VISIBILITY_VISIBLE = 'visible';
export const SETTINGS_VISIBILITY_HIDDEN = 'hidden';

/** Figma 352:8292 — page stack gap 30px */
export const SETTINGS_PAGE_CLASS = 'flex w-full min-w-0 flex-col gap-[30px]';

/** Invite card sized to email + send (no role select). */
export const SETTINGS_INVITE_CARD_CLASS =
  'flex w-full max-w-[560px] flex-col items-start justify-center gap-3 overflow-hidden rounded-2xl border border-solid border-[#e5e5e5] bg-white p-6';

export const SETTINGS_INVITE_TITLE_CLASS =
  'text-[32px] font-normal leading-10 text-[#f59e0b] max-[425px]:text-[28px] max-[425px]:leading-9';

export const SETTINGS_INVITE_DESCRIPTION_CLASS =
  'w-full text-base font-normal leading-6 text-[#4c545c]';

export const SETTINGS_INVITE_FORM_CLASS =
  'flex w-[92%] max-w-full flex-row flex-wrap items-center gap-3';

export const SETTINGS_INVITE_FIELD_WRAP_CLASS = 'flex min-w-0 flex-1 flex-col gap-1';

export const SETTINGS_INVITE_FIELD_CLASS =
  'box-border w-full min-w-0 rounded-lg border-0 bg-[#fef5e7] px-2.5 py-1.5 text-sm font-normal leading-5 text-[#161d24] placeholder:text-[#979797] outline-none focus:ring-2 focus:ring-[#f59e0b]';

export const SETTINGS_INVITE_BUTTON_CLASS =
  'box-border inline-flex shrink-0 cursor-pointer items-center justify-center rounded-lg border-0 bg-[#f59e0b] px-3 py-1.5 text-sm font-normal leading-5 text-[#fef5e7] transition hover:bg-[#e08e09] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#f59e0b] focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50';

export const SETTINGS_VIEWPORT = {
  MOBILE_S: 320,
  MOBILE_M: 375,
  MOBILE_L: 425,
};

/**
 * Matrix outer card.
 * Mobile S/M/L (≤425): card shell + stacked row cards.
 * ≥426: unchanged Figma table layout.
 */
export const SETTINGS_MATRIX_PANEL_CLASS =
  'box-border h-auto w-full min-w-0 shrink-0 overflow-hidden rounded-lg border border-solid border-[#e8e4df] bg-[#fefaf6] pb-1 max-[425px]:rounded-xl max-[425px]:pb-3';

export const SETTINGS_MATRIX_TITLE_ROW_CLASS =
  'flex w-full min-w-0 flex-wrap items-center justify-between gap-3 px-3 pt-4 pb-0 max-[320px]:gap-2 max-[320px]:px-2.5 max-[320px]:pt-3 min-[376px]:px-3.5 max-[425px]:flex-col max-[425px]:items-stretch min-[426px]:flex-row min-[426px]:items-center min-[426px]:gap-4 min-[426px]:px-5 min-[426px]:pt-5';

export const SETTINGS_MATRIX_TITLE_CLASS =
  'min-w-0 text-xl font-bold leading-normal text-[#161d24] max-[320px]:text-lg min-[426px]:text-2xl';

export const SETTINGS_MATRIX_TITLE_VISIBILITY_CLASS =
  'min-w-0 text-xl font-bold leading-normal text-[#1f2933] max-[320px]:text-lg min-[426px]:text-2xl';

export const SETTINGS_MATRIX_SCROLL_CLASS =
  'mt-4 w-full min-w-0 max-[425px]:mt-3 max-[425px]:flex max-[425px]:flex-col max-[425px]:gap-3 max-[425px]:overflow-visible max-[425px]:px-3 max-[425px]:pb-0 max-[320px]:gap-2.5 max-[320px]:px-2.5 min-[376px]:max-[425px]:px-3.5 min-[426px]:mt-5 min-[426px]:overflow-x-auto min-[426px]:overscroll-x-contain min-[426px]:px-0';

export const SETTINGS_MATRIX_LIST_CLASS =
  'flex w-full min-w-0 flex-col max-[425px]:gap-3 max-[320px]:gap-2.5 min-[426px]:gap-0';

/** Table header — desktop only */
export const SETTINGS_MATRIX_HEADER_BAR_CLASS =
  'hidden w-full min-w-[640px] items-center justify-between bg-[#fef5e7] px-4 min-[426px]:flex';

/**
 * Row: card stack on Mobile S/M/L; table row from 426px up.
 */
export const SETTINGS_MATRIX_ROW_CLASS =
  'flex w-full min-w-0 flex-col gap-3 rounded-lg border border-solid border-[#efefef] bg-white p-3 max-[320px]:gap-2.5 max-[320px]:p-2.5 min-[376px]:max-[425px]:p-3.5 min-[426px]:min-w-[640px] min-[426px]:flex-row min-[426px]:items-center min-[426px]:justify-between min-[426px]:gap-0 min-[426px]:rounded-none min-[426px]:border-0 min-[426px]:border-b min-[426px]:border-[#efefef] min-[426px]:bg-transparent min-[426px]:p-0 min-[426px]:px-4 last:min-[426px]:border-b-0';

export const SETTINGS_MATRIX_MOBILE_LABEL_CLASS =
  'mb-1 block text-xs font-normal leading-normal text-[#697076] min-[426px]:hidden';

export const SETTINGS_MATRIX_HEADER_CELL_CLASS =
  'shrink-0 px-2.5 py-3 text-base font-normal leading-normal text-[#697076]';

export const SETTINGS_MATRIX_HEADER_MODULE_WIDTH_CLASS = 'w-[221px]';
export const SETTINGS_MATRIX_HEADER_MODERATOR_WIDTH_CLASS = 'w-[180px]';
export const SETTINGS_MATRIX_HEADER_ACTION_WIDTH_CLASS = 'w-[160px]';

export const SETTINGS_MATRIX_MODULE_CELL_CLASS =
  'flex w-full min-w-0 flex-col px-0 py-0 text-sm font-medium leading-normal text-[#161d24] min-[426px]:w-[221px] min-[426px]:shrink-0 min-[426px]:px-2.5 min-[426px]:py-6 min-[426px]:text-base';

export const SETTINGS_MATRIX_MODULE_CELL_VISIBILITY_CLASS =
  'flex w-full min-w-0 flex-col px-0 py-0 text-sm font-medium leading-normal text-[#1f2933] min-[426px]:w-[221px] min-[426px]:shrink-0 min-[426px]:px-2.5 min-[426px]:py-6 min-[426px]:text-base';

export const SETTINGS_MATRIX_MODERATOR_CELL_CLASS =
  'flex w-full min-w-0 flex-col items-start px-0 py-0 min-[426px]:w-[180px] min-[426px]:shrink-0 min-[426px]:flex-row min-[426px]:items-center min-[426px]:px-2.5 min-[426px]:py-6';

export const SETTINGS_MATRIX_ACTION_CELL_CLASS =
  'flex w-full min-w-0 flex-col items-start px-0 py-0 min-[426px]:w-[160px] min-[426px]:shrink-0 min-[426px]:flex-row min-[426px]:items-center min-[426px]:px-2.5 min-[426px]:py-6';

export const SETTINGS_MATRIX_VISIBILITY_STATUS_CLASS =
  'flex w-full min-w-0 flex-col px-0 py-0 text-sm font-normal leading-6 text-[#1f2933] min-[426px]:w-[180px] min-[426px]:shrink-0 min-[426px]:px-2.5 min-[426px]:py-6 min-[426px]:text-base';

export const SETTINGS_TOGGLE_TRACK_CLASS =
  'relative h-[22px] w-10 shrink-0 rounded-full transition-colors';

export const SETTINGS_TOGGLE_ON_CLASS = 'bg-[#059669]';
export const SETTINGS_TOGGLE_OFF_CLASS = 'bg-[#d2d5da]';

export const SETTINGS_TOGGLE_THUMB_CLASS =
  'absolute top-0.5 size-[18px] rounded-full bg-white shadow-[0px_2px_4px_0px_rgba(39,39,39,0.1)] transition-[left]';

export const SETTINGS_TOGGLE_THUMB_ON_LEFT = 'left-5';
export const SETTINGS_TOGGLE_THUMB_OFF_LEFT = 'left-0.5';

export const SETTINGS_DOWNLOAD_BUTTON_CLASS =
  'inline-flex shrink-0 cursor-pointer items-center justify-center gap-2 rounded-lg bg-[#f59e0b] px-3 py-2 text-sm font-medium leading-normal text-[#f0eae1] transition hover:bg-[#e08e09] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#f59e0b] focus-visible:ring-offset-2 max-[425px]:w-full min-[426px]:gap-3.5 min-[426px]:px-5 min-[426px]:py-2.5 min-[426px]:text-lg';

export const SETTINGS_DELETE_ICON_SIZE_PX = 24;
export const SETTINGS_DOWNLOAD_ICON_SIZE_PX = 24;

export const SETTINGS_HEADER_TITLE_CLASS =
  'text-[36px] font-semibold leading-normal text-[#050609] max-[768px]:text-3xl max-[425px]:text-2xl';

export const SETTINGS_HEADER_SUBTITLE_CLASS = 'text-base font-normal leading-normal text-[#464646]';

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
