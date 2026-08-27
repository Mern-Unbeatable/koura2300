export const REVIEWS_COPY = {
  title: 'Review Management',
  rating: {
    regionLabel: 'Customer rating summary',
    customerRatingLabel: 'Customer Rating',
    distributionLabel: 'Rating distribution',
  },
  feedback: {
    title: 'Customer Feedback',
    metaSeparator: '•',
    deleteLabel: (name) => `Delete review by ${name}`,
  },
  toasts: {
    deleted: 'Review deleted.',
  },
};

export const getModerationSubtitleText = (count) => `${count} reviews awaiting moderation`;
