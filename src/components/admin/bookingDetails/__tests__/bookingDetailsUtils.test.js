import {
  buildBookingDetailsTitle,
  buildMaterialItemsFromProducts,
  getBookingDetailsById,
  hasMaterialInformation,
  canAddBookingMaterial,
  shouldAllowAddMaterial,
  shouldShowChatWithCustomer,
} from '../bookingDetailsUtils';
import { BOOKINGS_COPY } from '../../bookings/bookingsCopy';
import { BOOKINGS_SEED } from '../../bookings/bookingsData';

describe('bookingDetailsUtils', () => {
  it('builds the Figma booking title', () => {
    expect(buildBookingDetailsTitle('BK-001')).toBe('Booking BK-001');
  });

  it('returns null for an unknown booking id', () => {
    expect(getBookingDetailsById('BK-MISSING')).toBeNull();
  });

  it('returns prefilled materials for required + chat preferred contact', () => {
    const chatRequired = BOOKINGS_SEED.find(
      (booking) => booking.material === 'required' && booking.preferredContact === 'chat',
    );
    const details = getBookingDetailsById(chatRequired.id);

    expect(details).not.toBeNull();
    expect(details.materialRequired).toBe(true);
    expect(hasMaterialInformation(details)).toBe(true);
    expect(canAddBookingMaterial(details)).toBe(false);
    expect(details.materialItems.length).toBeGreaterThan(0);
    expect(details.materialTotal).toBe('$185');
    expect(details.customer.preferredContact).toBe(BOOKINGS_COPY.preferredContact.chat);
  });

  it('returns empty add-material state for required + phone preferred contact', () => {
    const phoneRequired = BOOKINGS_SEED.find(
      (booking) => booking.material === 'required' && booking.preferredContact === 'phone',
    );
    const details = getBookingDetailsById(phoneRequired.id);

    expect(details.materialRequired).toBe(true);
    expect(hasMaterialInformation(details)).toBe(true);
    expect(canAddBookingMaterial(details)).toBe(true);
    expect(details.materialItems).toEqual([]);
    expect(details.materialTotal).toBeNull();
    expect(details.customer.preferredContact).toBe(BOOKINGS_COPY.preferredContact.phone);
  });

  it('returns empty add-material state for required + email preferred contact', () => {
    const emailRequired = BOOKINGS_SEED.find(
      (booking) => booking.material === 'required' && booking.preferredContact === 'email',
    );
    const details = getBookingDetailsById(emailRequired.id);

    expect(canAddBookingMaterial(details)).toBe(true);
    expect(details.materialItems).toEqual([]);
    expect(details.customer.preferredContact).toBe(BOOKINGS_COPY.preferredContact.email);
  });

  it('forces N/A preferred contact for material none bookings', () => {
    const noneBooking = BOOKINGS_SEED.find((booking) => booking.material === 'none');
    const details = getBookingDetailsById(noneBooking.id);

    expect(details.materialRequired).toBe(false);
    expect(hasMaterialInformation(details)).toBe(false);
    expect(details.materialItems).toEqual([]);
    expect(details.preferredContact).toBe('na');
    expect(details.customer.preferredContact).toBe(BOOKINGS_COPY.preferredContact.na);
    expect(noneBooking.preferredContact).toBe('na');
  });

  it('only allows add material for required phone or email', () => {
    expect(shouldAllowAddMaterial('required', 'phone')).toBe(true);
    expect(shouldAllowAddMaterial('required', 'email')).toBe(true);
    expect(shouldAllowAddMaterial('required', 'chat')).toBe(false);
    expect(shouldAllowAddMaterial('none', 'phone')).toBe(false);
  });

  it('only shows chat with customer for chat preferred contact', () => {
    expect(shouldShowChatWithCustomer('chat')).toBe(true);
    expect(shouldShowChatWithCustomer('phone')).toBe(false);
    expect(shouldShowChatWithCustomer('email')).toBe(false);
    expect(shouldShowChatWithCustomer('na')).toBe(false);
  });

  it('builds material items from offer products', () => {
    const result = buildMaterialItemsFromProducts([
      {
        id: 'p1',
        productName: 'Panel',
        quantity: '2',
        price: '50',
      },
      {
        id: 'p2',
        productName: 'Wire',
        quantity: '1',
        price: '$25',
      },
    ]);

    expect(result.materialItems).toEqual([
      { id: 'p1', name: 'Panel', qty: '2', cost: '$50' },
      { id: 'p2', name: 'Wire', qty: '1', cost: '$25' },
    ]);
    expect(result.materialTotal).toBe('$75');
  });
});
