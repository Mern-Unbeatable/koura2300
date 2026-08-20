import { LANDING_ASSET_PATH } from '../home/landingData';

export const ORDER_FILTER = {
  ALL: 'all',
  PENDING_REVIEW: 'pending-review',
  PAYMENT_REQUIRED: 'payment-required',
  TECHNICIAN_ASSIGNED: 'technician-assigned',
  IN_PROGRESS: 'in-progress',
  COMPLETED: 'completed',
  CANCELLED: 'cancelled',
};

export const ORDER_STATUS = {
  PENDING_REVIEW: 'pending-review',
  PAYMENT_REQUIRED: 'payment-required',
  TECHNICIAN_ASSIGNED: 'technician-assigned',
  IN_PROGRESS: 'in-progress',
  COMPLETED: 'completed',
  CANCELLED: 'cancelled',
};

export const ORDER_TIER = {
  STANDARD: 'standard',
  PREMIUM: 'premium',
};

export const ORDER_PAYMENT_KIND = {
  DUE: 'due',
  PAID: 'paid',
  PENDING_REVIEW: 'pending-review',
};

export const ORDER_HERO_HEIGHT_CLASS = 'h-[220px] sm:h-[266px]';
export const ORDER_SUMMARY_ICON_SIZE = 20;
export const ORDER_ACTION_ICON_SIZE = 14;
export const ORDER_DOWNLOAD_ICON_SIZE = 16;
export const ORDER_STATUS_DOT_CLASS = 'size-1.5 shrink-0 rounded-full';

export const ORDER_PAGE_CLASS =
  'min-h-screen overflow-x-clip bg-[#f8fafc] font-inter text-brand-ink';
export const ORDER_MAIN_CLASS =
  'animate-page-enter mx-auto max-w-screen-2xl px-4 pb-24 pt-8 sm:px-6 sm:pt-10 lg:px-8 lg:pb-28';
export const ORDER_TITLE_CLASS = 'text-3xl font-bold text-[#0f172b] sm:text-4xl';
export const ORDER_SUBTITLE_CLASS = 'mt-2 text-sm text-[#62748e] sm:text-base';
export const ORDER_SUMMARY_GRID_CLASS =
  'mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4';
export const ORDER_SUMMARY_CARD_CLASS =
  'flex items-center gap-4 rounded-2xl border border-[#f1f5f9] bg-white p-5 shadow-sm';
export const ORDER_FILTERS_CLASS =
  'mt-6 flex gap-2 overflow-x-auto pb-1 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden';
export const ORDER_FILTER_IDLE =
  'shrink-0 cursor-pointer rounded-xl border border-[#e2e8f0] bg-white px-4 py-2 text-sm font-medium text-[#45556c] transition-colors hover:border-brand-orange hover:text-brand-orange focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-orange';
export const ORDER_FILTER_ACTIVE =
  'shrink-0 cursor-pointer rounded-xl bg-[#0f172b] px-4 py-2 text-sm font-medium text-white shadow-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-orange';
export const ORDER_COUNT_CLASS = 'mt-6 text-sm text-[#62748e]';
export const ORDER_GRID_CLASS = 'mt-5 grid gap-5 lg:grid-cols-2';
export const ORDER_CARD_CLASS =
  'flex h-full flex-col overflow-hidden rounded-2xl border border-[#f1f5f9] bg-white shadow-sm';
export const ORDER_EMPTY_CLASS =
  'mt-5 rounded-2xl border border-[#e2e8f0] bg-white p-10 text-center text-[#62748e]';

export const ORDER_SUMMARY_ICON_WRAP = {
  active: 'bg-[#fff7ed] text-[#f54900]',
  completed: 'bg-[#f0fdf4] text-[#00a63e]',
  pendingPayment: 'bg-[#fef2f2] text-[#fb2c36]',
  upcoming: 'bg-[#eff6ff] text-[#155dfc]',
};

export const ORDER_SUMMARY_VALUE_CLASS = {
  active: 'text-[#f54900]',
  completed: 'text-[#00a63e]',
  pendingPayment: 'text-[#fb2c36]',
  upcoming: 'text-[#155dfc]',
};

export const ORDER_PAYMENT_TEXT_CLASS = {
  [ORDER_PAYMENT_KIND.DUE]: 'font-semibold text-[#f54900]',
  [ORDER_PAYMENT_KIND.PAID]: 'font-semibold text-[#00a63e]',
  [ORDER_PAYMENT_KIND.PENDING_REVIEW]: 'font-medium italic text-[#90a1b9]',
};

export const ORDER_APPOINTMENT_HIGHLIGHT_CLASS = 'text-[#f54900]';
export const ORDER_APPOINTMENT_DEFAULT_CLASS = 'text-[#0f172b]';

export const ORDER_ACTION_PRIMARY_CLASS =
  'min-h-10 min-w-0 flex-1 cursor-pointer rounded-xl bg-[#0f172b] px-3 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#1e293b] focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-orange';
export const ORDER_ACTION_PAY_CLASS =
  'inline-flex min-h-10 min-w-0 flex-1 cursor-pointer items-center justify-center gap-1.5 rounded-xl border border-[#ffd6a8] bg-[#fff7ed] px-3 py-2.5 text-sm font-semibold text-[#f54900] transition-colors hover:bg-[#ffedd4] focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-orange';
export const ORDER_ACTION_CANCEL_CLASS =
  'min-h-10 min-w-0 flex-1 cursor-pointer rounded-xl border border-[#f00606] bg-white px-3 py-2.5 text-sm font-semibold text-[#f50000] transition-colors hover:bg-[#fff5f5] focus:outline-none focus-visible:ring-2 focus-visible:ring-red-400';
export const ORDER_ACTION_DOWNLOAD_CLASS =
  'inline-flex size-10 shrink-0 cursor-pointer items-center justify-center rounded-xl border border-[#e2e8f0] bg-white text-[#45556c] transition-colors hover:border-brand-orange hover:text-brand-orange focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-orange';
export const ORDER_ACTIONS_ROW_CLASS = 'mt-auto flex flex-wrap gap-2 pt-4';

export const ORDER_ACTION = {
  VIEW_DETAILS: 'viewDetails',
  PAY_NOW: 'payNow',
  CANCEL_BOOKING: 'cancelBooking',
  DOWNLOAD: 'download',
};

/** Status-category → footer buttons (Figma OrderCard variants). */
export const ORDER_STATUS_ACTIONS = {
  [ORDER_STATUS.PENDING_REVIEW]: [ORDER_ACTION.VIEW_DETAILS, ORDER_ACTION.CANCEL_BOOKING],
  [ORDER_STATUS.PAYMENT_REQUIRED]: [
    ORDER_ACTION.VIEW_DETAILS,
    ORDER_ACTION.PAY_NOW,
    ORDER_ACTION.CANCEL_BOOKING,
  ],
  [ORDER_STATUS.TECHNICIAN_ASSIGNED]: [ORDER_ACTION.VIEW_DETAILS, ORDER_ACTION.CANCEL_BOOKING],
  [ORDER_STATUS.IN_PROGRESS]: [ORDER_ACTION.VIEW_DETAILS, ORDER_ACTION.CANCEL_BOOKING],
  [ORDER_STATUS.COMPLETED]: [ORDER_ACTION.VIEW_DETAILS, ORDER_ACTION.DOWNLOAD],
  [ORDER_STATUS.CANCELLED]: [ORDER_ACTION.VIEW_DETAILS],
};

export const getOrderActionsForStatus = (status) =>
  ORDER_STATUS_ACTIONS[status] ?? [ORDER_ACTION.VIEW_DETAILS];

export const ORDER_META_LABEL_CLASS = 'text-xs font-medium text-[#90a1b9]';
export const ORDER_META_VALUE_DEFAULT_CLASS = 'mt-0.5 text-sm font-medium text-[#0f172b]';
export const ORDER_META_VALUE_ORDER_ID_CLASS = 'mt-0.5 text-xs font-medium text-[#45556c]';
export const ORDER_META_VALUE_BASE_CLASS = 'mt-0.5 text-sm font-medium';

export const ORDER_STATUS_STYLES = {
  [ORDER_STATUS.PAYMENT_REQUIRED]: {
    badge: 'border-[#ffd6a8] bg-[#fff7ed] text-[#ca3500]',
    dot: 'bg-[#ff6900]',
  },
  [ORDER_STATUS.TECHNICIAN_ASSIGNED]: {
    badge: 'border-[#e9d4ff] bg-[#faf5ff] text-[#8200db]',
    dot: 'bg-[#ad46ff]',
  },
  [ORDER_STATUS.PENDING_REVIEW]: {
    badge: 'border-[#e2e8f0] bg-[#f8fafc] text-[#45556c]',
    dot: 'bg-[#90a1b9]',
  },
  [ORDER_STATUS.COMPLETED]: {
    badge: 'border-[#b9f8cf] bg-[#f0fdf4] text-[#008236]',
    dot: 'bg-[#00c950]',
  },
  [ORDER_STATUS.IN_PROGRESS]: {
    badge: 'border-[#c6d2ff] bg-[#eef2ff] text-[#432dd7]',
    dot: 'bg-[#615fff]',
  },
  [ORDER_STATUS.CANCELLED]: {
    badge: 'border-[#fecaca] bg-[#fef2f2] text-[#c10007]',
    dot: 'bg-[#fb2c36]',
  },
};

export const ORDER_TIER_STYLES = {
  [ORDER_TIER.PREMIUM]:
    'border-[#ffd230] bg-[rgba(255,185,0,0.9)] text-[#7b3306]',
  [ORDER_TIER.STANDARD]: 'border-[#e2e8f0] bg-white/90 text-[#45556c]',
};

export const ORDER_FILTER_TABS = [
  { id: ORDER_FILTER.ALL, label: 'All' },
  { id: ORDER_FILTER.PENDING_REVIEW, label: 'Pending Review' },
  { id: ORDER_FILTER.PAYMENT_REQUIRED, label: 'Payment Required' },
  { id: ORDER_FILTER.TECHNICIAN_ASSIGNED, label: 'Technician assign' },
  { id: ORDER_FILTER.IN_PROGRESS, label: 'In Progress' },
  { id: ORDER_FILTER.COMPLETED, label: 'Completed' },
  { id: ORDER_FILTER.CANCELLED, label: 'Cancelled' },
];

export const ORDER_STATUS_LABELS = {
  [ORDER_STATUS.PENDING_REVIEW]: 'Pending Review',
  [ORDER_STATUS.PAYMENT_REQUIRED]: 'Payment Required',
  [ORDER_STATUS.TECHNICIAN_ASSIGNED]: 'Technician Assigned',
  [ORDER_STATUS.IN_PROGRESS]: 'In Progress',
  [ORDER_STATUS.COMPLETED]: 'Completed',
  [ORDER_STATUS.CANCELLED]: 'Cancelled',
};

export const ORDER_TIER_LABELS = {
  [ORDER_TIER.STANDARD]: 'Standard',
  [ORDER_TIER.PREMIUM]: '★ Premium',
};

export const ORDER_ITEMS = [
  {
    id: 'ord-2024-001',
    orderId: 'ORD-2024-001',
    title: 'Electrical Panel Upgrade',
    category: 'Electrical · Panel & Wiring',
    image: `${LANDING_ASSET_PATH}/service-electrical.png`,
    imageAlt: 'Electrician working on a residential electrical panel',
    status: ORDER_STATUS.PAYMENT_REQUIRED,
    tier: ORDER_TIER.PREMIUM,
    bookedOn: 'Jan 15, 2024',
    appointment: 'Jan 22, 2024',
    isAppointmentHighlighted: true,
    duration: '3–4 hours',
    materialPayment: { kind: ORDER_PAYMENT_KIND.DUE, label: 'Due: $185' },
    serviceCostLabel: 'Est. Service Cost',
    serviceCost: 'From $320',
    isActive: true,
    isUpcoming: true,
  },
  {
    id: 'ord-2024-002',
    orderId: 'ORD-2024-002',
    title: 'Bathroom Tile Installation',
    category: 'Flooring · Tile & Stone',
    image: `${LANDING_ASSET_PATH}/article-repairs.png`,
    imageAlt: 'Technician installing bathroom tiles',
    status: ORDER_STATUS.TECHNICIAN_ASSIGNED,
    tier: ORDER_TIER.STANDARD,
    bookedOn: 'Jan 15, 2024',
    appointment: 'Jan 22, 2024',
    isAppointmentHighlighted: true,
    duration: '3–4 hours',
    materialPayment: { kind: ORDER_PAYMENT_KIND.PAID, label: '✓ Paid $420' },
    serviceCostLabel: 'Service Cost',
    serviceCost: '$280',
    isActive: true,
    isUpcoming: true,
  },
  {
    id: 'ord-2024-003',
    orderId: 'ORD-2024-003',
    title: 'Ceiling Fan Installation',
    category: 'Electrical · Lighting',
    image: `${LANDING_ASSET_PATH}/article-electrical.png`,
    imageAlt: 'Ceiling fan installation in a living room',
    status: ORDER_STATUS.PENDING_REVIEW,
    tier: ORDER_TIER.STANDARD,
    bookedOn: 'Jan 10, 2024',
    appointment: 'Jan 25, 2024',
    isAppointmentHighlighted: false,
    duration: '1.5–2 hours',
    materialPayment: { kind: ORDER_PAYMENT_KIND.PENDING_REVIEW, label: 'Pending review' },
    serviceCostLabel: 'Est. Service Cost',
    serviceCost: 'From $145',
    isActive: false,
    isUpcoming: true,
  },
  {
    id: 'ord-2024-004',
    orderId: 'ORD-2024-004',
    title: 'Kitchen Cabinet Assembly',
    category: 'Carpentry · Cabinet & Shelving',
    image: `${LANDING_ASSET_PATH}/article-maintenance.png`,
    imageAlt: 'Kitchen cabinet assembly in progress',
    status: ORDER_STATUS.COMPLETED,
    tier: ORDER_TIER.PREMIUM,
    bookedOn: 'Jan 15, 2024',
    appointment: 'Jan 22, 2024',
    isAppointmentHighlighted: true,
    duration: '3–4 hours',
    materialPayment: { kind: ORDER_PAYMENT_KIND.PAID, label: '✓ Paid $260' },
    serviceCostLabel: 'Est. Service Cost',
    serviceCost: 'From $450',
    isActive: false,
    isUpcoming: false,
  },
  {
    id: 'ord-2024-005',
    orderId: 'ORD-2024-005',
    title: 'AC Unit Installation',
    category: 'HVAC · Air Conditioning',
    image: `${LANDING_ASSET_PATH}/article-winter.png`,
    imageAlt: 'Technician installing an air conditioning unit',
    status: ORDER_STATUS.IN_PROGRESS,
    tier: ORDER_TIER.PREMIUM,
    bookedOn: 'Jan 08, 2024',
    appointment: 'Jan 18, 2024',
    isAppointmentHighlighted: true,
    duration: '3–5 hours',
    materialPayment: { kind: ORDER_PAYMENT_KIND.PAID, label: '✓ Paid $340' },
    serviceCostLabel: 'Est. Service Cost',
    serviceCost: 'From $520',
    isActive: true,
    isUpcoming: false,
  },
  {
    id: 'ord-2024-006',
    orderId: 'ORD-2024-006',
    title: 'Garden Fence Repair',
    category: 'Outdoor · Fence & Gate',
    image: `${LANDING_ASSET_PATH}/article-winter.png`,
    imageAlt: 'Fence repair along a residential garden',
    status: ORDER_STATUS.CANCELLED,
    tier: ORDER_TIER.STANDARD,
    bookedOn: 'Jan 05, 2024',
    appointment: 'Jan 12, 2024',
    isAppointmentHighlighted: false,
    duration: '2–3 hours',
    materialPayment: { kind: ORDER_PAYMENT_KIND.PENDING_REVIEW, label: 'Cancelled' },
    serviceCostLabel: 'Est. Service Cost',
    serviceCost: 'From $210',
    isActive: false,
    isUpcoming: false,
  },
];

export const filterOrders = (orders, selectedFilter) => {
  if (selectedFilter === ORDER_FILTER.ALL) {
    return orders;
  }

  return orders.filter((order) => order.status === selectedFilter);
};

export const buildOrderSummary = (orders) => ({
  active: orders.filter((order) => order.isActive).length,
  completed: orders.filter((order) => order.status === ORDER_STATUS.COMPLETED).length,
  pendingPayment: orders.filter((order) => order.status === ORDER_STATUS.PAYMENT_REQUIRED)
    .length,
  upcoming: orders.filter((order) => order.isUpcoming).length,
});

export const formatOrderCount = (count, singular, plural) =>
  `${count} ${count === 1 ? singular : plural}`;
