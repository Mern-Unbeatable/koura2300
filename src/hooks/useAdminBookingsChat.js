import { useCallback, useMemo, useRef, useState } from 'react';
import toast from 'react-hot-toast';
import { BOOKINGS_CHAT_COPY } from '../components/admin/bookingsChat/bookingsChatCopy';
import {
  createBookingsChatSentMessage,
  getBookingsChatSession,
} from '../components/admin/bookingsChat/bookingsChatUtils';
import useBodyScrollLock from './useBodyScrollLock';
import useEscapeKey from './useEscapeKey';

const useAdminBookingsChat = ({ bookingId, onClose }) => {
  const session = useMemo(() => getBookingsChatSession(bookingId), [bookingId]);
  const [messages, setMessages] = useState(() => session?.messages ?? []);
  const [inputValue, setInputValue] = useState('');
  const inputRef = useRef(null);

  useBodyScrollLock(Boolean(bookingId));
  useEscapeKey(Boolean(bookingId), onClose);

  const handleInputChange = useCallback((event) => {
    setInputValue(event.target.value);
  }, []);

  const handleSend = useCallback(() => {
    const text = inputValue.trim();
    if (!text) {
      return;
    }

    setMessages((previousMessages) => [...previousMessages, createBookingsChatSentMessage(text)]);
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

  const handleCreateOffer = useCallback(() => {
    toast.success(BOOKINGS_CHAT_COPY.createOfferToast);
  }, []);

  const handlePayNow = useCallback(() => {
    toast.success(BOOKINGS_CHAT_COPY.payNowToast);
  }, []);

  return {
    session,
    messages,
    inputValue,
    inputRef,
    copy: BOOKINGS_CHAT_COPY,
    handleInputChange,
    handleSend,
    handleKeyDown,
    handleCreateOffer,
    handlePayNow,
  };
};

export default useAdminBookingsChat;
