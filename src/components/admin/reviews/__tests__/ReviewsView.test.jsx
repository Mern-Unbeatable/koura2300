import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ReviewsView from '../ReviewsView';
import { REVIEWS_COPY } from '../reviewsCopy';
import {
  REVIEWS_PAGE_CLASS,
  REVIEWS_RATING_DISTRIBUTION,
  REVIEWS_RATING_SUMMARY,
  REVIEWS_SEED,
  REVIEWS_VIEWPORT,
} from '../reviewsData';

const createReviewsViewProps = (overrides = {}) => ({
  copy: REVIEWS_COPY,
  moderationSubtitle: '1 reviews awaiting moderation',
  ratingSummary: REVIEWS_RATING_SUMMARY,
  ratingDistribution: REVIEWS_RATING_DISTRIBUTION,
  reviews: REVIEWS_SEED,
  onDeleteReview: jest.fn(),
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

  it('keeps responsive page layout tokens for required breakpoints', () => {
    expect(REVIEWS_VIEWPORT.MOBILE_S).toBe(320);
    expect(REVIEWS_VIEWPORT.LAPTOP).toBe(1020);
    expect(REVIEWS_PAGE_CLASS).toContain('flex');
  });
});
