import {
  filterBookingsByStatus,
  formatServiceCost,
  getAwaitingMaterialPaymentCount,
  getBookingsSummary,
  getPaginationRangeLabel,
  getTotalPages,
  paginateBookings,
  updateBookingStatus,
} from '../bookingsUtils';
import { BOOKINGS_PAGE_SIZE, BOOKINGS_SEED } from '../bookingsData';

describe('bookingsUtils', () => {
  it('filters bookings by status id', () => {
    const filtered = filterBookingsByStatus(BOOKINGS_SEED, 'new');

    expect(filtered).toHaveLength(2);
    expect(filtered.every((booking) => booking.statusId === 'new')).toBe(true);
  });

  it('returns all bookings when status filter is all', () => {
    expect(filterBookingsByStatus(BOOKINGS_SEED, 'all')).toHaveLength(BOOKINGS_SEED.length);
  });

  it('paginates bookings using the configured page size', () => {
    const pageOne = paginateBookings(BOOKINGS_SEED, 1, BOOKINGS_PAGE_SIZE);
    const pageTwo = paginateBookings(BOOKINGS_SEED, 2, BOOKINGS_PAGE_SIZE);

    expect(pageOne).toHaveLength(BOOKINGS_PAGE_SIZE);
    expect(pageTwo).toHaveLength(BOOKINGS_SEED.length - BOOKINGS_PAGE_SIZE);
  });

  it('builds the summary subtitle from booking data', () => {
    const summary = getBookingsSummary(BOOKINGS_SEED);

    expect(summary.totalOrders).toBe(10);
    expect(summary.awaitingMaterialPaymentCount).toBe(1);
    expect(summary.subtitle).toBe('10 orders · 1 awaiting material payment');
  });

  it('counts bookings awaiting material payment', () => {
    expect(getAwaitingMaterialPaymentCount(BOOKINGS_SEED)).toBe(1);
  });

  it('formats pagination range labels', () => {
    expect(getPaginationRangeLabel(1, BOOKINGS_PAGE_SIZE, 10)).toBe(
      'Showing 1 to 7 of 10 results',
    );
    expect(getPaginationRangeLabel(2, BOOKINGS_PAGE_SIZE, 10)).toBe(
      'Showing 8 to 10 of 10 results',
    );
  });

  it('calculates total pages', () => {
    expect(getTotalPages(10, BOOKINGS_PAGE_SIZE)).toBe(2);
    expect(getTotalPages(0, BOOKINGS_PAGE_SIZE)).toBe(1);
  });

  it('formats service cost values', () => {
    expect(formatServiceCost(100)).toBe('$100');
    expect(formatServiceCost(299)).toBe('$299');
  });

  it('updates a booking status immutably', () => {
    const updated = updateBookingStatus(BOOKINGS_SEED, 'BK-001', 'completed');

    expect(updated.find((booking) => booking.id === 'BK-001')?.statusId).toBe('completed');
    expect(BOOKINGS_SEED.find((booking) => booking.id === 'BK-001')?.statusId).toBe('new');
  });
});
