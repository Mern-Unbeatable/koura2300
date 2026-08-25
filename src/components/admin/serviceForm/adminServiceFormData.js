import {
  SERVICES_ALL_FILTER_ID,
  SERVICES_CATEGORY_OPTIONS,
  SERVICES_SUBCATEGORY_OPTIONS,
} from '../services/servicesData';

export const ADMIN_SERVICE_FORM_VIEWPORT = {
  MOBILE_S: 320,
  MOBILE_M: 375,
  MOBILE_L: 425,
  TABLET: 768,
  LAPTOP: 1020,
  DESKTOP: 1440,
};

export const ADMIN_SERVICE_FORM_MODE = {
  CREATE: 'create',
  EDIT: 'edit',
};

export const ADMIN_SERVICE_FORM_FIELDS = {
  CATEGORY_ID: 'categoryId',
  SUBCATEGORY_ID: 'subcategoryId',
  DURATION: 'duration',
  STANDARD_PRICE: 'standardPrice',
  STANDARD_FEATURED: 'standardFeatured',
  PREMIUM_PRICE: 'premiumPrice',
  PREMIUM_FEATURED: 'premiumFeatured',
  TITLE: 'title',
  SHORT_DESCRIPTION: 'shortDescription',
  LONG_DESCRIPTION: 'longDescription',
  INCLUDED: 'included',
  NOT_INCLUDED: 'notIncluded',
  BANNER_IMAGE: 'bannerImage',
  OTHER_IMAGES: 'otherImages',
};

export const ADMIN_SERVICE_FORM_BANNER_MAX_FILES = 1;
export const ADMIN_SERVICE_FORM_BACK_ICON_SIZE = 20;
export const ADMIN_SERVICE_FORM_UPLOAD_ICON_SIZE = 28;
export const ADMIN_SERVICE_FORM_META_ICON_SIZE = 12;
export const ADMIN_SERVICE_FORM_ACCEPT = 'image/jpeg,image/png';

export const ADMIN_SERVICE_FORM_CATEGORY_OPTIONS = SERVICES_CATEGORY_OPTIONS.filter(
  (option) => option.id !== SERVICES_ALL_FILTER_ID,
);

export const ADMIN_SERVICE_FORM_EMPTY_VALUES = {
  [ADMIN_SERVICE_FORM_FIELDS.CATEGORY_ID]: '',
  [ADMIN_SERVICE_FORM_FIELDS.SUBCATEGORY_ID]: '',
  [ADMIN_SERVICE_FORM_FIELDS.DURATION]: '',
  [ADMIN_SERVICE_FORM_FIELDS.STANDARD_PRICE]: '',
  [ADMIN_SERVICE_FORM_FIELDS.STANDARD_FEATURED]: '',
  [ADMIN_SERVICE_FORM_FIELDS.PREMIUM_PRICE]: '',
  [ADMIN_SERVICE_FORM_FIELDS.PREMIUM_FEATURED]: '',
  [ADMIN_SERVICE_FORM_FIELDS.TITLE]: '',
  [ADMIN_SERVICE_FORM_FIELDS.SHORT_DESCRIPTION]: '',
  [ADMIN_SERVICE_FORM_FIELDS.LONG_DESCRIPTION]: '',
  [ADMIN_SERVICE_FORM_FIELDS.INCLUDED]: '',
  [ADMIN_SERVICE_FORM_FIELDS.NOT_INCLUDED]: '',
  [ADMIN_SERVICE_FORM_FIELDS.BANNER_IMAGE]: null,
  [ADMIN_SERVICE_FORM_FIELDS.OTHER_IMAGES]: [],
};

export const ADMIN_SERVICE_FORM_PAGE_CLASS =
  'flex min-w-0 flex-col gap-5 max-[425px]:gap-5 min-[426px]:gap-6 min-[768px]:gap-8';
export const ADMIN_SERVICE_FORM_BACK_LINK_CLASS =
  'inline-flex items-center gap-1 text-sm font-normal text-[#191c1f] transition-colors hover:text-brand-orange focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-orange';
export const ADMIN_SERVICE_FORM_TITLE_CLASS =
  'text-2xl font-medium leading-[1.2] text-[#0a0a0a] min-[376px]:text-[28px] min-[768px]:text-[32px]';
export const ADMIN_SERVICE_FORM_SUBTITLE_CLASS =
  'text-sm leading-5 text-[#555353] min-[426px]:text-base min-[768px]:text-xl min-[768px]:leading-[1.5]';
export const ADMIN_SERVICE_FORM_BODY_CLASS =
  'flex min-w-0 flex-col gap-5 min-[426px]:gap-6';
export const ADMIN_SERVICE_FORM_ROW_CLASS =
  'grid min-w-0 grid-cols-1 gap-5 min-[768px]:grid-cols-2 min-[1440px]:grid-cols-3';
export const ADMIN_SERVICE_FORM_PAIR_CLASS =
  'grid min-w-0 grid-cols-1 gap-5 min-[768px]:grid-cols-2';
export const ADMIN_SERVICE_FORM_FIELD_CLASS = 'flex min-w-0 flex-col gap-2';
export const ADMIN_SERVICE_FORM_LABEL_CLASS =
  'text-sm leading-5 text-[#2d3036] min-[376px]:text-base';
export const ADMIN_SERVICE_FORM_PLACEHOLDER_COLOR = '#b8bec6';
export const ADMIN_SERVICE_FORM_CONTROL_CLASS =
  'h-10 w-full rounded border border-[rgba(0,0,0,0.2)] bg-white px-2.5 text-xs leading-4 text-[#3b3f46] placeholder:text-[#b8bec6] focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-orange min-[768px]:text-sm';
export const ADMIN_SERVICE_FORM_SELECT_CHEVRON_SIZE = 16;
export const ADMIN_SERVICE_FORM_SELECT_WRAP_CLASS = 'relative w-full min-w-0';
export const ADMIN_SERVICE_FORM_SELECT_TRIGGER_CLASS =
  'inline-flex h-10 w-full cursor-pointer items-center justify-between gap-2 rounded border border-[rgba(0,0,0,0.2)] bg-white px-2.5 text-left text-xs leading-4 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-orange min-[768px]:text-sm';
export const ADMIN_SERVICE_FORM_SELECT_TRIGGER_LABEL_CLASS = 'min-w-0 flex-1 truncate';
export const ADMIN_SERVICE_FORM_SELECT_PLACEHOLDER_CLASS = 'text-[#b8bec6]';
export const ADMIN_SERVICE_FORM_SELECT_VALUE_CLASS = 'text-[#191c1f]';
export const ADMIN_SERVICE_FORM_SELECT_ICON_CLASS = 'shrink-0 text-[#697076]';
export const ADMIN_SERVICE_FORM_SELECT_MENU_CLASS =
  'absolute top-[calc(100%+4px)] left-0 z-30 max-h-[220px] w-full overflow-x-hidden overflow-y-auto overscroll-y-contain rounded-md border border-[#e8ebf0] bg-white py-1 shadow-[0px_8px_20px_rgba(15,23,42,0.06)] scrollbar-services-ash';
export const ADMIN_SERVICE_FORM_SELECT_OPTION_CLASS =
  'flex w-full cursor-pointer items-start px-3 py-1.5 text-left text-sm leading-5 text-[#191c1f] whitespace-normal break-words transition-colors hover:bg-[#fff7f3] focus:outline-none focus-visible:bg-[#fff7f3]';
export const ADMIN_SERVICE_FORM_SELECT_OPTION_ACTIVE_CLASS =
  'bg-[#fff1eb] text-[#fc6f32] hover:bg-[#fff1eb] focus-visible:bg-[#fff1eb]';
export const ADMIN_SERVICE_FORM_TEXTAREA_SHORT_CLASS =
  'min-h-[122px] w-full resize-y rounded border border-[rgba(0,0,0,0.2)] bg-white px-4 py-4 text-sm leading-[1.6] text-[#3b3f46] placeholder:text-[#b8bec6] focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-orange';
export const ADMIN_SERVICE_FORM_TEXTAREA_LONG_CLASS =
  'min-h-[210px] w-full resize-y rounded border border-[rgba(0,0,0,0.2)] bg-white px-4 py-4 text-sm leading-[1.6] text-[#3b3f46] placeholder:text-[#b8bec6] focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-orange';
export const ADMIN_SERVICE_FORM_CONTROL_ERROR_CLASS =
  'border-[#f31d2c] focus-visible:ring-[#f31d2c]';
export const ADMIN_SERVICE_FORM_ERROR_TEXT_CLASS = 'text-xs text-[#f31d2c]';
export const ADMIN_SERVICE_FORM_UPLOAD_SECTION_CLASS =
  'flex min-w-0 flex-col gap-2';
export const ADMIN_SERVICE_FORM_UPLOAD_ZONE_CLASS =
  'relative flex min-h-[200px] w-full cursor-pointer flex-col items-center justify-center gap-2 overflow-hidden rounded-xl border-2 border-dashed border-[rgba(0,31,61,0.2)] bg-white px-4 py-8 text-center transition-colors hover:border-brand-orange focus-within:border-brand-orange min-[426px]:min-h-[252px]';
export const ADMIN_SERVICE_FORM_UPLOAD_ICON_WRAP_CLASS =
  'flex size-14 items-center justify-center rounded-full bg-[rgba(0,31,61,0.05)] min-[426px]:size-16';
export const ADMIN_SERVICE_FORM_UPLOAD_TITLE_CLASS =
  'text-base font-bold leading-7 text-[#0f172a] min-[376px]:text-lg';
export const ADMIN_SERVICE_FORM_UPLOAD_HINT_CLASS =
  'text-sm leading-5 text-[#64748b]';
export const ADMIN_SERVICE_FORM_UPLOAD_META_CLASS =
  'mt-1 flex flex-wrap items-center justify-center gap-3 text-sm font-medium leading-4 text-[#94a3b8] min-[768px]:gap-4';
export const ADMIN_SERVICE_FORM_UPLOAD_META_ITEM_CLASS =
  'inline-flex items-center gap-1';
export const ADMIN_SERVICE_FORM_OTHER_PREVIEW_COLUMNS = 5;
export const ADMIN_SERVICE_FORM_PREVIEW_CLASS =
  'mt-3 h-40 w-full overflow-hidden rounded-lg border border-[rgba(0,0,0,0.2)] object-cover';
export const ADMIN_SERVICE_FORM_OTHER_PREVIEW_GRID_CLASS =
  'mt-3 grid min-w-0 grid-cols-5 gap-2 min-[768px]:gap-3';
export const ADMIN_SERVICE_FORM_OTHER_PREVIEW_IMAGE_CLASS =
  'aspect-square w-full min-w-0 overflow-hidden rounded-lg border border-[rgba(0,0,0,0.2)] object-cover';
export const ADMIN_SERVICE_FORM_UPLOAD_ZONE_ACTIVE_CLASS =
  'border-brand-orange bg-[#fff7f3]';
export const ADMIN_SERVICE_FORM_SUBMIT_CLASS =
  'inline-flex h-12 w-full cursor-pointer items-center justify-center rounded-lg bg-[#fc6f32] px-6 text-base font-semibold text-white transition-colors hover:bg-brand-orange-dark focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-orange min-[426px]:w-auto';
export const ADMIN_SERVICE_FORM_NOT_FOUND_CLASS =
  'rounded-2xl border border-[#e8ebf0] bg-white px-6 py-10 text-center';

export const getAdminServiceFormSubcategoryOptions = (categoryId) =>
  SERVICES_SUBCATEGORY_OPTIONS.filter(
    (option) =>
      option.id !== SERVICES_ALL_FILTER_ID &&
      (!categoryId || option.categoryId === categoryId),
  );
