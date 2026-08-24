import { act, renderHook } from '@testing-library/react';
import toast from 'react-hot-toast';
import { CUSTOMERS_COPY } from '../../components/admin/customers/customersCopy';
import { CUSTOMERS_PAGE_SIZE, CUSTOMERS_SEED } from '../../components/admin/customers/customersData';
import { CUSTOMERS_SUSPEND_COPY } from '../../components/admin/customers/customersSuspendCopy';
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

  it('activates a customer immediately and closes the action menu', () => {
    const { result } = renderHook(() => useAdminCustomers());

    act(() => {
      result.current.onToggleActionMenu('CU-002');
    });

    expect(result.current.openActionMenuId).toBe('CU-002');

    act(() => {
      result.current.onStatusChange('CU-002', 'active');
    });

    expect(result.current.openActionMenuId).toBeNull();
    expect(result.current.isSuspendModalOpen).toBe(false);
    expect(toast.success).toHaveBeenCalledWith(CUSTOMERS_COPY.toasts.statusUpdated);
  });

  it('opens the suspend modal instead of suspending immediately', () => {
    const { result } = renderHook(() => useAdminCustomers());

    act(() => {
      result.current.onToggleActionMenu('CU-001');
    });

    act(() => {
      result.current.onStatusChange('CU-001', 'suspend');
    });

    expect(result.current.openActionMenuId).toBeNull();
    expect(result.current.isSuspendModalOpen).toBe(true);
    expect(toast.success).not.toHaveBeenCalled();
    expect(CUSTOMERS_SEED.find((customer) => customer.id === 'CU-001')?.statusId).toBe('active');
  });

  it('confirms suspend with a reason and closes the modal', () => {
    const { result } = renderHook(() => useAdminCustomers());

    act(() => {
      result.current.onStatusChange('CU-001', 'suspend');
    });

    act(() => {
      result.current.onConfirmSuspend('Policy violation');
    });

    expect(result.current.isSuspendModalOpen).toBe(false);
    expect(toast.success).toHaveBeenCalledWith(CUSTOMERS_SUSPEND_COPY.successToast);

    act(() => {
      result.current.onStatusFilterChange({ target: { value: 'suspend' } });
    });

    expect(result.current.customers.some((customer) => customer.id === 'CU-001')).toBe(true);
  });

  it('closes the suspend modal without changing status', () => {
    const { result } = renderHook(() => useAdminCustomers());

    act(() => {
      result.current.onStatusChange('CU-001', 'suspend');
    });

    act(() => {
      result.current.onCloseSuspend();
    });

    expect(result.current.isSuspendModalOpen).toBe(false);
    expect(toast.success).not.toHaveBeenCalled();
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
