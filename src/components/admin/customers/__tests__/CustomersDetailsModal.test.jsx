import { fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import CustomersDetailsModal from '../CustomersDetailsModal';
import { CUSTOMERS_DETAILS_COPY } from '../customersDetailsCopy';
import { getCustomerDetailsById } from '../customersDetailsUtils';
import { CUSTOMERS_STATUS_STYLES } from '../customersData';

const activeDetails = getCustomerDetailsById('CU-004');
const suspendDetails = getCustomerDetailsById('CU-002');

describe('CustomersDetailsModal', () => {
  it('renders the Figma customer profile card', () => {
    render(<CustomersDetailsModal details={activeDetails} onClose={jest.fn()} />);

    expect(
      screen.getByRole('dialog', { name: CUSTOMERS_DETAILS_COPY.regionLabel }),
    ).toBeInTheDocument();
    expect(screen.getByText(activeDetails.initials)).toBeInTheDocument();
    expect(screen.getByText(activeDetails.name)).toBeInTheDocument();
    expect(screen.getByText(CUSTOMERS_STATUS_STYLES.active.label)).toBeInTheDocument();
    expect(screen.getByText(String(activeDetails.bookingsCount))).toBeInTheDocument();
    expect(screen.getByText(CUSTOMERS_DETAILS_COPY.bookingsLabel)).toBeInTheDocument();
    expect(screen.getByText(activeDetails.revenueLabel)).toBeInTheDocument();
    expect(screen.getByText(CUSTOMERS_DETAILS_COPY.revenueLabel)).toBeInTheDocument();
    expect(screen.getByText(activeDetails.email)).toBeInTheDocument();
    expect(screen.getByText(activeDetails.phone)).toBeInTheDocument();
    expect(screen.getByText(activeDetails.address)).toBeInTheDocument();
  });

  it('renders suspend status styling for suspended customers', () => {
    render(<CustomersDetailsModal details={suspendDetails} onClose={jest.fn()} />);

    expect(screen.getByText(CUSTOMERS_STATUS_STYLES.suspend.label)).toBeInTheDocument();
    expect(screen.getByText(suspendDetails.initials)).toBeInTheDocument();
  });

  it('closes when the overlay is clicked', () => {
    const onClose = jest.fn();

    render(<CustomersDetailsModal details={activeDetails} onClose={onClose} />);

    fireEvent.click(screen.getByTestId('customers-details-overlay'));

    expect(onClose).toHaveBeenCalled();
  });

  it('closes from the close control', async () => {
    const user = userEvent.setup();
    const onClose = jest.fn();

    render(<CustomersDetailsModal details={activeDetails} onClose={onClose} />);

    await user.click(screen.getByRole('button', { name: CUSTOMERS_DETAILS_COPY.closeLabel }));

    expect(onClose).toHaveBeenCalled();
  });

  it('uses responsive dialog classes for mobile through desktop', () => {
    render(<CustomersDetailsModal details={activeDetails} onClose={jest.fn()} />);

    const dialog = screen.getByRole('dialog', { name: CUSTOMERS_DETAILS_COPY.regionLabel });

    expect(dialog.className).toContain('max-w-[384px]');
    expect(dialog.className).toContain('rounded-2xl');
    expect(dialog.className).toContain('animate-page-enter');
    expect(screen.getByTestId('customers-details-overlay').className).toContain(
      'backdrop-blur-[17.4px]',
    );
    expect(screen.getByTestId('customers-details-overlay').className).toContain('animate-fade-in');
  });
});
