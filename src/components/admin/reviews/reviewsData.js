export const REVIEWS_VIEWPORT = {
  MOBILE_S: 320,
  MOBILE_M: 375,
  MOBILE_L: 425,
  TABLET: 768,
  LAPTOP: 1020,
  DESKTOP: 1440,
};

export const REVIEWS_STAR_COUNT = 5;
export const REVIEWS_SUMMARY_STAR_SIZE_PX = 24;
export const REVIEWS_DISTRIBUTION_STAR_SIZE_PX = 18;
export const REVIEWS_FEEDBACK_STAR_SIZE_PX = 16;
export const REVIEWS_AVATAR_SIZE_PX = 48;
export const REVIEWS_DELETE_ICON_SIZE_PX = 16;
export const REVIEWS_DISTRIBUTION_TRACK_WIDTH_PX = 424;

export const REVIEWS_ASSETS = {
  stars: {
    filled: '/assets/admin/service-details/star-filled.svg',
    half: '/assets/admin/service-details/star-half.svg',
    empty: '/assets/admin/service-details/star-empty.svg',
  },
  avatars: {
    leslie: '/assets/admin/service-details/avatar-darrell.png',
    jenny: '/assets/admin/service-details/avatar-2.png',
    kristin: '/assets/admin/service-details/avatar-kathryn.png',
    jerome: '/assets/admin/service-details/avatar-1.png',
    ronald: '/assets/admin/service-details/avatar-3.png',
    eleanor: '/assets/admin/service-details/avatar-4.png',
    brooklyn: '/assets/admin/service-details/avatar-2.png',
    esther: '/assets/admin/service-details/avatar-4.png',
  },
};

export const REVIEWS_PAGE_CLASS =
  'flex min-w-0 flex-col gap-5 max-[425px]:gap-5 min-[426px]:gap-6 min-[768px]:gap-8 min-[1020px]:gap-10';

export const REVIEWS_HEADER_CLASS = 'flex flex-col gap-2';

export const REVIEWS_TITLE_CLASS =
  'text-[28px] font-semibold leading-[1.2] text-[#050609] min-[376px]:text-[32px] min-[768px]:text-[36px]';

export const REVIEWS_SUBTITLE_CLASS =
  'text-sm leading-5 text-[#454545] min-[426px]:text-sm min-[768px]:text-base min-[768px]:leading-6';

export const REVIEWS_RATING_SECTION_CLASS =
  'flex min-w-0 flex-col gap-6 min-[1440px]:flex-row min-[1440px]:items-center min-[1440px]:gap-8';

export const REVIEWS_RATING_SUMMARY_CLASS =
  'flex w-full shrink-0 flex-col items-center justify-center gap-3 rounded bg-[#fbf4ce] p-6 min-[426px]:gap-3 min-[426px]:p-8 min-[1440px]:w-auto';

export const REVIEWS_RATING_SCORE_CLASS =
  'w-full text-center text-4xl font-semibold leading-none text-[#191c1f] min-[376px]:text-5xl min-[768px]:text-[56px] min-[768px]:leading-[64px] min-[1440px]:w-[232px]';

export const REVIEWS_RATING_LABEL_CLASS =
  'w-full text-center text-base leading-6 min-[1440px]:w-[232px]';

export const REVIEWS_DISTRIBUTION_LIST_CLASS =
  'flex min-w-0 w-full flex-1 flex-col gap-4';

export const REVIEWS_DISTRIBUTION_ROW_CLASS =
  'flex min-w-0 items-center gap-3 min-[768px]:gap-4';

export const REVIEWS_DISTRIBUTION_TRACK_CLASS =
  'relative h-1 min-w-0 flex-1 overflow-hidden rounded-full bg-[#e4e7e9] min-[1440px]:max-w-[424px]';

export const REVIEWS_DISTRIBUTION_FILL_CLASS =
  'absolute left-0 top-0 h-full rounded-full bg-[#fa8232]';

export const REVIEWS_DISTRIBUTION_LABEL_CLASS =
  'shrink-0 text-sm leading-5 whitespace-nowrap';

export const REVIEWS_FEEDBACK_SECTION_CLASS = 'flex min-w-0 flex-col gap-5 pt-2 min-[768px]:gap-5';

export const REVIEWS_FEEDBACK_TITLE_CLASS =
  'text-base font-semibold leading-6 text-[#191c1f]';

export const REVIEWS_FEEDBACK_LIST_CLASS = 'flex min-w-0 flex-col gap-5';

export const REVIEWS_FEEDBACK_ITEM_CLASS = 'flex min-w-0 flex-col gap-3';

export const REVIEWS_FEEDBACK_HEADER_CLASS =
  'flex flex-col gap-3 min-[426px]:flex-row min-[426px]:items-start min-[426px]:justify-between min-[426px]:gap-4';

export const REVIEWS_FEEDBACK_USER_CLASS = 'flex min-w-0 items-center gap-3';

export const REVIEWS_FEEDBACK_META_ROW_CLASS =
  'flex flex-wrap items-center gap-1.5 text-sm leading-5';

export const REVIEWS_FEEDBACK_NAME_CLASS = 'font-medium text-[#191c1f]';

export const REVIEWS_FEEDBACK_META_TEXT_CLASS = 'text-[#5f6c72]';

export const REVIEWS_FEEDBACK_SERVICE_ROW_CLASS =
  'flex items-center gap-1.5 text-sm leading-5 text-[#5f6c72]';

export const REVIEWS_FEEDBACK_COMMENT_CLASS = 'text-sm leading-5 text-[#475156]';

export const REVIEWS_FEEDBACK_DIVIDER_CLASS = 'border-0 border-t border-[#e4e7e9]';

export const REVIEWS_DELETE_BUTTON_CLASS =
  'inline-flex shrink-0 cursor-pointer items-center justify-center gap-2 rounded-lg bg-[#fc3232] px-4 py-2 text-xs leading-5 text-white transition-colors hover:bg-[#e52b2b] focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-orange min-[426px]:self-start';

export const REVIEWS_DELETE_CLOSE_ICON_SIZE_PX = 18;

export const REVIEWS_DELETE_OVERLAY_CLASS =
  'animate-fade-in fixed inset-0 z-[100] flex items-center justify-center bg-[rgba(0,0,0,0.7)] backdrop-blur-[17.4px] p-3 min-[376px]:p-4';

export const REVIEWS_DELETE_DIALOG_CLASS =
  'animate-page-enter flex w-full max-w-[470px] flex-col overflow-hidden rounded-xl bg-white shadow-[0px_75px_88.5px_0px_rgba(14,20,35,0.25)]';

export const REVIEWS_DELETE_HEADER_CLASS =
  'flex items-start justify-between gap-3 border-b border-[#edf0f3] px-4 py-4 min-[376px]:px-6 min-[376px]:pb-[21px] min-[376px]:pt-5';

export const REVIEWS_DELETE_TITLE_CLASS =
  'pt-1 text-lg font-bold leading-7 tracking-[-0.5px] text-[#202838] min-[376px]:text-xl';

export const REVIEWS_DELETE_CLOSE_CLASS =
  'cursor-pointer rounded-full p-1 text-[#536070] transition-colors hover:text-[#202838] focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-orange';

export const REVIEWS_DELETE_BODY_CLASS =
  'flex flex-col gap-4 px-4 py-4 min-[376px]:gap-6 min-[376px]:px-6 min-[376px]:py-5';

export const REVIEWS_DELETE_DESCRIPTION_CLASS =
  'text-sm leading-5 text-[#455163] min-[376px]:text-base min-[376px]:leading-6';

export const REVIEWS_DELETE_ACTIONS_CLASS =
  'flex flex-col-reverse gap-2 min-[376px]:flex-row min-[376px]:items-center min-[376px]:justify-end';

export const REVIEWS_DELETE_CANCEL_CLASS =
  'inline-flex h-9 w-full cursor-pointer items-center justify-center rounded-md border border-[#dfe4ea] px-4 text-xs text-[#536070] transition-colors hover:bg-[#f8fafc] focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-orange min-[376px]:w-auto';

export const REVIEWS_DELETE_CONFIRM_CLASS =
  'inline-flex h-9 w-full cursor-pointer items-center justify-center rounded-md bg-[#fc3232] px-4 text-xs text-white shadow-[0px_1px_1.5px_rgba(0,0,0,0.1),0px_1px_1px_rgba(0,0,0,0.1)] transition-colors hover:bg-[#e52b2b] focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-orange min-[376px]:w-auto';

export const REVIEWS_RATING_SUMMARY = {
  score: 4.7,
  totalLabel: '(934,516)',
  filledStars: 4,
  hasHalfStar: true,
};

export const REVIEWS_RATING_DISTRIBUTION = [
  { id: 'five', stars: 5, percent: 63, countLabel: '(94,532)', fillClassName: 'w-[73.6%]' },
  { id: 'four', stars: 4, percent: 24, countLabel: '(6,717)', fillClassName: 'w-[29.2%]' },
  { id: 'three', stars: 3, percent: 9, countLabel: '(714)', fillClassName: 'w-[9.4%]' },
  { id: 'two', stars: 2, percent: 1, countLabel: '(152)', fillClassName: 'w-[1.9%]' },
  { id: 'one', stars: 1, percent: 7, countLabel: '(643)', fillClassName: 'w-[5.7%]' },
];

const REVIEW_DATE = '2026-02-13';
const REVIEW_SERVICE = 'Kitchen Degrease & Sanitize';

const REPEATED_COMMENT =
  'The strength and consistency of this cement are impressive. Very satisfied with the performance.';

export const REVIEWS_SEED = [
  {
    id: 'review-leslie',
    name: 'Leslie Alexander',
    dateLabel: REVIEW_DATE,
    serviceName: REVIEW_SERVICE,
    rating: 5,
    avatar: REVIEWS_ASSETS.avatars.leslie,
    awaitingModeration: true,
    comment:
      'The quality of this cement is outstanding. It mixes very smoothly and provides a clean finish during plastering. Highly recommended for all types of construction work.',
  },
  {
    id: 'review-jenny',
    name: 'Jenny Wilson',
    dateLabel: REVIEW_DATE,
    serviceName: REVIEW_SERVICE,
    rating: 5,
    avatar: REVIEWS_ASSETS.avatars.jenny,
    awaitingModeration: false,
    comment:
      'Used this cement for foundation work and the results were excellent. The bonding strength is very strong and there are no cracks. Perfect for long-term durability.',
  },
  {
    id: 'review-kristin',
    name: 'Kristin Watson',
    dateLabel: REVIEW_DATE,
    serviceName: REVIEW_SERVICE,
    rating: 5,
    avatar: REVIEWS_ASSETS.avatars.kristin,
    awaitingModeration: false,
    comment:
      'The cement quality is very good and performs well. However, the delivery was slightly delayed. Overall, I am satisfied with the product.',
  },
  {
    id: 'review-jerome',
    name: 'Jerome Bell',
    dateLabel: REVIEW_DATE,
    serviceName: REVIEW_SERVICE,
    rating: 5,
    avatar: REVIEWS_ASSETS.avatars.jerome,
    awaitingModeration: false,
    comment:
      'I used this cement for building my house. The workability is smooth and the final finish looks great. Definitely worth the price.',
  },
  {
    id: 'review-ronald',
    name: 'Ronald Richards',
    dateLabel: REVIEW_DATE,
    serviceName: REVIEW_SERVICE,
    rating: 5,
    avatar: REVIEWS_ASSETS.avatars.ronald,
    awaitingModeration: false,
    comment: REPEATED_COMMENT,
  },
  {
    id: 'review-eleanor',
    name: 'Eleanor Pena',
    dateLabel: REVIEW_DATE,
    serviceName: REVIEW_SERVICE,
    rating: 5,
    avatar: REVIEWS_ASSETS.avatars.eleanor,
    awaitingModeration: false,
    comment: REPEATED_COMMENT,
  },
  {
    id: 'review-brooklyn',
    name: 'Brooklyn Simmons',
    dateLabel: REVIEW_DATE,
    serviceName: REVIEW_SERVICE,
    rating: 5,
    avatar: REVIEWS_ASSETS.avatars.brooklyn,
    awaitingModeration: false,
    comment: REPEATED_COMMENT,
  },
  {
    id: 'review-esther',
    name: 'Esther Howard',
    dateLabel: REVIEW_DATE,
    serviceName: REVIEW_SERVICE,
    rating: 5,
    avatar: REVIEWS_ASSETS.avatars.esther,
    awaitingModeration: false,
    comment: REPEATED_COMMENT,
  },
];
