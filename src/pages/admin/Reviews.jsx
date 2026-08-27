import ReviewsView from '../../components/admin/reviews/ReviewsView';
import useAdminReviews from '../../hooks/useAdminReviews';

const Reviews = () => {
  const reviewsProps = useAdminReviews();

  return <ReviewsView {...reviewsProps} />;
};

export default Reviews;
