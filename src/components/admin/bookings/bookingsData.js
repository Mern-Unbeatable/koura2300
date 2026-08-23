export const BOOKINGS_PAGE_CLASS = 'flex flex-col gap-6 sm:gap-8 lg:gap-9';
export const BOOKINGS_HEADER_CLASS =
  'flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between';
export const BOOKINGS_TITLE_CLASS =
  'text-[28px] font-medium leading-[1.2] text-[#0a0a0a] sm:text-[32px]';
export const BOOKINGS_SUBTITLE_CLASS =
  'text-base leading-6 text-[#555353] sm:text-xl sm:leading-[1.5]';
export const BOOKINGS_FILTER_SELECT_CLASS =
  'h-auto w-full min-w-[140px] cursor-pointer appearance-none rounded-md border border-[#d1d5db] bg-white py-2.5 pr-9 pl-[13px] text-sm leading-5 text-[#1f2937] focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-orange sm:w-auto';
export const BOOKINGS_TABLE_CARD_CLASS =
  'rounded-xl bg-white shadow-sm';
export const BOOKINGS_TABLE_SCROLL_CLASS =
  'touch-pan-x overflow-x-auto overscroll-x-contain scrollbar-chart';
export const BOOKINGS_TABLE_CLASS = 'min-w-[1040px] w-full text-left';
export const BOOKINGS_TABLE_HEAD_CLASS = 'bg-[#f6fbff]';
export const BOOKINGS_TABLE_HEAD_CELL_CLASS =
  'px-2.5 py-3 text-base font-normal text-black whitespace-nowrap';
export const BOOKINGS_TABLE_ROW_CLASS = 'border-b border-[#e4e4e4]';
export const BOOKINGS_TABLE_ACTION_HEAD_CELL_CLASS =
  'px-2.5 py-3 text-center text-base font-normal text-black whitespace-nowrap';
export const BOOKINGS_TABLE_STATUS_OFFSET_CLASS = 'ml-12';
export const BOOKINGS_TABLE_STATUS_HEAD_CELL_CLASS =
  'w-0 py-3 px-2.5 text-left text-base font-normal text-black whitespace-nowrap';
export const BOOKINGS_TABLE_CELL_CLASS =
  'px-2.5 py-6 text-base leading-6 text-[#0c0c0c] align-middle';
export const BOOKINGS_TABLE_ACTION_CELL_CLASS =
  'px-2.5 py-6 text-center align-middle';
export const BOOKINGS_TABLE_STATUS_CELL_CLASS =
  'w-0 py-6 px-2.5 text-left align-middle whitespace-nowrap';
export const BOOKINGS_EMPTY_ROW_CLASS =
  'px-4 py-10 text-center text-base text-[#6b7280]';
export const BOOKINGS_SERVICE_NAME_CLASS = 'text-[#0b1e3d]';
export const BOOKINGS_CATEGORY_CLASS = 'text-[#373737]';
export const BOOKINGS_MATERIAL_REQUIRED_CLASS = 'text-[#e00000]';
export const BOOKINGS_MATERIAL_NONE_CLASS = 'text-[#6c6969]';
export const BOOKINGS_ACTION_BUTTON_CLASS =
  'inline-flex size-6 cursor-pointer items-center justify-center rounded-md text-[#373737] transition-colors hover:bg-[#f5f6f7] focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-orange';
export const BOOKINGS_FOOTER_CLASS =
  'flex flex-col gap-4 px-4 py-6 sm:flex-row sm:items-center sm:justify-between';
export const BOOKINGS_RESULTS_CLASS = 'text-base text-brand-orange';
export const BOOKINGS_PAGINATION_CLASS = 'flex items-center gap-2';
export const BOOKINGS_PAGINATION_BUTTON_CLASS =
  'cursor-pointer rounded-xl border border-brand-orange px-4 py-2 text-base font-medium capitalize text-brand-orange transition-colors hover:bg-[#fff1eb] focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-orange disabled:cursor-not-allowed disabled:opacity-50';
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
  'inline-flex h-[22px] items-center justify-center rounded-full px-[9px] py-[3px] text-xs font-medium leading-4';

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
