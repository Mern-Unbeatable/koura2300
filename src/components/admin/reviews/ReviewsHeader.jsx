import {
  REVIEWS_HEADER_CLASS,
  REVIEWS_SUBTITLE_CLASS,
  REVIEWS_TITLE_CLASS,
} from './reviewsData';

const ReviewsHeader = ({ title, subtitle }) => (
  <header className={REVIEWS_HEADER_CLASS}>
    <h1 className={REVIEWS_TITLE_CLASS}>{title}</h1>
    <p className={REVIEWS_SUBTITLE_CLASS}>{subtitle}</p>
  </header>
);

export default ReviewsHeader;
