import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import useClickOutside from './useClickOutside';
import useEscapeKey from './useEscapeKey';
import {
  buildCalendarMonthCells,
  formatCheckoutMonthYear,
  parseCheckoutIsoDate,
} from '../components/checkout/checkoutData';

const useCheckoutCalendar = ({ selectedDateId, onSelect, onScrollToDate, bookingFromDate }) => {
  const containerRef = useRef(null);
  const [isOpen, setIsOpen] = useState(false);
  const [viewDate, setViewDate] = useState(() =>
    selectedDateId ? parseCheckoutIsoDate(selectedDateId) : bookingFromDate,
  );

  const cells = useMemo(
    () =>
      buildCalendarMonthCells(
        viewDate.getFullYear(),
        viewDate.getMonth(),
        selectedDateId,
        bookingFromDate,
      ),
    [bookingFromDate, selectedDateId, viewDate],
  );
  const viewMonthYear = formatCheckoutMonthYear(viewDate);

  useEffect(() => {
    if (selectedDateId) {
      setViewDate(parseCheckoutIsoDate(selectedDateId));
    }
  }, [selectedDateId]);

  const closeCalendar = useCallback(() => {
    setIsOpen(false);
  }, []);

  const toggleCalendar = useCallback(() => {
    setIsOpen((previous) => !previous);
  }, []);

  useEscapeKey(isOpen, closeCalendar);
  useClickOutside(isOpen, containerRef, closeCalendar);

  const handlePreviousMonth = useCallback(() => {
    setViewDate((previous) => new Date(previous.getFullYear(), previous.getMonth() - 1, 1));
  }, []);

  const handleNextMonth = useCallback(() => {
    setViewDate((previous) => new Date(previous.getFullYear(), previous.getMonth() + 1, 1));
  }, []);

  const handleSelectDay = useCallback(
    (iso, isSelectable) => {
      if (!isSelectable) {
        return;
      }

      onSelect(iso);
      onScrollToDate(iso);
      closeCalendar();
    },
    [closeCalendar, onScrollToDate, onSelect],
  );

  return {
    containerRef,
    isOpen,
    cells,
    viewMonthYear,
    toggleCalendar,
    closeCalendar,
    handlePreviousMonth,
    handleNextMonth,
    handleSelectDay,
  };
};

export default useCheckoutCalendar;
