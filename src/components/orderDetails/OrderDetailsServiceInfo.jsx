import React, { memo } from 'react';
import { Check, Info, X } from 'lucide-react';
import OrderDetailsSection from './OrderDetailsSection';
import { ORDER_DETAILS_CONTENT } from './orderDetailsCopy';
import { ORDER_DETAILS_LIST_ICON_SIZE } from './orderDetailsData';

const { labels, sections } = ORDER_DETAILS_CONTENT;

const InclusionItem = memo(({ text }) => (
  <li className="flex items-start gap-2 pt-1.5 first:pt-0">
    <Check size={ORDER_DETAILS_LIST_ICON_SIZE} className="mt-0.5 shrink-0 text-[#00a63e]" aria-hidden="true" />
    <span className="text-sm text-[#314158]">{text}</span>
  </li>
));

InclusionItem.displayName = 'InclusionItem';

const ExclusionItem = memo(({ text }) => (
  <li className="flex items-start gap-2 pt-1.5 first:pt-0">
    <X size={ORDER_DETAILS_LIST_ICON_SIZE} className="mt-0.5 shrink-0 text-[#fb2c36]" aria-hidden="true" />
    <span className="text-sm text-[#62748e]">{text}</span>
  </li>
));

ExclusionItem.displayName = 'ExclusionItem';

const OrderDetailsServiceInfo = memo(({ order, isOpen, sectionId, onToggle }) => (
  <OrderDetailsSection
    id={sectionId}
    title={sections.serviceInfo}
    icon={Info}
    isOpen={isOpen}
    onToggle={onToggle}
  >
    <div className="flex flex-col gap-4">
      <div>
        <p className="text-xs font-medium uppercase tracking-[0.3px] text-[#90a1b9]">{labels.title}</p>
        <h3 className="mt-2 text-2xl font-semibold text-[#0b1e3d]">{order.serviceTitle}</h3>
      </div>
      <div>
        <p className="text-xs font-medium uppercase tracking-[0.3px] text-[#90a1b9]">
          {labels.description}
        </p>
        <p className="mt-2 text-sm leading-relaxed text-[#45556c]">{order.serviceDescription}</p>
      </div>
      <div className="grid gap-6 sm:grid-cols-2">
        <div>
          <p className="text-xs font-medium uppercase tracking-[0.3px] text-[#90a1b9]">
            {labels.included}
          </p>
          <ul className="mt-2">
            {order.included.map((item) => (
              <InclusionItem key={item} text={item} />
            ))}
          </ul>
        </div>
        <div>
          <p className="text-xs font-medium uppercase tracking-[0.3px] text-[#90a1b9]">
            {labels.excluded}
          </p>
          <ul className="mt-2">
            {order.excluded.map((item) => (
              <ExclusionItem key={item} text={item} />
            ))}
          </ul>
        </div>
      </div>
      <div className="flex flex-wrap items-center justify-between gap-2 border-t border-[#f8fafc] pt-4">
        <p className="text-sm font-medium text-[#45556c]">{labels.startingPrice}</p>
        <div className="text-right">
          <p className="text-sm font-bold text-[#0f172b]">{order.startingPriceLabel}</p>
          <p className="text-xs text-[#90a1b9]">{labels.collectedNote}</p>
        </div>
      </div>
    </div>
  </OrderDetailsSection>
));

OrderDetailsServiceInfo.displayName = 'OrderDetailsServiceInfo';

export default OrderDetailsServiceInfo;
