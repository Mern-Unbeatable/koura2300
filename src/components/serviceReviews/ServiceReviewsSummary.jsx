import React, { memo } from 'react';
import ServiceReviewsStars from './ServiceReviewsStars';
import {
  formatReviewCountLabel,
  SERVICE_REVIEWS_BREAKDOWN_CLASS,
  SERVICE_REVIEWS_BREAKDOWN_ROW_CLASS,
  SERVICE_REVIEWS_BREAKDOWN_STAR_SIZE,
  SERVICE_REVIEWS_COUNT_CLASS,
  SERVICE_REVIEWS_PERCENT_CLASS,
  SERVICE_REVIEWS_PROGRESS_FILL_CLASS,
  SERVICE_REVIEWS_PROGRESS_TRACK_CLASS,
  SERVICE_REVIEWS_SCORE_CARD_CLASS,
  SERVICE_REVIEWS_SCORE_COUNT_CLASS,
  SERVICE_REVIEWS_SCORE_LABEL_CLASS,
  SERVICE_REVIEWS_SCORE_VALUE_CLASS,
  SERVICE_REVIEWS_SUMMARY_ROW_CLASS,
  SERVICE_REVIEWS_SUMMARY_STAR_SIZE,
  formatReviewPercent,
} from './serviceReviewsData';

const BreakdownRow = memo(({ row }) => (
  <div className={SERVICE_REVIEWS_BREAKDOWN_ROW_CLASS}>
    <ServiceReviewsStars
      rating={row.stars}
      size={SERVICE_REVIEWS_BREAKDOWN_STAR_SIZE}
      label={`${row.stars} stars`}
    />
    <div
      className={SERVICE_REVIEWS_PROGRESS_TRACK_CLASS}
      role="progressbar"
      aria-valuenow={row.percent}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-label={`${row.stars} star share`}
    >
      <span
        className={SERVICE_REVIEWS_PROGRESS_FILL_CLASS}
        style={{ width: `${row.percent}%` }}
      />
    </div>
    <p className={SERVICE_REVIEWS_PERCENT_CLASS}>{formatReviewPercent(row.percent)}</p>
    <p className={SERVICE_REVIEWS_COUNT_CLASS}>{formatReviewCountLabel(row.count)}</p>
  </div>
));

BreakdownRow.displayName = 'BreakdownRow';

const ServiceReviewsSummary = memo(({ copy, summary, breakdown }) => (
  <section className={SERVICE_REVIEWS_SUMMARY_ROW_CLASS} aria-label={copy.ratingLabel}>
    <div className={SERVICE_REVIEWS_SCORE_CARD_CLASS}>
      <p className={SERVICE_REVIEWS_SCORE_VALUE_CLASS}>{summary.average}</p>
      <ServiceReviewsStars
        size={SERVICE_REVIEWS_SUMMARY_STAR_SIZE}
        filledCount={summary.filledStars}
        showHalf={summary.hasHalfStar}
        label={`${summary.average} out of 5`}
      />
      <p className={SERVICE_REVIEWS_SCORE_LABEL_CLASS}>
        {copy.ratingLabel}{' '}
        <span className={SERVICE_REVIEWS_SCORE_COUNT_CLASS}>
          {formatReviewCountLabel(summary.totalCount)}
        </span>
      </p>
    </div>

    <div className={SERVICE_REVIEWS_BREAKDOWN_CLASS}>
      {breakdown.map((row) => (
        <BreakdownRow key={row.stars} row={row} />
      ))}
    </div>
  </section>
));

ServiceReviewsSummary.displayName = 'ServiceReviewsSummary';

export default ServiceReviewsSummary;
