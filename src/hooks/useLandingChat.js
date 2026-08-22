import { useCallback, useMemo, useRef, useState } from 'react';
import { formatMsgTime } from '../components/chat/chatUtils';
import { LANDING_CHAT_COPY } from '../components/home/landingChat/landingChatCopy';
import {
  LANDING_CHAT_MESSAGE_TYPES,
  LANDING_CHAT_SEED_MESSAGES,
} from '../components/home/landingChat/landingChatData';
import useBodyScrollLock from './useBodyScrollLock';
import useEscapeKey from './useEscapeKey';

const createUserMessage = (text) => ({
  id: `user-${Date.now()}`,
  type: LANDING_CHAT_MESSAGE_TYPES.USER,
  text,
  time: formatMsgTime(new Date().toISOString()),
});

const resolveMessageText = (message) => {
  if (message.text) {
    return message.text;
  }

  return message.textKey ? LANDING_CHAT_COPY[message.textKey] : '';
};

const useLandingChat = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState(LANDING_CHAT_SEED_MESSAGES);
  const [inputValue, setInputValue] = useState('');
  const inputRef = useRef(null);

  const openChat = useCallback(() => {
    setIsOpen(true);
  }, []);

  const closeChat = useCallback(() => {
    setIsOpen(false);
  }, []);

  const toggleChat = useCallback(() => {
    setIsOpen((current) => !current);
  }, []);

  useBodyScrollLock(isOpen);
  useEscapeKey(isOpen, closeChat);

  const resolvedMessages = useMemo(
    () =>
      messages.map((message) => ({
        ...message,
        text: resolveMessageText(message),
      })),
    [messages],
  );

  const handleInputChange = useCallback((event) => {
    setInputValue(event.target.value);
  }, []);

  const handleSend = useCallback(() => {
    const text = inputValue.trim();
    if (!text) {
      return;
    }

    setMessages((currentMessages) => [...currentMessages, createUserMessage(text)]);
    setInputValue('');
    inputRef.current?.focus();
  }, [inputValue]);

  const handleKeyDown = useCallback(
    (event) => {
      if (event.key === 'Enter' && !event.shiftKey) {
        event.preventDefault();
        handleSend();
      }
    },
    [handleSend],
  );

  return {
    isOpen,
    messages: resolvedMessages,
    inputValue,
    inputRef,
    openChat,
    closeChat,
    toggleChat,
    handleInputChange,
    handleSend,
    handleKeyDown,
  };
};

export default useLandingChat;
