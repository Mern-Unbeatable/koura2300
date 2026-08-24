import { act, renderHook } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { ROUTES } from '../../config';
import { BOOKINGS_SEED } from '../../components/admin/bookings/bookingsData';
import useAdminBookingDetails from '../useAdminBookingDetails';

const requiredBooking = BOOKINGS_SEED.find(
  (booking) => booking.material === 'required' && booking.preferredContact === 'chat',
);
const noneBooking = BOOKINGS_SEED.find((booking) => booking.material === 'none');
const phoneRequiredBooking = BOOKINGS_SEED.find(
  (booking) => booking.material === 'required' && booking.preferredContact === 'phone',
);

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

  it('opens add material and stores added items for phone preferred contact', () => {
    const { result } = renderDetailsHook(phoneRequiredBooking.id);

    expect(result.current.booking.materialItems).toEqual([]);
    expect(result.current.isAddMaterialOpen).toBe(false);

    act(() => {
      result.current.onOpenAddMaterial();
    });

    expect(result.current.isAddMaterialOpen).toBe(true);

    act(() => {
      result.current.onAddMaterial({
        materialItems: [{ id: 'm1', name: 'Panel', qty: '1', cost: '$40' }],
        materialTotal: '$40',
      });
      result.current.onCloseAddMaterial();
    });

    expect(result.current.isAddMaterialOpen).toBe(false);
    expect(result.current.booking.materialItems).toEqual([
      { id: 'm1', name: 'Panel', qty: '1', cost: '$40' },
    ]);
    expect(result.current.booking.materialTotal).toBe('$40');
  });
});
