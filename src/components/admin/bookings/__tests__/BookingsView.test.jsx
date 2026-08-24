import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import BookingsView from '../BookingsView';
import { BOOKINGS_COPY } from '../bookingsCopy';
import {
  BOOKINGS_SEED,
  BOOKINGS_STATUS_OPTIONS,
  BOOKINGS_TABLE_CARD_CLASS,
  BOOKINGS_TABLE_MIN_WIDTH_PX,
  BOOKINGS_VIEWPORT,
} from '../bookingsData';
import { BOOKINGS_CARDS_MEDIA_QUERY } from '../useBookingsCompactLayout';

const mockMatchMedia = (matchesCompactLayout) => {
  Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: (query) => ({
      matches: matchesCompactLayout && query === BOOKINGS_CARDS_MEDIA_QUERY,
      media: query,
      onchange: null,
      addListener: () => {},
      removeListener: () => {},
      addEventListener: () => {},
      removeEventListener: () => {},
      dispatchEvent: () => false,
    }),
  });
};

const createBookingsViewProps = (overrides = {}) => ({
  copy: BOOKINGS_COPY,
  bookings: BOOKINGS_SEED.slice(0, 7),
  summarySubtitle: '10 orders · 1 awaiting material payment',
  statusOptions: BOOKINGS_STATUS_OPTIONS,
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
  ...overrides,
});

describe('BookingsView', () => {
  beforeEach(() => {
    mockMatchMedia(false);
  });
  it('renders the order management header from Figma copy', () => {
    render(<BookingsView {...createBookingsViewProps()} />);

    expect(
      screen.getByRole('heading', { level: 1, name: BOOKINGS_COPY.title }),
    ).toBeInTheDocument();
    expect(screen.getByText('10 orders · 1 awaiting material payment')).toBeInTheDocument();
  });

  it('renders bookings table columns and seeded rows', () => {
    render(<BookingsView {...createBookingsViewProps()} />);

    const table = screen.getByRole('table', { name: BOOKINGS_COPY.tableLabel });

    expect(within(table).getByText(BOOKINGS_COPY.columns.bookingId)).toBeInTheDocument();
    expect(within(table).getByText(BOOKINGS_COPY.columns.customer)).toBeInTheDocument();
    expect(within(table).getByText(BOOKINGS_COPY.columns.preferredContact)).toBeInTheDocument();
    expect(within(table).getByText('BK-001')).toBeInTheDocument();
    expect(within(table).getByText('Albert Flores')).toBeInTheDocument();
    expect(within(table).getByText('Ceiling Light Installation')).toBeInTheDocument();
    expect(within(table).getAllByText(BOOKINGS_COPY.preferredContact.chat).length).toBeGreaterThan(0);
  });

  it('renders status badges and material states', () => {
    render(<BookingsView {...createBookingsViewProps()} />);

    const table = screen.getByRole('table', { name: BOOKINGS_COPY.tableLabel });

    expect(within(table).getAllByText('New').length).toBeGreaterThan(0);
    expect(within(table).getAllByText(BOOKINGS_COPY.material.required).length).toBeGreaterThan(0);
    expect(within(table).getAllByText(BOOKINGS_COPY.material.none).length).toBeGreaterThan(0);
  });

  it('changes the status filter', async () => {
    const user = userEvent.setup();
    const onStatusFilterChange = jest.fn();

    render(
      <BookingsView
        {...createBookingsViewProps({
          onStatusFilterChange,
        })}
      />,
    );

    await user.selectOptions(
      screen.getByLabelText(BOOKINGS_COPY.statusFilterLabel),
      'completed',
    );

    expect(onStatusFilterChange).toHaveBeenCalled();
  });

  it('opens the row action menu with Figma actions', async () => {
    const user = userEvent.setup();
    const onToggleActionMenu = jest.fn();

    render(
      <BookingsView
        {...createBookingsViewProps({
          onToggleActionMenu,
        })}
      />,
    );

    await user.click(screen.getAllByLabelText(BOOKINGS_COPY.actionMenu.label)[0]);

    expect(onToggleActionMenu).toHaveBeenCalledWith('BK-001');
  });

  it('shows the action menu when a row is active', async () => {
    const user = userEvent.setup();
    const onSeeDetails = jest.fn();
    const onStatusChange = jest.fn();

    render(
      <BookingsView
        {...createBookingsViewProps({
          openActionMenuId: 'BK-001',
          onCloseActionMenu: jest.fn(),
          onSeeDetails,
          onStatusChange,
        })}
      />,
    );

    const menu = screen.getByRole('menu', { name: BOOKINGS_COPY.actionMenu.label });

    expect(screen.getByRole('menuitem', { name: BOOKINGS_COPY.actionMenu.seeDetails })).toBeInTheDocument();
    expect(screen.getByRole('menuitem', { name: BOOKINGS_COPY.actionMenu.chatWithCustomer })).toBeInTheDocument();
    expect(within(menu).getByText(BOOKINGS_COPY.actionMenu.statusHeading)).toBeInTheDocument();

    await user.click(screen.getByRole('menuitem', { name: 'Work In Progress' }));

    expect(onStatusChange).toHaveBeenCalledWith('BK-001', 'work-in-progress');
  });

  it('renders pagination controls and range label', async () => {
    const user = userEvent.setup();
    const onNext = jest.fn();

    render(
      <BookingsView
        {...createBookingsViewProps({
          pagination: {
            rangeLabel: 'Showing 1 to 7 of 10 results',
            canGoPrevious: false,
            canGoNext: true,
            onPrevious: jest.fn(),
            onNext,
          },
        })}
      />,
    );

    expect(screen.getByText('Showing 1 to 7 of 10 results')).toBeInTheDocument();

    await user.click(screen.getByRole('button', { name: BOOKINGS_COPY.pagination.next }));

    expect(onNext).toHaveBeenCalled();
  });

  it('uses responsive layout classes for header and table scroll', () => {
    const { container } = render(<BookingsView {...createBookingsViewProps()} />);

    expect(container.firstChild).toHaveClass('min-w-0', 'flex', 'flex-col');
    expect(screen.getByTestId('bookings-table-card')).toHaveClass(
      'min-w-0',
      'w-full',
      'overflow-hidden',
    );
    expect(screen.getByTestId('bookings-table-scroll')).toHaveClass(
      'w-full',
      'overflow-x-auto',
      'touch-pan-x',
      'scrollbar-chart',
    );
  });

  it('renders booking cards for laptop tablet and mobile viewports', () => {
    mockMatchMedia(true);
    render(<BookingsView {...createBookingsViewProps()} />);

    expect(BOOKINGS_VIEWPORT).toEqual({
      MOBILE_S: 320,
      MOBILE_M: 375,
      MOBILE_L: 425,
      TABLET: 768,
      LAPTOP: 1020,
      DESKTOP: 1440,
    });
    expect(BOOKINGS_TABLE_MIN_WIDTH_PX).toBe(1510);
    expect(screen.queryByRole('table', { name: BOOKINGS_COPY.tableLabel })).not.toBeInTheDocument();

    const cards = screen.getByTestId('bookings-cards');
    const firstCard = screen.getByTestId('bookings-card-BK-001');

    expect(cards).toBeInTheDocument();
    expect(firstCard).toHaveTextContent('BK-001');
    expect(firstCard).toHaveTextContent('Albert Flores');
    expect(firstCard).toHaveTextContent('Ceiling Light Installation');
    expect(firstCard).toHaveTextContent(BOOKINGS_COPY.columns.preferredContact);
    expect(firstCard).toHaveTextContent(BOOKINGS_COPY.preferredContact.chat);
    expect(firstCard).toHaveTextContent(BOOKINGS_COPY.columns.status);
    expect(within(firstCard).getByLabelText(BOOKINGS_COPY.actionMenu.label)).toBeInTheDocument();
  });

  it('uses Figma viewport breakpoints for the bookings table card', () => {
    render(<BookingsView {...createBookingsViewProps()} />);

    const tableCard = screen.getByTestId('bookings-table-card');
    const table = screen.getByRole('table', { name: BOOKINGS_COPY.tableLabel });
    const footer = screen.getByText('Showing 1 to 7 of 10 results').closest('footer');
    const nextButton = screen.getByRole('button', { name: BOOKINGS_COPY.pagination.next });

    expect(tableCard.className).toContain('min-[768px]:rounded-xl');
    expect(table.className).toContain('min-w-[1510px]');
    expect(table.className).toContain('table-fixed');
    expect(footer.className).toContain('min-[768px]:flex-row');
    expect(footer.className).toContain('min-[1020px]:px-6');
    expect(nextButton.className).toContain('min-[426px]:text-base');
    expect(BOOKINGS_TABLE_CARD_CLASS).toContain('min-[768px]:rounded-xl');
  });

  it('renders an empty state when no bookings match the filter', () => {
    render(
      <BookingsView
        {...createBookingsViewProps({
          bookings: [],
          pagination: {
            rangeLabel: 'Showing 0 to 0 of 0 results',
            canGoPrevious: false,
            canGoNext: false,
            onPrevious: jest.fn(),
            onNext: jest.fn(),
          },
        })}
      />,
    );

    expect(screen.getByText(BOOKINGS_COPY.emptyResults)).toBeInTheDocument();
  });
});
