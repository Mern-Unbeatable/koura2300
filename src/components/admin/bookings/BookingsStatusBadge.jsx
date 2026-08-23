import {
  BOOKINGS_STATUS_STYLES,
  BOOKINGS_STATUS_BADGE_CLASS,
} from './bookingsData';

const BookingsStatusBadge = ({ statusId }) => {
  const status = BOOKINGS_STATUS_STYLES[statusId] ?? BOOKINGS_STATUS_STYLES.new;

  return (
    <span className={`${BOOKINGS_STATUS_BADGE_CLASS} ${status.badgeClass}`}>
      {status.label}
    </span>
  );
};

export default BookingsStatusBadge;
