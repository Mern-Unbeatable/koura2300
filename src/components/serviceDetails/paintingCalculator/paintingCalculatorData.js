export const PAINTING_CATALOG_TITLE = 'Walls & Ceilings';
export const PAINTING_CATEGORY_NAME = 'Painting';

/** Matches Figma starting estimate with 14 × 12 × 8 ft sample room. */
export const PAINTING_CALCULATOR_DEFAULT_ESTIMATE = 145;
export const PAINTING_CALCULATOR_BASE_FEE = 41;
export const PAINTING_CALCULATOR_PRICE_PER_SQ_FT = 0.25;
export const PAINTING_CALCULATOR_DEFAULT_LENGTH_FT = '14';
export const PAINTING_CALCULATOR_DEFAULT_WIDTH_FT = '12';
export const PAINTING_CALCULATOR_DEFAULT_HEIGHT_FT = '8';
export const PAINTING_CALCULATOR_HEADER_ICON_SIZE_PX = 20;
export const PAINTING_CALCULATOR_ACTION_ICON_SIZE_PX = 18;

export const PAINTING_CALCULATOR_CARD_CLASS =
  'flex w-full min-w-0 flex-col gap-2.5 rounded-lg border border-[#fd9f76] bg-white p-3 min-[376px]:p-4';

export const PAINTING_CALCULATOR_HEADER_CLASS =
  'flex w-full min-w-0 flex-col gap-3 min-[768px]:flex-row min-[768px]:items-start min-[768px]:justify-between';

export const PAINTING_CALCULATOR_TITLE_ROW_CLASS =
  'flex min-w-0 items-start gap-3 min-[426px]:gap-4';

export const PAINTING_CALCULATOR_ICON_WRAP_CLASS =
  'inline-flex size-10 shrink-0 items-center justify-center rounded-lg bg-[#ff6600] text-white min-[426px]:size-12';

export const PAINTING_CALCULATOR_TITLE_CLASS =
  'text-lg font-bold leading-[1.5] text-[#1e293b] min-[426px]:text-xl';

export const PAINTING_CALCULATOR_SUBTITLE_CLASS =
  'text-sm font-normal leading-5 text-[#64748b]';

export const PAINTING_CALCULATOR_ESTIMATE_WRAP_CLASS =
  'flex shrink-0 flex-col items-start gap-1 min-[768px]:items-end';

export const PAINTING_CALCULATOR_ESTIMATE_LABEL_CLASS =
  'text-xs font-bold uppercase tracking-[1.2px] text-[#565e74]';

export const PAINTING_CALCULATOR_ESTIMATE_VALUE_CLASS =
  'text-[32px] font-bold leading-[40px] text-[#ff6600] min-[426px]:text-[40px] min-[426px]:leading-[48px]';

/** Grid keeps all three fields on one laptop row; flex-row + gap-6 was wrapping Ceiling Height. */
export const PAINTING_CALCULATOR_INPUTS_PANEL_CLASS =
  'grid w-full min-w-0 grid-cols-1 gap-4 rounded-2xl border border-[#f1f5f9] bg-[#f8fafc] p-3 min-[768px]:grid-cols-3 min-[768px]:gap-2.5 min-[768px]:p-3 min-[1280px]:gap-6 min-[1280px]:p-[17px]';

export const PAINTING_CALCULATOR_FIELD_CLASS = 'flex min-w-0 flex-col';

export const PAINTING_CALCULATOR_LABEL_CLASS =
  'text-sm font-semibold leading-5 text-[#475569] min-[768px]:text-[13px] min-[768px]:leading-4 min-[1280px]:text-sm min-[1280px]:leading-5';

export const PAINTING_CALCULATOR_INPUT_WRAP_CLASS =
  'relative mt-2 flex w-full min-w-0 items-center';

export const PAINTING_CALCULATOR_INPUT_CLASS =
  'box-border h-12 w-full min-w-0 rounded-lg border border-[#e2e8f0] bg-white py-3.5 pl-3 pr-8 text-base font-bold text-[#334155] outline-none placeholder:text-[#94a3b8] focus:ring-2 focus:ring-[#ff6600] min-[1280px]:pl-4 min-[1280px]:pr-10';

export const PAINTING_CALCULATOR_INPUT_ERROR_CLASS =
  'border-[#f31d2c] focus:ring-[#f31d2c]';

export const PAINTING_CALCULATOR_UNIT_CLASS =
  'pointer-events-none absolute top-1/2 right-2.5 -translate-y-1/2 text-sm font-medium leading-5 text-[#94a3b8] min-[1280px]:right-4';

export const PAINTING_CALCULATOR_ERROR_CLASS = 'mt-1.5 text-xs text-[#f31d2c]';

export const PAINTING_CALCULATOR_ACTIONS_CLASS =
  'flex w-full min-w-0 flex-col gap-3 min-[426px]:flex-row min-[426px]:items-center min-[426px]:gap-4';

export const PAINTING_CALCULATOR_PRIMARY_BUTTON_CLASS =
  'inline-flex cursor-pointer items-center justify-center gap-2 rounded-xl bg-[#ff6600] px-6 py-3.5 text-base font-bold text-white transition-colors hover:bg-[#e65c00] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#ff6600] focus-visible:ring-offset-2 max-[425px]:w-full min-[426px]:px-10';

export const PAINTING_CALCULATOR_SECONDARY_BUTTON_CLASS =
  'inline-flex cursor-pointer items-center justify-center gap-2 rounded-xl border border-[#e3bfb1] bg-white px-6 py-3.5 text-base font-bold text-[#191c1e] transition-colors hover:bg-[#f7f9fb] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#ff6600] focus-visible:ring-offset-2 max-[425px]:w-full min-[426px]:px-10';
