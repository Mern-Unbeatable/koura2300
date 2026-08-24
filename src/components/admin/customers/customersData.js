export const CUSTOMERS_VIEWPORT = {
  MOBILE_S: 320,
  MOBILE_M: 375,
  MOBILE_L: 425,
  TABLET: 768,
  LAPTOP: 1020,
  DESKTOP: 1440,
};

/** Cards for mobile → laptop; table only from desktop width. */
export const CUSTOMERS_CARDS_MAX_WIDTH_PX = CUSTOMERS_VIEWPORT.DESKTOP - 1;

export const CUSTOMERS_TABLE_MIN_WIDTH_PX = 1170;

export const CUSTOMERS_PAGE_CLASS =
  'flex min-w-0 flex-col gap-4 max-[425px]:gap-5 min-[426px]:gap-6 min-[768px]:gap-8 min-[1020px]:gap-9';
export const CUSTOMERS_HEADER_CLASS =
  'flex flex-col gap-3 min-[768px]:flex-row min-[768px]:items-start min-[768px]:justify-between min-[768px]:gap-4';
export const CUSTOMERS_TITLE_CLASS =
  'text-2xl font-medium leading-[1.2] text-[#0a0a0a] min-[376px]:text-[28px] min-[768px]:text-[32px]';
export const CUSTOMERS_SUBTITLE_CLASS =
  'text-sm leading-5 text-[#555353] min-[426px]:text-base min-[426px]:leading-6 min-[768px]:text-xl min-[768px]:leading-[1.5]';
export const CUSTOMERS_FILTER_SELECT_CLASS =
  'h-auto w-full min-w-0 cursor-pointer appearance-none rounded-md border border-[#d1d5db] bg-white py-2.5 pr-9 pl-[13px] text-sm leading-5 text-[#1f2937] focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-orange min-[768px]:w-auto min-[768px]:min-w-[140px]';
export const CUSTOMERS_TABLE_CARD_CLASS =
  'min-w-0 w-full overflow-hidden rounded-lg bg-white shadow-sm min-[768px]:rounded-xl';
export const CUSTOMERS_TABLE_SCROLL_CLASS =
  'w-full touch-pan-x overflow-x-auto overscroll-x-contain scrollbar-chart';
export const CUSTOMERS_TABLE_CLASS = 'min-w-[1170px] w-full table-fixed text-left';
export const CUSTOMERS_TABLE_COLUMN_WIDTHS = [
  '150px',
  '180px',
  '220px',
  '240px',
  '180px',
  '100px',
  '100px',
];
export const CUSTOMERS_CARDS_CLASS =
  'flex flex-col gap-3 p-3 min-[376px]:gap-4 min-[376px]:p-4 min-[768px]:gap-5 min-[768px]:p-5';
export const CUSTOMERS_CARD_CLASS =
  'rounded-lg border border-[#e4e4e4] bg-white p-3 min-[376px]:p-4 min-[768px]:rounded-xl min-[768px]:p-5';
export const CUSTOMERS_CARD_HEADER_CLASS =
  'flex items-start justify-between gap-3 border-b border-[#f0f0f0] pb-3';
export const CUSTOMERS_CARD_ID_CLASS =
  'text-sm font-medium leading-5 text-[#0c0c0c] min-[426px]:text-base min-[426px]:leading-6';
export const CUSTOMERS_CARD_NAME_CLASS =
  'mt-0.5 text-sm leading-5 text-[#555353] min-[426px]:text-base';
export const CUSTOMERS_CARD_BODY_CLASS = 'mt-3 flex flex-col gap-2.5 min-[376px]:gap-3';
export const CUSTOMERS_CARD_ROW_CLASS =
  'flex items-start justify-between gap-3 text-sm leading-5 min-[426px]:text-base min-[426px]:leading-6';
export const CUSTOMERS_CARD_LABEL_CLASS = 'shrink-0 text-[#6b7280]';
export const CUSTOMERS_CARD_VALUE_CLASS = 'min-w-0 text-right text-[#0c0c0c]';
export const CUSTOMERS_CARDS_EMPTY_CLASS =
  'px-3 py-8 text-center text-sm text-[#6b7280] min-[426px]:px-4 min-[426px]:py-10 min-[426px]:text-base';
export const CUSTOMERS_TABLE_HEAD_CLASS = 'bg-[#f6fbff]';
export const CUSTOMERS_TABLE_HEAD_CELL_CLASS =
  'px-2 py-2.5 text-xs font-normal text-black whitespace-nowrap min-[376px]:px-2.5 min-[376px]:py-3 min-[426px]:text-sm min-[768px]:text-base';
export const CUSTOMERS_TABLE_ROW_CLASS = 'border-b border-[#e4e4e4]';
export const CUSTOMERS_TABLE_ACTION_HEAD_CELL_CLASS =
  'px-2 py-2.5 text-center text-xs font-normal text-black whitespace-nowrap min-[376px]:px-2.5 min-[376px]:py-3 min-[426px]:text-sm min-[768px]:text-base';
export const CUSTOMERS_TABLE_CELL_CLASS =
  'px-2 py-4 text-sm leading-5 text-[#0c0c0c] align-middle min-[376px]:px-2.5 min-[376px]:py-5 min-[426px]:text-base min-[426px]:leading-6 min-[768px]:py-6';
export const CUSTOMERS_TABLE_ACTION_CELL_CLASS =
  'px-2 py-4 text-center align-middle min-[376px]:px-2.5 min-[376px]:py-5 min-[768px]:py-6';
export const CUSTOMERS_EMPTY_ROW_CLASS =
  'px-3 py-8 text-center text-sm text-[#6b7280] min-[426px]:px-4 min-[426px]:py-10 min-[426px]:text-base';
export const CUSTOMERS_PHONE_CLASS = 'text-[#0b1e3d]';
export const CUSTOMERS_EMAIL_CLASS = 'break-words text-[#373737]';
export const CUSTOMERS_PRICE_CLASS = 'text-[#373737]';
export const CUSTOMERS_ACTION_BUTTON_CLASS =
  'inline-flex size-6 cursor-pointer items-center justify-center rounded-md text-[#373737] transition-colors hover:bg-[#f5f6f7] focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-orange';
export const CUSTOMERS_FOOTER_CLASS =
  'flex flex-col gap-3 px-3 py-4 max-[425px]:items-stretch min-[426px]:gap-4 min-[426px]:px-4 min-[426px]:py-5 min-[768px]:flex-row min-[768px]:items-center min-[768px]:justify-between min-[768px]:py-6 min-[1020px]:px-6';
export const CUSTOMERS_RESULTS_CLASS =
  'text-center text-sm text-brand-orange min-[426px]:text-base min-[768px]:text-left';
export const CUSTOMERS_PAGINATION_CLASS =
  'flex items-center justify-center gap-2 min-[768px]:justify-end';
export const CUSTOMERS_PAGINATION_BUTTON_CLASS =
  'cursor-pointer rounded-xl border border-brand-orange px-3 py-1.5 text-sm font-medium capitalize text-brand-orange transition-colors hover:bg-[#fff1eb] focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-orange disabled:cursor-not-allowed disabled:opacity-50 min-[376px]:px-3.5 min-[426px]:px-4 min-[426px]:py-2 min-[426px]:text-base';
export const CUSTOMERS_ACTION_MENU_CLASS = 'fixed z-50 w-[193px]';
export const CUSTOMERS_ACTION_MENU_SURFACE_CLASS =
  'flex flex-col overflow-hidden rounded-lg border border-[#ececec] bg-white shadow-[0px_4px_16px_rgba(50,50,71,0.12)]';
export const CUSTOMERS_ACTION_MENU_ITEM_CLASS =
  'w-full cursor-pointer px-2.5 py-1.5 text-left text-base font-normal leading-6 text-[#2d3036] transition-colors hover:bg-brand-orange-light focus:outline-none focus-visible:bg-brand-orange-light';
export const CUSTOMERS_STATUS_BADGE_CLASS =
  'inline-flex h-5 items-center justify-center rounded-full px-2 py-0.5 text-[10px] font-medium leading-4 capitalize min-[376px]:h-[22px] min-[376px]:px-[9px] min-[376px]:py-[3px] min-[376px]:text-xs';

export const CUSTOMERS_PAGE_SIZE = 7;
export const CUSTOMERS_TABLE_COLUMN_COUNT = 7;

export const CUSTOMERS_STATUS_OPTIONS = [
  { id: 'all', label: 'All Statuses' },
  { id: 'active', label: 'Active' },
  { id: 'suspend', label: 'Suspend' },
];

export const CUSTOMERS_STATUS_STYLES = {
  active: {
    label: 'Active',
    badgeClass: 'bg-[#dcfce7] text-[#15803d]',
  },
  suspend: {
    label: 'Suspend',
    badgeClass: 'bg-[#f3f4f6] text-[#4b5563]',
  },
};

export const CUSTOMERS_ACTION_STATUS_OPTIONS = ['active', 'suspend'];

export const CUSTOMERS_SEED = [
  {
    id: 'CU-001',
    name: 'Albert Flores',
    phone: '(907) 555-0101',
    email: 'felicia.reid@example.com',
    totalBookingsPrice: 1000,
    statusId: 'active',
  },
  {
    id: 'CU-002',
    name: 'Marvin McKinney',
    phone: '(704) 555-0127',
    email: 'michelle.rivera@example.com',
    totalBookingsPrice: 20000,
    statusId: 'suspend',
  },
  {
    id: 'CU-003',
    name: 'Dianne Russell',
    phone: '(252) 555-0126',
    email: 'curtis.weaver@example.com',
    totalBookingsPrice: 5000,
    statusId: 'active',
  },
  {
    id: 'CU-004',
    name: 'Cameron Williamson',
    phone: '(406) 555-0120',
    email: 'kenzi.lawson@example.com',
    totalBookingsPrice: 40000,
    statusId: 'active',
  },
  {
    id: 'CU-005',
    name: 'Robert Fox',
    phone: '(480) 555-0103',
    email: 'debbie.baker@example.com',
    totalBookingsPrice: 20000,
    statusId: 'active',
  },
  {
    id: 'CU-006',
    name: 'Jane Cooper',
    phone: '(225) 555-0118',
    email: 'jackson.graham@example.com',
    totalBookingsPrice: 10000,
    statusId: 'active',
  },
  {
    id: 'CU-007',
    name: 'Brooklyn Simmons',
    phone: '(302) 555-0107',
    email: 'tim.jennings@example.com',
    totalBookingsPrice: 29990,
    statusId: 'active',
  },
  {
    id: 'CU-008',
    name: 'Wade Warren',
    phone: '(308) 555-0121',
    email: 'jessica.hanson@example.com',
    totalBookingsPrice: 15000,
    statusId: 'active',
  },
  {
    id: 'CU-009',
    name: 'Jerome Bell',
    phone: '(209) 555-0104',
    email: 'dolores.chambers@example.com',
    totalBookingsPrice: 30000,
    statusId: 'suspend',
  },
  {
    id: 'CU-010',
    name: 'Jacob Jones',
    phone: '(671) 555-0110',
    email: 'georgia.young@example.com',
    totalBookingsPrice: 100089,
    statusId: 'suspend',
  },
];
