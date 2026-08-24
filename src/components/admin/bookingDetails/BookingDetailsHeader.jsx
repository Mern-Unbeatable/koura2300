import { ArrowLeft, MessageSquare } from 'lucide-react';
import { Link } from 'react-router-dom';
import { ROUTES } from '../../../config';
import {
  BOOKING_DETAILS_BACK_ICON_SIZE,
  BOOKING_DETAILS_BACK_LINK_CLASS,
  BOOKING_DETAILS_CHAT_BUTTON_CLASS,
  BOOKING_DETAILS_CHAT_ICON_SIZE,
  BOOKING_DETAILS_HEADER_CLASS,
  BOOKING_DETAILS_SUBTITLE_CLASS,
  BOOKING_DETAILS_TITLE_CLASS,
} from './bookingDetailsData';
import { shouldShowChatWithCustomer } from './bookingDetailsUtils';

const BookingDetailsHeader = ({ copy, booking, onChatWithCustomer }) => {
  const showChatWithCustomer = shouldShowChatWithCustomer(booking.preferredContact);

  return (
    <div className="flex flex-col gap-4">
      <Link to={ROUTES.ADMIN_BOOKINGS} className={BOOKING_DETAILS_BACK_LINK_CLASS}>
        <ArrowLeft size={BOOKING_DETAILS_BACK_ICON_SIZE} aria-hidden="true" />
        {copy.actions.back}
      </Link>

      <header className={BOOKING_DETAILS_HEADER_CLASS}>
        <div className="min-w-0">
          <h1 className={BOOKING_DETAILS_TITLE_CLASS}>{booking.title}</h1>
          <p className={BOOKING_DETAILS_SUBTITLE_CLASS}>
            Created {booking.createdDate}
          </p>
        </div>
        {showChatWithCustomer ? (
          <button
            type="button"
            className={BOOKING_DETAILS_CHAT_BUTTON_CLASS}
            onClick={() => onChatWithCustomer(booking.id)}
          >
            <MessageSquare size={BOOKING_DETAILS_CHAT_ICON_SIZE} aria-hidden="true" />
            {copy.actions.chatWithCustomer}
          </button>
        ) : null}
      </header>
    </div>
  );
};

export default BookingDetailsHeader;
