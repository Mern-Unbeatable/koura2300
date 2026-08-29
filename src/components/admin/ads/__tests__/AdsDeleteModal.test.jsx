import { fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import AdsDeleteModal from '../AdsDeleteModal';
import { ADS_COPY } from '../adsCopy';

describe('AdsDeleteModal', () => {
  it('renders the animated delete confirmation dialog', () => {
    render(
      <AdsDeleteModal
        adTitle="Ceiling Light Installation"
        onClose={jest.fn()}
        onConfirm={jest.fn()}
      />,
    );

    const dialog = screen.getByRole('dialog', {
      name: ADS_COPY.deleteModal.regionLabel,
    });

    expect(dialog).toBeInTheDocument();
    expect(dialog.className).toContain('animate-page-enter');
    expect(screen.getByTestId('ads-delete-overlay').className).toContain('animate-fade-in');
    expect(screen.getByText(ADS_COPY.deleteModal.title)).toBeInTheDocument();
    expect(
      screen.getByText(
        ADS_COPY.deleteModal.description('Ceiling Light Installation'),
      ),
    ).toBeInTheDocument();
  });

  it('confirms delete and closes from cancel or overlay', async () => {
    const user = userEvent.setup();
    const onConfirm = jest.fn();
    const onClose = jest.fn();

    render(
      <AdsDeleteModal
        adTitle="Ceiling Light Installation"
        onClose={onClose}
        onConfirm={onConfirm}
      />,
    );

    await user.click(
      screen.getByRole('button', { name: ADS_COPY.deleteModal.confirm }),
    );
    expect(onConfirm).toHaveBeenCalledTimes(1);

    await user.click(
      screen.getByRole('button', { name: ADS_COPY.deleteModal.cancel }),
    );
    fireEvent.click(screen.getByTestId('ads-delete-overlay'));
    expect(onClose).toHaveBeenCalledTimes(2);
  });
});
