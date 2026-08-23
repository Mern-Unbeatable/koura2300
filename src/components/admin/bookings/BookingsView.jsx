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
  menuContainerRef,
  onToggleActionMenu,
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
    <div ref={menuContainerRef}>
      <BookingsTable
        copy={copy}
        bookings={bookings}
        openActionMenuId={openActionMenuId}
        pagination={pagination}
        onToggleActionMenu={onToggleActionMenu}
        onSeeDetails={onSeeDetails}
        onChatWithCustomer={onChatWithCustomer}
        onStatusChange={onStatusChange}
      />
    </div>
  </div>
);

export default BookingsView;
