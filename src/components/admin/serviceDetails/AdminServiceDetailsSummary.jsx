import { memo } from 'react';
import { Clock3 } from 'lucide-react';
import ServiceRatingStars from '../../serviceDetails/ServiceRatingStars';
import {
  ADMIN_SERVICE_DETAILS_BADGES_CLASS,
  ADMIN_SERVICE_DETAILS_CATEGORY_BADGE_CLASS,
  ADMIN_SERVICE_DETAILS_CLOCK_ICON_SIZE,
  ADMIN_SERVICE_DETAILS_DURATION_META_CLASS,
  ADMIN_SERVICE_DETAILS_META_CLASS,
  ADMIN_SERVICE_DETAILS_OVERVIEW_CLASS,
  ADMIN_SERVICE_DETAILS_RATING_COUNT_TEXT_CLASS,
  ADMIN_SERVICE_DETAILS_RATING_META_CLASS,
  ADMIN_SERVICE_DETAILS_RATING_SCORE_TEXT_CLASS,
  ADMIN_SERVICE_DETAILS_SUBCATEGORY_BADGE_CLASS,
  ADMIN_SERVICE_DETAILS_TITLE_CLASS,
} from './adminServiceDetailsData';
import { parseServiceRatingLabel } from './adminServiceDetailsUtils';
import AdminServiceDetailsPackages from './AdminServiceDetailsPackages';

const AdminServiceDetailsSummary = memo(
  ({
    copy,
    catalogTitle,
    subcategory,
    title,
    overview,
    duration,
    rating,
    packages,
  }) => {
    const { scoreLabel, countLabel } = parseServiceRatingLabel(rating);

    return (
      <div className="flex min-w-0 flex-col gap-5">
        <div className={ADMIN_SERVICE_DETAILS_BADGES_CLASS}>
          {catalogTitle ? (
            <span className={ADMIN_SERVICE_DETAILS_CATEGORY_BADGE_CLASS}>{catalogTitle}</span>
          ) : null}
          {subcategory ? (
            <span className={ADMIN_SERVICE_DETAILS_SUBCATEGORY_BADGE_CLASS}>{subcategory}</span>
          ) : null}
        </div>

        <div className="flex min-w-0 flex-col gap-3">
          <h1 className={ADMIN_SERVICE_DETAILS_TITLE_CLASS}>{title}</h1>
          <div className={ADMIN_SERVICE_DETAILS_META_CLASS}>
            <span className={ADMIN_SERVICE_DETAILS_RATING_META_CLASS}>
              <ServiceRatingStars />
              <span className={ADMIN_SERVICE_DETAILS_RATING_SCORE_TEXT_CLASS}>
                {scoreLabel}
                {countLabel ? ' ' : ''}
                {countLabel ? (
                  <span className={ADMIN_SERVICE_DETAILS_RATING_COUNT_TEXT_CLASS}>
                    {countLabel}
                  </span>
                ) : null}
              </span>
            </span>
            <span className={ADMIN_SERVICE_DETAILS_DURATION_META_CLASS}>
              <Clock3 size={ADMIN_SERVICE_DETAILS_CLOCK_ICON_SIZE} aria-hidden="true" />
              {duration}
            </span>
          </div>
          <p className={ADMIN_SERVICE_DETAILS_OVERVIEW_CLASS}>{overview}</p>
        </div>
        <AdminServiceDetailsPackages copy={copy} packages={packages} />
      </div>
    );
  },
);

AdminServiceDetailsSummary.displayName = 'AdminServiceDetailsSummary';

export default AdminServiceDetailsSummary;
