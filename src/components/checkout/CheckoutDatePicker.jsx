import React, { memo } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import useCheckoutCalendar from '../../hooks/useCheckoutCalendar';
import useCheckoutDateStrip from '../../hooks/useCheckoutDateStrip';
import CheckoutCalendarPanel, { CheckoutCalendarTrigger } from './CheckoutCalendarPanel';
import {
  CHECKOUT_DATE_BUTTON_ACTIVE,
  CHECKOUT_DATE_BUTTON_IDLE,
  CHECKOUT_DATE_DAY_CLASS,
  CHECKOUT_DATE_HEADER_CLASS,
  CHECKOUT_DATE_HEADING_CLASS,
  CHECKOUT_DATE_NAV_BUTTON_CLASS,
  CHECKOUT_CALENDAR_WRAPPER_CLASS,
  CHECKOUT_DATE_NAV_GROUP_CLASS,
  CHECKOUT_DATE_NAV_ICON_SIZE,
  CHECKOUT_DATE_STRIP_CLASS,
  CHECKOUT_DATE_WEEKDAY_CLASS,
} from './checkoutData';

const CheckoutDatePicker = memo(({ copy, dates, selectedDateId, monthYearLabel, onSelect, bookingFromDate }) => {
  const {
    stripRef,
    displayMonthYear,
    canScrollPrevious,
    canScrollNext,
    isDragging,
    handleDateSelect,
    handleScrollPrevious,
    handleScrollNext,
    handleMouseDown,
    handleStripScroll,
    scrollToDateId,
  } = useCheckoutDateStrip({ dates, monthYearLabel, onSelect });

  const calendar = useCheckoutCalendar({
    selectedDateId,
    onSelect,
    onScrollToDate: scrollToDateId,
    bookingFromDate,
  });

  return (
    <div>
      <div className={CHECKOUT_DATE_HEADER_CLASS}>
        <p className={CHECKOUT_DATE_HEADING_CLASS}>{copy.chooseDate}</p>
        <div className={CHECKOUT_DATE_NAV_GROUP_CLASS}>
          <button
            type="button"
            aria-label={copy.previousDates}
            className={CHECKOUT_DATE_NAV_BUTTON_CLASS}
            disabled={!canScrollPrevious}
            onClick={handleScrollPrevious}
          >
            <ChevronLeft size={CHECKOUT_DATE_NAV_ICON_SIZE} aria-hidden="true" />
          </button>
          <button
            type="button"
            aria-label={copy.nextDates}
            className={CHECKOUT_DATE_NAV_BUTTON_CLASS}
            disabled={!canScrollNext}
            onClick={handleScrollNext}
          >
            <ChevronRight size={CHECKOUT_DATE_NAV_ICON_SIZE} aria-hidden="true" />
          </button>
          <div ref={calendar.containerRef} className={CHECKOUT_CALENDAR_WRAPPER_CLASS}>
            <CheckoutCalendarTrigger
              copy={copy}
              viewMonthYear={displayMonthYear}
              isOpen={calendar.isOpen}
              onToggle={calendar.toggleCalendar}
            />
            <CheckoutCalendarPanel
              copy={copy}
              isOpen={calendar.isOpen}
              viewMonthYear={calendar.viewMonthYear}
              cells={calendar.cells}
              onPreviousMonth={calendar.handlePreviousMonth}
              onNextMonth={calendar.handleNextMonth}
              onSelectDay={calendar.handleSelectDay}
            />
          </div>
        </div>
      </div>
      <div
        ref={stripRef}
        role="listbox"
        aria-label={copy.chooseDate}
        className={`${CHECKOUT_DATE_STRIP_CLASS}${isDragging ? ' cursor-grabbing' : ''}`}
        onMouseDown={handleMouseDown}
        onScroll={handleStripScroll}
      >
        {dates.map((date) => (
          <button
            key={date.id}
            type="button"
            role="option"
            data-date-id={date.id}
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
