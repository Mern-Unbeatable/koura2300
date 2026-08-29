import { useCallback, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { buildAdminBlogEditRoute, buildAdminBlogNewRoute } from '../config';
import { ADMIN_BLOG_COPY } from '../components/admin/blog/blogCopy';
import { ADMIN_BLOG_PAGE_SIZE, ADMIN_BLOG_SEED } from '../components/admin/blog/blogData';
import {
  clampPage,
  formatBlogPostsCount,
  getPaginationItems,
  getTotalPages,
  paginatePosts,
  removePostById,
  shouldShowBlogPagination,
} from '../components/admin/blog/blogUtils';

const useAdminBlog = () => {
  const navigate = useNavigate();
  const [posts, setPosts] = useState(ADMIN_BLOG_SEED);
  const [currentPage, setCurrentPage] = useState(1);
  const [pendingDeletePostId, setPendingDeletePostId] = useState(null);

  const totalPages = useMemo(
    () => getTotalPages(posts.length, ADMIN_BLOG_PAGE_SIZE),
    [posts.length],
  );

  const activePage = useMemo(
    () => clampPage(currentPage, totalPages),
    [currentPage, totalPages],
  );

  const paginatedPosts = useMemo(
    () => paginatePosts(posts, activePage, ADMIN_BLOG_PAGE_SIZE),
    [activePage, posts],
  );

  const postsCountLabel = useMemo(
    () => formatBlogPostsCount(posts.length),
    [posts.length],
  );

  const pendingDeletePost = useMemo(
    () => posts.find((post) => post.id === pendingDeletePostId) ?? null,
    [pendingDeletePostId, posts],
  );

  const pagination = useMemo(
    () => ({
      isVisible: shouldShowBlogPagination(posts.length, ADMIN_BLOG_PAGE_SIZE),
      currentPage: activePage,
      totalPages,
      pageItems: getPaginationItems(activePage, totalPages),
      canGoPrevious: activePage > 1,
      canGoNext: activePage < totalPages,
      onPrevious: () => setCurrentPage((page) => clampPage(page - 1, totalPages)),
      onNext: () => setCurrentPage((page) => clampPage(page + 1, totalPages)),
      onPageChange: (page) => setCurrentPage(clampPage(page, totalPages)),
    }),
    [activePage, posts.length, totalPages],
  );

  const handleAddBlog = useCallback(() => {
    navigate(buildAdminBlogNewRoute());
  }, [navigate]);

  const handleEditPost = useCallback(
    (postId) => {
      navigate(buildAdminBlogEditRoute(postId));
    },
    [navigate],
  );

  const handleDeletePost = useCallback((postId) => {
    setPendingDeletePostId(postId);
  }, []);

  const handleCloseDeleteModal = useCallback(() => {
    setPendingDeletePostId(null);
  }, []);

  const handleConfirmDeletePost = useCallback(() => {
    if (!pendingDeletePostId) {
      return;
    }

    setPosts((currentPosts) => removePostById(currentPosts, pendingDeletePostId));
    setPendingDeletePostId(null);
    toast.success(ADMIN_BLOG_COPY.toasts.deleted);
  }, [pendingDeletePostId]);

  return {
    copy: ADMIN_BLOG_COPY,
    postsCountLabel,
    posts: paginatedPosts,
    pagination,
    deletePostTitle: pendingDeletePost?.title ?? '',
    isDeleteModalOpen: Boolean(pendingDeletePostId),
    onAddBlog: handleAddBlog,
    onEditPost: handleEditPost,
    onDeletePost: handleDeletePost,
    onCloseDeleteModal: handleCloseDeleteModal,
    onConfirmDeletePost: handleConfirmDeletePost,
  };
};

export default useAdminBlog;
