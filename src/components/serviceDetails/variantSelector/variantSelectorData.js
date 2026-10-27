export const VARIANT_SELECTOR_VIEWPORT = {
  MOBILE_S: 320,
  MOBILE_M: 375,
  MOBILE_L: 425,
  TABLET: 768,
  LAPTOP: 1020,
  DESKTOP: 1440,
};

export const VARIANT_SELECTOR_KIND = {
  SIZES: 'sizes',
  OPTIONS: 'options',
};

export const VARIANT_SELECTOR_SECTION_CLASS =
  'flex min-w-0 flex-col gap-3';

export const VARIANT_SELECTOR_PILLS_CLASS =
  'flex min-w-0 flex-wrap items-center gap-2 min-[426px]:gap-3';

export const VARIANT_SELECTOR_PILL_BASE_CLASS =
  'inline-flex h-10 min-w-[72px] cursor-pointer items-center justify-center rounded-lg border px-3 text-sm font-medium leading-5 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-orange min-[426px]:px-4';

export const VARIANT_SELECTOR_PILL_IDLE_CLASS =
  'border-[#e8ebf0] bg-white text-[#3b3f46] hover:border-brand-orange/40';

export const VARIANT_SELECTOR_PILL_ACTIVE_CLASS =
  'border-brand-orange bg-[#fff1eb] text-brand-orange';
