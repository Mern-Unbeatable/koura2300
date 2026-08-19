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

const renderServiceDetails = (serviceId, store = createTestStore(), category) => {
  render(
    <Provider store={store}>
      <MemoryRouter initialEntries={[buildServiceDetailsRoute(serviceId, category)]}>
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
    expect(screen.getByRole('banner')).toHaveClass('overflow-x-clip');
    expect(screen.getByRole('contentinfo')).toBeInTheDocument();
    expect(screen.getByRole('main')).toHaveClass('animate-page-enter');
    expect(screen.getByRole('main')).toHaveClass('min-w-0');
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
    const serviceImages = screen.getAllByRole('img', {
      name: 'Chrome lighting fixture above a white sink',
    });

    expect(serviceImages.length).toBeGreaterThanOrEqual(5);
    expect(serviceImages[0]).toHaveClass('max-w-full');
  });

  it('selects the standard package by default and can switch to premium', async () => {
    const user = userEvent.setup();
    renderServiceDetails(LIGHTING_SERVICE_ID);

    expect(screen.getByRole('radio', { name: 'Standard Price $145' })).toBeChecked();
    expect(screen.getByRole('radio', { name: 'Premium Price $200' })).not.toBeChecked();
    expect(screen.getByRole('radio', { name: 'Standard Price $145' })).toHaveClass('min-h-[310px]');
    expect(screen.getByRole('radio', { name: 'Premium Price $200' })).toHaveClass('min-h-[310px]');
    expect(screen.getByRole('radio', { name: 'Standard Price $145' })).toHaveClass(
      'border-brand-orange/40',
    );
    expect(screen.getByRole('radio', { name: 'Premium Price $200' })).toHaveClass(
      'border-transparent',
    );

    await user.click(screen.getByRole('radio', { name: 'Premium Price $200' }));

    expect(screen.getByRole('radio', { name: 'Premium Price $200' })).toBeChecked();
    expect(screen.getByRole('radio', { name: 'Premium Price $200' })).toHaveClass(
      'border-brand-orange/40',
    );
  });

  it('uses double-check icons on every package feature', () => {
    renderServiceDetails(LIGHTING_SERVICE_ID);

    const standardCard = screen.getByRole('radio', { name: 'Standard Price $145' });
    const premiumCard = screen.getByRole('radio', { name: 'Premium Price $200' });

    expect(standardCard.querySelectorAll('svg.lucide-check-check')).toHaveLength(5);
    expect(premiumCard.querySelectorAll('svg.lucide-check-check')).toHaveLength(6);
  });

  it('lists what is included and what is not included', () => {
    renderServiceDetails(LIGHTING_SERVICE_ID);

    const includedSection = screen.getByRole('heading', { name: "What's Included" }).closest(
      'section',
    );

    expect(includedSection).toHaveClass('h-full');
    expect(screen.getByText('New ceiling light fixture (customer choice from catalog)')).toBeInTheDocument();
    expect(screen.getByText('Professional installation by certified electrician')).toBeInTheDocument();
    expect(screen.getByText('Wiring inspection and connector verification')).toBeInTheDocument();
    expect(screen.getByText('Cleanup of work area and debris removal')).toBeInTheDocument();
    expect(screen.getByText('30-day workmanship warranty')).toBeInTheDocument();
    expect(includedSection.querySelectorAll('svg.lucide-check')).toHaveLength(5);
    expect(includedSection.querySelector('span')).toHaveClass('rounded-full');
    expect(includedSection.querySelector('span')).toHaveClass('bg-brand-orange-light');

    const excludedSection = screen.getByRole('heading', { name: 'Not Included' }).closest(
      'section',
    );

    expect(excludedSection).toHaveClass('h-full');
    expect(screen.getByText('Materials for recessed can retrofits')).toBeInTheDocument();
    expect(screen.getByText('Wall / ceiling drywall repair (if needed)')).toBeInTheDocument();
    expect(screen.getByText('Electrical panel upgrades')).toBeInTheDocument();
    expect(screen.getByText('Custom fixture orders beyond standard catalog')).toBeInTheDocument();
    expect(screen.getByText('Permit fees (if required by municipality)')).toBeInTheDocument();
    expect(excludedSection.querySelectorAll('svg.lucide-circle-alert')).toHaveLength(5);
    expect(excludedSection.querySelector('svg.lucide-circle-alert')).toHaveClass('text-red-500');
  });

  it('toggles materials and recycle options before confirming the job', async () => {
    const user = userEvent.setup();
    renderServiceDetails(LIGHTING_SERVICE_ID);

    expect(screen.getByRole('button', { name: 'I Need Materials' })).toHaveAttribute(
      'aria-pressed',
      'true',
    );
    expect(screen.getByRole('button', { name: 'I Need Materials' })).toHaveClass('w-full');
    expect(screen.getByRole('button', { name: 'I Have Materials' })).toHaveClass('w-full');
    expect(screen.getByRole('button', { name: 'I Need Materials' })).toHaveClass('text-xs');
    expect(screen.getByRole('button', { name: 'I Need Materials' })).toHaveClass(
      'hover:bg-brand-orange-dark',
    );
    expect(screen.getByRole('button', { name: 'I Have Materials' })).toHaveClass(
      'hover:bg-gray-200',
    );
    expect(screen.getByRole('checkbox', { name: 'Recycle old materials' })).toHaveClass(
      'hover:border-brand-orange',
    );
    expect(screen.getByRole('button', { name: 'Confirmed Job' })).toHaveClass(
      'rounded-2xl',
      'hover:bg-brand-orange-dark',
    );

    await user.click(screen.getByRole('button', { name: 'I Have Materials' }));

    expect(screen.getByRole('button', { name: 'I Have Materials' })).toHaveAttribute(
      'aria-pressed',
      'true',
    );

    await user.click(screen.getByRole('checkbox', { name: 'Recycle old materials' }));

    expect(screen.getByRole('checkbox', { name: 'Recycle old materials' })).toBeChecked();
  });

  it('opens the zip form below Confirmed Job and shows an inline zip error', async () => {
    const user = userEvent.setup();
    renderServiceDetails(LIGHTING_SERVICE_ID);

    await user.click(screen.getByRole('button', { name: 'Confirmed Job' }));

    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Confirmed Job' })).toHaveAttribute(
      'aria-expanded',
      'true',
    );
    const zipPanel = screen.getByRole('region', { name: 'Choose your location' });
    const heroImage = screen.getAllByRole('img', {
      name: 'Chrome lighting fixture above a white sink',
    })[0];

    expect(zipPanel).toBeInTheDocument();
    expect(zipPanel.parentElement).toHaveClass('lg:col-start-2');
    expect(heroImage).toHaveClass('lg:flex-1');
    expect(heroImage.compareDocumentPosition(zipPanel) & Node.DOCUMENT_POSITION_FOLLOWING).toBe(
      Node.DOCUMENT_POSITION_FOLLOWING,
    );

    await user.click(screen.getByRole('button', { name: 'Apply' }));

    expect(screen.getByRole('alert')).toHaveTextContent('Enter a valid US zip code.');
    expect(toast.success).not.toHaveBeenCalled();
    expect(
      screen.queryByRole('region', { name: 'Preferred Contact Method' }),
    ).not.toBeInTheDocument();
  });

  it('shows preferred contact method below the booking row after a valid zip is applied', async () => {
    const user = userEvent.setup();
    const store = renderServiceDetails(LIGHTING_SERVICE_ID);

    expect(
      screen.queryByRole('region', { name: 'Preferred Contact Method' }),
    ).not.toBeInTheDocument();

    await user.click(screen.getByRole('button', { name: 'Confirmed Job' }));
    await user.type(screen.getByLabelText('US zip code'), '94107');
    await user.click(screen.getByRole('button', { name: 'Apply' }));

    expect(store.getState().cart.totalItems).toBe(1);
    expect(store.getState().cart.items[0]).toMatchObject({
      title: 'Ceiling Light Installation',
      price: 145,
    });
    expect(toast.success).toHaveBeenCalled();
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
    expect(screen.queryByRole('region', { name: 'Choose your location' })).not.toBeInTheDocument();

    const contactRegion = screen.getByRole('region', { name: 'Preferred Contact Method' });
    const includedHeading = screen.getByRole('heading', { name: "What's Included" });
    const chatOption = screen.getByRole('radio', { name: 'Chat' });

    expect(contactRegion).toHaveTextContent(
      'How should your pro reach you for updates and confirmation?',
    );
    expect(contactRegion).not.toHaveClass('lg:col-start-2');
    expect(
      contactRegion.compareDocumentPosition(includedHeading) & Node.DOCUMENT_POSITION_FOLLOWING,
    ).toBe(Node.DOCUMENT_POSITION_FOLLOWING);
    expect(screen.getByRole('radio', { name: 'Phone / SMS' })).toHaveClass('cursor-pointer');
    expect(screen.getByRole('radio', { name: 'Email' })).toHaveClass('cursor-pointer');
    expect(chatOption).toHaveClass('cursor-pointer');
    expect(chatOption).toHaveAttribute('aria-checked', 'true');

    await user.click(screen.getByRole('radio', { name: 'Phone / SMS' }));

    expect(screen.getByRole('radio', { name: 'Phone / SMS' })).toHaveAttribute(
      'aria-checked',
      'true',
    );
    expect(chatOption).toHaveAttribute('aria-checked', 'false');
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
    ).toHaveAttribute(
      'href',
      buildServiceDetailsRoute('indoor-lighting-chandelier-installation'),
    );
    expect(within(relatedRegion).getByRole('link', { name: 'Porch Lights' })).toBeInTheDocument();
    expect(within(relatedRegion).getAllByRole('article')).toHaveLength(20);
    expect(
      within(relatedRegion).getByRole('navigation', { name: 'Promotional services pages' }),
    ).toBeInTheDocument();
    expect(within(relatedRegion).getAllByRole('article')[0]).toHaveClass('rounded-2xl');
    expect(within(relatedRegion).getAllByRole('article')[0].parentElement).toHaveClass(
      'xl:grid-cols-4',
    );

    await user.click(
      within(relatedRegion).getByRole('button', { name: 'Add Chandelier Installation to cart' }),
    );

    expect(store.getState().cart.totalItems).toBe(1);
    expect(store.getState().cart.items[0].title).toBe('Chandelier Installation');
  });

  it('shows only the remaining cards from the selected category tab', () => {
    renderServiceDetails(
      'light-fixture-services-fixture-installation',
      createTestStore(),
      'Light Fixture Services',
    );
    const relatedRegion = screen.getByRole('region', { name: 'Promotional Feature' });

    expect(within(relatedRegion).getByRole('link', { name: 'Fixture Replacement' })).toHaveAttribute(
      'href',
      buildServiceDetailsRoute(
        'light-fixture-services-fixture-replacement',
        'Light Fixture Services',
      ),
    );
    expect(within(relatedRegion).getByRole('link', { name: 'Fixture Relocation' })).toBeInTheDocument();
    expect(within(relatedRegion).getByRole('link', { name: 'Fixture Repair' })).toBeInTheDocument();
    expect(
      within(relatedRegion).getByRole('link', { name: 'Ceiling Fan with Light Installation' }),
    ).toBeInTheDocument();
    expect(
      within(relatedRegion).queryByRole('link', { name: 'Fixture Installation' }),
    ).not.toBeInTheDocument();
    expect(
      within(relatedRegion).queryByRole('link', { name: 'Ceiling Light Installation' }),
    ).not.toBeInTheDocument();
    expect(within(relatedRegion).getAllByRole('article')).toHaveLength(4);
    expect(
      within(relatedRegion).queryByRole('navigation', { name: 'Promotional services pages' }),
    ).not.toBeInTheDocument();
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
    expect(
      screen.queryByText('New ceiling light fixture (customer choice from catalog)'),
    ).not.toBeInTheDocument();
    expect(screen.getByText('Qualified technician for the booked service')).toBeInTheDocument();
    expect(screen.getByText('Cost of materials, fixtures, or replacement parts')).toBeInTheDocument();
    expect(screen.queryByText('Materials for recessed can retrofits')).not.toBeInTheDocument();
  });

  it('renders a not-found state for an unknown service id', () => {
    renderServiceDetails('missing-service');

    expect(screen.getByRole('heading', { name: 'Service not found' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Back to home' })).toHaveAttribute('href', ROUTES.HOME);
  });
});

describe('service details routes', () => {
  it('builds a stable details path for catalog cards', () => {
    expect(LIGHTING_DETAILS_PATH).toBe(`/service/${LIGHTING_SERVICE_ID}?category=All`);
    expect(FENCE_DETAILS_PATH).toBe(`/service/${FENCE_SERVICE_ID}?category=All`);
  });
});
