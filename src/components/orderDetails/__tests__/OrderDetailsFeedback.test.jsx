import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import OrderDetailsFeedback from '../OrderDetailsFeedback';
import { ORDER_DETAILS_CONTENT } from '../orderDetailsCopy';

describe('OrderDetailsFeedback', () => {
  it('requires a rating before accepting submit', async () => {
    const user = userEvent.setup();
    const onSubmit = jest.fn(() => false);

    render(
      <OrderDetailsFeedback
        orderId="ord-2024-004"
        copy={ORDER_DETAILS_CONTENT.feedback}
        onSubmit={onSubmit}
      />,
    );

    await user.click(screen.getByRole('button', { name: 'Submit' }));

    expect(onSubmit).toHaveBeenCalledWith({ rating: 0, review: '' });
    expect(
      screen.getByRole('heading', { name: 'How was your material quality?' }),
    ).toBeInTheDocument();
  });

  it('submits rating and review then shows thank-you state', async () => {
    const user = userEvent.setup();
    const onSubmit = jest.fn(() => true);

    render(
      <OrderDetailsFeedback
        orderId="ord-2024-004"
        copy={ORDER_DETAILS_CONTENT.feedback}
        onSubmit={onSubmit}
      />,
    );

    await user.click(screen.getByRole('button', { name: 'Rate 5 out of 5' }));
    await user.type(screen.getByPlaceholderText('Write here'), 'Solid quality');
    await user.click(screen.getByRole('button', { name: 'Submit' }));

    expect(onSubmit).toHaveBeenCalledWith({ rating: 5, review: 'Solid quality' });
    expect(screen.getByText('Thanks for your feedback.')).toBeInTheDocument();
    expect(screen.queryByRole('button', { name: 'Submit' })).not.toBeInTheDocument();
  });
});
