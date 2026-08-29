import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import BlogView from '../BlogView';
import { ADMIN_BLOG_COPY } from '../blogCopy';
import {
  ADMIN_BLOG_GRID_CLASS,
  ADMIN_BLOG_PAGE_CLASS,
  ADMIN_BLOG_PAGE_SIZE,
  ADMIN_BLOG_SEED,
  ADMIN_BLOG_VIEWPORT,
} from '../blogData';
import { getPaginationItems, PAGINATION_ELLIPSIS_TOKEN } from '../blogUtils';

const createBlogViewProps = (overrides = {}) => ({
  copy: ADMIN_BLOG_COPY,
  postsCountLabel: '12 posts',
  posts: ADMIN_BLOG_SEED.slice(0, ADMIN_BLOG_PAGE_SIZE),
  pagination: {
    isVisible: true,
    currentPage: 1,
    totalPages: 10,
    pageItems: getPaginationItems(1, 10),
    canGoPrevious: false,
    canGoNext: true,
    onPrevious: jest.fn(),
    onNext: jest.fn(),
    onPageChange: jest.fn(),
  },
  onAddBlog: jest.fn(),
  onEditPost: jest.fn(),
  onDeletePost: jest.fn(),
  ...overrides,
});

const renderBlogView = (overrides = {}) =>
  render(<BlogView {...createBlogViewProps(overrides)} />);

describe('BlogView', () => {
  it('renders Blog Management header, posts count, and Add new blog from Figma', () => {
    renderBlogView();

    expect(
      screen.getByRole('heading', { level: 1, name: ADMIN_BLOG_COPY.title }),
    ).toBeInTheDocument();
    expect(screen.getByText('12 posts')).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: ADMIN_BLOG_COPY.addButton }),
    ).toBeInTheDocument();
  });

  it('renders post cards with thumbnail, title, excerpt, meta, Edit, and Delete', () => {
    renderBlogView();
    const firstPost = ADMIN_BLOG_SEED[0];
    const card = screen.getByTestId(`blog-post-card-${firstPost.id}`);

    expect(within(card).getByRole('img', { name: firstPost.imageAlt })).toHaveAttribute(
      'src',
      firstPost.image,
    );
    expect(within(card).getByText(firstPost.title)).toBeInTheDocument();
    expect(within(card).getByText(firstPost.body)).toBeInTheDocument();
    expect(
      within(card).getByText(`${firstPost.readTimeLabel} · ${firstPost.author}`),
    ).toBeInTheDocument();
    expect(
      within(card).getByRole('button', { name: ADMIN_BLOG_COPY.editLabel(firstPost.title) }),
    ).toBeInTheDocument();
    expect(
      within(card).getByRole('button', { name: ADMIN_BLOG_COPY.deleteLabel(firstPost.title) }),
    ).toBeInTheDocument();
  });

  it('wires Add, Edit, and Delete handlers', async () => {
    const user = userEvent.setup();
    const onAddBlog = jest.fn();
    const onEditPost = jest.fn();
    const onDeletePost = jest.fn();
    const post = ADMIN_BLOG_SEED[0];

    renderBlogView({ onAddBlog, onEditPost, onDeletePost });

    await user.click(screen.getByRole('button', { name: ADMIN_BLOG_COPY.addButton }));
    await user.click(
      screen.getByRole('button', { name: ADMIN_BLOG_COPY.editLabel(post.title) }),
    );
    await user.click(
      screen.getByRole('button', { name: ADMIN_BLOG_COPY.deleteLabel(post.title) }),
    );

    expect(onAddBlog).toHaveBeenCalledTimes(1);
    expect(onEditPost).toHaveBeenCalledWith(post.id);
    expect(onDeletePost).toHaveBeenCalledWith(post.id);
  });

  it('renders Figma numbered pagination with Prev, Next, and ellipsis', async () => {
    const user = userEvent.setup();
    const onNext = jest.fn();

    renderBlogView({
      pagination: {
        isVisible: true,
        currentPage: 1,
        totalPages: 10,
        pageItems: getPaginationItems(1, 10),
        canGoPrevious: false,
        canGoNext: true,
        onPrevious: jest.fn(),
        onNext,
        onPageChange: jest.fn(),
      },
    });

    const pagination = screen.getByTestId('admin-blog-pagination');

    expect(screen.getByRole('button', { name: ADMIN_BLOG_COPY.pagination.previous })).toBeDisabled();
    expect(screen.getByRole('button', { name: ADMIN_BLOG_COPY.pagination.next })).toBeEnabled();
    expect(within(pagination).getByText(ADMIN_BLOG_COPY.pagination.ellipsis)).toBeInTheDocument();
    expect(within(pagination).getByRole('button', { name: 'Go to page 10' })).toBeInTheDocument();
    expect(getPaginationItems(1, 10)).toContain(PAGINATION_ELLIPSIS_TOKEN);

    await user.click(screen.getByRole('button', { name: ADMIN_BLOG_COPY.pagination.next }));
    expect(onNext).toHaveBeenCalled();
  });

  it('hides pagination when results fit on one page', () => {
    renderBlogView({
      posts: ADMIN_BLOG_SEED.slice(0, ADMIN_BLOG_PAGE_SIZE),
      pagination: {
        isVisible: false,
        currentPage: 1,
        totalPages: 1,
        pageItems: [1],
        canGoPrevious: false,
        canGoNext: false,
        onPrevious: jest.fn(),
        onNext: jest.fn(),
        onPageChange: jest.fn(),
      },
    });

    expect(screen.queryByTestId('admin-blog-pagination')).not.toBeInTheDocument();
  });

  it('keeps responsive page layout tokens for required breakpoints', () => {
    expect(ADMIN_BLOG_VIEWPORT.MOBILE_S).toBe(320);
    expect(ADMIN_BLOG_VIEWPORT.MOBILE_M).toBe(375);
    expect(ADMIN_BLOG_VIEWPORT.MOBILE_L).toBe(425);
    expect(ADMIN_BLOG_VIEWPORT.TABLET).toBe(768);
    expect(ADMIN_BLOG_VIEWPORT.LAPTOP).toBe(1020);
    expect(ADMIN_BLOG_VIEWPORT.DESKTOP).toBe(1440);
    expect(ADMIN_BLOG_PAGE_CLASS).toContain('flex');
    expect(ADMIN_BLOG_PAGE_CLASS).toContain('min-[1020px]');
    expect(ADMIN_BLOG_GRID_CLASS).toContain('min-[768px]:grid-cols-2');
    expect(ADMIN_BLOG_GRID_CLASS).toContain('min-[1440px]:grid-cols-3');
    expect(ADMIN_BLOG_GRID_CLASS).not.toContain('min-[1020px]:grid-cols-3');
  });
});
