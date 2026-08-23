import { BOOKINGS_SEED } from '../bookings/bookingsData';
import {
  BOOKINGS_CHAT_OFFER_LINE_ITEMS,
  BOOKINGS_CHAT_OFFER_TOTAL,
  BOOKINGS_CHAT_SEED_MESSAGES,
  BOOKINGS_CHAT_SEED_TIMESTAMP,
} from './bookingsChatData';

const formatOfferCost = (cost) => `$${cost}`;

export const buildBookingsChatOffer = (bookingId) => ({
  bookingId,
  lineItems: BOOKINGS_CHAT_OFFER_LINE_ITEMS.map((lineItem) => ({
    ...lineItem,
    costLabel: formatOfferCost(lineItem.cost),
  })),
  totalLabel: formatOfferCost(BOOKINGS_CHAT_OFFER_TOTAL),
});

export const getBookingsChatCustomerName = (booking) => booking?.customer ?? 'Customer';

export const getBookingsChatSession = (bookingId, bookings = BOOKINGS_SEED) => {
  const booking = bookings.find((entry) => entry.id === bookingId) ?? null;

  if (!booking) {
    return null;
  }

  return {
    bookingId: booking.id,
    customerName: getBookingsChatCustomerName(booking),
    messages: BOOKINGS_CHAT_SEED_MESSAGES,
    offer: buildBookingsChatOffer(booking.id),
    timestamp: BOOKINGS_CHAT_SEED_TIMESTAMP,
  };
};

export const createBookingsChatSentMessage = (text, now = Date.now()) => ({
  id: `sent-${now}`,
  type: 'sent',
  text,
  position: 'single',
});
