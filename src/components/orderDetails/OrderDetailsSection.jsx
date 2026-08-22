import React, { memo, useCallback } from 'react';
import { ChevronDown } from 'lucide-react';
import {
  ORDER_DETAILS_SECTION_BODY_CLASS,
  ORDER_DETAILS_SECTION_CLASS,
  ORDER_DETAILS_SECTION_HEADER_CLASS,
  ORDER_DETAILS_SECTION_ICON_SIZE,
} from './orderDetailsData';

const OrderDetailsSection = memo(({ id, title, icon: Icon, badge, isOpen, onToggle, children }) => {
  const handleToggle = useCallback(() => {
    onToggle(id);
  }, [id, onToggle]);

  return (
    <section className={ORDER_DETAILS_SECTION_CLASS}>
      <button
        type="button"
        className={ORDER_DETAILS_SECTION_HEADER_CLASS}
        aria-expanded={isOpen}
        onClick={handleToggle}
      >
        <span className="flex min-w-0 items-center gap-3">
          {Icon ? (
            <Icon size={ORDER_DETAILS_SECTION_ICON_SIZE} className="shrink-0 text-[#45556c]" aria-hidden="true" />
          ) : null}
          <h2 className="text-sm font-bold text-[#0f172b]">{title}</h2>
          {badge ? (
            <span className="rounded-full bg-[#ffedd4] px-2 py-0.5 text-xs font-semibold text-[#f54900]">
              {badge}
            </span>
          ) : null}
        </span>
        <ChevronDown
          size={ORDER_DETAILS_SECTION_ICON_SIZE}
          className={`shrink-0 text-[#62748e] transition-transform ${isOpen ? 'rotate-180' : ''}`}
          aria-hidden="true"
        />
      </button>
      {isOpen ? <div className={ORDER_DETAILS_SECTION_BODY_CLASS}>{children}</div> : null}
    </section>
  );
});

OrderDetailsSection.displayName = 'OrderDetailsSection';

export default OrderDetailsSection;
