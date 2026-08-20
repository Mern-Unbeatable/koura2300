import React from 'react';
import { configureStore } from '@reduxjs/toolkit';
import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Provider } from 'react-redux';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { ROUTES } from '../../../config';
import cartReducer from '../../../store/slices/cartSlice';
import OrdersContent from '../OrdersContent';
import { ORDER_ITEMS } from '../ordersData';

const createTestStore = () =>
  configureStore({
    reducer: {
      cart: cartReducer,
    },
  });

const renderOrdersPage = (initialPath = ROUTES.ORDERS) => {
  const store = createTestStore();

  render(
    <Provider store={store}>
      <MemoryRouter initialEntries={[initialPath]}>
        <Routes>
          <Route path={ROUTES.ORDERS} element={<OrdersContent />} />
        </Routes>
      </MemoryRouter>
    </Provider>,
  );

  return store;
};

describe('OrdersContent', () => {
  it('renders the My Orders heading, subtitle, and summary cards', () => {
    renderOrdersPage();

    expect(screen.getByRole('heading', { name: 'My Orders' })).toBeInTheDocument();
    expect(
      screen.getByText('Track your bookings, material payments and project progress.'),
    ).toBeInTheDocument();
    expect(screen.getByText('Active Orders')).toBeInTheDocument();
    expect(screen.getByText('Pending Payment')).toBeInTheDocument();
    expect(screen.getByText('Upcoming Appt.')).toBeInTheDocument();
    expect(screen.getByText('Active Orders').previousElementSibling).toHaveTextContent('3');
    expect(screen.getByText('Upcoming Appt.').previousElementSibling).toHaveTextContent('3');
    expect(screen.getByText('Pending Payment').previousElementSibling).toHaveTextContent('1');
  });

  it('uses the shared landing header and footer chrome', () => {
    renderOrdersPage();

    expect(screen.getByRole('banner')).toBeInTheDocument();
    expect(screen.getByRole('contentinfo')).toBeInTheDocument();
  });

  it('shows all order cards by default with the All filter active', () => {
    renderOrdersPage();

    expect(screen.getByRole('tab', { name: 'All' })).toHaveAttribute('aria-pressed', 'true');
    expect(screen.getByText(`${ORDER_ITEMS.length} orders`)).toBeInTheDocument();
    expect(screen.getAllByRole('article')).toHaveLength(ORDER_ITEMS.length);
  });

  it('filters orders when a status tab is selected', async () => {
    const user = userEvent.setup();
    renderOrdersPage();

    await user.click(screen.getByRole('tab', { name: 'Payment Required' }));

    expect(screen.getByRole('tab', { name: 'Payment Required' })).toHaveAttribute(
      'aria-pressed',
      'true',
    );
    expect(screen.getByText('1 order')).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Electrical Panel Upgrade' })).toBeInTheDocument();
    expect(screen.queryByRole('heading', { name: 'AC Unit Installation' })).not.toBeInTheDocument();
  });

  it('shows Pay Now only on payment-required orders', () => {
    renderOrdersPage();

    const paymentCard = screen
      .getByRole('heading', { name: 'Electrical Panel Upgrade' })
      .closest('article');

    expect(within(paymentCard).getByRole('button', { name: 'Pay Now' })).toBeInTheDocument();
    expect(within(paymentCard).getByRole('button', { name: 'Cancel Booking' })).toBeInTheDocument();
    expect(within(paymentCard).getByRole('button', { name: 'View Details' })).toBeInTheDocument();
  });

  it('shows download on completed orders instead of cancel', () => {
    renderOrdersPage();

    const completedCard = screen
      .getByRole('heading', { name: 'Kitchen Cabinet Assembly' })
      .closest('article');

    expect(
      within(completedCard).getByRole('button', { name: 'Download order receipt' }),
    ).toBeInTheDocument();
    expect(
      within(completedCard).queryByRole('button', { name: 'Cancel Booking' }),
    ).not.toBeInTheDocument();
  });

  it('renders a responsive two-column order grid', () => {
    renderOrdersPage();

    const grid = screen.getByRole('heading', { name: 'Electrical Panel Upgrade' }).closest(
      'article',
    )?.parentElement;

    expect(grid).toHaveClass('lg:grid-cols-2');
  });

  it('exposes every status filter from the design', () => {
    renderOrdersPage();

    expect(screen.getByRole('tablist')).toBeInTheDocument();
    expect(screen.getByRole('tab', { name: 'Pending Review' })).toBeInTheDocument();
    expect(screen.getByRole('tab', { name: 'Technician assign' })).toBeInTheDocument();
    expect(screen.getByRole('tab', { name: 'In Progress' })).toBeInTheDocument();
    expect(screen.getByRole('tab', { name: 'Cancelled' })).toBeInTheDocument();
  });
});
