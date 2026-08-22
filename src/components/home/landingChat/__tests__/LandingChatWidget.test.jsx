import React from 'react';
import { configureStore } from '@reduxjs/toolkit';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import useLandingChat from '../../../../hooks/useLandingChat';
import cartReducer from '../../../../store/slices/cartSlice';
import LandingChatWidget from '../LandingChatWidget';
import { LANDING_CHAT_COPY } from '../landingChatCopy';

const createTestStore = () =>
  configureStore({
    reducer: {
      cart: cartReducer,
    },
  });

const ChatTestHost = ({ onClose }) => {
  const chat = useLandingChat();

  return (
    <LandingChatWidget
      messages={chat.messages}
      inputValue={chat.inputValue}
      inputRef={chat.inputRef}
      onClose={onClose ?? chat.closeChat}
      onInputChange={chat.handleInputChange}
      onSend={chat.handleSend}
      onKeyDown={chat.handleKeyDown}
    />
  );
};

const renderChatWidget = (onClose) => {
  const store = createTestStore();

  render(
    <Provider store={store}>
      <MemoryRouter>
        <ChatTestHost onClose={onClose} />
      </MemoryRouter>
    </Provider>,
  );

  return { onClose };
};

describe('LandingChatWidget', () => {
  it('renders the assistant chat region with Figma title', () => {
    renderChatWidget();

    expect(screen.getByRole('region', { name: LANDING_CHAT_COPY.regionLabel })).toBeInTheDocument();
    expect(screen.getByText(LANDING_CHAT_COPY.title)).toBeInTheDocument();
  });

  it('renders seed conversation content from the design', () => {
    renderChatWidget();

    expect(screen.getByText(LANDING_CHAT_COPY.welcomeMessage)).toBeInTheDocument();
    expect(screen.getByText('LED Lighting System')).toBeInTheDocument();
    expect(screen.getByText('Ceiling light installation')).toBeInTheDocument();
    expect(screen.getByText('Standard LED Lighting Kit')).toBeInTheDocument();
    expect(screen.getByText('Premium LED Light System')).toBeInTheDocument();
    expect(screen.getByText(LANDING_CHAT_COPY.helpMaterialsMessage)).toBeInTheDocument();
    expect(screen.getByText(LANDING_CHAT_COPY.promptMessage)).toBeInTheDocument();
  });

  it('uses responsive panel positioning classes', () => {
    renderChatWidget();

    const panel = screen.getByRole('region', { name: LANDING_CHAT_COPY.regionLabel });
    expect(panel).toHaveClass('min-[768px]:w-[570px]');
    expect(panel).toHaveClass('max-[767px]:inset-0');
    expect(panel).toHaveClass('min-[768px]:top-36');
  });

  it('closes when the close button is clicked', async () => {
    const user = userEvent.setup();
    const onClose = jest.fn();
    renderChatWidget(onClose);

    await user.click(screen.getByRole('button', { name: LANDING_CHAT_COPY.closeLabel }));

    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it('sends a user message when the composer is submitted', async () => {
    const user = userEvent.setup();
    renderChatWidget();

    const input = screen.getByRole('textbox', { name: LANDING_CHAT_COPY.inputLabel });
    await user.type(input, 'Copper wiring');
    await user.click(screen.getByRole('button', { name: LANDING_CHAT_COPY.sendLabel }));

    expect(screen.getByText('Copper wiring')).toBeInTheDocument();
    expect(input).toHaveValue('');
  });

  it('sends a user message when Enter is pressed', async () => {
    const user = userEvent.setup();
    renderChatWidget();

    const input = screen.getByRole('textbox', { name: LANDING_CHAT_COPY.inputLabel });
    await user.type(input, 'PVC pipes{Enter}');

    expect(screen.getByText('PVC pipes')).toBeInTheDocument();
  });

  it('disables send when the input is empty', () => {
    renderChatWidget();

    expect(screen.getByRole('button', { name: LANDING_CHAT_COPY.sendLabel })).toBeDisabled();
  });

  it('renders product prices with the design prefix', () => {
    renderChatWidget();

    const prices = screen.getAllByText(/\$100\.00/);
    expect(prices.length).toBeGreaterThanOrEqual(3);
    prices.forEach((price) => {
      expect(price).toHaveTextContent('Price:');
    });
  });

  it('renders the composer placeholder from Figma', () => {
    renderChatWidget();

    expect(
      screen.getByPlaceholderText(LANDING_CHAT_COPY.inputPlaceholder),
    ).toBeInTheDocument();
  });
});
