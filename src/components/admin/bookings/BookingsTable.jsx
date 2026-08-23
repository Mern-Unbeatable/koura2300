import {
  BOOKINGS_TABLE_CARD_CLASS,
  BOOKINGS_TABLE_CLASS,
  BOOKINGS_TABLE_COLUMN_COUNT,
  BOOKINGS_EMPTY_ROW_CLASS,
  BOOKINGS_TABLE_HEAD_CELL_CLASS,
  BOOKINGS_TABLE_HEAD_CLASS,
  BOOKINGS_TABLE_SCROLL_CLASS,
} from './bookingsData';
import BookingsPagination from './BookingsPagination';
import BookingsTableRow from './BookingsTableRow';

const BookingsTable = ({
  copy,
  bookings,
  openActionMenuId,
  pagination,
  onToggleActionMenu,
  onSeeDetails,
  onChatWithCustomer,
  onStatusChange,
}) => (
  <section className={BOOKINGS_TABLE_CARD_CLASS} aria-label={copy.tableLabel}>
    <div data-testid="bookings-table-scroll" className={BOOKINGS_TABLE_SCROLL_CLASS}>
      <table className={BOOKINGS_TABLE_CLASS} aria-label={copy.tableLabel}>
        <thead className={BOOKINGS_TABLE_HEAD_CLASS}>
          <tr>
            {Object.values(copy.columns).map((column) => (
              <th key={column} scope="col" className={BOOKINGS_TABLE_HEAD_CELL_CLASS}>
                {column}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {bookings.length === 0 ? (
            <tr>
              <td colSpan={BOOKINGS_TABLE_COLUMN_COUNT} className={BOOKINGS_EMPTY_ROW_CLASS}>
                {copy.emptyResults}
              </td>
            </tr>
          ) : (
            bookings.map((booking) => (
              <BookingsTableRow
                key={booking.id}
                booking={booking}
                copy={copy}
                isActionMenuOpen={openActionMenuId === booking.id}
                onToggleActionMenu={onToggleActionMenu}
                onSeeDetails={onSeeDetails}
                onChatWithCustomer={onChatWithCustomer}
                onStatusChange={onStatusChange}
              />
            ))
          )}
        </tbody>
      </table>
    </div>
    <BookingsPagination copy={copy} {...pagination} />
  </section>
);

export default BookingsTable;
