import { LANDING_ASSET_PATH } from '../landingData';

export const LANDING_CHAT_PANEL_WIDTH_PX = 570;
export const LANDING_CHAT_HEADER_HEIGHT_PX = 65;
export const LANDING_CHAT_INPUT_HEIGHT_PX = 42;
export const LANDING_CHAT_SEND_BUTTON_SIZE_PX = 42;
export const LANDING_CHAT_HEADER_ICON_SIZE = 24;
export const LANDING_CHAT_CLOSE_ICON_SIZE = 24;
export const LANDING_CHAT_SEND_ICON_SIZE = 18;
export const LANDING_CHAT_INPUT_BORDER_COLOR = '#fad28f';
export const LANDING_CHAT_INPUT_FOCUS_RING_COLOR = '#fbc86a';

export const LANDING_CHAT_PANEL_CLASS =
  'fixed z-[60] flex flex-col overflow-hidden overscroll-y-contain bg-[#fef5e7] shadow-[0px_36px_100.2px_0px_rgba(0,0,0,0.25)] max-[767px]:bottom-0 max-[767px]:left-0 max-[767px]:right-0 max-[767px]:top-28 max-[767px]:rounded-none min-[768px]:bottom-4 min-[768px]:right-4 min-[768px]:top-36 min-[768px]:left-auto min-[768px]:h-auto min-[768px]:w-[570px] min-[768px]:max-w-[calc(100vw-2rem)] min-[768px]:rounded-2xl min-[1020px]:right-8';
export const LANDING_CHAT_HEADER_CLASS =
  'sticky top-0 z-10 flex h-[65px] shrink-0 items-center justify-between bg-[#df900a] px-6';
export const LANDING_CHAT_TITLE_CLASS = 'text-xl font-medium text-white';
export const LANDING_CHAT_MESSAGES_CLASS =
  'scrollbar-landing-chat flex min-h-0 flex-1 flex-col gap-[22px] overflow-y-auto overscroll-y-contain px-4 py-6 sm:px-6';
export const LANDING_CHAT_COMPOSER_WRAP_CLASS =
  'shrink-0 border-t border-[#e8eaed] px-4 py-5 sm:px-6';
export const LANDING_CHAT_COMPOSER_ROW_CLASS = 'flex items-center gap-2';
export const LANDING_CHAT_INPUT_CLASS =
  'h-[42px] min-w-0 flex-1 rounded border border-[#fad28f] px-3 py-2 text-sm text-[#3c3e45] placeholder:text-[#fad28f] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#fbc86a]';
export const LANDING_CHAT_SEND_BUTTON_CLASS =
  'flex size-[42px] shrink-0 items-center justify-center rounded border border-[#f59e0b] bg-[#f59e0b] p-0 text-white transition-colors hover:bg-[#df900a] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#f59e0b] disabled:cursor-not-allowed disabled:opacity-40 [&_svg]:block';
export const LANDING_CHAT_ASSISTANT_BUBBLE_CLASS =
  'max-w-[85%] rounded-xl bg-white p-5 text-base text-[#3c3e45] sm:max-w-[359px]';
export const LANDING_CHAT_USER_BUBBLE_CLASS =
  'max-w-[85%] rounded-xl bg-[#df900a] p-5 text-base text-white sm:max-w-[243px]';
export const LANDING_CHAT_TIME_CLASS = 'mt-2 text-sm text-[#898e99]';
export const LANDING_CHAT_USER_TIME_CLASS = 'mt-2 text-sm text-white/80';
export const LANDING_CHAT_PRODUCTS_BUBBLE_CLASS = 'max-w-full rounded-xl bg-white p-4 sm:max-w-[394px]';
export const LANDING_CHAT_PRODUCTS_ROW_CLASS =
  'flex gap-2 overflow-x-auto pb-1 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden';
export const LANDING_CHAT_PRODUCT_CARD_CLASS =
  'w-[114px] shrink-0 rounded-lg bg-white p-2.5 first:w-[122px]';
export const LANDING_CHAT_PRODUCT_IMAGE_CLASS = 'h-[74px] w-full rounded object-cover';
export const LANDING_CHAT_PRODUCT_TITLE_CLASS = 'mt-1 text-[15px] leading-snug text-[#1f2933]';
export const LANDING_CHAT_PRODUCT_PRICE_CLASS = 'mt-1 text-sm text-[#4c545c]';

export const LANDING_CHAT_MESSAGE_TYPES = {
  ASSISTANT: 'assistant',
  USER: 'user',
  PRODUCTS: 'products',
};

export const LANDING_CHAT_PRODUCTS = [
  {
    id: 'ceiling-light',
    title: 'Ceiling light installation',
    priceLabel: '$100.00',
    image: `${LANDING_ASSET_PATH}/category-lighting.png`,
    imageAlt: 'Ceiling light installation service',
  },
  {
    id: 'standard-led',
    title: 'Standard LED Lighting Kit',
    priceLabel: '$100.00',
    image: `${LANDING_ASSET_PATH}/service-electrical.png`,
    imageAlt: 'Standard LED lighting kit',
  },
  {
    id: 'premium-led',
    title: 'Premium LED Light System',
    priceLabel: '$100.00',
    image: `${LANDING_ASSET_PATH}/article-electrical.png`,
    imageAlt: 'Premium LED light system',
  },
];

export const LANDING_CHAT_SEED_TIME = '9:33 AM';
export const LANDING_CHAT_FOLLOW_UP_TIME = '9:37 AM';

export const LANDING_CHAT_SEED_MESSAGES = [
  {
    id: 'welcome',
    type: LANDING_CHAT_MESSAGE_TYPES.ASSISTANT,
    textKey: 'welcomeMessage',
    time: LANDING_CHAT_SEED_TIME,
  },
  {
    id: 'user-lighting',
    type: LANDING_CHAT_MESSAGE_TYPES.USER,
    text: 'LED Lighting System',
    time: LANDING_CHAT_SEED_TIME,
  },
  {
    id: 'products',
    type: LANDING_CHAT_MESSAGE_TYPES.PRODUCTS,
    products: LANDING_CHAT_PRODUCTS,
    time: LANDING_CHAT_SEED_TIME,
  },
  {
    id: 'help-materials',
    type: LANDING_CHAT_MESSAGE_TYPES.ASSISTANT,
    textKey: 'helpMaterialsMessage',
    time: LANDING_CHAT_FOLLOW_UP_TIME,
  },
  {
    id: 'prompt',
    type: LANDING_CHAT_MESSAGE_TYPES.ASSISTANT,
    textKey: 'promptMessage',
    time: LANDING_CHAT_FOLLOW_UP_TIME,
  },
];
