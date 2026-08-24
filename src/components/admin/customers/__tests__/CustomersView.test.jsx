import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import CustomersView from '../CustomersView';
import { CUSTOMERS_COPY } from '../customersCopy';
import {
  CUSTOMERS_SEED,
  CUSTOMERS_STATUS_OPTIONS,
  CUSTOMERS_TABLE_CARD_CLASS,
  CUSTOMERS_TABLE_MIN_WIDTH_PX,
  CUSTOMERS_VIEWPORT,
} from '../customersData';
import { CUSTOMERS_CARDS_MEDIA_QUERY } from '../useCustomersCompactLayout';

const mockMatchMedia = (matchesCompactLayout) => {
  Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: (query) => ({
      matches: matchesCompactLayout && query === CUSTOMERS_CARDS_MEDIA_QUERY,
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

const createCustomersViewProps = (overrides = {}) => ({
  copy: CUSTOMERS_COPY,
  customers: CUSTOMERS_SEED.slice(0, 7),
  summarySubtitle: '10 customers',
  statusOptions: CUSTOMERS_STATUS_OPTIONS,
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
  onCloseDetails: jest.fn(),
  customerDetails: null,
  onStatusChange: jest.fn(),
  ...overrides,
});

describe('CustomersView', () => {
  beforeEach(() => {
    mockMatchMedia(false);
  });

  it('renders the customer management header from Figma copy', () => {
    render(<CustomersView {...createCustomersViewProps()} />);

    expect(
      screen.getByRole('heading', { level: 1, name: CUSTOMERS_COPY.title }),
    ).toBeInTheDocument();
    expect(screen.getByText('10 customers')).toBeInTheDocument();
  });

  it('renders customers table columns and seeded rows', () => {
    render(<CustomersView {...createCustomersViewProps()} />);

    const table = screen.getByRole('table', { name: CUSTOMERS_COPY.tableLabel });

    expect(within(table).getByText(CUSTOMERS_COPY.columns.customerId)).toBeInTheDocument();
    expect(within(table).getByText(CUSTOMERS_COPY.columns.customer)).toBeInTheDocument();
    expect(within(table).getByText(CUSTOMERS_COPY.columns.phone)).toBeInTheDocument();
    expect(within(table).getByText(CUSTOMERS_COPY.columns.email)).toBeInTheDocument();
    expect(within(table).getByText(CUSTOMERS_COPY.columns.totalBookingsPrice)).toBeInTheDocument();
    expect(within(table).getByText('CU-001')).toBeInTheDocument();
    expect(within(table).getByText('Albert Flores')).toBeInTheDocument();
    expect(within(table).getByText('(907) 555-0101')).toBeInTheDocument();
    expect(within(table).getByText('felicia.reid@example.com')).toBeInTheDocument();
    expect(within(table).getByText('$1,000')).toBeInTheDocument();
  });

  it('renders active and suspend status badges', () => {
    render(<CustomersView {...createCustomersViewProps()} />);

    const table = screen.getByRole('table', { name: CUSTOMERS_COPY.tableLabel });

    expect(within(table).getAllByText('Active').length).toBeGreaterThan(0);
    expect(within(table).getAllByText('Suspend').length).toBeGreaterThan(0);
  });

  it('changes the status filter', async () => {
    const user = userEvent.setup();
    const onStatusFilterChange = jest.fn();

    render(
      <CustomersView
        {...createCustomersViewProps({
          onStatusFilterChange,
        })}
      />,
    );

    await user.selectOptions(
      screen.getByLabelText(CUSTOMERS_COPY.statusFilterLabel),
      'suspend',
    );

    expect(onStatusFilterChange).toHaveBeenCalled();
  });

  it('opens the row action menu with Figma actions', async () => {
    const user = userEvent.setup();
    const onToggleActionMenu = jest.fn();

    render(
      <CustomersView
        {...createCustomersViewProps({
          onToggleActionMenu,
        })}
      />,
    );

    const actionButtons = screen.getAllByLabelText(CUSTOMERS_COPY.actionMenu.label);
    await user.click(actionButtons[0]);

    expect(onToggleActionMenu).toHaveBeenCalledWith('CU-001');
  });

  it('shows the action menu when a row is active', () => {
    render(
      <CustomersView
        {...createCustomersViewProps({
          openActionMenuId: 'CU-001',
        })}
      />,
    );

    expect(screen.getByRole('menu', { name: CUSTOMERS_COPY.actionMenu.label })).toBeInTheDocument();
    expect(
      screen.getByRole('menuitem', { name: CUSTOMERS_COPY.actionMenu.seeDetails }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole('menuitem', { name: CUSTOMERS_COPY.actionMenu.active }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole('menuitem', { name: CUSTOMERS_COPY.actionMenu.suspend }),
    ).toBeInTheDocument();
  });

  it('renders pagination controls and range label', async () => {
    const user = userEvent.setup();
    const onNext = jest.fn();

    render(
      <CustomersView
        {...createCustomersViewProps({
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
    await user.click(screen.getByRole('button', { name: CUSTOMERS_COPY.pagination.next }));
    expect(onNext).toHaveBeenCalled();
  });

  it('uses responsive layout classes for header and table scroll', () => {
    render(<CustomersView {...createCustomersViewProps()} />);

    expect(screen.getByRole('banner').className).toContain('min-[768px]:flex-row');
    expect(screen.getByTestId('customers-table-scroll').className).toContain('overflow-x-auto');
  });

  it('renders customer cards for laptop tablet and mobile viewports', () => {
    mockMatchMedia(true);
    render(<CustomersView {...createCustomersViewProps()} />);

    expect(CUSTOMERS_VIEWPORT).toEqual({
      MOBILE_S: 320,
      MOBILE_M: 375,
      MOBILE_L: 425,
      TABLET: 768,
      LAPTOP: 1020,
      DESKTOP: 1440,
    });
    expect(CUSTOMERS_TABLE_MIN_WIDTH_PX).toBe(1170);
    expect(screen.queryByRole('table', { name: CUSTOMERS_COPY.tableLabel })).not.toBeInTheDocument();

    const cards = screen.getByTestId('customers-cards');
    const firstCard = screen.getByTestId('customers-card-CU-001');

    expect(cards).toBeInTheDocument();
    expect(firstCard).toHaveTextContent('CU-001');
    expect(firstCard).toHaveTextContent('Albert Flores');
    expect(firstCard).toHaveTextContent('(907) 555-0101');
    expect(firstCard).toHaveTextContent(CUSTOMERS_COPY.columns.status);
    expect(within(firstCard).getByLabelText(CUSTOMERS_COPY.actionMenu.label)).toBeInTheDocument();
  });

  it('uses Figma viewport breakpoints for the customers table card', () => {
    render(<CustomersView {...createCustomersViewProps()} />);

    const tableCard = screen.getByTestId('customers-table-card');
    const table = screen.getByRole('table', { name: CUSTOMERS_COPY.tableLabel });
    const footer = screen.getByText('Showing 1 to 7 of 10 results').closest('footer');
    const nextButton = screen.getByRole('button', { name: CUSTOMERS_COPY.pagination.next });

    expect(tableCard.className).toContain('min-[768px]:rounded-xl');
    expect(table.className).toContain('min-w-[1170px]');
    expect(table.className).toContain('table-fixed');
    expect(footer.className).toContain('min-[768px]:flex-row');
    expect(footer.className).toContain('min-[1020px]:px-6');
    expect(nextButton.className).toContain('min-[426px]:text-base');
    expect(CUSTOMERS_TABLE_CARD_CLASS).toContain('min-[768px]:rounded-xl');
  });

  it('renders an empty state when no customers match the filter', () => {
    render(
      <CustomersView
        {...createCustomersViewProps({
          customers: [],
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

    expect(screen.getByText(CUSTOMERS_COPY.emptyResults)).toBeInTheDocument();
  });

  it('renders the See Details modal when customer details are open', () => {
    const details = {
      id: 'CU-004',
      name: 'Cameron Williamson',
      initials: 'CW',
      statusId: 'active',
      email: 'kenzi.lawson@example.com',
      phone: '(406) 555-0120',
      address: '220 Main Ave, Billings',
      bookingsCount: 19,
      revenueLabel: '$40,000',
    };

    render(
      <CustomersView
        {...createCustomersViewProps({
          customerDetails: details,
          onCloseDetails: jest.fn(),
        })}
      />,
    );

    const dialog = screen.getByRole('dialog', { name: /customer details/i });

    expect(dialog).toBeInTheDocument();
    expect(within(dialog).getByText('Cameron Williamson')).toBeInTheDocument();
    expect(within(dialog).getByText('CW')).toBeInTheDocument();
    expect(within(dialog).getByText('$40,000')).toBeInTheDocument();
  });
});
