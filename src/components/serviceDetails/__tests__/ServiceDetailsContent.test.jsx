import React from 'react';
import { configureStore } from '@reduxjs/toolkit';
import { cleanup, render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Provider } from 'react-redux';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import toast from 'react-hot-toast';
import { ROUTES, buildServiceDetailsRoute } from '../../../config';
import cartReducer from '../../../store/slices/cartSlice';
import { CATALOG_COLLECTIONS, getCatalogServiceById } from '../../catalog/catalogRegistry';
import ServiceDetailsContent from '../ServiceDetailsContent';

jest.mock('react-hot-toast', () => ({
  __esModule: true,
  default: {
    success: jest.fn(),
    error: jest.fn(),
  },
}));

const LIGHTING_SERVICE_ID = 'indoor-lighting-ceiling-light-installation';
const FENCE_SERVICE_ID = 'fence-installation-wood-fence';
const LIGHTING_DETAILS_PATH = buildServiceDetailsRoute(LIGHTING_SERVICE_ID);
const FENCE_DETAILS_PATH = buildServiceDetailsRoute(FENCE_SERVICE_ID);

const createTestStore = () =>
  configureStore({
    reducer: {
      cart: cartReducer,
    },
  });

const renderServiceDetails = (serviceId, store = createTestStore()) => {
  render(
    <Provider store={store}>
      <MemoryRouter initialEntries={[buildServiceDetailsRoute(serviceId)]}>
        <Routes>
          <Route path={ROUTES.SERVICE_DETAILS} element={<ServiceDetailsContent />} />
        </Routes>
      </MemoryRouter>
    </Provider>,
  );

  return store;
};

afterEach(() => {
  cleanup();
  toast.success.mockClear();
});

describe('catalog registry', () => {
  it('attaches catalog metadata so every category card can open details', () => {
    expect(CATALOG_COLLECTIONS).toHaveLength(15);

    CATALOG_COLLECTIONS.forEach((collection) => {
      expect(collection.services.length).toBeGreaterThan(0);

      const service = getCatalogServiceById(collection.services[0].id);

      expect(service.catalogTitle).toBe(collection.title);
      expect(service.catalogPath).toBe(collection.path);
    });
  });
});

describe('Service details page', () => {
  it('renders shared chrome, breadcrumb, and the selected lighting service', () => {
    renderServiceDetails(LIGHTING_SERVICE_ID);

    expect(screen.getByRole('banner')).toBeInTheDocument();
    expect(screen.getByRole('contentinfo')).toBeInTheDocument();
    expect(screen.getByRole('main')).toHaveClass('animate-page-enter');
    expect(
      screen.getByRole('heading', { level: 1, name: 'Ceiling Light Installation' }),
    ).toBeInTheDocument();
    const breadcrumb = screen.getByRole('navigation', { name: 'Breadcrumb' });

    expect(within(breadcrumb).getByRole('link', { name: 'Home' })).toHaveAttribute(
      'href',
      ROUTES.HOME,
    );
    expect(within(breadcrumb).getByRole('link', { name: 'Lighting' })).toHaveAttribute(
      'href',
      ROUTES.LIGHTING,
    );
  });

  it('keeps the parent catalog link current in the category navigation', () => {
    renderServiceDetails(LIGHTING_SERVICE_ID);

    const categoryNav = screen.getByRole('navigation', { name: 'Service categories' });

    expect(within(categoryNav).getByRole('link', { name: 'Lighting' })).toHaveAttribute(
      'aria-current',
      'page',
    );
    expect(within(categoryNav).getByRole('link', { name: 'Kitchen' })).not.toHaveAttribute(
      'aria-current',
    );
  });

  it('renders the professional overview, duration, rating, and gallery', () => {
    renderServiceDetails(LIGHTING_SERVICE_ID);

    expect(
      screen.getByText(/Our professional Ceiling Light Installation service ensures/i),
    ).toBeInTheDocument();
    expect(screen.getAllByText('1–2 hrs').length).toBeGreaterThan(0);
    expect(screen.getAllByText('4.9 (312)').length).toBeGreaterThan(0);
    expect(
      screen.getAllByRole('img', { name: 'Chrome lighting fixture above a white sink' }),
    ).toHaveLength(5);
  });

  it('selects the standard package by default and can switch to premium', async () => {
    const user = userEvent.setup();
    renderServiceDetails(LIGHTING_SERVICE_ID);

    expect(screen.getByRole('radio', { name: 'Standard Price $145' })).toBeChecked();
    expect(screen.getByRole('radio', { name: 'Premium Price $200' })).not.toBeChecked();

    await user.click(screen.getByRole('radio', { name: 'Premium Price $200' }));

    expect(screen.getByRole('radio', { name: 'Premium Price $200' })).toBeChecked();
  });

  it('lists what is included and what is not included', () => {
    renderServiceDetails(LIGHTING_SERVICE_ID);

    expect(screen.getByRole('heading', { name: "What's Included" })).toBeInTheDocument();
    expect(screen.getByText('Qualified technician for the booked service')).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Not Included' })).toBeInTheDocument();
    expect(
      screen.getByText('Cost of materials, fixtures, or replacement parts'),
    ).toBeInTheDocument();
  });

  it('toggles materials and recycle options before confirming the job', async () => {
    const user = userEvent.setup();
    renderServiceDetails(LIGHTING_SERVICE_ID);

    expect(screen.getByRole('button', { name: 'I Need Materials' })).toHaveAttribute(
      'aria-pressed',
      'true',
    );

    await user.click(screen.getByRole('button', { name: 'I Have Materials' }));

    expect(screen.getByRole('button', { name: 'I Have Materials' })).toHaveAttribute(
      'aria-pressed',
      'true',
    );

    await user.click(screen.getByRole('checkbox', { name: 'Recycle old materials' }));

    expect(screen.getByRole('checkbox', { name: 'Recycle old materials' })).toBeChecked();
  });

  it('opens the zip modal from Confirmed Job and shows an inline zip error', async () => {
    const user = userEvent.setup();
    renderServiceDetails(LIGHTING_SERVICE_ID);

    await user.click(screen.getByRole('button', { name: 'Confirmed Job' }));

    expect(
      screen.getByRole('dialog', { name: 'Where should we send the pro?' }),
    ).toBeInTheDocument();

    await user.click(screen.getByRole('button', { name: 'Continue' }));

    expect(screen.getByRole('alert')).toHaveTextContent('Enter a valid US zip code.');
    expect(toast.success).not.toHaveBeenCalled();
  });

  it('adds the selected package to the cart after a valid zip is submitted', async () => {
    const user = userEvent.setup();
    const store = renderServiceDetails(LIGHTING_SERVICE_ID);

    await user.click(screen.getByRole('button', { name: 'Confirmed Job' }));
    await user.type(screen.getByLabelText('US zip code'), '94107');
    await user.click(screen.getByRole('button', { name: 'Continue' }));

    expect(store.getState().cart.totalItems).toBe(1);
    expect(store.getState().cart.items[0]).toMatchObject({
      title: 'Ceiling Light Installation',
      price: 145,
    });
    expect(toast.success).toHaveBeenCalled();
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });

  it('shows related services from the same catalog and lets them be added', async () => {
    const user = userEvent.setup();
    const store = renderServiceDetails(LIGHTING_SERVICE_ID);
    const relatedRegion = screen.getByRole('region', { name: 'Promotional Feature' });

    expect(
      within(relatedRegion).queryByRole('link', { name: 'Ceiling Light Installation' }),
    ).not.toBeInTheDocument();
    expect(
      within(relatedRegion).getByRole('link', { name: 'Chandelier Installation' }),
    ).toHaveAttribute('href', buildServiceDetailsRoute('indoor-lighting-chandelier-installation'));

    await user.click(
      within(relatedRegion).getByRole('button', { name: 'Add Chandelier Installation to cart' }),
    );

    expect(store.getState().cart.totalItems).toBe(1);
    expect(store.getState().cart.items[0].title).toBe('Chandelier Installation');
  });

  it('renders a fence card details page from another catalog', () => {
    renderServiceDetails(FENCE_SERVICE_ID);

    expect(screen.getByRole('heading', { level: 1, name: 'Wood Fence' })).toBeInTheDocument();
    expect(
      within(screen.getByRole('navigation', { name: 'Breadcrumb' })).getByRole('link', {
        name: 'Fence',
      }),
    ).toHaveAttribute('href', ROUTES.FENCE);
    expect(screen.getByRole('radio', { name: 'Standard Price $145' })).toBeChecked();
  });

  it('renders a not-found state for an unknown service id', () => {
    renderServiceDetails('missing-service');

    expect(screen.getByRole('heading', { name: 'Service not found' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Back to home' })).toHaveAttribute('href', ROUTES.HOME);
  });
});

describe('service details routes', () => {
  it('builds a stable details path for catalog cards', () => {
    expect(LIGHTING_DETAILS_PATH).toBe(`/service/${LIGHTING_SERVICE_ID}`);
    expect(FENCE_DETAILS_PATH).toBe(`/service/${FENCE_SERVICE_ID}`);
  });
});
