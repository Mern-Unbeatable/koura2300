export const SERVICE_REVIEWS_AVATAR_PATH = '/assets/admin/service-details';
export const SERVICE_REVIEWS_STAR_COUNT = 5;
export const SERVICE_REVIEWS_SUMMARY_STAR_SIZE = 24;
export const SERVICE_REVIEWS_BREAKDOWN_STAR_SIZE = 18;
export const SERVICE_REVIEWS_FEEDBACK_STAR_SIZE = 18;
export const SERVICE_REVIEWS_AVATAR_SIZE = 48;
export const SERVICE_REVIEWS_BACK_ICON_SIZE = 16;
export const SERVICE_REVIEWS_PROGRESS_TRACK_HEIGHT_PX = 4;

export const SERVICE_REVIEWS_PAGE_CLASS =
  'min-h-screen overflow-x-clip bg-[#f8fafc] font-inter text-brand-ink';
export const SERVICE_REVIEWS_MAIN_CLASS =
  'animate-page-enter mx-auto max-w-screen-2xl px-4 pb-24 pt-8 sm:px-6 lg:px-8 lg:pb-28';
export const SERVICE_REVIEWS_BACK_LINK_CLASS =
  'mb-6 inline-flex items-center gap-1 text-sm font-normal text-[#191c1f] transition-colors hover:text-brand-orange focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-orange';
export const SERVICE_REVIEWS_PANEL_CLASS =
  'overflow-hidden rounded border border-[#e4e7e9] bg-white';
export const SERVICE_REVIEWS_PANEL_INNER_CLASS =
  'flex flex-col gap-8 p-4 sm:gap-10 sm:p-6 lg:gap-10 lg:p-10';
export const SERVICE_REVIEWS_SUMMARY_ROW_CLASS =
  'flex flex-col gap-6 lg:flex-row lg:items-center lg:gap-8';
export const SERVICE_REVIEWS_SCORE_CARD_CLASS =
  'flex w-full shrink-0 flex-col items-center justify-center gap-3 rounded bg-[#fbf4ce] p-6 sm:p-8 lg:w-[296px]';
export const SERVICE_REVIEWS_SCORE_VALUE_CLASS =
  'text-center text-4xl font-semibold leading-none text-[#191c1f] sm:text-5xl lg:text-[56px] lg:leading-[64px]';
export const SERVICE_REVIEWS_SCORE_LABEL_CLASS =
  'text-center text-base font-medium leading-6 text-[#191c1f]';
export const SERVICE_REVIEWS_SCORE_COUNT_CLASS = 'font-normal text-[#475156]';
export const SERVICE_REVIEWS_STARS_CLASS = 'flex items-center gap-0.5 text-[#fa8232]';
export const SERVICE_REVIEWS_BREAKDOWN_CLASS = 'flex min-w-0 flex-1 flex-col gap-4';
export const SERVICE_REVIEWS_BREAKDOWN_ROW_CLASS =
  'flex min-w-0 flex-wrap items-center gap-3 sm:gap-4';
export const SERVICE_REVIEWS_PROGRESS_TRACK_CLASS =
  'relative h-1 min-w-0 flex-1 overflow-hidden rounded-full bg-[#e4e7e9]';
export const SERVICE_REVIEWS_PROGRESS_FILL_CLASS =
  'absolute inset-y-0 left-0 rounded-full bg-[#fa8232]';
export const SERVICE_REVIEWS_PERCENT_CLASS =
  'shrink-0 text-sm font-medium leading-5 text-[#191c1f]';
export const SERVICE_REVIEWS_COUNT_CLASS =
  'shrink-0 text-sm font-normal leading-5 text-[#77878f]';
export const SERVICE_REVIEWS_LIST_CLASS = 'flex flex-col gap-5';
export const SERVICE_REVIEWS_LIST_TITLE_CLASS =
  'text-base font-semibold leading-6 text-[#191c1f]';
export const SERVICE_REVIEWS_ITEMS_CLASS = 'flex flex-col';
export const SERVICE_REVIEWS_ITEM_CLASS =
  'flex flex-col gap-3 border-b border-[#e4e7e9] py-3 last:border-b-0 last:pb-0 first:pt-0';
export const SERVICE_REVIEWS_ITEM_HEADER_CLASS = 'flex items-center gap-3';
export const SERVICE_REVIEWS_AVATAR_CLASS = 'size-12 shrink-0 rounded-full object-cover';
export const SERVICE_REVIEWS_AUTHOR_META_CLASS = 'flex flex-col gap-1.5';
export const SERVICE_REVIEWS_AUTHOR_ROW_CLASS =
  'flex flex-wrap items-center gap-1.5 text-sm leading-5';
export const SERVICE_REVIEWS_AUTHOR_NAME_CLASS = 'font-medium text-[#191c1f]';
export const SERVICE_REVIEWS_AUTHOR_DOT_CLASS = 'text-[#5f6c72]';
export const SERVICE_REVIEWS_AUTHOR_TIME_CLASS = 'font-normal text-[#5f6c72]';
export const SERVICE_REVIEWS_BODY_CLASS = 'text-sm leading-5 text-[#475156]';
export const SERVICE_REVIEWS_NOT_FOUND_CLASS =
  'rounded-2xl border border-[#e2e8f0] bg-white p-10 text-center';

export const SERVICE_REVIEWS_SUMMARY = {
  average: 4.7,
  totalCount: 934516,
  filledStars: 4,
  hasHalfStar: true,
};

export const SERVICE_REVIEWS_BREAKDOWN = [
  { stars: 5, percent: 63, count: 94532 },
  { stars: 4, percent: 24, count: 6717 },
  { stars: 3, percent: 9, count: 714 },
  { stars: 2, percent: 1, count: 152 },
  { stars: 1, percent: 7, count: 643 },
];

export const SERVICE_REVIEWS_FEEDBACK = [
  {
    id: 'review-darrell',
    name: 'Darrell Steward',
    timeLabel: 'Just now',
    rating: 5,
    avatarSrc: `${SERVICE_REVIEWS_AVATAR_PATH}/avatar-darrell.png`,
    body: 'The quality of this cement is outstanding. It mixes very smoothly and provides a clean finish during plastering. Highly recommended for all types of construction work.',
  },
  {
    id: 'review-brooklyn',
    name: 'Brooklyn Simmons',
    timeLabel: '2 mins ago',
    rating: 5,
    avatarSrc: `${SERVICE_REVIEWS_AVATAR_PATH}/avatar-1.png`,
    body: 'Used this cement for foundation work and the results were excellent. The bonding strength is very strong and there are no cracks. Perfect for long-term durability.',
  },
  {
    id: 'review-kathryn',
    name: 'Kathryn Murphy',
    timeLabel: '21 mins ago',
    rating: 5,
    avatarSrc: `${SERVICE_REVIEWS_AVATAR_PATH}/avatar-kathryn.png`,
    body: 'The cement quality is very good and performs well. However, the delivery was slightly delayed. Overall, I am satisfied with the product.',
  },
  {
    id: 'review-guy',
    name: 'Guy Hawkins',
    timeLabel: '1 hour ago',
    rating: 5,
    avatarSrc: `${SERVICE_REVIEWS_AVATAR_PATH}/avatar-2.png`,
    body: 'I used this cement for building my house. The workability is smooth and the final finish looks great. Definitely worth the price.',
  },
  {
    id: 'review-robert',
    name: 'Robert Fox',
    timeLabel: '1 day ago',
    rating: 5,
    avatarSrc: `${SERVICE_REVIEWS_AVATAR_PATH}/avatar-3.png`,
    body: 'After plastering, I didn’t notice any cracks. The strength and consistency of this cement are impressive. Very satisfied with the performance.',
  },
  {
    id: 'review-esther',
    name: 'Esther Howard',
    timeLabel: '1 day ago',
    rating: 5,
    avatarSrc: `${SERVICE_REVIEWS_AVATAR_PATH}/avatar-4.png`,
    body: 'The texture is fine and easy to mix. The workers found it very convenient to use, which made the job faster and smoother.',
  },
];

export const formatReviewCount = (count) =>
  new Intl.NumberFormat('en-US').format(Number(count) || 0);

export const formatReviewPercent = (percent) => `${Number(percent) || 0}%`;

export const formatReviewCountLabel = (count) => `(${formatReviewCount(count)})`;

export const getServiceReviewsPayload = (serviceId) => {
  if (!serviceId) {
    return null;
  }

  return {
    serviceId,
    summary: SERVICE_REVIEWS_SUMMARY,
    breakdown: SERVICE_REVIEWS_BREAKDOWN,
    feedback: SERVICE_REVIEWS_FEEDBACK,
  };
};
