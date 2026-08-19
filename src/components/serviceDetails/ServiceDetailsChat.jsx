import React, { memo, useCallback, useMemo } from 'react';
import { Check, Package, Send, X } from 'lucide-react';
import { getBubbleCorners, groupMessages } from '../chat/chatUtils';
import useGsapMountEnter from '../../hooks/useGsapMountEnter';
import useServiceDetailsChat from '../../hooks/useServiceDetailsChat';
import {
  MOUNT_ENTER_DURATION,
  MOUNT_ENTER_OFFSET,
  SERVICE_CHAT_BUBBLE_MAX_WIDTH_CLASS,
  SERVICE_CHAT_CLOSE_ICON_SIZE,
  SERVICE_CHAT_HEADER_HEIGHT_CLASS,
  SERVICE_CHAT_MESSAGE_AVATAR_SIZE,
  SERVICE_CHAT_MESSAGE_GAP_CLASS,
  SERVICE_CHAT_OFFER_CARD_CLASS,
  SERVICE_CHAT_OFFER_CARD_WIDTH_CLASS,
  SERVICE_CHAT_CONTENT_PADDING_CLASS,
  SERVICE_CHAT_OFFER_ICON_SIZE,
  SERVICE_CHAT_OFFER_ICON_WRAP_CLASS,
  SERVICE_CHAT_OFFER_PAY_BUTTON_CLASS,
  SERVICE_CHAT_OFFER_TABLE_GRID_CLASS,
  SERVICE_CHAT_OFFER_QTY_CELL_CLASS,
  SERVICE_CHAT_OFFER_TABLE_HEADER_CLASS,
  SERVICE_CHAT_OFFER_TABLE_ROW_CLASS,
  SERVICE_CHAT_OFFER_TABLE_TOTAL_CLASS,
  SERVICE_CHAT_OFFER_TABLE_WRAP_CLASS,
  SERVICE_CHAT_PANEL_MIN_HEIGHT_CLASS,
  SERVICE_CHAT_PANEL_SHADOW_CLASS,
  SERVICE_CHAT_PAY_ICON_SIZE,
  SERVICE_CHAT_PRO,
  SERVICE_CHAT_PRO_AVATAR_SIZE,
  SERVICE_CHAT_PRO_ONLINE_DOT_SIZE,
  SERVICE_CHAT_SEND_ICON_SIZE,
} from './serviceDetailsData';

const PANEL_CLASS = `mt-6 min-w-0 overflow-hidden rounded-xl bg-white ${SERVICE_CHAT_PANEL_SHADOW_CLASS}`;
const HEADER_CLASS = `flex items-center justify-between bg-gray-200 px-4 sm:px-9 ${SERVICE_CHAT_HEADER_HEIGHT_CLASS}`;
const BODY_CLASS = `relative flex flex-col bg-[#f8f8f8] ${SERVICE_CHAT_PANEL_MIN_HEIGHT_CLASS}`;
const TIMESTAMP_CLASS =
  'flex flex-wrap items-center justify-center gap-2 text-xs font-medium tracking-[0.5px] text-gray-400 max-[320px]:text-[10px] sm:gap-3 sm:text-base lg:text-lg';
const MESSAGES_CLASS = `flex flex-1 flex-col gap-4 overflow-y-auto py-6 ${SERVICE_CHAT_CONTENT_PADDING_CLASS}`;
const COMPOSER_CLASS = 'mt-auto px-4 py-5 sm:px-9 sm:py-5';
const INPUT_CLASS =
  'h-13 min-w-0 flex-1 rounded-full bg-white px-5 text-sm text-slate-800 shadow-[0px_2px_8px_0px_rgba(0,0,0,0.14)] placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-brand-orange';
const SEND_BUTTON_CLASS =
  'flex size-13 shrink-0 cursor-pointer flex-col items-center justify-center rounded-full bg-white text-gray-400 shadow-[0px_2px_8px_0px_rgba(0,0,0,0.14)] transition-colors hover:text-brand-orange focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-orange disabled:cursor-not-allowed disabled:opacity-40';
const BUBBLE_TEXT_CLASS =
  'px-5 py-4 font-poppins text-sm leading-7 tracking-[0.5px] text-slate-800 sm:text-lg';

const ChatAvatar = memo(({ size, online = false }) => (
  <div className="relative shrink-0" style={{ width: size, height: size }}>
    <div
      className="flex size-full items-center justify-center rounded-full border-2 border-white bg-brand-orange-light text-sm font-semibold text-brand-orange"
      aria-hidden="true"
    >
      {SERVICE_CHAT_PRO.name.charAt(0)}
    </div>
    {online ? (
      <span
        className="absolute bottom-0 right-0 rounded-full border-2 border-white bg-brand-ink"
        style={{ width: SERVICE_CHAT_PRO_ONLINE_DOT_SIZE, height: SERVICE_CHAT_PRO_ONLINE_DOT_SIZE }}
        aria-hidden="true"
      />
    ) : null}
  </div>
));

ChatAvatar.displayName = 'ChatAvatar';

const ReceivedBubbles = memo(({ messages }) => (
  <div className="flex min-w-0 flex-col gap-1">
    {messages.map((message) => (
      <div
        key={message.id}
        className={`bg-[#f0f2f5] ${BUBBLE_TEXT_CLASS} ${getBubbleCorners('received', message.position)}`}
      >
        {message.text}
      </div>
    ))}
  </div>
));

ReceivedBubbles.displayName = 'ReceivedBubbles';

const SentBubbles = memo(({ messages }) => (
  <div className={`flex min-w-0 flex-col items-end gap-1 ${SERVICE_CHAT_BUBBLE_MAX_WIDTH_CLASS}`}>
    {messages.map((message) => (
      <div
        key={message.id}
        className={`bg-[#e4e7ec] ${BUBBLE_TEXT_CLASS} ${getBubbleCorners('sent', message.position)}`}
      >
        {message.text}
      </div>
    ))}
  </div>
));

SentBubbles.displayName = 'SentBubbles';

const ReceivedMessageRow = memo(({ messages }) => (
  <div className="flex w-full justify-start">
    <div className={`flex min-w-0 items-end ${SERVICE_CHAT_MESSAGE_GAP_CLASS} ${SERVICE_CHAT_BUBBLE_MAX_WIDTH_CLASS}`}>
      <ChatAvatar size={SERVICE_CHAT_MESSAGE_AVATAR_SIZE} />
      <ReceivedBubbles messages={messages} />
    </div>
  </div>
));

ReceivedMessageRow.displayName = 'ReceivedMessageRow';

const SentMessageRow = memo(({ messages }) => (
  <div className="flex w-full justify-end">
    <SentBubbles messages={messages} />
  </div>
));

SentMessageRow.displayName = 'SentMessageRow';

const ServiceDetailsOfferCard = memo(({ offer, copy }) => (
  <article className={`${SERVICE_CHAT_OFFER_CARD_WIDTH_CLASS} ${SERVICE_CHAT_OFFER_CARD_CLASS}`}>
    <div className="flex items-center justify-between gap-4">
      <div className="flex min-w-0 items-center gap-3">
        <span className={SERVICE_CHAT_OFFER_ICON_WRAP_CLASS} aria-hidden="true">
          <Package size={SERVICE_CHAT_OFFER_ICON_SIZE} />
        </span>
        <div>
          <h3 className="text-lg font-bold leading-6.75 text-[#101828]">{copy.title}</h3>
          <p className="text-xs leading-4 text-[#4a5565]">{copy.status}</p>
        </div>
      </div>
      <div className="shrink-0">
        <p className="text-sm leading-5 text-[#4a5565]">{copy.bookingIdLabel}</p>
        <p className="text-base font-bold leading-6 text-[#101828]">{offer.bookingId}</p>
      </div>
    </div>

    <div className={SERVICE_CHAT_OFFER_TABLE_WRAP_CLASS}>
      <div className={`${SERVICE_CHAT_OFFER_TABLE_GRID_CLASS} ${SERVICE_CHAT_OFFER_TABLE_HEADER_CLASS}`}>
        <span className="min-w-0">{copy.itemColumn}</span>
        <span className={SERVICE_CHAT_OFFER_QTY_CELL_CLASS}>{copy.qtyColumn}</span>
        <span className="whitespace-nowrap text-right">{copy.costColumn}</span>
      </div>
      {offer.lineItems.map((lineItem) => (
        <div
          key={lineItem.id}
          className={`${SERVICE_CHAT_OFFER_TABLE_GRID_CLASS} ${SERVICE_CHAT_OFFER_TABLE_ROW_CLASS} bg-white`}
        >
          <span className="min-w-0 break-words font-medium text-[#314158]">{lineItem.item}</span>
          <span className={`${SERVICE_CHAT_OFFER_QTY_CELL_CLASS} text-[#383838]`}>{lineItem.quantity}</span>
          <span className="whitespace-nowrap text-right font-semibold text-[#0f172b]">
            {lineItem.costLabel}
          </span>
        </div>
      ))}
      <div className={`${SERVICE_CHAT_OFFER_TABLE_GRID_CLASS} ${SERVICE_CHAT_OFFER_TABLE_TOTAL_CLASS}`}>
        <span className="min-w-0">{copy.totalLabel}</span>
        <span aria-hidden="true" />
        <span className="shrink-0 whitespace-nowrap text-right text-sm sm:text-base">{offer.totalLabel}</span>
      </div>
    </div>

    <button type="button" className={SERVICE_CHAT_OFFER_PAY_BUTTON_CLASS}>
      <Check size={SERVICE_CHAT_PAY_ICON_SIZE} aria-hidden="true" />
      {copy.payNow}
    </button>
  </article>
));

ServiceDetailsOfferCard.displayName = 'ServiceDetailsOfferCard';

const AdminOfferRow = memo(({ offer, copy }) => (
  <div className="flex w-full justify-start">
    <ServiceDetailsOfferCard offer={offer} copy={copy} />
  </div>
));

AdminOfferRow.displayName = 'AdminOfferRow';

const ServiceDetailsChat = memo(({ service, selectedPackage, onClose }) => {
  const {
    messages,
    inputValue,
    inputRef,
    timestamp,
    offer,
    copy,
    handleInputChange,
    handleSend,
    handleKeyDown,
  } = useServiceDetailsChat({ service, selectedPackage });
  const enterRef = useGsapMountEnter({
    y: MOUNT_ENTER_OFFSET,
    duration: MOUNT_ENTER_DURATION,
  });
  const messageGroups = useMemo(() => groupMessages(messages), [messages]);

  const handleClose = useCallback(() => {
    onClose();
  }, [onClose]);

  return (
    <div ref={enterRef} className="min-w-0" role="region" aria-label={copy.regionLabel}>
      <section className={PANEL_CLASS}>
        <div className={HEADER_CLASS}>
          <div className="flex min-w-0 items-center gap-4">
            <ChatAvatar size={SERVICE_CHAT_PRO_AVATAR_SIZE} online />
            <div className="min-w-0">
              <h2 className="truncate text-xl font-medium tracking-[0.44px] text-brand-ink">
                {SERVICE_CHAT_PRO.name}
              </h2>
              <p className="text-xs tracking-[0.26px] text-gray-500">{copy.activeStatus}</p>
            </div>
          </div>
          <button
            type="button"
            onClick={handleClose}
            aria-label={copy.closeLabel}
            className="cursor-pointer rounded-md p-1 text-brand-ink transition-colors hover:text-brand-orange focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-orange"
          >
            <X size={SERVICE_CHAT_CLOSE_ICON_SIZE} aria-hidden="true" />
          </button>
        </div>

        <div className={BODY_CLASS}>
          <div className="flex w-full justify-center pt-5 px-4 sm:px-10 max-[320px]:px-3">
            <div className={TIMESTAMP_CLASS}>
              <span className="whitespace-nowrap">{timestamp.dateLabel}</span>
              <span className="size-1.5 shrink-0 rounded-full bg-gray-400" aria-hidden="true" />
              <span className="whitespace-nowrap">{timestamp.timeLabel}</span>
            </div>
          </div>

          <div className={MESSAGES_CLASS}>
            {messageGroups.map((group, groupIndex) =>
              group.type === 'received' ? (
                <ReceivedMessageRow key={groupIndex} messages={group.messages} />
              ) : (
                <SentMessageRow key={groupIndex} messages={group.messages} />
              ),
            )}
            <AdminOfferRow offer={offer} copy={copy.offerCard} />
          </div>

          <div className={COMPOSER_CLASS}>
            <div className="flex items-center gap-3">
              <input
                ref={inputRef}
                type="text"
                value={inputValue}
                onChange={handleInputChange}
                onKeyDown={handleKeyDown}
                placeholder={copy.inputPlaceholder}
                aria-label={copy.inputLabel}
                className={INPUT_CLASS}
              />
              <button
                type="button"
                onClick={handleSend}
                disabled={!inputValue.trim()}
                aria-label={copy.sendLabel}
                className={SEND_BUTTON_CLASS}
              >
                <Send size={SERVICE_CHAT_SEND_ICON_SIZE} aria-hidden="true" />
                <span className="text-[10px] font-semibold tracking-[0.5px]">
                  {copy.sendSmsLabel}
                </span>
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
});

ServiceDetailsChat.displayName = 'ServiceDetailsChat';

export default ServiceDetailsChat;
