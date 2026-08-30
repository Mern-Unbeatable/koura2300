import { formatMsgTime } from './chatUtils';

const AVATAR_BASE = '/assets/admin/service-details';

const createRoom = ({
  id,
  name,
  avatar,
  lastMessage,
  lastMessageTime,
  online = false,
  hasUnread = false,
}) => ({
  id,
  otherUser: {
    id: `${id}-user`,
    name,
    avatar,
  },
  lastMessage,
  lastMessageTime,
  hasUnread,
  online,
});

const createMessage = (id, type, text, createdAt) => ({
  id,
  type,
  text,
  time: formatMsgTime(createdAt),
  createdAt,
  senderId: type === 'sent' ? 'admin' : 'user',
  isRead: true,
});

/** Figma Support / Messages mock conversations (existing ChatPanel room shape). */
export const ADMIN_CHAT_MOCK_ROOMS = [
  createRoom({
    id: 'techprint-hub',
    name: 'TechPrint Hub',
    avatar: `${AVATAR_BASE}/avatar-1.png`,
    lastMessage:
      "Gee, its been good news all day. i met someone special today. she's really pretty.",
    lastMessageTime: '2026-01-04T16:27:00.000Z',
    online: true,
  }),
  createRoom({
    id: '3d-maker-store',
    name: '3D Maker Store',
    avatar: `${AVATAR_BASE}/avatar-2.png`,
    lastMessage: 'Are you coming to class tomorrow? we have test.',
    lastMessageTime: '2026-01-04T16:12:00.000Z',
    online: true,
  }),
  createRoom({
    id: 'printify-zone',
    name: 'Printify Zone',
    avatar: `${AVATAR_BASE}/avatar-3.png`,
    lastMessage: 'I miss you dear, when are you coming to see me.',
    lastMessageTime: '2026-01-04T15:27:00.000Z',
  }),
  createRoom({
    id: 'gadgetforge',
    name: 'GadgetForge',
    avatar: `${AVATAR_BASE}/avatar-4.png`,
    lastMessage: 'Baba what sup na, you still de Lagos?',
    lastMessageTime: '2026-01-04T16:00:00.000Z',
  }),
  createRoom({
    id: 'megatech-mart',
    name: 'MegaTech Mart',
    avatar: `${AVATAR_BASE}/avatar-darrell.png`,
    lastMessage: 'Have you called them?',
    lastMessageTime: '2026-01-04T15:00:00.000Z',
  }),
  createRoom({
    id: 'printlab-pro',
    name: 'PrintLab Pro',
    avatar: `${AVATAR_BASE}/avatar-kathryn.png`,
    lastMessage: 'By brother is the best, na my helper be that oh.',
    lastMessageTime: '2026-01-04T13:02:00.000Z',
  }),
  createRoom({
    id: 'makers-market',
    name: "Maker's Market",
    avatar: `${AVATAR_BASE}/avatar-1.png`,
    lastMessage:
      'Landlady called a meeting by 3pm today, she wants to talk about the light issues. Be there!',
    lastMessageTime: '2026-01-04T11:22:00.000Z',
  }),
  createRoom({
    id: '3d-print-world-1',
    name: '3D Print World',
    avatar: `${AVATAR_BASE}/avatar-2.png`,
    lastMessage:
      'Lorem ipsum dolor sit amet consectetur. Eleifend condimentum mauris consequat tellus turpis vitae.',
    lastMessageTime: '2026-01-04T11:22:00.000Z',
  }),
  createRoom({
    id: '3d-print-world-2',
    name: '3D Print World',
    avatar: `${AVATAR_BASE}/avatar-3.png`,
    lastMessage:
      'Lorem ipsum dolor sit amet consectetur. Eleifend condimentum mauris consequat tellus turpis vitae.',
    lastMessageTime: '2026-01-04T11:22:00.000Z',
  }),
  createRoom({
    id: '3d-print-world-3',
    name: '3D Print World',
    avatar: `${AVATAR_BASE}/avatar-4.png`,
    lastMessage:
      'Lorem ipsum dolor sit amet consectetur. Eleifend condimentum mauris consequat tellus turpis vitae.',
    lastMessageTime: '2026-01-04T11:22:00.000Z',
  }),
  createRoom({
    id: '3d-print-world-4',
    name: '3D Print World',
    avatar: `${AVATAR_BASE}/avatar-darrell.png`,
    lastMessage:
      'Lorem ipsum dolor sit amet consectetur. Eleifend condimentum mauris consequat tellus turpis vitae.',
    lastMessageTime: '2026-01-04T11:22:00.000Z',
  }),
  createRoom({
    id: '3d-print-world-5',
    name: '3D Print World',
    avatar: `${AVATAR_BASE}/avatar-kathryn.png`,
    lastMessage:
      'Lorem ipsum dolor sit amet consectetur. Eleifend condimentum mauris consequat tellus turpis vitae.',
    lastMessageTime: '2026-01-04T11:22:00.000Z',
  }),
];

const LOREM_PREVIEW =
  'Lorem ipsum dolor sit amet consectetur. Eleifend condimentum mauris consequat tellus turpis vitae.';

/** Figma thread copy keyed by room id (existing ChatPanel message shape). */
export const ADMIN_CHAT_MOCK_MESSAGES_BY_ROOM_ID = {
  'techprint-hub': [
    createMessage('tp-1', 'received', 'Yo mandem', '2026-01-04T18:21:00.000Z'),
    createMessage('tp-2', 'received', 'Cho dey house?', '2026-01-04T18:21:00.000Z'),
    createMessage('tp-3', 'sent', 'Kwasia', '2026-01-04T18:22:00.000Z'),
    createMessage(
      'tp-4',
      'sent',
      'You dey hung dier you kai say house dey',
      '2026-01-04T18:22:00.000Z',
    ),
  ],
  '3d-maker-store': [
    createMessage(
      'ms-1',
      'received',
      'Are you coming to class tomorrow? we have test.',
      '2026-01-04T16:12:00.000Z',
    ),
  ],
  'printify-zone': [
    createMessage(
      'pz-1',
      'received',
      'I miss you dear, when are you coming to see me.',
      '2026-01-04T15:27:00.000Z',
    ),
  ],
  gadgetforge: [
    createMessage(
      'gf-1',
      'received',
      'Baba what sup na, you still de Lagos?',
      '2026-01-04T16:00:00.000Z',
    ),
  ],
  'megatech-mart': [
    createMessage('mm-1', 'received', 'Have you called them?', '2026-01-04T15:00:00.000Z'),
  ],
  'printlab-pro': [
    createMessage(
      'pl-1',
      'received',
      'By brother is the best, na my helper be that oh.',
      '2026-01-04T13:02:00.000Z',
    ),
  ],
  'makers-market': [
    createMessage(
      'mk-1',
      'received',
      'Landlady called a meeting by 3pm today, she wants to talk about the light issues. Be there!',
      '2026-01-04T11:22:00.000Z',
    ),
  ],
  '3d-print-world-1': [
    createMessage('pw1-1', 'received', LOREM_PREVIEW, '2026-01-04T11:22:00.000Z'),
  ],
  '3d-print-world-2': [
    createMessage('pw2-1', 'received', LOREM_PREVIEW, '2026-01-04T11:22:00.000Z'),
  ],
  '3d-print-world-3': [
    createMessage('pw3-1', 'received', LOREM_PREVIEW, '2026-01-04T11:22:00.000Z'),
  ],
  '3d-print-world-4': [
    createMessage('pw4-1', 'received', LOREM_PREVIEW, '2026-01-04T11:22:00.000Z'),
  ],
  '3d-print-world-5': [
    createMessage('pw5-1', 'received', LOREM_PREVIEW, '2026-01-04T11:22:00.000Z'),
  ],
};

export const getAdminChatMockMessages = (roomId) =>
  ADMIN_CHAT_MOCK_MESSAGES_BY_ROOM_ID[roomId] ?? [];
