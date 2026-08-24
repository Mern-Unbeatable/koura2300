import { fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import CustomersSuspendModal from '../CustomersSuspendModal';
import { CUSTOMERS_SUSPEND_COPY } from '../customersSuspendCopy';

describe('CustomersSuspendModal', () => {
  it('renders the Figma Suspend User dialog', () => {
    render(<CustomersSuspendModal onClose={jest.fn()} onConfirm={jest.fn()} />);

    expect(
      screen.getByRole('dialog', { name: CUSTOMERS_SUSPEND_COPY.regionLabel }),
    ).toBeInTheDocument();
    expect(screen.getByText(CUSTOMERS_SUSPEND_COPY.title)).toBeInTheDocument();
    expect(screen.getByLabelText(/Reason/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(CUSTOMERS_SUSPEND_COPY.reasonPlaceholder)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: CUSTOMERS_SUSPEND_COPY.cancel })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: CUSTOMERS_SUSPEND_COPY.submit })).toBeInTheDocument();
  });

  it('shows an inline error when submitting without a reason', async () => {
    const user = userEvent.setup();
    const onConfirm = jest.fn();

    render(<CustomersSuspendModal onClose={jest.fn()} onConfirm={onConfirm} />);

    await user.click(screen.getByRole('button', { name: CUSTOMERS_SUSPEND_COPY.submit }));

    expect(screen.getByText(CUSTOMERS_SUSPEND_COPY.errors.reasonRequired)).toBeInTheDocument();
    expect(onConfirm).not.toHaveBeenCalled();
  });

  it('confirms suspend with a trimmed reason', async () => {
    const user = userEvent.setup();
    const onConfirm = jest.fn();

    render(<CustomersSuspendModal onClose={jest.fn()} onConfirm={onConfirm} />);

    await user.type(
      screen.getByPlaceholderText(CUSTOMERS_SUSPEND_COPY.reasonPlaceholder),
      '  Repeated no-shows  ',
    );
    await user.click(screen.getByRole('button', { name: CUSTOMERS_SUSPEND_COPY.submit }));

    expect(onConfirm).toHaveBeenCalledWith('Repeated no-shows');
  });

  it('closes from cancel and overlay click', async () => {
    const user = userEvent.setup();
    const onClose = jest.fn();

    render(<CustomersSuspendModal onClose={onClose} onConfirm={jest.fn()} />);

    await user.click(screen.getByRole('button', { name: CUSTOMERS_SUSPEND_COPY.cancel }));
    expect(onClose).toHaveBeenCalledTimes(1);

    fireEvent.click(screen.getByTestId('customers-suspend-overlay'));
    expect(onClose).toHaveBeenCalledTimes(2);
  });

  it('uses responsive dialog classes for mobile through desktop', () => {
    render(<CustomersSuspendModal onClose={jest.fn()} onConfirm={jest.fn()} />);

    const dialog = screen.getByRole('dialog', { name: CUSTOMERS_SUSPEND_COPY.regionLabel });

    expect(dialog.className).toContain('max-w-[470px]');
    expect(dialog.className).toContain('animate-page-enter');
    expect(screen.getByTestId('customers-suspend-overlay').className).toContain('animate-fade-in');
  });
});
