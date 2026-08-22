import OverviewPanelCard from './OverviewPanelCard';
import ReviewListItem from './ReviewListItem';

const RecentReviewsCard = ({ title, viewAllLabel, reviews, onViewAll }) => (
  <OverviewPanelCard title={title} actionLabel={viewAllLabel} onAction={onViewAll}>
    <div className="flex flex-col gap-4">
      {reviews.map((review) => (
        <ReviewListItem key={review.id} review={review} />
      ))}
    </div>
  </OverviewPanelCard>
);

export default RecentReviewsCard;
