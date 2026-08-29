import React from 'react';
import { configureStore } from '@reduxjs/toolkit';
import { cleanup, render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import { buildServiceDetailsRoute } from '../../../config';
import cartReducer from '../../../store/slices/cartSlice';
import authReducer from '../../../store/slices/authSlice';
import LightingContent from '../LightingContent';
import { LIGHTING_CONTENT } from '../lightingCopy';

const createTestStore = () =>
  configureStore({
    reducer: {
      cart: cartReducer,
      auth: authReducer,
    },
  });

const renderLightingPage = () => {
  const store = createTestStore();

  render(
    <Provider store={store}>
      <MemoryRouter initialEntries={['/lighting']}>
        <LightingContent />
      </MemoryRouter>
    </Provider>,
  );

  return store;
};

const openSubcategory = async (user, name) => {
  await user.click(screen.getByRole('button', { name }));
};

afterEach(() => {
  cleanup();
});

describe('Lighting page', () => {
  it('renders the shared site chrome and Lighting page heading', () => {
    renderLightingPage();

    expect(screen.getByRole('banner')).toBeInTheDocument();
    expect(
      screen.getByRole('heading', { level: 1, name: 'Professional Lighting Services' }),
    ).toBeInTheDocument();
    expect(
      within(screen.getByRole('navigation', { name: 'Service categories' })).getByRole('link', {
        name: 'Lighting',
      }),
    ).toHaveAttribute('href', '/lighting');
    expect(screen.getByRole('contentinfo')).toBeInTheDocument();
  });

  it('marks the Lighting category link as the current page', () => {
    renderLightingPage();

    const lightingLink = within(
      screen.getByRole('navigation', { name: 'Service categories' }),
    ).getByRole('link', { name: 'Lighting' });

    expect(lightingLink).toHaveAttribute('aria-current', 'page');
  });

  it('shows subcategory cards instead of pill tabs on the landing view', () => {
    renderLightingPage();

    expect(screen.getByTestId('subcategory-cards-grid')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Indoor Lighting' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Smart Lighting' })).toBeInTheDocument();
    expect(screen.queryByRole('button', { name: 'All' })).not.toBeInTheDocument();
    expect(screen.queryByRole('combobox', { name: 'Price Range' })).not.toBeInTheDocument();
    expect(screen.queryAllByRole('article')).toHaveLength(0);
  });

  it('opens child services when a subcategory card is clicked', async () => {
    const user = userEvent.setup();
    renderLightingPage();

    await openSubcategory(user, 'Indoor Lighting');

    expect(screen.getAllByRole('article')).toHaveLength(8);
    expect(
      screen.getByRole('heading', { level: 3, name: 'Ceiling Light Installation' }),
    ).toBeInTheDocument();
    expect(screen.queryByRole('heading', { level: 3, name: 'Porch Lights' })).not.toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: LIGHTING_CONTENT.subcategories.backLabel }),
    ).toBeInTheDocument();
    expect(screen.queryByRole('button', { name: 'Outdoor Lighting' })).not.toBeInTheDocument();
    expect(screen.queryByRole('group', { name: /Filter lighting/i })).not.toBeInTheDocument();
  });

  it('returns to subcategory cards from the services view', async () => {
    const user = userEvent.setup();
    renderLightingPage();

    await openSubcategory(user, 'Outdoor Lighting');
    await user.click(
      screen.getByRole('button', { name: LIGHTING_CONTENT.subcategories.backLabel }),
    );

    expect(screen.getByTestId('subcategory-cards-grid')).toBeInTheDocument();
    expect(screen.queryAllByRole('article')).toHaveLength(0);
  });

  it('filters child services by price range after opening a subcategory', async () => {
    const user = userEvent.setup();
    renderLightingPage();

    await openSubcategory(user, 'Indoor Lighting');
    await user.selectOptions(screen.getByRole('combobox', { name: 'Price Range' }), '100-200');

    const visibleCards = screen.getAllByRole('article');
    expect(visibleCards.length).toBeGreaterThan(0);
    visibleCards.forEach((card) => {
      expect(within(card).getByText(/Starting at \$(1\d\d|200)/)).toBeInTheDocument();
    });
  });

  it('adds the selected lighting service to the Redux cart from a subcategory', async () => {
    const user = userEvent.setup();
    const store = renderLightingPage();

    await openSubcategory(user, 'Indoor Lighting');
    await user.click(
      screen.getByRole('button', { name: 'Add Ceiling Light Installation to cart' }),
    );

    expect(store.getState().cart.totalItems).toBe(1);
    expect(store.getState().cart.items[0].title).toBe('Ceiling Light Installation');
  });

  it('links each catalog card to its service details page with the subcategory', async () => {
    const user = userEvent.setup();
    renderLightingPage();

    await openSubcategory(user, 'Light Fixture Services');

    const card = screen
      .getByRole('heading', { level: 3, name: 'Fixture Installation' })
      .closest('article');

    expect(within(card).getByRole('link', { name: 'View Fixture Installation' })).toHaveAttribute(
      'href',
      buildServiceDetailsRoute(
        'light-fixture-services-fixture-installation',
        'Light Fixture Services',
      ),
    );
  });

  it('paginates only while browsing child services that exceed one page', async () => {
    const user = userEvent.setup();
    renderLightingPage();

    expect(screen.queryByRole('button', { name: 'Next page' })).not.toBeInTheDocument();

    await openSubcategory(user, 'Indoor Lighting');
    expect(screen.queryByRole('button', { name: 'Next page' })).not.toBeInTheDocument();
  });
});
