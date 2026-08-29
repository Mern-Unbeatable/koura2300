import { ADMIN_BLOG_SEED } from '../blog/blogData';
import { ADMIN_BLOG_FORM_COPY } from './blogFormCopy';
import {
  ADMIN_BLOG_FORM_BANNER_MAX_FILES,
  ADMIN_BLOG_FORM_EMPTY_VALUES,
  ADMIN_BLOG_FORM_FIELDS,
  ADMIN_BLOG_FORM_MODE,
} from './blogFormData';
import { readFileAsDataUrl } from '../serviceForm/adminServiceFormUtils';

export const resolveAdminBlogFormMode = (blogId) =>
  blogId ? ADMIN_BLOG_FORM_MODE.EDIT : ADMIN_BLOG_FORM_MODE.CREATE;

export const getAdminBlogFormTitle = (mode) =>
  mode === ADMIN_BLOG_FORM_MODE.EDIT
    ? ADMIN_BLOG_FORM_COPY.titles.edit
    : ADMIN_BLOG_FORM_COPY.titles.create;

export const getAdminBlogFormSeo = (mode) =>
  mode === ADMIN_BLOG_FORM_MODE.EDIT
    ? ADMIN_BLOG_FORM_COPY.seo.edit
    : ADMIN_BLOG_FORM_COPY.seo.create;

export const getAdminBlogFormPostById = (blogId) =>
  ADMIN_BLOG_SEED.find((post) => post.id === blogId) ?? null;

export const createBlogFormValues = (post) => {
  if (!post) {
    return { ...ADMIN_BLOG_FORM_EMPTY_VALUES };
  }

  const shortDescription = post.body ?? '';
  const longDescription = post.longDescription ?? shortDescription;

  return {
    ...ADMIN_BLOG_FORM_EMPTY_VALUES,
    [ADMIN_BLOG_FORM_FIELDS.TITLE]: post.title ?? '',
    [ADMIN_BLOG_FORM_FIELDS.SHORT_DESCRIPTION]: shortDescription,
    [ADMIN_BLOG_FORM_FIELDS.LONG_DESCRIPTION]: longDescription,
    [ADMIN_BLOG_FORM_FIELDS.BANNER_IMAGE]: post.image
      ? {
          id: `existing-blog-banner-${post.id}`,
          name: 'banner',
          previewUrl: post.image,
          isExisting: true,
        }
      : null,
  };
};

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
    isExisting: false,
  };
};

export const revokeBlogBannerPreview = (bannerImage) => {
  if (
    bannerImage?.previewUrl?.startsWith('blob:') &&
    !bannerImage.isExisting
  ) {
    URL.revokeObjectURL(bannerImage.previewUrl);
  }
};
