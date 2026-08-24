import {
  filterCustomersByStatus,
  formatTotalBookingsPrice,
  getCustomersSummary,
  getPaginationRangeLabel,
  getTotalPages,
  paginateCustomers,
  updateCustomerStatus,
} from '../customersUtils';
import { CUSTOMERS_PAGE_SIZE, CUSTOMERS_SEED } from '../customersData';

describe('customersUtils', () => {
  it('filters customers by status id', () => {
    const filtered = filterCustomersByStatus(CUSTOMERS_SEED, 'suspend');

    expect(filtered.every((customer) => customer.statusId === 'suspend')).toBe(true);
    expect(filtered.length).toBeGreaterThan(0);
  });

  it('returns all customers for the all filter', () => {
    expect(filterCustomersByStatus(CUSTOMERS_SEED, 'all')).toHaveLength(CUSTOMERS_SEED.length);
  });

  it('paginates customers with the Figma page size', () => {
    const pageOne = paginateCustomers(CUSTOMERS_SEED, 1, CUSTOMERS_PAGE_SIZE);
    const pageTwo = paginateCustomers(CUSTOMERS_SEED, 2, CUSTOMERS_PAGE_SIZE);

    expect(pageOne).toHaveLength(CUSTOMERS_PAGE_SIZE);
    expect(pageTwo).toHaveLength(CUSTOMERS_SEED.length - CUSTOMERS_PAGE_SIZE);
    expect(getTotalPages(CUSTOMERS_SEED.length, CUSTOMERS_PAGE_SIZE)).toBe(2);
  });

  it('builds the customers summary subtitle', () => {
    const summary = getCustomersSummary(CUSTOMERS_SEED);

    expect(summary.totalCustomers).toBe(CUSTOMERS_SEED.length);
    expect(summary.subtitle).toBe(`${CUSTOMERS_SEED.length} customers`);
  });

  it('builds the pagination range label', () => {
    expect(getPaginationRangeLabel(1, CUSTOMERS_PAGE_SIZE, CUSTOMERS_SEED.length)).toBe(
      'Showing 1 to 7 of 10 results',
    );
    expect(getPaginationRangeLabel(2, CUSTOMERS_PAGE_SIZE, CUSTOMERS_SEED.length)).toBe(
      'Showing 8 to 10 of 10 results',
    );
    expect(getPaginationRangeLabel(1, CUSTOMERS_PAGE_SIZE, 0)).toBe(
      'Showing 0 to 0 of 0 results',
    );
  });

  it('formats total bookings price with commas', () => {
    expect(formatTotalBookingsPrice(1000)).toBe('$1,000');
    expect(formatTotalBookingsPrice(100089)).toBe('$100,089');
  });

  it('updates customer status immutably', () => {
    const updated = updateCustomerStatus(CUSTOMERS_SEED, 'CU-001', 'suspend');

    expect(updated.find((customer) => customer.id === 'CU-001')?.statusId).toBe('suspend');
    expect(CUSTOMERS_SEED.find((customer) => customer.id === 'CU-001')?.statusId).toBe('active');
  });
});
