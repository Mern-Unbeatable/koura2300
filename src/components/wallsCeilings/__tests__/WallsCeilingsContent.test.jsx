import React from 'react';
import { configureStore } from '@reduxjs/toolkit';
import { cleanup, render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import cartReducer from '../../../store/slices/cartSlice';
import WallsCeilingsContent from '../WallsCeilingsContent';

const createTestStore = () =>
  configureStore({
    reducer: {
      cart: cartReducer,
    },
  });

const renderWallsCeilingsPage = () => {
  const store = createTestStore();

  render(
    <Provider store={store}>
      <MemoryRouter initialEntries={['/walls-ceilings']}>
        <WallsCeilingsContent />
      </MemoryRouter>
    </Provider>,
  );

  return store;
};

afterEach(cleanup);

describe('Walls & Ceilings page', () => {
  it('renders shared chrome, heading, transition, and active navigation', () => {
    renderWallsCeilingsPage();

    expect(screen.getByRole('banner')).toBeInTheDocument();
    expect(
      screen.getByRole('heading', { level: 1, name: 'Professional Walls & Ceilings Services' }),
    ).toBeInTheDocument();
    expect(screen.getByRole('main')).toHaveClass('animate-page-enter');
    expect(screen.getByRole('link', { name: 'Walls & Ceilings' })).toHaveAttribute(
      'aria-current',
      'page',
    );
    expect(screen.getByRole('contentinfo')).toBeInTheDocument();
  });

  it('selects All by default and displays the first twenty services', () => {
    renderWallsCeilingsPage();

    expect(screen.getByRole('button', { name: 'All' })).toHaveAttribute('aria-pressed', 'true');
    expect(screen.getAllByRole('article')).toHaveLength(20);
    expect(screen.getByRole('heading', { level: 3, name: 'Accent Walls' })).toBeVisible();
    expect(screen.getByRole('heading', { level: 3, name: 'Chair Rail' })).toBeVisible();
  });

  it('renders all requested category tabs', () => {
    renderWallsCeilingsPage();

    [
      'All',
      'Painting',
      'Drywall Services',
      'Insulation',
      'Framing',
      'Trim & Molding',
      'Ceiling Repairs',
      'Wall Repairs',
    ].forEach((category) => {
      expect(screen.getByRole('button', { name: category })).toBeInTheDocument();
    });
  });

  it('shows only services from the selected category', async () => {
    const user = userEvent.setup();
    renderWallsCeilingsPage();

    await user.click(screen.getByRole('button', { name: 'Insulation' }));

    expect(screen.getAllByRole('article')).toHaveLength(3);
    expect(screen.getByRole('heading', { level: 3, name: 'Attic Access' })).toBeVisible();
    expect(screen.queryByRole('heading', { level: 3, name: 'Accent Walls' })).not.toBeInTheDocument();
  });

  it('filters walls and ceilings services by price range', async () => {
    const user = userEvent.setup();
    renderWallsCeilingsPage();

    await user.selectOptions(screen.getByRole('combobox', { name: 'Price Range' }), '100-200');

    screen.getAllByRole('article').forEach((card) => {
      expect(within(card).getByText(/Starting at \$(1\d\d|200)/)).toBeInTheDocument();
    });
  });

  it('adds a walls and ceilings service to the shared Redux cart', async () => {
    const user = userEvent.setup();
    const store = renderWallsCeilingsPage();

    await user.click(screen.getByRole('button', { name: 'Painting' }));
    await user.click(screen.getByRole('button', { name: 'Add Interior to cart' }));

    expect(store.getState().cart.totalItems).toBe(1);
    expect(store.getState().cart.items[0].title).toBe('Interior');
  });

  it('paginates all thirty-one walls and ceilings services', async () => {
    const user = userEvent.setup();
    renderWallsCeilingsPage();

    await user.click(screen.getByRole('button', { name: 'Next page' }));

    expect(screen.getByRole('button', { name: 'Page 2' })).toHaveAttribute(
      'aria-current',
      'page',
    );
    expect(screen.getAllByRole('article')).toHaveLength(11);
  });
});
