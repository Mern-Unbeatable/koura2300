import { REVIEWS_COPY } from '../reviewsCopy';
import {
  REVIEWS_RATING_DISTRIBUTION,
  REVIEWS_RATING_SUMMARY,
  REVIEWS_SEED,
} from '../reviewsData';
import {
  countAwaitingModeration,
  getModerationSubtitle,
  removeReviewById,
} from '../reviewsUtils';

describe('reviewsUtils', () => {
  it('counts reviews awaiting moderation', () => {
    expect(countAwaitingModeration(REVIEWS_SEED)).toBe(1);
    expect(
      countAwaitingModeration([
        { id: 'a', awaitingModeration: false },
        { id: 'b', awaitingModeration: true },
      ]),
    ).toBe(1);
  });

  it('builds the moderation subtitle from Figma copy', () => {
    expect(getModerationSubtitle(1)).toBe('1 reviews awaiting moderation');
    expect(getModerationSubtitle(0)).toBe('0 reviews awaiting moderation');
  });

  it('removes a review immutably by id', () => {
    const nextReviews = removeReviewById(REVIEWS_SEED, REVIEWS_SEED[0].id);

    expect(nextReviews).toHaveLength(REVIEWS_SEED.length - 1);
    expect(nextReviews.some((review) => review.id === REVIEWS_SEED[0].id)).toBe(false);
    expect(REVIEWS_SEED).toHaveLength(12);
  });

  it('exposes Figma rating summary and distribution seed', () => {
    expect(REVIEWS_RATING_SUMMARY.score).toBe(4.7);
    expect(REVIEWS_RATING_SUMMARY.hasHalfStar).toBe(true);
    expect(REVIEWS_RATING_DISTRIBUTION).toHaveLength(5);
    expect(REVIEWS_SEED[0].name).toBe('Leslie Alexander');
  });
});
