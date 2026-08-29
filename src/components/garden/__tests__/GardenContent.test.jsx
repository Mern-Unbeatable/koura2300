import React from 'react';
import { configureStore } from '@reduxjs/toolkit';
import { cleanup, render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import { DEFAULT_SUBCATEGORY_COPY } from '../../catalog/subcategoryData';
import cartReducer from '../../../store/slices/cartSlice';
import authReducer from '../../../store/slices/authSlice';
import GardenContent from '../GardenContent';

const createTestStore = () =>
  configureStore({
    reducer: {
      cart: cartReducer,
      auth: authReducer,
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

const openSubcategory = async (user, name) => {
  await user.click(screen.getByRole('button', { name }));
};

afterEach(() => {
  cleanup();
});

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

  it('shows subcategory cards instead of pill tabs on the landing view', () => {
    renderGardenPage();

    expect(screen.getByTestId('subcategory-cards-grid')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Tree & Shrub Planting' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Playground Assembly' })).toBeInTheDocument();
    expect(screen.queryByRole('button', { name: 'All' })).not.toBeInTheDocument();
    expect(screen.queryByRole('combobox', { name: 'Price Range' })).not.toBeInTheDocument();
    expect(screen.queryAllByRole('article')).toHaveLength(0);
  });

  it('opens child services when a subcategory card is clicked', async () => {
    const user = userEvent.setup();
    renderGardenPage();

    await openSubcategory(user, 'Playground Assembly');

    expect(screen.getAllByRole('article')).toHaveLength(4);
    expect(screen.getByRole('heading', { level: 3, name: 'Playhouses' })).toBeInTheDocument();
    expect(screen.queryByRole('heading', { level: 3, name: 'Tree Planting' })).not.toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: DEFAULT_SUBCATEGORY_COPY.backLabel }),
    ).toBeInTheDocument();
  });

  it('returns to subcategory cards from the services view', async () => {
    const user = userEvent.setup();
    renderGardenPage();

    await openSubcategory(user, 'Playground Assembly');
    await user.click(screen.getByRole('button', { name: DEFAULT_SUBCATEGORY_COPY.backLabel }));

    expect(screen.getByTestId('subcategory-cards-grid')).toBeInTheDocument();
    expect(screen.queryAllByRole('article')).toHaveLength(0);
  });

  it('filters child services by price range after opening a subcategory', async () => {
    const user = userEvent.setup();
    renderGardenPage();

    await openSubcategory(user, 'Tree & Shrub Planting');
    await user.selectOptions(screen.getByRole('combobox', { name: 'Price Range' }), '100-200');

    const visibleCards = screen.getAllByRole('article');
    expect(visibleCards.length).toBeGreaterThan(0);
    visibleCards.forEach((card) => {
      expect(within(card).getByText(/Starting at \$(1\d\d|200)/)).toBeInTheDocument();
    });
  });

  it('adds a garden service to the shared Redux cart from a subcategory', async () => {
    const user = userEvent.setup();
    const store = renderGardenPage();

    await openSubcategory(user, 'Tree & Shrub Planting');
    await user.click(screen.getByRole('button', { name: 'Add Tree Planting to cart' }));

    expect(store.getState().cart.totalItems).toBe(1);
    expect(store.getState().cart.items[0].title).toBe('Tree Planting');
  });
});
