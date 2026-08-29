import { renderHook } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { ADMIN_BLOG_FORM_COPY } from '../../components/admin/blogForm/blogFormCopy';
import {
  ADMIN_BLOG_FORM_FIELDS,
  ADMIN_BLOG_FORM_MODE,
} from '../../components/admin/blogForm/blogFormData';
import { ADMIN_BLOG_SEED } from '../../components/admin/blog/blogData';
import { ROUTES } from '../../config';
import useAdminBlogForm from '../useAdminBlogForm';

jest.mock('react-hot-toast', () => ({
  __esModule: true,
  default: {
    success: jest.fn(),
  },
}));

const renderFormHook = (initialPath) =>
  renderHook(() => useAdminBlogForm(), {
    wrapper: ({ children }) => (
      <MemoryRouter initialEntries={[initialPath]}>
        <Routes>
          <Route path={ROUTES.ADMIN_BLOG_NEW} element={children} />
          <Route path={ROUTES.ADMIN_BLOG_EDIT} element={children} />
          <Route path={ROUTES.ADMIN_BLOG} element={<div>blog</div>} />
        </Routes>
      </MemoryRouter>
    ),
  });

describe('useAdminBlogForm', () => {
  it('starts in create mode on the new route', () => {
    const { result } = renderFormHook(ROUTES.ADMIN_BLOG_NEW);

    expect(result.current.mode).toBe(ADMIN_BLOG_FORM_MODE.CREATE);
    expect(result.current.pageTitle).toBe(ADMIN_BLOG_FORM_COPY.titles.create);
    expect(result.current.isNotFound).toBe(false);
    expect(result.current.values[ADMIN_BLOG_FORM_FIELDS.TITLE]).toBe('');
  });

  it('prefills edit mode from the selected blog card', () => {
    const post = ADMIN_BLOG_SEED[0];
    const { result } = renderFormHook(`/admin/blog/${post.id}/edit`);

    expect(result.current.mode).toBe(ADMIN_BLOG_FORM_MODE.EDIT);
    expect(result.current.pageTitle).toBe(ADMIN_BLOG_FORM_COPY.titles.edit);
    expect(result.current.values[ADMIN_BLOG_FORM_FIELDS.TITLE]).toBe(post.title);
    expect(result.current.values[ADMIN_BLOG_FORM_FIELDS.SHORT_DESCRIPTION]).toBe(post.body);
    expect(result.current.values[ADMIN_BLOG_FORM_FIELDS.LONG_DESCRIPTION]).toBe(post.body);
    expect(result.current.values[ADMIN_BLOG_FORM_FIELDS.BANNER_IMAGE]?.previewUrl).toBe(
      post.image,
    );
  });

  it('marks missing edit targets as not found', () => {
    const { result } = renderFormHook('/admin/blog/missing-post/edit');

    expect(result.current.isNotFound).toBe(true);
  });
});
