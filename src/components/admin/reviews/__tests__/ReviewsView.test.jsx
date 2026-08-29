import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ReviewsView from '../ReviewsView';
import { REVIEWS_COPY } from '../reviewsCopy';
import {
  REVIEWS_PAGE_CLASS,
  REVIEWS_PAGE_SIZE,
  REVIEWS_RATING_DISTRIBUTION,
  REVIEWS_RATING_SUMMARY,
  REVIEWS_SEED,
  REVIEWS_VIEWPORT,
} from '../reviewsData';
import { getPaginationItems, PAGINATION_ELLIPSIS_TOKEN } from '../reviewsUtils';

const createReviewsViewProps = (overrides = {}) => ({
  copy: REVIEWS_COPY,
  moderationSubtitle: '1 reviews awaiting moderation',
  ratingSummary: REVIEWS_RATING_SUMMARY,
  ratingDistribution: REVIEWS_RATING_DISTRIBUTION,
  reviews: REVIEWS_SEED.slice(0, REVIEWS_PAGE_SIZE),
  pagination: {
    isVisible: true,
    currentPage: 1,
    totalPages: 2,
    pageItems: getPaginationItems(1, 2),
    canGoPrevious: false,
    canGoNext: true,
    onPrevious: jest.fn(),
    onNext: jest.fn(),
    onPageChange: jest.fn(),
  },
  deleteReviewerName: '',
  isDeleteModalOpen: false,
  onDeleteReview: jest.fn(),
  onCloseDeleteModal: jest.fn(),
  onConfirmDeleteReview: jest.fn(),
  ...overrides,
});

const renderReviewsView = (overrides = {}) =>
  render(<ReviewsView {...createReviewsViewProps(overrides)} />);

describe('ReviewsView', () => {
  it('renders the Review Management header from Figma', () => {
    renderReviewsView();

    expect(screen.getByRole('heading', { level: 1, name: REVIEWS_COPY.title })).toBeInTheDocument();
    expect(screen.getByText('1 reviews awaiting moderation')).toBeInTheDocument();
  });

  it('renders the customer rating summary and distribution bars', () => {
    renderReviewsView();

    expect(screen.getByText(String(REVIEWS_RATING_SUMMARY.score))).toBeInTheDocument();
    expect(screen.getByText(REVIEWS_RATING_SUMMARY.totalLabel)).toBeInTheDocument();
    expect(screen.getByText(`${REVIEWS_RATING_DISTRIBUTION[0].percent}%`)).toBeInTheDocument();
    expect(screen.getByRole('region', { name: REVIEWS_COPY.rating.regionLabel })).toBeInTheDocument();
  });

  it('renders customer feedback rows with service name and delete actions', () => {
    renderReviewsView();
    const firstReview = REVIEWS_SEED[0];

    const firstReviewItem = screen.getByTestId(`review-item-${firstReview.id}`);

    expect(
      screen.getByRole('heading', { level: 2, name: REVIEWS_COPY.feedback.title }),
    ).toBeInTheDocument();
    expect(within(firstReviewItem).getByText(firstReview.name)).toBeInTheDocument();
    expect(within(firstReviewItem).getByText(firstReview.serviceName)).toBeInTheDocument();
    expect(within(firstReviewItem).getByText(firstReview.comment)).toBeInTheDocument();
    expect(
      screen.getByRole('button', {
        name: REVIEWS_COPY.feedback.deleteLabel(firstReview.name),
      }),
    ).toBeInTheDocument();
  });

  it('wires delete review handler', async () => {
    const user = userEvent.setup();
    const onDeleteReview = jest.fn();
    const review = REVIEWS_SEED[1];
    renderReviewsView({ onDeleteReview });

    await user.click(
      screen.getByRole('button', { name: REVIEWS_COPY.feedback.deleteLabel(review.name) }),
    );

    expect(onDeleteReview).toHaveBeenCalledWith(review.id);
  });

  it('renders shared Service Management pagination when more than ten reviews', async () => {
    const user = userEvent.setup();
    const onNext = jest.fn();

    renderReviewsView({
      pagination: {
        isVisible: true,
        currentPage: 1,
        totalPages: 2,
        pageItems: getPaginationItems(1, 2),
        canGoPrevious: false,
        canGoNext: true,
        onPrevious: jest.fn(),
        onNext,
        onPageChange: jest.fn(),
      },
    });

    const pagination = screen.getByTestId('reviews-pagination');
    expect(pagination).toHaveAttribute('aria-label', REVIEWS_COPY.pagination.regionLabel);
    expect(screen.getByRole('button', { name: REVIEWS_COPY.pagination.previous })).toBeDisabled();
    expect(screen.getByRole('button', { name: REVIEWS_COPY.pagination.next })).toBeEnabled();

    await user.click(screen.getByRole('button', { name: REVIEWS_COPY.pagination.next }));
    expect(onNext).toHaveBeenCalledTimes(1);
    expect(getPaginationItems(1, 10)).toContain(PAGINATION_ELLIPSIS_TOKEN);
  });

  it('hides pagination when feedback fits on one page', () => {
    renderReviewsView({
      reviews: REVIEWS_SEED.slice(0, REVIEWS_PAGE_SIZE),
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

    expect(screen.queryByTestId('reviews-pagination')).not.toBeInTheDocument();
  });

  it('renders the animated delete confirmation modal when open', async () => {
    const user = userEvent.setup();
    const onCloseDeleteModal = jest.fn();
    const onConfirmDeleteReview = jest.fn();
    const review = REVIEWS_SEED[0];

    renderReviewsView({
      isDeleteModalOpen: true,
      deleteReviewerName: review.name,
      onCloseDeleteModal,
      onConfirmDeleteReview,
    });

    expect(
      screen.getByRole('dialog', { name: REVIEWS_COPY.deleteModal.regionLabel }),
    ).toBeInTheDocument();
    expect(screen.getByTestId('reviews-delete-overlay').className).toContain('animate-fade-in');

    await user.click(
      screen.getByRole('button', { name: REVIEWS_COPY.deleteModal.confirm }),
    );
    expect(onConfirmDeleteReview).toHaveBeenCalledTimes(1);

    await user.click(
      screen.getByRole('button', { name: REVIEWS_COPY.deleteModal.cancel }),
    );
    expect(onCloseDeleteModal).toHaveBeenCalledTimes(1);
  });

  it('keeps responsive page layout tokens for required breakpoints', () => {
    expect(REVIEWS_VIEWPORT.MOBILE_S).toBe(320);
    expect(REVIEWS_VIEWPORT.LAPTOP).toBe(1020);
    expect(REVIEWS_PAGE_CLASS).toContain('flex');
    expect(REVIEWS_PAGE_SIZE).toBe(10);
  });
});
