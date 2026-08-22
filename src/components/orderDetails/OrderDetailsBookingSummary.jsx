import React, { memo } from 'react';
import OrderDetailsSection from './OrderDetailsSection';
import { ORDER_DETAILS_CONTENT } from './orderDetailsCopy';
import {
  ORDER_DETAILS_CALENDAR_ICON,
  ORDER_DETAILS_META_HIGHLIGHT_CLASS,
  ORDER_DETAILS_META_ITEM_LEFT_CLASS,
  ORDER_DETAILS_META_ITEM_RIGHT_CLASS,
  ORDER_DETAILS_META_LABEL_CLASS,
  ORDER_DETAILS_META_ROW_CLASS,
  ORDER_DETAILS_META_STACK_CLASS,
  ORDER_DETAILS_META_VALUE_CLASS,
} from './orderDetailsData';

const { labels, sections } = ORDER_DETAILS_CONTENT;

const MetaItem = memo(({ label, value, highlight = false, align = 'left' }) => {
  const itemClass =
    align === 'right' ? ORDER_DETAILS_META_ITEM_RIGHT_CLASS : ORDER_DETAILS_META_ITEM_LEFT_CLASS;

  return (
    <div className={itemClass}>
      <p className={ORDER_DETAILS_META_LABEL_CLASS}>{label}</p>
      <p className={highlight ? ORDER_DETAILS_META_HIGHLIGHT_CLASS : ORDER_DETAILS_META_VALUE_CLASS}>
        {value}
      </p>
    </div>
  );
});

MetaItem.displayName = 'MetaItem';

const OrderDetailsBookingSummary = memo(({ order, isOpen, sectionId, onToggle }) => (
  <OrderDetailsSection
    id={sectionId}
    title={sections.bookingSummary}
    iconSrc={ORDER_DETAILS_CALENDAR_ICON}
    isOpen={isOpen}
    onToggle={onToggle}
  >
    <div className={ORDER_DETAILS_META_STACK_CLASS}>
      <div className={ORDER_DETAILS_META_ROW_CLASS}>
        <MetaItem label={labels.bookingDate} value={order.bookingDate} />
        <MetaItem
          label={labels.appointmentDate}
          value={order.appointmentDate}
          highlight
          align="right"
        />
      </div>
      <div className={ORDER_DETAILS_META_ROW_CLASS}>
        <MetaItem label={labels.appointmentTime} value={order.appointmentTime} />
        <MetaItem label={labels.category} value={order.category} align="right" />
      </div>
      <div className={ORDER_DETAILS_META_ROW_CLASS}>
        <MetaItem label={labels.package} value={order.packageName} />
        <MetaItem label={labels.duration} value={order.duration} align="right" />
      </div>
    </div>
  </OrderDetailsSection>
));

OrderDetailsBookingSummary.displayName = 'OrderDetailsBookingSummary';

export default OrderDetailsBookingSummary;
