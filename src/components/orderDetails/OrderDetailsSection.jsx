import React, { memo, useCallback } from 'react';
import {
  ORDER_DETAILS_SECTION_BADGE_CLASS,
  ORDER_DETAILS_SECTION_BADGE_DESKTOP_CLASS,
  ORDER_DETAILS_SECTION_BADGE_MOBILE_CLASS,
  ORDER_DETAILS_SECTION_BODY_CLASS,
  ORDER_DETAILS_SECTION_CHEVRON_CLASS,
  ORDER_DETAILS_SECTION_CHEVRON_ICON,
  ORDER_DETAILS_SECTION_CLASS,
  ORDER_DETAILS_SECTION_HEADER_CLASS,
  ORDER_DETAILS_SECTION_HEADER_MAIN_CLASS,
  ORDER_DETAILS_SECTION_ICON_SIZE,
  ORDER_DETAILS_SECTION_TITLE_CLASS,
} from './orderDetailsData';

const OrderDetailsSectionIcon = memo(({ icon: Icon, iconSrc }) => {
  if (iconSrc) {
    return (
      <img
        src={iconSrc}
        alt=""
        width={ORDER_DETAILS_SECTION_ICON_SIZE}
        height={ORDER_DETAILS_SECTION_ICON_SIZE}
        className="mt-0.5 shrink-0"
        aria-hidden="true"
      />
    );
  }

  if (Icon) {
    return (
      <Icon
        size={ORDER_DETAILS_SECTION_ICON_SIZE}
        className="mt-0.5 shrink-0 text-[#90a1b9]"
        aria-hidden="true"
      />
    );
  }

  return null;
});

OrderDetailsSectionIcon.displayName = 'OrderDetailsSectionIcon';

const SectionBadge = memo(({ badge, variant }) => (
  <span
    className={`${ORDER_DETAILS_SECTION_BADGE_CLASS} ${
      variant === 'mobile'
        ? ORDER_DETAILS_SECTION_BADGE_MOBILE_CLASS
        : ORDER_DETAILS_SECTION_BADGE_DESKTOP_CLASS
    }`}
  >
    {badge}
  </span>
));

SectionBadge.displayName = 'SectionBadge';

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
        <span className={ORDER_DETAILS_SECTION_HEADER_MAIN_CLASS}>
          <OrderDetailsSectionIcon icon={icon} iconSrc={iconSrc} />
          <span className="min-w-0 flex-1">
            <span className="flex min-w-0 flex-wrap items-center gap-x-3 gap-y-1.5">
              <h2 className={ORDER_DETAILS_SECTION_TITLE_CLASS}>{title}</h2>
              {badge ? <SectionBadge badge={badge} variant="desktop" /> : null}
            </span>
            {badge ? <SectionBadge badge={badge} variant="mobile" /> : null}
          </span>
        </span>
        <img
          src={ORDER_DETAILS_SECTION_CHEVRON_ICON}
          alt=""
          width={ORDER_DETAILS_SECTION_ICON_SIZE}
          height={ORDER_DETAILS_SECTION_ICON_SIZE}
          className={`${ORDER_DETAILS_SECTION_CHEVRON_CLASS} ${isOpen ? 'rotate-180' : ''}`}
          aria-hidden="true"
        />
      </button>
      {isOpen ? <div className={ORDER_DETAILS_SECTION_BODY_CLASS}>{children}</div> : null}
    </section>
  );
});

OrderDetailsSection.displayName = 'OrderDetailsSection';

export default OrderDetailsSection;
