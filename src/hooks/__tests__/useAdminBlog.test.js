import { act, renderHook } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import toast from 'react-hot-toast';
import { ADMIN_BLOG_COPY } from '../../components/admin/blog/blogCopy';
import { ADMIN_BLOG_SEED } from '../../components/admin/blog/blogData';
import { buildAdminBlogEditRoute, buildAdminBlogNewRoute } from '../../config';
import useAdminBlog from '../useAdminBlog';

const mockNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate,
}));

jest.mock('react-hot-toast', () => ({
  __esModule: true,
  default: {
    success: jest.fn(),
  },
}));

const renderUseAdminBlog = () =>
  renderHook(() => useAdminBlog(), {
    wrapper: ({ children }) => <MemoryRouter>{children}</MemoryRouter>,
  });

describe('useAdminBlog', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('navigates to the add blog form', () => {
    const { result } = renderUseAdminBlog();

    act(() => {
      result.current.onAddBlog();
    });

    expect(mockNavigate).toHaveBeenCalledWith(buildAdminBlogNewRoute());
  });

  it('navigates to the edit blog form for a card', () => {
    const { result } = renderUseAdminBlog();
    const postId = ADMIN_BLOG_SEED[0].id;

    act(() => {
      result.current.onEditPost(postId);
    });

    expect(mockNavigate).toHaveBeenCalledWith(buildAdminBlogEditRoute(postId));
  });

  it('deletes a post and shows a success toast', () => {
    const { result } = renderUseAdminBlog();
    const postId = ADMIN_BLOG_SEED[0].id;

    act(() => {
      result.current.onDeletePost(postId);
    });

    expect(toast.success).toHaveBeenCalledWith(ADMIN_BLOG_COPY.toasts.deleted);
    expect(result.current.posts.every((post) => post.id !== postId)).toBe(true);
  });
});
