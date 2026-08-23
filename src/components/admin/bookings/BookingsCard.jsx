import { formatServiceCost } from './bookingsUtils';
import {
  BOOKINGS_CARD_BODY_CLASS,
  BOOKINGS_CARD_CLASS,
  BOOKINGS_CARD_CUSTOMER_CLASS,
  BOOKINGS_CARD_HEADER_CLASS,
  BOOKINGS_CARD_ID_CLASS,
  BOOKINGS_CARD_LABEL_CLASS,
  BOOKINGS_CARD_ROW_CLASS,
  BOOKINGS_CARD_VALUE_CLASS,
  BOOKINGS_CATEGORY_CLASS,
  BOOKINGS_SERVICE_NAME_CLASS,
} from './bookingsData';
import BookingsMaterialCell from './BookingsMaterialCell';
import BookingsRowActions from './BookingsRowActions';
import BookingsStatusBadge from './BookingsStatusBadge';

const BookingsCardField = ({ label, children, valueClassName = BOOKINGS_CARD_VALUE_CLASS }) => (
  <div className={BOOKINGS_CARD_ROW_CLASS}>
    <span className={BOOKINGS_CARD_LABEL_CLASS}>{label}</span>
    <span className={valueClassName}>{children}</span>
  </div>
);

const BookingsCard = ({
  booking,
  copy,
  isActionMenuOpen,
  onToggleActionMenu,
  onCloseActionMenu,
  onSeeDetails,
  onChatWithCustomer,
  onStatusChange,
}) => (
  <article
    data-testid={`bookings-card-${booking.id}`}
    className={BOOKINGS_CARD_CLASS}
    aria-label={`${copy.columns.bookingId} ${booking.id}`}
  >
    <div className={BOOKINGS_CARD_HEADER_CLASS}>
      <div className="min-w-0">
        <p className={BOOKINGS_CARD_ID_CLASS}>{booking.id}</p>
        <p className={BOOKINGS_CARD_CUSTOMER_CLASS}>{booking.customer}</p>
      </div>
      <BookingsRowActions
        bookingId={booking.id}
        copy={copy}
        isOpen={isActionMenuOpen}
        onToggle={onToggleActionMenu}
        onClose={onCloseActionMenu}
        onSeeDetails={onSeeDetails}
        onChatWithCustomer={onChatWithCustomer}
        onStatusChange={onStatusChange}
      />
    </div>

    <div className={BOOKINGS_CARD_BODY_CLASS}>
      <BookingsCardField
        label={copy.columns.serviceName}
        valueClassName={`${BOOKINGS_CARD_VALUE_CLASS} ${BOOKINGS_SERVICE_NAME_CLASS}`}
      >
        {booking.serviceName}
      </BookingsCardField>
      <BookingsCardField
        label={copy.columns.serviceCategory}
        valueClassName={`${BOOKINGS_CARD_VALUE_CLASS} ${BOOKINGS_CATEGORY_CLASS}`}
      >
        {booking.serviceCategory}
      </BookingsCardField>
      <BookingsCardField
        label={copy.columns.serviceCost}
        valueClassName={`${BOOKINGS_CARD_VALUE_CLASS} ${BOOKINGS_CATEGORY_CLASS}`}
      >
        {formatServiceCost(booking.serviceCost)}
      </BookingsCardField>
      <BookingsCardField label={copy.columns.material}>
        <BookingsMaterialCell material={booking.material} copy={copy} />
      </BookingsCardField>
      <BookingsCardField label={copy.columns.status}>
        <BookingsStatusBadge statusId={booking.statusId} />
      </BookingsCardField>
    </div>
  </article>
);

export default BookingsCard;
