import React from 'react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { cleanup, render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter, useLocation } from 'react-router-dom';
import HomeContent from '../HomeContent';
import cartReducer from '../../../store/slices/cartSlice';

const CurrentPath = () => {
  const { pathname } = useLocation();
  return <div data-testid="current-path">{pathname}</div>;
};

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
        <CurrentPath />
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
    expect(store.getState().cart.items[0].title).toBe('Drain Cleaning');
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

  it('offers the category filter on both the mobile and desktop search bars', () => {
    renderLandingPage();

    const categorySelects = screen.getAllByRole('combobox', { name: 'Service category' });

    expect(categorySelects).toHaveLength(2);
    categorySelects.forEach((select) => {
      expect(within(select).getByRole('option', { name: 'All Categories' })).toBeInTheDocument();
    });
  });

  it('overlays the mobile menu instead of pushing page content down', async () => {
    const user = userEvent.setup();
    renderLandingPage();

    await user.click(screen.getByRole('button', { name: 'Open navigation menu' }));

    const drawer = document.getElementById('landing-mobile-navigation');

    expect(drawer).toHaveClass('fixed');
    expect(document.body).toHaveStyle({ overflow: 'hidden' });
  });

  it('closes the mobile menu when Escape is pressed', async () => {
    const user = userEvent.setup();
    renderLandingPage();

    await user.click(screen.getByRole('button', { name: 'Open navigation menu' }));
    expect(screen.getByRole('navigation', { name: 'Mobile service categories' })).toBeVisible();

    await user.keyboard('{Escape}');

    expect(
      screen.queryByRole('navigation', { name: 'Mobile service categories' }),
    ).not.toBeInTheDocument();
    expect(document.body).not.toHaveStyle({ overflow: 'hidden' });
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

describe('Learn, Grow article pagination', () => {
  it('links each shared article card to its details route', () => {
    renderLandingPage();

    const articleLink = screen
      .getByRole('heading', { name: '5 Signs Your Home Needs a Plumbing Repair' })
      .closest('a');

    expect(articleLink).toHaveAttribute('href', '/blog/plumbing');
  });

  it('shows the next group of shared article cards when the next arrow is clicked', async () => {
    const user = userEvent.setup();
    renderLandingPage();

    expect(
      screen.getByRole('heading', { name: '5 Signs Your Home Needs a Plumbing Repair' }),
    ).toBeInTheDocument();
    expect(
      screen.queryByRole('heading', { name: 'How to Prevent Costly Water Leaks' }),
    ).not.toBeInTheDocument();

    await user.click(screen.getByRole('button', { name: 'Show next articles' }));

    expect(
      screen.queryByRole('heading', { name: '5 Signs Your Home Needs a Plumbing Repair' }),
    ).not.toBeInTheDocument();
    expect(
      screen.getByRole('heading', { name: 'How to Prevent Costly Water Leaks' }),
    ).toBeInTheDocument();
  });

  it('returns to the first article group with the previous arrow', async () => {
    const user = userEvent.setup();
    renderLandingPage();

    const previousButton = screen.getByRole('button', { name: 'Show previous articles' });
    expect(previousButton).toBeDisabled();

    await user.click(screen.getByRole('button', { name: 'Show next articles' }));
    await user.click(previousButton);

    expect(
      screen.getByRole('heading', { name: '5 Signs Your Home Needs a Plumbing Repair' }),
    ).toBeInTheDocument();
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
    const categorySelect = screen.getAllByRole('combobox', { name: 'Service category' })[0];
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

  it('links each hero category card to its catalogue path', () => {
    renderLandingPage();

    const carousel = screen.getByRole('region', { name: 'Featured service categories' });

    expect(within(carousel).getByRole('link', { name: /Lighting/ })).toHaveAttribute(
      'href',
      '/lighting',
    );
    expect(within(carousel).getByRole('link', { name: /Windows/ })).toHaveAttribute(
      'href',
      '/windows',
    );
    expect(within(carousel).getByRole('link', { name: /Walls & Ceilings/ })).toHaveAttribute(
      'href',
      '/walls-ceilings',
    );
  });

  it('sends the category dropdown to each catalogue path', () => {
    renderLandingPage();

    const categorySelect = screen.getAllByRole('combobox', { name: 'Service category' })[0];

    expect(within(categorySelect).getByRole('option', { name: 'All Categories' })).toHaveValue(
      'all',
    );
    expect(within(categorySelect).getByRole('option', { name: 'Windows' })).toHaveValue('/windows');
    expect(within(categorySelect).getByRole('option', { name: 'Doors' })).toHaveValue('/doors');
    expect(within(categorySelect).getByRole('option', { name: 'Kitchen' })).toHaveValue('/kitchen');
    expect(within(categorySelect).getByRole('option', { name: 'Bathroom' })).toHaveValue(
      '/bathroom',
    );
    expect(within(categorySelect).getByRole('option', { name: 'Walls & Ceilings' })).toHaveValue(
      '/walls-ceilings',
    );
  });

  it('navigates to the selected catalogue from the category dropdown', async () => {
    const user = userEvent.setup();
    renderLandingPage();

    await user.selectOptions(
      screen.getAllByRole('combobox', { name: 'Service category' })[0],
      '/kitchen',
    );

    expect(screen.getByTestId('current-path')).toHaveTextContent('/kitchen');
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
