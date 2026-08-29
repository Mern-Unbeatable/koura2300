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

  it('opens the delete confirmation modal instead of deleting immediately', () => {
    const { result } = renderUseAdminBlog();
    const post = ADMIN_BLOG_SEED[0];

    act(() => {
      result.current.onDeletePost(post.id);
    });

    expect(result.current.isDeleteModalOpen).toBe(true);
    expect(result.current.deletePostTitle).toBe(post.title);
    expect(toast.success).not.toHaveBeenCalled();
    expect(result.current.posts.some((item) => item.id === post.id)).toBe(true);
  });

  it('confirms delete, closes the modal, and shows a success toast', () => {
    const { result } = renderUseAdminBlog();
    const postId = ADMIN_BLOG_SEED[0].id;

    act(() => {
      result.current.onDeletePost(postId);
    });

    act(() => {
      result.current.onConfirmDeletePost();
    });

    expect(result.current.isDeleteModalOpen).toBe(false);
    expect(toast.success).toHaveBeenCalledWith(ADMIN_BLOG_COPY.toasts.deleted);
    expect(result.current.posts.every((post) => post.id !== postId)).toBe(true);
  });

  it('closes the delete modal without deleting', () => {
    const { result } = renderUseAdminBlog();
    const postId = ADMIN_BLOG_SEED[0].id;

    act(() => {
      result.current.onDeletePost(postId);
    });

    act(() => {
      result.current.onCloseDeleteModal();
    });

    expect(result.current.isDeleteModalOpen).toBe(false);
    expect(toast.success).not.toHaveBeenCalled();
    expect(result.current.posts.some((post) => post.id === postId)).toBe(true);
  });
});
