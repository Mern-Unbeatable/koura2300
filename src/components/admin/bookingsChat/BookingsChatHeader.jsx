import { X } from 'lucide-react';
import {
  BOOKINGS_CHAT_CLOSE_ICON_SIZE,
  BOOKINGS_CHAT_HEADER_CLASS,
  BOOKINGS_CHAT_HEADER_STATUS_CLASS,
  BOOKINGS_CHAT_HEADER_TITLE_CLASS,
} from './bookingsChatData';
import BookingsChatAvatar from './BookingsChatAvatar';

const BookingsChatHeader = ({ customerName, activeStatus, closeLabel, onClose }) => (
  <header className={BOOKINGS_CHAT_HEADER_CLASS}>
    <div className="flex min-w-0 items-center gap-2.5 min-[376px]:gap-3 min-[426px]:gap-4">
      <BookingsChatAvatar name={customerName} variant="header" online />
      <div className="min-w-0">
        <h2 className={BOOKINGS_CHAT_HEADER_TITLE_CLASS}>{customerName}</h2>
        <p className={BOOKINGS_CHAT_HEADER_STATUS_CLASS}>{activeStatus}</p>
      </div>
    </div>
    <button
      type="button"
      onClick={onClose}
      aria-label={closeLabel}
      className="cursor-pointer rounded-md p-1 text-[#1e1e1e] transition-colors hover:text-brand-orange focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-orange"
    >
      <X size={BOOKINGS_CHAT_CLOSE_ICON_SIZE} aria-hidden="true" />
    </button>
  </header>
);

export default BookingsChatHeader;
