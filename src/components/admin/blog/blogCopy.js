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
  toasts: {
    added: 'Blog post draft created.',
    deleted: 'Blog post deleted.',
  },
};
