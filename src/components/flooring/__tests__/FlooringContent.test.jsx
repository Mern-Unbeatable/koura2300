import React from 'react';
import { configureStore } from '@reduxjs/toolkit';
import { cleanup, render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import cartReducer from '../../../store/slices/cartSlice';
import FlooringContent from '../FlooringContent';

const createTestStore = () =>
  configureStore({
    reducer: {
      cart: cartReducer,
    },
  });

const renderFlooringPage = () => {
  const store = createTestStore();

  render(
    <Provider store={store}>
      <MemoryRouter initialEntries={['/flooring']}>
        <FlooringContent />
      </MemoryRouter>
    </Provider>,
  );

  return store;
};

afterEach(cleanup);

describe('Flooring page', () => {
  it('renders shared chrome, heading, transition, and active navigation', () => {
    renderFlooringPage();

    expect(screen.getByRole('banner')).toBeInTheDocument();
    expect(
      screen.getByRole('heading', { level: 1, name: 'Professional Flooring Services' }),
    ).toBeInTheDocument();
    expect(screen.getByRole('main')).toHaveClass('animate-page-enter');
    expect(
      within(screen.getByRole('navigation', { name: 'Service categories' })).getByRole('link', {
        name: 'Flooring',
      }),
    ).toHaveAttribute('aria-current', 'page');
    expect(screen.getByRole('contentinfo')).toBeInTheDocument();
  });

  it('selects All by default and displays the first twenty services', () => {
    renderFlooringPage();

    expect(screen.getByRole('button', { name: 'All' })).toHaveAttribute('aria-pressed', 'true');
    expect(screen.getAllByRole('article')).toHaveLength(20);
    expect(screen.getByRole('heading', { level: 3, name: 'Trim Installation' })).toBeVisible();
    expect(screen.getByRole('heading', { level: 3, name: 'Grouting' })).toBeVisible();
  });

  it('renders all requested category tabs', () => {
    renderFlooringPage();

    [
      'All',
      'Hardwood Flooring',
      'Laminate Flooring',
      'Vinyl Flooring',
      'Tile Flooring',
      'Carpet Flooring',
      'Floor Repairs',
      'Trim & Baseboards',
    ].forEach((category) => {
      expect(screen.getByRole('button', { name: category })).toBeInTheDocument();
    });
  });

  it('shows only services from the selected category', async () => {
    const user = userEvent.setup();
    renderFlooringPage();

    await user.click(screen.getByRole('button', { name: 'Trim & Baseboards' }));

    expect(screen.getAllByRole('article')).toHaveLength(4);
    expect(screen.getByRole('heading', { level: 3, name: 'Quarter Round' })).toBeVisible();
    expect(screen.queryByRole('heading', { level: 3, name: 'Grouting' })).not.toBeInTheDocument();
  });

  it('filters flooring services by price range', async () => {
    const user = userEvent.setup();
    renderFlooringPage();

    await user.selectOptions(screen.getByRole('combobox', { name: 'Price Range' }), '100-200');

    screen.getAllByRole('article').forEach((card) => {
      expect(within(card).getByText(/Starting at \$(1\d\d|200)/)).toBeInTheDocument();
    });
  });

  it('adds a flooring service to the shared Redux cart', async () => {
    const user = userEvent.setup();
    const store = renderFlooringPage();

    await user.click(screen.getByRole('button', { name: 'Hardwood Flooring' }));
    await user.click(screen.getByRole('button', { name: 'Add Installation to cart' }));

    expect(store.getState().cart.totalItems).toBe(1);
    expect(store.getState().cart.items[0].title).toBe('Installation');
  });

  it('paginates all twenty-six flooring services', async () => {
    const user = userEvent.setup();
    renderFlooringPage();

    await user.click(screen.getByRole('button', { name: 'Next page' }));

    expect(screen.getByRole('button', { name: 'Page 2' })).toHaveAttribute(
      'aria-current',
      'page',
    );
    expect(screen.getAllByRole('article')).toHaveLength(6);
  });
});
