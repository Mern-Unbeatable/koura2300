import { createPortal } from 'react-dom';
import useAdminBookingsChat from '../../../hooks/useAdminBookingsChat';
import {
  BOOKINGS_CHAT_BODY_CLASS,
  BOOKINGS_CHAT_DIALOG_CLASS,
  BOOKINGS_CHAT_OVERLAY_CLASS,
} from './bookingsChatData';
import BookingsChatComposer from './BookingsChatComposer';
import BookingsChatHeader from './BookingsChatHeader';
import BookingsChatMessages from './BookingsChatMessages';

const BookingsChatModal = ({ bookingId, onClose }) => {
  const {
    session,
    messages,
    inputValue,
    inputRef,
    copy,
    handleInputChange,
    handleSend,
    handleKeyDown,
    handleCreateOffer,
    handlePayNow,
  } = useAdminBookingsChat({ bookingId, onClose });

  if (!session) {
    return null;
  }

  const handleOverlayClick = (event) => {
    if (event.target === event.currentTarget) {
      onClose();
    }
  };

  return createPortal(
    <div
      className={BOOKINGS_CHAT_OVERLAY_CLASS}
      data-testid="bookings-chat-overlay"
      onClick={handleOverlayClick}
      role="presentation"
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-label={copy.regionLabel}
        className={BOOKINGS_CHAT_DIALOG_CLASS}
      >
        <BookingsChatHeader
          customerName={session.customerName}
          activeStatus={copy.activeStatus}
          closeLabel={copy.closeLabel}
          onClose={onClose}
        />
        <div className={BOOKINGS_CHAT_BODY_CLASS}>
          <BookingsChatMessages
            messages={messages}
            customerName={session.customerName}
            timestamp={session.timestamp}
            offer={session.offer}
            offerCopy={copy.offerCard}
            onPayNow={handlePayNow}
          />
          <BookingsChatComposer
            copy={copy}
            inputRef={inputRef}
            inputValue={inputValue}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            onSend={handleSend}
            onCreateOffer={handleCreateOffer}
          />
        </div>
      </div>
    </div>,
    document.body,
  );
};

export default BookingsChatModal;
