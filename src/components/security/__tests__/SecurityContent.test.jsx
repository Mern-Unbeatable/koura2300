import React from 'react';
import { configureStore } from '@reduxjs/toolkit';
import { cleanup, render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import cartReducer from '../../../store/slices/cartSlice';
import SecurityContent from '../SecurityContent';

const createTestStore = () =>
  configureStore({
    reducer: {
      cart: cartReducer,
    },
  });

const renderSecurityPage = () => {
  const store = createTestStore();

  render(
    <Provider store={store}>
      <MemoryRouter initialEntries={['/security']}>
        <SecurityContent />
      </MemoryRouter>
    </Provider>,
  );

  return store;
};

afterEach(cleanup);

describe('Security page', () => {
  it('renders the shared site chrome and page heading', () => {
    renderSecurityPage();

    expect(screen.getByRole('banner')).toBeInTheDocument();
    expect(
      screen.getByRole('heading', { level: 1, name: 'Professional Security Services' }),
    ).toBeInTheDocument();
    expect(
      within(screen.getByRole('navigation', { name: 'Service categories' })).getByRole('link', {
        name: 'Security',
      }),
    ).toHaveAttribute('aria-current', 'page');
    expect(screen.getByRole('contentinfo')).toBeInTheDocument();
  });

  it('selects All by default and renders every service category', () => {
    renderSecurityPage();

    expect(screen.getByRole('button', { name: 'All' })).toHaveAttribute(
      'aria-pressed',
      'true',
    );
    expect(
      screen.getByRole('heading', { level: 3, name: 'Camera Installation' }),
    ).toBeVisible();
    expect(
      screen.getByRole('heading', { level: 3, name: 'Alarm Installation' }),
    ).toBeVisible();
    expect(screen.getByRole('heading', { level: 3, name: 'Smart Locks' })).toBeVisible();
  });

  it('renders the supplied category tabs', () => {
    renderSecurityPage();

    [
      'All',
      'Security Camera Services',
      'Alarm System Services',
      'Smart Home Security',
      'Smoke & Carbon Monoxide Detectors',
      'Video Doorbells',
    ].forEach((category) => {
      expect(screen.getByRole('button', { name: category })).toBeInTheDocument();
    });
  });

  it('eases the catalogue in on navigation instead of snapping into place', () => {
    renderSecurityPage();

    expect(screen.getByRole('main')).toHaveClass('animate-page-enter');
  });

  it('wraps the category tabs onto multiple rows at every breakpoint', () => {
    renderSecurityPage();

    const tabs = screen.getByRole('group', {
      name: 'Filter security services by category',
    });

    expect(tabs).toHaveClass('flex-wrap');
    expect(tabs).not.toHaveClass('overflow-x-auto');
  });

  it('renders each category tab on a single line', () => {
    renderSecurityPage();

    expect(screen.getByRole('button', { name: 'Smoke & Carbon Monoxide Detectors' })).toHaveClass(
      'whitespace-nowrap',
    );
  });

  it('shows only services from the selected category', async () => {
    const user = userEvent.setup();
    renderSecurityPage();

    await user.click(screen.getByRole('button', { name: 'Video Doorbells' }));

    expect(
      screen.getByRole('heading', { level: 3, name: 'Ring Doorbell Installation' }),
    ).toBeVisible();
    expect(
      screen.queryByRole('heading', { level: 3, name: 'Camera Installation' }),
    ).not.toBeInTheDocument();
    expect(screen.getAllByRole('article')).toHaveLength(4);
  });

  it('filters visible services by price range', async () => {
    const user = userEvent.setup();
    renderSecurityPage();

    await user.selectOptions(screen.getByRole('combobox', { name: 'Price Range' }), '100-200');

    screen.getAllByRole('article').forEach((card) => {
      expect(within(card).getByText(/Starting at \$(1\d\d|200)/)).toBeInTheDocument();
    });
  });

  it('adds a security service to the shared Redux cart', async () => {
    const user = userEvent.setup();
    const store = renderSecurityPage();

    await user.click(screen.getByRole('button', { name: 'Add Camera Installation to cart' }));

    expect(store.getState().cart.totalItems).toBe(1);
    expect(store.getState().cart.items[0].title).toBe('Camera Installation');
  });

  it('paginates the complete Security catalogue', async () => {
    const user = userEvent.setup();
    renderSecurityPage();

    expect(screen.getAllByRole('article')).toHaveLength(20);
    await user.click(screen.getByRole('button', { name: 'Next page' }));

    expect(screen.getByRole('button', { name: 'Page 2' })).toHaveAttribute(
      'aria-current',
      'page',
    );
    expect(screen.getAllByRole('article')).toHaveLength(3);
  });
});
