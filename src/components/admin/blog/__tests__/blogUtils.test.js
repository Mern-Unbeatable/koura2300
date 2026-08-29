import {
  clampPage,
  formatBlogPostsCount,
  formatReadMinutesLabel,
  getPaginationItems,
  getTotalPages,
  paginatePosts,
  removePostById,
  shouldShowBlogPagination,
  PAGINATION_ELLIPSIS_TOKEN,
} from '../blogUtils';
import { ADMIN_BLOG_PAGE_SIZE, ADMIN_BLOG_SEED } from '../blogData';

describe('admin blogUtils', () => {
  it('formats the posts count subtitle from Figma', () => {
    expect(formatBlogPostsCount(0)).toBe('0 posts');
    expect(formatBlogPostsCount(1)).toBe('1 post');
    expect(formatBlogPostsCount(6)).toBe('6 posts');
  });

  it('formats read time labels as Minutes', () => {
    expect(formatReadMinutesLabel(10)).toBe('10 Minutes');
    expect(formatReadMinutesLabel(1)).toBe('1 Minutes');
  });

  it('paginates posts with a page size of twelve', () => {
    const pageOne = paginatePosts(ADMIN_BLOG_SEED, 1, ADMIN_BLOG_PAGE_SIZE);

    expect(ADMIN_BLOG_PAGE_SIZE).toBe(12);
    expect(pageOne).toHaveLength(Math.min(ADMIN_BLOG_SEED.length, ADMIN_BLOG_PAGE_SIZE));
    expect(getTotalPages(ADMIN_BLOG_SEED.length, ADMIN_BLOG_PAGE_SIZE)).toBe(1);
    expect(getTotalPages(13, ADMIN_BLOG_PAGE_SIZE)).toBe(2);
  });

  it('builds Figma pagination items with ellipsis for ten pages', () => {
    expect(getPaginationItems(1, 2)).toEqual([1, 2]);
    expect(getPaginationItems(1, 10)).toEqual([1, 2, 3, PAGINATION_ELLIPSIS_TOKEN, 10]);
    expect(getPaginationItems(10, 10)).toEqual([1, PAGINATION_ELLIPSIS_TOKEN, 8, 9, 10]);
  });

  it('clamps pages and shows pagination only when posts exceed twelve', () => {
    expect(clampPage(0, 3)).toBe(1);
    expect(clampPage(9, 3)).toBe(3);
    expect(shouldShowBlogPagination(0, ADMIN_BLOG_PAGE_SIZE)).toBe(false);
    expect(shouldShowBlogPagination(12, ADMIN_BLOG_PAGE_SIZE)).toBe(false);
    expect(shouldShowBlogPagination(13, ADMIN_BLOG_PAGE_SIZE)).toBe(true);
  });

  it('removes a post by id without mutating the source list', () => {
    const [firstPost] = ADMIN_BLOG_SEED;
    const nextPosts = removePostById(ADMIN_BLOG_SEED, firstPost.id);

    expect(nextPosts).toHaveLength(ADMIN_BLOG_SEED.length - 1);
    expect(nextPosts.find((post) => post.id === firstPost.id)).toBeUndefined();
    expect(ADMIN_BLOG_SEED.find((post) => post.id === firstPost.id)).toBeDefined();
  });
});
