import { BOOKINGS_CARDS_CLASS, BOOKINGS_CARDS_EMPTY_CLASS } from './bookingsData';
import BookingsCard from './BookingsCard';

const BookingsCards = ({
  copy,
  bookings,
  openActionMenuId,
  onToggleActionMenu,
  onCloseActionMenu,
  onSeeDetails,
  onChatWithCustomer,
  onStatusChange,
}) => (
  <div data-testid="bookings-cards" className={BOOKINGS_CARDS_CLASS}>
    {bookings.length === 0 ? (
      <p className={BOOKINGS_CARDS_EMPTY_CLASS}>{copy.emptyResults}</p>
    ) : (
      bookings.map((booking) => (
        <BookingsCard
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
  </div>
);

export default BookingsCards;
