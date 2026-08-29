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
  deleteModal: {
    regionLabel: 'Delete review',
    title: 'Delete Review',
    description: (reviewerName) =>
      `Are you sure you want to delete the review by "${reviewerName}"? This action cannot be undone.`,
    closeLabel: 'Close delete confirmation',
    cancel: 'Cancel',
    confirm: 'Delete',
  },
  toasts: {
    deleted: 'Review deleted.',
  },
};

export const getModerationSubtitleText = (count) => `${count} reviews awaiting moderation`;
