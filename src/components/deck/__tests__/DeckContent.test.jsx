import React from 'react';
import { configureStore } from '@reduxjs/toolkit';
import { cleanup, render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import cartReducer from '../../../store/slices/cartSlice';
import DeckContent from '../DeckContent';

const createTestStore = () =>
  configureStore({
    reducer: {
      cart: cartReducer,
    },
  });

const renderDeckPage = () => {
  const store = createTestStore();

  render(
    <Provider store={store}>
      <MemoryRouter initialEntries={['/deck']}>
        <DeckContent />
      </MemoryRouter>
    </Provider>,
  );

  return store;
};

afterEach(cleanup);

describe('Deck page', () => {
  it('renders shared chrome, heading, transition, and active navigation', () => {
    renderDeckPage();

    expect(screen.getByRole('banner')).toBeInTheDocument();
    expect(
      screen.getByRole('heading', { level: 1, name: 'Professional Deck Services' }),
    ).toBeInTheDocument();
    expect(screen.getByRole('main')).toHaveClass('animate-page-enter');
    expect(
      within(screen.getByRole('navigation', { name: 'Service categories' })).getByRole('link', {
        name: 'Deck',
      }),
    ).toHaveAttribute('aria-current', 'page');
    expect(screen.getByRole('contentinfo')).toBeInTheDocument();
  });

  it('selects All by default and displays every deck service on one page', () => {
    renderDeckPage();

    expect(screen.getByRole('button', { name: 'All' })).toHaveAttribute('aria-pressed', 'true');
    expect(screen.getAllByRole('article')).toHaveLength(20);
    expect(screen.getByRole('heading', { level: 3, name: 'Board Replacement' })).toBeVisible();
    expect(screen.getByRole('heading', { level: 3, name: 'Bench Installation' })).toBeVisible();
    expect(screen.queryByRole('button', { name: 'Next page' })).not.toBeInTheDocument();
  });

  it('renders all requested category tabs', () => {
    renderDeckPage();

    [
      'All',
      'Deck Repair',
      'Deck Staining & Sealing',
      'Deck Railing Services',
      'Deck Maintenance',
      'Deck Upgrades',
    ].forEach((category) => {
      expect(screen.getByRole('button', { name: category })).toBeInTheDocument();
    });
  });

  it('shows only services from the selected category', async () => {
    const user = userEvent.setup();
    renderDeckPage();

    await user.click(screen.getByRole('button', { name: 'Deck Upgrades' }));

    expect(screen.getAllByRole('article')).toHaveLength(4);
    expect(screen.getByRole('heading', { level: 3, name: 'Privacy Screens' })).toBeVisible();
    expect(
      screen.queryByRole('heading', { level: 3, name: 'Board Replacement' }),
    ).not.toBeInTheDocument();
  });

  it('filters deck services by price range', async () => {
    const user = userEvent.setup();
    renderDeckPage();

    await user.selectOptions(screen.getByRole('combobox', { name: 'Price Range' }), '100-200');

    screen.getAllByRole('article').forEach((card) => {
      expect(within(card).getByText(/Starting at \$(1\d\d|200)/)).toBeInTheDocument();
    });
  });

  it('adds a deck service to the shared Redux cart', async () => {
    const user = userEvent.setup();
    const store = renderDeckPage();

    await user.click(screen.getByRole('button', { name: 'Add Board Replacement to cart' }));

    expect(store.getState().cart.totalItems).toBe(1);
    expect(store.getState().cart.items[0].title).toBe('Board Replacement');
  });
});
