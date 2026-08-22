import React, { memo } from 'react';
import { Banknote, CreditCard } from 'lucide-react';
import OrderDetailsSection from './OrderDetailsSection';
import { ORDER_DETAILS_CONTENT } from './orderDetailsCopy';
import { ORDER_DETAILS_SECTION_ICON_SIZE } from './orderDetailsData';

const { bookingPayHint, labels, sections } = ORDER_DETAILS_CONTENT;

const OrderDetailsBookingPayment = memo(({ order, isOpen, sectionId, onToggle }) => (
  <OrderDetailsSection
    id={sectionId}
    title={sections.bookingPayment}
    icon={CreditCard}
    isOpen={isOpen}
    onToggle={onToggle}
  >
    <div className="flex flex-col gap-4">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <p className="text-xs font-medium text-[#90a1b9]">{labels.bookingPrice}</p>
          <p className="mt-0.5 flex flex-wrap items-baseline gap-2">
            <span className="text-2xl font-bold text-[#0f172b]">{order.bookingPrice}</span>
            <span className="text-sm text-[#90a1b9]">{labels.startingFrom}</span>
          </p>
        </div>
        <div className="text-right">
          <p className="text-xs font-medium text-[#90a1b9]">{labels.paymentStatus}</p>
          <p className="mt-0.5 text-sm font-semibold text-[#45556c]">{order.paymentStatus}</p>
        </div>
      </div>

      <div className="rounded-xl bg-[#eff6ff] p-3">
        <p className="text-xs leading-5 text-[#155dfc]">{bookingPayHint}</p>
      </div>

      <div className="grid gap-3 sm:grid-cols-2">
        <div className="flex items-center gap-3 rounded-xl border border-[#f1f5f9] p-3">
          <span className="flex size-10 items-center justify-center rounded-xl bg-[#f8fafc] text-[#45556c]">
            <Banknote size={ORDER_DETAILS_SECTION_ICON_SIZE} aria-hidden="true" />
          </span>
          <div>
            <p className="text-xs font-semibold text-[#314158]">{labels.offline}</p>
            <p className="text-xs text-[#90a1b9]">{labels.offlineHint}</p>
          </div>
        </div>
        <div className="flex items-center gap-3 rounded-xl border border-[#f1f5f9] p-3">
          <span className="flex size-10 items-center justify-center rounded-xl bg-[#f8fafc] text-[#45556c]">
            <CreditCard size={ORDER_DETAILS_SECTION_ICON_SIZE} aria-hidden="true" />
          </span>
          <div>
            <p className="text-xs font-semibold text-[#314158]">{labels.online}</p>
            <p className="text-xs text-[#90a1b9]">{labels.onlineHint}</p>
          </div>
        </div>
      </div>
    </div>
  </OrderDetailsSection>
));

OrderDetailsBookingPayment.displayName = 'OrderDetailsBookingPayment';

export default OrderDetailsBookingPayment;
