import {
  BOOKING_DETAILS_BADGE_CLASS,
  BOOKING_DETAILS_BADGE_DESKTOP_CLASS,
  BOOKING_DETAILS_BADGE_MOBILE_CLASS,
  BOOKING_DETAILS_CARD_BODY_CLASS,
  BOOKING_DETAILS_CARD_CLASS,
  BOOKING_DETAILS_CARD_HEADER_CLASS,
  BOOKING_DETAILS_CARD_HEADER_MAIN_CLASS,
  BOOKING_DETAILS_CARD_TITLE_CLASS,
  BOOKING_DETAILS_CARD_TITLE_ROW_CLASS,
  BOOKING_DETAILS_CARD_TITLE_WRAP_CLASS,
  BOOKING_DETAILS_ICON_SIZE,
} from './bookingDetailsData';

const SectionBadge = ({ badge, variant }) => (
  <span
    className={`${BOOKING_DETAILS_BADGE_CLASS} ${
      variant === 'mobile' ? BOOKING_DETAILS_BADGE_MOBILE_CLASS : BOOKING_DETAILS_BADGE_DESKTOP_CLASS
    }`}
  >
    {badge}
  </span>
);

const BookingDetailsCard = ({ title, icon: Icon, badge, headerAction, children, testId }) => {
  const hasBody = children != null;

  return (
    <section className={BOOKING_DETAILS_CARD_CLASS} data-testid={testId} aria-label={title}>
      <header className={BOOKING_DETAILS_CARD_HEADER_CLASS}>
        <div className={BOOKING_DETAILS_CARD_HEADER_MAIN_CLASS}>
          {Icon ? (
            <Icon
              size={BOOKING_DETAILS_ICON_SIZE}
              className="mt-0.5 shrink-0 text-[#0f172b] min-[426px]:mt-0"
              aria-hidden="true"
            />
          ) : null}
          <div className={BOOKING_DETAILS_CARD_TITLE_WRAP_CLASS}>
            <div className={BOOKING_DETAILS_CARD_TITLE_ROW_CLASS}>
              <h2 className={BOOKING_DETAILS_CARD_TITLE_CLASS}>{title}</h2>
              {badge ? <SectionBadge badge={badge} variant="desktop" /> : null}
            </div>
            {badge ? <SectionBadge badge={badge} variant="mobile" /> : null}
          </div>
        </div>
        {headerAction ? <div className="shrink-0">{headerAction}</div> : null}
      </header>
      {hasBody ? <div className={BOOKING_DETAILS_CARD_BODY_CLASS}>{children}</div> : null}
    </section>
  );
};

export default BookingDetailsCard;
