import React from 'react';
import { configureStore } from '@reduxjs/toolkit';
import { cleanup, render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import cartReducer from '../../../store/slices/cartSlice';
import GardenContent from '../GardenContent';

const createTestStore = () =>
  configureStore({
    reducer: {
      cart: cartReducer,
    },
  });

const renderGardenPage = () => {
  const store = createTestStore();

  render(
    <Provider store={store}>
      <MemoryRouter initialEntries={['/garden']}>
        <GardenContent />
      </MemoryRouter>
    </Provider>,
  );

  return store;
};

afterEach(cleanup);

describe('Garden page', () => {
  it('renders shared chrome, heading, transition, and active navigation', () => {
    renderGardenPage();

    expect(screen.getByRole('banner')).toBeInTheDocument();
    expect(
      screen.getByRole('heading', { level: 1, name: 'Professional Garden Services' }),
    ).toBeInTheDocument();
    expect(screen.getByRole('main')).toHaveClass('animate-page-enter');
    expect(
      within(screen.getByRole('navigation', { name: 'Service categories' })).getByRole('link', {
        name: 'Garden',
      }),
    ).toHaveAttribute('aria-current', 'page');
    expect(screen.getByRole('contentinfo')).toBeInTheDocument();
  });

  it('selects All by default and displays every garden service on one page', () => {
    renderGardenPage();

    expect(screen.getByRole('button', { name: 'All' })).toHaveAttribute('aria-pressed', 'true');
    expect(screen.getAllByRole('article')).toHaveLength(20);
    expect(screen.getByRole('heading', { level: 3, name: 'Tree Planting' })).toBeVisible();
    expect(screen.getByRole('heading', { level: 3, name: 'Swing Sets' })).toBeVisible();
    expect(screen.queryByRole('button', { name: 'Next page' })).not.toBeInTheDocument();
  });

  it('renders all requested category tabs', () => {
    renderGardenPage();

    [
      'All',
      'Tree & Shrub Planting',
      'Garden Maintenance',
      'Mulching',
      'Landscape Improvements',
      'Walkway & Paver Repairs',
      'Playground Assembly',
    ].forEach((category) => {
      expect(screen.getByRole('button', { name: category })).toBeInTheDocument();
    });
  });

  it('shows only services from the selected category', async () => {
    const user = userEvent.setup();
    renderGardenPage();

    await user.click(screen.getByRole('button', { name: 'Playground Assembly' }));

    expect(screen.getAllByRole('article')).toHaveLength(4);
    expect(screen.getByRole('heading', { level: 3, name: 'Playhouses' })).toBeVisible();
    expect(screen.queryByRole('heading', { level: 3, name: 'Tree Planting' })).not.toBeInTheDocument();
  });

  it('filters garden services by price range', async () => {
    const user = userEvent.setup();
    renderGardenPage();

    await user.selectOptions(screen.getByRole('combobox', { name: 'Price Range' }), '100-200');

    screen.getAllByRole('article').forEach((card) => {
      expect(within(card).getByText(/Starting at \$(1\d\d|200)/)).toBeInTheDocument();
    });
  });

  it('adds a garden service to the shared Redux cart', async () => {
    const user = userEvent.setup();
    const store = renderGardenPage();

    await user.click(screen.getByRole('button', { name: 'Add Tree Planting to cart' }));

    expect(store.getState().cart.totalItems).toBe(1);
    expect(store.getState().cart.items[0].title).toBe('Tree Planting');
  });
});
