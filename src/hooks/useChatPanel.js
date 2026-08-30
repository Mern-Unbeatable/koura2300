import { useState, useCallback, useEffect, useRef, useMemo } from 'react';
import { useSelector } from 'react-redux';
import toast from 'react-hot-toast';
import { useSocket } from './useSocket';
import { socket } from '../services/socket';
import { httpMethods } from '../services/httpMethods';
import API_ENDPOINTS from '../services/httpEndpoint';
import {
  MESSAGE_POLL_MS,
  TYPING_STOP_MS,
  formatMsgTime,
  normalizeRoom,
  normalizeMessage,
  groupMessages,
} from '../components/chat/chatUtils';
import {
  ADMIN_CHAT_MOCK_ROOMS,
  getAdminChatMockMessages,
} from '../components/chat/adminChatMockData';

/**
 * Orchestrates chat rooms, messages, polling, and socket events.
 * Keeps ChatPanel focused on presentation.
 * Admin Support / Messages uses Figma mock data (no API) until live rooms ship.
 */
export function useChatPanel(mode = 'user') {
  const currentUser = useSelector((state) => state.auth.user);
  const isAdmin = mode === 'admin';
  const currentUserId = currentUser?.id;

  const [rooms, setRooms] = useState([]);
  const [activeRoomId, setActiveRoomId] = useState(null);
  const [messages, setMessages] = useState([]);
  const [loadingRooms, setLoadingRooms] = useState(true);
  const [loadingMsgs, setLoadingMsgs] = useState(false);
  const [isOtherTyping, setIsOtherTyping] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [showSidebar, setShowSidebar] = useState(true);

  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);
  const typingTimeoutRef = useRef(null);
  const adminRoomIdsRef = useRef(new Set());
  const justLoadedRef = useRef(false);
  const activeRoomRequestRef = useRef(0);
  const roomsRequestRef = useRef(0);

  const toRoom = useCallback(
    (room) => normalizeRoom(room, currentUserId),
    [currentUserId],
  );

  const toMessage = useCallback(
    (msg) => normalizeMessage(msg, currentUserId),
    [currentUserId],
  );

  useEffect(() => {
    if (isAdmin) {
      setRooms(ADMIN_CHAT_MOCK_ROOMS);
      setActiveRoomId(ADMIN_CHAT_MOCK_ROOMS[0]?.id ?? null);
      setLoadingRooms(false);
      return undefined;
    }

    if (!currentUser) return undefined;

    const requestId = ++roomsRequestRef.current;
    let cancelled = false;

    const load = async () => {
      setLoadingRooms(true);

      const { data, error } = await httpMethods.post(API_ENDPOINTS.CHAT.ROOM, {});
      if (cancelled || requestId !== roomsRequestRef.current) return;

      if (error) {
        toast.error(error?.data?.message || error?.message || 'Failed to open chat.');
      } else {
        const room = data?.data;
        if (room) {
          setRooms([toRoom(room)]);
          setActiveRoomId(room.id);
        }
      }

      if (!cancelled && requestId === roomsRequestRef.current) {
        setLoadingRooms(false);
      }
    };

    load();
    return () => {
      cancelled = true;
    };
  }, [currentUser, isAdmin, toRoom]);

  useEffect(() => {
    if (!isAdmin || adminRoomIdsRef.current.size === 0) return;
    adminRoomIdsRef.current.forEach((id) => {
      socket.emit('conversation:join', id);
    });
  }, [isAdmin, activeRoomId]);

  useEffect(() => {
    if (!isAdmin) return undefined;
    const joinedRoomIds = adminRoomIdsRef.current;
    const rejoinAll = () => {
      joinedRoomIds.forEach((id) => {
        socket.emit('conversation:join', id);
      });
    };
    socket.on('connect', rejoinAll);
    return () => {
      socket.off('connect', rejoinAll);
      joinedRoomIds.forEach((id) => {
        socket.emit('conversation:leave', id);
      });
      joinedRoomIds.clear();
    };
  }, [isAdmin]);

  useEffect(() => {
    if (!activeRoomId) return undefined;

    if (isAdmin) {
      justLoadedRef.current = true;
      setMessages(getAdminChatMockMessages(activeRoomId));
      setLoadingMsgs(false);
      setIsOtherTyping(false);
      return undefined;
    }

    const requestId = ++activeRoomRequestRef.current;
    let cancelled = false;

    const load = async () => {
      setLoadingMsgs(true);
      setMessages([]);
      setIsOtherTyping(false);

      const { data, error } = await httpMethods.get(
        API_ENDPOINTS.CHAT.MESSAGES(activeRoomId),
      );
      if (cancelled || requestId !== activeRoomRequestRef.current) return;

      if (error) {
        toast.error(
          error?.data?.message || error?.message || 'Failed to load messages.',
        );
      } else {
        const list = data?.data ?? [];
        justLoadedRef.current = true;
        setMessages(list.map(toMessage));

        const lastMsg = list.length > 0 ? list[list.length - 1] : null;
        setRooms((prev) =>
          prev.map((r) =>
            String(r.id) === String(activeRoomId)
              ? {
                  ...r,
                  hasUnread: false,
                  ...(lastMsg && {
                    lastMessage: lastMsg.content,
                    lastMessageTime: lastMsg.createdAt,
                  }),
                }
              : r,
          ),
        );
      }

      if (!cancelled && requestId === activeRoomRequestRef.current) {
        setLoadingMsgs(false);
      }
      httpMethods.put(API_ENDPOINTS.CHAT.MARK_READ(activeRoomId), {});
    };

    load();
    return () => {
      cancelled = true;
    };
  }, [activeRoomId, isAdmin, toMessage]);

  useEffect(() => {
    if (!messagesEndRef.current || messages.length === 0) return;
    const behavior = justLoadedRef.current ? 'instant' : 'smooth';
    justLoadedRef.current = false;
    messagesEndRef.current.scrollIntoView({ behavior });
  }, [messages.length]);

  useEffect(() => () => clearTimeout(typingTimeoutRef.current), []);

  useEffect(() => {
    if (!activeRoomId || isAdmin) return undefined;
    let inFlight = false;
    const poll = setInterval(async () => {
      if (inFlight) return;
      inFlight = true;
      try {
        const { data } = await httpMethods.get(
          API_ENDPOINTS.CHAT.MESSAGES(activeRoomId),
        );
        if (!data) return;
        const incoming = (data?.data ?? []).map(toMessage);
        setMessages((prev) => {
          if (prev.some((m) => String(m.id).startsWith('temp-'))) return prev;
          if (incoming.length <= prev.length) return prev;
          return incoming;
        });
      } finally {
        inFlight = false;
      }
    }, MESSAGE_POLL_MS);
    return () => clearInterval(poll);
  }, [activeRoomId, isAdmin, toMessage]);

  const handleSocketMessage = useCallback(
    (payload) => {
      const conversationId = payload?.conversationId ?? payload?.roomId;
      const message = payload?.message ?? payload?.data;

      if (!message || !conversationId) return;

      const senderId = message?.sender?.id;
      if (
        senderId != null &&
        currentUserId != null &&
        String(senderId) === String(currentUserId)
      ) {
        return;
      }

      const normalized = toMessage(message);
      const sConv = String(conversationId);
      const sActive = String(activeRoomId);

      if (sConv === sActive) {
        setMessages((prev) => [...prev, normalized]);
        httpMethods.put(API_ENDPOINTS.CHAT.MARK_READ(conversationId), {});
      }

      setRooms((prev) =>
        prev.map((r) =>
          String(r.id) === sConv
            ? {
                ...r,
                lastMessage: message.content,
                lastMessageTime: message.createdAt,
                hasUnread: sConv !== sActive,
              }
            : r,
        ),
      );
    },
    [activeRoomId, currentUserId, toMessage],
  );

  const handleTypingStart = useCallback(
    ({ conversationId }) => {
      if (String(conversationId) === String(activeRoomId)) setIsOtherTyping(true);
    },
    [activeRoomId],
  );

  const handleTypingStop = useCallback(
    ({ conversationId }) => {
      if (String(conversationId) === String(activeRoomId)) setIsOtherTyping(false);
    },
    [activeRoomId],
  );

  const handleUserOnline = useCallback(({ userId }) => {
    setRooms((prev) =>
      prev.map((r) =>
        String(r.otherUser.id) === String(userId) ? { ...r, online: true } : r,
      ),
    );
  }, []);

  const handleUserOffline = useCallback(({ userId }) => {
    setRooms((prev) =>
      prev.map((r) =>
        String(r.otherUser.id) === String(userId) ? { ...r, online: false } : r,
      ),
    );
  }, []);

  const { sendTyping } = useSocket({
    conversationId: activeRoomId,
    onMessage: handleSocketMessage,
    onTypingStart: handleTypingStart,
    onTypingStop: handleTypingStop,
    onUserOnline: handleUserOnline,
    onUserOffline: handleUserOffline,
  });

  const messageGroups = useMemo(() => groupMessages(messages), [messages]);
  const activeRoom = rooms.find((r) => r.id === activeRoomId);

  const handleSelectRoom = useCallback((id) => {
    setActiveRoomId(id);
    setShowSidebar(false);
    setInputValue('');
  }, []);

  const handleInputChange = useCallback(
    (e) => {
      setInputValue(e.target.value);
      sendTyping(true);
      clearTimeout(typingTimeoutRef.current);
      typingTimeoutRef.current = setTimeout(() => sendTyping(false), TYPING_STOP_MS);
    },
    [sendTyping],
  );

  const handleSend = useCallback(async () => {
    const text = inputValue.trim();
    if (!text || !activeRoomId) return;

    const createdAt = new Date().toISOString();
    const tempId = `temp-${Date.now()}`;
    const optimistic = {
      id: tempId,
      type: 'sent',
      text,
      time: formatMsgTime(createdAt),
      createdAt,
      senderId: currentUserId,
      isRead: false,
    };
    setMessages((prev) => [...prev, optimistic]);
    setInputValue('');
    inputRef.current?.focus();
    sendTyping(false);
    clearTimeout(typingTimeoutRef.current);

    setRooms((prev) =>
      prev.map((r) =>
        r.id === activeRoomId
          ? {
              ...r,
              lastMessage: text,
              lastMessageTime: createdAt,
            }
          : r,
      ),
    );

    if (isAdmin) {
      return;
    }

    const { data, error } = await httpMethods.post(
      API_ENDPOINTS.CHAT.SEND_MESSAGE(activeRoomId),
      { content: text },
    );

    if (error) {
      setMessages((prev) => prev.filter((m) => m.id !== tempId));
      setInputValue(text);
      toast.error(error?.data?.message || error?.message || 'Failed to send message.');
      return;
    }

    const real = toMessage(data?.data ?? {});
    const confirmed = real.time ? real : { ...real, time: optimistic.time };
    setMessages((prev) => prev.map((m) => (m.id === tempId ? confirmed : m)));

    setRooms((prev) =>
      prev.map((r) =>
        r.id === activeRoomId
          ? {
              ...r,
              lastMessage: text,
              lastMessageTime: data?.data?.createdAt ?? new Date().toISOString(),
            }
          : r,
      ),
    );
  }, [inputValue, activeRoomId, currentUserId, isAdmin, sendTyping, toMessage]);

  const handleKeyDown = useCallback(
    (e) => {
      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        handleSend();
      }
    },
    [handleSend],
  );

  const handleBackToSidebar = useCallback(() => setShowSidebar(true), []);

  return {
    isAdmin,
    rooms,
    activeRoomId,
    activeRoom,
    loadingRooms,
    loadingMsgs,
    isOtherTyping,
    inputValue,
    showSidebar,
    messagesEndRef,
    inputRef,
    messageGroups,
    handleSelectRoom,
    handleInputChange,
    handleSend,
    handleKeyDown,
    handleBackToSidebar,
  };
}
