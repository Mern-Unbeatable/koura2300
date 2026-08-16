import React from 'react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { cleanup, render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import HomeContent from '../HomeContent';
import cartReducer from '../../../store/slices/cartSlice';
import i18n from '../../../i18n';

const createTestStore = () =>
  configureStore({
    reducer: {
      cart: cartReducer,
    },
  });

const renderLandingPage = () => {
  const store = createTestStore();

  render(
    <Provider store={store}>
      <MemoryRouter>
        <HomeContent />
      </MemoryRouter>
    </Provider>,
  );

  return store;
};

beforeEach(async () => {
  await i18n.changeLanguage('en');
});

afterEach(() => {
  cleanup();
});

describe('Landing page', () => {
  it('renders the complete English landing-page structure', () => {
    renderLandingPage();

    expect(screen.getByRole('banner')).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Top-rated services' })).toBeInTheDocument();
    expect(
      screen.getByRole('heading', {
        name: 'Professional solutions for every corner of your home',
      }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole('heading', { name: 'Trusted professionals for every home project' }),
    ).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Learn, Grow' })).toBeInTheDocument();
    expect(screen.getByRole('contentinfo')).toBeInTheDocument();
  });

  it('uses meaningful image alternatives and lazy-loads non-critical images', () => {
    renderLandingPage();

    const serviceImage = screen.getByRole('img', {
      name: 'A professional repairing a kitchen faucet',
    });

    expect(serviceImage).toHaveAttribute('loading', 'lazy');
    expect(serviceImage).toHaveAttribute('width');
    expect(serviceImage).toHaveAttribute('height');
  });

  it('filters service cards through the header search form', async () => {
    const user = userEvent.setup();
    renderLandingPage();

    await user.type(screen.getAllByRole('searchbox', { name: 'Search services' })[0], 'drain');
    await user.click(screen.getAllByRole('button', { name: 'Submit service search' })[0]);

    const servicesRegion = screen.getByRole('region', { name: 'Top-rated services' });
    expect(within(servicesRegion).getByText('Drain Cleaning')).toBeInTheDocument();
    expect(
      within(servicesRegion).queryByText('Faucet Repair & Replacement'),
    ).not.toBeInTheDocument();
  });

  it('adds a selected service to the existing Redux cart', async () => {
    const user = userEvent.setup();
    const store = renderLandingPage();

    await user.click(screen.getByRole('button', { name: 'Add Drain Cleaning to cart' }));

    expect(store.getState().cart.totalItems).toBe(1);
    expect(screen.getByLabelText('Cart, 1 item')).toBeInTheDocument();
  });

  it('switches every visible section to Polish', async () => {
    const user = userEvent.setup();
    renderLandingPage();

    await user.click(screen.getAllByRole('button', { name: 'Switch language to Polish' })[0]);

    expect(screen.getByRole('heading', { name: 'Najwyżej oceniane usługi' })).toBeInTheDocument();
    expect(
      screen.getByRole('heading', {
        name: 'Profesjonalne rozwiązania dla każdego zakątka Twojego domu',
      }),
    ).toBeInTheDocument();
    expect(document.documentElement).toHaveAttribute('lang', 'pl');
  });

  it('opens and closes the accessible mobile navigation', async () => {
    const user = userEvent.setup();
    renderLandingPage();

    const menuButton = screen.getByRole('button', { name: 'Open navigation menu' });
    expect(menuButton).toHaveAttribute('aria-expanded', 'false');

    await user.click(menuButton);
    expect(screen.getByRole('navigation', { name: 'Mobile service categories' })).toBeVisible();
    expect(menuButton).toHaveAttribute('aria-expanded', 'true');

    await user.click(screen.getByRole('button', { name: 'Close navigation menu' }));
    expect(
      screen.queryByRole('navigation', { name: 'Mobile service categories' }),
    ).not.toBeInTheDocument();
  });

  it('validates newsletter email inline and confirms a valid submission', async () => {
    const user = userEvent.setup();
    renderLandingPage();

    const submitButton = screen.getByRole('button', { name: 'Subscribe to newsletter' });
    await user.click(submitButton);
    expect(screen.getByRole('alert')).toHaveTextContent('Enter a valid email address.');

    await user.type(screen.getByRole('textbox', { name: 'Email address' }), 'owner@example.com');
    await user.click(submitButton);
    expect(screen.getByRole('status')).toHaveTextContent('Thank you for subscribing.');
  });
});
