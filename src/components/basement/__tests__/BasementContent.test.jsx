import React from 'react';
import { configureStore } from '@reduxjs/toolkit';
import { cleanup, render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import cartReducer from '../../../store/slices/cartSlice';
import BasementContent from '../BasementContent';

const createTestStore = () =>
  configureStore({
    reducer: {
      cart: cartReducer,
    },
  });

const renderBasementPage = () => {
  const store = createTestStore();

  render(
    <Provider store={store}>
      <MemoryRouter initialEntries={['/basement']}>
        <BasementContent />
      </MemoryRouter>
    </Provider>,
  );

  return store;
};

afterEach(cleanup);

describe('Basement page', () => {
  it('renders shared chrome, heading, transition, and active navigation', () => {
    renderBasementPage();

    expect(screen.getByRole('banner')).toBeInTheDocument();
    expect(
      screen.getByRole('heading', { level: 1, name: 'Professional Basement Services' }),
    ).toBeInTheDocument();
    expect(screen.getByRole('main')).toHaveClass('animate-page-enter');
    expect(screen.getByRole('link', { name: 'Basement' })).toHaveAttribute(
      'aria-current',
      'page',
    );
    expect(screen.getByRole('contentinfo')).toBeInTheDocument();
  });

  it('selects All by default and displays the first twenty services', () => {
    renderBasementPage();

    expect(screen.getByRole('button', { name: 'All' })).toHaveAttribute('aria-pressed', 'true');
    expect(screen.getAllByRole('article')).toHaveLength(20);
    expect(screen.getByRole('heading', { level: 3, name: 'Installation' })).toBeVisible();
    expect(screen.getByRole('heading', { level: 3, name: 'Pipe Repairs' })).toBeVisible();
  });

  it('renders all requested category tabs', () => {
    renderBasementPage();

    [
      'All',
      'Sump Pump Services',
      'Basement Plumbing',
      'Waterproofing',
      'Weatherproofing',
      'Pest Proofing',
      'General Basement Repairs',
    ].forEach((category) => {
      expect(screen.getByRole('button', { name: category })).toBeInTheDocument();
    });
  });

  it('shows only services from the selected category', async () => {
    const user = userEvent.setup();
    renderBasementPage();

    await user.click(screen.getByRole('button', { name: 'Pest Proofing' }));

    expect(screen.getAllByRole('article')).toHaveLength(3);
    expect(screen.getByRole('heading', { level: 3, name: 'Vent Covers' })).toBeVisible();
    expect(screen.queryByRole('heading', { level: 3, name: 'Pipe Repairs' })).not.toBeInTheDocument();
  });

  it('filters basement services by price range', async () => {
    const user = userEvent.setup();
    renderBasementPage();

    await user.selectOptions(screen.getByRole('combobox', { name: 'Price Range' }), '100-200');

    screen.getAllByRole('article').forEach((card) => {
      expect(within(card).getByText(/Starting at \$(1\d\d|200)/)).toBeInTheDocument();
    });
  });

  it('adds a basement service to the shared Redux cart', async () => {
    const user = userEvent.setup();
    const store = renderBasementPage();

    await user.click(screen.getByRole('button', { name: 'Add Installation to cart' }));

    expect(store.getState().cart.totalItems).toBe(1);
    expect(store.getState().cart.items[0].title).toBe('Installation');
  });

  it('paginates all twenty-one basement services', async () => {
    const user = userEvent.setup();
    renderBasementPage();

    await user.click(screen.getByRole('button', { name: 'Next page' }));

    expect(screen.getByRole('button', { name: 'Page 2' })).toHaveAttribute(
      'aria-current',
      'page',
    );
    expect(screen.getAllByRole('article')).toHaveLength(1);
  });
});
