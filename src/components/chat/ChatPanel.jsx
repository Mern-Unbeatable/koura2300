import React, { memo, useCallback } from 'react';
import { Send, ArrowLeft } from 'lucide-react';
import { useChatPanel } from '../../hooks/useChatPanel';
import {
  getInitials,
  formatSidebarTime,
  getBubbleCorners,
  CONVERSATION_DAY_TYPE,
} from './chatUtils';

const CONVERSATION_DAY_CLASS =
  'flex flex-wrap items-center justify-center gap-2 py-2 text-xs font-medium tracking-[0.5px] text-gray-400 sm:gap-3 sm:text-base';

const Avatar = memo(({ src, name, size = 'md', online }) => {
  const sizeClass = size === 'sm' ? 'size-9' : 'size-12';
  const rounded = size === 'sm' ? 'rounded-full' : 'rounded-2xl';
  return (
    <div className={`relative shrink-0 ${sizeClass}`}>
      {src ? (
        <img
          src={src}
          alt={name}
          className={`${sizeClass} ${rounded} object-cover`}
          loading="lazy"
        />
      ) : (
        <div
          className={`${sizeClass} ${rounded} bg-orange-100 flex items-center justify-center text-orange-600 font-semibold text-sm select-none`}
        >
          {getInitials(name)}
        </div>
      )}
      {online === true && (
        <span className="absolute bottom-0 right-0 size-2.5 rounded-full border-2 border-white bg-green-500" />
      )}
    </div>
  );
});
Avatar.displayName = 'Avatar';

const ConversationItem = memo(({ room, isActive, onClick, showOnline }) => {
  const handleClick = useCallback(() => onClick(room.id), [room.id, onClick]);
  return (
    <button
      type="button"
      onClick={handleClick}
      className={`w-full flex gap-3 items-start px-4 py-4 text-left transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-orange-500 cursor-pointer ${
        isActive ? 'bg-white' : 'bg-gray-200 hover:bg-gray-100'
      }`}
      aria-pressed={isActive}
    >
      <Avatar
        src={room.otherUser.avatar}
        name={room.otherUser.name}
        online={showOnline ? room.online : undefined}
      />
      <div className="flex-1 min-w-0 flex flex-col gap-1">
        <div className="flex items-center justify-between gap-2">
          <span className="font-semibold text-[16px] text-gray-900 tracking-[0.286px] truncate leading-normal">
            {room.otherUser.name}
          </span>
          {room.lastMessageTime && (
            <span className="text-xs text-gray-400 shrink-0">
              {formatSidebarTime(room.lastMessageTime)}
            </span>
          )}
        </div>
        <p
          className={`text-[14px] leading-5 line-clamp-1 ${
            room.hasUnread ? 'font-semibold text-gray-800' : 'text-gray-500'
          }`}
        >
          {room.lastMessage || 'No messages yet'}
        </p>
        {room.hasUnread && <span className="self-end size-2 rounded-full bg-orange-500" />}
      </div>
    </button>
  );
});
ConversationItem.displayName = 'ConversationItem';

const ReceivedGroup = memo(({ messages }) => (
  <div className="flex flex-col gap-1 items-start">
    {messages.map((msg) => (
      <div
        key={msg.id}
        className={`bg-bubble-received px-4 sm:px-5 py-3 sm:py-4 ${getBubbleCorners('received', msg.position)} max-w-[75vw] sm:max-w-[70%] lg:max-w-[65%]`}
      >
        <p className="text-slate-800 text-sm sm:text-[18px] leading-6 sm:leading-7 tracking-[0.5px] font-poppins wrap-break-word">
          {msg.text}
        </p>
        {msg.time && <span className="text-[10px] text-gray-400 mt-1 block">{msg.time}</span>}
      </div>
    ))}
  </div>
));
ReceivedGroup.displayName = 'ReceivedGroup';

const SentGroup = memo(({ messages }) => (
  <div className="flex flex-col gap-1 items-end">
    {messages.map((msg) => (
      <div
        key={msg.id}
        className={`bg-bubble-sent px-4 sm:px-5 py-3 sm:py-4 ${getBubbleCorners('sent', msg.position)} max-w-[75vw] sm:max-w-[70%] lg:max-w-[65%]`}
      >
        <p className="text-slate-800 text-sm sm:text-[18px] leading-6 sm:leading-7 tracking-[0.5px] font-poppins wrap-break-word">
          {msg.text}
        </p>
        {msg.time && (
          <span className="text-[10px] text-gray-400 mt-1 block text-right">{msg.time}</span>
        )}
      </div>
    ))}
  </div>
));
SentGroup.displayName = 'SentGroup';

const ConversationDayStamp = memo(({ dateLabel, timeLabel }) => (
  <div className="flex w-full justify-center" role="separator" aria-label={`${dateLabel}, ${timeLabel}`}>
    <div className={CONVERSATION_DAY_CLASS}>
      <span className="whitespace-nowrap">{dateLabel}</span>
      <span className="size-1.5 shrink-0 rounded-full bg-gray-400" aria-hidden="true" />
      <span className="whitespace-nowrap">{timeLabel}</span>
    </div>
  </div>
));
ConversationDayStamp.displayName = 'ConversationDayStamp';

const ChatPanel = memo(({ className = '', style, mode = 'user' }) => {
  const {
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
  } = useChatPanel(mode);

  return (
    <div
      className={`flex min-h-0 overflow-hidden rounded-xl border border-gray-200 bg-gray-50 shadow-sm ${className}`}
      style={style}
    >
      <aside
        className={`${
          showSidebar ? 'flex' : 'hidden'
        } min-h-0 w-full shrink-0 flex-col border-r border-gray-200 lg:flex lg:w-76.5`}
        aria-label="Conversations"
      >
        <div className="flex h-20 shrink-0 items-center bg-gray-200 px-4">
          <span className="text-base font-medium leading-normal tracking-[0.352px] text-gray-900">
            {isAdmin ? 'All Conversations' : 'Messages'}
          </span>
        </div>

        <div
          className="min-h-0 flex-1 overflow-y-auto overscroll-y-contain scrollbar-light"
          role="list"
          aria-label="Conversations"
          data-lenis-prevent
        >
          {loadingRooms ? (
            <p className="text-center text-gray-400 py-10 text-sm" role="status">
              Loading…
            </p>
          ) : rooms.length === 0 ? (
            <p className="text-center text-gray-400 py-10 text-sm">No conversations yet.</p>
          ) : (
            rooms.map((room) => (
              <div key={room.id} role="listitem">
                <ConversationItem
                  room={room}
                  isActive={room.id === activeRoomId}
                  onClick={handleSelectRoom}
                  showOnline={!isAdmin}
                />
              </div>
            ))
          )}
        </div>
      </aside>

      <section
        className={`${!showSidebar ? 'flex' : 'hidden'} min-h-0 min-w-0 flex-1 flex-col lg:flex`}
        aria-label={`Conversation with ${activeRoom?.otherUser?.name ?? ''}`}
      >
        <div className="flex h-20 shrink-0 items-center gap-3 border-b border-gray-200 bg-gray-200 px-4">
          <button
            type="button"
            onClick={handleBackToSidebar}
            className="lg:hidden text-gray-900 hover:text-orange-500 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500 rounded cursor-pointer"
            aria-label="Back to conversations"
          >
            <ArrowLeft size={22} />
          </button>

          {activeRoom ? (
            <>
              <Avatar
                src={activeRoom.otherUser.avatar}
                name={activeRoom.otherUser.name}
                size="sm"
                online={isAdmin ? undefined : activeRoom.online}
              />
              <div className="flex flex-col">
                <span className="font-medium text-lg sm:text-xl text-gray-900 tracking-[0.44px] leading-none">
                  {activeRoom.otherUser.name}
                </span>
                {isAdmin ? (
                  <span className="mt-0.5 text-xs text-gray-400">
                    {isOtherTyping ? 'Typing…' : 'User'}
                  </span>
                ) : (
                  (isOtherTyping || activeRoom.online) && (
                    <span className="mt-0.5 text-xs text-gray-400">
                      {isOtherTyping ? 'Typing…' : 'Online'}
                    </span>
                  )
                )}
              </div>
            </>
          ) : (
            <span className="text-gray-400 text-sm">Select a conversation</span>
          )}
        </div>

        <div
          className="flex min-h-0 flex-1 flex-col gap-3 overflow-y-auto overscroll-y-contain px-4 py-4 scrollbar-light sm:px-6"
          aria-live="polite"
          aria-label="Messages"
          data-lenis-prevent
        >
          {loadingMsgs ? (
            <p className="text-center text-gray-400 py-10 text-sm" role="status">
              Loading messages…
            </p>
          ) : !activeRoomId ? (
            <p className="text-center text-gray-400 py-10 text-sm">
              Select a conversation to start chatting.
            </p>
          ) : messageGroups.length === 0 ? (
            <p className="text-center text-gray-400 py-10 text-sm">No messages yet. Say hello!</p>
          ) : (
            messageGroups.map((group, gi) => {
              if (group.type === CONVERSATION_DAY_TYPE) {
                return (
                  <ConversationDayStamp
                    key={group.id ?? `day-${gi}`}
                    dateLabel={group.dateLabel}
                    timeLabel={group.timeLabel}
                  />
                );
              }
              return group.type === 'received' ? (
                <ReceivedGroup key={gi} messages={group.messages} />
              ) : (
                <SentGroup key={gi} messages={group.messages} />
              );
            })
          )}
          <div ref={messagesEndRef} aria-hidden="true" />
        </div>

        <div className="shrink-0 px-4 sm:px-6 py-4 sm:py-5 bg-gray-50">
          <div className="flex gap-3 items-center">
            <input
              ref={inputRef}
              type="text"
              value={inputValue}
              onChange={handleInputChange}
              onKeyDown={handleKeyDown}
              placeholder="Type a message…"
              aria-label="Type a message"
              disabled={!activeRoomId}
              className="h-13 flex-1 rounded-full bg-white px-5 text-sm tracking-[0.5px] text-slate-800 shadow-[0px_2px_8px_0px_rgba(0,0,0,0.14)] outline-none placeholder-gray-400 transition-shadow focus:outline-none focus:ring-2 focus:ring-brand-orange disabled:opacity-50"
            />
            <button
              type="button"
              onClick={handleSend}
              disabled={!inputValue.trim() || !activeRoomId}
              aria-label="Send message"
              className="flex size-13 shrink-0 cursor-pointer flex-col items-center justify-center rounded-full bg-white text-gray-400 shadow-[0px_2px_8px_0px_rgba(0,0,0,0.14)] transition-colors hover:text-brand-orange focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-orange disabled:cursor-not-allowed disabled:opacity-40"
            >
              <Send size={18} aria-hidden="true" />
              <span className="text-[10px] font-semibold tracking-[0.5px] leading-none mt-0.5 select-none">
                SMS
              </span>
            </button>
          </div>
        </div>
      </section>
    </div>
  );
});
ChatPanel.displayName = 'ChatPanel';

export default ChatPanel;
