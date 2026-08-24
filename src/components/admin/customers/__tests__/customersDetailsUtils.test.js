import {
  buildCustomerDetails,
  getCustomerDetailsById,
  getCustomerInitials,
} from '../customersDetailsUtils';
import { CUSTOMERS_SEED } from '../customersData';

describe('customersDetailsUtils', () => {
  it('builds initials from the customer full name', () => {
    expect(getCustomerInitials('Daniel Okafor')).toBe('DO');
    expect(getCustomerInitials('Albert Flores')).toBe('AF');
    expect(getCustomerInitials('Prince')).toBe('PR');
  });

  it('returns null for an unknown customer id', () => {
    expect(getCustomerDetailsById('CU-MISSING')).toBeNull();
  });

  it('builds customer details for See Details modal', () => {
    const customer = CUSTOMERS_SEED.find((item) => item.id === 'CU-004');
    const details = getCustomerDetailsById(customer.id);

    expect(details).toEqual({
      id: 'CU-004',
      name: 'Cameron Williamson',
      initials: 'CW',
      statusId: 'active',
      email: 'kenzi.lawson@example.com',
      phone: '(406) 555-0120',
      address: '220 Main Ave, Billings',
      bookingsCount: 19,
      revenueLabel: '$40,000',
    });
  });

  it('falls back to the default address when missing', () => {
    const details = buildCustomerDetails({
      id: 'CU-X',
      name: 'Daniel Okafor',
      email: 'd.okafor@gmail.com',
      phone: '+1 510 555 3390',
      totalBookingsPrice: 4310,
      bookingsCount: 19,
      statusId: 'active',
    });

    expect(details.address).toBe('1901 Broadway, Apt 12, Oakland');
    expect(details.initials).toBe('DO');
    expect(details.revenueLabel).toBe('$4,310');
  });
});
