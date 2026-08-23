import { useCallback, useMemo } from 'react';
import toast from 'react-hot-toast';
import { useParams } from 'react-router-dom';
import { BOOKING_DETAILS_COPY } from '../components/admin/bookingDetails/bookingDetailsCopy';
import { getBookingDetailsById } from '../components/admin/bookingDetails/bookingDetailsUtils';

const useAdminBookingDetails = () => {
  const { bookingId } = useParams();

  const booking = useMemo(() => getBookingDetailsById(bookingId), [bookingId]);

  const handleChatWithCustomer = useCallback((bookingId) => {
    if (!bookingId) {
      return;
    }

    toast.success(`${BOOKING_DETAILS_COPY.toasts.chatWithCustomer} (${bookingId})`);
  }, []);

  return {
    copy: BOOKING_DETAILS_COPY,
    booking,
    onChatWithCustomer: handleChatWithCustomer,
  };
};

export default useAdminBookingDetails;
