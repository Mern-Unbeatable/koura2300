import {
  ADMIN_BLOG_FORM_EMPTY_VALUES,
  ADMIN_BLOG_FORM_FIELDS,
  ADMIN_BLOG_FORM_PAGE_CLASS,
  ADMIN_BLOG_FORM_VIEWPORT,
} from '../blogFormData';
import {
  createBlogFormValues,
  isBlogFormReady,
  validateBlogForm,
} from '../blogFormUtils';
import { ADMIN_BLOG_FORM_COPY } from '../blogFormCopy';

describe('blogFormUtils', () => {
  it('creates empty form values for a new blog', () => {
    expect(createBlogFormValues()).toEqual(ADMIN_BLOG_FORM_EMPTY_VALUES);
  });

  it('requires title, short description, long description, and banner image', () => {
    const errors = validateBlogForm(ADMIN_BLOG_FORM_EMPTY_VALUES);

    expect(errors[ADMIN_BLOG_FORM_FIELDS.TITLE]).toBe(
      ADMIN_BLOG_FORM_COPY.errors.titleRequired,
    );
    expect(errors[ADMIN_BLOG_FORM_FIELDS.SHORT_DESCRIPTION]).toBe(
      ADMIN_BLOG_FORM_COPY.errors.shortDescriptionRequired,
    );
    expect(errors[ADMIN_BLOG_FORM_FIELDS.LONG_DESCRIPTION]).toBe(
      ADMIN_BLOG_FORM_COPY.errors.longDescriptionRequired,
    );
    expect(errors[ADMIN_BLOG_FORM_FIELDS.BANNER_IMAGE]).toBe(
      ADMIN_BLOG_FORM_COPY.errors.bannerRequired,
    );
  });

  it('marks the form ready only when all required fields are filled', () => {
    expect(isBlogFormReady(ADMIN_BLOG_FORM_EMPTY_VALUES)).toBe(false);

    expect(
      isBlogFormReady({
        [ADMIN_BLOG_FORM_FIELDS.TITLE]: 'Portland Cement Quick Set',
        [ADMIN_BLOG_FORM_FIELDS.SHORT_DESCRIPTION]: 'Short copy',
        [ADMIN_BLOG_FORM_FIELDS.LONG_DESCRIPTION]: 'Long copy',
        [ADMIN_BLOG_FORM_FIELDS.BANNER_IMAGE]: {
          id: 'banner-1',
          previewUrl: 'blob:banner',
        },
      }),
    ).toBe(true);
  });

  it('keeps responsive page layout tokens for required breakpoints', () => {
    expect(ADMIN_BLOG_FORM_VIEWPORT.MOBILE_S).toBe(320);
    expect(ADMIN_BLOG_FORM_VIEWPORT.MOBILE_M).toBe(375);
    expect(ADMIN_BLOG_FORM_VIEWPORT.MOBILE_L).toBe(425);
    expect(ADMIN_BLOG_FORM_VIEWPORT.TABLET).toBe(768);
    expect(ADMIN_BLOG_FORM_VIEWPORT.LAPTOP).toBe(1020);
    expect(ADMIN_BLOG_FORM_PAGE_CLASS).toContain('flex');
    expect(ADMIN_BLOG_FORM_PAGE_CLASS).toContain('min-[1020px]');
  });
});
