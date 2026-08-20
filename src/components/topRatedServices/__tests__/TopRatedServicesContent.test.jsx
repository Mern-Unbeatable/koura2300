import React from 'react';
import { configureStore } from '@reduxjs/toolkit';
import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Provider } from 'react-redux';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { ROUTES } from '../../../config';
import cartReducer from '../../../store/slices/cartSlice';
import TopRatedServicesContent from '../TopRatedServicesContent';
import {
  TOP_RATED_PAGE_SIZE,
  TOP_RATED_SERVICES,
} from '../topRatedServicesData';

const createTestStore = () =>
  configureStore({
    reducer: {
      cart: cartReducer,
    },
  });

const renderTopRatedPage = (initialPath = ROUTES.SERVICES) => {
  const store = createTestStore();

  render(
    <Provider store={store}>
      <MemoryRouter initialEntries={[initialPath]}>
        <Routes>
          <Route path={ROUTES.SERVICES} element={<TopRatedServicesContent />} />
        </Routes>
      </MemoryRouter>
    </Provider>,
  );

  return store;
};

describe('TopRatedServicesContent', () => {
  it('renders the Figma page heading, subtitle, and View all action', () => {
    renderTopRatedPage();

    expect(screen.getByRole('heading', { name: 'Top-rated services' })).toBeInTheDocument();
    expect(
      screen.getByText('Most-booked this month, all with verified reviews'),
    ).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'View all' })).toBeInTheDocument();
  });

  it('uses the shared landing header and footer chrome', () => {
    renderTopRatedPage();

    expect(screen.getByRole('banner')).toBeInTheDocument();
    expect(screen.getByRole('contentinfo')).toBeInTheDocument();
  });

  it('shows a responsive service grid with one page of top-rated cards', () => {
    renderTopRatedPage();

    const region = screen.getByRole('region', { name: 'Top-rated services' });
    const cards = within(region).getAllByRole('article');

    expect(cards).toHaveLength(TOP_RATED_PAGE_SIZE);
    expect(region.querySelector('.grid')).toHaveClass(
      'grid',
      'gap-5',
      'sm:grid-cols-2',
      'xl:grid-cols-4',
    );
  });

  it('paginates through top-rated services and highlights the active page', async () => {
    const user = userEvent.setup();
    const store = renderTopRatedPage();
    const region = screen.getByRole('region', { name: 'Top-rated services' });

    expect(screen.getByRole('navigation', { name: 'Top-rated services pages' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Page 1' })).toHaveAttribute('aria-current', 'page');

    await user.click(screen.getByRole('button', { name: 'Page 2' }));

    expect(screen.getByRole('button', { name: 'Page 2' })).toHaveAttribute('aria-current', 'page');
    expect(within(region).getAllByRole('article')).toHaveLength(TOP_RATED_PAGE_SIZE);

    await user.click(within(region).getAllByRole('button', { name: /Add .+ to cart/ })[0]);
    expect(store.getState().cart.items[0].id).toBe(TOP_RATED_SERVICES[TOP_RATED_PAGE_SIZE].id);
  });

  it('adds a service to the cart from the top-rated grid', async () => {
    const user = userEvent.setup();
    const store = renderTopRatedPage();
    const firstService = TOP_RATED_SERVICES[0];
    const region = screen.getByRole('region', { name: 'Top-rated services' });

    await user.click(within(region).getAllByRole('button', { name: /Add .+ to cart/ })[0]);

    expect(store.getState().cart.items).toEqual([
      {
        id: firstService.id,
        title: firstService.title,
        price: firstService.price,
        quantity: 1,
      },
    ]);
  });

  it('filters visible cards through the header search', async () => {
    const user = userEvent.setup();
    renderTopRatedPage();

    await user.type(screen.getAllByRole('searchbox', { name: 'Search services' })[0], 'drain');
    await user.click(screen.getAllByRole('button', { name: 'Submit service search' })[0]);

    const region = screen.getByRole('region', { name: 'Top-rated services' });
    expect(within(region).getAllByText('Drain Cleaning').length).toBeGreaterThan(0);
    expect(within(region).queryByText('Faucet Repair & Replacement')).not.toBeInTheDocument();
  });
});
