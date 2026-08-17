import React from 'react';
import { configureStore } from '@reduxjs/toolkit';
import { cleanup, render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import cartReducer from '../../../store/slices/cartSlice';
import FenceContent from '../FenceContent';

const createTestStore = () =>
  configureStore({
    reducer: {
      cart: cartReducer,
    },
  });

const renderFencePage = () => {
  const store = createTestStore();

  render(
    <Provider store={store}>
      <MemoryRouter initialEntries={['/fence']}>
        <FenceContent />
      </MemoryRouter>
    </Provider>,
  );

  return store;
};

afterEach(cleanup);

describe('Fence page', () => {
  it('renders shared chrome, heading, transition, and active navigation', () => {
    renderFencePage();

    expect(screen.getByRole('banner')).toBeInTheDocument();
    expect(
      screen.getByRole('heading', { level: 1, name: 'Professional Fence Services' }),
    ).toBeInTheDocument();
    expect(screen.getByRole('main')).toHaveClass('animate-page-enter');
    expect(screen.getByRole('link', { name: 'Fence' })).toHaveAttribute('aria-current', 'page');
    expect(screen.getByRole('contentinfo')).toBeInTheDocument();
  });

  it('selects All by default and displays the first twenty services', () => {
    renderFencePage();

    expect(screen.getByRole('button', { name: 'All' })).toHaveAttribute('aria-pressed', 'true');
    expect(screen.getAllByRole('article')).toHaveLength(20);
    expect(screen.getByRole('heading', { level: 3, name: 'Wood Fence' })).toBeVisible();
    expect(screen.getByRole('heading', { level: 3, name: 'Broken Panels' })).toBeVisible();
  });

  it('renders all requested category tabs', () => {
    renderFencePage();

    [
      'All',
      'Fence Installation',
      'Fence Repair',
      'Fence Gate Services',
      'Fence Staining & Painting',
      'Fence Maintenance',
    ].forEach((category) => {
      expect(screen.getByRole('button', { name: category })).toBeInTheDocument();
    });
  });

  it('shows only services from the selected category', async () => {
    const user = userEvent.setup();
    renderFencePage();

    await user.click(screen.getByRole('button', { name: 'Fence Gate Services' }));

    expect(screen.getAllByRole('article')).toHaveLength(5);
    expect(screen.getByRole('heading', { level: 3, name: 'Gate Installation' })).toBeVisible();
    expect(screen.queryByRole('heading', { level: 3, name: 'Wood Fence' })).not.toBeInTheDocument();
  });

  it('filters fence services by price range', async () => {
    const user = userEvent.setup();
    renderFencePage();

    await user.selectOptions(screen.getByRole('combobox', { name: 'Price Range' }), '100-200');

    screen.getAllByRole('article').forEach((card) => {
      expect(within(card).getByText(/Starting at \$(1\d\d|200)/)).toBeInTheDocument();
    });
  });

  it('adds a fence service to the shared Redux cart', async () => {
    const user = userEvent.setup();
    const store = renderFencePage();

    await user.click(screen.getByRole('button', { name: 'Add Wood Fence to cart' }));

    expect(store.getState().cart.totalItems).toBe(1);
    expect(store.getState().cart.items[0].title).toBe('Wood Fence');
  });

  it('paginates all twenty-two fence services', async () => {
    const user = userEvent.setup();
    renderFencePage();

    await user.click(screen.getByRole('button', { name: 'Next page' }));

    expect(screen.getByRole('button', { name: 'Page 2' })).toHaveAttribute(
      'aria-current',
      'page',
    );
    expect(screen.getAllByRole('article')).toHaveLength(2);
  });
});
