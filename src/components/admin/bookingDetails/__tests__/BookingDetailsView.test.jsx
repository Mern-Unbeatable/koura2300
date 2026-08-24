import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ROUTES } from '../../../../config';
import { BOOKINGS_SEED } from '../../bookings/bookingsData';
import BookingDetailsView from '../BookingDetailsView';
import { BOOKING_DETAILS_COPY } from '../bookingDetailsCopy';
import { getBookingDetailsById } from '../bookingDetailsUtils';

const requiredBooking = BOOKINGS_SEED.find(
  (booking) => booking.material === 'required' && booking.preferredContact === 'chat',
);
const noneBooking = BOOKINGS_SEED.find((booking) => booking.material === 'none');
const phoneRequiredBooking = BOOKINGS_SEED.find(
  (booking) => booking.material === 'required' && booking.preferredContact === 'phone',
);
const emailRequiredBooking = BOOKINGS_SEED.find(
  (booking) => booking.material === 'required' && booking.preferredContact === 'email',
);

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
    const details = getBookingDetailsById(noneBooking.id);

    expect(screen.getByText(BOOKING_DETAILS_COPY.sections.bookingSummary)).toBeInTheDocument();
    expect(screen.getByText(BOOKING_DETAILS_COPY.sections.customerInformation)).toBeInTheDocument();
    expect(screen.getByText(BOOKING_DETAILS_COPY.sections.serviceInformation)).toBeInTheDocument();
    expect(screen.getByText(BOOKING_DETAILS_COPY.sections.bookingPayment)).toBeInTheDocument();
    expect(screen.getByText(BOOKING_DETAILS_COPY.sections.orderTimeline)).toBeInTheDocument();
    expect(
      screen.queryByText(BOOKING_DETAILS_COPY.sections.materialInformation),
    ).not.toBeInTheDocument();
    expect(screen.getByText(details.customer.preferredContact)).toHaveTextContent('N/A');
  });

  it('renders the material information section only for required material', () => {
    renderDetails(requiredBooking.id);

    const materials = screen.getByTestId('booking-details-materials');

    expect(screen.getByText(BOOKING_DETAILS_COPY.sections.materialInformation)).toBeInTheDocument();
    expect(within(materials).getAllByText(BOOKING_DETAILS_COPY.badges.paymentRequired).length).toBe(
      2,
    );
    expect(within(materials).getByText(BOOKING_DETAILS_COPY.labels.materialRequired)).toBeInTheDocument();
    expect(within(materials).getByText(BOOKING_DETAILS_COPY.labels.yes)).toBeInTheDocument();
    expect(within(materials).getByText('200A Main Breaker Panel')).toBeInTheDocument();
    expect(within(materials).getByText('$185')).toBeInTheDocument();
    expect(
      within(materials).queryByRole('button', { name: BOOKING_DETAILS_COPY.actions.addMaterial }),
    ).not.toBeInTheDocument();
  });

  it.each([
    ['phone', phoneRequiredBooking.id],
    ['email', emailRequiredBooking.id],
  ])(
    'shows Add Material header for required + %s preferred contact',
    (_label, bookingId) => {
      const onOpenAddMaterial = jest.fn();
      renderDetails(bookingId, { onOpenAddMaterial });

      const materials = screen.getByTestId('booking-details-materials');
      const addButton = within(materials).getByRole('button', {
        name: BOOKING_DETAILS_COPY.actions.addMaterial,
      });

      expect(within(materials).queryByRole('table')).not.toBeInTheDocument();
      expect(
        within(materials).queryByText(BOOKING_DETAILS_COPY.badges.paymentRequired),
      ).not.toBeInTheDocument();
      expect(addButton).toBeInTheDocument();
    },
  );

  it('opens the Add Material modal for phone preferred contact', async () => {
    const user = userEvent.setup();
    const onOpenAddMaterial = jest.fn();

    renderDetails(phoneRequiredBooking.id, { onOpenAddMaterial });

    await user.click(
      screen.getByRole('button', { name: BOOKING_DETAILS_COPY.actions.addMaterial }),
    );

    expect(onOpenAddMaterial).toHaveBeenCalled();
  });

  it('renders the Add Material modal when open', () => {
    renderDetails(phoneRequiredBooking.id, {
      isAddMaterialOpen: true,
      onCloseAddMaterial: jest.fn(),
      onAddMaterial: jest.fn(),
    });

    expect(screen.getByRole('dialog', { name: /add material offer card/i })).toBeInTheDocument();
    expect(screen.getByTestId('booking-details-add-material-overlay')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Add' })).toBeInTheDocument();
  });

  it('fits Material Information on Mobile L/M/S without a forced table min-width', () => {
    renderDetails(requiredBooking.id);

    const materials = screen.getByTestId('booking-details-materials');
    const table = within(materials).getByRole('table');
    const badges = within(materials).getAllByText(BOOKING_DETAILS_COPY.badges.paymentRequired);

    expect(table.className).toContain('table-fixed');
    expect(table.className).toContain('max-[425px]:text-xs');
    expect(table.className).not.toContain('min-w-[');
    expect(badges).toHaveLength(2);
    expect(badges[0].className).toContain('min-[426px]:inline-flex');
    expect(badges[1].className).toContain('min-[426px]:hidden');
  });

  it('uses the same start-aligned meta grid for Booking Summary and Customer Information', () => {
    renderDetails(requiredBooking.id);
    const details = getBookingDetailsById(requiredBooking.id);
    const stacks = screen.getAllByTestId('booking-details-meta-stack');

    expect(stacks).toHaveLength(2);
    stacks.forEach((stack) => {
      expect(stack.className).toContain('gap-[14px]');
      const firstRow = stack.firstElementChild;
      expect(firstRow.className).toContain('min-[426px]:grid-cols-2');
      expect(firstRow.className).toContain('min-[426px]:gap-x-[76px]');
    });

    expect(screen.getByText(details.summary.appointmentDate).parentElement).toHaveClass(
      'items-start',
      'text-left',
    );
    expect(screen.getByText(details.customer.location).parentElement).toHaveClass(
      'items-start',
      'text-left',
    );
    expect(screen.getByText(details.customer.preferredContact).parentElement).toHaveClass(
      'items-start',
      'text-left',
    );
  });

  it('highlights appointment date and customer location like Figma', () => {
    renderDetails(requiredBooking.id);
    const details = getBookingDetailsById(requiredBooking.id);

    expect(screen.getByText(details.summary.appointmentDate)).toHaveClass('text-[#fc6f32]');
    expect(screen.getByText(details.customer.location)).toHaveClass('text-[#fc6f32]');
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

  it('hides Chat with customer for phone or email preferred contact', () => {
    renderDetails(phoneRequiredBooking.id);

    expect(
      screen.queryByRole('button', { name: BOOKING_DETAILS_COPY.actions.chatWithCustomer }),
    ).not.toBeInTheDocument();

    renderDetails(emailRequiredBooking.id);

    expect(
      screen.queryByRole('button', { name: BOOKING_DETAILS_COPY.actions.chatWithCustomer }),
    ).not.toBeInTheDocument();
  });

  it('hides Chat with customer for material none bookings with N/A preferred contact', () => {
    renderDetails(noneBooking.id);

    expect(
      screen.queryByRole('button', { name: BOOKING_DETAILS_COPY.actions.chatWithCustomer }),
    ).not.toBeInTheDocument();
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

  it('opens Chat With Customer modal when chatBookingId is set', () => {
    renderDetails(requiredBooking.id, {
      chatBookingId: requiredBooking.id,
      onCloseChatWithCustomer: jest.fn(),
    });

    expect(screen.getByRole('dialog', { name: /chat with customer/i })).toBeInTheDocument();
    expect(screen.getByTestId('bookings-chat-overlay')).toBeInTheDocument();
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
