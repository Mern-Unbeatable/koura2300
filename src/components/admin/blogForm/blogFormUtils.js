import { ADMIN_BLOG_FORM_COPY } from './blogFormCopy';
import {
  ADMIN_BLOG_FORM_BANNER_MAX_FILES,
  ADMIN_BLOG_FORM_EMPTY_VALUES,
  ADMIN_BLOG_FORM_FIELDS,
} from './blogFormData';
import { readFileAsDataUrl } from '../serviceForm/adminServiceFormUtils';

export const createBlogFormValues = () => ({ ...ADMIN_BLOG_FORM_EMPTY_VALUES });

const hasText = (value) => String(value || '').trim().length > 0;

export const validateBlogForm = (values) => {
  const errors = {};

  if (!hasText(values[ADMIN_BLOG_FORM_FIELDS.TITLE])) {
    errors[ADMIN_BLOG_FORM_FIELDS.TITLE] = ADMIN_BLOG_FORM_COPY.errors.titleRequired;
  }

  if (!hasText(values[ADMIN_BLOG_FORM_FIELDS.SHORT_DESCRIPTION])) {
    errors[ADMIN_BLOG_FORM_FIELDS.SHORT_DESCRIPTION] =
      ADMIN_BLOG_FORM_COPY.errors.shortDescriptionRequired;
  }

  if (!hasText(values[ADMIN_BLOG_FORM_FIELDS.LONG_DESCRIPTION])) {
    errors[ADMIN_BLOG_FORM_FIELDS.LONG_DESCRIPTION] =
      ADMIN_BLOG_FORM_COPY.errors.longDescriptionRequired;
  }

  if (!values[ADMIN_BLOG_FORM_FIELDS.BANNER_IMAGE]) {
    errors[ADMIN_BLOG_FORM_FIELDS.BANNER_IMAGE] = ADMIN_BLOG_FORM_COPY.errors.bannerRequired;
  }

  return errors;
};

export const isBlogFormReady = (values) =>
  Object.keys(validateBlogForm(values)).length === 0;

export const assertBlogBannerFileLimit = (fileCount) => {
  if (fileCount > ADMIN_BLOG_FORM_BANNER_MAX_FILES) {
    return ADMIN_BLOG_FORM_COPY.errors.bannerTooMany;
  }

  return null;
};

export const createBlogBannerImageFromFile = async (file) => {
  if (!file) {
    return null;
  }

  const previewUrl = await readFileAsDataUrl(file);

  return {
    id: `blog-banner-${file.name}-${file.lastModified}-${previewUrl.length}`,
    name: file.name,
    previewUrl,
    file,
  };
};

export const revokeBlogBannerPreview = (bannerImage) => {
  if (bannerImage?.previewUrl?.startsWith('blob:')) {
    URL.revokeObjectURL(bannerImage.previewUrl);
  }
};
