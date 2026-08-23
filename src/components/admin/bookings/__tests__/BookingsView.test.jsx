import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import BookingsView from '../BookingsView';
import { BOOKINGS_COPY } from '../bookingsCopy';
import { BOOKINGS_SEED, BOOKINGS_STATUS_OPTIONS } from '../bookingsData';

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
  onChatWithCustomer: jest.fn(),
  onStatusChange: jest.fn(),
  ...overrides,
});

describe('BookingsView', () => {
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
    expect(within(table).getByText('BK-001')).toBeInTheDocument();
    expect(within(table).getByText('Albert Flores')).toBeInTheDocument();
    expect(within(table).getByText('Ceiling Light Installation')).toBeInTheDocument();
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

    expect(container.firstChild).toHaveClass('flex', 'flex-col');
    expect(screen.getByTestId('bookings-table-scroll')).toHaveClass(
      'overflow-x-auto',
      'touch-pan-x',
      'scrollbar-chart',
    );
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
