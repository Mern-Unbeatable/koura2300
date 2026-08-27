import { act, renderHook } from '@testing-library/react';
import toast from 'react-hot-toast';
import { REVIEWS_COPY } from '../../components/admin/reviews/reviewsCopy';
import { REVIEWS_SEED } from '../../components/admin/reviews/reviewsData';
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

    expect(result.current.reviews).toHaveLength(REVIEWS_SEED.length);
    expect(result.current.ratingSummary.score).toBe(4.7);
    expect(result.current.moderationSubtitle).toBe('1 reviews awaiting moderation');
    expect(result.current.copy.title).toBe(REVIEWS_COPY.title);
  });

  it('deletes a review and updates moderation subtitle', () => {
    const { result } = renderHook(() => useAdminReviews());
    const reviewId = result.current.reviews.find((review) => review.awaitingModeration).id;

    act(() => {
      result.current.onDeleteReview(reviewId);
    });

    expect(result.current.reviews.some((review) => review.id === reviewId)).toBe(false);
    expect(result.current.moderationSubtitle).toBe('0 reviews awaiting moderation');
    expect(toast.success).toHaveBeenCalledWith(REVIEWS_COPY.toasts.deleted);
  });
});
