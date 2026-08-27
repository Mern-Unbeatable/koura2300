import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import LandingHeaderActions from '../LandingHeaderActions';
import authReducer from '../../../store/slices/authSlice';
import { ROUTES } from '../../../config';
import { LANDING_CONTENT } from '../landingContent';
import { USER_ROLES } from '../../login/loginData';

const renderActions = (authState = {}) => {
  const store = configureStore({
    reducer: { auth: authReducer },
    preloadedState: {
      auth: {
        user: null,
        token: null,
        isAuthenticated: false,
        loading: false,
        ...authState,
      },
    },
  });

  return {
    store,
    ...render(
      <Provider store={store}>
        <MemoryRouter>
          <LandingHeaderActions isChatActive={false} onChatClick={jest.fn()} />
        </MemoryRouter>
      </Provider>,
    ),
  };
};

describe('LandingHeaderActions auth slots', () => {
  it('shows Login linked to /login for guests', () => {
    renderActions();

    const loginLink = screen.getByRole('link', { name: LANDING_CONTENT.header.login });
    expect(loginLink).toHaveAttribute('href', ROUTES.LOGIN);
    expect(screen.queryByRole('link', { name: LANDING_CONTENT.header.dashboard })).not.toBeInTheDocument();
    expect(screen.queryByRole('button', { name: LANDING_CONTENT.header.logout })).not.toBeInTheDocument();
  });

  it('shows Dashboard and Logout for logged-in admins and hides Login', () => {
    renderActions({
      isAuthenticated: true,
      user: { email: 'admin@test.com', name: 'Admin', role: USER_ROLES.ADMIN },
    });

    expect(screen.queryByRole('link', { name: LANDING_CONTENT.header.login })).not.toBeInTheDocument();
    expect(screen.getByRole('button', { name: LANDING_CONTENT.header.logout })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: LANDING_CONTENT.header.dashboard })).toHaveAttribute(
      'href',
      ROUTES.ADMIN_DASHBOARD,
    );
  });

  it('shows user name, Logout, and never shows Dashboard for customers', () => {
    renderActions({
      isAuthenticated: true,
      user: { email: 'kamrul@gmail.com', name: 'Kamrul', role: USER_ROLES.USER },
    });

    expect(screen.getByRole('link', { name: 'Kamrul' })).toHaveAttribute(
      'href',
      ROUTES.ACCOUNT,
    );
    expect(screen.getByRole('button', { name: LANDING_CONTENT.header.logout })).toBeInTheDocument();
    expect(screen.queryByRole('link', { name: LANDING_CONTENT.header.dashboard })).not.toBeInTheDocument();
    expect(screen.queryByRole('link', { name: LANDING_CONTENT.header.login })).not.toBeInTheDocument();
  });

  it('clears auth session when Logout is clicked', async () => {
    const user = userEvent.setup();
    const { store } = renderActions({
      isAuthenticated: true,
      user: { email: 'kamrul@gmail.com', name: 'Kamrul', role: USER_ROLES.USER },
      token: 'test-token',
    });

    await user.click(screen.getByRole('button', { name: LANDING_CONTENT.header.logout }));

    expect(store.getState().auth.isAuthenticated).toBe(false);
    expect(store.getState().auth.user).toBeNull();
  });
});
