import {
  buildBookingDetailsTitle,
  getBookingDetailsById,
  hasMaterialInformation,
} from '../bookingDetailsUtils';
import { BOOKINGS_SEED } from '../../bookings/bookingsData';

describe('bookingDetailsUtils', () => {
  it('builds the Figma booking title', () => {
    expect(buildBookingDetailsTitle('BK-001')).toBe('Booking BK-001');
  });

  it('returns null for an unknown booking id', () => {
    expect(getBookingDetailsById('BK-MISSING')).toBeNull();
  });

  it('returns material-required details with material information', () => {
    const requiredBooking = BOOKINGS_SEED.find((booking) => booking.material === 'required');
    const details = getBookingDetailsById(requiredBooking.id);

    expect(details).not.toBeNull();
    expect(details.id).toBe(requiredBooking.id);
    expect(details.materialRequired).toBe(true);
    expect(hasMaterialInformation(details)).toBe(true);
    expect(details.materialItems.length).toBeGreaterThan(0);
    expect(details.materialTotal).toBe('$185');
  });

  it('returns material-none details without material information', () => {
    const noneBooking = BOOKINGS_SEED.find((booking) => booking.material === 'none');
    const details = getBookingDetailsById(noneBooking.id);

    expect(details).not.toBeNull();
    expect(details.materialRequired).toBe(false);
    expect(hasMaterialInformation(details)).toBe(false);
    expect(details.materialItems).toEqual([]);
  });
});
