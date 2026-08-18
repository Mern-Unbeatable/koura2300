import React from 'react';
import { configureStore } from '@reduxjs/toolkit';
import { cleanup, render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import cartReducer from '../../../store/slices/cartSlice';
import BathroomContent from '../BathroomContent';

const createTestStore = () =>
  configureStore({
    reducer: {
      cart: cartReducer,
    },
  });

const renderBathroomPage = () => {
  const store = createTestStore();

  render(
    <Provider store={store}>
      <MemoryRouter initialEntries={['/bathroom']}>
        <BathroomContent />
      </MemoryRouter>
    </Provider>,
  );

  return store;
};

afterEach(cleanup);

describe('Bathroom page', () => {
  it('renders shared chrome, heading, transition, and active navigation', () => {
    renderBathroomPage();

    expect(screen.getByRole('banner')).toBeInTheDocument();
    expect(
      screen.getByRole('heading', { level: 1, name: 'Professional Bathroom Services' }),
    ).toBeInTheDocument();
    expect(screen.getByRole('main')).toHaveClass('animate-page-enter');
    expect(screen.getByRole('link', { name: 'Bathroom' })).toHaveAttribute(
      'aria-current',
      'page',
    );
    expect(screen.getByRole('contentinfo')).toBeInTheDocument();
  });

  it('selects All by default and displays the first twenty services', () => {
    renderBathroomPage();

    expect(screen.getByRole('button', { name: 'All' })).toHaveAttribute('aria-pressed', 'true');
    expect(screen.getAllByRole('article')).toHaveLength(20);
    expect(screen.getByRole('heading', { level: 3, name: 'Wax Ring' })).toBeVisible();
    expect(screen.getByRole('heading', { level: 3, name: 'Vanity Top' })).toBeVisible();
  });

  it('renders all requested category tabs', () => {
    renderBathroomPage();

    [
      'All',
      'Toilet Services',
      'Bidet Installation & Services',
      'Vanity Services',
      'Sink & Faucet Services',
      'Shower & Bathtub Services',
      'Tile & Grout Services',
      'Plumbing Repairs',
      'Electrical Services',
      'Lighting Installation',
      'Ventilation Services',
      'Mirror & Accessory Installation',
      'Caulking & Waterproofing',
      'General Bathroom Repairs',
    ].forEach((category) => {
      expect(screen.getByRole('button', { name: category })).toBeInTheDocument();
    });
  });

  it('shows only services from the selected category', async () => {
    const user = userEvent.setup();
    renderBathroomPage();

    await user.click(screen.getByRole('button', { name: 'Ventilation Services' }));

    expect(screen.getAllByRole('article')).toHaveLength(4);
    expect(screen.getByRole('heading', { level: 3, name: 'Vent Cover' })).toBeVisible();
    expect(screen.queryByRole('heading', { level: 3, name: 'Wax Ring' })).not.toBeInTheDocument();
  });

  it('filters bathroom services by price range', async () => {
    const user = userEvent.setup();
    renderBathroomPage();

    await user.selectOptions(screen.getByRole('combobox', { name: 'Price Range' }), '100-200');

    screen.getAllByRole('article').forEach((card) => {
      expect(within(card).getByText(/Starting at \$(1\d\d|200)/)).toBeInTheDocument();
    });
  });

  it('adds a bathroom service to the shared Redux cart', async () => {
    const user = userEvent.setup();
    const store = renderBathroomPage();

    await user.click(screen.getByRole('button', { name: 'Toilet Services' }));
    await user.click(screen.getByRole('button', { name: 'Add Installation to cart' }));

    expect(store.getState().cart.totalItems).toBe(1);
    expect(store.getState().cart.items[0].title).toBe('Installation');
  });

  it('paginates all eighty-two bathroom services', async () => {
    const user = userEvent.setup();
    renderBathroomPage();

    await user.click(screen.getByRole('button', { name: 'Page 5' }));

    expect(screen.getByRole('button', { name: 'Page 5' })).toHaveAttribute(
      'aria-current',
      'page',
    );
    expect(screen.getAllByRole('article')).toHaveLength(2);
  });
});
