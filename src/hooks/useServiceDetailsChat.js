import { useCallback, useMemo, useRef, useState } from 'react';
import { formatMsgTime } from '../components/chat/chatUtils';
import { SERVICE_DETAILS_CONTENT } from '../components/serviceDetails/serviceDetailsCopy';
import {
  SERVICE_CHAT_SEED_MESSAGES,
  buildServiceChatOffer,
  formatServiceChatTimestamp,
} from '../components/serviceDetails/serviceDetailsData';

const createSentMessage = (text) => ({
  id: `sent-${Date.now()}`,
  type: 'sent',
  text,
  time: formatMsgTime(new Date().toISOString()),
  position: 'single',
});

const useServiceDetailsChat = ({ service, selectedPackage }) => {
  const [messages, setMessages] = useState(SERVICE_CHAT_SEED_MESSAGES);
  const [inputValue, setInputValue] = useState('');
  const inputRef = useRef(null);

  const timestamp = useMemo(() => formatServiceChatTimestamp(), []);
  const offer = useMemo(() => buildServiceChatOffer({ selectedPackage }), [selectedPackage]);

  const handleInputChange = useCallback((event) => {
    setInputValue(event.target.value);
  }, []);

  const handleSend = useCallback(() => {
    const text = inputValue.trim();
    if (!text) {
      return;
    }

    setMessages((previousMessages) => [...previousMessages, createSentMessage(text)]);
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
    messages,
    inputValue,
    inputRef,
    timestamp,
    offer,
    copy: SERVICE_DETAILS_CONTENT.chat,
    handleInputChange,
    handleSend,
    handleKeyDown,
  };
};

export default useServiceDetailsChat;
