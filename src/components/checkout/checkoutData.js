import { ROUTES, SERVICE_DETAILS_PREFIX, buildServiceDetailsRoute } from '../../config';
import { getCatalogServiceById } from '../catalog/catalogRegistry';

export const CHECKOUT_STRIP_MONTHS_AHEAD = 3;
export const CHECKOUT_ISO_PAD_LENGTH = 2;
export const CHECKOUT_INPUT_CLASS =
  'h-11 w-full rounded-[2px] border border-[#e4e7e9] bg-[#e9eaea] px-[15px] text-sm text-[#191c1f] placeholder:text-[#77878f] focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-orange';
export const CHECKOUT_LAYOUT_CLASS =
  'grid min-w-0 items-start gap-6 lg:grid-cols-[minmax(0,7fr)_minmax(0,3fr)]';
export const CHECKOUT_FORM_COLUMN_CLASS = 'min-w-0';
export const CHECKOUT_SUMMARY_COLUMN_CLASS = 'min-w-0';
export const CHECKOUT_CARD_CLASS =
  'w-full min-w-0 rounded-[20px] bg-white p-4 shadow-[0px_0px_3.95px_0px_rgba(0,0,0,0.16)] sm:p-9';
export const CHECKOUT_NESTED_CARD_CLASS =
  'w-full min-w-0 rounded-2xl border border-[#e5e7eb] bg-white p-5 sm:p-6 lg:p-5 xl:p-[33px]';
export const CHECKOUT_ORDER_SUMMARY_STICKY_CLASS = 'lg:sticky lg:top-32';
export const CHECKOUT_ACTIONS_CLASS =
  'mt-6 flex flex-col-reverse gap-3 min-[400px]:flex-row min-[400px]:items-center min-[400px]:justify-between lg:flex-col-reverse xl:flex-row xl:items-center';
export const CHECKOUT_BACK_LINK_CLASS =
  'inline-flex shrink-0 items-center justify-center text-sm font-medium text-brand-ink hover:text-brand-orange focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-orange';
export const CHECKOUT_CONFIRM_BUTTON_CLASS =
  'inline-flex min-h-12 w-full cursor-pointer items-center justify-center gap-2 whitespace-nowrap rounded-xl bg-brand-orange px-4 py-3 text-sm font-semibold text-white transition-colors hover:bg-brand-orange-dark focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-orange min-[400px]:w-auto min-[400px]:px-5 lg:w-full xl:w-auto xl:px-6 xl:text-base';
export const CHECKOUT_CONFIRM_ICON_SIZE = 18;
export const CHECKOUT_SUBHEADING_CLASS = 'text-xl font-bold leading-7 text-[#0b1e3d]';
export const CHECKOUT_PARAGRAPH_CLASS = 'pt-2 text-sm leading-5 text-[#6a7282]';
export const CHECKOUT_THUMBNAIL_SIZE_CLASS = 'size-12';
export const CHECKOUT_CONTACT_ICON_SIZE = 22;
export const CHECKOUT_CONTACT_CHECK_SIZE = 16;
export const CHECKOUT_UPLOAD_ICON_SIZE = 36;
export const CHECKOUT_PACKAGE_ID_SUFFIX = /-(standard|premium)$/;
export const CHECKOUT_SECTION_TITLE_CLASS = 'text-2xl font-medium text-[#191c1f]';
export const CHECKOUT_DATE_HEADER_CLASS =
  'mb-3 flex min-w-0 items-center justify-between gap-1 sm:gap-2';
export const CHECKOUT_DATE_HEADING_CLASS =
  'shrink-0 whitespace-nowrap text-[11px] font-bold leading-4 text-[#0b1e3d] min-[400px]:text-sm min-[400px]:leading-5 sm:text-lg sm:leading-[27px]';
export const CHECKOUT_DATE_SCROLL_EDGE_OFFSET = 4;
export const CHECKOUT_DATE_SCROLL_STEP = 14;
export const CHECKOUT_DATE_DRAG_THRESHOLD = 5;
export const CHECKOUT_DATE_GAP_PX = 8;
export const CHECKOUT_DATE_NAV_ICON_SIZE = 18;
export const CHECKOUT_DATE_NAV_BUTTON_CLASS =
  'inline-flex shrink-0 cursor-pointer items-center justify-center rounded-md p-0.5 text-brand-orange transition-colors hover:bg-brand-orange/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-orange disabled:cursor-not-allowed disabled:opacity-40 sm:p-1 [&_svg]:size-3 sm:[&_svg]:size-[18px]';
export const CHECKOUT_DATE_NAV_GROUP_CLASS =
  'relative flex shrink-0 items-center gap-0.5 sm:gap-1';
export const CHECKOUT_CALENDAR_WRAPPER_CLASS = 'relative shrink-0';
export const CHECKOUT_CALENDAR_TRIGGER_CLASS =
  'inline-flex shrink-0 cursor-pointer items-center gap-1 rounded-lg px-0.5 py-0.5 text-[11px] font-bold leading-4 text-[#0b1e3d] transition-colors hover:bg-brand-orange/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-orange min-[400px]:gap-1.5 min-[400px]:px-1 min-[400px]:text-sm min-[400px]:leading-5 sm:gap-2 sm:px-2 sm:py-1 sm:text-lg sm:leading-[27px] [&_svg]:size-3 sm:[&_svg]:size-[18px]';
export const CHECKOUT_CALENDAR_MONTH_LABEL_CLASS = 'whitespace-nowrap';
export const CHECKOUT_CALENDAR_ICON_SIZE = 18;
export const CHECKOUT_CALENDAR_PANEL_CLASS =
  'absolute right-0 top-full z-20 mt-2 w-[min(320px,calc(100vw-2rem))] rounded-2xl border border-[#e5e7eb] bg-white p-4 shadow-lg';
export const CHECKOUT_CALENDAR_HEADER_CLASS = 'mb-3 flex items-center justify-between gap-2';
export const CHECKOUT_CALENDAR_MONTH_CLASS = 'text-sm font-bold text-[#0b1e3d]';
export const CHECKOUT_CALENDAR_WEEKDAY_ROW_CLASS = 'mb-2 grid grid-cols-7 gap-1';
export const CHECKOUT_CALENDAR_WEEKDAY_CLASS = 'text-center text-xs font-medium text-[#6a7282]';
export const CHECKOUT_CALENDAR_GRID_CLASS = 'grid grid-cols-7 gap-1';
export const CHECKOUT_CALENDAR_DAY_IDLE =
  'flex size-9 cursor-pointer items-center justify-center rounded-full text-sm font-medium text-[#0b1e3d] transition-colors hover:bg-brand-orange/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-orange';
export const CHECKOUT_CALENDAR_DAY_OUTSIDE =
  'flex size-9 items-center justify-center rounded-full text-sm font-medium text-[#99a1af]';
export const CHECKOUT_CALENDAR_DAY_DISABLED =
  'flex size-9 cursor-not-allowed items-center justify-center rounded-full text-sm font-medium text-[#d1d5db]';
export const CHECKOUT_CALENDAR_DAY_ACTIVE =
  'flex size-9 cursor-pointer items-center justify-center rounded-full bg-brand-orange text-sm font-semibold text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-orange';
export const CHECKOUT_CALENDAR_WEEKDAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
export const CHECKOUT_DATE_STRIP_CLASS =
  'flex h-[76px] cursor-grab gap-2 overflow-x-auto overflow-y-hidden active:cursor-grabbing [-ms-overflow-style:none] [scrollbar-width:none] [touch-action:pan-x] [&::-webkit-scrollbar]:hidden';
export const CHECKOUT_DATE_BUTTON_IDLE =
  'flex h-[68px] min-w-[60px] shrink-0 cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-[#e5e7eb] px-[14px] py-3 text-center transition-colors hover:border-brand-orange/40 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-orange';
export const CHECKOUT_DATE_BUTTON_ACTIVE =
  'flex h-[68px] min-w-[60px] shrink-0 cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-brand-orange bg-brand-orange-light/40 px-[14px] py-3 text-center focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-orange';
export const CHECKOUT_DATE_WEEKDAY_CLASS = 'text-xs font-medium leading-4 text-[#4a5565]';
export const CHECKOUT_DATE_DAY_CLASS = 'text-lg font-bold leading-7 text-[#0b1e3d]';
export const CHECKOUT_TIME_BUTTON_IDLE =
  'h-11 cursor-pointer rounded-2xl border-2 border-gray-200 px-[22px] text-sm font-medium text-[#4a5565] transition-colors hover:border-brand-orange/40 hover:bg-[rgba(255,107,26,0.05)] focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-orange';
export const CHECKOUT_TIME_BUTTON_ACTIVE =
  'h-11 cursor-pointer rounded-2xl border-2 border-[#ff6b1a] bg-[rgba(255,107,26,0.05)] px-[22px] text-sm font-semibold text-[#ff6b1a] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#ff6b1a]';
export const CHECKOUT_CONTACT_IDLE =
  'flex w-full min-w-0 cursor-pointer flex-col items-center gap-3 rounded-2xl border-2 border-[#e5e7eb] p-[26px] text-center transition-colors hover:border-[#ff6b1a]/40 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#ff6b1a]';
export const CHECKOUT_CONTACT_ACTIVE =
  'flex w-full min-w-0 cursor-pointer flex-col items-center gap-3 rounded-2xl border-2 border-[#ff6b1a] bg-[rgba(255,107,26,0.05)] p-[26px] text-center focus:outline-none focus-visible:ring-2 focus-visible:ring-[#ff6b1a]';
export const CHECKOUT_UPLOAD_CLASS =
  'flex w-full cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed border-[#e5e7eb] p-6 text-center sm:p-[42px]';
export const CHECKOUT_CONTACT_ICON_WRAP_IDLE =
  'flex size-12 items-center justify-center rounded-2xl bg-[#f3f4f6] text-[#4a5565]';
export const CHECKOUT_CONTACT_ICON_WRAP_ACTIVE =
  'flex size-12 items-center justify-center rounded-2xl bg-[#ff6b1a] text-white';
export const CHECKOUT_CONTACT_LABEL_IDLE = 'text-sm font-semibold text-[#4a5565]';
export const CHECKOUT_CONTACT_LABEL_ACTIVE = 'text-sm font-semibold text-[#ff6b1a]';
export const CHECKOUT_PAYMENT_NOTE_LABEL_CLASS = 'font-bold text-[#1447e6]';
export const CHECKOUT_PAYMENT_NOTE_BODY_CLASS = 'font-normal text-[#1447e6]/70';
export const CHECKOUT_PAYMENT_NOTE_BOX_CLASS =
  'mt-6 rounded-2xl border border-[#dbeafe] bg-[#eff6ff] p-[17px] text-xs leading-4';
export const CHECKOUT_REVIEW_SURFACE_CLASS = 'rounded-2xl bg-[#f7f8fa]';
export const CHECKOUT_EMPTY_PLACEHOLDER = '—';

export const CHECKOUT_TIME_SLOTS = [
  '8:00 AM',
  '9:00 AM',
  '10:00 AM',
  '11:00 AM',
  '1:00 PM',
  '2:00 PM',
  '3:00 PM',
  '4:00 PM',
];

export const CHECKOUT_CONTACT_METHODS = {
  PHONE: 'phone',
  EMAIL: 'email',
};

const WEEKDAY_SHORT = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const CHECKOUT_MONTH_NAMES = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

const padIsoPart = (value) => String(value).padStart(CHECKOUT_ISO_PAD_LENGTH, '0');

export const toLocalIsoDate = (date) =>
  `${date.getFullYear()}-${padIsoPart(date.getMonth() + 1)}-${padIsoPart(date.getDate())}`;

export const formatCheckoutMonthYear = (date) =>
  `${CHECKOUT_MONTH_NAMES[date.getMonth()]},${date.getFullYear()}`;

const startOfDay = (date) => new Date(date.getFullYear(), date.getMonth(), date.getDate());

export const parseCheckoutIsoDate = (isoDate) => {
  const [year, month, day] = isoDate.split('-').map(Number);
  return new Date(year, month - 1, day);
};

export const getDefaultCheckoutStripEndDate = (fromDate = new Date()) =>
  new Date(fromDate.getFullYear(), fromDate.getMonth() + CHECKOUT_STRIP_MONTHS_AHEAD + 1, 0);

export const getCheckoutStripEndDate = (fromDate = new Date(), throughDate) => {
  const defaultEnd = startOfDay(getDefaultCheckoutStripEndDate(fromDate));
  if (!throughDate) {
    return defaultEnd;
  }

  const extendedEnd = startOfDay(throughDate);
  return extendedEnd > defaultEnd ? extendedEnd : defaultEnd;
};

export const isCheckoutDateInPast = (date, fromDate = new Date()) =>
  startOfDay(date) < startOfDay(fromDate);

export const isCheckoutDateSelectable = (date, fromDate = new Date()) =>
  !isCheckoutDateInPast(date, fromDate);

export const buildCalendarMonthCells = (year, month, selectedDateId, fromDate = new Date()) => {
  const firstOfMonth = new Date(year, month, 1);
  const leadingBlankCount = firstOfMonth.getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const trailingCount = (7 - ((leadingBlankCount + daysInMonth) % 7)) % 7;
  const cells = [];

  for (let index = 0; index < leadingBlankCount; index += 1) {
    const date = new Date(year, month, index - leadingBlankCount + 1);
    const iso = toLocalIsoDate(date);
    cells.push({
      iso,
      day: String(date.getDate()),
      isCurrentMonth: false,
      isSelectable: isCheckoutDateSelectable(date, fromDate),
      isSelected: iso === selectedDateId,
    });
  }

  for (let day = 1; day <= daysInMonth; day += 1) {
    const date = new Date(year, month, day);
    const iso = toLocalIsoDate(date);
    cells.push({
      iso,
      day: String(day),
      isCurrentMonth: true,
      isSelectable: isCheckoutDateSelectable(date, fromDate),
      isSelected: iso === selectedDateId,
    });
  }

  for (let index = 1; index <= trailingCount; index += 1) {
    const date = new Date(year, month + 1, index);
    const iso = toLocalIsoDate(date);
    cells.push({
      iso,
      day: String(index),
      isCurrentMonth: false,
      isSelectable: isCheckoutDateSelectable(date, fromDate),
      isSelected: iso === selectedDateId,
    });
  }

  return cells;
};

export const buildCheckoutDates = (fromDate = new Date(), throughDate) => {
  const bookingStart = startOfDay(fromDate);
  const bookingEnd = getCheckoutStripEndDate(fromDate, throughDate);
  const dates = [];
  const cursor = new Date(bookingStart);

  while (cursor <= bookingEnd) {
    const iso = toLocalIsoDate(cursor);
    dates.push({
      id: iso,
      weekday: WEEKDAY_SHORT[cursor.getDay()],
      day: String(cursor.getDate()),
      iso,
      monthYear: formatCheckoutMonthYear(cursor),
    });
    cursor.setDate(cursor.getDate() + 1);
  }

  return dates;
};

export const getEndOfMonth = (date) =>
  new Date(date.getFullYear(), date.getMonth() + 1, 0);

export const getServiceIdFromCartItemId = (cartItemId = '') =>
  cartItemId.replace(CHECKOUT_PACKAGE_ID_SUFFIX, '');

export const getCheckoutBackPath = ({ fromPath, cartItemId } = {}) => {
  if (fromPath?.startsWith(SERVICE_DETAILS_PREFIX)) {
    return fromPath;
  }

  const serviceId = getServiceIdFromCartItemId(cartItemId);
  if (!serviceId) {
    return ROUTES.HOME;
  }

  const catalogService = getCatalogServiceById(serviceId);
  return buildServiceDetailsRoute(serviceId, catalogService?.catalogTitle);
};
