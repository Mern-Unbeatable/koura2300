import React from 'react';
import { configureStore } from '@reduxjs/toolkit';
import { fireEvent, render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import authReducer from '../../../store/slices/authSlice';
import cartReducer from '../../../store/slices/cartSlice';
import CheckoutView from '../CheckoutView';
import { formatCheckoutMonthYear } from '../checkoutData';

const renderCheckout = (cartItems = [], { fromPath } = {}) => {
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
      <MemoryRouter
        initialEntries={[
          {
            pathname: '/checkout',
            state: fromPath ? { from: fromPath } : undefined,
          },
        ]}
      >
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

  it('places Personal Information above Review Your Order on mobile and tablet', () => {
    renderCheckout();

    const form = screen.getByRole('form', { name: 'Checkout' });
    const review = screen.getByRole('heading', { name: 'Review Your Order' }).closest('aside');
    const personal = screen.getByRole('heading', { name: 'Personal Information' }).closest('div');

    expect(personal.compareDocumentPosition(review) & Node.DOCUMENT_POSITION_FOLLOWING).toBe(
      Node.DOCUMENT_POSITION_FOLLOWING,
    );
    expect(form.firstElementChild).toContainElement(
      screen.getByRole('heading', { name: 'Personal Information' }),
    );
    expect(form.lastElementChild).toBe(review);
  });

  it('keeps Confirm Pay actions inside the review card with compact mobile stacking', () => {
    renderCheckout();

    const review = screen.getByRole('heading', { name: 'Review Your Order' }).closest('aside');
    const confirm = screen.getByRole('button', { name: /Confirm Pay/i });
    const actions = confirm.parentElement;

    expect(review).toContainElement(confirm);
    expect(actions).toHaveClass('flex-col-reverse');
    expect(confirm).toHaveClass('w-full');
    expect(confirm).toHaveClass('whitespace-nowrap');
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
    expect(screen.getByRole('button', { name: 'Open calendar' })).toHaveTextContent(
      formatCheckoutMonthYear(new Date()),
    );

    const strip = screen.getByRole('listbox', { name: 'Choose a Date *' });
    expect(strip).toHaveClass('overflow-x-auto');
    expect(strip.className).toContain('[scrollbar-width:none]');
  });

  it('uses orange active styling for the selected time slot', () => {
    renderCheckout();

    fireEvent.click(screen.getByRole('button', { name: '9:00 AM' }));

    expect(screen.getByRole('button', { name: '9:00 AM' })).toHaveClass('border-[#ff6b1a]');
    expect(screen.getByRole('button', { name: '9:00 AM' })).toHaveClass('text-[#ff6b1a]');
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

  it('sends both Back links to the service details page the user came from', () => {
    const fromPath = '/service/wall-repairs-hole?category=Walls%20%26%20Ceilings';
    renderCheckout(
      [
        {
          id: 'wall-repairs-hole-standard',
          title: 'Hole',
          price: 145,
          quantity: 1,
        },
      ],
      { fromPath },
    );

    const backLinks = screen.getAllByRole('link', { name: /Back/i });
    expect(backLinks).toHaveLength(2);
    backLinks.forEach((link) => {
      expect(link).toHaveAttribute('href', fromPath);
    });
  });
});
