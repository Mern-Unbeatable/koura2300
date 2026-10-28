import {
  formatReviewCount,
  formatReviewCountLabel,
  formatReviewPercent,
  getServiceReviewsPayload,
  SERVICE_REVIEWS_BREAKDOWN,
  SERVICE_REVIEWS_FEEDBACK,
  SERVICE_REVIEWS_SUMMARY,
} from '../serviceReviewsData';

describe('serviceReviewsData', () => {
  it('formats counts and percents for the Figma summary', () => {
    expect(formatReviewCount(SERVICE_REVIEWS_SUMMARY.totalCount)).toBe('934,516');
    expect(formatReviewCountLabel(94532)).toBe('(94,532)');
    expect(formatReviewPercent(63)).toBe('63%');
  });

  it('returns the seeded review payload for a service id', () => {
    const payload = getServiceReviewsPayload('lighting-1');

    expect(payload.serviceId).toBe('lighting-1');
    expect(payload.summary.average).toBe(4.7);
    expect(payload.breakdown).toHaveLength(SERVICE_REVIEWS_BREAKDOWN.length);
    expect(payload.feedback).toHaveLength(SERVICE_REVIEWS_FEEDBACK.length);
    expect(payload.feedback[0].name).toBe('Darrell Steward');
  });

  it('returns null without a service id', () => {
    expect(getServiceReviewsPayload()).toBeNull();
    expect(getServiceReviewsPayload('')).toBeNull();
  });
});
