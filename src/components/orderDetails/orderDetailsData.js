import {
  ORDER_ITEMS,
  ORDER_STATUS,
  ORDER_STATUS_LABELS,
  ORDER_STATUS_STYLES,
  ORDER_TIER_LABELS,
} from '../orders/ordersData';

export const ORDER_DETAILS_SAMPLE_ID = 'ord-2024-001';
export const ORDER_DETAILS_ASSET_PATH = '/assets/order-details';
export const ORDER_DETAILS_CALENDAR_ICON = `${ORDER_DETAILS_ASSET_PATH}/calendar-icon.svg`;
export const ORDER_DETAILS_TIMELINE_HEADER_ICON = `${ORDER_DETAILS_ASSET_PATH}/timeline-icon.svg`;
export const ORDER_DETAILS_SECTION_CHEVRON_ICON = `${ORDER_DETAILS_ASSET_PATH}/chevron-icon.svg`;
export const ORDER_DETAILS_TIMELINE_CHECK_ICON = `${ORDER_DETAILS_ASSET_PATH}/timeline-check-icon.svg`;
export const ORDER_DETAILS_SECTION_ICON_SIZE = 16;
export const ORDER_DETAILS_TIMELINE_ICON_SIZE = 14;
export const ORDER_DETAILS_LIST_ICON_SIZE = 16;
export const ORDER_DETAILS_CTA_ICON_SIZE = 16;
export const ORDER_DETAILS_PAY_ICON_SIZE = 20;
export const ORDER_DETAILS_BACK_ICON_SIZE = 16;
/** Figma: main column 1075px + sidebar 384px with 77px gutter */
export const ORDER_DETAILS_COLUMN_GAP_CLASS = 'gap-6 lg:gap-[77px]';

export const ORDER_DETAILS_PAGE_CLASS =
  'min-h-screen overflow-x-clip bg-[#f8fafc] font-inter text-brand-ink';
export const ORDER_DETAILS_MAIN_CLASS =
  'animate-page-enter mx-auto max-w-screen-2xl px-4 pb-24 pt-8 sm:px-6 lg:px-8 lg:pb-28';
export const ORDER_DETAILS_BACK_LINK_CLASS =
  'mb-6 inline-flex items-center gap-1 text-sm font-normal text-[#191c1f] transition-colors hover:text-brand-orange focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-orange';
export const ORDER_DETAILS_LAYOUT_CLASS = `grid ${ORDER_DETAILS_COLUMN_GAP_CLASS} lg:grid-cols-[minmax(0,1fr)_384px] lg:items-start`;
export const ORDER_DETAILS_STACK_CLASS = 'flex min-w-0 flex-col gap-4';
export const ORDER_DETAILS_SIDEBAR_CLASS =
  'flex min-w-0 flex-col gap-4 lg:sticky lg:top-32 lg:self-start';
export const ORDER_DETAILS_SECTION_CLASS =
  'overflow-hidden rounded-2xl border border-[#f1f5f9] bg-white shadow-sm';
export const ORDER_DETAILS_SECTION_HEADER_CLASS =
  'flex w-full cursor-pointer items-center justify-between px-5 py-4 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-brand-orange';
export const ORDER_DETAILS_SECTION_BODY_CLASS = 'border-t border-[#f8fafc] px-5 pb-5 pt-px';
export const ORDER_DETAILS_META_STACK_CLASS = 'flex flex-col gap-[14px] pt-4';
export const ORDER_DETAILS_META_ROW_CLASS = 'flex items-start justify-between gap-4';
export const ORDER_DETAILS_META_ITEM_LEFT_CLASS = 'min-w-0';
export const ORDER_DETAILS_META_ITEM_RIGHT_CLASS = 'shrink-0 text-right';
export const ORDER_DETAILS_META_LABEL_CLASS = 'text-xs font-medium leading-4 text-[#90a1b9]';
export const ORDER_DETAILS_META_VALUE_CLASS =
  'pt-0.5 text-sm font-semibold leading-5 text-[#0f172b]';
export const ORDER_DETAILS_META_HIGHLIGHT_CLASS =
  'pt-0.5 text-sm font-semibold leading-5 text-[#f54900]';
export const ORDER_DETAILS_TIMELINE_LIST_CLASS = 'pl-1 pt-4';
export const ORDER_DETAILS_TIMELINE_STEP_CLASS = 'relative flex gap-4 pb-6 last:pb-0';
export const ORDER_DETAILS_TIMELINE_COMPLETE_LINE_CLASS =
  'absolute left-[13px] top-7 h-[60px] w-px bg-[#ffd6a8]';
export const ORDER_DETAILS_TIMELINE_PENDING_LINE_CLASS =
  'absolute left-[13px] top-7 h-[42px] w-px bg-[#f1f5f9]';
export const ORDER_DETAILS_TIMELINE_COMPLETE_DOT_CLASS =
  'relative z-[1] flex size-7 shrink-0 items-center justify-center rounded-full bg-[#ff6900]';
export const ORDER_DETAILS_TIMELINE_PENDING_DOT_CLASS =
  'relative z-[1] flex size-7 shrink-0 items-center justify-center rounded-full border-2 border-[#e2e8f0] bg-white';
export const ORDER_DETAILS_TIMELINE_PENDING_INNER_DOT_CLASS = 'size-2 rounded-full bg-[#e2e8f0]';
export const ORDER_DETAILS_TIMELINE_COMPLETE_TITLE_CLASS =
  'text-sm font-semibold leading-5 text-[#0f172b]';
export const ORDER_DETAILS_TIMELINE_COMPLETE_TIMESTAMP_CLASS =
  'pt-0.5 text-xs leading-4 text-[#90a1b9]';
export const ORDER_DETAILS_TIMELINE_COMPLETE_DESCRIPTION_CLASS =
  'pt-1 text-xs leading-[19.5px] text-[#62748e]';
export const ORDER_DETAILS_TIMELINE_PENDING_TEXT_CLASS =
  'text-sm font-semibold leading-5 text-[#cad5e2]';
export const ORDER_DETAILS_TIMELINE_PENDING_DESCRIPTION_CLASS =
  'pt-1 text-xs leading-[19.5px] text-[#cad5e2]';
export const ORDER_DETAILS_NOT_FOUND_CLASS =
  'rounded-2xl border border-[#e2e8f0] bg-white p-10 text-center';

export const ORDER_DETAILS_TIMELINE_STEPS = [
  {
    id: 'submitted',
    title: 'Booking Submitted',
    timestamp: 'Jan 15, 2024 · 9:32 AM',
    description: 'Your booking request was received successfully.',
    state: 'complete',
  },
  {
    id: 'material-paid',
    title: 'Material Paid',
    description: 'Payment confirmation and receipt generation.',
    state: 'pending',
  },
  {
    id: 'technician',
    title: 'Technician Assigned',
    description: 'Best-matched technician will be assigned.',
    state: 'pending',
  },
  {
    id: 'in-progress',
    title: 'Work In Progress',
    description: 'Technician is on-site performing the service.',
    state: 'pending',
  },
  {
    id: 'completed',
    title: 'Completed',
    description: 'Service completed and signed off.',
    state: 'pending',
  },
];

export const ORDER_DETAILS_BY_ID = {
  [ORDER_DETAILS_SAMPLE_ID]: {
    id: ORDER_DETAILS_SAMPLE_ID,
    orderId: 'ORD-2024-001',
    status: ORDER_STATUS.PAYMENT_REQUIRED,
    bookingDate: 'Jan 15, 2024',
    appointmentDate: 'Jan 22, 2024',
    appointmentTime: '10:00 AM',
    appointmentTimeShort: '10:00',
    category: 'Electrical',
    packageName: 'Premium',
    duration: '3–4 hours',
    serviceTitle: 'Ceiling Light Installation',
    serviceDescription:
      'Complete upgrade of your residential electrical panel from 100A to 200A service. Includes removal of old panel, installation of new main breaker panel, transfer of existing circuits, and inspection preparation.',
    included: [
      'Panel removal & disposal',
      'New 200A panel installation',
      'Transfer of up to 20 existing circuits',
      'Ground fault protection upgrade',
      'Post-installation safety check',
      'Work completion report',
    ],
    excluded: [
      'Permit fees (customer responsibility)',
      'Additional rewiring beyond panel',
      'Utility company coordination fees',
      'Emergency after-hours surcharge',
    ],
    startingPriceLabel: '$320 onwards',
    materialRequired: true,
    materialItems: [
      { id: 'panel', name: '200A Main Breaker Panel', qty: '1 unit', cost: '$85' },
      { id: 'breakers', name: 'Circuit Breakers 15A', qty: '6 pcs', cost: '$30' },
      { id: 'wire', name: 'AWG Wire 10/2', qty: '50 ft', cost: '$40' },
      { id: 'junction', name: 'Junction Box', qty: '2 pcs', cost: '$20' },
      { id: 'conduit', name: 'Conduit & Fittings', qty: '1 set', cost: '$10' },
    ],
    materialTotal: '$185',
    bookingPrice: '$320',
    paymentStatus: 'Pay After Completion',
    timeline: ORDER_DETAILS_TIMELINE_STEPS,
  },
};

const buildFallbackDetails = (listItem) => ({
  id: listItem.id,
  orderId: listItem.orderId,
  status: listItem.status,
  bookingDate: listItem.bookedOn,
  appointmentDate: listItem.appointment,
  appointmentTime: '10:00 AM',
  appointmentTimeShort: '10:00',
  category: listItem.category.split('·')[0]?.trim() ?? listItem.category,
  packageName: ORDER_TIER_LABELS[listItem.tier]?.replace('★ ', '') ?? 'Standard',
  duration: listItem.duration,
  serviceTitle: listItem.title,
  serviceDescription: listItem.imageAlt,
  included: ['Professional labor', 'Basic setup', 'Work completion report'],
  excluded: ['Permit fees (customer responsibility)', 'Specialty materials'],
  startingPriceLabel: listItem.serviceCost,
  materialRequired: listItem.materialPayment?.kind === 'due',
  materialItems: [
    {
      id: `${listItem.id}-material`,
      name: 'Service materials',
      qty: '1 set',
      cost: listItem.materialPayment?.label?.replace(/[^\d.$]/g, '') || '$0',
    },
  ],
  materialTotal: listItem.materialPayment?.label?.match(/\$\d+/)?.[0] ?? '$0',
  bookingPrice: listItem.serviceCost.replace(/[^\d.$]/g, '') || listItem.serviceCost,
  paymentStatus: 'Pay After Completion',
  timeline: ORDER_DETAILS_TIMELINE_STEPS,
});

export const getOrderStatusLabel = (status) => ORDER_STATUS_LABELS[status] ?? status;

export const getOrderStatusStyle = (status) =>
  ORDER_STATUS_STYLES[status] ?? ORDER_STATUS_STYLES[ORDER_STATUS.PENDING_REVIEW];

export const findOrderDetails = (orderId) => {
  if (ORDER_DETAILS_BY_ID[orderId]) {
    return ORDER_DETAILS_BY_ID[orderId];
  }

  const listItem = ORDER_ITEMS.find((order) => order.id === orderId);
  return listItem ? buildFallbackDetails(listItem) : null;
};
