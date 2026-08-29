export const ADMIN_BLOG_FORM_COPY = {
  seo: {
    title: 'Add New Blog | Admin',
    description: 'Create a new blog post with title, descriptions, and banner image.',
  },
  title: 'Add New Blog',
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
  toasts: {
    created: 'Blog post uploaded successfully.',
  },
};
