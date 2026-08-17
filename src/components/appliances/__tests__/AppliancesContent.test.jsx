import React from 'react';
import { configureStore } from '@reduxjs/toolkit';
import { cleanup, render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import cartReducer from '../../../store/slices/cartSlice';
import AppliancesContent from '../AppliancesContent';

const createTestStore = () =>
  configureStore({
    reducer: {
      cart: cartReducer,
    },
  });

const renderAppliancesPage = () => {
  const store = createTestStore();

  render(
    <Provider store={store}>
      <MemoryRouter initialEntries={['/appliances']}>
        <AppliancesContent />
      </MemoryRouter>
    </Provider>,
  );

  return store;
};

afterEach(cleanup);

describe('Appliances page', () => {
  it('renders shared chrome, heading, transition, and active navigation', () => {
    renderAppliancesPage();

    expect(screen.getByRole('banner')).toBeInTheDocument();
    expect(
      screen.getByRole('heading', { level: 1, name: 'Professional Appliance Services' }),
    ).toBeInTheDocument();
    expect(screen.getByRole('main')).toHaveClass('animate-page-enter');
    expect(screen.getByRole('link', { name: 'Appliances' })).toHaveAttribute(
      'aria-current',
      'page',
    );
    expect(screen.getByRole('contentinfo')).toBeInTheDocument();
  });

  it('selects All by default and displays the first twenty services', () => {
    renderAppliancesPage();

    expect(screen.getByRole('button', { name: 'All' })).toHaveAttribute('aria-pressed', 'true');
    expect(screen.getAllByRole('article')).toHaveLength(20);
    expect(screen.getByRole('heading', { level: 3, name: 'Dishwasher' })).toBeVisible();
    expect(screen.getByRole('heading', { level: 3, name: 'Fixed' })).toBeVisible();
  });

  it('renders all requested category tabs', () => {
    renderAppliancesPage();

    [
      'All',
      'Kitchen Appliance Installation',
      'Laundry Appliance Installation',
      'TV Mounting',
      'Smart Home Device Installation',
      'Appliance Replacement',
    ].forEach((category) => {
      expect(screen.getByRole('button', { name: category })).toBeInTheDocument();
    });
  });

  it('shows only services from the selected category', async () => {
    const user = userEvent.setup();
    renderAppliancesPage();

    await user.click(screen.getByRole('button', { name: 'TV Mounting' }));

    expect(screen.getAllByRole('article')).toHaveLength(4);
    expect(screen.getByRole('heading', { level: 3, name: 'Cable Concealment' })).toBeVisible();
    expect(screen.queryByRole('heading', { level: 3, name: 'Dishwasher' })).not.toBeInTheDocument();
  });

  it('filters appliance services by price range', async () => {
    const user = userEvent.setup();
    renderAppliancesPage();

    await user.selectOptions(screen.getByRole('combobox', { name: 'Price Range' }), '100-200');

    screen.getAllByRole('article').forEach((card) => {
      expect(within(card).getByText(/Starting at \$(1\d\d|200)/)).toBeInTheDocument();
    });
  });

  it('adds an appliance service to the shared Redux cart', async () => {
    const user = userEvent.setup();
    const store = renderAppliancesPage();

    await user.click(screen.getByRole('button', { name: 'Add Dishwasher to cart' }));

    expect(store.getState().cart.totalItems).toBe(1);
    expect(store.getState().cart.items[0].title).toBe('Dishwasher');
  });

  it('paginates all twenty-two appliance services', async () => {
    const user = userEvent.setup();
    renderAppliancesPage();

    await user.click(screen.getByRole('button', { name: 'Next page' }));

    expect(screen.getByRole('button', { name: 'Page 2' })).toHaveAttribute(
      'aria-current',
      'page',
    );
    expect(screen.getAllByRole('article')).toHaveLength(2);
  });
});
