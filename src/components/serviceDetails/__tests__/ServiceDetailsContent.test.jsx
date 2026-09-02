import React from 'react';
import { configureStore } from '@reduxjs/toolkit';
import { cleanup, render, screen, waitFor, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Provider } from 'react-redux';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import toast from 'react-hot-toast';
import { ROUTES, buildServiceDetailsRoute } from '../../../config';
import authReducer from '../../../store/slices/authSlice';
import cartReducer from '../../../store/slices/cartSlice';
import CheckoutView from '../../checkout/CheckoutView';
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
const FLOORING_SERVICE_ID = 'hardwood-flooring-installation';
const COUNTERTOP_SERVICE_ID = 'countertop-services-installation';
const BACKSPLASH_SERVICE_ID = 'backsplash-tile-services-installation';
const BATHROOM_TILE_SERVICE_ID = 'tile-grout-services-wall-tile';
const PAINTING_SERVICE_ID = 'painting-interior';
const DRYWALL_SERVICE_ID = 'drywall-services-installation';
const INSULATION_SERVICE_ID = 'insulation-wall';
const LIGHTING_DETAILS_PATH = buildServiceDetailsRoute(LIGHTING_SERVICE_ID);
const FENCE_DETAILS_PATH = buildServiceDetailsRoute(FENCE_SERVICE_ID);

const reachContactMethodStep = async (user) => {
  await user.click(screen.getByRole('button', { name: 'Confirmed Material' }));
  await waitFor(() => {
    expect(screen.getByRole('button', { name: 'Apply' })).toBeInTheDocument();
  });
  await user.click(screen.getByRole('button', { name: 'Apply' }));
  await waitFor(() => {
    expect(screen.getByRole('region', { name: 'Preferred Contact Method' })).toBeInTheDocument();
  });
};

const openServiceChat = async (user) => {
  await reachContactMethodStep(user);
  await user.click(screen.getByRole('radio', { name: 'Chat' }));
  await waitFor(() => {
    expect(screen.getByRole('region', { name: 'Service pro chat' })).toBeInTheDocument();
  });
};

const openSignUpMethods = async (user, contactMethod = 'Phone / SMS') => {
  await reachContactMethodStep(user);
  await user.click(screen.getByRole('radio', { name: contactMethod }));
  await waitFor(() => {
    expect(screen.getByRole('region', { name: 'Sign-up methods' })).toBeInTheDocument();
  });
};

const openCreateAccountForm = async (user, contactMethod = 'Phone / SMS') => {
  await openSignUpMethods(user, contactMethod);
  await user.click(screen.getByRole('button', { name: 'Manual Sign-Up' }));
  await waitFor(() => {
    expect(screen.getByRole('region', { name: 'Create your account' })).toBeInTheDocument();
  });
};

const UNAUTHENTICATED_AUTH = {
  user: null,
  isAuthenticated: false,
  token: null,
  loading: false,
};

const createTestStore = (preloadedState = {}) =>
  configureStore({
    reducer: {
      cart: cartReducer,
      auth: authReducer,
    },
    preloadedState: {
      auth: UNAUTHENTICATED_AUTH,
      ...preloadedState,
    },
  });

const renderServiceDetails = (serviceId, store = createTestStore(), category) => {
  render(
    <Provider store={store}>
      <MemoryRouter initialEntries={[buildServiceDetailsRoute(serviceId, category)]}>
        <Routes>
          <Route path={ROUTES.SERVICE_DETAILS} element={<ServiceDetailsContent />} />
          <Route path={ROUTES.CHECKOUT} element={<CheckoutView />} />
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
    expect(screen.queryByTestId('flooring-calculator')).not.toBeInTheDocument();
  });

  it('renders the Flooring Calculator on every Flooring service details page', () => {
    renderServiceDetails(FLOORING_SERVICE_ID);

    expect(screen.getByRole('heading', { level: 1, name: 'Installation' })).toBeInTheDocument();
    expect(screen.getByTestId('flooring-calculator')).toBeInTheDocument();
    expect(
      screen.getByRole('heading', { level: 2, name: 'Flooring Calculator' }),
    ).toBeInTheDocument();
    expect(screen.queryByTestId('countertop-calculator')).not.toBeInTheDocument();
  });

  it('renders the Countertop Calculator on Kitchen Countertop Services details pages', () => {
    renderServiceDetails(COUNTERTOP_SERVICE_ID);

    expect(screen.getByRole('heading', { level: 1, name: 'Installation' })).toBeInTheDocument();
    expect(screen.getByTestId('countertop-calculator')).toBeInTheDocument();
    expect(
      screen.getByRole('heading', { level: 2, name: 'Countertop Calculator' }),
    ).toBeInTheDocument();
    expect(screen.queryByTestId('flooring-calculator')).not.toBeInTheDocument();
    expect(screen.queryByTestId('backsplash-calculator')).not.toBeInTheDocument();
  });

  it('renders the Backsplash Calculator on Kitchen Backsplash & Tile Services details pages', () => {
    renderServiceDetails(BACKSPLASH_SERVICE_ID);

    expect(screen.getByRole('heading', { level: 1, name: 'Installation' })).toBeInTheDocument();
    expect(screen.getByTestId('backsplash-calculator')).toBeInTheDocument();
    expect(
      screen.getByRole('heading', { level: 2, name: 'Backsplash & Tile Calculator' }),
    ).toBeInTheDocument();
    expect(screen.queryByTestId('flooring-calculator')).not.toBeInTheDocument();
    expect(screen.queryByTestId('countertop-calculator')).not.toBeInTheDocument();
    expect(screen.queryByTestId('bathroom-tile-calculator')).not.toBeInTheDocument();
  });

  it('renders the Bathroom Tile Calculator on Bathroom Tile & Grout Services details pages', () => {
    renderServiceDetails(BATHROOM_TILE_SERVICE_ID);

    expect(screen.getByRole('heading', { level: 1, name: 'Wall Tile' })).toBeInTheDocument();
    expect(screen.getByTestId('bathroom-tile-calculator')).toBeInTheDocument();
    expect(
      screen.getByRole('heading', { level: 2, name: 'Bathroom Tile & Grout Calculator' }),
    ).toBeInTheDocument();
    expect(screen.queryByTestId('flooring-calculator')).not.toBeInTheDocument();
    expect(screen.queryByTestId('countertop-calculator')).not.toBeInTheDocument();
    expect(screen.queryByTestId('backsplash-calculator')).not.toBeInTheDocument();
    expect(screen.queryByTestId('painting-calculator')).not.toBeInTheDocument();
  });

  it('renders the Painting Calculator on Walls & Ceilings Painting details pages', () => {
    renderServiceDetails(PAINTING_SERVICE_ID);

    expect(screen.getByRole('heading', { level: 1, name: 'Interior' })).toBeInTheDocument();
    expect(screen.getByTestId('painting-calculator')).toBeInTheDocument();
    expect(
      screen.getByRole('heading', { level: 2, name: 'Painting calculator' }),
    ).toBeInTheDocument();
    expect(screen.queryByTestId('flooring-calculator')).not.toBeInTheDocument();
    expect(screen.queryByTestId('bathroom-tile-calculator')).not.toBeInTheDocument();
    expect(screen.queryByTestId('drywall-calculator')).not.toBeInTheDocument();
  });

  it('renders the Drywall Calculator on Walls & Ceilings Drywall Services details pages', () => {
    renderServiceDetails(DRYWALL_SERVICE_ID);

    expect(screen.getByRole('heading', { level: 1, name: 'Installation' })).toBeInTheDocument();
    expect(screen.getByTestId('drywall-calculator')).toBeInTheDocument();
    expect(
      screen.getByRole('heading', { level: 2, name: 'Drywall Calculator' }),
    ).toBeInTheDocument();
    expect(screen.queryByTestId('painting-calculator')).not.toBeInTheDocument();
    expect(screen.queryByTestId('flooring-calculator')).not.toBeInTheDocument();
    expect(screen.queryByTestId('insulation-calculator')).not.toBeInTheDocument();
  });

  it('renders the Insulation Calculator on Walls & Ceilings Insulation details pages', () => {
    renderServiceDetails(INSULATION_SERVICE_ID);

    expect(screen.getByRole('heading', { level: 1, name: 'Wall' })).toBeInTheDocument();
    expect(screen.getByTestId('insulation-calculator')).toBeInTheDocument();
    expect(
      screen.getByRole('heading', { level: 2, name: 'Insulation Calculator' }),
    ).toBeInTheDocument();
    expect(screen.queryByTestId('drywall-calculator')).not.toBeInTheDocument();
    expect(screen.queryByTestId('painting-calculator')).not.toBeInTheDocument();
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
    expect(screen.getByRole('button', { name: 'Confirmed Material' })).toHaveClass(
      'rounded-2xl',
      'hover:bg-brand-orange-dark',
    );

    await user.click(screen.getByRole('button', { name: 'I Have Materials' }));

    expect(screen.getByRole('button', { name: 'I Have Materials' })).toHaveAttribute(
      'aria-pressed',
      'true',
    );
    expect(screen.getByRole('button', { name: 'Confirmed Job' })).toBeInTheDocument();
    expect(screen.queryByRole('button', { name: 'Confirmed Material' })).not.toBeInTheDocument();

    await user.click(screen.getByRole('checkbox', { name: 'Recycle old materials' }));

    expect(screen.getByRole('checkbox', { name: 'Recycle old materials' })).toBeChecked();
  });

  it('opens Create Account when a guest confirms with I Have Materials', async () => {
    const user = userEvent.setup();
    renderServiceDetails(LIGHTING_SERVICE_ID);

    await user.click(screen.getByRole('button', { name: 'I Have Materials' }));
    await user.click(screen.getByRole('button', { name: 'Confirmed Job' }));

    expect(screen.queryByRole('region', { name: 'Choose your location' })).not.toBeInTheDocument();
    await waitFor(() => {
      expect(screen.getByRole('region', { name: 'Create your account' })).toBeInTheDocument();
    });
  });

  it('redirects a logged-in user to checkout when they confirm with I Have Materials', async () => {
    const user = userEvent.setup();
    const store = createTestStore({
      auth: {
        user: { email: 'jane@example.com', name: 'Jane' },
        isAuthenticated: true,
        token: 'test-token',
        loading: false,
      },
    });
    renderServiceDetails(LIGHTING_SERVICE_ID, store);

    await user.click(screen.getByRole('button', { name: 'I Have Materials' }));
    await user.click(screen.getByRole('button', { name: 'Confirmed Job' }));

    await waitFor(() => {
      expect(screen.getByRole('heading', { name: 'Personal Information' })).toBeInTheDocument();
    });
    expect(screen.getByRole('heading', { name: 'Review Your Order' })).toBeInTheDocument();
    expect(screen.queryByRole('region', { name: 'Create your account' })).not.toBeInTheDocument();
    expect(screen.queryByText(/Assembly/)).not.toBeInTheDocument();
  });

  it('checks out the confirmed job instead of leftover cart quantity', async () => {
    const user = userEvent.setup();
    const store = createTestStore({
      auth: {
        user: { email: 'jane@example.com', name: 'Jane' },
        isAuthenticated: true,
        token: 'test-token',
        loading: false,
      },
      cart: {
        items: [
          {
            id: 'indoor-lighting-ceiling-light-installation-standard',
            title: 'Ceiling Light Installation',
            price: 145,
            quantity: 4,
          },
        ],
        totalItems: 4,
        totalPrice: 580,
      },
    });
    renderServiceDetails(LIGHTING_SERVICE_ID, store);

    await user.click(screen.getByRole('button', { name: 'I Have Materials' }));
    await user.click(screen.getByRole('button', { name: 'Confirmed Job' }));

    await waitFor(() => {
      expect(screen.getByRole('heading', { name: 'Personal Information' })).toBeInTheDocument();
    });

    expect(store.getState().cart.totalItems).toBe(1);
    expect(store.getState().cart.items[0].quantity).toBe(1);
    expect(screen.getByText('Ceiling Light Installation')).toBeInTheDocument();
    expect(screen.queryByText(/Assembly/)).not.toBeInTheDocument();
  });

  it('opens the zip form below the confirm button and applies without a zip condition', async () => {
    const user = userEvent.setup();
    renderServiceDetails(LIGHTING_SERVICE_ID);

    await user.click(screen.getByRole('button', { name: 'Confirmed Material' }));

    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Confirmed Material' })).toHaveAttribute(
      'aria-expanded',
      'true',
    );
    const zipPanel = await screen.findByRole('region', { name: 'Choose your location' });
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

    expect(screen.queryByRole('alert')).not.toBeInTheDocument();
    expect(screen.queryByRole('region', { name: 'Choose your location' })).not.toBeInTheDocument();
    expect(screen.getByRole('region', { name: 'Preferred Contact Method' })).toBeInTheDocument();
  });

  it('shows preferred contact method below the booking row after Apply', async () => {
    const user = userEvent.setup();
    const store = renderServiceDetails(LIGHTING_SERVICE_ID);

    expect(
      screen.queryByRole('region', { name: 'Preferred Contact Method' }),
    ).not.toBeInTheDocument();

    await user.click(screen.getByRole('button', { name: 'Confirmed Material' }));
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

    const contactRegion = await screen.findByRole('region', { name: 'Preferred Contact Method' });
    const includedHeading = screen.getByRole('heading', { name: "What's Included" });
    const chatOption = screen.getByRole('radio', { name: 'Chat' });

    expect(contactRegion).toHaveTextContent(
      'How should your pro reach you for updates and confirmation?',
    );
    expect(contactRegion).not.toHaveClass('lg:col-start-2');
    expect(
      contactRegion.compareDocumentPosition(includedHeading) & Node.DOCUMENT_POSITION_FOLLOWING,
    ).toBe(Node.DOCUMENT_POSITION_FOLLOWING);
    expect(screen.getByRole('radio', { name: 'Phone / SMS' })).toHaveClass(
      'cursor-pointer',
      'hover:border-brand-orange/40',
      'hover:bg-brand-orange-light/40',
    );
    expect(screen.getByRole('radio', { name: 'Email' })).toHaveClass(
      'cursor-pointer',
      'hover:border-brand-orange/40',
      'hover:bg-brand-orange-light/40',
    );
    expect(chatOption).toHaveClass(
      'cursor-pointer',
      'hover:border-brand-orange/40',
      'hover:bg-brand-orange-light/40',
    );
    expect(screen.getByRole('radio', { name: 'Phone / SMS' })).toHaveAttribute(
      'aria-checked',
      'false',
    );
    expect(screen.getByRole('radio', { name: 'Email' })).toHaveAttribute('aria-checked', 'false');
    expect(chatOption).toHaveAttribute('aria-checked', 'false');

    await user.click(chatOption);

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
      within(relatedRegion).queryByRole('link', { name: 'View Ceiling Light Installation' }),
    ).not.toBeInTheDocument();
    expect(
      within(relatedRegion).getByRole('link', { name: 'View Chandelier Installation' }),
    ).toHaveAttribute(
      'href',
      buildServiceDetailsRoute('indoor-lighting-chandelier-installation'),
    );
    expect(within(relatedRegion).getByRole('link', { name: 'View Porch Lights' })).toBeInTheDocument();
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

    expect(within(relatedRegion).getByRole('link', { name: 'View Fixture Replacement' })).toHaveAttribute(
      'href',
      buildServiceDetailsRoute(
        'light-fixture-services-fixture-replacement',
        'Light Fixture Services',
      ),
    );
    expect(within(relatedRegion).getByRole('link', { name: 'View Fixture Relocation' })).toBeInTheDocument();
    expect(within(relatedRegion).getByRole('link', { name: 'View Fixture Repair' })).toBeInTheDocument();
    expect(
      within(relatedRegion).getByRole('link', { name: 'View Ceiling Fan with Light Installation' }),
    ).toBeInTheDocument();
    expect(
      within(relatedRegion).queryByRole('link', { name: 'View Fixture Installation' }),
    ).not.toBeInTheDocument();
    expect(
      within(relatedRegion).queryByRole('link', { name: 'View Ceiling Light Installation' }),
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

describe('Service details chat', () => {
  it('keeps chat hidden until the user selects Chat after Apply', async () => {
    const user = userEvent.setup();
    renderServiceDetails(LIGHTING_SERVICE_ID);

    expect(screen.queryByRole('region', { name: 'Service pro chat' })).not.toBeInTheDocument();

    await reachContactMethodStep(user);

    expect(screen.queryByRole('region', { name: 'Service pro chat' })).not.toBeInTheDocument();
  });

  it('opens the chat panel below Preferred Contact Method when Chat is selected', async () => {
    const user = userEvent.setup();
    renderServiceDetails(LIGHTING_SERVICE_ID);

    await openServiceChat(user);

    const contactRegion = screen.getByRole('region', { name: 'Preferred Contact Method' });
    const chatRegion = screen.getByRole('region', { name: 'Service pro chat' });
    const includedHeading = screen.getByRole('heading', { name: "What's Included" });

    expect(screen.getByRole('heading', { level: 2, name: 'Ope' })).toBeInTheDocument();
    expect(chatRegion).toHaveTextContent('Active');
    expect(chatRegion).toHaveTextContent('Yo mandem');
    expect(chatRegion).toHaveTextContent('Kwasia 😂😂');
    expect(screen.getByRole('heading', { level: 3, name: 'Offer Card' })).toBeInTheDocument();
    expect(screen.getByText('Pending Response')).toBeInTheDocument();
    expect(screen.getByText('Booking ID')).toBeInTheDocument();
    expect(screen.getByText('BK-001')).toBeInTheDocument();
    expect(screen.getByText('$185')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Pay Now' })).toBeInTheDocument();
    expect(screen.getByLabelText('Type a message')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Send message' })).toBeDisabled();
    expect(
      contactRegion.compareDocumentPosition(chatRegion) & Node.DOCUMENT_POSITION_FOLLOWING,
    ).toBe(Node.DOCUMENT_POSITION_FOLLOWING);
    expect(
      chatRegion.compareDocumentPosition(includedHeading) & Node.DOCUMENT_POSITION_FOLLOWING,
    ).toBe(Node.DOCUMENT_POSITION_FOLLOWING);
    expect(screen.getByRole('radio', { name: 'Chat' })).toHaveAttribute('aria-checked', 'true');
  });

  it('closes chat and clears Chat selection when the close button is clicked', async () => {
    const user = userEvent.setup();
    renderServiceDetails(LIGHTING_SERVICE_ID);

    await openServiceChat(user);
    await user.click(screen.getByRole('button', { name: 'Close chat' }));

    expect(screen.queryByRole('region', { name: 'Service pro chat' })).not.toBeInTheDocument();
    expect(screen.getByRole('radio', { name: 'Chat' })).toHaveAttribute('aria-checked', 'false');
  });

  it('closes Preferred Contact Method and chat when switching to I Have Materials', async () => {
    const user = userEvent.setup();
    renderServiceDetails(LIGHTING_SERVICE_ID);

    await openServiceChat(user);

    expect(screen.getByRole('region', { name: 'Preferred Contact Method' })).toBeInTheDocument();
    expect(screen.getByRole('region', { name: 'Service pro chat' })).toBeInTheDocument();

    await user.click(screen.getByRole('button', { name: 'I Have Materials' }));

    expect(
      screen.queryByRole('region', { name: 'Preferred Contact Method' }),
    ).not.toBeInTheDocument();
    expect(screen.queryByRole('region', { name: 'Service pro chat' })).not.toBeInTheDocument();
  });

  it('closes Preferred Contact Method and Create Account when switching to I Have Materials after Phone / SMS', async () => {
    const user = userEvent.setup();
    renderServiceDetails(LIGHTING_SERVICE_ID);

    await openCreateAccountForm(user);

    await user.click(screen.getByRole('button', { name: 'I Have Materials' }));

    expect(
      screen.queryByRole('region', { name: 'Preferred Contact Method' }),
    ).not.toBeInTheDocument();
    expect(
      screen.queryByRole('region', { name: 'Create your account' }),
    ).not.toBeInTheDocument();
    expect(screen.queryByRole('region', { name: 'Sign-up methods' })).not.toBeInTheDocument();
  });

  it('closes chat when Phone or Email is selected instead of Chat', async () => {
    const user = userEvent.setup();
    renderServiceDetails(LIGHTING_SERVICE_ID);

    await openServiceChat(user);
    expect(screen.getByRole('region', { name: 'Service pro chat' })).toBeInTheDocument();

    await user.click(screen.getByRole('radio', { name: 'Phone / SMS' }));

    expect(screen.queryByRole('region', { name: 'Service pro chat' })).not.toBeInTheDocument();
    expect(screen.getByRole('radio', { name: 'Phone / SMS' })).toHaveAttribute(
      'aria-checked',
      'true',
    );

    await user.click(screen.getByRole('radio', { name: 'Chat' }));
    await waitFor(() => {
      expect(screen.getByRole('region', { name: 'Service pro chat' })).toBeInTheDocument();
    });

    await user.click(screen.getByRole('radio', { name: 'Email' }));

    expect(screen.queryByRole('region', { name: 'Service pro chat' })).not.toBeInTheDocument();
    expect(screen.getByRole('radio', { name: 'Email' })).toHaveAttribute('aria-checked', 'true');
  });

  it('appends a sent message when the user types and sends from the composer', async () => {
    const user = userEvent.setup();
    renderServiceDetails(LIGHTING_SERVICE_ID);

    await openServiceChat(user);

    const messageInput = screen.getByLabelText('Type a message');
    const sendButton = screen.getByRole('button', { name: 'Send message' });

    expect(sendButton).toBeDisabled();

    await user.type(messageInput, 'Ready when you are');
    expect(sendButton).toBeEnabled();

    await user.click(sendButton);

    expect(screen.getByText('Ready when you are')).toBeInTheDocument();
    expect(messageInput).toHaveValue('');
    expect(sendButton).toBeDisabled();
  });
});

describe('Service details create account', () => {
  it('keeps Create Account hidden until Manual Sign-Up after Phone/SMS or Email', async () => {
    const user = userEvent.setup();
    renderServiceDetails(LIGHTING_SERVICE_ID);

    expect(
      screen.queryByRole('region', { name: 'Create your account' }),
    ).not.toBeInTheDocument();

    await reachContactMethodStep(user);

    expect(
      screen.queryByRole('region', { name: 'Create your account' }),
    ).not.toBeInTheDocument();
    expect(screen.queryByRole('region', { name: 'Sign-up methods' })).not.toBeInTheDocument();
  });

  it('shows Sign-up methods below Preferred Contact Method when Phone / SMS is selected', async () => {
    const user = userEvent.setup();
    renderServiceDetails(LIGHTING_SERVICE_ID);

    await openSignUpMethods(user);

    const contactRegion = screen.getByRole('region', { name: 'Preferred Contact Method' });
    const signUpMethodsRegion = screen.getByRole('region', { name: 'Sign-up methods' });

    expect(screen.getByRole('button', { name: 'Manual Sign-Up' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Continue with Google' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Continue with Apple' })).toBeInTheDocument();
    expect(
      screen.queryByRole('region', { name: 'Create your account' }),
    ).not.toBeInTheDocument();
    expect(screen.getByRole('radio', { name: 'Phone / SMS' })).toHaveAttribute('aria-checked', 'true');
    expect(
      contactRegion.compareDocumentPosition(signUpMethodsRegion) & Node.DOCUMENT_POSITION_FOLLOWING,
    ).toBe(Node.DOCUMENT_POSITION_FOLLOWING);
  });

  it('opens Create Account when Manual Sign-Up is clicked after Phone / SMS', async () => {
    const user = userEvent.setup();
    renderServiceDetails(LIGHTING_SERVICE_ID);

    await openCreateAccountForm(user);

    const contactRegion = screen.getByRole('region', { name: 'Preferred Contact Method' });
    const accountRegion = screen.getByRole('region', { name: 'Create your account' });
    const includedHeading = screen.getByRole('heading', { name: "What's Included" });

    expect(screen.queryByRole('region', { name: 'Sign-up methods' })).not.toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 2, name: 'Create your Account' })).toBeInTheDocument();
    expect(screen.getByLabelText('Full Name')).toBeInTheDocument();
    expect(screen.getByLabelText('Email')).toBeInTheDocument();
    expect(screen.getByLabelText('Phone Number')).toBeInTheDocument();
    expect(screen.getByLabelText('Address')).toBeInTheDocument();
    expect(screen.getByLabelText('Password')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Sign UP' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Continue with Google' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Continue with Apple' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Log In' })).toBeInTheDocument();
    expect(screen.getByRole('radio', { name: 'Phone / SMS' })).toHaveAttribute('aria-checked', 'true');
    expect(
      contactRegion.compareDocumentPosition(accountRegion) & Node.DOCUMENT_POSITION_FOLLOWING,
    ).toBe(Node.DOCUMENT_POSITION_FOLLOWING);
    expect(
      accountRegion.compareDocumentPosition(includedHeading) & Node.DOCUMENT_POSITION_FOLLOWING,
    ).toBe(Node.DOCUMENT_POSITION_FOLLOWING);
  });

  it('opens Create Account when Manual Sign-Up is clicked after Email', async () => {
    const user = userEvent.setup();
    renderServiceDetails(LIGHTING_SERVICE_ID);

    await openCreateAccountForm(user, 'Email');

    expect(screen.getByRole('heading', { level: 2, name: 'Create your Account' })).toBeInTheDocument();
    expect(screen.getByRole('radio', { name: 'Email' })).toHaveAttribute('aria-checked', 'true');
  });

  it('does NOT open Create Account or Sign-up methods when Chat is selected', async () => {
    const user = userEvent.setup();
    renderServiceDetails(LIGHTING_SERVICE_ID);

    await openServiceChat(user);

    expect(
      screen.queryByRole('region', { name: 'Create your account' }),
    ).not.toBeInTheDocument();
    expect(screen.queryByRole('region', { name: 'Sign-up methods' })).not.toBeInTheDocument();
    expect(screen.getByRole('region', { name: 'Service pro chat' })).toBeInTheDocument();
  });

  it('closes Create Account and deselects Phone/SMS when close X is clicked', async () => {
    const user = userEvent.setup();
    renderServiceDetails(LIGHTING_SERVICE_ID);

    await openCreateAccountForm(user);

    await user.click(screen.getByRole('button', { name: 'Close sign up form' }));

    expect(
      screen.queryByRole('region', { name: 'Create your account' }),
    ).not.toBeInTheDocument();
    expect(screen.queryByRole('region', { name: 'Sign-up methods' })).not.toBeInTheDocument();
    expect(screen.getByRole('radio', { name: 'Phone / SMS' })).toHaveAttribute('aria-checked', 'false');
  });

  it('switches from Create Account to chat when Chat is selected', async () => {
    const user = userEvent.setup();
    renderServiceDetails(LIGHTING_SERVICE_ID);

    await openCreateAccountForm(user, 'Email');

    await user.click(screen.getByRole('radio', { name: 'Chat' }));

    expect(
      screen.queryByRole('region', { name: 'Create your account' }),
    ).not.toBeInTheDocument();
    expect(screen.queryByRole('region', { name: 'Sign-up methods' })).not.toBeInTheDocument();
    await waitFor(() => {
      expect(screen.getByRole('region', { name: 'Service pro chat' })).toBeInTheDocument();
    });
  });

  it('shows and hides password via the toggle button', async () => {
    const user = userEvent.setup();
    renderServiceDetails(LIGHTING_SERVICE_ID);

    await openCreateAccountForm(user);

    const passwordInput = screen.getByLabelText('Password');
    expect(passwordInput).toHaveAttribute('type', 'password');

    await user.click(screen.getByRole('button', { name: 'Show password' }));
    expect(passwordInput).toHaveAttribute('type', 'text');

    await user.click(screen.getByRole('button', { name: 'Hide password' }));
    expect(passwordInput).toHaveAttribute('type', 'password');
  });

  it('disables Sign UP when required fields are empty', async () => {
    const user = userEvent.setup();
    renderServiceDetails(LIGHTING_SERVICE_ID);

    await openCreateAccountForm(user);

    expect(screen.getByRole('button', { name: 'Sign UP' })).toBeDisabled();

    await user.type(screen.getByLabelText('Full Name'), 'Jane Doe');
    await user.type(screen.getByLabelText('Email'), 'jane@example.com');
    await user.type(screen.getByLabelText('Phone Number'), '5551234567');
    await user.type(screen.getByLabelText('Address'), '123 Main St');
    await user.type(screen.getByLabelText('Password'), 'Secret123');

    expect(screen.getByRole('button', { name: 'Sign UP' })).toBeEnabled();
  });
});

describe('service details routes', () => {
  it('builds a stable details path for catalog cards', () => {
    expect(LIGHTING_DETAILS_PATH).toBe(`/service/${LIGHTING_SERVICE_ID}?category=All`);
    expect(FENCE_DETAILS_PATH).toBe(`/service/${FENCE_SERVICE_ID}?category=All`);
  });
});
