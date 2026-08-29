import React from 'react';
import { configureStore } from '@reduxjs/toolkit';
import { cleanup, render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import { DEFAULT_SUBCATEGORY_COPY } from '../../catalog/subcategoryData';
import cartReducer from '../../../store/slices/cartSlice';
import authReducer from '../../../store/slices/authSlice';
import DeckContent from '../DeckContent';

const createTestStore = () =>
  configureStore({
    reducer: {
      cart: cartReducer,
      auth: authReducer,
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

const openSubcategory = async (user, name) => {
  await user.click(screen.getByRole('button', { name }));
};

afterEach(() => {
  cleanup();
});

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

  it('shows subcategory cards instead of pill tabs on the landing view', () => {
    renderDeckPage();

    expect(screen.getByTestId('subcategory-cards-grid')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Deck Repair' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Deck Upgrades' })).toBeInTheDocument();
    expect(screen.queryByRole('button', { name: 'All' })).not.toBeInTheDocument();
    expect(screen.queryByRole('combobox', { name: 'Price Range' })).not.toBeInTheDocument();
    expect(screen.queryAllByRole('article')).toHaveLength(0);
  });

  it('opens child services when a subcategory card is clicked', async () => {
    const user = userEvent.setup();
    renderDeckPage();

    await openSubcategory(user, 'Deck Upgrades');

    expect(screen.getAllByRole('article')).toHaveLength(4);
    expect(screen.getByRole('heading', { level: 3, name: 'Privacy Screens' })).toBeInTheDocument();
    expect(
      screen.queryByRole('heading', { level: 3, name: 'Board Replacement' }),
    ).not.toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: DEFAULT_SUBCATEGORY_COPY.backLabel }),
    ).toBeInTheDocument();
  });

  it('returns to subcategory cards from the services view', async () => {
    const user = userEvent.setup();
    renderDeckPage();

    await openSubcategory(user, 'Deck Upgrades');
    await user.click(screen.getByRole('button', { name: DEFAULT_SUBCATEGORY_COPY.backLabel }));

    expect(screen.getByTestId('subcategory-cards-grid')).toBeInTheDocument();
    expect(screen.queryAllByRole('article')).toHaveLength(0);
  });

  it('filters child services by price range after opening a subcategory', async () => {
    const user = userEvent.setup();
    renderDeckPage();

    await openSubcategory(user, 'Deck Repair');
    await user.selectOptions(screen.getByRole('combobox', { name: 'Price Range' }), '100-200');

    const visibleCards = screen.getAllByRole('article');
    expect(visibleCards.length).toBeGreaterThan(0);
    visibleCards.forEach((card) => {
      expect(within(card).getByText(/Starting at \$(1\d\d|200)/)).toBeInTheDocument();
    });
  });

  it('adds a deck service to the shared Redux cart from a subcategory', async () => {
    const user = userEvent.setup();
    const store = renderDeckPage();

    await openSubcategory(user, 'Deck Repair');
    await user.click(screen.getByRole('button', { name: 'Add Board Replacement to cart' }));

    expect(store.getState().cart.totalItems).toBe(1);
    expect(store.getState().cart.items[0].title).toBe('Board Replacement');
  });
});
