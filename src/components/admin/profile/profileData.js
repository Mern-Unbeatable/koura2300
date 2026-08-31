export const PROFILE_VIEWPORT = {
  MOBILE_S: 320,
  MOBILE_M: 375,
  MOBILE_L: 425,
  TABLET: 768,
  LAPTOP: 1020,
  DESKTOP: 1440,
};

export const PROFILE_EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
export const PROFILE_MIN_PASSWORD_LENGTH = 8;
export const PROFILE_AVATAR_SIZE_PX = 89;
export const PROFILE_AVATAR_ICON_SIZE_PX = 56;
export const PROFILE_CAMERA_BADGE_SIZE_PX = 24;
export const PROFILE_CAMERA_ICON_SIZE_PX = 16;
export const PROFILE_PASSWORD_ICON_SIZE_PX = 24;

/** Admin profile seed values */
export const PROFILE_SEED = {
  displayName: 'Admin',
  displayEmail: 'admin@gmail.com',
  name: 'Admin',
  email: 'admin@gmail.com',
};

export const PROFILE_PAGE_CLASS =
  'flex w-full min-w-0 flex-col gap-6 max-[425px]:gap-5 min-[426px]:gap-6 min-[768px]:gap-8 min-[1020px]:gap-[30px]';

export const PROFILE_HEADER_TITLE_CLASS =
  'text-2xl font-semibold leading-normal text-[#050609] min-[376px]:text-[28px] min-[768px]:text-[32px] min-[1020px]:text-[36px]';

export const PROFILE_HEADER_SUBTITLE_CLASS =
  'text-sm font-normal leading-[1.5] text-[#464646] min-[426px]:text-base';

export const PROFILE_CARD_CLASS =
  'flex w-full min-w-0 flex-col gap-5 overflow-hidden rounded-[20px] border border-[rgba(0,0,0,0.08)] bg-white px-4 py-6 max-[320px]:px-3 max-[320px]:py-5 min-[376px]:px-5 min-[426px]:px-6 min-[426px]:py-8 min-[768px]:px-8 min-[768px]:py-10 min-[1020px]:px-[41px] min-[1020px]:py-[54px]';

/** Figma 313:12181 — 44px stack between identity and account */
export const PROFILE_TOP_STACK_CLASS = 'flex w-full min-w-0 flex-col gap-11';

export const PROFILE_IDENTITY_CLASS =
  'flex w-full min-w-0 flex-col gap-4 min-[426px]:flex-row min-[426px]:items-center min-[426px]:gap-4';

export const PROFILE_AVATAR_WRAP_CLASS =
  'relative flex size-[89px] shrink-0 items-center justify-center rounded-full bg-[#e9eaeb] pb-[13px] pl-[13px] pr-3 pt-3';

export const PROFILE_CAMERA_BADGE_CLASS =
  'absolute bottom-0 right-0 inline-flex size-6 cursor-pointer items-center justify-center rounded-xl bg-white text-[#373737] shadow-sm transition-colors hover:bg-[#f5f6f7] focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-orange';

export const PROFILE_IDENTITY_TEXT_CLASS = 'flex min-w-0 flex-col gap-1';

export const PROFILE_IDENTITY_NAME_CLASS =
  'text-lg font-semibold leading-normal text-[#0c0c0c] min-[426px]:text-xl min-[768px]:text-2xl';

export const PROFILE_IDENTITY_EMAIL_CLASS =
  'text-sm font-normal leading-[1.5] text-[#464646] min-[426px]:text-base';

export const PROFILE_SECTION_CLASS = 'flex w-full min-w-0 flex-col gap-6';

export const PROFILE_SECTION_TITLE_CLASS =
  'text-lg font-medium leading-[1.3] text-[#4c515b] min-[768px]:text-xl';

export const PROFILE_ACCOUNT_FIELDS_CLASS =
  'flex w-full min-w-0 flex-col gap-4 min-[768px]:flex-row min-[768px]:items-start min-[768px]:gap-5';

export const PROFILE_PASSWORD_FIELDS_CLASS =
  'flex w-full min-w-0 flex-col gap-4 min-[1020px]:flex-row min-[1020px]:items-start min-[1020px]:gap-5';

export const PROFILE_FIELD_CLASS = 'flex w-full min-w-0 flex-1 flex-col gap-3';

export const PROFILE_LABEL_CLASS = 'text-sm font-normal leading-[1.5] text-[#464646]';

export const PROFILE_INPUT_CLASS =
  'box-border w-full min-w-0 rounded-lg border border-[rgba(0,0,0,0.08)] bg-white px-4 py-3.5 text-sm font-normal leading-[1.5] text-[#1d1d1d] outline-none placeholder:text-[#989da1] focus:ring-2 focus:ring-[#fc6f32]';

export const PROFILE_PASSWORD_INPUT_CLASS = `${PROFILE_INPUT_CLASS} pr-12`;

export const PROFILE_INPUT_ERROR_CLASS = 'border-[#f31d2c] focus:ring-[#f31d2c]';

export const PROFILE_ERROR_TEXT_CLASS = 'text-xs text-[#f31d2c]';

export const PROFILE_PASSWORD_INPUT_WRAP_CLASS = 'relative w-full min-w-0';

export const PROFILE_PASSWORD_TOGGLE_CLASS =
  'absolute top-1/2 right-3 inline-flex -translate-y-1/2 cursor-pointer items-center justify-center rounded-md p-0.5 text-[#989da1] transition-colors hover:text-[#4c515b] focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-orange';

export const PROFILE_ACTIONS_CLASS = 'flex w-full justify-end';

export const PROFILE_PRIMARY_BUTTON_CLASS =
  'inline-flex cursor-pointer items-center justify-center rounded px-6 py-3 text-base font-normal text-white bg-[#fc6f32] transition-colors hover:bg-brand-orange-dark focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-orange focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 max-[425px]:w-full';
