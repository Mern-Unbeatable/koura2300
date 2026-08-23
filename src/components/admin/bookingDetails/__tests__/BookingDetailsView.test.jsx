import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ROUTES } from '../../../../config';
import { BOOKINGS_SEED } from '../../bookings/bookingsData';
import BookingDetailsView from '../BookingDetailsView';
import { BOOKING_DETAILS_COPY } from '../bookingDetailsCopy';
import { getBookingDetailsById } from '../bookingDetailsUtils';

const requiredBooking = BOOKINGS_SEED.find((booking) => booking.material === 'required');
const noneBooking = BOOKINGS_SEED.find((booking) => booking.material === 'none');

const renderDetails = (bookingId, overrides = {}) => {
  const details = getBookingDetailsById(bookingId);

  return render(
    <MemoryRouter initialEntries={[`/admin/bookings/${bookingId}`]}>
      <Routes>
        <Route
          path={ROUTES.ADMIN_BOOKING_DETAILS}
          element={
            <BookingDetailsView
              copy={BOOKING_DETAILS_COPY}
              booking={details}
              onChatWithCustomer={jest.fn()}
              {...overrides}
            />
          }
        />
        <Route path={ROUTES.ADMIN_BOOKINGS} element={<div>Bookings list</div>} />
      </Routes>
    </MemoryRouter>,
  );
};

describe('BookingDetailsView', () => {
  it('renders the Figma header for a booking', () => {
    renderDetails(requiredBooking.id);

    expect(
      screen.getByRole('heading', {
        level: 1,
        name: `Booking ${requiredBooking.id}`,
      }),
    ).toBeInTheDocument();
    expect(screen.getByText(/Created/i)).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: BOOKING_DETAILS_COPY.actions.chatWithCustomer }),
    ).toBeInTheDocument();
    expect(screen.getByRole('link', { name: BOOKING_DETAILS_COPY.actions.back })).toHaveAttribute(
      'href',
      ROUTES.ADMIN_BOOKINGS,
    );
  });

  it('renders shared detail sections for material none bookings', () => {
    renderDetails(noneBooking.id);

    expect(screen.getByText(BOOKING_DETAILS_COPY.sections.bookingSummary)).toBeInTheDocument();
    expect(screen.getByText(BOOKING_DETAILS_COPY.sections.customerInformation)).toBeInTheDocument();
    expect(screen.getByText(BOOKING_DETAILS_COPY.sections.serviceInformation)).toBeInTheDocument();
    expect(screen.getByText(BOOKING_DETAILS_COPY.sections.bookingPayment)).toBeInTheDocument();
    expect(screen.getByText(BOOKING_DETAILS_COPY.sections.orderTimeline)).toBeInTheDocument();
    expect(
      screen.queryByText(BOOKING_DETAILS_COPY.sections.materialInformation),
    ).not.toBeInTheDocument();
  });

  it('renders the material information section only for required material', () => {
    renderDetails(requiredBooking.id);

    const materials = screen.getByTestId('booking-details-materials');

    expect(screen.getByText(BOOKING_DETAILS_COPY.sections.materialInformation)).toBeInTheDocument();
    expect(within(materials).getByText(BOOKING_DETAILS_COPY.badges.paymentRequired)).toBeInTheDocument();
    expect(within(materials).getByText(BOOKING_DETAILS_COPY.labels.materialRequired)).toBeInTheDocument();
    expect(within(materials).getByText(BOOKING_DETAILS_COPY.labels.yes)).toBeInTheDocument();
    expect(within(materials).getByText('200A Main Breaker Panel')).toBeInTheDocument();
    expect(within(materials).getByText('$185')).toBeInTheDocument();
  });

  it('highlights appointment date and customer location like Figma', () => {
    renderDetails(requiredBooking.id);
    const details = getBookingDetailsById(requiredBooking.id);

    expect(screen.getByText(details.summary.appointmentDate)).toHaveClass('text-[#f54900]');
    expect(screen.getByText(details.customer.location)).toHaveClass('text-[#f54900]');
  });

  it('renders the Figma service price bar and a larger booking payment amount', () => {
    renderDetails(noneBooking.id);
    const details = getBookingDetailsById(noneBooking.id);
    const priceBar = screen.getByTestId('booking-details-service-price');

    expect(priceBar).toHaveTextContent(BOOKING_DETAILS_COPY.labels.startingPrice);
    expect(priceBar).toHaveTextContent(details.service.startingPrice);
    expect(priceBar).toHaveTextContent(BOOKING_DETAILS_COPY.labels.onwards);
    expect(priceBar).toHaveTextContent(BOOKING_DETAILS_COPY.labels.collectedAfter);
    expect(priceBar).toHaveTextContent(BOOKING_DETAILS_COPY.labels.completion);
    expect(priceBar.className).toContain('bg-[#f8fafc]');
    expect(
      screen.getAllByText(details.payment.bookingPrice).some((node) =>
        node.className.includes('text-2xl'),
      ),
    ).toBe(true);
  });

  it('uses responsive layout classes for the top summary grid', () => {
    renderDetails(requiredBooking.id);

    expect(screen.getByTestId('booking-details-top-grid')).toHaveClass(
      'grid',
      'grid-cols-1',
      'items-stretch',
      'min-[768px]:grid-cols-2',
    );
  });

  it('calls chat handler from the header action', async () => {
    const user = userEvent.setup();
    const onChatWithCustomer = jest.fn();

    renderDetails(requiredBooking.id, { onChatWithCustomer });

    await user.click(
      screen.getByRole('button', { name: BOOKING_DETAILS_COPY.actions.chatWithCustomer }),
    );

    expect(onChatWithCustomer).toHaveBeenCalledWith(requiredBooking.id);
  });

  it('renders not found state for missing bookings', () => {
    render(
      <MemoryRouter>
        <BookingDetailsView
          copy={BOOKING_DETAILS_COPY}
          booking={null}
          onChatWithCustomer={jest.fn()}
        />
      </MemoryRouter>,
    );

    expect(screen.getByText(BOOKING_DETAILS_COPY.notFound.title)).toBeInTheDocument();
    expect(
      screen.getByRole('link', { name: BOOKING_DETAILS_COPY.notFound.backLabel }),
    ).toHaveAttribute('href', ROUTES.ADMIN_BOOKINGS);
  });
});
