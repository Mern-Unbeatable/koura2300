export const OVERVIEW_PAGE_CLASS = 'flex flex-col gap-6 sm:gap-8';
export const OVERVIEW_HEADER_TITLE_CLASS =
  'text-[28px] font-medium leading-[1.2] text-[#0a0a0a] sm:text-[32px]';
export const OVERVIEW_HEADER_SUBTITLE_CLASS =
  'text-base leading-6 text-[#555353] sm:text-xl sm:leading-[1.5]';
export const OVERVIEW_STATS_GRID_CLASS =
  'grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4';
export const OVERVIEW_MIDDLE_GRID_CLASS =
  'grid grid-cols-1 gap-6 xl:grid-cols-[minmax(0,2fr)_minmax(0,1fr)]';
export const OVERVIEW_BOTTOM_GRID_CLASS = 'grid grid-cols-1 gap-6 lg:grid-cols-2';
export const OVERVIEW_CARD_CLASS =
  'rounded-2xl border border-[#ececec] bg-white p-6 shadow-sm';
export const OVERVIEW_CARD_TITLE_CLASS = 'text-lg font-semibold leading-7 text-[#1a1a2e]';
export const OVERVIEW_CARD_SUBTITLE_CLASS = 'text-sm leading-5 text-[#6b7280]';
export const OVERVIEW_VIEW_ALL_CLASS =
  'cursor-pointer rounded-xl px-3 py-2 text-sm font-medium text-brand-orange transition-colors hover:bg-[#fff1eb] focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-orange';

export const OVERVIEW_STAT_CARD_CLASS =
  'flex flex-col gap-1 rounded-2xl border border-[#ececec] bg-white p-6 shadow-sm';
export const OVERVIEW_STAT_VALUE_CLASS =
  'text-2xl font-bold leading-8 tracking-[-0.6px] text-[#1a1a2e]';
export const OVERVIEW_STAT_LABEL_CLASS = 'text-sm leading-5 text-[#6b7280]';

export const OVERVIEW_STAT_ICON_WRAP = {
  orange: 'rounded-xl bg-[rgba(252,111,50,0.05)] p-3 text-brand-orange',
  green: 'rounded-xl bg-[#f0fdf4] p-3 text-[#16a34a]',
  amber: 'rounded-xl bg-[#fff7ed] p-3 text-[#ea580c]',
  blue: 'rounded-xl bg-[#eff6ff] p-3 text-[#2563eb]',
};

export const OVERVIEW_PERIOD_SELECT_CLASS =
  'h-8 min-w-[123px] cursor-pointer appearance-none rounded-[4px] border-0 bg-[#f5f6f7] py-1 pr-8 pl-2.5 text-sm text-[#4a5154] focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-orange';

export const OVERVIEW_REVENUE_CARD_CLASS = `${OVERVIEW_CARD_CLASS} flex min-w-0 flex-col gap-6`;
export const OVERVIEW_REVENUE_HEADER_CLASS = 'flex items-center justify-between gap-3';

export const OVERVIEW_CHART_HEIGHT_PX = 300;
export const OVERVIEW_CHART_WIDTH = 1019;
export const OVERVIEW_CHART_MAX_VALUE = 60000;
export const OVERVIEW_CHART_Y_LABELS = ['$0k', '$15k', '$30k', '$45k', '$60k'];
export const OVERVIEW_CHART_HIGHLIGHT_RADIUS = 6;
export const OVERVIEW_CHART_HIGHLIGHT_BORDER = 4;
export const OVERVIEW_CHART_GRID_OFFSET_Y = 16;
export const OVERVIEW_CHART_MIN_WIDTH_CLASS = 'min-w-[320px]';
export const OVERVIEW_CHART_AXIS_LABEL_CLASS = 'fill-[#9ca3af] text-xs';
export const OVERVIEW_CHART_COLORS = {
  line: '#fc6f32',
  grid: '#f3f4f6',
  areaGradientStart: 'rgba(252, 111, 50, 0.28)',
  areaGradientEnd: 'rgba(252, 111, 50, 0)',
  tooltipValue: '#32bffc',
  tooltipMonth: '#040042',
  highlightGuide: '#fc6f32',
};
export const OVERVIEW_CHART_TOOLTIP = {
  width: 135,
  height: 68,
  offsetX: 67,
  offsetY: 88,
  paddingX: 13,
  paddingY: 7,
  borderRadius: 8,
  shadow: '0px 4px 16px rgba(50, 50, 71, 0.12)',
};
export const OVERVIEW_CHART_MONTH_LABEL_OFFSET_Y = 12;
export const OVERVIEW_CHART_HIGHLIGHT_SHADOW =
  '0px 2.667px 2.667px 0px rgba(50,50,71,0.06), 0px 2.667px 5.333px 0px rgba(50,50,71,0.06)';

export const OVERVIEW_CATEGORY_TRACK_CLASS =
  'h-2 w-full overflow-hidden rounded-full bg-[#f8f9fa]';
export const OVERVIEW_CATEGORY_BAR_CLASS = 'h-full rounded-full';
export const OVERVIEW_CATEGORY_ROW_CLASS = 'flex flex-col gap-2';
export const OVERVIEW_CATEGORY_HEADER_CLASS = 'flex items-center justify-between gap-3';
export const OVERVIEW_CATEGORY_NAME_CLASS = 'text-sm font-medium leading-5 text-[#1a1a2e]';
export const OVERVIEW_CATEGORY_VALUE_CLASS = 'text-sm leading-5 text-[#6b7280]';

export const OVERVIEW_AVATAR_BADGE_CLASS =
  'flex size-9 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-[rgba(252,111,50,0.2)] to-[rgba(50,191,252,0.2)] text-sm font-bold text-brand-orange';
export const OVERVIEW_LIST_ITEM_CLASS =
  'flex gap-3 border-b border-[rgba(236,236,236,0.5)] pb-4 last:border-b-0 last:pb-0';
export const OVERVIEW_LIST_NAME_CLASS = 'text-sm font-semibold leading-5 text-[#1a1a2e]';
export const OVERVIEW_LIST_BODY_CLASS = 'text-sm leading-5 text-[#6b7280]';
export const OVERVIEW_LIST_TIME_CLASS = 'text-xs leading-4 text-[#6b7280]';
export const OVERVIEW_ONLINE_DOT_CLASS =
  'absolute -right-0.5 -bottom-0.5 size-3 rounded-full border-2 border-white bg-[#00c950]';

export const OVERVIEW_PERIOD_OPTIONS = [
  { id: 'this-year', label: 'This year' },
  { id: 'last-year', label: 'Last year' },
];

export const OVERVIEW_STATS = [
  {
    id: 'total-revenue',
    label: 'Total Revenue',
    value: '$128,450',
    iconVariant: 'orange',
  },
  {
    id: 'todays-revenue',
    label: "Today's Revenue",
    value: '$3,240',
    iconVariant: 'green',
  },
  {
    id: 'pending-orders',
    label: 'Pending Orders',
    value: '23',
    iconVariant: 'amber',
  },
  {
    id: 'active-customers',
    label: 'Active Customers',
    value: '1280',
    iconVariant: 'blue',
  },
];

export const OVERVIEW_REVENUE_MONTHS = [
  { month: 'Jan', value: 22000 },
  { month: 'Feb', value: 28000 },
  { month: 'Mar', value: 32000 },
  { month: 'Apr', value: 29000 },
  { month: 'May', value: 36000 },
  { month: 'Jun', value: 41000 },
  {
    month: 'Jul',
    value: 38500,
    highlighted: true,
    tooltipMonth: 'July',
    tooltipValue: '$5600.00',
  },
  { month: 'Aug', value: 44000 },
  { month: 'Sep', value: 47000 },
  { month: 'Oct', value: 43000 },
  { month: 'Nov', value: 39000 },
  { month: 'Dec', value: 45000 },
];

export const OVERVIEW_CATEGORIES = [
  { id: 'lighting', name: 'Lighting', value: 245, color: '#fc6f32' },
  { id: 'security', name: 'Security', value: 186, color: '#32bffc' },
  { id: 'closets', name: 'Closets', value: 152, color: '#ff8904' },
  { id: 'fence', name: 'Fence', value: 98, color: '#c27aff' },
  { id: 'deck', name: 'Deck', value: 67, color: '#05df72' },
  { id: 'basement', name: 'Basement', value: 32, color: '#00c8be' },
];

export const OVERVIEW_REVIEWS = [
  {
    id: 'review-1',
    name: 'Sarah Johnson',
    initial: 'S',
    rating: 5,
    comment: 'Amazing service! The team was thorough and professional.',
  },
  {
    id: 'review-2',
    name: 'James Wilson',
    initial: 'J',
    rating: 4,
    comment: 'Good work overall. Slightly delayed but quality was great.',
  },
  {
    id: 'review-3',
    name: 'James Wilson',
    initial: 'J',
    rating: 4,
    comment: 'Good work overall. Slightly delayed but quality was great.',
  },
];

export const OVERVIEW_MESSAGES = [
  {
    id: 'message-1',
    name: 'Sarah Johnson',
    initial: 'S',
    message: 'I need eco-friendly cleaning products',
    time: '02:30 PM',
    isOnline: true,
  },
  {
    id: 'message-2',
    name: 'Emily Davis',
    initial: 'E',
    message: 'The plumber is on the way',
    time: '10:05 AM',
    isOnline: false,
  },
  {
    id: 'message-3',
    name: 'Michael Chen',
    initial: 'M',
    message: 'Thanks for confirming!',
    time: '09:30 AM',
    isOnline: true,
  },
];

export const getCategoryProgressPercent = (value, categories = OVERVIEW_CATEGORIES) => {
  const maxValue = Math.max(...categories.map((category) => category.value));

  if (maxValue === 0) {
    return 0;
  }

  return Math.round((value / maxValue) * 100);
};
