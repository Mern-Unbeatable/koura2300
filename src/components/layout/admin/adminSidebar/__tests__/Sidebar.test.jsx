import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import Sidebar from '../Sidebar';
import { ROUTES } from '../../../../../config';
import authReducer from '../../../../../store/slices/authSlice';
import { SIDEBAR_NAV_GROUPS, SIDEBAR_COPY } from '../sidebarNav';

const renderSidebar = (initialPath = ROUTES.ADMIN_CATEGORIES) => {
  const store = configureStore({
    reducer: { auth: authReducer },
    preloadedState: {
      auth: {
        user: { name: 'Atik Adnan', email: 'atik@example.com' },
        token: 'token',
        isAuthenticated: true,
      },
    },
  });

  return render(
    <Provider store={store}>
      <MemoryRouter initialEntries={[initialPath]}>
        <Sidebar
          onClose={jest.fn()}
          onDesktopClose={jest.fn()}
          onAutoCollapse={jest.fn()}
          isCollapsed={false}
          onExpand={jest.fn()}
        />
      </MemoryRouter>
    </Provider>,
  );
};

describe('Sidebar Figma navigation', () => {
  it('renders the Logoipsum brand logo in the sidebar header', () => {
    renderSidebar();

    const logo = screen.getByRole('img', { name: /Logoipsum/i });
    expect(logo).toHaveAttribute('src', '/assets/admin/sidebar-logo.svg');
    expect(logo).toHaveAttribute('width', '220');
    expect(logo).toHaveAttribute('height', '40');
  });

  it('renders MAIN, MANAGEMENT, and OTHER section labels', () => {
    renderSidebar();

    expect(screen.getByText(SIDEBAR_COPY.main)).toBeInTheDocument();
    expect(screen.getByText(SIDEBAR_COPY.management)).toBeInTheDocument();
    expect(screen.getByText(SIDEBAR_COPY.other)).toBeInTheDocument();
  });

  it('includes Reviews in MANAGEMENT with an active route', () => {
    renderSidebar(ROUTES.ADMIN_REVIEWS);

    const reviewsLink = screen.getByRole('link', { name: /Reviews/i });
    expect(reviewsLink).toHaveAttribute('href', ROUTES.ADMIN_REVIEWS);
    expect(reviewsLink.className).toContain('bg-[#fff1eb]');
  });

  it('exposes the Figma management items in nav config', () => {
    const management = SIDEBAR_NAV_GROUPS.find((group) => group.id === 'management');
    const names = management.items.map((item) => item.name);

    expect(names).toEqual([
      'Categories',
      'Reviews',
      'Blog Post',
      'Ads Management',
    ]);
  });
});
