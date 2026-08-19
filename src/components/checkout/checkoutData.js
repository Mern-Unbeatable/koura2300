export const CHECKOUT_DATE_COUNT = 11;
export const CHECKOUT_INPUT_CLASS =
  'h-11 w-full rounded-[2px] border border-[#e4e7e9] bg-[#e9eaea] px-[15px] text-sm text-[#191c1f] placeholder:text-[#77878f] focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-orange';
export const CHECKOUT_CARD_CLASS =
  'w-full min-w-0 rounded-[20px] bg-white p-6 shadow-[0px_0px_3.95px_0px_rgba(0,0,0,0.16)] sm:p-9';
export const CHECKOUT_SECTION_TITLE_CLASS = 'text-2xl font-medium text-[#191c1f]';
export const CHECKOUT_DATE_BUTTON_IDLE =
  'flex min-w-[60px] shrink-0 cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-gray-200 px-3 py-2 text-center transition-colors hover:border-brand-orange/40 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-orange';
export const CHECKOUT_DATE_BUTTON_ACTIVE =
  'flex min-w-[60px] shrink-0 cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-brand-orange bg-brand-orange-light/40 px-3 py-2 text-center focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-orange';
export const CHECKOUT_TIME_BUTTON_IDLE =
  'h-11 cursor-pointer rounded-2xl border-2 border-gray-200 px-[22px] text-sm font-medium text-[#4a5565] transition-colors hover:border-brand-orange/40 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-orange';
export const CHECKOUT_TIME_BUTTON_ACTIVE =
  'h-11 cursor-pointer rounded-2xl border-2 border-[#0160f2] bg-blue-50 px-[22px] text-sm font-medium text-[#0160f2] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0160f2]';
export const CHECKOUT_CONTACT_IDLE =
  'flex w-full cursor-pointer items-center gap-4 rounded-2xl border-2 border-gray-200 p-5 text-left transition-colors hover:border-brand-orange/40 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-orange';
export const CHECKOUT_CONTACT_ACTIVE =
  'flex w-full cursor-pointer items-center gap-4 rounded-2xl border-2 border-brand-orange bg-[rgba(255,107,26,0.05)] p-5 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-orange';
export const CHECKOUT_UPLOAD_CLASS =
  'flex w-full cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed border-gray-200 p-10 text-center text-sm text-gray-500';
export const CHECKOUT_CONFIRM_BUTTON_CLASS =
  'inline-flex min-h-12 cursor-pointer items-center justify-center gap-2 rounded-xl bg-brand-orange px-6 py-3 text-base font-semibold text-white transition-colors hover:bg-brand-orange-dark focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-orange';

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

export const buildCheckoutDates = (count = CHECKOUT_DATE_COUNT, fromDate = new Date()) =>
  Array.from({ length: count }, (_, index) => {
    const date = new Date(fromDate);
    date.setDate(fromDate.getDate() + index);
    return {
      id: date.toISOString().slice(0, 10),
      weekday: WEEKDAY_SHORT[date.getDay()],
      day: String(date.getDate()),
      iso: date.toISOString().slice(0, 10),
    };
  });
