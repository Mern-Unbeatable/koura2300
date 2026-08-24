import { act, renderHook } from '@testing-library/react';
import toast from 'react-hot-toast';
import { CUSTOMERS_COPY } from '../../components/admin/customers/customersCopy';
import { CUSTOMERS_PAGE_SIZE, CUSTOMERS_SEED } from '../../components/admin/customers/customersData';
import useAdminCustomers from '../useAdminCustomers';

jest.mock('react-hot-toast', () => ({
  __esModule: true,
  default: {
    success: jest.fn(),
  },
}));

describe('useAdminCustomers', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('paginates seeded customers and exposes the summary subtitle', () => {
    const { result } = renderHook(() => useAdminCustomers());

    expect(result.current.customers).toHaveLength(CUSTOMERS_PAGE_SIZE);
    expect(result.current.summarySubtitle).toBe(`${CUSTOMERS_SEED.length} customers`);
    expect(result.current.selectedStatusId).toBe('all');
  });

  it('filters customers by status and resets to the first page', () => {
    const { result } = renderHook(() => useAdminCustomers());

    act(() => {
      result.current.onStatusFilterChange({ target: { value: 'suspend' } });
    });

    expect(result.current.selectedStatusId).toBe('suspend');
    expect(result.current.customers.every((customer) => customer.statusId === 'suspend')).toBe(
      true,
    );
  });

  it('updates customer status and closes the action menu', () => {
    const { result } = renderHook(() => useAdminCustomers());

    act(() => {
      result.current.onToggleActionMenu('CU-001');
    });

    expect(result.current.openActionMenuId).toBe('CU-001');

    act(() => {
      result.current.onStatusChange('CU-001', 'suspend');
    });

    expect(result.current.openActionMenuId).toBeNull();
    expect(toast.success).toHaveBeenCalledWith(CUSTOMERS_COPY.toasts.statusUpdated);
    expect(CUSTOMERS_SEED.find((customer) => customer.id === 'CU-001')?.statusId).toBe('active');
  });

  it('opens customer details when see details is requested', () => {
    const { result } = renderHook(() => useAdminCustomers());

    act(() => {
      result.current.onSeeDetails('CU-004');
    });

    expect(result.current.openActionMenuId).toBeNull();
    expect(result.current.customerDetails).toMatchObject({
      id: 'CU-004',
      name: 'Cameron Williamson',
      initials: 'CW',
      bookingsCount: 19,
      revenueLabel: '$40,000',
    });

    act(() => {
      result.current.onCloseDetails();
    });

    expect(result.current.customerDetails).toBeNull();
  });
});
