import { ADMIN_BLOG_SEED } from '../../blog/blogData';
import {
  ADMIN_BLOG_FORM_EMPTY_VALUES,
  ADMIN_BLOG_FORM_FIELDS,
  ADMIN_BLOG_FORM_MODE,
  ADMIN_BLOG_FORM_PAGE_CLASS,
  ADMIN_BLOG_FORM_VIEWPORT,
} from '../blogFormData';
import {
  createBlogBannerImageFromFile,
  createBlogFormValues,
  getAdminBlogFormPostById,
  getAdminBlogFormTitle,
  isBlogFormReady,
  resolveAdminBlogFormMode,
  validateBlogForm,
} from '../blogFormUtils';
import { ADMIN_BLOG_FORM_COPY } from '../blogFormCopy';

describe('blogFormUtils', () => {
  it('creates empty form values for a new blog', () => {
    expect(createBlogFormValues()).toEqual(ADMIN_BLOG_FORM_EMPTY_VALUES);
  });

  it('prefills form values from an existing blog card', () => {
    const post = ADMIN_BLOG_SEED[0];
    const values = createBlogFormValues(post);

    expect(values[ADMIN_BLOG_FORM_FIELDS.TITLE]).toBe(post.title);
    expect(values[ADMIN_BLOG_FORM_FIELDS.SHORT_DESCRIPTION]).toBe(post.body);
    expect(values[ADMIN_BLOG_FORM_FIELDS.LONG_DESCRIPTION]).toBe(post.body);
    expect(values[ADMIN_BLOG_FORM_FIELDS.BANNER_IMAGE]).toEqual({
      id: `existing-blog-banner-${post.id}`,
      name: 'banner',
      previewUrl: post.image,
      isExisting: true,
    });
  });

  it('resolves create vs edit mode and page title', () => {
    expect(resolveAdminBlogFormMode(undefined)).toBe(ADMIN_BLOG_FORM_MODE.CREATE);
    expect(resolveAdminBlogFormMode('plumbing')).toBe(ADMIN_BLOG_FORM_MODE.EDIT);
    expect(getAdminBlogFormTitle(ADMIN_BLOG_FORM_MODE.CREATE)).toBe(
      ADMIN_BLOG_FORM_COPY.titles.create,
    );
    expect(getAdminBlogFormTitle(ADMIN_BLOG_FORM_MODE.EDIT)).toBe(
      ADMIN_BLOG_FORM_COPY.titles.edit,
    );
    expect(getAdminBlogFormPostById('plumbing')).toEqual(
      expect.objectContaining({ id: 'plumbing' }),
    );
    expect(getAdminBlogFormPostById('missing')).toBeNull();
  });

  it('creates a banner preview from a file as a data URL', async () => {
    const file = new File(['banner'], 'banner.png', { type: 'image/png' });
    const banner = await createBlogBannerImageFromFile(file);

    expect(banner.name).toBe('banner.png');
    expect(banner.previewUrl).toMatch(/^data:image\/png;base64,/);
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
        [ADMIN_BLOG_FORM_FIELDS.TITLE]: '5 Signs Your Home Needs a Plumbing Repair',
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
