import { render, screen } from '@testing-library/react';
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

  return render(
    <Provider store={store}>
      <MemoryRouter>
        <LandingHeaderActions isChatActive={false} onChatClick={jest.fn()} />
      </MemoryRouter>
    </Provider>,
  );
};

describe('LandingHeaderActions auth slots', () => {
  it('shows Login linked to /login for guests', () => {
    renderActions();

    const loginLink = screen.getByRole('link', { name: LANDING_CONTENT.header.login });
    expect(loginLink).toHaveAttribute('href', ROUTES.LOGIN);
    expect(screen.queryByRole('link', { name: LANDING_CONTENT.header.dashboard })).not.toBeInTheDocument();
  });

  it('shows Dashboard for logged-in admins and hides Login', () => {
    renderActions({
      isAuthenticated: true,
      user: { email: 'admin@test.com', name: 'Admin', role: USER_ROLES.ADMIN },
    });

    expect(screen.queryByRole('link', { name: LANDING_CONTENT.header.login })).not.toBeInTheDocument();
    expect(screen.getByRole('link', { name: LANDING_CONTENT.header.dashboard })).toHaveAttribute(
      'href',
      ROUTES.ADMIN_DASHBOARD,
    );
  });

  it('shows user name on Account and never shows Dashboard for customers', () => {
    renderActions({
      isAuthenticated: true,
      user: { email: 'jane@test.com', name: 'Jane Doe', role: USER_ROLES.USER },
    });

    expect(screen.getByRole('link', { name: 'Jane Doe' })).toHaveAttribute(
      'href',
      ROUTES.ACCOUNT,
    );
    expect(screen.queryByRole('link', { name: LANDING_CONTENT.header.dashboard })).not.toBeInTheDocument();
    expect(screen.queryByRole('link', { name: LANDING_CONTENT.header.login })).not.toBeInTheDocument();
  });
});
