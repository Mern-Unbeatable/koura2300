import React from 'react';
import { configureStore } from '@reduxjs/toolkit';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import authReducer from '../../../store/slices/authSlice';
import cartReducer from '../../../store/slices/cartSlice';
import CheckoutView from '../CheckoutView';
import { formatCheckoutMonthYear } from '../checkoutData';

const renderCheckout = (cartItems = []) => {
  const store = configureStore({
    reducer: {
      auth: authReducer,
      cart: cartReducer,
    },
    preloadedState: {
      auth: {
        user: { name: 'Jane', email: 'jane@example.com' },
        isAuthenticated: true,
        token: null,
        loading: false,
      },
      cart: {
        items: cartItems,
        totalItems: cartItems.length,
        totalPrice: cartItems.reduce((sum, item) => sum + item.price, 0),
      },
    },
  });

  render(
    <Provider store={store}>
      <MemoryRouter>
        <CheckoutView />
      </MemoryRouter>
    </Provider>,
  );
};

describe('formatCheckoutMonthYear', () => {
  it('formats the present month and year as Month,Year', () => {
    expect(formatCheckoutMonthYear(new Date(2026, 7, 19))).toBe('August,2026');
  });
});

describe('CheckoutView Figma layout', () => {
  it('uses a 70/30 split between the form column and Review Your Order', () => {
    renderCheckout();

    expect(screen.getByRole('form', { name: 'Checkout' })).toHaveClass(
      'lg:grid-cols-[minmax(0,7fr)_minmax(0,3fr)]',
    );
  });

  it('shows the Figma upload paragraph and drop-zone copy', () => {
    renderCheckout();

    expect(screen.getByRole('heading', { name: 'Upload Photos / Videos' })).toBeInTheDocument();
    expect(
      screen.getByText(
        'Help your pro prepare by showing them the work area. Optional but highly recommended.',
      ),
    ).toBeInTheDocument();
    expect(screen.getByText('Click to upload photos or drag & drop')).toBeInTheDocument();
    expect(screen.getByText('JPG, PNG, MP4 — max 20MB each')).toBeInTheDocument();
  });

  it('shows the Figma preferred contact method cards', () => {
    renderCheckout();

    expect(screen.getByRole('heading', { name: 'Preferred Contact Method' })).toBeInTheDocument();
    expect(
      screen.getByText('How should your pro reach you for updates and confirmation?'),
    ).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Phone \/ SMS/ })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Email' })).toBeInTheDocument();
  });

  it('shows the current month and year beside Choose a Date with a hidden-scrollbar strip', () => {
    renderCheckout();

    expect(screen.getByText('Choose a Date *')).toBeInTheDocument();
    expect(screen.getByText(formatCheckoutMonthYear(new Date()))).toBeInTheDocument();

    const strip = screen.getByRole('listbox', { name: 'Choose a Date *' });
    expect(strip).toHaveClass('overflow-x-auto');
    expect(strip.className).toContain('[scrollbar-width:none]');
  });

  it('renders the order thumbnail, title, and two-tone payment note without an assembly line', () => {
    renderCheckout([
      {
        id: 'wall-repairs-hole-standard',
        title: 'Hole',
        price: 145,
        quantity: 4,
      },
    ]);

    expect(screen.getByRole('heading', { name: 'Review Your Order' })).toBeInTheDocument();
    expect(screen.getByAltText('Hole')).toBeInTheDocument();
    expect(screen.getByText('Hole')).toBeInTheDocument();
    expect(screen.queryByText(/Assembly/)).not.toBeInTheDocument();
    expect(screen.getByText('Payment note:')).toBeInTheDocument();
    expect(screen.getByText(/Your order has been received/)).toBeInTheDocument();
    expect(screen.getByText('Payment note:')).toHaveClass('text-[#1447e6]');
  });
});
