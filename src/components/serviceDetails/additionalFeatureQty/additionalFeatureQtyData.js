export const ADDITIONAL_FEATURE_QTY_VIEWPORT = {
  MOBILE_S: 320,
  MOBILE_M: 375,
  MOBILE_L: 425,
  TABLET: 768,
  LAPTOP: 1020,
  DESKTOP: 1440,
};

export const ADDITIONAL_FEATURE_QTY_DEFAULT_INCLUDED = 1;
export const ADDITIONAL_FEATURE_QTY_MIN = 1;
export const ADDITIONAL_FEATURE_QTY_STEP = 1;
export const ADDITIONAL_FEATURE_QTY_PAD_LENGTH = 2;

export const ADDITIONAL_FEATURE_QTY_ASSET_PATH =
  '/assets/serviceDetails/additionalFeatureQty';

export const ADDITIONAL_FEATURE_QTY_ASSETS = {
  minus: `${ADDITIONAL_FEATURE_QTY_ASSET_PATH}/minus.svg`,
  plus: `${ADDITIONAL_FEATURE_QTY_ASSET_PATH}/plus.svg`,
  noteCheck: `${ADDITIONAL_FEATURE_QTY_ASSET_PATH}/note-check.svg`,
};

/** Figma 750:2043 — 758×86 row: control left, notes right, space-between. */
export const ADDITIONAL_FEATURE_QTY_SECTION_CLASS =
  'flex min-w-0 flex-col gap-3 min-[768px]:h-[86px] min-[768px]:flex-row min-[768px]:items-stretch min-[768px]:justify-between min-[768px]:gap-6';

/** Figma 750:2118 — 164×86: label top, stepper bottom. */
export const ADDITIONAL_FEATURE_QTY_CONTROL_CLASS =
  'flex w-[164px] shrink-0 flex-col items-start justify-between gap-[11px] min-[768px]:h-full min-[768px]:gap-0';

export const ADDITIONAL_FEATURE_QTY_UNIT_LABEL_CLASS =
  'text-base font-medium leading-[19px] text-[#0b1e3d] whitespace-nowrap';

/** Figma 750:2044 — 164×56, border #E4E7E9 2px, radius 3px, px-20 py-16. */
export const ADDITIONAL_FEATURE_QTY_STEPPER_CLASS =
  'inline-flex h-14 w-full shrink-0 items-center justify-between rounded-[3px] border-2 border-solid border-[#e4e7e9] bg-white px-5 py-4';

export const ADDITIONAL_FEATURE_QTY_STEP_BUTTON_CLASS =
  'inline-flex size-4 shrink-0 cursor-pointer items-center justify-center p-0 text-[#191c1f] transition-opacity hover:opacity-70 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-orange disabled:cursor-not-allowed disabled:opacity-40';

export const ADDITIONAL_FEATURE_QTY_STEP_ICON_CLASS = 'block size-4';

/** Figma Body/Medium/400 — Public Sans 16 / 24, #475156. */
export const ADDITIONAL_FEATURE_QTY_VALUE_CLASS =
  'min-w-[17px] text-center text-base font-normal leading-6 text-[#475156]';

/** Figma 750:2048 — #F8F8F8, radius 12, padding 16, gap 10; stretch to row height on desktop. */
export const ADDITIONAL_FEATURE_QTY_NOTES_CLASS =
  'flex min-w-0 flex-col items-start justify-center gap-2.5 rounded-xl bg-[#f8f8f8] p-4 min-[768px]:h-full min-[768px]:min-w-[280px] min-[768px]:max-w-[410px] min-[768px]:flex-1';

export const ADDITIONAL_FEATURE_QTY_NOTE_CLASS =
  'flex w-full min-w-0 items-center gap-2.5 text-base font-normal leading-[19px] text-[#0b1e3d]';

export const ADDITIONAL_FEATURE_QTY_NOTE_ICON_CLASS = 'block size-[22px] shrink-0';
