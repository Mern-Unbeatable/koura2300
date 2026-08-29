export const ADMIN_BLOG_COPY = {
  title: 'Blog Management',
  addButton: 'Add new blog',
  emptyMessage: 'No blog posts yet.',
  edit: 'Edit',
  delete: 'Delete',
  editLabel: (title) => `Edit ${title}`,
  deleteLabel: (title) => `Delete ${title}`,
  gridRegionLabel: 'Blog posts',
  pagination: {
    previous: 'Prev',
    next: 'Next',
    ellipsis: '...',
    pageLabel: (page) => `Go to page ${page}`,
    regionLabel: 'Blog pagination',
  },
  deleteModal: {
    regionLabel: 'Delete blog post',
    title: 'Delete Blog Post',
    description: (postTitle) =>
      `Are you sure you want to delete "${postTitle}"? This action cannot be undone.`,
    closeLabel: 'Close delete confirmation',
    cancel: 'Cancel',
    confirm: 'Delete',
  },
  toasts: {
    added: 'Blog post draft created.',
    deleted: 'Blog post deleted.',
  },
};
