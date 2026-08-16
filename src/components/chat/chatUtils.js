export const MESSAGE_POLL_MS = 4000;
export const ROOM_POLL_MS = 8000;
export const TYPING_STOP_MS = 1500;

export const getInitials = (name = '') =>
  name
    .split(' ')
    .slice(0, 2)
    .map((w) => w[0]?.toUpperCase() ?? '')
    .join('');

export const formatMsgTime = (iso) => {
  if (!iso) return '';
  return new Date(iso).toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit',
  });
};

export const formatSidebarTime = (iso) => {
  if (!iso) return '';
  const d = new Date(iso);
  const now = new Date();
  if (d.toDateString() === now.toDateString()) {
    return d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  }
  const yesterday = new Date(now);
  yesterday.setDate(yesterday.getDate() - 1);
  if (d.toDateString() === yesterday.toDateString()) return 'Yesterday';
  return d.toLocaleDateString([], { month: 'short', day: 'numeric' });
};

export const normalizeRoom = (room, currentUserId) => {
  const other = room.participants?.find(
    (p) => String(p.userId) !== String(currentUserId),
  );
  const lastMsg = Array.isArray(room.messages) ? room.messages[0] : null;
  const hasUnread =
    lastMsg != null &&
    !lastMsg.isRead &&
    String(lastMsg.sender?.id) !== String(currentUserId);

  return {
    id: room.id,
    otherUser: {
      id: other?.user?.id ?? null,
      name: other?.user?.name ?? 'Unknown',
      avatar: other?.user?.profileImage ?? null,
    },
    lastMessage: lastMsg?.content ?? '',
    lastMessageTime: lastMsg?.createdAt ?? room.updatedAt ?? null,
    hasUnread,
    online: false,
  };
};

export const normalizeMessage = (msg, currentUserId) => ({
  id: msg.id,
  type: String(msg.sender?.id) === String(currentUserId) ? 'sent' : 'received',
  text: msg.content,
  time: formatMsgTime(msg.createdAt),
  senderId: msg.sender?.id,
  isRead: msg.isRead,
});

export const computePositions = (messages) =>
  messages.map((msg, i) => {
    const prev = messages[i - 1];
    const next = messages[i + 1];
    const samePrev = prev && prev.type === msg.type;
    const sameNext = next && next.type === msg.type;
    let position;
    if (!samePrev && !sameNext) position = 'single';
    else if (!samePrev && sameNext) position = 'first';
    else if (samePrev && sameNext) position = 'middle';
    else position = 'last';
    return { ...msg, position };
  });

export const getBubbleCorners = (type, position) => {
  if (type === 'received') {
    if (position === 'single') return 'rounded-[32px]';
    if (position === 'first') {
      return 'rounded-tl-[32px] rounded-tr-[32px] rounded-br-[32px] rounded-bl-[4px]';
    }
    if (position === 'middle') {
      return 'rounded-tl-[4px] rounded-tr-[32px] rounded-br-[32px] rounded-bl-[4px]';
    }
    return 'rounded-tl-[4px] rounded-tr-[32px] rounded-br-[32px] rounded-bl-[32px]';
  }
  if (position === 'single') return 'rounded-[32px]';
  if (position === 'first') {
    return 'rounded-tl-[32px] rounded-tr-[32px] rounded-br-[4px] rounded-bl-[32px]';
  }
  if (position === 'middle') {
    return 'rounded-tl-[32px] rounded-tr-[4px] rounded-br-[4px] rounded-bl-[32px]';
  }
  return 'rounded-tl-[32px] rounded-tr-[4px] rounded-br-[32px] rounded-bl-[32px]';
};

export const groupMessages = (messages) => {
  const positioned = computePositions(messages);
  const groups = [];
  let current = null;
  for (const msg of positioned) {
    if (!current || current.type !== msg.type) {
      current = { type: msg.type, messages: [msg] };
      groups.push(current);
    } else {
      current.messages.push(msg);
    }
  }
  return groups;
};
