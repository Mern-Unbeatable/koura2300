import {
  OVERVIEW_LIST_BODY_CLASS,
  OVERVIEW_LIST_ITEM_CLASS,
  OVERVIEW_LIST_NAME_CLASS,
} from './overviewData';
import OverviewAvatarBadge from './OverviewAvatarBadge';
import StarRating from './StarRating';

const ReviewListItem = ({ review }) => (
  <article className={OVERVIEW_LIST_ITEM_CLASS} data-testid={`review-item-${review.id}`}>
    <OverviewAvatarBadge initial={review.initial} name={review.name} />
    <div className="flex min-w-0 flex-1 flex-col gap-1">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <p className={OVERVIEW_LIST_NAME_CLASS}>{review.name}</p>
        <StarRating rating={review.rating} />
      </div>
      <p className={OVERVIEW_LIST_BODY_CLASS}>{review.comment}</p>
    </div>
  </article>
);

export default ReviewListItem;
