import React from 'react';
import { configureStore } from '@reduxjs/toolkit';
import { cleanup, render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import cartReducer from '../../../store/slices/cartSlice';
import WindowsContent from '../WindowsContent';

const createTestStore = () =>
  configureStore({
    reducer: {
      cart: cartReducer,
    },
  });

const renderWindowsPage = () => {
  const store = createTestStore();

  render(
    <Provider store={store}>
      <MemoryRouter initialEntries={['/windows']}>
        <WindowsContent />
      </MemoryRouter>
    </Provider>,
  );

  return store;
};

afterEach(cleanup);

describe('Windows page', () => {
  it('renders shared chrome, heading, transition, and active navigation', () => {
    renderWindowsPage();

    expect(screen.getByRole('banner')).toBeInTheDocument();
    expect(
      screen.getByRole('heading', { level: 1, name: 'Professional Window Services' }),
    ).toBeInTheDocument();
    expect(screen.getByRole('main')).toHaveClass('animate-page-enter');
    expect(
      within(screen.getByRole('navigation', { name: 'Service categories' })).getByRole('link', {
        name: 'Windows',
      }),
    ).toHaveAttribute('aria-current', 'page');
    expect(screen.getByRole('contentinfo')).toBeInTheDocument();
  });

  it('selects All by default and displays every window service on one page', () => {
    renderWindowsPage();

    expect(screen.getByRole('button', { name: 'All' })).toHaveAttribute('aria-pressed', 'true');
    expect(screen.getAllByRole('article')).toHaveLength(19);
    expect(screen.getByRole('heading', { level: 3, name: 'New Installation' })).toBeVisible();
    expect(screen.getByRole('heading', { level: 3, name: 'Draft Protection' })).toBeVisible();
    expect(screen.queryByRole('button', { name: 'Next page' })).not.toBeInTheDocument();
  });

  it('renders all requested category tabs', () => {
    renderWindowsPage();

    [
      'All',
      'Window Installation & Replacement',
      'Window Repair',
      'Window Screens',
      'Window Trim & Molding',
      'Caulking & Sealing',
      'Weatherproofing',
    ].forEach((category) => {
      expect(screen.getByRole('button', { name: category })).toBeInTheDocument();
    });
  });

  it('shows only services from the selected category', async () => {
    const user = userEvent.setup();
    renderWindowsPage();

    await user.click(screen.getByRole('button', { name: 'Window Repair' }));

    expect(screen.getAllByRole('article')).toHaveLength(4);
    expect(screen.getByRole('heading', { level: 3, name: 'Balance' })).toBeVisible();
    expect(
      screen.queryByRole('heading', { level: 3, name: 'New Installation' }),
    ).not.toBeInTheDocument();
  });

  it('filters window services by price range', async () => {
    const user = userEvent.setup();
    renderWindowsPage();

    await user.selectOptions(screen.getByRole('combobox', { name: 'Price Range' }), '100-200');

    screen.getAllByRole('article').forEach((card) => {
      expect(within(card).getByText(/Starting at \$(1\d\d|200)/)).toBeInTheDocument();
    });
  });

  it('adds a window service to the shared Redux cart', async () => {
    const user = userEvent.setup();
    const store = renderWindowsPage();

    await user.click(screen.getByRole('button', { name: 'Add New Installation to cart' }));

    expect(store.getState().cart.totalItems).toBe(1);
    expect(store.getState().cart.items[0].title).toBe('New Installation');
  });
});
