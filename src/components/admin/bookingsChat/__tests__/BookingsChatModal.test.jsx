import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import BookingsChatModal from '../BookingsChatModal';
import { BOOKINGS_CHAT_COPY } from '../bookingsChatCopy';
import { BOOKINGS_CREATE_OFFER_COPY } from '../bookingsCreateOfferCopy';
import {
  BOOKINGS_CHAT_DIALOG_CLASS,
  BOOKINGS_CHAT_OVERLAY_CLASS,
  BOOKINGS_CHAT_SEED_TIMESTAMP,
} from '../bookingsChatData';
import { resetOfferProductSequence } from '../bookingsCreateOfferUtils';

describe('BookingsChatModal', () => {
  beforeEach(() => {
    resetOfferProductSequence();
  });
  it('renders the Figma chat dialog for a booking', () => {
    render(<BookingsChatModal bookingId="BK-001" onClose={jest.fn()} />);

    const dialog = screen.getByRole('dialog', { name: BOOKINGS_CHAT_COPY.regionLabel });

    expect(dialog).toBeInTheDocument();
    expect(dialog.className).toContain('min-[426px]:max-w-[1200px]');
    expect(screen.getByText('Albert Flores')).toBeInTheDocument();
    expect(screen.getByText(BOOKINGS_CHAT_COPY.activeStatus)).toBeInTheDocument();
    expect(screen.getByText(BOOKINGS_CHAT_SEED_TIMESTAMP.dateLabel)).toBeInTheDocument();
    expect(screen.getByText(BOOKINGS_CHAT_SEED_TIMESTAMP.timeLabel)).toBeInTheDocument();
    expect(screen.getByText('Yo mandem')).toBeInTheDocument();
    expect(screen.getByText(BOOKINGS_CHAT_COPY.offerCard.title)).toBeInTheDocument();
    expect(screen.getByText('BK-001')).toBeInTheDocument();
    expect(screen.getByText('$185')).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: BOOKINGS_CHAT_COPY.createOffer }),
    ).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText(BOOKINGS_CHAT_COPY.inputPlaceholder),
    ).toBeInTheDocument();
  });

  it('uses responsive overlay and dialog classes for mobile through desktop', () => {
    render(<BookingsChatModal bookingId="BK-001" onClose={jest.fn()} />);

    const overlay = screen.getByTestId('bookings-chat-overlay');
    const dialog = screen.getByRole('dialog', { name: BOOKINGS_CHAT_COPY.regionLabel });

    expect(overlay.className).toBe(BOOKINGS_CHAT_OVERLAY_CLASS);
    expect(dialog.className).toContain(BOOKINGS_CHAT_DIALOG_CLASS);
    expect(dialog.className).toContain('relative');
    expect(overlay.className).toContain('items-center');
    expect(overlay.className).not.toContain('items-end');
    expect(dialog.className).toContain('rounded-[12px]');
    expect(dialog.className).toContain('max-h-[90dvh]');
  });

  it('closes from the header action and backdrop click', async () => {
    const user = userEvent.setup();
    const onClose = jest.fn();

    render(<BookingsChatModal bookingId="BK-001" onClose={onClose} />);

    await user.click(screen.getByRole('button', { name: BOOKINGS_CHAT_COPY.closeLabel }));
    expect(onClose).toHaveBeenCalledTimes(1);

    await user.click(screen.getByTestId('bookings-chat-overlay'));
    expect(onClose).toHaveBeenCalledTimes(2);
  });

  it('sends a composer message into the thread', async () => {
    const user = userEvent.setup();

    render(<BookingsChatModal bookingId="BK-001" onClose={jest.fn()} />);

    await user.type(
      screen.getByPlaceholderText(BOOKINGS_CHAT_COPY.inputPlaceholder),
      'Material quote ready',
    );
    await user.click(screen.getByRole('button', { name: BOOKINGS_CHAT_COPY.sendLabel }));

    expect(screen.getByText('Material quote ready')).toBeInTheDocument();
  });

  it('keeps offer card table columns readable on narrow viewports', () => {
    render(<BookingsChatModal bookingId="BK-001" onClose={jest.fn()} />);

    const offer = screen.getByTestId('bookings-chat-offer-card');
    const table = within(offer).getByRole('table');

    expect(table.className).toContain('table-fixed');
    expect(table.className).toContain('text-xs');
    expect(table.className).toContain('min-[376px]:text-sm');
    expect(within(offer).getByRole('button', { name: BOOKINGS_CHAT_COPY.offerCard.payNow })).toBeInTheDocument();
  });

  it('keeps the Send button beside the composer on Mobile L/M/S', () => {
    render(<BookingsChatModal bookingId="BK-001" onClose={jest.fn()} />);

    const sendButton = screen.getByRole('button', { name: BOOKINGS_CHAT_COPY.sendLabel });
    const composerRow = sendButton.parentElement;

    expect(composerRow.className).toContain('flex-row');
    expect(composerRow.className).toContain('items-center');
    expect(sendButton.className).toContain('size-10');
    expect(sendButton.className).toContain('min-[768px]:size-[52px]');
    expect(screen.getAllByRole('button', { name: BOOKINGS_CHAT_COPY.createOffer })).toHaveLength(
      1,
    );
  });

  it('opens Create Offer from the composer button', async () => {
    const user = userEvent.setup();

    render(<BookingsChatModal bookingId="BK-001" onClose={jest.fn()} />);

    await user.click(screen.getByRole('button', { name: BOOKINGS_CHAT_COPY.createOffer }));

    expect(
      screen.getByRole('dialog', { name: BOOKINGS_CREATE_OFFER_COPY.regionLabel }),
    ).toBeInTheDocument();
    expect(screen.getByText(BOOKINGS_CREATE_OFFER_COPY.subtitle)).toBeInTheDocument();
  });
});
