import { Send } from 'lucide-react';
import {
  BOOKINGS_CHAT_COMPOSER_ROW_CLASS,
  BOOKINGS_CHAT_COMPOSER_WRAP_CLASS,
  BOOKINGS_CHAT_CREATE_OFFER_CLASS,
  BOOKINGS_CHAT_CREATE_OFFER_DESKTOP_CLASS,
  BOOKINGS_CHAT_CREATE_OFFER_MOBILE_CLASS,
  BOOKINGS_CHAT_INPUT_CLASS,
  BOOKINGS_CHAT_INPUT_SHELL_CLASS,
  BOOKINGS_CHAT_SEND_BUTTON_CLASS,
  BOOKINGS_CHAT_SEND_ICON_SIZE,
} from './bookingsChatData';

const CreateOfferButton = ({ label, onClick, className }) => (
  <button
    type="button"
    onClick={onClick}
    className={`${BOOKINGS_CHAT_CREATE_OFFER_CLASS} ${className}`}
  >
    {label}
  </button>
);

const BookingsChatComposer = ({
  copy,
  inputRef,
  inputValue,
  onChange,
  onKeyDown,
  onSend,
  onCreateOffer,
}) => (
  <div className={BOOKINGS_CHAT_COMPOSER_WRAP_CLASS} data-testid="bookings-chat-composer">
    <CreateOfferButton
      label={copy.createOffer}
      onClick={onCreateOffer}
      className={BOOKINGS_CHAT_CREATE_OFFER_MOBILE_CLASS}
    />

    <div className={BOOKINGS_CHAT_COMPOSER_ROW_CLASS}>
      <div className={BOOKINGS_CHAT_INPUT_SHELL_CLASS}>
        <CreateOfferButton
          label={copy.createOffer}
          onClick={onCreateOffer}
          className={BOOKINGS_CHAT_CREATE_OFFER_DESKTOP_CLASS}
        />
        <input
          ref={inputRef}
          type="text"
          value={inputValue}
          onChange={onChange}
          onKeyDown={onKeyDown}
          placeholder={copy.inputPlaceholder}
          aria-label={copy.inputLabel}
          className={BOOKINGS_CHAT_INPUT_CLASS}
        />
      </div>
      <button
        type="button"
        onClick={onSend}
        disabled={!inputValue.trim()}
        aria-label={copy.sendLabel}
        className={BOOKINGS_CHAT_SEND_BUTTON_CLASS}
      >
        <Send size={BOOKINGS_CHAT_SEND_ICON_SIZE} aria-hidden="true" />
        <span className="text-[10px] font-semibold tracking-[0.5px]">{copy.sendSmsLabel}</span>
      </button>
    </div>
  </div>
);

export default BookingsChatComposer;
