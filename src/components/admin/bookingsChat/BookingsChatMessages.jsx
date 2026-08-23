import { useMemo } from 'react';
import { getBubbleCorners, groupMessages } from '../../chat/chatUtils';
import {
  BOOKINGS_CHAT_BUBBLE_MAX_WIDTH_CLASS,
  BOOKINGS_CHAT_BUBBLE_TEXT_CLASS,
  BOOKINGS_CHAT_MESSAGE_GAP_CLASS,
  BOOKINGS_CHAT_MESSAGES_CLASS,
  BOOKINGS_CHAT_RECEIVED_BUBBLE_CLASS,
  BOOKINGS_CHAT_SENT_BUBBLE_CLASS,
  BOOKINGS_CHAT_TIMESTAMP_CLASS,
  BOOKINGS_CHAT_TIMESTAMP_DOT_CLASS,
} from './bookingsChatData';
import BookingsChatAvatar from './BookingsChatAvatar';
import BookingsChatOfferCard from './BookingsChatOfferCard';

const ReceivedBubbles = ({ messages }) => (
  <div className="flex min-w-0 flex-col gap-1">
    {messages.map((message) => (
      <div
        key={message.id}
        className={`${BOOKINGS_CHAT_RECEIVED_BUBBLE_CLASS} ${BOOKINGS_CHAT_BUBBLE_TEXT_CLASS} ${getBubbleCorners('received', message.position)}`}
      >
        {message.text}
      </div>
    ))}
  </div>
);

const SentBubbles = ({ messages }) => (
  <div className={`flex min-w-0 flex-col items-end gap-1 ${BOOKINGS_CHAT_BUBBLE_MAX_WIDTH_CLASS}`}>
    {messages.map((message) => (
      <div
        key={message.id}
        className={`${BOOKINGS_CHAT_SENT_BUBBLE_CLASS} ${BOOKINGS_CHAT_BUBBLE_TEXT_CLASS} ${getBubbleCorners('sent', message.position)}`}
      >
        {message.text}
      </div>
    ))}
  </div>
);

const ReceivedMessageRow = ({ messages, customerName }) => (
  <div className="flex w-full justify-start">
    <div
      className={`flex min-w-0 items-end ${BOOKINGS_CHAT_MESSAGE_GAP_CLASS} ${BOOKINGS_CHAT_BUBBLE_MAX_WIDTH_CLASS}`}
    >
      <BookingsChatAvatar name={customerName} variant="message" />
      <ReceivedBubbles messages={messages} />
    </div>
  </div>
);

const SentMessageRow = ({ messages }) => (
  <div className="flex w-full justify-end">
    <SentBubbles messages={messages} />
  </div>
);

const BookingsChatMessages = ({
  messages,
  customerName,
  timestamp,
  offer,
  offerCopy,
  onPayNow,
}) => {
  const messageGroups = useMemo(() => groupMessages(messages), [messages]);

  return (
    <div className={BOOKINGS_CHAT_MESSAGES_CLASS}>
      <div className={BOOKINGS_CHAT_TIMESTAMP_CLASS}>
        <span className="whitespace-nowrap">{timestamp.dateLabel}</span>
        <span className={BOOKINGS_CHAT_TIMESTAMP_DOT_CLASS} aria-hidden="true" />
        <span className="whitespace-nowrap">{timestamp.timeLabel}</span>
      </div>

      {messageGroups.map((group) =>
        group.type === 'received' ? (
          <ReceivedMessageRow
            key={group.messages[0].id}
            messages={group.messages}
            customerName={customerName}
          />
        ) : (
          <SentMessageRow key={group.messages[0].id} messages={group.messages} />
        ),
      )}

      <BookingsChatOfferCard offer={offer} copy={offerCopy} onPayNow={onPayNow} />
    </div>
  );
};

export default BookingsChatMessages;
