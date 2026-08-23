import {
  buildBookingsChatOffer,
  createBookingsChatSentMessage,
  getBookingsChatSession,
} from '../bookingsChatUtils';
import { BOOKINGS_CHAT_OFFER_TOTAL, BOOKINGS_CHAT_SEED_TIMESTAMP } from '../bookingsChatData';

describe('bookingsChatUtils', () => {
  it('builds a Figma offer card for a booking id', () => {
    const offer = buildBookingsChatOffer('BK-001');

    expect(offer.bookingId).toBe('BK-001');
    expect(offer.totalLabel).toBe(`$${BOOKINGS_CHAT_OFFER_TOTAL}`);
    expect(offer.lineItems).toHaveLength(3);
    expect(offer.lineItems[0]).toMatchObject({
      item: '200A Main Breaker Panel',
      quantity: '1 unit',
      costLabel: '$85',
    });
  });

  it('returns a chat session for a known booking', () => {
    const session = getBookingsChatSession('BK-001');

    expect(session).toMatchObject({
      bookingId: 'BK-001',
      customerName: 'Albert Flores',
      timestamp: BOOKINGS_CHAT_SEED_TIMESTAMP,
    });
    expect(session.messages[0].text).toBe('Yo mandem');
    expect(session.messages.some((message) => message.text.includes('😂'))).toBe(false);
  });

  it('returns null for an unknown booking', () => {
    expect(getBookingsChatSession('BK-MISSING')).toBeNull();
  });

  it('creates a sent message for composer submit', () => {
    expect(createBookingsChatSentMessage('Hello', 123)).toEqual({
      id: 'sent-123',
      type: 'sent',
      text: 'Hello',
      position: 'single',
    });
  });
});
