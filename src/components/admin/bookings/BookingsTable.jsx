import {
  BOOKINGS_TABLE_CARD_CLASS,
  BOOKINGS_TABLE_CLASS,
  BOOKINGS_TABLE_COLUMN_COUNT,
  BOOKINGS_EMPTY_ROW_CLASS,
  BOOKINGS_TABLE_ACTION_HEAD_CELL_CLASS,
  BOOKINGS_TABLE_STATUS_HEAD_CELL_CLASS,
  BOOKINGS_TABLE_STATUS_OFFSET_CLASS,
  BOOKINGS_TABLE_HEAD_CELL_CLASS,
  BOOKINGS_TABLE_HEAD_CLASS,
  BOOKINGS_TABLE_SCROLL_CLASS,
} from './bookingsData';
import BookingsCards from './BookingsCards';
import BookingsPagination from './BookingsPagination';
import BookingsTableRow from './BookingsTableRow';
import useBookingsCompactLayout from './useBookingsCompactLayout';

const BookingsTable = ({
  copy,
  bookings,
  openActionMenuId,
  pagination,
  onToggleActionMenu,
  onCloseActionMenu,
  onSeeDetails,
  onChatWithCustomer,
  onStatusChange,
}) => {
  const isCompactLayout = useBookingsCompactLayout();

  return (
    <section
      className={BOOKINGS_TABLE_CARD_CLASS}
      data-testid="bookings-table-card"
      aria-label={copy.tableLabel}
    >
      {isCompactLayout ? (
        <BookingsCards
          copy={copy}
          bookings={bookings}
          openActionMenuId={openActionMenuId}
          onToggleActionMenu={onToggleActionMenu}
          onCloseActionMenu={onCloseActionMenu}
          onSeeDetails={onSeeDetails}
          onChatWithCustomer={onChatWithCustomer}
          onStatusChange={onStatusChange}
        />
      ) : (
        <div data-testid="bookings-table-scroll" className={BOOKINGS_TABLE_SCROLL_CLASS}>
          <table className={BOOKINGS_TABLE_CLASS} aria-label={copy.tableLabel}>
            <thead className={BOOKINGS_TABLE_HEAD_CLASS}>
              <tr>
                {Object.values(copy.columns).map((column) => (
                  <th
                    key={column}
                    scope="col"
                    className={
                      column === copy.columns.action
                        ? BOOKINGS_TABLE_ACTION_HEAD_CELL_CLASS
                        : column === copy.columns.status
                          ? BOOKINGS_TABLE_STATUS_HEAD_CELL_CLASS
                          : BOOKINGS_TABLE_HEAD_CELL_CLASS
                    }
                  >
                    {column === copy.columns.status ? (
                      <span className={BOOKINGS_TABLE_STATUS_OFFSET_CLASS}>{column}</span>
                    ) : (
                      column
                    )}
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
                    onCloseActionMenu={onCloseActionMenu}
                    onSeeDetails={onSeeDetails}
                    onChatWithCustomer={onChatWithCustomer}
                    onStatusChange={onStatusChange}
                  />
                ))
              )}
            </tbody>
          </table>
        </div>
      )}
      <BookingsPagination copy={copy} {...pagination} />
    </section>
  );
};

export default BookingsTable;
