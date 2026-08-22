import React from 'react';
import { configureStore } from '@reduxjs/toolkit';
import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Provider } from 'react-redux';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { ROUTES } from '../../../config';
import cartReducer from '../../../store/slices/cartSlice';
import OrderDetailsContent from '../OrderDetailsContent';
import { ORDER_DETAILS_SAMPLE_ID } from '../orderDetailsData';

const createTestStore = () =>
  configureStore({
    reducer: {
      cart: cartReducer,
    },
  });

const renderOrderDetails = (orderId = ORDER_DETAILS_SAMPLE_ID) => {
  const store = createTestStore();
  const path = `/orders/${orderId}`;

  render(
    <Provider store={store}>
      <MemoryRouter initialEntries={[path]}>
        <Routes>
          <Route path={ROUTES.ORDER_DETAILS} element={<OrderDetailsContent />} />
        </Routes>
      </MemoryRouter>
    </Provider>,
  );

  return store;
};

describe('OrderDetailsContent', () => {
  it('renders landing header and footer chrome', () => {
    renderOrderDetails();

    expect(screen.getByRole('banner')).toBeInTheDocument();
    expect(screen.getByRole('contentinfo')).toBeInTheDocument();
  });

  it('renders a Back link to My Orders with icon spacing', () => {
    renderOrderDetails();

    const backLink = screen.getByRole('link', { name: 'Back' });
    expect(backLink).toHaveAttribute('href', '/orders');
    expect(backLink).toHaveClass('gap-1');
  });

  it('renders booking summary fields from the design', () => {
    renderOrderDetails();

    expect(screen.getByRole('heading', { name: 'Booking Summary' })).toBeInTheDocument();
    expect(screen.getByText('Booking Date')).toBeInTheDocument();
    expect(screen.getByText('Appointment Date')).toBeInTheDocument();
    expect(screen.getByText('Appointment Time')).toBeInTheDocument();
    expect(screen.getByText('10:00 AM')).toBeInTheDocument();
    expect(screen.getByText('Category')).toBeInTheDocument();
    expect(screen.getByText('Electrical')).toBeInTheDocument();
    expect(screen.getByText('Package')).toBeInTheDocument();
    expect(screen.getByText('Premium')).toBeInTheDocument();
    expect(screen.getByText('Est. Duration')).toBeInTheDocument();
  });

  it('renders the order timeline steps', () => {
    renderOrderDetails();

    expect(screen.getByRole('heading', { name: 'Order Timeline' })).toBeInTheDocument();
    expect(screen.getByText('Booking Submitted')).toBeInTheDocument();
    expect(screen.getByText('Material Paid')).toBeInTheDocument();
    expect(screen.getByText('Technician Assigned')).toBeInTheDocument();
    expect(screen.getByText('Work In Progress')).toBeInTheDocument();
    expect(screen.getByText('Completed')).toBeInTheDocument();
    expect(
      screen.getByText('Your booking request was received successfully.'),
    ).toBeInTheDocument();
  });

  it('renders service information with inclusions and exclusions', () => {
    renderOrderDetails();

    expect(screen.getByRole('heading', { name: 'Service Information' })).toBeInTheDocument();
    expect(screen.getByText("What's Included")).toBeInTheDocument();
    expect(screen.getByText('Not Included')).toBeInTheDocument();
    expect(screen.getByText('Panel removal & disposal')).toBeInTheDocument();
    expect(screen.getByText('Permit fees (customer responsibility)')).toBeInTheDocument();
    expect(screen.getByText('Service Starting Price')).toBeInTheDocument();
    expect(screen.getByText('$320 onwards')).toBeInTheDocument();
  });

  it('renders material information table and pay CTA', () => {
    renderOrderDetails();

    expect(screen.getByRole('heading', { name: 'Material Information' })).toBeInTheDocument();
    expect(screen.getByText('Material Required:')).toBeInTheDocument();
    expect(screen.getByText('YES')).toBeInTheDocument();
    expect(screen.getByText('200A Main Breaker Panel')).toBeInTheDocument();
    expect(screen.getByText('Total')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Pay Materials — $185' })).toBeInTheDocument();
  });

  it('renders booking payment and sidebar status cards', () => {
    renderOrderDetails();

    expect(screen.getByRole('heading', { name: 'Booking Payment' })).toBeInTheDocument();
    expect(screen.getByText('Pay After Completion')).toBeInTheDocument();
    expect(screen.getByText('Offline')).toBeInTheDocument();
    expect(screen.getByText('Online')).toBeInTheDocument();

    expect(screen.getByText('Order Status')).toBeInTheDocument();
    expect(screen.getByText('ORD-2024-001')).toBeInTheDocument();
    expect(screen.getByText('Material Payment Due')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Pay Now' })).toBeInTheDocument();
    expect(screen.getByText('Service Cost')).toBeInTheDocument();
    expect(screen.getByText('Collected after service completion')).toBeInTheDocument();
  });

  it('uses a responsive split layout with sticky sidebar on large screens', () => {
    renderOrderDetails();

    const layout = screen.getByTestId('order-details-layout');
    expect(layout).toHaveClass('lg:grid-cols-[minmax(0,1fr)_384px]');
    expect(layout).toHaveClass('lg:gap-[77px]');
  });

  it('collapses and expands accordion sections', async () => {
    const user = userEvent.setup();
    renderOrderDetails();

    const summaryToggle = screen.getByRole('button', { name: /Booking Summary/i });
    expect(screen.getByText('Booking Date')).toBeInTheDocument();

    await user.click(summaryToggle);
    expect(screen.queryByText('Booking Date')).not.toBeInTheDocument();

    await user.click(summaryToggle);
    expect(screen.getByText('Booking Date')).toBeInTheDocument();
  });

  it('shows not found state for unknown order ids', () => {
    renderOrderDetails('missing-order');

    expect(screen.getByRole('heading', { name: 'Order not found' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Back to My Orders' })).toHaveAttribute(
      'href',
      '/orders',
    );
  });
});
