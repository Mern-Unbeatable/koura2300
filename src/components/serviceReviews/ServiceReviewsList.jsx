import React, { memo } from 'react';
import ServiceReviewsStars from './ServiceReviewsStars';
import {
  SERVICE_REVIEWS_AUTHOR_DOT_CLASS,
  SERVICE_REVIEWS_AUTHOR_META_CLASS,
  SERVICE_REVIEWS_AUTHOR_NAME_CLASS,
  SERVICE_REVIEWS_AUTHOR_ROW_CLASS,
  SERVICE_REVIEWS_AUTHOR_TIME_CLASS,
  SERVICE_REVIEWS_AVATAR_CLASS,
  SERVICE_REVIEWS_AVATAR_SIZE,
  SERVICE_REVIEWS_BODY_CLASS,
  SERVICE_REVIEWS_FEEDBACK_STAR_SIZE,
  SERVICE_REVIEWS_ITEM_CLASS,
  SERVICE_REVIEWS_ITEM_HEADER_CLASS,
  SERVICE_REVIEWS_ITEMS_CLASS,
  SERVICE_REVIEWS_LIST_CLASS,
  SERVICE_REVIEWS_LIST_TITLE_CLASS,
} from './serviceReviewsData';

const ServiceReviewItem = memo(({ review }) => (
  <article className={SERVICE_REVIEWS_ITEM_CLASS} aria-label={`Review by ${review.name}`}>
    <div className={SERVICE_REVIEWS_ITEM_HEADER_CLASS}>
      <img
        src={review.avatarSrc}
        alt=""
        width={SERVICE_REVIEWS_AVATAR_SIZE}
        height={SERVICE_REVIEWS_AVATAR_SIZE}
        className={SERVICE_REVIEWS_AVATAR_CLASS}
      />
      <div className={SERVICE_REVIEWS_AUTHOR_META_CLASS}>
        <div className={SERVICE_REVIEWS_AUTHOR_ROW_CLASS}>
          <span className={SERVICE_REVIEWS_AUTHOR_NAME_CLASS}>{review.name}</span>
          <span className={SERVICE_REVIEWS_AUTHOR_DOT_CLASS} aria-hidden="true">
            •
          </span>
          <span className={SERVICE_REVIEWS_AUTHOR_TIME_CLASS}>{review.timeLabel}</span>
        </div>
        <ServiceReviewsStars
          rating={review.rating}
          size={SERVICE_REVIEWS_FEEDBACK_STAR_SIZE}
          label={`${review.rating} out of 5`}
        />
      </div>
    </div>
    <p className={SERVICE_REVIEWS_BODY_CLASS}>{review.body}</p>
  </article>
));

ServiceReviewItem.displayName = 'ServiceReviewItem';

const ServiceReviewsList = memo(({ copy, feedback }) => (
  <section className={SERVICE_REVIEWS_LIST_CLASS} aria-label={copy.heading}>
    <h1 className={SERVICE_REVIEWS_LIST_TITLE_CLASS}>{copy.heading}</h1>
    <div className={SERVICE_REVIEWS_ITEMS_CLASS}>
      {feedback.map((review) => (
        <ServiceReviewItem key={review.id} review={review} />
      ))}
    </div>
  </section>
));

ServiceReviewsList.displayName = 'ServiceReviewsList';

export default ServiceReviewsList;
