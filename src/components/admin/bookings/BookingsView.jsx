import { BOOKINGS_PAGE_CLASS } from './bookingsData';
import BookingsHeader from './BookingsHeader';
import BookingsTable from './BookingsTable';

const BookingsView = ({
  copy,
  bookings,
  summarySubtitle,
  statusOptions,
  selectedStatusId,
  onStatusFilterChange,
  pagination,
  openActionMenuId,
  onToggleActionMenu,
  onCloseActionMenu,
  onSeeDetails,
  onChatWithCustomer,
  onStatusChange,
}) => (
  <div className={BOOKINGS_PAGE_CLASS}>
    <BookingsHeader
      title={copy.title}
      summarySubtitle={summarySubtitle}
      statusOptions={statusOptions}
      selectedStatusId={selectedStatusId}
      statusFilterLabel={copy.statusFilterLabel}
      onStatusFilterChange={onStatusFilterChange}
    />
    <BookingsTable
      copy={copy}
      bookings={bookings}
      openActionMenuId={openActionMenuId}
      pagination={pagination}
      onToggleActionMenu={onToggleActionMenu}
      onCloseActionMenu={onCloseActionMenu}
      onSeeDetails={onSeeDetails}
      onChatWithCustomer={onChatWithCustomer}
      onStatusChange={onStatusChange}
    />
  </div>
);

export default BookingsView;
