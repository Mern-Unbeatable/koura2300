import React from 'react';
import { configureStore } from '@reduxjs/toolkit';
import { cleanup, render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import cartReducer from '../../../store/slices/cartSlice';
import ClosetsContent from '../ClosetsContent';

const createTestStore = () =>
  configureStore({
    reducer: {
      cart: cartReducer,
    },
  });

const renderClosetsPage = () => {
  const store = createTestStore();

  render(
    <Provider store={store}>
      <MemoryRouter initialEntries={['/closets']}>
        <ClosetsContent />
      </MemoryRouter>
    </Provider>,
  );

  return store;
};

afterEach(cleanup);

describe('Closets page', () => {
  it('renders shared chrome, heading, transition, and active navigation', () => {
    renderClosetsPage();

    expect(screen.getByRole('banner')).toBeInTheDocument();
    expect(
      screen.getByRole('heading', { level: 1, name: 'Professional Closet Services' }),
    ).toBeInTheDocument();
    expect(screen.getByRole('main')).toHaveClass('animate-page-enter');
    expect(screen.getByRole('link', { name: 'Closets' })).toHaveAttribute(
      'aria-current',
      'page',
    );
    expect(screen.getByRole('contentinfo')).toBeInTheDocument();
  });

  it('selects All by default and displays the first twenty services', () => {
    renderClosetsPage();

    expect(screen.getByRole('button', { name: 'All' })).toHaveAttribute(
      'aria-pressed',
      'true',
    );
    expect(screen.getAllByRole('article')).toHaveLength(20);
    expect(
      screen.getByRole('heading', { level: 3, name: 'Sliding Door Repair' }),
    ).toBeVisible();
    expect(
      screen.getByRole('heading', { level: 3, name: 'Shelf Installation' }),
    ).toBeVisible();
  });

  it('renders all requested category tabs', () => {
    renderClosetsPage();

    [
      'All',
      'Closet Door Services',
      'Closet Shelving',
      'Closet Organization',
      'Closet Lighting',
      'Closet Repairs',
    ].forEach((category) => {
      expect(screen.getByRole('button', { name: category })).toBeInTheDocument();
    });
  });

  it('shows only services from the selected category', async () => {
    const user = userEvent.setup();
    renderClosetsPage();

    await user.click(screen.getByRole('button', { name: 'Closet Lighting' }));

    expect(screen.getAllByRole('article')).toHaveLength(4);
    expect(screen.getByRole('heading', { level: 3, name: 'LED Lighting' })).toBeVisible();
    expect(
      screen.queryByRole('heading', { level: 3, name: 'Sliding Door Repair' }),
    ).not.toBeInTheDocument();
  });

  it('filters closet services by price range', async () => {
    const user = userEvent.setup();
    renderClosetsPage();

    await user.selectOptions(screen.getByRole('combobox', { name: 'Price Range' }), '100-200');

    screen.getAllByRole('article').forEach((card) => {
      expect(within(card).getByText(/Starting at \$(1\d\d|200)/)).toBeInTheDocument();
    });
  });

  it('adds a closet service to the shared Redux cart', async () => {
    const user = userEvent.setup();
    const store = renderClosetsPage();

    await user.click(screen.getByRole('button', { name: 'Add Sliding Door Repair to cart' }));

    expect(store.getState().cart.totalItems).toBe(1);
    expect(store.getState().cart.items[0].title).toBe('Sliding Door Repair');
  });

  it('paginates all twenty-three closet services', async () => {
    const user = userEvent.setup();
    renderClosetsPage();

    await user.click(screen.getByRole('button', { name: 'Next page' }));

    expect(screen.getByRole('button', { name: 'Page 2' })).toHaveAttribute(
      'aria-current',
      'page',
    );
    expect(screen.getAllByRole('article')).toHaveLength(3);
  });
});
