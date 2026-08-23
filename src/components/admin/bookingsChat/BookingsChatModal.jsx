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
import BookingsCreateOfferModal from './BookingsCreateOfferModal';

const BookingsChatModal = ({ bookingId, onClose }) => {
  const {
    session,
    messages,
    offer,
    inputValue,
    inputRef,
    isCreateOfferOpen,
    copy,
    handleInputChange,
    handleSend,
    handleKeyDown,
    handleCreateOffer,
    handleCloseCreateOffer,
    handleSendCreateOffer,
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
        className={`${BOOKINGS_CHAT_DIALOG_CLASS} relative`}
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
            offer={offer}
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

        {isCreateOfferOpen ? (
          <BookingsCreateOfferModal
            bookingId={bookingId}
            onClose={handleCloseCreateOffer}
            onSend={handleSendCreateOffer}
          />
        ) : null}
      </div>
    </div>,
    document.body,
  );
};

export default BookingsChatModal;
