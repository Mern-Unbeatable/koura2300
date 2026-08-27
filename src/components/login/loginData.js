import { BarChart3, Settings, Users } from 'lucide-react';
import { LANDING_ASSET_PATH } from '../home/landingData';

export const LOGIN_ASSET_PATH = LANDING_ASSET_PATH;

export const LOGIN_PAGE_CLASS = 'min-h-screen overflow-x-clip bg-[#f9fafb] font-inter text-brand-ink';
export const LOGIN_MAIN_CLASS =
  'mx-auto flex min-h-[calc(100dvh-12rem)] max-w-screen-2xl items-center justify-center px-4 py-10 sm:px-6 lg:px-8 lg:py-14';
export const LOGIN_SHELL_CLASS =
  'grid w-full max-w-5xl overflow-hidden rounded-2xl border border-[#ececec] bg-white shadow-sm lg:grid-cols-[minmax(0,1.05fr)_minmax(0,1fr)]';
export const LOGIN_HERO_CLASS =
  'relative hidden flex-col justify-between overflow-hidden bg-brand-navy p-8 text-white lg:flex xl:p-10';
export const LOGIN_HERO_GLOW_CLASS =
  'pointer-events-none absolute -top-20 -left-16 size-72 rounded-full bg-brand-orange/10 blur-3xl';
export const LOGIN_HERO_GLOW_SECONDARY_CLASS =
  'pointer-events-none absolute right-0 bottom-0 size-64 rounded-full bg-brand-orange/8 blur-2xl';
export const LOGIN_HERO_EYEBROW_CLASS =
  'text-sm font-semibold uppercase tracking-[0.2em] text-brand-orange';
export const LOGIN_HERO_TITLE_CLASS = 'mt-4 text-4xl font-bold leading-tight xl:text-5xl';
export const LOGIN_HERO_DESCRIPTION_CLASS = 'mt-4 max-w-sm text-base leading-7 text-white/75';
export const LOGIN_FEATURE_LIST_CLASS = 'mt-10 space-y-4';
export const LOGIN_FEATURE_ITEM_CLASS = 'flex items-center gap-3';
export const LOGIN_FEATURE_ICON_WRAP_CLASS =
  'flex size-9 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/5';
export const LOGIN_FEATURE_LABEL_CLASS = 'text-sm text-white/85';
export const LOGIN_FORM_PANEL_CLASS = 'flex items-center justify-center p-6 sm:p-8 lg:p-10';
export const LOGIN_FORM_CARD_CLASS = 'w-full max-w-md';
export const LOGIN_FORM_TITLE_CLASS = 'text-2xl font-semibold text-[#1a1a2e]';
export const LOGIN_FORM_SUBTITLE_CLASS = 'mt-2 text-sm leading-6 text-[#6b7280]';
export const LOGIN_FORM_STACK_CLASS = 'mt-8 space-y-5';
export const LOGIN_FIELD_CLASS = 'flex flex-col gap-2';
export const LOGIN_LABEL_CLASS = 'cursor-pointer text-sm font-medium text-[#191c1f]';
export const LOGIN_INPUT_CLASS =
  'h-11 w-full cursor-text rounded-[4px] border border-[#eef0f2] bg-white px-[15px] text-sm text-[#475156] placeholder:text-[#77878f] focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-orange';
export const LOGIN_INPUT_ERROR_CLASS = 'border-red-400';
export const LOGIN_ERROR_TEXT_CLASS = 'text-xs text-red-600';
export const LOGIN_FORM_ERROR_CLASS =
  'rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700';
export const LOGIN_PASSWORD_WRAP_CLASS = 'relative';
export const LOGIN_PASSWORD_TOGGLE_CLASS =
  'absolute top-1/2 right-3 -translate-y-1/2 cursor-pointer rounded-sm p-0.5 text-[#77878f] transition-colors hover:text-[#475156] focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-orange';
export const LOGIN_SUBMIT_BUTTON_CLASS =
  'inline-flex h-12 w-full cursor-pointer items-center justify-center gap-2 rounded-[4px] bg-brand-orange text-sm font-bold uppercase tracking-[0.168px] text-white transition-colors hover:bg-brand-orange-dark focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-orange disabled:cursor-not-allowed disabled:opacity-60';
export const LOGIN_FOOTER_NOTE_CLASS = 'mt-8 text-center text-xs text-[#9ca3af]';

export const LOGIN_EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const USER_ROLES = {
  ADMIN: 'admin',
  USER: 'user',
};

export const LOGIN_AUTH_MODES = {
  LOGIN: 'login',
  CREATE_ACCOUNT: 'createAccount',
};

export const LOGIN_MIN_PASSWORD_LENGTH = 8;

export const LOGIN_MODE_SWITCH_CLASS =
  'mt-6 text-center text-sm text-[#6b7280]';

export const LOGIN_MODE_SWITCH_BUTTON_CLASS =
  'cursor-pointer font-semibold text-brand-orange transition-colors hover:text-brand-orange-dark focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-orange';

export const LOGIN_FEATURES = [
  { id: 'analytics', icon: BarChart3, label: 'Real-time analytics and reporting' },
  { id: 'customers', icon: Users, label: 'Lead and customer management' },
  { id: 'settings', icon: Settings, label: 'Full platform configuration' },
];
