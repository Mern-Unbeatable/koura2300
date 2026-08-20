import React, { memo } from 'react';
import { CalendarDays, CheckCircle2, CreditCard, Zap } from 'lucide-react';
import {
  ORDER_SUMMARY_CARD_CLASS,
  ORDER_SUMMARY_GRID_CLASS,
  ORDER_SUMMARY_ICON_SIZE,
  ORDER_SUMMARY_ICON_WRAP,
  ORDER_SUMMARY_VALUE_CLASS,
} from './ordersData';

const buildSummaryItems = (copy, summary) => [
  {
    id: 'active',
    label: copy.summary.active,
    value: summary.active,
    Icon: Zap,
  },
  {
    id: 'completed',
    label: copy.summary.completed,
    value: summary.completed,
    Icon: CheckCircle2,
  },
  {
    id: 'pendingPayment',
    label: copy.summary.pendingPayment,
    value: summary.pendingPayment,
    Icon: CreditCard,
  },
  {
    id: 'upcoming',
    label: copy.summary.upcoming,
    value: summary.upcoming,
    Icon: CalendarDays,
  },
];

const OrdersSummaryCard = memo(({ id, label, value, Icon }) => (
  <div className={ORDER_SUMMARY_CARD_CLASS}>
    <span
      className={`flex size-11 items-center justify-center rounded-xl ${ORDER_SUMMARY_ICON_WRAP[id]}`}
    >
      <Icon size={ORDER_SUMMARY_ICON_SIZE} aria-hidden="true" />
    </span>
    <div>
      <p className={`text-2xl font-bold leading-8 ${ORDER_SUMMARY_VALUE_CLASS[id]}`}>{value}</p>
      <p className="text-xs font-medium text-[#62748e]">{label}</p>
    </div>
  </div>
));

OrdersSummaryCard.displayName = 'OrdersSummaryCard';

const OrdersSummary = memo(({ copy, summary }) => {
  const items = buildSummaryItems(copy, summary);

  return (
    <div className={ORDER_SUMMARY_GRID_CLASS}>
      {items.map((item) => (
        <OrdersSummaryCard key={item.id} {...item} />
      ))}
    </div>
  );
});

OrdersSummary.displayName = 'OrdersSummary';

export default OrdersSummary;
