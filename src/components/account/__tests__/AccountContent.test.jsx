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

const createTestStore = () =>
  configureStore({
    reducer: {
      cart: cartReducer,
      auth: authReducer,
    },
  });

const renderAccountPage = (initialPath = ROUTES.ACCOUNT) => {
  const store = createTestStore();

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
    renderAccountPage();

    const accountLink = screen.getAllByRole('link', { name: 'Account' })[0];
    expect(accountLink).toHaveClass('text-brand-orange');
  });

  it('updates profile fields when the user types', async () => {
    const user = userEvent.setup();
    renderAccountPage();

    const firstNameInput = screen.getByLabelText(ACCOUNT_CONTENT.accountSetting.firstNameLabel);
    await user.clear(firstNameInput);
    await user.type(firstNameInput, 'Alex');

    expect(firstNameInput).toHaveValue('Alex');
  });

  it('shows password placeholder from Figma for the new password field', () => {
    renderAccountPage();

    expect(
      screen.getByPlaceholderText(ACCOUNT_CONTENT.changePassword.newPasswordPlaceholder),
    ).toBeInTheDocument();
  });
});

describe('Account navbar integration', () => {
  it('navigates to account settings from the desktop Account action', async () => {
    const user = userEvent.setup();
    const store = createTestStore();

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

    const accountLinks = screen.getAllByRole('link', { name: 'Account' });
    await user.click(accountLinks[0]);

    expect(
      screen.getByRole('region', { name: ACCOUNT_CONTENT.accountSetting.regionLabel }),
    ).toBeInTheDocument();
  });
});
