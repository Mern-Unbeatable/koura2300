import React, { memo } from 'react';
import { CalendarDays } from 'lucide-react';
import OrderDetailsSection from './OrderDetailsSection';
import { ORDER_DETAILS_CONTENT } from './orderDetailsCopy';
import {
  ORDER_DETAILS_META_HIGHLIGHT_CLASS,
  ORDER_DETAILS_META_LABEL_CLASS,
  ORDER_DETAILS_META_ROW_CLASS,
  ORDER_DETAILS_META_VALUE_CLASS,
} from './orderDetailsData';

const { labels, sections } = ORDER_DETAILS_CONTENT;

const MetaItem = memo(({ label, value, highlight = false }) => (
  <div className="min-w-0 flex-1">
    <p className={ORDER_DETAILS_META_LABEL_CLASS}>{label}</p>
    <p className={highlight ? ORDER_DETAILS_META_HIGHLIGHT_CLASS : ORDER_DETAILS_META_VALUE_CLASS}>
      {value}
    </p>
  </div>
));

MetaItem.displayName = 'MetaItem';

const OrderDetailsBookingSummary = memo(({ order, isOpen, sectionId, onToggle }) => (
  <OrderDetailsSection
    id={sectionId}
    title={sections.bookingSummary}
    icon={CalendarDays}
    isOpen={isOpen}
    onToggle={onToggle}
  >
    <div className="flex flex-col gap-3.5">
      <div className={ORDER_DETAILS_META_ROW_CLASS}>
        <MetaItem label={labels.bookingDate} value={order.bookingDate} />
        <MetaItem label={labels.appointmentDate} value={order.appointmentDate} highlight />
      </div>
      <div className={ORDER_DETAILS_META_ROW_CLASS}>
        <MetaItem label={labels.appointmentTime} value={order.appointmentTime} />
        <MetaItem label={labels.category} value={order.category} />
      </div>
      <div className={ORDER_DETAILS_META_ROW_CLASS}>
        <MetaItem label={labels.package} value={order.packageName} />
        <MetaItem label={labels.duration} value={order.duration} />
      </div>
    </div>
  </OrderDetailsSection>
));

OrderDetailsBookingSummary.displayName = 'OrderDetailsBookingSummary';

export default OrderDetailsBookingSummary;
