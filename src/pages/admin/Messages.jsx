import { memo } from 'react';
import { useSEO } from '../../hooks/useSEO';
import ChatPanel from '../../components/chat/ChatPanel';

/**
 * Fill the admin scrollport without forcing Layout to h-full (that stretched every page).
 * Accounts for mobile header (3.5rem) + content padding (py-5 / sm:py-6 / lg:py-8).
 */
const MESSAGES_PAGE_HEIGHT_CLASS =
  'h-[calc(100dvh-6rem)] sm:h-[calc(100dvh-6.5rem)] lg:h-[calc(100dvh-4rem)]';

const Messages = memo(() => {
  useSEO({
    title: 'Messages | Admin',
    description: 'Manage conversations with users and clients.',
    keywords: ['messages', 'chat', 'admin', 'conversations'],
  });

  return (
    <div className={`flex ${MESSAGES_PAGE_HEIGHT_CLASS} min-h-0 flex-col overflow-hidden`}>
      <div className="mb-4 shrink-0">
        <h1 className="text-2xl font-bold text-gray-900">Messages</h1>
        <p className="mt-1 text-sm text-gray-500">
          Conversations with users and clients.
        </p>
      </div>
      <ChatPanel mode="admin" className="min-h-0 flex-1" />
    </div>
  );
});

Messages.displayName = 'AdminMessages';

export default Messages;
