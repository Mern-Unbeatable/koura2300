import React from 'react';
import { configureStore } from '@reduxjs/toolkit';
import { cleanup, render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import cartReducer from '../../../store/slices/cartSlice';
import LightingContent from '../LightingContent';

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
    expect(screen.getByRole('link', { name: 'Lighting' })).toHaveAttribute('href', '/lighting');
    expect(screen.getByRole('contentinfo')).toBeInTheDocument();
  });

  it('marks the Lighting category link as the current page', () => {
    renderLightingPage();

    const lightingLink = screen.getByRole('link', { name: 'Lighting' });

    expect(lightingLink).toHaveAttribute('aria-current', 'page');
  });

  it('does not mark other category links as the current page', () => {
    renderLightingPage();

    expect(screen.getByRole('link', { name: 'Kitchen' })).not.toHaveAttribute('aria-current');
  });

  it('renders twenty service cards on the first page', () => {
    renderLightingPage();

    expect(screen.getAllByRole('article')).toHaveLength(20);
    expect(
      screen.getByRole('heading', { level: 3, name: 'Ceiling Light Installation' }),
    ).toBeInTheDocument();
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

    expect(screen.getByRole('heading', { level: 3, name: 'Flood Light Installation' })).toBeVisible();
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
});
