import React from 'react';
import { configureStore } from '@reduxjs/toolkit';
import { cleanup, render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import cartReducer from '../../../store/slices/cartSlice';
import GarageContent from '../GarageContent';

const createTestStore = () =>
  configureStore({
    reducer: {
      cart: cartReducer,
    },
  });

const renderGaragePage = () => {
  const store = createTestStore();

  render(
    <Provider store={store}>
      <MemoryRouter initialEntries={['/garage']}>
        <GarageContent />
      </MemoryRouter>
    </Provider>,
  );

  return store;
};

afterEach(cleanup);

describe('Garage page', () => {
  it('renders shared chrome, heading, transition, and active navigation', () => {
    renderGaragePage();

    expect(screen.getByRole('banner')).toBeInTheDocument();
    expect(
      screen.getByRole('heading', { level: 1, name: 'Professional Garage Services' }),
    ).toBeInTheDocument();
    expect(screen.getByRole('main')).toHaveClass('animate-page-enter');
    expect(
      within(screen.getByRole('navigation', { name: 'Service categories' })).getByRole('link', {
        name: 'Garage',
      }),
    ).toHaveAttribute('aria-current', 'page');
    expect(screen.getByRole('contentinfo')).toBeInTheDocument();
  });

  it('selects All by default and displays every garage service on one page', () => {
    renderGaragePage();

    expect(screen.getByRole('button', { name: 'All' })).toHaveAttribute('aria-pressed', 'true');
    expect(screen.getAllByRole('article')).toHaveLength(20);
    expect(screen.getByRole('heading', { level: 3, name: 'Weather Stripping' })).toBeVisible();
    expect(screen.getByRole('heading', { level: 3, name: 'Drywall' })).toBeVisible();
    expect(screen.queryByRole('button', { name: 'Next page' })).not.toBeInTheDocument();
  });

  it('renders all requested category tabs', () => {
    renderGaragePage();

    [
      'All',
      'Garage Door Services',
      'Garage Storage & Shelving',
      'Garage Electrical Services',
      'Garage Organization',
      'General Garage Repairs',
    ].forEach((category) => {
      expect(screen.getByRole('button', { name: category })).toBeInTheDocument();
    });
  });

  it('shows only services from the selected category', async () => {
    const user = userEvent.setup();
    renderGaragePage();

    await user.click(screen.getByRole('button', { name: 'Garage Organization' }));

    expect(screen.getAllByRole('article')).toHaveLength(4);
    expect(screen.getByRole('heading', { level: 3, name: 'Bike Storage' })).toBeVisible();
    expect(
      screen.queryByRole('heading', { level: 3, name: 'Weather Stripping' }),
    ).not.toBeInTheDocument();
  });

  it('filters garage services by price range', async () => {
    const user = userEvent.setup();
    renderGaragePage();

    await user.selectOptions(screen.getByRole('combobox', { name: 'Price Range' }), '100-200');

    screen.getAllByRole('article').forEach((card) => {
      expect(within(card).getByText(/Starting at \$(1\d\d|200)/)).toBeInTheDocument();
    });
  });

  it('adds a garage service to the shared Redux cart', async () => {
    const user = userEvent.setup();
    const store = renderGaragePage();

    await user.click(screen.getByRole('button', { name: 'Add Weather Stripping to cart' }));

    expect(store.getState().cart.totalItems).toBe(1);
    expect(store.getState().cart.items[0].title).toBe('Weather Stripping');
  });
});
