import { useCallback, useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';
import { BOOKING_DETAILS_COPY } from '../components/admin/bookingDetails/bookingDetailsCopy';
import { getBookingDetailsById } from '../components/admin/bookingDetails/bookingDetailsUtils';

const useAdminBookingDetails = () => {
  const { bookingId } = useParams();
  const [chatBookingId, setChatBookingId] = useState(null);

  const booking = useMemo(() => getBookingDetailsById(bookingId), [bookingId]);

  const handleChatWithCustomer = useCallback((nextBookingId) => {
    if (!nextBookingId) {
      return;
    }

    setChatBookingId(nextBookingId);
  }, []);

  const handleCloseChatWithCustomer = useCallback(() => {
    setChatBookingId(null);
  }, []);

  return {
    copy: BOOKING_DETAILS_COPY,
    booking,
    chatBookingId,
    onChatWithCustomer: handleChatWithCustomer,
    onCloseChatWithCustomer: handleCloseChatWithCustomer,
  };
};

export default useAdminBookingDetails;
