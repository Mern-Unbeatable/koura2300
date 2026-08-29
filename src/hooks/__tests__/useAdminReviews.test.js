import { act, renderHook } from '@testing-library/react';
import toast from 'react-hot-toast';
import { REVIEWS_COPY } from '../../components/admin/reviews/reviewsCopy';
import {
  REVIEWS_PAGE_SIZE,
  REVIEWS_SEED,
} from '../../components/admin/reviews/reviewsData';
import useAdminReviews from '../useAdminReviews';

jest.mock('react-hot-toast', () => ({
  __esModule: true,
  default: {
    success: jest.fn(),
  },
}));

describe('useAdminReviews', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('seeds reviews with rating summary and moderation subtitle', () => {
    const { result } = renderHook(() => useAdminReviews());

    expect(result.current.reviews).toHaveLength(REVIEWS_PAGE_SIZE);
    expect(REVIEWS_SEED.length).toBeGreaterThan(REVIEWS_PAGE_SIZE);
    expect(result.current.ratingSummary.score).toBe(4.7);
    expect(result.current.moderationSubtitle).toBe('1 reviews awaiting moderation');
    expect(result.current.copy.title).toBe(REVIEWS_COPY.title);
    expect(result.current.pagination.isVisible).toBe(true);
  });

  it('opens the delete confirmation modal instead of deleting immediately', () => {
    const { result } = renderHook(() => useAdminReviews());
    const review = result.current.reviews.find((item) => item.awaitingModeration);

    act(() => {
      result.current.onDeleteReview(review.id);
    });

    expect(result.current.isDeleteModalOpen).toBe(true);
    expect(result.current.deleteReviewerName).toBe(review.name);
    expect(toast.success).not.toHaveBeenCalled();
    expect(result.current.reviews.some((item) => item.id === review.id)).toBe(true);
  });

  it('confirms delete, closes the modal, and updates moderation subtitle', () => {
    const { result } = renderHook(() => useAdminReviews());
    const reviewId = result.current.reviews.find((review) => review.awaitingModeration).id;

    act(() => {
      result.current.onDeleteReview(reviewId);
    });

    act(() => {
      result.current.onConfirmDeleteReview();
    });

    expect(result.current.isDeleteModalOpen).toBe(false);
    expect(result.current.reviews.some((review) => review.id === reviewId)).toBe(false);
    expect(result.current.moderationSubtitle).toBe('0 reviews awaiting moderation');
    expect(toast.success).toHaveBeenCalledWith(REVIEWS_COPY.toasts.deleted);
  });

  it('closes the delete modal without deleting', () => {
    const { result } = renderHook(() => useAdminReviews());
    const reviewId = result.current.reviews[0].id;

    act(() => {
      result.current.onDeleteReview(reviewId);
    });

    act(() => {
      result.current.onCloseDeleteModal();
    });

    expect(result.current.isDeleteModalOpen).toBe(false);
    expect(toast.success).not.toHaveBeenCalled();
    expect(result.current.reviews.some((review) => review.id === reviewId)).toBe(true);
  });

  it('moves through feedback pages of ten reviews', () => {
    const { result } = renderHook(() => useAdminReviews());

    expect(result.current.pagination.canGoPrevious).toBe(false);
    expect(result.current.pagination.canGoNext).toBe(true);

    act(() => {
      result.current.pagination.onNext();
    });

    expect(result.current.pagination.currentPage).toBe(2);
    expect(result.current.reviews.length).toBe(REVIEWS_SEED.length - REVIEWS_PAGE_SIZE);
  });
});
