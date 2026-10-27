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
  ADDITIONAL_FEATURES: 'additionalFeatures',
  SIZES: 'sizes',
  OPTIONS: 'options',
  INCLUDED: 'included',
  NOT_INCLUDED: 'notIncluded',
  BANNER_IMAGE: 'bannerImage',
  OTHER_IMAGES: 'otherImages',
};

export const ADMIN_SERVICE_FORM_FEATURE_KEYS = {
  NAME: 'name',
  MEASUREMENT_UNIT: 'measurementUnit',
  QUANTITY: 'quantity',
  STANDARD_PRICE: 'standardPrice',
  PREMIUM_PRICE: 'premiumPrice',
  NOTE_1: 'note1',
  NOTE_2: 'note2',
};

export const ADMIN_SERVICE_FORM_SIZE_KEYS = {
  SIZE: 'size',
  MEASUREMENT_UNIT: 'measurementUnit',
  STANDARD_PRICE: 'standardPrice',
  PREMIUM_PRICE: 'premiumPrice',
};

export const ADMIN_SERVICE_FORM_MEASUREMENT_UNITS = [
  { id: 'inch', label: 'inch' },
  { id: 'sq', label: 'sq' },
  { id: 'ft', label: 'ft' },
  { id: 'cm', label: 'cm' },
];

export const ADMIN_SERVICE_FORM_OPTION_KEYS = {
  NAME: 'name',
  STANDARD_PRICE: 'standardPrice',
  PREMIUM_PRICE: 'premiumPrice',
};

export const ADMIN_SERVICE_FORM_TEXT_LINE_KEYS = {
  VALUE: 'value',
};

export const createEmptyAdditionalFeatureRow = (id) => ({
  id,
  [ADMIN_SERVICE_FORM_FEATURE_KEYS.NAME]: '',
  [ADMIN_SERVICE_FORM_FEATURE_KEYS.MEASUREMENT_UNIT]: '',
  [ADMIN_SERVICE_FORM_FEATURE_KEYS.QUANTITY]: '',
  [ADMIN_SERVICE_FORM_FEATURE_KEYS.STANDARD_PRICE]: '',
  [ADMIN_SERVICE_FORM_FEATURE_KEYS.PREMIUM_PRICE]: '',
  [ADMIN_SERVICE_FORM_FEATURE_KEYS.NOTE_1]: '',
  [ADMIN_SERVICE_FORM_FEATURE_KEYS.NOTE_2]: '',
});

export const createEmptySizeRow = (id) => ({
  id,
  [ADMIN_SERVICE_FORM_SIZE_KEYS.SIZE]: '',
  [ADMIN_SERVICE_FORM_SIZE_KEYS.MEASUREMENT_UNIT]: '',
  [ADMIN_SERVICE_FORM_SIZE_KEYS.STANDARD_PRICE]: '',
  [ADMIN_SERVICE_FORM_SIZE_KEYS.PREMIUM_PRICE]: '',
});

export const createEmptyOptionRow = (id) => ({
  id,
  [ADMIN_SERVICE_FORM_OPTION_KEYS.NAME]: '',
  [ADMIN_SERVICE_FORM_OPTION_KEYS.STANDARD_PRICE]: '',
  [ADMIN_SERVICE_FORM_OPTION_KEYS.PREMIUM_PRICE]: '',
});

export const createEmptyTextLineRow = (id) => ({
  id,
  [ADMIN_SERVICE_FORM_TEXT_LINE_KEYS.VALUE]: '',
});

export const ADMIN_SERVICE_FORM_INITIAL_FEATURE_ROW_ID = 'feature-row-1';
export const ADMIN_SERVICE_FORM_INITIAL_SIZE_ROW_ID = 'size-row-1';
export const ADMIN_SERVICE_FORM_INITIAL_OPTION_ROW_ID = 'option-row-1';
export const ADMIN_SERVICE_FORM_INITIAL_STANDARD_FEATURED_ID = 'standard-featured-1';
export const ADMIN_SERVICE_FORM_INITIAL_PREMIUM_FEATURED_ID = 'premium-featured-1';
export const ADMIN_SERVICE_FORM_INITIAL_INCLUDED_ID = 'included-1';
export const ADMIN_SERVICE_FORM_INITIAL_NOT_INCLUDED_ID = 'not-included-1';

export const ADMIN_SERVICE_FORM_BANNER_MAX_FILES = 1;
export const ADMIN_SERVICE_FORM_BACK_ICON_SIZE = 20;
export const ADMIN_SERVICE_FORM_PREVIEW_REMOVE_ICON_SIZE = 14;
export const ADMIN_SERVICE_FORM_UPLOAD_ICON_WIDTH = 27.5;
export const ADMIN_SERVICE_FORM_UPLOAD_ICON_HEIGHT = 20;
export const ADMIN_SERVICE_FORM_UPLOAD_ICON_COLOR = '#001F3D';
export const ADMIN_SERVICE_FORM_META_ICON_SIZE = 11.67;
export const ADMIN_SERVICE_FORM_META_ICON_COLOR = '#94A3B8';
export const ADMIN_SERVICE_FORM_ACCEPT = 'image/jpeg,image/png';

export const ADMIN_SERVICE_FORM_CATEGORY_OPTIONS = SERVICES_CATEGORY_OPTIONS.filter(
  (option) => option.id !== SERVICES_ALL_FILTER_ID,
);

export const ADMIN_SERVICE_FORM_EMPTY_VALUES = {
  [ADMIN_SERVICE_FORM_FIELDS.CATEGORY_ID]: '',
  [ADMIN_SERVICE_FORM_FIELDS.SUBCATEGORY_ID]: '',
  [ADMIN_SERVICE_FORM_FIELDS.DURATION]: '',
  [ADMIN_SERVICE_FORM_FIELDS.STANDARD_PRICE]: '',
  [ADMIN_SERVICE_FORM_FIELDS.STANDARD_FEATURED]: [
    createEmptyTextLineRow(ADMIN_SERVICE_FORM_INITIAL_STANDARD_FEATURED_ID),
  ],
  [ADMIN_SERVICE_FORM_FIELDS.PREMIUM_PRICE]: '',
  [ADMIN_SERVICE_FORM_FIELDS.PREMIUM_FEATURED]: [
    createEmptyTextLineRow(ADMIN_SERVICE_FORM_INITIAL_PREMIUM_FEATURED_ID),
  ],
  [ADMIN_SERVICE_FORM_FIELDS.TITLE]: '',
  [ADMIN_SERVICE_FORM_FIELDS.SHORT_DESCRIPTION]: '',
  [ADMIN_SERVICE_FORM_FIELDS.LONG_DESCRIPTION]: '',
  [ADMIN_SERVICE_FORM_FIELDS.ADDITIONAL_FEATURES]: [
    createEmptyAdditionalFeatureRow(ADMIN_SERVICE_FORM_INITIAL_FEATURE_ROW_ID),
  ],
  [ADMIN_SERVICE_FORM_FIELDS.SIZES]: [
    createEmptySizeRow(ADMIN_SERVICE_FORM_INITIAL_SIZE_ROW_ID),
  ],
  [ADMIN_SERVICE_FORM_FIELDS.OPTIONS]: [
    createEmptyOptionRow(ADMIN_SERVICE_FORM_INITIAL_OPTION_ROW_ID),
  ],
  [ADMIN_SERVICE_FORM_FIELDS.INCLUDED]: [
    createEmptyTextLineRow(ADMIN_SERVICE_FORM_INITIAL_INCLUDED_ID),
  ],
  [ADMIN_SERVICE_FORM_FIELDS.NOT_INCLUDED]: [
    createEmptyTextLineRow(ADMIN_SERVICE_FORM_INITIAL_NOT_INCLUDED_ID),
  ],
  [ADMIN_SERVICE_FORM_FIELDS.BANNER_IMAGE]: null,
  [ADMIN_SERVICE_FORM_FIELDS.OTHER_IMAGES]: [],
};

export const createEmptyAdminServiceFormValues = () => ({
  ...ADMIN_SERVICE_FORM_EMPTY_VALUES,
  [ADMIN_SERVICE_FORM_FIELDS.STANDARD_FEATURED]: [
    createEmptyTextLineRow(ADMIN_SERVICE_FORM_INITIAL_STANDARD_FEATURED_ID),
  ],
  [ADMIN_SERVICE_FORM_FIELDS.PREMIUM_FEATURED]: [
    createEmptyTextLineRow(ADMIN_SERVICE_FORM_INITIAL_PREMIUM_FEATURED_ID),
  ],
  [ADMIN_SERVICE_FORM_FIELDS.ADDITIONAL_FEATURES]: [
    createEmptyAdditionalFeatureRow(ADMIN_SERVICE_FORM_INITIAL_FEATURE_ROW_ID),
  ],
  [ADMIN_SERVICE_FORM_FIELDS.SIZES]: [
    createEmptySizeRow(ADMIN_SERVICE_FORM_INITIAL_SIZE_ROW_ID),
  ],
  [ADMIN_SERVICE_FORM_FIELDS.OPTIONS]: [
    createEmptyOptionRow(ADMIN_SERVICE_FORM_INITIAL_OPTION_ROW_ID),
  ],
  [ADMIN_SERVICE_FORM_FIELDS.INCLUDED]: [
    createEmptyTextLineRow(ADMIN_SERVICE_FORM_INITIAL_INCLUDED_ID),
  ],
  [ADMIN_SERVICE_FORM_FIELDS.NOT_INCLUDED]: [
    createEmptyTextLineRow(ADMIN_SERVICE_FORM_INITIAL_NOT_INCLUDED_ID),
  ],
  [ADMIN_SERVICE_FORM_FIELDS.OTHER_IMAGES]: [],
});

export const ADMIN_SERVICE_FORM_ROW_ID_PREFIX = {
  FEATURE: 'feature-row',
  SIZE: 'size-row',
  OPTION: 'option-row',
  STANDARD_FEATURED: 'standard-featured',
  PREMIUM_FEATURED: 'premium-featured',
  INCLUDED: 'included',
  NOT_INCLUDED: 'not-included',
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
export const ADMIN_SERVICE_FORM_DYNAMIC_SECTION_CLASS =
  'flex min-w-0 flex-col gap-[18px]';
export const ADMIN_SERVICE_FORM_DYNAMIC_SECTION_TITLE_CLASS =
  'text-base font-medium leading-[1.2] text-[#0a0a0a]';
export const ADMIN_SERVICE_FORM_DYNAMIC_ROWS_CLASS =
  'flex min-w-0 flex-col gap-2';
export const ADMIN_SERVICE_FORM_FEATURE_ROW_CLASS =
  'grid min-w-0 grid-cols-1 gap-4 min-[768px]:grid-cols-2 min-[1020px]:grid-cols-3 min-[1440px]:grid-cols-[minmax(0,200px)_minmax(0,160px)_minmax(0,100px)_minmax(0,130px)_minmax(0,130px)_minmax(0,1fr)_minmax(0,1fr)] min-[1440px]:gap-5';
export const ADMIN_SERVICE_FORM_SIZE_OPTION_ROW_CLASS =
  'grid min-w-0 grid-cols-1 gap-4 min-[768px]:grid-cols-2 min-[1020px]:grid-cols-4 min-[1020px]:gap-5';
export const ADMIN_SERVICE_FORM_ADD_ROW_BUTTON_CLASS =
  'inline-flex w-fit cursor-pointer items-center text-base font-normal leading-[1.2] text-[#fc6f32] transition-colors hover:text-brand-orange-dark focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-orange';
export const ADMIN_SERVICE_FORM_REMOVE_ROW_BUTTON_CLASS =
  'inline-flex w-fit cursor-pointer items-center text-base font-normal leading-[1.2] text-[#697076] transition-colors hover:text-[#dc2626] focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-orange';
export const ADMIN_SERVICE_FORM_TEXT_LINE_ACTIONS_CLASS =
  'flex min-w-0 flex-wrap items-center gap-x-4 gap-y-1';
export const ADMIN_SERVICE_FORM_TEXT_LINES_CLASS = 'flex min-w-0 flex-col gap-2';
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
  'relative flex min-h-[200px] w-full cursor-pointer flex-col items-center justify-center overflow-hidden rounded-xl border-2 border-dashed border-[rgba(0,31,61,0.2)] bg-white px-6 py-10 text-center transition-colors hover:border-brand-orange focus-within:border-brand-orange min-[426px]:min-h-[252px]';
export const ADMIN_SERVICE_FORM_UPLOAD_ICON_WRAP_CLASS =
  'mb-4 flex size-14 shrink-0 items-center justify-center rounded-full bg-[rgba(0,31,61,0.05)] min-[426px]:size-16';
export const ADMIN_SERVICE_FORM_UPLOAD_ICON_CLASS = 'block shrink-0';
export const ADMIN_SERVICE_FORM_UPLOAD_TITLE_CLASS =
  'text-base font-bold leading-7 text-[#0f172a] min-[376px]:text-lg';
export const ADMIN_SERVICE_FORM_UPLOAD_HINT_CLASS =
  'mt-1 text-sm leading-5 text-[#64748b]';
export const ADMIN_SERVICE_FORM_UPLOAD_META_CLASS =
  'mt-2 flex flex-wrap items-center justify-center gap-3 text-sm font-medium leading-4 text-[#94a3b8] min-[768px]:gap-4';
export const ADMIN_SERVICE_FORM_UPLOAD_META_ITEM_CLASS =
  'inline-flex items-center gap-1';
export const ADMIN_SERVICE_FORM_UPLOAD_META_ICON_CLASS = 'block shrink-0';
export const ADMIN_SERVICE_FORM_OTHER_PREVIEW_COLUMNS = 5;
export const ADMIN_SERVICE_FORM_BANNER_PREVIEW_WIDTH_PX = 367;
export const ADMIN_SERVICE_FORM_BANNER_PREVIEW_HEIGHT_PX = 208;
export const ADMIN_SERVICE_FORM_PREVIEW_CLASS =
  'h-40 w-full overflow-hidden rounded-lg border border-[rgba(0,0,0,0.2)] object-cover';
export const ADMIN_SERVICE_FORM_BANNER_PREVIEW_CLASS =
  'mx-auto block h-52 w-full max-w-[367px] overflow-hidden rounded-2xl border border-gray-200 object-cover shadow-sm';
export const ADMIN_SERVICE_FORM_BANNER_PREVIEW_WRAP_CLASS =
  'relative mx-auto w-full max-w-[367px]';
export const ADMIN_SERVICE_FORM_OTHER_PREVIEW_GRID_CLASS =
  'mt-3 grid min-w-0 grid-cols-5 gap-2 min-[768px]:gap-3';
export const ADMIN_SERVICE_FORM_OTHER_PREVIEW_ITEM_CLASS = 'relative min-w-0';
export const ADMIN_SERVICE_FORM_OTHER_PREVIEW_IMAGE_CLASS =
  'aspect-square w-full min-w-0 overflow-hidden rounded-lg border border-[rgba(0,0,0,0.2)] object-cover';
export const ADMIN_SERVICE_FORM_PREVIEW_REMOVE_BUTTON_CLASS =
  'absolute right-1.5 top-1.5 z-10 inline-flex size-7 cursor-pointer items-center justify-center rounded-full bg-[#0f172b]/90 text-white shadow-sm transition-colors hover:bg-[#0f172b] focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-orange';
export const ADMIN_SERVICE_FORM_STACK_PREVIEW_LIST_CLASS = 'mt-3 flex flex-col gap-3';
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
