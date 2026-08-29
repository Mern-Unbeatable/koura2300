export const ADS_COPY = {
  title: 'Ads Management',
  subtitle: 'Promotional banners across the marketplace',
  gridLabel: 'Ads grid',
  addNewAd: '+ Add new Ads',
  sortByLabel: 'Sort by:',
  categoryFilterLabel: 'Filter ads by category',
  subcategoryFilterLabel: 'Filter ads by subcategory',
  allCategories: 'All Categories',
  allSubcategories: 'All Sub-Categories',
  edit: 'Edit',
  delete: 'Delete',
  pagination: {
    previous: 'Prev',
    next: 'Next',
    ellipsis: '...',
    pageLabel: (page) => `Go to page ${page}`,
    regionLabel: 'Ads pagination',
  },
  emptyResults: 'No ads found for these filters.',
  deleteModal: {
    regionLabel: 'Delete ad',
    title: 'Delete Ad',
    description: (adTitle) =>
      `Are you sure you want to delete "${adTitle}"? This action cannot be undone.`,
    closeLabel: 'Close delete confirmation',
    cancel: 'Cancel',
    confirm: 'Delete',
  },
  toasts: {
    deleted: 'Ad deleted.',
  },
};
