import React from 'react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { cleanup, render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import HomeContent from '../HomeContent';
import cartReducer from '../../../store/slices/cartSlice';

const createTestStore = () =>
  configureStore({
    reducer: {
      cart: cartReducer,
    },
  });

const renderLandingPage = () => {
  const store = createTestStore();

  render(
    <Provider store={store}>
      <MemoryRouter>
        <HomeContent />
      </MemoryRouter>
    </Provider>,
  );

  return store;
};

afterEach(() => {
  cleanup();
});

describe('Landing page', () => {
  it('renders the complete landing-page structure', () => {
    renderLandingPage();

    expect(screen.getByRole('banner')).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Top-rated services' })).toBeInTheDocument();
    expect(
      screen.getByRole('heading', {
        name: 'Professional solutions for every corner of your home',
      }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole('heading', { name: 'Trusted professionals for every home project' }),
    ).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Learn, Grow' })).toBeInTheDocument();
    expect(screen.getByRole('contentinfo')).toBeInTheDocument();
  });

  it('uses meaningful image alternatives and lazy-loads non-critical images', () => {
    renderLandingPage();

    const serviceImage = screen.getByRole('img', {
      name: 'A professional repairing a kitchen faucet',
    });

    expect(serviceImage).toHaveAttribute('loading', 'lazy');
    expect(serviceImage).toHaveAttribute('width');
    expect(serviceImage).toHaveAttribute('height');
  });

  it('serves overview solution images as WebP with PNG fallback', () => {
    renderLandingPage();

    const primaryImage = screen.getByRole('img', {
      name: 'A professional cleaning kitchen cabinets',
    });
    const primaryPicture = primaryImage.closest('picture');
    const primarySource = primaryPicture?.querySelector('source[type="image/webp"]');

    expect(primarySource).toHaveAttribute('srcset', expect.stringContaining('.webp'));
    expect(primaryImage).toHaveAttribute('src', expect.stringContaining('.png'));
  });

  it('filters service cards through the header search form', async () => {
    const user = userEvent.setup();
    renderLandingPage();

    await user.type(screen.getAllByRole('searchbox', { name: 'Search services' })[0], 'drain');
    await user.click(screen.getAllByRole('button', { name: 'Submit service search' })[0]);

    const servicesRegion = screen.getByRole('region', { name: 'Top-rated services' });
    expect(within(servicesRegion).getByText('Drain Cleaning')).toBeInTheDocument();
    expect(
      within(servicesRegion).queryByText('Faucet Repair & Replacement'),
    ).not.toBeInTheDocument();
  });

  it('adds a selected service to the existing Redux cart', async () => {
    const user = userEvent.setup();
    const store = renderLandingPage();

    await user.click(screen.getByRole('button', { name: 'Add Drain Cleaning to cart' }));

    expect(store.getState().cart.totalItems).toBe(1);
    expect(screen.getByLabelText('Cart, 1 item')).toBeInTheDocument();
  });

  it('does not render a language switcher', () => {
    renderLandingPage();

    expect(screen.queryByRole('button', { name: /switch language/i })).not.toBeInTheDocument();
    expect(screen.queryByText('PL')).not.toBeInTheDocument();
  });

  it('opens and closes the accessible mobile navigation', async () => {
    const user = userEvent.setup();
    renderLandingPage();

    const menuButton = screen.getByRole('button', { name: 'Open navigation menu' });
    expect(menuButton).toHaveAttribute('aria-expanded', 'false');

    await user.click(menuButton);
    expect(screen.getByRole('navigation', { name: 'Mobile service categories' })).toBeVisible();
    expect(menuButton).toHaveAttribute('aria-expanded', 'true');

    await user.click(screen.getByRole('button', { name: 'Close navigation menu' }));
    expect(
      screen.queryByRole('navigation', { name: 'Mobile service categories' }),
    ).not.toBeInTheDocument();
  });

  it('validates newsletter email inline and confirms a valid submission', async () => {
    const user = userEvent.setup();
    renderLandingPage();

    const submitButton = screen.getByRole('button', { name: 'Subscribe to newsletter' });
    await user.click(submitButton);
    expect(screen.getByRole('alert')).toHaveTextContent('Enter a valid email address.');

    await user.type(screen.getByRole('textbox', { name: 'Email address' }), 'owner@example.com');
    await user.click(submitButton);
    expect(screen.getByRole('status')).toHaveTextContent('Thank you for subscribing.');
  });
});

describe('Featured categories carousel', () => {
  const TRACK_WIDTH = 300;
  const CONTENT_WIDTH = 900;
  const EXPECTED_CATEGORIES = [
    'Lighting',
    'Security',
    'Closets',
    'Fence',
    'Deck',
    'Basement',
    'Appliances',
    'Garage',
    'Garden',
    'Flooring',
    'Windows',
    'Doors',
    'Kitchen',
    'Bathroom',
    'Walls & Ceilings',
  ];

  afterEach(() => {
    jest.restoreAllMocks();
    delete Element.prototype.scrollBy;
    delete Element.prototype.scrollTo;
  });

  const stubScrollableTrack = ({ scrollLeft = 0 } = {}) => {
    const scrollBy = jest.fn();
    const scrollTo = jest.fn();

    jest.spyOn(Element.prototype, 'clientWidth', 'get').mockReturnValue(TRACK_WIDTH);
    jest.spyOn(Element.prototype, 'scrollWidth', 'get').mockReturnValue(CONTENT_WIDTH);
    jest.spyOn(Element.prototype, 'scrollLeft', 'get').mockReturnValue(scrollLeft);
    Element.prototype.scrollBy = scrollBy;
    Element.prototype.scrollTo = scrollTo;

    return { scrollBy, scrollTo };
  };

  it('keeps both controls enabled while the track can loop', () => {
    stubScrollableTrack();
    renderLandingPage();

    expect(screen.getByRole('button', { name: 'Show previous categories' })).toBeEnabled();
    expect(screen.getByRole('button', { name: 'Show next categories' })).toBeEnabled();
  });

  it('renders every navbar category in the dropdown and carousel', () => {
    renderLandingPage();

    const carousel = screen.getByRole('region', { name: 'Featured service categories' });
    const categorySelect = screen.getByRole('combobox', { name: 'Service category' });
    const cardNames = within(carousel)
      .getAllByRole('heading', { level: 2 })
      .map((heading) => heading.textContent);
    const optionNames = within(categorySelect)
      .getAllByRole('option')
      .slice(1)
      .map((option) => option.textContent);

    expect(cardNames).toEqual(EXPECTED_CATEGORIES);
    expect(optionNames).toEqual(EXPECTED_CATEGORIES);
  });

  it('scrolls the track forward by one card when the next control is used', async () => {
    const { scrollBy } = stubScrollableTrack();
    const user = userEvent.setup();
    renderLandingPage();

    const nextButton = screen.getByRole('button', { name: 'Show next categories' });
    expect(nextButton).toBeEnabled();

    await user.click(nextButton);

    expect(scrollBy).toHaveBeenCalledWith({ left: TRACK_WIDTH, behavior: 'smooth' });
  });

  it('scrolls the track backwards by one card when the previous control is used', async () => {
    const { scrollBy } = stubScrollableTrack({ scrollLeft: TRACK_WIDTH });
    const user = userEvent.setup();
    renderLandingPage();

    await user.click(screen.getByRole('button', { name: 'Show previous categories' }));

    expect(scrollBy).toHaveBeenCalledWith({ left: -TRACK_WIDTH, behavior: 'smooth' });
  });

  it('loops back to the first card after Walls & Ceilings', async () => {
    const maxScrollLeft = CONTENT_WIDTH - TRACK_WIDTH;
    const { scrollTo } = stubScrollableTrack({ scrollLeft: maxScrollLeft });
    const user = userEvent.setup();
    renderLandingPage();

    await user.click(screen.getByRole('button', { name: 'Show next categories' }));

    expect(scrollTo).toHaveBeenCalledWith({ left: 0, behavior: 'smooth' });
  });

  it('loops to the last card when previous is used at the start', async () => {
    const maxScrollLeft = CONTENT_WIDTH - TRACK_WIDTH;
    const { scrollTo } = stubScrollableTrack({ scrollLeft: 0 });
    const user = userEvent.setup();
    renderLandingPage();

    await user.click(screen.getByRole('button', { name: 'Show previous categories' }));

    expect(scrollTo).toHaveBeenCalledWith({ left: maxScrollLeft, behavior: 'smooth' });
  });
});
