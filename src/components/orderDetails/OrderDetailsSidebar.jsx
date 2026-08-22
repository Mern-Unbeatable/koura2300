import React, { memo } from 'react';
import { ORDER_STATUS_DOT_CLASS } from '../orders/ordersData';
import { ORDER_DETAILS_CONTENT } from './orderDetailsCopy';
import {
  ORDER_DETAILS_SIDEBAR_CLASS,
  getOrderStatusLabel,
  getOrderStatusStyle,
} from './orderDetailsData';

const { actions, labels } = ORDER_DETAILS_CONTENT;

const StatusRow = memo(({ label, value, highlight = false }) => (
  <div className="flex items-center justify-between gap-3 pt-2.5 first:pt-0">
    <p className="text-xs text-[#90a1b9]">{label}</p>
    <p className={`text-xs font-medium ${highlight ? 'text-[#f54900]' : 'text-[#314158]'}`}>
      {value}
    </p>
  </div>
));

StatusRow.displayName = 'StatusRow';

const OrderDetailsSidebar = memo(({ order, onPayNow }) => {
  const statusStyle = getOrderStatusStyle(order.status);

  return (
    <aside className={ORDER_DETAILS_SIDEBAR_CLASS} aria-label="Order summary">
      <div className="rounded-2xl border border-[#f1f5f9] bg-white p-5 shadow-sm">
        <p className="text-xs font-semibold uppercase tracking-[0.3px] text-[#90a1b9]">
          {labels.orderStatus}
        </p>
        <div className="mt-3">
          <span
            className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-sm font-semibold ${statusStyle.badge}`}
          >
            <span className={`${ORDER_STATUS_DOT_CLASS} ${statusStyle.dot}`} />
            {getOrderStatusLabel(order.status)}
          </span>
        </div>
        <div className="mt-4">
          <StatusRow label={labels.orderId} value={order.orderId} />
          <StatusRow label={labels.booked} value={order.bookingDate} />
          <StatusRow label={labels.appointment} value={order.appointmentDate} highlight />
          <StatusRow label={labels.time} value={order.appointmentTimeShort} />
        </div>
      </div>

      <div className="rounded-2xl bg-gradient-to-br from-[#ff6900] to-[#f54900] p-5 text-white">
        <p className="text-xs font-medium text-[#ffedd4]">{labels.materialPaymentDue}</p>
        <p className="mt-1 text-2xl font-bold leading-8">{order.materialTotal}</p>
        <button
          type="button"
          onClick={onPayNow}
          className="mt-3 inline-flex h-10 w-full items-center justify-center rounded-xl bg-white text-sm font-bold text-[#f54900] transition-colors hover:bg-[#fff7ed] focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
        >
          {actions.payNow}
        </button>
      </div>

      <div className="rounded-2xl border border-[#f1f5f9] bg-white p-5 shadow-sm">
        <p className="text-xs font-semibold uppercase tracking-[0.3px] text-[#90a1b9]">
          {labels.serviceCost}
        </p>
        <p className="mt-2 text-2xl font-bold leading-8 text-[#0f172b]">{order.bookingPrice}</p>
        <p className="mt-0.5 text-xs text-[#90a1b9]">{labels.serviceStartingFrom}</p>
        <div className="mt-3 rounded-xl bg-[#eff6ff] p-3">
          <p className="text-xs leading-5 text-[#155dfc]">{labels.serviceCollected}</p>
        </div>
      </div>
    </aside>
  );
});

OrderDetailsSidebar.displayName = 'OrderDetailsSidebar';

export default OrderDetailsSidebar;
