import { getInitials } from '../../chat/chatUtils';
import {
  BOOKINGS_CHAT_HEADER_AVATAR_CLASS,
  BOOKINGS_CHAT_MESSAGE_AVATAR_CLASS,
  BOOKINGS_CHAT_ONLINE_DOT_CLASS,
} from './bookingsChatData';

const AVATAR_SIZE_CLASS = {
  header: BOOKINGS_CHAT_HEADER_AVATAR_CLASS,
  message: BOOKINGS_CHAT_MESSAGE_AVATAR_CLASS,
};

const BookingsChatAvatar = ({ name, variant = 'header', online = false }) => (
  <div className={`relative shrink-0 ${AVATAR_SIZE_CLASS[variant] ?? BOOKINGS_CHAT_HEADER_AVATAR_CLASS}`}>
    <div
      className="flex size-full items-center justify-center rounded-full border-[1.5px] border-white bg-[#ffe7cc] text-sm font-semibold text-brand-orange"
      aria-hidden="true"
    >
      {getInitials(name)}
    </div>
    {online ? <span className={BOOKINGS_CHAT_ONLINE_DOT_CLASS} aria-hidden="true" /> : null}
  </div>
);

export default BookingsChatAvatar;
