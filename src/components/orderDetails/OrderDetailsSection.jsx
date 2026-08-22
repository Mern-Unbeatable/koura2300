import React, { memo, useCallback } from 'react';
import {
  ORDER_DETAILS_SECTION_BODY_CLASS,
  ORDER_DETAILS_SECTION_CHEVRON_ICON,
  ORDER_DETAILS_SECTION_CLASS,
  ORDER_DETAILS_SECTION_HEADER_CLASS,
  ORDER_DETAILS_SECTION_ICON_SIZE,
} from './orderDetailsData';

const OrderDetailsSectionIcon = memo(({ icon: Icon, iconSrc, title }) => {
  if (iconSrc) {
    return (
      <img
        src={iconSrc}
        alt=""
        width={ORDER_DETAILS_SECTION_ICON_SIZE}
        height={ORDER_DETAILS_SECTION_ICON_SIZE}
        className="shrink-0"
        aria-hidden="true"
      />
    );
  }

  if (Icon) {
    return (
      <Icon
        size={ORDER_DETAILS_SECTION_ICON_SIZE}
        className="shrink-0 text-[#90a1b9]"
        aria-hidden="true"
      />
    );
  }

  return null;
});

OrderDetailsSectionIcon.displayName = 'OrderDetailsSectionIcon';

const OrderDetailsSection = memo(({ id, title, icon, iconSrc, badge, isOpen, onToggle, children }) => {
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
          <OrderDetailsSectionIcon icon={icon} iconSrc={iconSrc} title={title} />
          <h2 className="text-sm font-bold leading-5 text-[#0f172b]">{title}</h2>
          {badge ? (
            <span className="rounded-full bg-[#ffedd4] px-2 py-0.5 text-xs font-semibold text-[#f54900]">
              {badge}
            </span>
          ) : null}
        </span>
        <img
          src={ORDER_DETAILS_SECTION_CHEVRON_ICON}
          alt=""
          width={ORDER_DETAILS_SECTION_ICON_SIZE}
          height={ORDER_DETAILS_SECTION_ICON_SIZE}
          className={`shrink-0 transition-transform ${isOpen ? 'rotate-180' : ''}`}
          aria-hidden="true"
        />
      </button>
      {isOpen ? <div className={ORDER_DETAILS_SECTION_BODY_CLASS}>{children}</div> : null}
    </section>
  );
});

OrderDetailsSection.displayName = 'OrderDetailsSection';

export default OrderDetailsSection;
