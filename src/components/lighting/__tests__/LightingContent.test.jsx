import React from 'react';
import { configureStore } from '@reduxjs/toolkit';
import { cleanup, render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import { buildServiceDetailsRoute } from '../../../config';
import cartReducer from '../../../store/slices/cartSlice';
import LightingContent from '../LightingContent';
import { LIGHTING_ALL_CATEGORY } from '../lightingData';

const createTestStore = () =>
  configureStore({
    reducer: {
      cart: cartReducer,
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

  it('does not mark other category links as the current page', () => {
    renderLightingPage();

    expect(
      within(screen.getByRole('navigation', { name: 'Service categories' })).getByRole('link', {
        name: 'Kitchen',
      }),
    ).not.toHaveAttribute('aria-current');
  });

  it('renders twenty service cards on the first page', () => {
    renderLightingPage();

    expect(screen.getAllByRole('article')).toHaveLength(20);
    expect(
      screen.getByRole('heading', { level: 3, name: 'Ceiling Light Installation' }),
    ).toBeInTheDocument();
  });

  it('selects the All tab by default', () => {
    renderLightingPage();

    expect(screen.getByRole('button', { name: 'All' })).toHaveAttribute('aria-pressed', 'true');
    expect(screen.getByRole('button', { name: 'Indoor Lighting' })).toHaveAttribute(
      'aria-pressed',
      'false',
    );
  });

  it('shows services from every category while the All tab is selected', () => {
    renderLightingPage();

    expect(
      screen.getByRole('heading', { level: 3, name: 'Ceiling Light Installation' }),
    ).toBeVisible();
    expect(screen.getByRole('heading', { level: 3, name: 'Porch Lights' })).toBeVisible();
    expect(screen.getByRole('heading', { level: 3, name: 'Fixture Installation' })).toBeVisible();
  });

  it('shows only the chosen category once a category tab is selected', async () => {
    const user = userEvent.setup();
    renderLightingPage();

    await user.click(screen.getByRole('button', { name: 'Indoor Lighting' }));

    expect(screen.getAllByRole('article')).toHaveLength(8);
    expect(screen.queryByRole('heading', { level: 3, name: 'Porch Lights' })).not.toBeInTheDocument();
  });

  it('restores the full catalog when All is selected again', async () => {
    const user = userEvent.setup();
    renderLightingPage();

    await user.click(screen.getByRole('button', { name: 'Lighting Repairs' }));
    await user.click(screen.getByRole('button', { name: 'All' }));

    expect(screen.getAllByRole('article')).toHaveLength(20);
    expect(screen.getByRole('heading', { level: 3, name: 'Porch Lights' })).toBeVisible();
  });

  it('renders service images with meaningful alternatives and explicit dimensions', () => {
    renderLightingPage();

    const image = screen.getAllByRole('img', {
      name: 'Chrome lighting fixture above a white sink',
    })[0];

    expect(image).toHaveAttribute('loading', 'lazy');
    expect(image).toHaveAttribute('width');
    expect(image).toHaveAttribute('height');
  });

  it('filters services when a category control is selected', async () => {
    const user = userEvent.setup();
    renderLightingPage();

    await user.click(screen.getByRole('button', { name: 'Outdoor Lighting' }));

    expect(screen.getByRole('heading', { level: 3, name: 'Flood Lights' })).toBeVisible();
    expect(
      screen.queryByRole('heading', { level: 3, name: 'Ceiling Light Installation' }),
    ).not.toBeInTheDocument();
  });

  it('marks the selected category control as active', async () => {
    const user = userEvent.setup();
    renderLightingPage();

    const outdoorFilter = screen.getByRole('button', { name: 'Outdoor Lighting' });
    await user.click(outdoorFilter);

    expect(outdoorFilter).toHaveAttribute('aria-pressed', 'true');
    expect(screen.getByRole('button', { name: 'Indoor Lighting' })).toHaveAttribute(
      'aria-pressed',
      'false',
    );
  });

  it('filters services by the selected price range', async () => {
    const user = userEvent.setup();
    renderLightingPage();

    await user.selectOptions(screen.getByRole('combobox', { name: 'Price Range' }), '100-200');

    const visibleCards = screen.getAllByRole('article');
    expect(visibleCards.length).toBeGreaterThan(0);
    visibleCards.forEach((card) => {
      expect(within(card).getByText(/Starting at \$(1\d\d|200)/)).toBeInTheDocument();
    });
  });

  it('adds the selected lighting service to the Redux cart', async () => {
    const user = userEvent.setup();
    const store = renderLightingPage();

    await user.click(
      screen.getByRole('button', { name: 'Add Ceiling Light Installation to cart' }),
    );

    expect(store.getState().cart.totalItems).toBe(1);
    expect(store.getState().cart.items[0].title).toBe('Ceiling Light Installation');
  });

  it('moves to the next catalog page and updates pagination state', async () => {
    const user = userEvent.setup();
    renderLightingPage();

    const nextButton = screen.getByRole('button', { name: 'Next page' });
    await user.click(nextButton);

    expect(screen.getByRole('button', { name: 'Page 2' })).toHaveAttribute(
      'aria-current',
      'page',
    );
    expect(
      screen.queryByRole('heading', { level: 3, name: 'Ceiling Light Installation' }),
    ).not.toBeInTheDocument();
  });

  it('disables previous-page navigation on the first page', () => {
    renderLightingPage();

    expect(screen.getByRole('button', { name: 'Previous page' })).toBeDisabled();
  });

  it('links each catalog card to its service details page', () => {
    renderLightingPage();

    const card = screen
      .getByRole('heading', { level: 3, name: 'Ceiling Light Installation' })
      .closest('article');

    expect(within(card).getByRole('link', { name: 'Ceiling Light Installation' })).toHaveAttribute(
      'href',
      buildServiceDetailsRoute('indoor-lighting-ceiling-light-installation', LIGHTING_ALL_CATEGORY),
    );
  });

  it('carries the selected category tab into the service details link', async () => {
    const user = userEvent.setup();
    renderLightingPage();

    await user.click(screen.getByRole('button', { name: 'Light Fixture Services' }));

    const card = screen
      .getByRole('heading', { level: 3, name: 'Fixture Installation' })
      .closest('article');

    expect(within(card).getByRole('link', { name: 'Fixture Installation' })).toHaveAttribute(
      'href',
      buildServiceDetailsRoute(
        'light-fixture-services-fixture-installation',
        'Light Fixture Services',
      ),
    );
  });
});
