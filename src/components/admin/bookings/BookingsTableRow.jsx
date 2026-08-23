import { formatServiceCost } from './bookingsUtils';
import {
  BOOKINGS_CATEGORY_CLASS,
  BOOKINGS_SERVICE_NAME_CLASS,
  BOOKINGS_TABLE_CELL_CLASS,
  BOOKINGS_TABLE_ROW_CLASS,
} from './bookingsData';
import BookingsMaterialCell from './BookingsMaterialCell';
import BookingsRowActions from './BookingsRowActions';
import BookingsStatusBadge from './BookingsStatusBadge';

const BookingsTableRow = ({
  booking,
  copy,
  isActionMenuOpen,
  onToggleActionMenu,
  onSeeDetails,
  onChatWithCustomer,
  onStatusChange,
}) => (
  <tr className={BOOKINGS_TABLE_ROW_CLASS}>
    <td className={BOOKINGS_TABLE_CELL_CLASS}>{booking.id}</td>
    <td className={BOOKINGS_TABLE_CELL_CLASS}>{booking.customer}</td>
    <td className={`${BOOKINGS_TABLE_CELL_CLASS} ${BOOKINGS_SERVICE_NAME_CLASS}`}>
      {booking.serviceName}
    </td>
    <td className={`${BOOKINGS_TABLE_CELL_CLASS} ${BOOKINGS_CATEGORY_CLASS}`}>
      {booking.serviceCategory}
    </td>
    <td className={`${BOOKINGS_TABLE_CELL_CLASS} ${BOOKINGS_CATEGORY_CLASS}`}>
      {formatServiceCost(booking.serviceCost)}
    </td>
    <td className={BOOKINGS_TABLE_CELL_CLASS}>
      <BookingsMaterialCell material={booking.material} copy={copy} />
    </td>
    <td className={BOOKINGS_TABLE_CELL_CLASS}>
      <BookingsStatusBadge statusId={booking.statusId} />
    </td>
    <td className={BOOKINGS_TABLE_CELL_CLASS}>
      <BookingsRowActions
        bookingId={booking.id}
        copy={copy}
        isOpen={isActionMenuOpen}
        onToggle={onToggleActionMenu}
        onSeeDetails={onSeeDetails}
        onChatWithCustomer={onChatWithCustomer}
        onStatusChange={onStatusChange}
      />
    </td>
  </tr>
);

export default BookingsTableRow;
