import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import BookingsCreateOfferModal from '../BookingsCreateOfferModal';
import { BOOKINGS_CREATE_OFFER_COPY } from '../bookingsCreateOfferCopy';
import {
  BOOKINGS_CREATE_OFFER_DIALOG_CLASS,
  BOOKINGS_CREATE_OFFER_OVERLAY_CLASS,
} from '../bookingsCreateOfferData';
import { resetOfferProductSequence } from '../bookingsCreateOfferUtils';

describe('BookingsCreateOfferModal', () => {
  beforeEach(() => {
    resetOfferProductSequence();
  });

  it('renders the Figma create offer form', () => {
    render(
      <BookingsCreateOfferModal bookingId="BK-001" onClose={jest.fn()} onSend={jest.fn()} />,
    );

    const dialog = screen.getByRole('dialog', { name: BOOKINGS_CREATE_OFFER_COPY.regionLabel });

    expect(dialog).toBeInTheDocument();
    expect(dialog.className).toBe(BOOKINGS_CREATE_OFFER_DIALOG_CLASS);
    expect(screen.getByTestId('bookings-create-offer-overlay').className).toBe(
      BOOKINGS_CREATE_OFFER_OVERLAY_CLASS,
    );
    expect(screen.getByText(BOOKINGS_CREATE_OFFER_COPY.title)).toBeInTheDocument();
    expect(screen.getByText(BOOKINGS_CREATE_OFFER_COPY.subtitle)).toBeInTheDocument();
    expect(screen.getByLabelText(BOOKINGS_CREATE_OFFER_COPY.productName)).toBeInTheDocument();
    expect(screen.getByLabelText(BOOKINGS_CREATE_OFFER_COPY.quantity)).toBeInTheDocument();
    expect(screen.getByLabelText(BOOKINGS_CREATE_OFFER_COPY.price)).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: BOOKINGS_CREATE_OFFER_COPY.addNewProduct }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: BOOKINGS_CREATE_OFFER_COPY.cancel }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: BOOKINGS_CREATE_OFFER_COPY.sendOffer }),
    ).toBeInTheDocument();
  });

  it('centers the create offer dialog on Mobile L/M/S', () => {
    render(
      <BookingsCreateOfferModal bookingId="BK-001" onClose={jest.fn()} onSend={jest.fn()} />,
    );

    const overlay = screen.getByTestId('bookings-create-offer-overlay');

    expect(overlay.className).toContain('items-center');
    expect(overlay.className).toContain('justify-center');
    expect(overlay.className).not.toContain('items-end');
  });

  it('adds another product row when Add New Product is clicked', async () => {
    const user = userEvent.setup();

    render(
      <BookingsCreateOfferModal bookingId="BK-001" onClose={jest.fn()} onSend={jest.fn()} />,
    );

    await user.click(
      screen.getByRole('button', { name: BOOKINGS_CREATE_OFFER_COPY.addNewProduct }),
    );

    expect(screen.getAllByLabelText(BOOKINGS_CREATE_OFFER_COPY.productName)).toHaveLength(2);
  });

  it('shows inline validation errors and does not send an empty offer', async () => {
    const user = userEvent.setup();
    const onSend = jest.fn();

    render(
      <BookingsCreateOfferModal bookingId="BK-001" onClose={jest.fn()} onSend={onSend} />,
    );

    await user.click(screen.getByRole('button', { name: BOOKINGS_CREATE_OFFER_COPY.sendOffer }));

    expect(screen.getByText(BOOKINGS_CREATE_OFFER_COPY.errors.productNameRequired)).toBeInTheDocument();
    expect(onSend).not.toHaveBeenCalled();
  });

  it('closes from Cancel and the header close control', async () => {
    const user = userEvent.setup();
    const onClose = jest.fn();

    render(
      <BookingsCreateOfferModal bookingId="BK-001" onClose={onClose} onSend={jest.fn()} />,
    );

    await user.click(screen.getByRole('button', { name: BOOKINGS_CREATE_OFFER_COPY.cancel }));
    expect(onClose).toHaveBeenCalledTimes(1);

    await user.click(screen.getByRole('button', { name: BOOKINGS_CREATE_OFFER_COPY.closeLabel }));
    expect(onClose).toHaveBeenCalledTimes(2);
  });

  it('submits a filled offer from the form', async () => {
    const user = userEvent.setup();
    const onSend = jest.fn();
    const onClose = jest.fn();

    render(
      <BookingsCreateOfferModal bookingId="BK-001" onClose={onClose} onSend={onSend} />,
    );

    await user.type(
      screen.getByPlaceholderText(BOOKINGS_CREATE_OFFER_COPY.productNamePlaceholder),
      'AWG Wire 10/2',
    );
    await user.type(
      screen.getByPlaceholderText(BOOKINGS_CREATE_OFFER_COPY.quantityPlaceholder),
      '50 ft',
    );
    await user.type(screen.getByPlaceholderText(BOOKINGS_CREATE_OFFER_COPY.pricePlaceholder), '40');
    await user.click(screen.getByRole('button', { name: BOOKINGS_CREATE_OFFER_COPY.sendOffer }));

    expect(onSend).toHaveBeenCalledWith(
      expect.objectContaining({
        bookingId: 'BK-001',
        totalLabel: '$40',
      }),
    );
    expect(onClose).toHaveBeenCalled();
  });
});
