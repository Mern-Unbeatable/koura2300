import { act, renderHook } from '@testing-library/react';
import toast from 'react-hot-toast';
import useAdminBookings from '../useAdminBookings';
import { BOOKINGS_COPY } from '../../components/admin/bookings/bookingsCopy';
import { BOOKINGS_PAGE_SIZE, BOOKINGS_SEED } from '../../components/admin/bookings/bookingsData';
import { buildAdminBookingDetailsRoute } from '../../config';

const mockNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate,
}));

jest.mock('react-hot-toast', () => ({
  __esModule: true,
  default: {
    success: jest.fn(),
  },
}));

describe('useAdminBookings', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('returns seeded bookings for the first page', () => {
    const { result } = renderHook(() => useAdminBookings());

    expect(result.current.copy).toBe(BOOKINGS_COPY);
    expect(result.current.bookings).toHaveLength(BOOKINGS_PAGE_SIZE);
    expect(result.current.bookings[0].id).toBe('BK-001');
    expect(result.current.summarySubtitle).toBe('10 orders · 1 awaiting material payment');
  });

  it('filters bookings by status and resets pagination', () => {
    const { result } = renderHook(() => useAdminBookings());

    act(() => {
      result.current.onStatusFilterChange({ target: { value: 'completed' } });
    });

    expect(result.current.selectedStatusId).toBe('completed');
    expect(result.current.bookings).toHaveLength(1);
    expect(result.current.bookings[0].statusId).toBe('completed');
    expect(result.current.pagination.canGoPrevious).toBe(false);
  });

  it('moves to the next page of filtered bookings', () => {
    const { result } = renderHook(() => useAdminBookings());

    act(() => {
      result.current.pagination.onNext();
    });

    expect(result.current.bookings[0].id).toBe('BK-008');
    expect(result.current.pagination.canGoPrevious).toBe(true);
  });

  it('updates booking status and closes the action menu', () => {
    const { result } = renderHook(() => useAdminBookings());

    act(() => {
      result.current.onToggleActionMenu('BK-001');
    });

    expect(result.current.openActionMenuId).toBe('BK-001');

    act(() => {
      result.current.onStatusChange('BK-001', 'completed');
    });

    expect(result.current.openActionMenuId).toBeNull();
    expect(result.current.bookings.find((booking) => booking.id === 'BK-001')?.statusId).toBe(
      'completed',
    );
    expect(BOOKINGS_SEED.find((booking) => booking.id === 'BK-001')?.statusId).toBe('new');
    expect(toast.success).toHaveBeenCalledWith(BOOKINGS_COPY.toasts.statusUpdated);
  });

  it('navigates to booking details and shows toast for chat actions', () => {
    const { result } = renderHook(() => useAdminBookings());

    act(() => {
      result.current.onSeeDetails('BK-002');
      result.current.onChatWithCustomer('BK-002');
    });

    expect(mockNavigate).toHaveBeenCalledWith(buildAdminBookingDetailsRoute('BK-002'));
    expect(toast.success).toHaveBeenCalledWith(
      `${BOOKINGS_COPY.toasts.chatWithCustomer} (BK-002)`,
    );
  });
});
