import {
  BOOKING_DETAILS_BADGE_CLASS,
  BOOKING_DETAILS_CARD_BODY_CLASS,
  BOOKING_DETAILS_CARD_CLASS,
  BOOKING_DETAILS_CARD_HEADER_CLASS,
  BOOKING_DETAILS_CARD_TITLE_CLASS,
  BOOKING_DETAILS_ICON_SIZE,
} from './bookingDetailsData';

const BookingDetailsCard = ({ title, icon: Icon, badge, children, testId }) => (
  <section className={BOOKING_DETAILS_CARD_CLASS} data-testid={testId} aria-label={title}>
    <header className={BOOKING_DETAILS_CARD_HEADER_CLASS}>
      {Icon ? <Icon size={BOOKING_DETAILS_ICON_SIZE} className="shrink-0 text-[#0f172b]" aria-hidden="true" /> : null}
      <h2 className={BOOKING_DETAILS_CARD_TITLE_CLASS}>{title}</h2>
      {badge ? <span className={BOOKING_DETAILS_BADGE_CLASS}>{badge}</span> : null}
    </header>
    <div className={BOOKING_DETAILS_CARD_BODY_CLASS}>{children}</div>
  </section>
);

export default BookingDetailsCard;
