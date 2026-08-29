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
    title: 'Portland Cement Quick Set',
    shortDescription:
      'Portland Cement is a high-quality, versatile construction material designed for strong, durable, and long-lasting structures. It is widely used for concrete, mortar, plastering, and other construction applications, ensuring excellent bonding and superior performance.',
    longDescription:
      'Portland Cement is a high-quality, versatile construction material designed for strong, durable, and long-lasting structures. It is widely used for concrete, mortar, plastering, and other construction applications, ensuring excellent bonding and superior performance. With its fine composition and consistent quality, this cement provides smooth workability and reliable strength development. It is suitable for residential, commercial, and industrial projects, making it an essential material for builders and contractors. Its advanced formulation ensures high compressive strength, resistance to cracks, and long-term durability. Whether used for foundations, walls, or finishing work, Portland Cement delivers dependable results for all types of construction needs.',
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
