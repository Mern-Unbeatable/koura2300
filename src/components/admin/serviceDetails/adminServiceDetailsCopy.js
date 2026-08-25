export const ADMIN_SERVICE_DETAILS_COPY = {
  seo: {
    title: 'Service Details | Logoipsum',
    description: 'Review service gallery, packages, inclusions, and customer ratings.',
    keywords: ['service details', 'admin', 'services'],
  },
  actions: {
    back: 'Back',
  },
  gallery: {
    regionLabel: 'Service gallery',
    thumbnailLabel: (photoNumber) => `View photo ${photoNumber}`,
  },
  packages: {
    regionLabel: 'Service packages',
  },
  inclusions: {
    includedTitle: "What's Included",
    excludedTitle: 'Not Included',
  },
  reviews: {
    regionLabel: 'Customer reviews',
    customerRatingLabel: 'Customer Rating',
    distributionLabel: 'Rating distribution',
    feedbackTitle: 'Customer Feedback',
    metaSeparator: '•',
  },
  notFound: {
    title: 'Service not found',
    description: 'This service is unavailable or the link is invalid.',
    backLabel: 'Back to services',
  },
};
