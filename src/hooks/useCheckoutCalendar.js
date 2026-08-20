import { useCallback, useEffect, useMemo, useState } from 'react';
import useEscapeKey from './useEscapeKey';
import {
  buildCalendarMonthCells,
  formatCheckoutMonthYear,
} from '../components/checkout/checkoutData';

const parseIsoDate = (isoDate) => {
  const [year, month, day] = isoDate.split('-').map(Number);
  return new Date(year, month - 1, day);
};

const useCheckoutCalendar = ({ selectedDateId, onSelect, onScrollToDate, bookingFromDate }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [viewDate, setViewDate] = useState(() =>
    selectedDateId ? parseIsoDate(selectedDateId) : bookingFromDate,
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
      setViewDate(parseIsoDate(selectedDateId));
    }
  }, [selectedDateId]);

  const closeCalendar = useCallback(() => {
    setIsOpen(false);
  }, []);

  const toggleCalendar = useCallback(() => {
    setIsOpen((previous) => !previous);
  }, []);

  useEscapeKey(isOpen, closeCalendar);

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
