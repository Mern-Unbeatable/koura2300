import React, { memo } from 'react';
import { Calendar, ChevronLeft, ChevronRight } from 'lucide-react';
import {
  CHECKOUT_CALENDAR_DAY_ACTIVE,
  CHECKOUT_CALENDAR_DAY_DISABLED,
  CHECKOUT_CALENDAR_DAY_IDLE,
  CHECKOUT_CALENDAR_DAY_OUTSIDE,
  CHECKOUT_CALENDAR_GRID_CLASS,
  CHECKOUT_CALENDAR_HEADER_CLASS,
  CHECKOUT_CALENDAR_ICON_SIZE,
  CHECKOUT_CALENDAR_MONTH_CLASS,
  CHECKOUT_CALENDAR_PANEL_CLASS,
  CHECKOUT_CALENDAR_TRIGGER_CLASS,
  CHECKOUT_CALENDAR_WEEKDAY_CLASS,
  CHECKOUT_CALENDAR_WEEKDAY_ROW_CLASS,
  CHECKOUT_CALENDAR_WEEKDAYS,
  CHECKOUT_DATE_NAV_BUTTON_CLASS,
  CHECKOUT_DATE_NAV_ICON_SIZE,
} from './checkoutData';

const CalendarDay = memo(({ cell, onSelect }) => {
  if (!cell.isCurrentMonth && !cell.isSelectable) {
    return <span className={CHECKOUT_CALENDAR_DAY_OUTSIDE}>{cell.day}</span>;
  }

  if (!cell.isSelectable) {
    return <span className={CHECKOUT_CALENDAR_DAY_DISABLED}>{cell.day}</span>;
  }

  return (
    <button
      type="button"
      aria-label={cell.iso}
      aria-pressed={cell.isSelected}
      onClick={() => onSelect(cell.iso, cell.isSelectable)}
      className={cell.isSelected ? CHECKOUT_CALENDAR_DAY_ACTIVE : CHECKOUT_CALENDAR_DAY_IDLE}
    >
      {cell.day}
    </button>
  );
});

CalendarDay.displayName = 'CalendarDay';

const CheckoutCalendarPanel = memo(
  ({ copy, isOpen, viewMonthYear, cells, onPreviousMonth, onNextMonth, onSelectDay }) => {
    if (!isOpen) {
      return null;
    }

    return (
      <div role="dialog" aria-label={copy.openCalendar} className={CHECKOUT_CALENDAR_PANEL_CLASS}>
        <div className={CHECKOUT_CALENDAR_HEADER_CLASS}>
          <button
            type="button"
            aria-label={copy.previousMonth}
            className={CHECKOUT_DATE_NAV_BUTTON_CLASS}
            onClick={onPreviousMonth}
          >
            <ChevronLeft size={CHECKOUT_DATE_NAV_ICON_SIZE} aria-hidden="true" />
          </button>
          <p className={CHECKOUT_CALENDAR_MONTH_CLASS}>{viewMonthYear}</p>
          <button
            type="button"
            aria-label={copy.nextMonth}
            className={CHECKOUT_DATE_NAV_BUTTON_CLASS}
            onClick={onNextMonth}
          >
            <ChevronRight size={CHECKOUT_DATE_NAV_ICON_SIZE} aria-hidden="true" />
          </button>
        </div>
        <div className={CHECKOUT_CALENDAR_WEEKDAY_ROW_CLASS}>
          {CHECKOUT_CALENDAR_WEEKDAYS.map((weekday) => (
            <span key={weekday} className={CHECKOUT_CALENDAR_WEEKDAY_CLASS}>
              {weekday}
            </span>
          ))}
        </div>
        <div className={CHECKOUT_CALENDAR_GRID_CLASS}>
          {cells.map((cell) => (
            <CalendarDay key={`${cell.iso}-${cell.day}`} cell={cell} onSelect={onSelectDay} />
          ))}
        </div>
      </div>
    );
  },
);

CheckoutCalendarPanel.displayName = 'CheckoutCalendarPanel';

export const CheckoutCalendarTrigger = memo(({ copy, viewMonthYear, isOpen, onToggle }) => (
  <button
    type="button"
    aria-label={copy.openCalendar}
    aria-expanded={isOpen}
    className={CHECKOUT_CALENDAR_TRIGGER_CLASS}
    onClick={onToggle}
  >
    <Calendar size={CHECKOUT_CALENDAR_ICON_SIZE} aria-hidden="true" className="text-brand-orange" />
    <span>{viewMonthYear}</span>
  </button>
));

CheckoutCalendarTrigger.displayName = 'CheckoutCalendarTrigger';

export default CheckoutCalendarPanel;
