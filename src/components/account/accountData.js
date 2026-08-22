import { LANDING_ASSET_PATH } from '../home/landingData';

export const ACCOUNT_ASSET_PATH = '/assets/account';

export const ACCOUNT_CARD_MIN_HEIGHT_PX = 440;
export const ACCOUNT_SECTION_HEADER_HEIGHT_PX = 52;
export const ACCOUNT_INPUT_HEIGHT_PX = 44;
export const ACCOUNT_AVATAR_SIZE_PX = 176;
export const ACCOUNT_CAMERA_BUTTON_SIZE_PX = 40;
export const ACCOUNT_MIN_PASSWORD_LENGTH = 8;
export const ACCOUNT_PASSWORD_TOGGLE_ICON_SIZE = 20;

export const ACCOUNT_PAGE_CLASS =
  'min-h-screen overflow-x-clip bg-white font-inter text-brand-ink';
export const ACCOUNT_MAIN_CLASS =
  'animate-page-enter mx-auto max-w-screen-2xl px-4 pb-24 pt-8 sm:px-6 sm:pt-10 lg:px-8 lg:pb-28';
export const ACCOUNT_GRID_CLASS = 'grid gap-6 xl:grid-cols-2';
export const ACCOUNT_CARD_CLASS =
  'flex min-h-[440px] flex-col overflow-hidden rounded border border-[#e4e7e9] bg-white';
export const ACCOUNT_SECTION_HEADER_CLASS =
  'flex h-[52px] shrink-0 items-center border-b border-[#e4e7e9] bg-white px-6';
export const ACCOUNT_SECTION_TITLE_CLASS =
  'text-sm font-medium uppercase leading-5 tracking-normal text-[#191c1f]';
export const ACCOUNT_CARD_BODY_CLASS = 'flex flex-1 flex-col p-6';
export const ACCOUNT_SETTING_LAYOUT_CLASS =
  'flex flex-col gap-7 lg:flex-row lg:items-start lg:gap-10';
export const ACCOUNT_FORM_STACK_CLASS = 'flex flex-1 flex-col gap-7';
export const ACCOUNT_FORM_FIELDS_CLASS = 'flex flex-col gap-4';
export const ACCOUNT_FORM_ROW_CLASS = 'grid gap-4 sm:grid-cols-2';
export const ACCOUNT_FIELD_CLASS = 'flex flex-col gap-2';
export const ACCOUNT_LABEL_CLASS = 'text-sm leading-[22px] text-[#191c1f]';
export const ACCOUNT_INPUT_CLASS =
  'h-[44px] w-full rounded-[2px] border border-[#e4e7e9] bg-white px-[15px] text-sm leading-5 text-[#475156] placeholder:text-[#77878f] focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-orange';
export const ACCOUNT_PRIMARY_BUTTON_CLASS =
  'inline-flex h-12 cursor-pointer items-center justify-center rounded-[2px] bg-brand-orange px-6 text-sm font-bold uppercase tracking-[0.168px] text-white transition-colors hover:bg-brand-orange-dark focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-orange disabled:cursor-not-allowed disabled:opacity-50';
export const ACCOUNT_AVATAR_WRAP_CLASS = 'relative mx-auto shrink-0 lg:mx-0';
export const ACCOUNT_AVATAR_IMAGE_CLASS =
  'size-[176px] rounded-full object-cover';
export const ACCOUNT_CAMERA_BUTTON_CLASS =
  'absolute bottom-0 right-0 flex size-10 cursor-pointer items-center justify-center rounded-full border border-white bg-[#d9d9d9] text-[#191c1f] transition-colors hover:bg-[#cfcfcf] focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-orange';
export const ACCOUNT_PASSWORD_FIELD_WRAP_CLASS = 'relative';
export const ACCOUNT_PASSWORD_TOGGLE_CLASS =
  'absolute top-1/2 right-[15px] -translate-y-1/2 cursor-pointer text-[#77878f] transition-colors hover:text-[#475156] focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-orange';

export const ACCOUNT_PROFILE_FIELDS = {
  FIRST_NAME: 'firstName',
  LAST_NAME: 'lastName',
  EMAIL: 'email',
  PHONE: 'phone',
  ADDRESS: 'address',
};

export const ACCOUNT_PASSWORD_FIELDS = {
  CURRENT: 'currentPassword',
  NEW: 'newPassword',
  CONFIRM: 'confirmPassword',
};

export const ACCOUNT_DEFAULT_PROFILE = {
  firstName: 'Kevin',
  lastName: 'Display name',
  email: 'customer@gmail.com',
  phone: '+1-202-555-0118',
  address: 'Road No. 13/x, House no. 1320/C, Flat No. 5D',
  avatarUrl: `${LANDING_ASSET_PATH}/article-plumbing.png`,
  avatarAlt: 'Kevin profile photo',
};
