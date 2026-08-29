import { fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ReviewsDeleteModal from '../ReviewsDeleteModal';
import { REVIEWS_COPY } from '../reviewsCopy';

describe('ReviewsDeleteModal', () => {
  it('renders the animated delete confirmation dialog', () => {
    render(
      <ReviewsDeleteModal
        reviewerName="Leslie Alexander"
        onClose={jest.fn()}
        onConfirm={jest.fn()}
      />,
    );

    const dialog = screen.getByRole('dialog', {
      name: REVIEWS_COPY.deleteModal.regionLabel,
    });

    expect(dialog).toBeInTheDocument();
    expect(dialog.className).toContain('animate-page-enter');
    expect(screen.getByTestId('reviews-delete-overlay').className).toContain('animate-fade-in');
    expect(screen.getByText(REVIEWS_COPY.deleteModal.title)).toBeInTheDocument();
    expect(
      screen.getByText(REVIEWS_COPY.deleteModal.description('Leslie Alexander')),
    ).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: REVIEWS_COPY.deleteModal.cancel }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: REVIEWS_COPY.deleteModal.confirm }),
    ).toBeInTheDocument();
  });

  it('confirms delete from the Delete action', async () => {
    const user = userEvent.setup();
    const onConfirm = jest.fn();

    render(
      <ReviewsDeleteModal
        reviewerName="Jenny Wilson"
        onClose={jest.fn()}
        onConfirm={onConfirm}
      />,
    );

    await user.click(
      screen.getByRole('button', { name: REVIEWS_COPY.deleteModal.confirm }),
    );

    expect(onConfirm).toHaveBeenCalledTimes(1);
  });

  it('closes from Cancel, close button, and overlay click', async () => {
    const user = userEvent.setup();
    const onClose = jest.fn();

    render(
      <ReviewsDeleteModal
        reviewerName="Jenny Wilson"
        onClose={onClose}
        onConfirm={jest.fn()}
      />,
    );

    await user.click(
      screen.getByRole('button', { name: REVIEWS_COPY.deleteModal.cancel }),
    );
    await user.click(
      screen.getByRole('button', { name: REVIEWS_COPY.deleteModal.closeLabel }),
    );
    fireEvent.click(screen.getByTestId('reviews-delete-overlay'));

    expect(onClose).toHaveBeenCalledTimes(3);
  });
});
