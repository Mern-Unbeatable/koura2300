import React, { memo } from 'react';
import { CreditCard, Download } from 'lucide-react';
import {
  ORDER_ACTION,
  ORDER_ACTION_CANCEL_CLASS,
  ORDER_ACTION_DOWNLOAD_CLASS,
  ORDER_ACTION_ICON_SIZE,
  ORDER_ACTION_PAY_CLASS,
  ORDER_ACTION_PRIMARY_CLASS,
  ORDER_APPOINTMENT_DEFAULT_CLASS,
  ORDER_APPOINTMENT_HIGHLIGHT_CLASS,
  ORDER_CARD_CLASS,
  ORDER_DOWNLOAD_ICON_SIZE,
  ORDER_HERO_HEIGHT_CLASS,
  ORDER_META_ITEM_CLASS,
  ORDER_META_LABEL_CLASS,
  ORDER_META_ROW_CLASS,
  ORDER_META_VALUE_BASE_CLASS,
  ORDER_META_VALUE_DEFAULT_CLASS,
  ORDER_META_VALUE_ORDER_ID_CLASS,
  ORDER_PAYMENT_COST_CLASS,
  ORDER_PAYMENT_COST_VALUE_CLASS,
  ORDER_PAYMENT_KIND,
  ORDER_PAYMENT_ROW_CLASS,
  ORDER_PAYMENT_TEXT_CLASS,
  ORDER_STATUS_DOT_CLASS,
  ORDER_STATUS_LABELS,
  ORDER_STATUS_STYLES,
  ORDER_TIER_LABELS,
  ORDER_TIER_STYLES,
  getOrderActionsForStatus,
  getOrderActionsRowClass,
  getOrderTextActionClass,
} from './ordersData';

const getPaymentTextClass = (kind) =>
  ORDER_PAYMENT_TEXT_CLASS[kind] ?? ORDER_PAYMENT_TEXT_CLASS[ORDER_PAYMENT_KIND.PENDING_REVIEW];

const getAppointmentClass = (isHighlighted) =>
  isHighlighted ? ORDER_APPOINTMENT_HIGHLIGHT_CLASS : ORDER_APPOINTMENT_DEFAULT_CLASS;

const OrderCardHero = memo(({ order }) => {
  const statusStyle = ORDER_STATUS_STYLES[order.status];
  const tierStyle = ORDER_TIER_STYLES[order.tier];

  return (
    <div className={`relative ${ORDER_HERO_HEIGHT_CLASS} bg-[#e2e8f0]`}>
      <img
        src={order.image}
        alt={order.imageAlt}
        className="absolute inset-0 size-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />

      <span
        className={`absolute left-3 top-3 inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-semibold ${statusStyle.badge}`}
      >
        <span className={`${ORDER_STATUS_DOT_CLASS} ${statusStyle.dot}`} />
        {ORDER_STATUS_LABELS[order.status]}
      </span>

      <span
        className={`absolute right-3 top-3 rounded-full border px-2.5 py-1 text-xs font-semibold ${tierStyle}`}
      >
        {ORDER_TIER_LABELS[order.tier]}
      </span>

      <div className="absolute inset-x-0 bottom-0 p-4">
        <h3 className="text-lg font-bold text-white drop-shadow-sm">{order.title}</h3>
        <p className="mt-0.5 text-xs text-white/70">{order.category}</p>
      </div>
    </div>
  );
});

OrderCardHero.displayName = 'OrderCardHero';

const OrderMetaField = memo(({ label, value, valueClassName }) => (
  <div className={ORDER_META_ITEM_CLASS}>
    <p className={ORDER_META_LABEL_CLASS}>{label}</p>
    <p className={valueClassName}>{value}</p>
  </div>
));

OrderMetaField.displayName = 'OrderMetaField';

const OrderCardMeta = memo(({ order, labels }) => (
  <div className={ORDER_META_ROW_CLASS}>
    <OrderMetaField
      label={labels.orderId}
      value={order.orderId}
      valueClassName={ORDER_META_VALUE_ORDER_ID_CLASS}
    />
    <OrderMetaField
      label={labels.bookedOn}
      value={order.bookedOn}
      valueClassName={ORDER_META_VALUE_DEFAULT_CLASS}
    />
    <OrderMetaField
      label={labels.appointment}
      value={order.appointment}
      valueClassName={`${ORDER_META_VALUE_BASE_CLASS} ${getAppointmentClass(order.isAppointmentHighlighted)}`}
    />
    <OrderMetaField
      label={labels.duration}
      value={order.duration}
      valueClassName={ORDER_META_VALUE_DEFAULT_CLASS}
    />
  </div>
));

OrderCardMeta.displayName = 'OrderCardMeta';

const OrderCardPayment = memo(({ order, labels }) => (
  <div className={ORDER_PAYMENT_ROW_CLASS}>
    <div className="min-w-0 shrink-0">
      <p className={ORDER_META_LABEL_CLASS}>{labels.materialPayment}</p>
      <p className={getPaymentTextClass(order.materialPayment.kind)}>
        {order.materialPayment.label}
      </p>
    </div>
    <div className={ORDER_PAYMENT_COST_CLASS}>
      <p className={ORDER_META_LABEL_CLASS}>{order.serviceCostLabel}</p>
      <p className={ORDER_PAYMENT_COST_VALUE_CLASS}>{order.serviceCost}</p>
    </div>
  </div>
));

OrderCardPayment.displayName = 'OrderCardPayment';

const OrderCardActions = memo(
  ({ order, status, actions, onViewDetails, onPayNow, onCancelBooking, onDownload }) => {
    const actionKeys = getOrderActionsForStatus(status);
    const actionCount = actionKeys.length;
    const rowClass = getOrderActionsRowClass(actionCount);
    const primaryClass = getOrderTextActionClass(ORDER_ACTION_PRIMARY_CLASS, actionCount);
    const payClass = getOrderTextActionClass(ORDER_ACTION_PAY_CLASS, actionCount);
    const cancelClass = getOrderTextActionClass(ORDER_ACTION_CANCEL_CLASS, actionCount);

    return (
      <div className={rowClass}>
        {actionKeys.includes(ORDER_ACTION.VIEW_DETAILS) ? (
          <button
            type="button"
            onClick={() => onViewDetails(order)}
            className={primaryClass}
          >
            {actions.viewDetails}
          </button>
        ) : null}

        {actionKeys.includes(ORDER_ACTION.PAY_NOW) ? (
          <button type="button" onClick={onPayNow} className={payClass}>
            <CreditCard size={ORDER_ACTION_ICON_SIZE} aria-hidden="true" />
            {actions.payNow}
          </button>
        ) : null}

        {actionKeys.includes(ORDER_ACTION.CANCEL_BOOKING) ? (
          <button type="button" onClick={onCancelBooking} className={cancelClass}>
            {actions.cancelBooking}
          </button>
        ) : null}

        {actionKeys.includes(ORDER_ACTION.DOWNLOAD) ? (
          <button
            type="button"
            onClick={onDownload}
            aria-label={actions.download}
            className={ORDER_ACTION_DOWNLOAD_CLASS}
          >
            <Download size={ORDER_DOWNLOAD_ICON_SIZE} aria-hidden="true" />
          </button>
        ) : null}
      </div>
    );
  },
);

OrderCardActions.displayName = 'OrderCardActions';

/**
 * Shared OrderCard — status badge, tier, and footer buttons come from ORDER_STATUS_ACTIONS.
 */
const OrderCard = memo(
  ({ order, labels, actions, onViewDetails, onPayNow, onCancelBooking, onDownload }) => (
    <article className={ORDER_CARD_CLASS}>
      <OrderCardHero order={order} />
      <div className="flex flex-1 flex-col p-5">
        <OrderCardMeta order={order} labels={labels} />
        <OrderCardPayment order={order} labels={labels} />
        <OrderCardActions
          order={order}
          status={order.status}
          actions={actions}
          onViewDetails={onViewDetails}
          onPayNow={onPayNow}
          onCancelBooking={onCancelBooking}
          onDownload={onDownload}
        />
      </div>
    </article>
  ),
);

OrderCard.displayName = 'OrderCard';

export default OrderCard;
