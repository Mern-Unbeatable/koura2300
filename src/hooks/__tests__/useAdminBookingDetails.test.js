import { act, renderHook } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { ROUTES } from '../../config';
import { BOOKINGS_SEED } from '../../components/admin/bookings/bookingsData';
import useAdminBookingDetails from '../useAdminBookingDetails';

const requiredBooking = BOOKINGS_SEED.find((booking) => booking.material === 'required');
const noneBooking = BOOKINGS_SEED.find((booking) => booking.material === 'none');

const renderDetailsHook = (bookingId) =>
  renderHook(() => useAdminBookingDetails(), {
    wrapper: ({ children }) => (
      <MemoryRouter initialEntries={[`/admin/bookings/${bookingId}`]}>
        <Routes>
          <Route path={ROUTES.ADMIN_BOOKING_DETAILS} element={children} />
        </Routes>
      </MemoryRouter>
    ),
  });

describe('useAdminBookingDetails', () => {
  it('opens and closes chat for material required bookings', () => {
    const { result } = renderDetailsHook(requiredBooking.id);

    expect(result.current.booking.id).toBe(requiredBooking.id);
    expect(result.current.chatBookingId).toBeNull();

    act(() => {
      result.current.onChatWithCustomer(requiredBooking.id);
    });

    expect(result.current.chatBookingId).toBe(requiredBooking.id);

    act(() => {
      result.current.onCloseChatWithCustomer();
    });

    expect(result.current.chatBookingId).toBeNull();
  });

  it('opens chat for material none bookings on the same path', () => {
    const { result } = renderDetailsHook(noneBooking.id);

    act(() => {
      result.current.onChatWithCustomer(noneBooking.id);
    });

    expect(result.current.chatBookingId).toBe(noneBooking.id);
  });
});
