import { Send } from 'lucide-react';
import {
  BOOKINGS_CHAT_COMPOSER_ROW_CLASS,
  BOOKINGS_CHAT_COMPOSER_WRAP_CLASS,
  BOOKINGS_CHAT_CREATE_OFFER_CLASS,
  BOOKINGS_CHAT_INPUT_CLASS,
  BOOKINGS_CHAT_INPUT_SHELL_CLASS,
  BOOKINGS_CHAT_SEND_BUTTON_CLASS,
  BOOKINGS_CHAT_SEND_ICON_SIZE,
  BOOKINGS_CHAT_SEND_LABEL_CLASS,
} from './bookingsChatData';

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
    <div className={BOOKINGS_CHAT_COMPOSER_ROW_CLASS}>
      <div className={BOOKINGS_CHAT_INPUT_SHELL_CLASS}>
        <button type="button" onClick={onCreateOffer} className={BOOKINGS_CHAT_CREATE_OFFER_CLASS}>
          {copy.createOffer}
        </button>
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
        <span className={BOOKINGS_CHAT_SEND_LABEL_CLASS}>{copy.sendSmsLabel}</span>
      </button>
    </div>
  </div>
);

export default BookingsChatComposer;
