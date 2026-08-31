import { SETTINGS_COPY } from './settingsCopy';

export const SETTINGS_EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const SETTINGS_VIEWPORT = {
  MOBILE_S: 320,
  MOBILE_M: 375,
  MOBILE_L: 425,
  TABLET: 768,
  LAPTOP: 1020,
  DESKTOP: 1440,
};

export const SETTINGS_MODERATOR_PAGE_SIZE = 7;
export const SETTINGS_MODERATOR_STATUS_ACTIVE = 'active';
export const SETTINGS_MODERATOR_STATUS_DISABLED = 'disabled';

export const SETTINGS_MODERATOR_EDIT_ICON_SIZE_PX = 24;

/** Cards for mobile → laptop; table only from desktop width. */
export const SETTINGS_MODERATORS_CARDS_MAX_WIDTH_PX = SETTINGS_VIEWPORT.DESKTOP - 1;

export const SETTINGS_MODERATORS_TABLE_MIN_WIDTH_PX = 1109;

/** Figma 352:8292 — page stack gap 30px */
export const SETTINGS_PAGE_CLASS = 'flex w-full min-w-0 flex-col gap-[30px]';

/** Figma 352:8300 — Invite your team card */
export const SETTINGS_INVITE_CARD_CLASS =
  'flex w-fit max-w-full flex-col items-start justify-center gap-3 overflow-hidden rounded-2xl border border-solid border-[#e5e5e5] bg-white p-6 max-[425px]:w-full max-[425px]:p-4 max-[320px]:p-3';

export const SETTINGS_INVITE_TITLE_CLASS =
  'text-[32px] font-normal leading-10 text-[#f59e0b] max-[425px]:text-[28px] max-[425px]:leading-9';

export const SETTINGS_INVITE_DESCRIPTION_CLASS =
  'max-w-[593px] text-base font-normal leading-6 text-[#4c545c]';

export const SETTINGS_INVITE_FORM_CLASS =
  'flex w-fit max-w-full flex-row flex-wrap items-start gap-5 max-[425px]:w-full max-[425px]:flex-col max-[425px]:items-stretch';

export const SETTINGS_INVITE_FIELD_WRAP_CLASS =
  'flex w-[475px] max-w-full shrink-0 flex-col gap-1 max-[425px]:w-full';

export const SETTINGS_INVITE_FIELD_CLASS =
  'box-border w-full min-w-0 rounded-lg border-0 bg-[#fef5e7] px-2.5 py-2 text-sm font-normal leading-5 text-[#161d24] placeholder:text-[#979797] outline-none focus:ring-2 focus:ring-[#f59e0b]';

export const SETTINGS_INVITE_BUTTON_CLASS =
  'box-border inline-flex shrink-0 cursor-pointer items-center justify-center self-start rounded-lg border-0 bg-[#f59e0b] px-2.5 py-2 text-sm font-normal leading-5 text-[#fef5e7] transition hover:bg-[#e08e09] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#f59e0b] focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 max-[425px]:w-full';

export const SETTINGS_HEADER_TITLE_CLASS =
  'text-[36px] font-semibold leading-normal text-[#050609] max-[768px]:text-3xl max-[425px]:text-2xl';

export const SETTINGS_HEADER_SUBTITLE_CLASS = 'text-base font-normal leading-normal text-[#464646]';

/** Figma 678:1184 — Moderator Management section */
export const SETTINGS_MODERATORS_SECTION_CLASS =
  'flex w-full min-w-0 flex-col gap-6 min-[768px]:gap-8 min-[1020px]:gap-9 max-[425px]:gap-6';

export const SETTINGS_MODERATORS_HEADER_CLASS = 'flex w-full min-w-0 flex-col gap-1';

export const SETTINGS_MODERATORS_TITLE_CLASS =
  'text-2xl font-medium leading-[1.2] text-[#0a0a0a] min-[376px]:text-[28px] min-[768px]:text-[32px]';

export const SETTINGS_MODERATORS_COUNT_CLASS =
  'text-sm font-normal leading-5 text-[#555353] min-[426px]:text-base min-[426px]:leading-6 min-[768px]:text-xl min-[768px]:leading-[1.5]';

export const SETTINGS_MODERATORS_TABLE_CARD_CLASS =
  'min-w-0 w-full overflow-hidden rounded-lg bg-white shadow-sm min-[768px]:rounded-xl';

export const SETTINGS_MODERATORS_TABLE_SCROLL_CLASS =
  'w-full touch-pan-x overflow-x-auto overscroll-x-contain scrollbar-chart';

export const SETTINGS_MODERATORS_TABLE_CLASS =
  'min-w-[1109px] w-full table-fixed text-left';

export const SETTINGS_MODERATORS_TABLE_COLUMN_WIDTHS = [
  '180px',
  '135px',
  '257px',
  '257px',
  '180px',
  '100px',
];

export const SETTINGS_MODERATORS_TABLE_HEAD_CLASS = 'bg-[#f6fbff]';

export const SETTINGS_MODERATORS_TABLE_HEAD_CELL_CLASS =
  'px-2.5 py-3 text-base font-normal leading-6 text-black whitespace-nowrap';

export const SETTINGS_MODERATORS_TABLE_ROW_CLASS = 'border-b border-[#e4e4e4]';

export const SETTINGS_MODERATORS_TABLE_CELL_CLASS =
  'px-2.5 py-6 text-base leading-6 align-middle';

export const SETTINGS_MODERATORS_NAME_CELL_CLASS =
  `${SETTINGS_MODERATORS_TABLE_CELL_CLASS} text-[#0c0c0c]`;

export const SETTINGS_MODERATORS_PHONE_CELL_CLASS =
  `${SETTINGS_MODERATORS_TABLE_CELL_CLASS} text-[#0b1e3d] whitespace-nowrap`;

export const SETTINGS_MODERATORS_EMAIL_CELL_CLASS =
  `${SETTINGS_MODERATORS_TABLE_CELL_CLASS} text-[#373737] whitespace-nowrap`;

export const SETTINGS_MODERATORS_ACCESS_CELL_CLASS =
  `${SETTINGS_MODERATORS_TABLE_CELL_CLASS} text-[#161d24] whitespace-nowrap`;

export const SETTINGS_MODERATORS_STATUS_CELL_CLASS =
  `${SETTINGS_MODERATORS_TABLE_CELL_CLASS} whitespace-nowrap`;

export const SETTINGS_MODERATORS_ACTION_CELL_CLASS = SETTINGS_MODERATORS_TABLE_CELL_CLASS;

export const SETTINGS_MODERATORS_EDIT_BUTTON_CLASS =
  'inline-flex cursor-pointer items-center justify-center rounded-md text-[#373737] transition-colors hover:bg-[#f5f6f7] focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-orange';

export const SETTINGS_MODERATORS_STATUS_BADGE_BASE_CLASS =
  'inline-flex h-[22px] items-center justify-center rounded-[55px] px-[9px] py-[3px] text-xs font-medium capitalize leading-4';

export const SETTINGS_MODERATORS_STATUS_ACTIVE_CLASS =
  `${SETTINGS_MODERATORS_STATUS_BADGE_BASE_CLASS} bg-[#edfec7] text-[#588000]`;

export const SETTINGS_MODERATORS_STATUS_DISABLED_CLASS =
  `${SETTINGS_MODERATORS_STATUS_BADGE_BASE_CLASS} bg-[#cfcfcf] text-[#474747]`;

export const SETTINGS_MODERATORS_CARDS_CLASS =
  'flex flex-col gap-3 p-3 min-[376px]:gap-4 min-[376px]:p-4 min-[768px]:gap-5 min-[768px]:p-5';

export const SETTINGS_MODERATORS_CARD_CLASS =
  'rounded-lg border border-[#e4e4e4] bg-white p-3 min-[376px]:p-4 min-[768px]:rounded-xl min-[768px]:p-5';

export const SETTINGS_MODERATORS_CARD_HEADER_CLASS =
  'flex items-start justify-between gap-3 border-b border-[#f0f0f0] pb-3';

export const SETTINGS_MODERATORS_CARD_NAME_CLASS =
  'text-sm font-normal leading-5 text-[#0c0c0c] min-[426px]:text-base min-[426px]:leading-6';

export const SETTINGS_MODERATORS_CARD_BODY_CLASS = 'mt-3 flex flex-col gap-2.5 min-[376px]:gap-3';

export const SETTINGS_MODERATORS_CARD_ROW_CLASS =
  'flex items-start justify-between gap-3 text-sm leading-5 min-[426px]:text-base min-[426px]:leading-6 max-[320px]:text-xs max-[320px]:leading-5';

export const SETTINGS_MODERATORS_CARD_LABEL_CLASS = 'shrink-0 text-[#697076]';

export const SETTINGS_MODERATORS_CARD_VALUE_CLASS = 'min-w-0 text-right text-[#0c0c0c]';

export const SETTINGS_MODERATORS_FOOTER_CLASS =
  'flex flex-col gap-3 border-t border-[#e4e4e4] px-3 py-4 max-[425px]:items-stretch min-[426px]:gap-4 min-[426px]:px-4 min-[426px]:py-5 min-[768px]:flex-row min-[768px]:items-center min-[768px]:justify-between min-[768px]:py-6 min-[1020px]:px-6';

export const SETTINGS_MODERATORS_RESULTS_CLASS =
  'text-center text-sm text-brand-orange min-[426px]:text-base min-[768px]:text-left';

export const SETTINGS_MODERATORS_PAGINATION_CLASS =
  'flex items-center justify-center gap-2 min-[768px]:justify-end';

export const SETTINGS_MODERATORS_PAGINATION_BUTTON_CLASS =
  'cursor-pointer rounded-xl border border-brand-orange px-3 py-1.5 text-sm font-medium capitalize text-brand-orange transition-colors hover:bg-[#fff1eb] focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-orange disabled:cursor-not-allowed disabled:opacity-50 min-[376px]:px-3.5 min-[426px]:px-4 min-[426px]:py-2 min-[426px]:text-base';

/** Figma Moderator Management seed rows */
export const SETTINGS_MODERATORS_SEED = [
  {
    id: 'albert-flores',
    name: 'Albert Flores',
    phone: '(239) 555-0108',
    email: 'curtis.weaver@example.com',
    access: 'Dashboard/ Overview',
    status: SETTINGS_MODERATOR_STATUS_ACTIVE,
  },
  {
    id: 'marvin-mckinney',
    name: 'Marvin McKinney',
    phone: '(406) 555-0120',
    email: 'tanya.hill@example.com',
    access: 'Bookings',
    status: SETTINGS_MODERATOR_STATUS_ACTIVE,
  },
  {
    id: 'dianne-russell',
    name: 'Dianne Russell',
    phone: '(316) 555-0116',
    email: 'michelle.rivera@example.com',
    access: 'Customers',
    status: SETTINGS_MODERATOR_STATUS_ACTIVE,
  },
  {
    id: 'cameron-williamson',
    name: 'Cameron Williamson',
    phone: '(219) 555-0114',
    email: 'tim.jennings@example.com',
    access: 'Services',
    status: SETTINGS_MODERATOR_STATUS_ACTIVE,
  },
  {
    id: 'robert-fox',
    name: 'Robert Fox',
    phone: '(629) 555-0129',
    email: 'felicia.reid@example.com',
    access: 'Categories Management',
    status: SETTINGS_MODERATOR_STATUS_ACTIVE,
  },
  {
    id: 'jane-cooper',
    name: 'Jane Cooper',
    phone: '(702) 555-0122',
    email: 'dolores.chambers@example.com',
    access: 'Reviews',
    status: SETTINGS_MODERATOR_STATUS_ACTIVE,
  },
  {
    id: 'brooklyn-simmons',
    name: 'Brooklyn Simmons',
    phone: '(225) 555-0118',
    email: 'debra.holt@example.com',
    access: 'Blog Post',
    status: SETTINGS_MODERATOR_STATUS_DISABLED,
  },
];

export const getModeratorStatusLabel = (status, copy = SETTINGS_COPY) =>
  status === SETTINGS_MODERATOR_STATUS_ACTIVE
    ? copy.moderators.status.active
    : copy.moderators.status.disabled;
