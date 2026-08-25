import { SERVICE_PACKAGES } from '../../serviceDetails/serviceDetailsData';

export const ADMIN_SERVICE_DETAILS_VIEWPORT = {
  MOBILE_S: 320,
  MOBILE_M: 375,
  MOBILE_L: 425,
  TABLET: 768,
  LAPTOP: 1020,
  DESKTOP: 1440,
};

export const ADMIN_SERVICE_DETAILS_BACK_ICON_SIZE = 20;
export const ADMIN_SERVICE_DETAILS_CLOCK_ICON_SIZE = 13;
export const ADMIN_SERVICE_DETAILS_SUMMARY_STAR_SIZE = 24;
export const ADMIN_SERVICE_DETAILS_DISTRIBUTION_STAR_SIZE = 18;
export const ADMIN_SERVICE_DETAILS_REVIEW_STAR_SIZE = 18;
export const ADMIN_SERVICE_DETAILS_FEATURE_ICON_SIZE = 22;
export const ADMIN_SERVICE_DETAILS_INCLUSION_CHECK_SIZE = 12;
export const ADMIN_SERVICE_DETAILS_INCLUSION_ALERT_SIZE = 20;
export const ADMIN_SERVICE_DETAILS_AVATAR_SIZE = 48;
export const ADMIN_SERVICE_DETAILS_GALLERY_THUMB_COUNT = 4;
export const ADMIN_SERVICE_DETAILS_FIRST_PHOTO = 1;
export const ADMIN_SERVICE_DETAILS_HERO_WIDTH = 758;
export const ADMIN_SERVICE_DETAILS_HERO_HEIGHT = 624;
export const ADMIN_SERVICE_DETAILS_THUMB_HEIGHT = 136;
export const ADMIN_SERVICE_DETAILS_STAR_COUNT = 5;

export const ADMIN_SERVICE_DETAILS_ASSETS = {
  hero: '/assets/admin/service-details/hero.png',
  thumbs: [
    '/assets/admin/service-details/thumb-1.png',
    '/assets/admin/service-details/thumb-2.png',
    '/assets/admin/service-details/thumb-3.png',
    '/assets/admin/service-details/thumb-4.png',
  ],
  stars: {
    filled: '/assets/admin/service-details/star-filled.svg',
    half: '/assets/admin/service-details/star-half.svg',
    empty: '/assets/admin/service-details/star-empty.svg',
  },
  avatars: {
    darrell: '/assets/admin/service-details/avatar-darrell.png',
    brooklyn: '/assets/admin/service-details/avatar-2.png',
    kathryn: '/assets/admin/service-details/avatar-kathryn.png',
    guy: '/assets/admin/service-details/avatar-1.png',
    robert: '/assets/admin/service-details/avatar-3.png',
    esther: '/assets/admin/service-details/avatar-4.png',
  },
};

export const ADMIN_SERVICE_DETAILS_PAGE_CLASS =
  'flex min-w-0 flex-col gap-5 max-[425px]:gap-5 min-[426px]:gap-6 min-[768px]:gap-8 min-[1020px]:gap-10';
export const ADMIN_SERVICE_DETAILS_BACK_LINK_CLASS =
  'inline-flex items-center gap-1 text-sm font-normal text-[#191c1f] transition-colors hover:text-brand-orange focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-orange';
export const ADMIN_SERVICE_DETAILS_SPLIT_CLASS =
  'grid min-w-0 grid-cols-1 items-start gap-5 min-[1020px]:grid-cols-2';
export const ADMIN_SERVICE_DETAILS_TITLE_CLASS =
  'text-2xl font-semibold leading-tight text-[#0b1e3d] min-[376px]:text-[28px] min-[768px]:text-[32px]';
export const ADMIN_SERVICE_DETAILS_BADGES_CLASS =
  'flex min-w-0 flex-wrap items-end gap-2.5';
export const ADMIN_SERVICE_DETAILS_CATEGORY_BADGE_CLASS =
  'inline-flex items-center rounded-full bg-[#0b1e3d] px-2.5 py-1 text-xs font-semibold leading-4 text-white';
export const ADMIN_SERVICE_DETAILS_SUBCATEGORY_BADGE_CLASS =
  'inline-flex items-center rounded-full bg-[#4f6589] px-2.5 py-1 text-xs font-semibold leading-4 text-white';
export const ADMIN_SERVICE_DETAILS_META_CLASS =
  'flex flex-wrap items-center gap-4 text-sm';
export const ADMIN_SERVICE_DETAILS_RATING_META_CLASS =
  'flex items-center gap-1 border-r border-[#878787] pr-4';
export const ADMIN_SERVICE_DETAILS_RATING_SCORE_TEXT_CLASS = 'text-xs leading-4 text-[#6a7282]';
export const ADMIN_SERVICE_DETAILS_RATING_COUNT_TEXT_CLASS = 'text-xs leading-4 text-[#191919]';
export const ADMIN_SERVICE_DETAILS_DURATION_META_CLASS =
  'flex items-center gap-1 text-sm leading-5 text-[#1f2a2e]';
export const ADMIN_SERVICE_DETAILS_OVERVIEW_CLASS =
  'text-sm leading-6 text-[#2c2c2c] min-[426px]:text-base min-[426px]:leading-6';
export const ADMIN_SERVICE_DETAILS_PACKAGE_RADIO_CLASS = {
  [SERVICE_PACKAGES.STANDARD]:
    'size-5 shrink-0 rounded-[10px] border-2 border-[#151515] bg-[#f8f8f8]',
  [SERVICE_PACKAGES.PREMIUM]:
    'size-5 shrink-0 rounded-[10px] border-2 border-[#151515] bg-[#fff7f4]',
};
export const ADMIN_SERVICE_DETAILS_HERO_IMAGE_CLASS =
  'h-56 w-full min-w-0 rounded-lg object-cover min-[376px]:h-64 min-[768px]:h-80 min-[1020px]:h-[624px]';
export const ADMIN_SERVICE_DETAILS_THUMB_GRID_CLASS =
  'grid min-w-0 grid-cols-4 gap-2 min-[426px]:gap-3';
export const ADMIN_SERVICE_DETAILS_THUMB_IMAGE_CLASS =
  'h-14 w-full min-w-0 object-cover min-[376px]:h-16 min-[768px]:h-24 min-[1020px]:h-[136px]';
export const ADMIN_SERVICE_DETAILS_PACKAGE_GRID_CLASS =
  'grid min-w-0 grid-cols-1 gap-3 min-[768px]:grid-cols-2';
export const ADMIN_SERVICE_DETAILS_PACKAGE_STANDARD_CLASS =
  'flex min-w-0 flex-col gap-2.5 rounded-xl bg-[#f8f8f8] p-4';
export const ADMIN_SERVICE_DETAILS_PACKAGE_PREMIUM_CLASS =
  'flex min-w-0 flex-col gap-2.5 rounded-xl bg-[rgba(255,241,235,0.5)] p-4';
export const ADMIN_SERVICE_DETAILS_PACKAGE_TITLE_CLASS = {
  [SERVICE_PACKAGES.STANDARD]: 'text-base font-medium text-[#0b1e3d]',
  [SERVICE_PACKAGES.PREMIUM]: 'text-base font-medium text-[#fc6f32]',
};
export const ADMIN_SERVICE_DETAILS_PACKAGE_PRICE_CLASS =
  'text-2xl font-semibold leading-none text-[#fc6f32]';
export const ADMIN_SERVICE_DETAILS_INCLUSION_SECTION_CLASS =
  'flex min-w-0 flex-col gap-6';
export const ADMIN_SERVICE_DETAILS_INCLUSION_HEADING_CLASS =
  'text-2xl font-bold leading-8 text-[#374151]';
export const ADMIN_SERVICE_DETAILS_INCLUSION_CARD_CLASS =
  'rounded-2xl border border-[rgba(0,0,0,0.19)] bg-white p-5 min-[426px]:p-8';
export const ADMIN_SERVICE_DETAILS_INCLUSION_LIST_CLASS = 'flex flex-col gap-4';
export const ADMIN_SERVICE_DETAILS_INCLUSION_ITEM_CLASS =
  'flex min-w-0 items-center gap-3 text-base leading-6 text-[#374151]';
export const ADMIN_SERVICE_DETAILS_INCLUDED_BADGE_CLASS =
  'flex size-5 shrink-0 items-center justify-center rounded-full bg-brand-orange-light';
export const ADMIN_SERVICE_DETAILS_EXCLUDED_BADGE_CLASS =
  'flex size-5 shrink-0 items-center justify-center rounded-full border border-[#ef4444]';
export const ADMIN_SERVICE_DETAILS_REVIEWS_CARD_CLASS =
  'flex min-w-0 flex-col gap-8 overflow-hidden rounded border border-[#e4e7e9] bg-white pb-8 min-[426px]:gap-10';
export const ADMIN_SERVICE_DETAILS_RATING_HEADER_CLASS =
  'flex min-w-0 flex-col gap-6 px-4 pt-6 min-[426px]:px-6 min-[768px]:flex-row min-[768px]:items-center min-[768px]:gap-8 min-[768px]:px-10';
export const ADMIN_SERVICE_DETAILS_RATING_SUMMARY_CLASS =
  'flex w-full shrink-0 flex-col items-center justify-center gap-3 rounded bg-[#fbf4ce] p-6 min-[426px]:p-8 min-[768px]:w-auto';
export const ADMIN_SERVICE_DETAILS_RATING_SCORE_CLASS =
  'w-full text-center text-4xl font-semibold leading-none text-[#191c1f] min-[376px]:text-5xl min-[768px]:w-[232px] min-[768px]:text-[56px] min-[768px]:leading-[64px]';
export const ADMIN_SERVICE_DETAILS_RATING_LABEL_CLASS =
  'w-full text-center text-base leading-6 min-[768px]:w-[232px]';
export const ADMIN_SERVICE_DETAILS_DISTRIBUTION_LIST_CLASS =
  'flex min-w-0 flex-1 flex-col gap-4';
export const ADMIN_SERVICE_DETAILS_DISTRIBUTION_ROW_CLASS =
  'flex min-w-0 items-center gap-3 min-[768px]:gap-4';
export const ADMIN_SERVICE_DETAILS_DISTRIBUTION_TRACK_CLASS =
  'relative h-1 min-w-0 flex-1 overflow-hidden rounded-full bg-[#e4e7e9] min-[1020px]:w-[424px] min-[1020px]:flex-none';
export const ADMIN_SERVICE_DETAILS_DISTRIBUTION_FILL_CLASS =
  'absolute left-0 top-0 h-full rounded-full bg-[#fa8232]';
export const ADMIN_SERVICE_DETAILS_DISTRIBUTION_LABEL_CLASS =
  'shrink-0 text-sm leading-5 whitespace-nowrap';
export const ADMIN_SERVICE_DETAILS_NOT_FOUND_CLASS =
  'rounded-2xl border border-[#e8ebf0] bg-white px-6 py-10 text-center';

export const ADMIN_SERVICE_DETAILS_RATING_SUMMARY = {
  score: 4.7,
  totalLabel: '(934,516)',
  filledStars: 4,
  hasHalfStar: true,
};

/** Fill widths match Figma progress geometry on a 424px track. */
export const ADMIN_SERVICE_DETAILS_RATING_DISTRIBUTION = [
  { id: 'five', stars: 5, percent: 63, countLabel: '(94,532)', fillClassName: 'w-[73.6%]' },
  { id: 'four', stars: 4, percent: 24, countLabel: '(6,717)', fillClassName: 'w-[29.2%]' },
  { id: 'three', stars: 3, percent: 9, countLabel: '(714)', fillClassName: 'w-[9.4%]' },
  { id: 'two', stars: 2, percent: 1, countLabel: '(152)', fillClassName: 'w-[1.9%]' },
  { id: 'one', stars: 1, percent: 7, countLabel: '(643)', fillClassName: 'w-[5.7%]' },
];

export const ADMIN_SERVICE_DETAILS_REVIEWS = [
  {
    id: 'review-darrell',
    name: 'Darrell Steward',
    timeLabel: 'Just now',
    rating: 5,
    avatar: ADMIN_SERVICE_DETAILS_ASSETS.avatars.darrell,
    comment:
      'The quality of this cement is outstanding. It mixes very smoothly and provides a clean finish during plastering. Highly recommended for all types of construction work.',
  },
  {
    id: 'review-brooklyn',
    name: 'Brooklyn Simmons',
    timeLabel: '2 mins ago',
    rating: 5,
    avatar: ADMIN_SERVICE_DETAILS_ASSETS.avatars.brooklyn,
    comment:
      'Used this cement for foundation work and the results were excellent. The bonding strength is very strong and there are no cracks. Perfect for long-term durability.',
  },
  {
    id: 'review-kathryn',
    name: 'Kathryn Murphy',
    timeLabel: '21 mins ago',
    rating: 5,
    avatar: ADMIN_SERVICE_DETAILS_ASSETS.avatars.kathryn,
    comment:
      'The cement quality is very good and performs well. However, the delivery was slightly delayed. Overall, I am satisfied with the product.',
  },
  {
    id: 'review-guy',
    name: 'Guy Hawkins',
    timeLabel: '1 hour ago',
    rating: 5,
    avatar: ADMIN_SERVICE_DETAILS_ASSETS.avatars.guy,
    comment:
      'I used this cement for building my house. The workability is smooth and the final finish looks great. Definitely worth the price.',
  },
  {
    id: 'review-robert',
    name: 'Robert Fox',
    timeLabel: '1 day ago',
    rating: 5,
    avatar: ADMIN_SERVICE_DETAILS_ASSETS.avatars.robert,
    comment:
      'After plastering, I did not notice any cracks. The strength and consistency of this cement are impressive. Very satisfied with the performance.',
  },
  {
    id: 'review-esther',
    name: 'Esther Howard',
    timeLabel: '1 day ago',
    rating: 5,
    avatar: ADMIN_SERVICE_DETAILS_ASSETS.avatars.esther,
    comment:
      'Great product for both residential and commercial projects. Easy to mix and provides a strong, durable finish every time.',
  },
];
