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
  const [offer, setOffer] = useState(() => session?.offer ?? null);
  const [inputValue, setInputValue] = useState('');
  const [isCreateOfferOpen, setIsCreateOfferOpen] = useState(false);
  const inputRef = useRef(null);

  useBodyScrollLock(Boolean(bookingId));

  const handleCloseCreateOffer = useCallback(() => {
    setIsCreateOfferOpen(false);
  }, []);

  const handleEscape = useCallback(() => {
    if (isCreateOfferOpen) {
      handleCloseCreateOffer();
      return;
    }

    onClose();
  }, [handleCloseCreateOffer, isCreateOfferOpen, onClose]);

  useEscapeKey(Boolean(bookingId), handleEscape);

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
    setIsCreateOfferOpen(true);
  }, []);

  const handleSendCreateOffer = useCallback((nextOffer) => {
    setOffer(nextOffer);
  }, []);

  const handlePayNow = useCallback(() => {
    toast.success(BOOKINGS_CHAT_COPY.payNowToast);
  }, []);

  return {
    session,
    messages,
    offer,
    inputValue,
    inputRef,
    isCreateOfferOpen,
    copy: BOOKINGS_CHAT_COPY,
    handleInputChange,
    handleSend,
    handleKeyDown,
    handleCreateOffer,
    handleCloseCreateOffer,
    handleSendCreateOffer,
    handlePayNow,
  };
};

export default useAdminBookingsChat;
