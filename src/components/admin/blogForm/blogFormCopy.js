export const ADMIN_BLOG_FORM_COPY = {
  seo: {
    create: {
      title: 'Add New Blog | Admin',
      description: 'Create a new blog post with title, descriptions, and banner image.',
    },
    edit: {
      title: 'Update Blog | Admin',
      description: 'Update an existing blog post title, descriptions, and banner image.',
    },
  },
  titles: {
    create: 'Add New Blog',
    edit: 'Update Blog',
  },
  subtitle: 'Step-by-step wizard progress is kept as you move between steps',
  actions: {
    back: 'Back',
    upload: 'Upload',
  },
  fields: {
    title: 'Title',
    shortDescription: 'Short Description',
    longDescription: 'Long Description',
    bannerImage: 'Banner Image',
  },
  placeholders: {
    title: 'e.g. 5 Signs Your Home Needs a Plumbing Repair',
    shortDescription:
      'Write a short summary readers will see on the blog card (1–2 sentences).',
    longDescription:
      'Write the full article body. Cover the problem, practical tips, and when to call a professional.',
  },
  upload: {
    dropTitle: 'Drag and drop photos here',
    dropHint: 'Or click to browse from your computer',
    formats: 'JPEG, PNG',
    maxBanner: 'Max 1 photos',
    resolution: '1920x1080px recommended',
    bannerInputLabel: 'Upload blog banner image',
  },
  errors: {
    titleRequired: 'Title is required.',
    shortDescriptionRequired: 'Short description is required.',
    longDescriptionRequired: 'Long description is required.',
    bannerRequired: 'Banner image is required.',
    bannerTooMany: 'Only 1 banner photo is allowed.',
  },
  notFound: {
    title: 'Blog post not found',
    description: 'This blog post could not be loaded for editing.',
    backLabel: 'Back to Blog Management',
  },
  toasts: {
    created: 'Blog post uploaded successfully.',
    updated: 'Blog post updated successfully.',
  },
};
