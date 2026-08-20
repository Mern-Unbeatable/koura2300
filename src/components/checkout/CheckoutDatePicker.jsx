import React, { memo } from 'react';
import useCheckoutDateStrip from '../../hooks/useCheckoutDateStrip';
import {
  CHECKOUT_DATE_BUTTON_ACTIVE,
  CHECKOUT_DATE_BUTTON_IDLE,
  CHECKOUT_DATE_DAY_CLASS,
  CHECKOUT_DATE_HEADING_CLASS,
  CHECKOUT_DATE_STRIP_CLASS,
  CHECKOUT_DATE_WEEKDAY_CLASS,
} from './checkoutData';

const CheckoutDatePicker = memo(({ copy, dates, selectedDateId, monthYearLabel, onSelect }) => {
  const { stripRef, handleDateSelect } = useCheckoutDateStrip(onSelect);

  return (
    <div>
      <div className="mb-3 flex items-center justify-between gap-4">
        <p className={CHECKOUT_DATE_HEADING_CLASS}>{copy.chooseDate}</p>
        <p className={CHECKOUT_DATE_HEADING_CLASS}>{monthYearLabel}</p>
      </div>
      <div
        ref={stripRef}
        role="listbox"
        aria-label={copy.chooseDate}
        className={CHECKOUT_DATE_STRIP_CLASS}
      >
        {dates.map((date) => (
          <button
            key={date.id}
            type="button"
            role="option"
            aria-selected={date.id === selectedDateId}
            onClick={(event) => handleDateSelect(date.id, event)}
            className={
              date.id === selectedDateId ? CHECKOUT_DATE_BUTTON_ACTIVE : CHECKOUT_DATE_BUTTON_IDLE
            }
          >
            <span className={CHECKOUT_DATE_WEEKDAY_CLASS}>{date.weekday}</span>
            <span className={CHECKOUT_DATE_DAY_CLASS}>{date.day}</span>
          </button>
        ))}
      </div>
    </div>
  );
});

CheckoutDatePicker.displayName = 'CheckoutDatePicker';

export default CheckoutDatePicker;
