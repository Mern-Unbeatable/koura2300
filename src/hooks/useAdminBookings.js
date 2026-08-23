import { useCallback, useMemo, useState } from 'react';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { BOOKINGS_COPY } from '../components/admin/bookings/bookingsCopy';
import {
  BOOKINGS_PAGE_SIZE,
  BOOKINGS_SEED,
  BOOKINGS_STATUS_OPTIONS,
} from '../components/admin/bookings/bookingsData';
import {
  filterBookingsByStatus,
  getBookingsSummary,
  getPaginationRangeLabel,
  getTotalPages,
  paginateBookings,
  updateBookingStatus,
} from '../components/admin/bookings/bookingsUtils';
import { buildAdminBookingDetailsRoute } from '../config';

const useAdminBookings = () => {
  const navigate = useNavigate();
  const [bookings, setBookings] = useState(BOOKINGS_SEED);
  const [selectedStatusId, setSelectedStatusId] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [openActionMenuId, setOpenActionMenuId] = useState(null);
  const [chatBookingId, setChatBookingId] = useState(null);

  const filteredBookings = useMemo(
    () => filterBookingsByStatus(bookings, selectedStatusId),
    [bookings, selectedStatusId],
  );

  const totalPages = useMemo(
    () => getTotalPages(filteredBookings.length, BOOKINGS_PAGE_SIZE),
    [filteredBookings.length],
  );

  const paginatedBookings = useMemo(
    () => paginateBookings(filteredBookings, currentPage, BOOKINGS_PAGE_SIZE),
    [filteredBookings, currentPage],
  );

  const summarySubtitle = useMemo(() => getBookingsSummary(bookings).subtitle, [bookings]);

  const pagination = useMemo(
    () => ({
      rangeLabel: getPaginationRangeLabel(
        currentPage,
        BOOKINGS_PAGE_SIZE,
        filteredBookings.length,
      ),
      canGoPrevious: currentPage > 1,
      canGoNext: currentPage < totalPages,
      onPrevious: () => setCurrentPage((page) => Math.max(1, page - 1)),
      onNext: () => setCurrentPage((page) => Math.min(totalPages, page + 1)),
    }),
    [currentPage, filteredBookings.length, totalPages],
  );

  const handleStatusFilterChange = useCallback((event) => {
    setSelectedStatusId(event.target.value);
    setCurrentPage(1);
  }, []);

  const handleToggleActionMenu = useCallback((bookingId) => {
    setOpenActionMenuId((currentId) => (currentId === bookingId ? null : bookingId));
  }, []);

  const handleCloseActionMenu = useCallback(() => {
    setOpenActionMenuId(null);
  }, []);

  const handleSeeDetails = useCallback(
    (bookingId) => {
      setOpenActionMenuId(null);
      navigate(buildAdminBookingDetailsRoute(bookingId));
    },
    [navigate],
  );

  const handleChatWithCustomer = useCallback((bookingId) => {
    setOpenActionMenuId(null);
    setChatBookingId(bookingId);
  }, []);

  const handleCloseChatWithCustomer = useCallback(() => {
    setChatBookingId(null);
  }, []);

  const handleStatusChange = useCallback((bookingId, statusId) => {
    setBookings((currentBookings) => updateBookingStatus(currentBookings, bookingId, statusId));
    setOpenActionMenuId(null);
    toast.success(BOOKINGS_COPY.toasts.statusUpdated);
  }, []);

  return {
    copy: BOOKINGS_COPY,
    bookings: paginatedBookings,
    summarySubtitle,
    statusOptions: BOOKINGS_STATUS_OPTIONS,
    selectedStatusId,
    onStatusFilterChange: handleStatusFilterChange,
    pagination,
    openActionMenuId,
    onToggleActionMenu: handleToggleActionMenu,
    onCloseActionMenu: handleCloseActionMenu,
    onSeeDetails: handleSeeDetails,
    chatBookingId,
    onChatWithCustomer: handleChatWithCustomer,
    onCloseChatWithCustomer: handleCloseChatWithCustomer,
    onStatusChange: handleStatusChange,
  };
};

export default useAdminBookings;
