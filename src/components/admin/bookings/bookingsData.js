export const BOOKINGS_VIEWPORT = {
  MOBILE_S: 320,
  MOBILE_M: 375,
  MOBILE_L: 425,
  TABLET: 768,
  LAPTOP: 1020,
};

export const BOOKINGS_TABLE_MIN_WIDTH_PX = 1040;

export const BOOKINGS_PAGE_CLASS =
  'flex min-w-0 flex-col gap-4 max-[425px]:gap-5 min-[426px]:gap-6 min-[768px]:gap-8 min-[1020px]:gap-9';
export const BOOKINGS_HEADER_CLASS =
  'flex flex-col gap-3 min-[768px]:flex-row min-[768px]:items-start min-[768px]:justify-between min-[768px]:gap-4';
export const BOOKINGS_TITLE_CLASS =
  'text-2xl font-medium leading-[1.2] text-[#0a0a0a] min-[376px]:text-[28px] min-[768px]:text-[32px]';
export const BOOKINGS_SUBTITLE_CLASS =
  'text-sm leading-5 text-[#555353] min-[426px]:text-base min-[426px]:leading-6 min-[768px]:text-xl min-[768px]:leading-[1.5]';
export const BOOKINGS_FILTER_SELECT_CLASS =
  'h-auto w-full min-w-0 cursor-pointer appearance-none rounded-md border border-[#d1d5db] bg-white py-2.5 pr-9 pl-[13px] text-sm leading-5 text-[#1f2937] focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-orange min-[768px]:w-auto min-[768px]:min-w-[140px]';
export const BOOKINGS_TABLE_CARD_CLASS =
  'min-w-0 w-full overflow-hidden rounded-lg bg-white shadow-sm min-[768px]:rounded-xl';
export const BOOKINGS_TABLE_SCROLL_CLASS =
  'w-full touch-pan-x overflow-x-auto overscroll-x-contain scrollbar-chart';
export const BOOKINGS_TABLE_CLASS = 'min-w-[1040px] w-full text-left';
export const BOOKINGS_CARDS_CLASS =
  'flex flex-col gap-3 p-3 min-[376px]:gap-4 min-[376px]:p-4 min-[768px]:gap-5 min-[768px]:p-5';
export const BOOKINGS_CARD_CLASS =
  'rounded-lg border border-[#e4e4e4] bg-white p-3 min-[376px]:p-4 min-[768px]:rounded-xl min-[768px]:p-5';
export const BOOKINGS_CARD_HEADER_CLASS =
  'flex items-start justify-between gap-3 border-b border-[#f0f0f0] pb-3';
export const BOOKINGS_CARD_ID_CLASS =
  'text-sm font-medium leading-5 text-[#0c0c0c] min-[426px]:text-base min-[426px]:leading-6';
export const BOOKINGS_CARD_CUSTOMER_CLASS =
  'mt-0.5 text-sm leading-5 text-[#555353] min-[426px]:text-base';
export const BOOKINGS_CARD_BODY_CLASS = 'mt-3 flex flex-col gap-2.5 min-[376px]:gap-3';
export const BOOKINGS_CARD_ROW_CLASS =
  'flex items-start justify-between gap-3 text-sm leading-5 min-[426px]:text-base min-[426px]:leading-6';
export const BOOKINGS_CARD_LABEL_CLASS = 'shrink-0 text-[#6b7280]';
export const BOOKINGS_CARD_VALUE_CLASS = 'min-w-0 text-right text-[#0c0c0c]';
export const BOOKINGS_CARDS_EMPTY_CLASS =
  'px-3 py-8 text-center text-sm text-[#6b7280] min-[426px]:px-4 min-[426px]:py-10 min-[426px]:text-base';
export const BOOKINGS_TABLE_HEAD_CLASS = 'bg-[#f6fbff]';
export const BOOKINGS_TABLE_HEAD_CELL_CLASS =
  'px-2 py-2.5 text-xs font-normal text-black whitespace-nowrap min-[376px]:px-2.5 min-[376px]:py-3 min-[426px]:text-sm min-[768px]:text-base';
export const BOOKINGS_TABLE_ROW_CLASS = 'border-b border-[#e4e4e4]';
export const BOOKINGS_TABLE_ACTION_HEAD_CELL_CLASS =
  'px-2 py-2.5 text-center text-xs font-normal text-black whitespace-nowrap min-[376px]:px-2.5 min-[376px]:py-3 min-[426px]:text-sm min-[768px]:text-base';
export const BOOKINGS_TABLE_STATUS_OFFSET_CLASS =
  'ml-4 max-[320px]:ml-2 min-[376px]:ml-6 min-[768px]:ml-12';
export const BOOKINGS_TABLE_STATUS_HEAD_CELL_CLASS =
  'w-0 px-2 py-2.5 text-left text-xs font-normal text-black whitespace-nowrap min-[376px]:px-2.5 min-[376px]:py-3 min-[426px]:text-sm min-[768px]:text-base';
export const BOOKINGS_TABLE_CELL_CLASS =
  'px-2 py-4 text-sm leading-5 text-[#0c0c0c] align-middle min-[376px]:px-2.5 min-[376px]:py-5 min-[426px]:text-base min-[426px]:leading-6 min-[768px]:py-6';
export const BOOKINGS_TABLE_ACTION_CELL_CLASS =
  'px-2 py-4 text-center align-middle min-[376px]:px-2.5 min-[376px]:py-5 min-[768px]:py-6';
export const BOOKINGS_TABLE_STATUS_CELL_CLASS =
  'w-0 px-2 py-4 text-left align-middle whitespace-nowrap min-[376px]:px-2.5 min-[376px]:py-5 min-[768px]:py-6';
export const BOOKINGS_EMPTY_ROW_CLASS =
  'px-3 py-8 text-center text-sm text-[#6b7280] min-[426px]:px-4 min-[426px]:py-10 min-[426px]:text-base';
export const BOOKINGS_SERVICE_NAME_CLASS = 'text-[#0b1e3d]';
export const BOOKINGS_CATEGORY_CLASS = 'text-[#373737]';
export const BOOKINGS_MATERIAL_REQUIRED_CLASS = 'text-[#e00000]';
export const BOOKINGS_MATERIAL_NONE_CLASS = 'text-[#6c6969]';
export const BOOKINGS_ACTION_BUTTON_CLASS =
  'inline-flex size-6 cursor-pointer items-center justify-center rounded-md text-[#373737] transition-colors hover:bg-[#f5f6f7] focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-orange';
export const BOOKINGS_FOOTER_CLASS =
  'flex flex-col gap-3 px-3 py-4 max-[425px]:items-stretch min-[426px]:gap-4 min-[426px]:px-4 min-[426px]:py-5 min-[768px]:flex-row min-[768px]:items-center min-[768px]:justify-between min-[768px]:py-6 min-[1020px]:px-6';
export const BOOKINGS_RESULTS_CLASS =
  'text-center text-sm text-brand-orange min-[426px]:text-base min-[768px]:text-left';
export const BOOKINGS_PAGINATION_CLASS =
  'flex items-center justify-center gap-2 min-[768px]:justify-end';
export const BOOKINGS_PAGINATION_BUTTON_CLASS =
  'cursor-pointer rounded-xl border border-brand-orange px-3 py-1.5 text-sm font-medium capitalize text-brand-orange transition-colors hover:bg-[#fff1eb] focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-orange disabled:cursor-not-allowed disabled:opacity-50 min-[376px]:px-3.5 min-[426px]:px-4 min-[426px]:py-2 min-[426px]:text-base';
export const BOOKINGS_ACTION_MENU_CLASS =
  'fixed z-50 w-[193px]';
export const BOOKINGS_ACTION_MENU_SURFACE_CLASS =
  'flex flex-col gap-1 overflow-hidden rounded-lg border border-[#ececec] bg-white py-1 shadow-[0px_4px_16px_rgba(50,50,71,0.12)]';
export const BOOKINGS_ACTION_MENU_ITEM_CLASS =
  'w-full cursor-pointer px-3 py-1.5 text-left text-base font-normal leading-6 text-[#2d3036] transition-colors hover:bg-brand-orange-light focus:outline-none focus-visible:bg-brand-orange-light';
export const BOOKINGS_ACTION_MENU_STATUS_HEADING_CLASS =
  'px-3 pb-0.5 pt-1.5 text-base font-medium leading-6 text-brand-orange';
export const BOOKINGS_ACTION_MENU_STATUS_ITEM_CLASS =
  'w-full cursor-pointer px-3 py-1.5 text-left text-sm font-normal leading-normal text-[#2d3036] transition-colors hover:bg-brand-orange-light focus:outline-none focus-visible:bg-brand-orange-light';
export const BOOKINGS_STATUS_BADGE_CLASS =
  'inline-flex h-5 items-center justify-center rounded-full px-2 py-0.5 text-[10px] font-medium leading-4 min-[376px]:h-[22px] min-[376px]:px-[9px] min-[376px]:py-[3px] min-[376px]:text-xs';

export const BOOKINGS_PAGE_SIZE = 7;
export const BOOKINGS_TABLE_COLUMN_COUNT = 8;

export const BOOKINGS_STATUS_OPTIONS = [
  { id: 'all', label: 'All Statuses' },
  { id: 'new', label: 'New' },
  { id: 'material-paid', label: 'Material Paid' },
  { id: 'technician-assigned', label: 'Technician Assigned' },
  { id: 'work-in-progress', label: 'Work In Progress' },
  { id: 'completed', label: 'Completed' },
];

export const BOOKINGS_STATUS_STYLES = {
  new: {
    label: 'New',
    badgeClass: 'bg-[#dcf5fc] text-[#007b9d]',
  },
  'material-paid': {
    label: 'Material Paid',
    badgeClass: 'bg-[#ede9fe] text-[#7c3aed]',
  },
  'technician-assigned': {
    label: 'Technician Assigned',
    badgeClass: 'bg-[#d1faf5] text-[#00917f]',
  },
  'work-in-progress': {
    label: 'Work In Progress',
    badgeClass: 'bg-[#edfec7] text-[#588000]',
  },
  completed: {
    label: 'Completed',
    badgeClass: 'bg-[#dcfce7] text-[#15803d]',
  },
};

export const BOOKINGS_ACTION_STATUS_OPTIONS = [
  'new',
  'material-paid',
  'technician-assigned',
  'work-in-progress',
  'completed',
];

export const BOOKINGS_SEED = [
  {
    id: 'BK-001',
    customer: 'Albert Flores',
    serviceName: 'Ceiling Light Installation',
    serviceCategory: 'Lighting',
    serviceCost: 100,
    material: 'required',
    statusId: 'new',
  },
  {
    id: 'BK-002',
    customer: 'Marvin McKinney',
    serviceName: 'LED Light Upgrades',
    serviceCategory: 'Security',
    serviceCost: 200,
    material: 'none',
    statusId: 'new',
  },
  {
    id: 'BK-003',
    customer: 'Dianne Russell',
    serviceName: 'Flood Lights',
    serviceCategory: 'Closets',
    serviceCost: 500,
    material: 'required',
    statusId: 'material-paid',
  },
  {
    id: 'BK-004',
    customer: 'Cameron Williamson',
    serviceName: 'Garage Exterior Lights',
    serviceCategory: 'Fence',
    serviceCost: 400,
    material: 'required',
    statusId: 'material-paid',
  },
  {
    id: 'BK-005',
    customer: 'Robert Fox',
    serviceName: 'Fixture Installation',
    serviceCategory: 'Deck',
    serviceCost: 200,
    material: 'required',
    statusId: 'material-paid',
  },
  {
    id: 'BK-006',
    customer: 'Jane Cooper',
    serviceName: 'Pendant Light Installation',
    serviceCategory: 'Basement',
    serviceCost: 100,
    material: 'required',
    statusId: 'material-paid',
  },
  {
    id: 'BK-007',
    customer: 'Brooklyn Simmons',
    serviceName: 'Motion Sensor Lights',
    serviceCategory: 'Appliances',
    serviceCost: 299,
    material: 'none',
    statusId: 'technician-assigned',
  },
  {
    id: 'BK-008',
    customer: 'Wade Warren',
    serviceName: 'Outlet & Switch Replacement',
    serviceCategory: 'Garage',
    serviceCost: 150,
    material: 'none',
    statusId: 'work-in-progress',
  },
  {
    id: 'BK-009',
    customer: 'Jerome Bell',
    serviceName: 'Ceiling Fan Installation',
    serviceCategory: 'Garden',
    serviceCost: 300,
    material: 'required',
    statusId: 'completed',
  },
  {
    id: 'BK-010',
    customer: 'Jacob Jones',
    serviceName: 'Pendant Light Installation',
    serviceCategory: 'Flooring',
    serviceCost: 100,
    material: 'required',
    statusId: 'work-in-progress',
  },
];
