import React, { memo, useRef } from 'react';
import { Bot, Send, X } from 'lucide-react';
import useLandingChatScrollIsolation from '../../../hooks/useLandingChatScrollIsolation';
import { LANDING_CHAT_COPY } from './landingChatCopy';
import {
  LANDING_CHAT_ASSISTANT_BUBBLE_CLASS,
  LANDING_CHAT_CLOSE_ICON_SIZE,
  LANDING_CHAT_COMPOSER_ROW_CLASS,
  LANDING_CHAT_COMPOSER_WRAP_CLASS,
  LANDING_CHAT_HEADER_CLASS,
  LANDING_CHAT_HEADER_ICON_SIZE,
  LANDING_CHAT_INPUT_CLASS,
  LANDING_CHAT_MESSAGE_TYPES,
  LANDING_CHAT_MESSAGES_CLASS,
  LANDING_CHAT_PANEL_CLASS,
  LANDING_CHAT_SEND_BUTTON_CLASS,
  LANDING_CHAT_SEND_ICON_SIZE,
  LANDING_CHAT_TIME_CLASS,
  LANDING_CHAT_TITLE_CLASS,
  LANDING_CHAT_USER_BUBBLE_CLASS,
  LANDING_CHAT_USER_TIME_CLASS,
} from './landingChatData';
import LandingChatProductsMessage from './LandingChatProductsMessage';

const AssistantMessage = memo(({ message }) => (
  <div className="flex justify-start">
    <div className={LANDING_CHAT_ASSISTANT_BUBBLE_CLASS}>
      <p>{message.text}</p>
      <p className={LANDING_CHAT_TIME_CLASS}>{message.time}</p>
    </div>
  </div>
));

AssistantMessage.displayName = 'AssistantMessage';

const UserMessage = memo(({ message }) => (
  <div className="flex justify-end">
    <div className={LANDING_CHAT_USER_BUBBLE_CLASS}>
      <p>{message.text}</p>
      <p className={LANDING_CHAT_USER_TIME_CLASS}>{message.time}</p>
    </div>
  </div>
));

UserMessage.displayName = 'UserMessage';

const LandingChatMessage = memo(({ message }) => {
  if (message.type === LANDING_CHAT_MESSAGE_TYPES.PRODUCTS) {
    return <LandingChatProductsMessage message={message} />;
  }

  if (message.type === LANDING_CHAT_MESSAGE_TYPES.USER) {
    return <UserMessage message={message} />;
  }

  return <AssistantMessage message={message} />;
});

LandingChatMessage.displayName = 'LandingChatMessage';

const LandingChatComposer = memo(({ inputRef, inputValue, onChange, onKeyDown, onSend }) => (
  <div className={LANDING_CHAT_COMPOSER_WRAP_CLASS}>
    <div className={LANDING_CHAT_COMPOSER_ROW_CLASS}>
      <input
        ref={inputRef}
        type="text"
        value={inputValue}
        onChange={onChange}
        onKeyDown={onKeyDown}
        placeholder={LANDING_CHAT_COPY.inputPlaceholder}
        aria-label={LANDING_CHAT_COPY.inputLabel}
        className={LANDING_CHAT_INPUT_CLASS}
      />
      <button
        type="button"
        onClick={onSend}
        disabled={!inputValue.trim()}
        aria-label={LANDING_CHAT_COPY.sendLabel}
        className={LANDING_CHAT_SEND_BUTTON_CLASS}
      >
        <Send size={LANDING_CHAT_SEND_ICON_SIZE} aria-hidden="true" />
      </button>
    </div>
  </div>
));

LandingChatComposer.displayName = 'LandingChatComposer';

const LandingChatWidget = memo(
  ({
    messages,
    inputValue,
    inputRef,
    onClose,
    onInputChange,
    onSend,
    onKeyDown,
  }) => {
    const panelRef = useRef(null);
    const messagesRef = useRef(null);
    useLandingChatScrollIsolation(panelRef, messagesRef);

    return (
      <section
        ref={panelRef}
        role="region"
        aria-label={LANDING_CHAT_COPY.regionLabel}
        className={LANDING_CHAT_PANEL_CLASS}
      >
        <header className={LANDING_CHAT_HEADER_CLASS}>
          <div className="flex min-w-0 items-center gap-2">
            <Bot size={LANDING_CHAT_HEADER_ICON_SIZE} className="shrink-0 text-white" aria-hidden="true" />
            <h2 className={LANDING_CHAT_TITLE_CLASS}>{LANDING_CHAT_COPY.title}</h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label={LANDING_CHAT_COPY.closeLabel}
            className="cursor-pointer rounded-md p-1 text-white transition-colors hover:text-[#fef5e7] focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
          >
            <X size={LANDING_CHAT_CLOSE_ICON_SIZE} aria-hidden="true" />
          </button>
        </header>

        <div ref={messagesRef} className={LANDING_CHAT_MESSAGES_CLASS}>
          {messages.map((message) => (
            <LandingChatMessage key={message.id} message={message} />
          ))}
        </div>

        <LandingChatComposer
          inputRef={inputRef}
          inputValue={inputValue}
          onChange={onInputChange}
          onKeyDown={onKeyDown}
          onSend={onSend}
        />
      </section>
    );
  },
);

LandingChatWidget.displayName = 'LandingChatWidget';

export default LandingChatWidget;
