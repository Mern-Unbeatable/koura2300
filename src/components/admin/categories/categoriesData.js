export const CATEGORIES_VIEWPORT = {
  MOBILE_S: 320,
  MOBILE_M: 375,
  MOBILE_L: 425,
  TABLET: 768,
  LAPTOP: 1020,
  DESKTOP: 1440,
};

export const CATEGORIES_NAME_MAX_LENGTH = 48;
export const CATEGORIES_CHIP_ICON_SIZE_PX = 20;
export const CATEGORIES_ADD_ICON_SIZE_PX = 16;
export const CATEGORIES_MODAL_CLOSE_ICON_SIZE_PX = 20;
export const CATEGORIES_DRAG_MIME_TYPE = 'application/x-koura-category-id';

export const CATEGORIES_ADD_KIND = {
  CATEGORY: 'category',
  SUBCATEGORY: 'subcategory',
};

export const CATEGORIES_PAGE_CLASS =
  'flex min-w-0 flex-col gap-5 max-[425px]:gap-5 min-[426px]:gap-6 min-[768px]:gap-8';

export const CATEGORIES_HEADER_CLASS = 'flex flex-col gap-2';

export const CATEGORIES_TITLE_CLASS =
  'text-[28px] font-semibold leading-[1.2] text-[#050609] min-[376px]:text-[32px] min-[768px]:text-[36px]';

export const CATEGORIES_SUBTITLE_CLASS =
  'max-w-3xl text-sm leading-5 text-black min-[426px]:text-sm min-[768px]:text-base min-[768px]:leading-6';

export const CATEGORIES_SECTIONS_CLASS = 'flex flex-col gap-5 min-[768px]:gap-6';

export const CATEGORIES_CARD_CLASS =
  'flex w-full flex-col gap-[18px] rounded-[10px] border border-[#e4e4e4] bg-white px-4 py-3.5 min-[426px]:px-5 min-[768px]:px-6 min-[768px]:py-3.5';

export const CATEGORIES_CARD_HEADER_CLASS =
  'flex flex-col gap-3 min-[426px]:flex-row min-[426px]:items-center min-[426px]:justify-between';

export const CATEGORIES_SECTION_TITLE_CLASS =
  'text-xl font-medium leading-normal text-black min-[768px]:text-2xl';

export const CATEGORIES_ADD_BUTTON_CLASS =
  'inline-flex w-full shrink-0 cursor-pointer items-center justify-center gap-2 rounded-lg bg-[#fc6f32] px-5 py-3 text-xs leading-5 text-white transition-colors hover:bg-brand-orange-dark focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-orange min-[426px]:w-auto';

export const CATEGORIES_DIVIDER_CLASS = 'h-px w-full bg-[#e4e4e4]';

export const CATEGORIES_CHIPS_CLASS =
  'flex flex-wrap gap-3 min-[426px]:gap-[18px] min-[768px]:gap-5';

export const CATEGORIES_CHIP_CLASS =
  'inline-flex cursor-grab items-center gap-2.5 rounded-lg bg-[#fff1eb] px-4 py-2.5 text-base font-medium leading-6 text-[#fc6f32] active:cursor-grabbing min-[376px]:px-5';

export const CATEGORIES_CHIP_SELECTED_CLASS = 'ring-2 ring-[#fc6f32]';

export const CATEGORIES_CHIP_DELETE_CLASS =
  'inline-flex size-5 shrink-0 cursor-pointer items-center justify-center rounded text-[#fc6f32] transition-opacity hover:opacity-80 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-orange';

export const CATEGORIES_EMPTY_CLASS = 'text-sm leading-5 text-[#6b7280]';

export const CATEGORIES_MODAL_OVERLAY_CLASS =
  'fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4 backdrop-blur-sm';

export const CATEGORIES_MODAL_DIALOG_CLASS =
  'w-full max-w-md rounded-xl bg-white p-5 shadow-lg min-[426px]:p-6';

export const CATEGORIES_MODAL_HEADER_CLASS =
  'mb-4 flex items-start justify-between gap-3';

export const CATEGORIES_MODAL_TITLE_CLASS =
  'text-lg font-semibold text-[#0a0a0a] min-[426px]:text-xl';

export const CATEGORIES_MODAL_CLOSE_CLASS =
  'inline-flex size-8 items-center justify-center rounded-md text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-orange';

export const CATEGORIES_MODAL_LABEL_CLASS =
  'mb-1.5 block text-sm font-medium text-[#455163]';

export const CATEGORIES_MODAL_INPUT_CLASS =
  'w-full rounded-lg border border-[#e8ebf0] bg-white px-3 py-2.5 text-sm text-[#0a0a0a] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#ffd4c2]';

export const CATEGORIES_MODAL_INPUT_ERROR_CLASS = 'border-red-400 focus-visible:ring-red-200';

export const CATEGORIES_MODAL_ERROR_CLASS = 'mt-1.5 text-sm text-red-600';

export const CATEGORIES_MODAL_ACTIONS_CLASS =
  'mt-5 flex flex-col-reverse gap-2 min-[426px]:flex-row min-[426px]:justify-end';

export const CATEGORIES_MODAL_CANCEL_CLASS =
  'inline-flex w-full cursor-pointer items-center justify-center rounded-lg border border-[#e8ebf0] bg-white px-4 py-2.5 text-sm font-medium text-[#455163] transition-colors hover:bg-gray-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-orange min-[426px]:w-auto';

export const CATEGORIES_MODAL_SAVE_CLASS =
  'inline-flex w-full cursor-pointer items-center justify-center rounded-lg bg-[#fc6f32] px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-brand-orange-dark focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-orange min-[426px]:w-auto';
