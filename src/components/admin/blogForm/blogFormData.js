export const ADMIN_BLOG_FORM_VIEWPORT = {
  MOBILE_S: 320,
  MOBILE_M: 375,
  MOBILE_L: 425,
  TABLET: 768,
  LAPTOP: 1020,
  DESKTOP: 1440,
};

export const ADMIN_BLOG_FORM_FIELDS = {
  TITLE: 'title',
  SHORT_DESCRIPTION: 'shortDescription',
  LONG_DESCRIPTION: 'longDescription',
  BANNER_IMAGE: 'bannerImage',
};

export const ADMIN_BLOG_FORM_MODE = {
  CREATE: 'create',
  EDIT: 'edit',
};

export const ADMIN_BLOG_FORM_BANNER_MAX_FILES = 1;
export const ADMIN_BLOG_FORM_BACK_ICON_SIZE = 24;
export const ADMIN_BLOG_FORM_ACCEPT = 'image/jpeg,image/png';

export const ADMIN_BLOG_FORM_EMPTY_VALUES = {
  [ADMIN_BLOG_FORM_FIELDS.TITLE]: '',
  [ADMIN_BLOG_FORM_FIELDS.SHORT_DESCRIPTION]: '',
  [ADMIN_BLOG_FORM_FIELDS.LONG_DESCRIPTION]: '',
  [ADMIN_BLOG_FORM_FIELDS.BANNER_IMAGE]: null,
};

export const ADMIN_BLOG_FORM_PAGE_CLASS =
  'flex min-w-0 flex-col gap-5 max-[425px]:gap-5 min-[426px]:gap-6 min-[768px]:gap-8 min-[1020px]:gap-8';

export const ADMIN_BLOG_FORM_BACK_LINK_CLASS =
  'inline-flex items-center gap-1 text-sm font-normal text-[#191c1f] transition-colors hover:text-brand-orange focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-orange';

export const ADMIN_BLOG_FORM_TITLE_CLASS =
  'text-2xl font-medium leading-[1.2] text-[#0a0a0a] min-[376px]:text-[28px] min-[768px]:text-[32px]';

export const ADMIN_BLOG_FORM_SUBTITLE_CLASS =
  'text-sm leading-5 text-[#555353] min-[426px]:text-base min-[768px]:text-xl min-[768px]:leading-[1.5]';

export const ADMIN_BLOG_FORM_BODY_CLASS =
  'flex min-w-0 flex-col gap-5 min-[426px]:gap-6 min-[1020px]:gap-[23px]';

export const ADMIN_BLOG_FORM_FIELD_CLASS = 'flex min-w-0 flex-col gap-2';

export const ADMIN_BLOG_FORM_LABEL_CLASS =
  'text-sm leading-5 text-[#2d3036] min-[376px]:text-base';

export const ADMIN_BLOG_FORM_CONTROL_CLASS =
  'h-10 w-full rounded border border-[rgba(0,0,0,0.2)] bg-white px-2.5 text-sm leading-4 text-[#3b3f46] placeholder:text-[#b8bec6] focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-orange';

export const ADMIN_BLOG_FORM_TEXTAREA_SHORT_CLASS =
  'min-h-[122px] w-full resize-y rounded border border-[rgba(0,0,0,0.2)] bg-white px-4 py-4 text-sm leading-[1.6] text-[#3b3f46] placeholder:text-[#b8bec6] focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-orange';

export const ADMIN_BLOG_FORM_TEXTAREA_LONG_CLASS =
  'min-h-[210px] w-full resize-y rounded border border-[rgba(0,0,0,0.2)] bg-white px-4 py-4 text-sm leading-[1.6] text-[#3b3f46] placeholder:text-[#b8bec6] focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-orange';

export const ADMIN_BLOG_FORM_CONTROL_ERROR_CLASS =
  'border-[#f31d2c] focus-visible:ring-[#f31d2c]';

export const ADMIN_BLOG_FORM_ERROR_TEXT_CLASS = 'text-xs text-[#f31d2c]';

export const ADMIN_BLOG_FORM_SUBMIT_CLASS =
  'inline-flex h-12 w-full cursor-pointer items-center justify-center rounded-lg bg-[#fc6f32] px-6 text-base font-semibold text-white transition-colors hover:bg-brand-orange-dark focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-orange disabled:pointer-events-none disabled:cursor-not-allowed disabled:bg-[#f7c3ad] disabled:hover:bg-[#f7c3ad] min-[426px]:w-auto';

export const ADMIN_BLOG_FORM_NOT_FOUND_CLASS =
  'rounded-2xl border border-[#e8ebf0] bg-white px-6 py-10 text-center';
