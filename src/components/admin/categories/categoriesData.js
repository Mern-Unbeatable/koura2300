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
export const CATEGORIES_MODAL_MAX_WIDTH_PX = 400;
export const CATEGORIES_MODAL_SELECT_CHEVRON_SIZE_PX = 24;
export const CATEGORIES_MODAL_INPUT_HEIGHT_PX = 40;
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
  'animate-fade-in fixed inset-0 z-[100] flex items-center justify-center bg-[rgba(0,0,0,0.7)] backdrop-blur-[17.4px] p-3 min-[376px]:p-4';

export const CATEGORIES_MODAL_DIALOG_CLASS =
  'animate-page-enter flex w-full max-w-[400px] flex-col rounded-[12px] bg-white p-5 shadow-[0px_75px_88.5px_0px_rgba(14,20,35,0.25)]';

export const CATEGORIES_MODAL_FORM_CLASS = 'flex flex-col gap-4';

export const CATEGORIES_MODAL_FIELD_CLASS = 'flex flex-col gap-2.5';

export const CATEGORIES_MODAL_LABEL_CLASS =
  'text-base font-medium leading-6 text-[#323232]';

export const CATEGORIES_MODAL_INPUT_CLASS =
  'h-10 w-full rounded-lg bg-[#f4f4f4] px-2 py-2.5 text-sm leading-[22px] text-[#454545] placeholder:text-[#454545] focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-orange';

export const CATEGORIES_MODAL_INPUT_ERROR_CLASS =
  'ring-2 ring-[#f31d2c] focus-visible:ring-[#f31d2c]';

export const CATEGORIES_MODAL_ERROR_CLASS = 'text-xs leading-5 text-[#f31d2c]';

export const CATEGORIES_MODAL_SELECT_WRAP_CLASS = 'relative w-full';

export const CATEGORIES_MODAL_SELECT_TRIGGER_CLASS =
  'inline-flex h-10 w-full cursor-pointer items-center justify-between rounded-lg bg-[#f4f4f4] px-2 py-2.5 text-left text-sm leading-[22px] focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-orange';

export const CATEGORIES_MODAL_SELECT_PLACEHOLDER_CLASS = 'text-[#454545]';

export const CATEGORIES_MODAL_SELECT_VALUE_CLASS = 'text-[#454545]';

export const CATEGORIES_MODAL_SELECT_MENU_CLASS =
  'absolute top-[calc(100%+4px)] left-0 z-30 max-h-[220px] w-full overflow-x-hidden overflow-y-auto overscroll-y-contain rounded-lg border border-[#e8ebf0] bg-white py-1 shadow-[0px_8px_20px_rgba(15,23,42,0.06)] scrollbar-services-ash';

export const CATEGORIES_MODAL_SELECT_OPTION_CLASS =
  'flex w-full cursor-pointer items-start px-3 py-2 text-left text-sm leading-[22px] text-[#454545] transition-colors hover:bg-[#fff7f3] focus:outline-none focus-visible:bg-[#fff7f3]';

export const CATEGORIES_MODAL_SELECT_OPTION_ACTIVE_CLASS =
  'bg-[#fff1eb] text-[#fc6f32] hover:bg-[#fff1eb] focus-visible:bg-[#fff1eb]';

export const CATEGORIES_MODAL_SAVE_CLASS =
  'inline-flex w-full cursor-pointer items-center justify-center rounded-lg bg-[#fc6f32] px-5 py-2.5 text-xs leading-5 text-white transition-colors hover:bg-brand-orange-dark focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-orange';
