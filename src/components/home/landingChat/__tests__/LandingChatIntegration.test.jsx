import { configureStore } from '@reduxjs/toolkit';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import authReducer from '../../../../store/slices/authSlice';
import cartReducer from '../../../../store/slices/cartSlice';
import HomeContent from '../../HomeContent';
import { LANDING_CHAT_COPY } from '../landingChatCopy';

const createTestStore = () =>
  configureStore({
    reducer: {
      auth: authReducer,
      cart: cartReducer,
    },
  });

const renderHomePage = () => {
  const store = createTestStore();

  render(
    <Provider store={store}>
      <MemoryRouter>
        <HomeContent />
      </MemoryRouter>
    </Provider>,
  );
};

describe('HomeContent landing chat integration', () => {
  it('does not show the chat widget before the navbar Chat action is used', () => {
    renderHomePage();

    expect(
      screen.queryByRole('region', { name: LANDING_CHAT_COPY.regionLabel }),
    ).not.toBeInTheDocument();
  });

  it('opens the chat widget from the desktop navbar Chat action', async () => {
    const user = userEvent.setup();
    renderHomePage();

    const chatButtons = screen.getAllByRole('button', { name: 'Chat' });
    await user.click(chatButtons[0]);

    expect(screen.getByRole('region', { name: LANDING_CHAT_COPY.regionLabel })).toBeInTheDocument();
    expect(screen.getByText(LANDING_CHAT_COPY.title)).toBeInTheDocument();
  });

  it('highlights the Chat action while the widget is open', async () => {
    const user = userEvent.setup();
    renderHomePage();

    const chatButton = screen.getAllByRole('button', { name: 'Chat' })[0];
    await user.click(chatButton);

    expect(chatButton).toHaveClass('text-brand-orange');
  });
});
