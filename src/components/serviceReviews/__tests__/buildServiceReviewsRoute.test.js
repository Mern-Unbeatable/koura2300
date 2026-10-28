import { buildServiceReviewsRoute } from '../../../config';

describe('buildServiceReviewsRoute', () => {
  it('builds the service reviews path from a service id', () => {
    expect(buildServiceReviewsRoute('lighting-1')).toBe('/service/lighting-1/reviews');
  });
});
