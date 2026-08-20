import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import CheckoutDatePicker from '../CheckoutDatePicker';
import { CHECKOUT_CONTENT } from '../checkoutCopy';
import { CHECKOUT_DATE_SCROLL_STEP, buildCheckoutDates, buildCalendarMonthCells } from '../checkoutData';

const BOOKING_FROM_DATE = new Date(2026, 7, 20);

const renderDatePicker = (props = {}) => {
  const dates = buildCheckoutDates(BOOKING_FROM_DATE);
  const onSelect = jest.fn();

  render(
    <CheckoutDatePicker
      copy={CHECKOUT_CONTENT}
      dates={dates}
      bookingFromDate={BOOKING_FROM_DATE}
      selectedDateId={dates[0].id}
      monthYearLabel="August,2026"
      onSelect={onSelect}
      {...props}
    />,
  );

  return { dates, onSelect };
};

describe('CheckoutDatePicker', () => {
  it('hides the scrollbar while keeping horizontal overflow scroll', () => {
    renderDatePicker();

    const strip = screen.getByRole('listbox', { name: 'Choose a Date *' });
    expect(strip).toHaveClass('overflow-x-auto');
    expect(strip.className).toContain('[scrollbar-width:none]');
    expect(strip.className).toContain('[&::-webkit-scrollbar]:hidden');
    expect(strip).toHaveClass('cursor-grab');
  });

  it('renders calendar navigation and opens a month grid picker', () => {
    renderDatePicker();

    expect(screen.getByRole('button', { name: 'Show previous dates' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Show next dates' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Open calendar' })).toHaveTextContent('August,2026');

    fireEvent.click(screen.getByRole('button', { name: 'Open calendar' }));

    expect(screen.getByRole('dialog', { name: 'Open calendar' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Previous month' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Next month' })).toBeInTheDocument();
  });

  it('closes the calendar when clicking outside', () => {
    renderDatePicker();

    fireEvent.click(screen.getByRole('button', { name: 'Open calendar' }));
    expect(screen.getByRole('dialog', { name: 'Open calendar' })).toBeInTheDocument();

    fireEvent.mouseDown(document.body);
    expect(screen.queryByRole('dialog', { name: 'Open calendar' })).not.toBeInTheDocument();
  });

  it('keeps the calendar open when clicking inside the panel', () => {
    renderDatePicker();

    fireEvent.click(screen.getByRole('button', { name: 'Open calendar' }));
    fireEvent.mouseDown(screen.getByRole('button', { name: 'Previous month' }));

    expect(screen.getByRole('dialog', { name: 'Open calendar' })).toBeInTheDocument();
  });

  it('selects a date from the calendar and closes the picker', () => {
    const { dates, onSelect } = renderDatePicker();

    fireEvent.click(screen.getByRole('button', { name: 'Open calendar' }));
    fireEvent.click(screen.getByRole('button', { name: dates[10].iso }));

    expect(onSelect).toHaveBeenCalledWith(dates[10].iso);
    expect(screen.queryByRole('dialog', { name: 'Open calendar' })).not.toBeInTheDocument();
  });

  it('marks every day in a future month as selectable', () => {
    const cells = buildCalendarMonthCells(2027, 7, null, BOOKING_FROM_DATE);
    const augustDays = cells.filter((cell) => cell.isCurrentMonth);

    expect(augustDays).toHaveLength(31);
    expect(augustDays.every((cell) => cell.isSelectable)).toBe(true);
  });

  it('disables only past days in the current month', () => {
    const cells = buildCalendarMonthCells(2026, 7, null, BOOKING_FROM_DATE);
    const augustTwelfth = cells.find((cell) => cell.isCurrentMonth && cell.day === '12');
    const augustTwentieth = cells.find((cell) => cell.isCurrentMonth && cell.day === '20');

    expect(augustTwelfth?.isSelectable).toBe(false);
    expect(augustTwentieth?.isSelectable).toBe(true);
  });

  it('scrolls one full row when the next dates button is clicked', () => {
    const { dates } = renderDatePicker();

    const strip = screen.getByRole('listbox', { name: 'Choose a Date *' });
    Object.defineProperty(strip, 'clientWidth', { configurable: true, value: 300 });
    Object.defineProperty(strip, 'scrollWidth', { configurable: true, value: 2400 });
    Object.defineProperty(strip, 'scrollLeft', { configurable: true, writable: true, value: 0 });

    const firstButton = strip.querySelector(`[data-date-id="${dates[0].id}"]`);
    Object.defineProperty(firstButton, 'offsetWidth', { configurable: true, value: 60 });

    strip.scrollBy = jest.fn(({ left }) => {
      strip.scrollLeft += left;
    });

    fireEvent.scroll(strip);
    fireEvent.click(screen.getByRole('button', { name: 'Show next dates' }));

    expect(strip.scrollBy).toHaveBeenCalledWith({
      left: (60 + 8) * CHECKOUT_DATE_SCROLL_STEP,
      behavior: 'smooth',
    });
  });

  it('reveals the next date when the last visible date is selected', () => {
    const { dates, onSelect } = renderDatePicker();

    const strip = screen.getByRole('listbox', { name: 'Choose a Date *' });
    Object.defineProperty(strip, 'clientWidth', { configurable: true, value: 300 });
    strip.getBoundingClientRect = () => ({
      left: 0,
      right: 300,
      top: 0,
      bottom: 76,
      width: 300,
      height: 76,
      x: 0,
      y: 0,
      toJSON: () => ({}),
    });

    const lastVisibleIndex = 3;
    const lastVisibleButton = strip.querySelector(`[data-date-id="${dates[lastVisibleIndex].id}"]`);
    const nextButton = strip.querySelector(`[data-date-id="${dates[lastVisibleIndex + 1].id}"]`);

    lastVisibleButton.getBoundingClientRect = () => ({
      left: 228,
      right: 300,
      top: 0,
      bottom: 68,
      width: 72,
      height: 68,
      x: 228,
      y: 0,
      toJSON: () => ({}),
    });
    nextButton.scrollIntoView = jest.fn();

    fireEvent.click(lastVisibleButton);

    expect(onSelect).toHaveBeenCalledWith(dates[lastVisibleIndex].id);
    expect(nextButton.scrollIntoView).toHaveBeenCalledWith({
      behavior: 'smooth',
      block: 'nearest',
      inline: 'end',
    });
  });

  it('scrolls horizontally when the user click-drags the strip', () => {
    renderDatePicker();

    const strip = screen.getByRole('listbox', { name: 'Choose a Date *' });
    let scrollLeft = 0;
    Object.defineProperty(strip, 'scrollLeft', {
      configurable: true,
      get: () => scrollLeft,
      set: (value) => {
        scrollLeft = Number.isFinite(value) ? value : scrollLeft;
      },
    });
    strip.querySelectorAll = jest.fn(() => []);
    strip.getBoundingClientRect = () => ({
      left: 0,
      right: 300,
      top: 0,
      bottom: 76,
      width: 300,
      height: 76,
      x: 0,
      y: 0,
      toJSON: () => ({}),
    });

    fireEvent.mouseDown(strip, { clientX: 200, button: 0 });
    fireEvent.mouseMove(window, { clientX: 150 });
    fireEvent.mouseUp(window);

    expect(scrollLeft).toBe(50);
  });
});
