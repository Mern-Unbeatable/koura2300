import React from 'react';
import { configureStore } from '@reduxjs/toolkit';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Provider } from 'react-redux';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { ROUTES } from '../../../config';
import cartReducer from '../../../store/slices/cartSlice';
import authReducer from '../../../store/slices/authSlice';
import AccountContent from '../AccountContent';
import HomeContent from '../../home/HomeContent';
import { ACCOUNT_CONTENT } from '../accountCopy';

jest.mock('react-hot-toast', () => ({
  success: jest.fn(),
  error: jest.fn(),
}));

const authenticatedUser = {
  isAuthenticated: true,
  user: {
    name: 'Md Kamrul',
    email: 'kamrul@test.com',
    phone: '555-0199',
    address: '42 Service Lane',
    role: 'user',
  },
};

const createTestStore = (authOverrides = {}) =>
  configureStore({
    reducer: {
      cart: cartReducer,
      auth: authReducer,
    },
    preloadedState: {
      auth: {
        user: null,
        token: null,
        isAuthenticated: false,
        loading: false,
        ...authOverrides,
      },
    },
  });

const renderAccountPage = (initialPath = ROUTES.ACCOUNT, authOverrides = {}) => {
  const store = createTestStore(authOverrides);

  render(
    <Provider store={store}>
      <MemoryRouter initialEntries={[initialPath]}>
        <Routes>
          <Route path={ROUTES.ACCOUNT} element={<AccountContent />} />
        </Routes>
      </MemoryRouter>
    </Provider>,
  );

  return store;
};

describe('AccountContent', () => {
  it('renders account settings sections with shared landing chrome', () => {
    renderAccountPage();

    expect(
      screen.getByRole('region', { name: ACCOUNT_CONTENT.accountSetting.regionLabel }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole('region', { name: ACCOUNT_CONTENT.changePassword.regionLabel }),
    ).toBeInTheDocument();
    expect(screen.getByRole('banner')).toBeInTheDocument();
    expect(screen.getByRole('contentinfo')).toBeInTheDocument();
  });

  it('highlights the Account navbar action on the account route', () => {
    renderAccountPage(ROUTES.ACCOUNT, authenticatedUser);

    const accountLink = screen.getAllByRole('link', { name: 'Md Kamrul' })[0];
    expect(accountLink).toHaveClass('text-brand-orange');
  });

  it('updates profile fields when the user types', async () => {
    const user = userEvent.setup();
    renderAccountPage();

    const fullNameInput = screen.getByLabelText(ACCOUNT_CONTENT.accountSetting.fullNameLabel);
    await user.clear(fullNameInput);
    await user.type(fullNameInput, 'Alex');

    expect(fullNameInput).toHaveValue('Alex');
  });

  it('shows the logged-in user details in account settings', () => {
    renderAccountPage(ROUTES.ACCOUNT, authenticatedUser);

    expect(screen.getByLabelText(ACCOUNT_CONTENT.accountSetting.fullNameLabel)).toHaveValue(
      'Md Kamrul',
    );
    expect(screen.getByLabelText(ACCOUNT_CONTENT.accountSetting.emailLabel)).toHaveValue(
      'kamrul@test.com',
    );
    expect(screen.getByLabelText(ACCOUNT_CONTENT.accountSetting.phoneLabel)).toHaveValue(
      '555-0199',
    );
    expect(screen.getByLabelText(ACCOUNT_CONTENT.accountSetting.addressLabel)).toHaveValue(
      '42 Service Lane',
    );
  });

  it('shows password placeholder from Figma for the new password field', () => {
    renderAccountPage();

    expect(
      screen.getByPlaceholderText(ACCOUNT_CONTENT.changePassword.newPasswordPlaceholder),
    ).toBeInTheDocument();
  });

  it('enables Save Changes after any profile field is updated', async () => {
    const user = userEvent.setup();
    renderAccountPage(ROUTES.ACCOUNT, {
      isAuthenticated: true,
      user: {
        name: 'kamrul',
        email: 'kamrul@gmail.com',
        phone: '',
        address: '',
        role: 'user',
      },
    });

    const saveButton = screen.getByRole('button', {
      name: ACCOUNT_CONTENT.accountSetting.saveButton,
    });

    expect(saveButton).toBeDisabled();

    await user.type(
      screen.getByLabelText(ACCOUNT_CONTENT.accountSetting.addressLabel),
      'adsfdasf',
    );

    expect(saveButton).toBeEnabled();
  });

  it('enables Change Password after typing in a password field', async () => {
    const user = userEvent.setup();
    renderAccountPage(ROUTES.ACCOUNT, authenticatedUser);

    const passwordButton = screen.getByRole('button', {
      name: ACCOUNT_CONTENT.changePassword.submitButton,
    });

    expect(passwordButton).toBeDisabled();

    await user.type(
      screen.getByLabelText(ACCOUNT_CONTENT.changePassword.currentPasswordLabel),
      'secret',
    );

    expect(passwordButton).toBeEnabled();
  });
});

describe('Account navbar integration', () => {
  it('navigates to account settings from the desktop Account action', async () => {
    const user = userEvent.setup();
    const store = createTestStore(authenticatedUser);

    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={[ROUTES.HOME]}>
          <Routes>
            <Route path={ROUTES.HOME} element={<HomeContent />} />
            <Route path={ROUTES.ACCOUNT} element={<AccountContent />} />
          </Routes>
        </MemoryRouter>
      </Provider>,
    );

    const accountLinks = screen.getAllByRole('link', { name: 'Md Kamrul' });
    await user.click(accountLinks[0]);

    expect(
      screen.getByRole('region', { name: ACCOUNT_CONTENT.accountSetting.regionLabel }),
    ).toBeInTheDocument();
  });
});
