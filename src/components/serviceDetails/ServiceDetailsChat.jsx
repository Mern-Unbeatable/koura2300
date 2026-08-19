import React, { memo, useCallback } from 'react';
import { Package, Send, X } from 'lucide-react';
import { getBubbleCorners } from '../chat/chatUtils';
import useGsapMountEnter from '../../hooks/useGsapMountEnter';
import useServiceDetailsChat from '../../hooks/useServiceDetailsChat';
import {
  MOUNT_ENTER_DURATION,
  MOUNT_ENTER_OFFSET,
  SERVICE_CHAT_CLOSE_ICON_SIZE,
  SERVICE_CHAT_HEADER_HEIGHT_CLASS,
  SERVICE_CHAT_MESSAGE_AVATAR_SIZE,
  SERVICE_CHAT_OFFER_ICON_SIZE,
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
  'mx-auto flex items-center gap-3 text-base font-medium tracking-[0.5px] text-gray-400 sm:text-lg';
const COMPOSER_CLASS = 'mt-auto px-4 py-5 sm:px-9 sm:py-5';
const INPUT_CLASS =
  'h-13 min-w-0 flex-1 rounded-full bg-white px-5 text-sm text-slate-800 shadow-[0px_2px_8px_0px_rgba(0,0,0,0.14)] placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-brand-orange';
const SEND_BUTTON_CLASS =
  'flex size-13 shrink-0 cursor-pointer flex-col items-center justify-center rounded-full bg-white text-gray-400 shadow-[0px_2px_8px_0px_rgba(0,0,0,0.14)] transition-colors hover:text-brand-orange focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-orange disabled:cursor-not-allowed disabled:opacity-40';

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

const ReceivedMessageGroup = memo(({ messages }) => (
  <div className="flex items-end gap-5">
    <ChatAvatar size={SERVICE_CHAT_MESSAGE_AVATAR_SIZE} />
    <div className="flex min-w-0 flex-col gap-1">
      {messages.map((message) => (
        <div
          key={message.id}
          className={`bg-[#f0f2f5] px-5 py-4 font-poppins text-sm leading-7 tracking-[0.5px] text-slate-800 sm:text-lg ${getBubbleCorners('received', message.position)} max-w-[75vw] sm:max-w-[70%]`}
        >
          {message.text}
        </div>
      ))}
    </div>
  </div>
));

ReceivedMessageGroup.displayName = 'ReceivedMessageGroup';

const SentMessageGroup = memo(({ messages }) => (
  <div className="flex flex-col items-end gap-1">
    {messages.map((message) => (
      <div
        key={message.id}
        className={`bg-[#e4e7ec] px-5 py-4 font-poppins text-sm leading-7 tracking-[0.5px] text-slate-800 sm:text-lg ${getBubbleCorners('sent', message.position)} max-w-[75vw] sm:max-w-[70%]`}
      >
        {message.text}
      </div>
    ))}
  </div>
));

SentMessageGroup.displayName = 'SentMessageGroup';

const ServiceDetailsOfferCard = memo(({ offer, copy }) => (
  <article className="rounded-[14px] border-2 border-amber-500 bg-[#fff8ee] p-5 sm:p-[26px]">
    <div className="flex flex-wrap items-start justify-between gap-4">
      <div className="flex min-w-0 items-center gap-3">
        <span
          className="flex size-10 shrink-0 items-center justify-center rounded-full bg-green-600 text-white"
          aria-hidden="true"
        >
          <Package size={SERVICE_CHAT_OFFER_ICON_SIZE} />
        </span>
        <div>
          <h3 className="text-lg font-bold text-gray-900">{copy.title}</h3>
          <p className="text-xs text-gray-600">{copy.status}</p>
        </div>
      </div>
      <div>
        <p className="text-sm text-gray-600">{copy.bookingIdLabel}</p>
        <p className="text-base font-bold text-gray-900">{offer.bookingId}</p>
      </div>
    </div>
    <div className="mt-4 overflow-hidden rounded-xl border border-gray-600">
      <table className="w-full min-w-0 text-left text-sm">
        <thead className="border-b border-slate-100 bg-white text-xs font-semibold text-gray-700">
          <tr>
            <th className="px-4 py-3">{copy.itemColumn}</th>
            <th className="px-4 py-3">{copy.qtyColumn}</th>
            <th className="px-4 py-3 text-right">{copy.costColumn}</th>
          </tr>
        </thead>
        <tbody>
          {offer.lineItems.map((lineItem) => (
            <tr key={lineItem.id} className="border-b border-gray-300 bg-white">
              <td className="px-4 py-3 font-medium text-slate-700">{lineItem.item}</td>
              <td className="px-4 py-3 text-gray-700">{lineItem.quantity}</td>
              <td className="px-4 py-3 text-right font-semibold text-slate-900">
                {lineItem.costLabel}
              </td>
            </tr>
          ))}
          <tr className="bg-white font-bold text-slate-900">
            <td className="px-4 py-3">{copy.totalLabel}</td>
            <td className="px-4 py-3" />
            <td className="px-4 py-3 text-right text-base">{offer.totalLabel}</td>
          </tr>
        </tbody>
      </table>
    </div>
    <button
      type="button"
      className="mt-4 inline-flex cursor-pointer items-center gap-2 rounded-[10px] bg-amber-500 px-4 py-3 text-base font-semibold text-white transition-colors hover:bg-amber-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-500"
    >
      <Package size={SERVICE_CHAT_PAY_ICON_SIZE} aria-hidden="true" />
      {copy.payNow}
    </button>
  </article>
));

ServiceDetailsOfferCard.displayName = 'ServiceDetailsOfferCard';

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

  const handleClose = useCallback(() => {
    onClose();
  }, [onClose]);

  const receivedMessages = messages.filter((message) => message.type === 'received');
  const sentMessages = messages.filter((message) => message.type === 'sent');

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
          <div className="px-4 pt-5 sm:px-10">
            <div className={TIMESTAMP_CLASS}>
              <span>{timestamp.dateLabel}</span>
              <span className="size-1.5 rounded-full bg-gray-400" aria-hidden="true" />
              <span>{timestamp.timeLabel}</span>
            </div>
          </div>

          <div className="flex flex-1 flex-col gap-4 overflow-y-auto px-4 py-6 sm:px-10">
            {receivedMessages.length > 0 ? (
              <ReceivedMessageGroup messages={receivedMessages} />
            ) : null}
            {sentMessages.length > 0 ? <SentMessageGroup messages={sentMessages} /> : null}
            <ServiceDetailsOfferCard offer={offer} copy={copy.offerCard} />
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
