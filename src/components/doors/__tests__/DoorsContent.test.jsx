import React from 'react';
import { configureStore } from '@reduxjs/toolkit';
import { cleanup, render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import cartReducer from '../../../store/slices/cartSlice';
import DoorsContent from '../DoorsContent';

const createTestStore = () =>
  configureStore({
    reducer: {
      cart: cartReducer,
    },
  });

const renderDoorsPage = () => {
  const store = createTestStore();

  render(
    <Provider store={store}>
      <MemoryRouter initialEntries={['/doors']}>
        <DoorsContent />
      </MemoryRouter>
    </Provider>,
  );

  return store;
};

afterEach(cleanup);

describe('Doors page', () => {
  it('renders shared chrome, heading, transition, and active navigation', () => {
    renderDoorsPage();

    expect(screen.getByRole('banner')).toBeInTheDocument();
    expect(
      screen.getByRole('heading', { level: 1, name: 'Professional Door Services' }),
    ).toBeInTheDocument();
    expect(screen.getByRole('main')).toHaveClass('animate-page-enter');
    expect(screen.getByRole('link', { name: 'Doors' })).toHaveAttribute('aria-current', 'page');
    expect(screen.getByRole('contentinfo')).toBeInTheDocument();
  });

  it('selects All by default and displays the first twenty services', () => {
    renderDoorsPage();

    expect(screen.getByRole('button', { name: 'All' })).toHaveAttribute('aria-pressed', 'true');
    expect(screen.getAllByRole('article')).toHaveLength(20);
    expect(screen.getByRole('heading', { level: 3, name: 'Entry Door' })).toBeVisible();
    expect(screen.getByRole('heading', { level: 3, name: 'Deadbolts' })).toBeVisible();
  });

  it('renders all requested category tabs', () => {
    renderDoorsPage();

    [
      'All',
      'Interior Door Services',
      'Exterior Door Services',
      'Front Door Services',
      'Door Hardware',
      'Door Trim & Molding',
      'Screen Doors',
      'Weatherproofing',
    ].forEach((category) => {
      expect(screen.getByRole('button', { name: category })).toBeInTheDocument();
    });
  });

  it('shows only services from the selected category', async () => {
    const user = userEvent.setup();
    renderDoorsPage();

    await user.click(screen.getByRole('button', { name: 'Door Hardware' }));

    expect(screen.getAllByRole('article')).toHaveLength(5);
    expect(screen.getByRole('heading', { level: 3, name: 'Closers' })).toBeVisible();
    expect(screen.queryByRole('heading', { level: 3, name: 'Entry Door' })).not.toBeInTheDocument();
  });

  it('filters door services by price range', async () => {
    const user = userEvent.setup();
    renderDoorsPage();

    await user.selectOptions(screen.getByRole('combobox', { name: 'Price Range' }), '100-200');

    screen.getAllByRole('article').forEach((card) => {
      expect(within(card).getByText(/Starting at \$(1\d\d|200)/)).toBeInTheDocument();
    });
  });

  it('adds a door service to the shared Redux cart', async () => {
    const user = userEvent.setup();
    const store = renderDoorsPage();

    await user.click(screen.getByRole('button', { name: 'Interior Door Services' }));
    await user.click(screen.getByRole('button', { name: 'Add Installation to cart' }));

    expect(store.getState().cart.totalItems).toBe(1);
    expect(store.getState().cart.items[0].title).toBe('Installation');
  });

  it('paginates all twenty-five door services', async () => {
    const user = userEvent.setup();
    renderDoorsPage();

    await user.click(screen.getByRole('button', { name: 'Next page' }));

    expect(screen.getByRole('button', { name: 'Page 2' })).toHaveAttribute(
      'aria-current',
      'page',
    );
    expect(screen.getAllByRole('article')).toHaveLength(5);
  });
});
