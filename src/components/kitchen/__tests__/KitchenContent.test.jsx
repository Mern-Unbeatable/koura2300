import React from 'react';
import { configureStore } from '@reduxjs/toolkit';
import { cleanup, render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import cartReducer from '../../../store/slices/cartSlice';
import KitchenContent from '../KitchenContent';

const createTestStore = () =>
  configureStore({
    reducer: {
      cart: cartReducer,
    },
  });

const renderKitchenPage = () => {
  const store = createTestStore();

  render(
    <Provider store={store}>
      <MemoryRouter initialEntries={['/kitchen']}>
        <KitchenContent />
      </MemoryRouter>
    </Provider>,
  );

  return store;
};

afterEach(cleanup);

describe('Kitchen page', () => {
  it('renders shared chrome, heading, transition, and active navigation', () => {
    renderKitchenPage();

    expect(screen.getByRole('banner')).toBeInTheDocument();
    expect(
      screen.getByRole('heading', { level: 1, name: 'Professional Kitchen Services' }),
    ).toBeInTheDocument();
    expect(screen.getByRole('main')).toHaveClass('animate-page-enter');
    expect(screen.getByRole('link', { name: 'Kitchen' })).toHaveAttribute(
      'aria-current',
      'page',
    );
    expect(screen.getByRole('contentinfo')).toBeInTheDocument();
  });

  it('selects All by default and displays the first twenty services', () => {
    renderKitchenPage();

    expect(screen.getByRole('button', { name: 'All' })).toHaveAttribute('aria-pressed', 'true');
    expect(screen.getAllByRole('article')).toHaveLength(20);
    expect(screen.getByRole('heading', { level: 3, name: 'Farmhouse' })).toBeVisible();
    expect(screen.getByRole('heading', { level: 3, name: 'Door Adjustment' })).toBeVisible();
  });

  it('renders all requested category tabs', () => {
    renderKitchenPage();

    [
      'All',
      'Sink Services',
      'Faucet Services',
      'Cabinet Services',
      'Countertop Services',
      'Backsplash & Tile Services',
      'Appliance Installation',
      'Plumbing Repairs',
      'Electrical Services',
      'Lighting Installation',
      'Caulking & Sealing',
      'General Kitchen Repairs',
    ].forEach((category) => {
      expect(screen.getByRole('button', { name: category })).toBeInTheDocument();
    });
  });

  it('shows only services from the selected category', async () => {
    const user = userEvent.setup();
    renderKitchenPage();

    await user.click(screen.getByRole('button', { name: 'Lighting Installation' }));

    expect(screen.getAllByRole('article')).toHaveLength(5);
    expect(screen.getByRole('heading', { level: 3, name: 'Recessed' })).toBeVisible();
    expect(screen.queryByRole('heading', { level: 3, name: 'Farmhouse' })).not.toBeInTheDocument();
  });

  it('filters kitchen services by price range', async () => {
    const user = userEvent.setup();
    renderKitchenPage();

    await user.selectOptions(screen.getByRole('combobox', { name: 'Price Range' }), '100-200');

    screen.getAllByRole('article').forEach((card) => {
      expect(within(card).getByText(/Starting at \$(1\d\d|200)/)).toBeInTheDocument();
    });
  });

  it('adds a kitchen service to the shared Redux cart', async () => {
    const user = userEvent.setup();
    const store = renderKitchenPage();

    await user.click(screen.getByRole('button', { name: 'Sink Services' }));
    await user.click(screen.getByRole('button', { name: 'Add Installation to cart' }));

    expect(store.getState().cart.totalItems).toBe(1);
    expect(store.getState().cart.items[0].title).toBe('Installation');
  });

  it('paginates all seventy-six kitchen services', async () => {
    const user = userEvent.setup();
    renderKitchenPage();

    await user.click(screen.getByRole('button', { name: 'Page 4' }));

    expect(screen.getByRole('button', { name: 'Page 4' })).toHaveAttribute(
      'aria-current',
      'page',
    );
    expect(screen.getAllByRole('article')).toHaveLength(16);
  });
});
