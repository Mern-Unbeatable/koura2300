import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import CheckoutDatePicker from '../CheckoutDatePicker';
import { CHECKOUT_CONTENT } from '../checkoutCopy';
import { CHECKOUT_DATE_SCROLL_STEP, buildCheckoutDates } from '../checkoutData';

const renderDatePicker = (props = {}) => {
  const dates = buildCheckoutDates(30, new Date(2026, 7, 20));
  const onSelect = jest.fn();

  render(
    <CheckoutDatePicker
      copy={CHECKOUT_CONTENT}
      dates={dates}
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

  it('renders lucide navigation controls beside the month label', () => {
    renderDatePicker();

    expect(screen.getByRole('button', { name: 'Show previous dates' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Show next dates' })).toBeInTheDocument();
    expect(screen.getByText('August,2026')).toBeInTheDocument();
  });

  it('scrolls one full row when the next dates button is clicked', () => {
    const { dates } = renderDatePicker();

    const strip = screen.getByRole('listbox', { name: 'Choose a Date *' });
    Object.defineProperty(strip, 'clientWidth', { configurable: true, value: 300 });
    Object.defineProperty(strip, 'scrollWidth', { configurable: true, value: 2400 });
    Object.defineProperty(strip, 'scrollLeft', { configurable: true, writable: true, value: 0 });

    const firstButton = screen.getByRole('option', {
      name: new RegExp(`${dates[0].weekday}\\s+${dates[0].day}`),
    });
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
    const lastVisibleButton = screen.getByRole('option', {
      name: new RegExp(`${dates[lastVisibleIndex].weekday}\\s+${dates[lastVisibleIndex].day}`),
    });
    const nextButton = screen.getByRole('option', {
      name: new RegExp(`${dates[lastVisibleIndex + 1].weekday}\\s+${dates[lastVisibleIndex + 1].day}`),
    });

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
