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
  it('renders MAIN, MANAGEMENT, and OTHER section labels', () => {
    renderSidebar();

    expect(screen.getByText(SIDEBAR_COPY.main)).toBeInTheDocument();
    expect(screen.getByText(SIDEBAR_COPY.management)).toBeInTheDocument();
    expect(screen.getByText(SIDEBAR_COPY.other)).toBeInTheDocument();
  });

  it('includes Categories in MANAGEMENT and marks it active on the categories route', () => {
    renderSidebar(ROUTES.ADMIN_CATEGORIES);

    const categoriesLink = screen.getByRole('link', { name: /Categories/i });
    expect(categoriesLink).toHaveAttribute('href', ROUTES.ADMIN_CATEGORIES);
    expect(categoriesLink.className).toContain('bg-[#fff1eb]');
    expect(categoriesLink.className).toContain('border-[#fc6f32]');
  });

  it('uses Overview label for the dashboard route', () => {
    renderSidebar(ROUTES.ADMIN_DASHBOARD);

    expect(screen.getByRole('link', { name: /Overview/i })).toHaveAttribute(
      'href',
      ROUTES.ADMIN_DASHBOARD,
    );
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
