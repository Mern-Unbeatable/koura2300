import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Bookings from '../../../../pages/admin/Bookings';
import { BOOKINGS_COPY } from '../bookingsCopy';
import { BOOKINGS_SEED } from '../bookingsData';

jest.mock('../../../../hooks/useAdminBookings', () => ({
  __esModule: true,
  default: jest.fn(),
}));

import useAdminBookings from '../../../../hooks/useAdminBookings';

const renderBookingsPage = () =>
  render(
    <MemoryRouter>
      <Bookings />
    </MemoryRouter>,
  );

describe('Bookings page integration', () => {
  beforeEach(() => {
    useAdminBookings.mockReturnValue({
      copy: BOOKINGS_COPY,
      bookings: BOOKINGS_SEED.slice(0, 7),
      summarySubtitle: '10 orders · 1 awaiting material payment',
      statusOptions: [],
      selectedStatusId: 'all',
      onStatusFilterChange: jest.fn(),
      pagination: {
        rangeLabel: 'Showing 1 to 7 of 10 results',
        canGoPrevious: false,
        canGoNext: true,
        onPrevious: jest.fn(),
        onNext: jest.fn(),
      },
      openActionMenuId: null,
      onToggleActionMenu: jest.fn(),
      onCloseActionMenu: jest.fn(),
      onSeeDetails: jest.fn(),
      chatBookingId: null,
      onChatWithCustomer: jest.fn(),
      onCloseChatWithCustomer: jest.fn(),
      onStatusChange: jest.fn(),
    });
  });

  it('renders BookingsView through the page wrapper', () => {
    renderBookingsPage();

    expect(
      screen.getByRole('heading', { level: 1, name: BOOKINGS_COPY.title }),
    ).toBeInTheDocument();
    expect(useAdminBookings).toHaveBeenCalled();
  });
});
