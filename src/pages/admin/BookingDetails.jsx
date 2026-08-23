import BookingDetailsView from '../../components/admin/bookingDetails/BookingDetailsView';
import { BOOKING_DETAILS_COPY } from '../../components/admin/bookingDetails/bookingDetailsCopy';
import useAdminBookingDetails from '../../hooks/useAdminBookingDetails';
import { useSEO } from '../../hooks/useSEO';

const BookingDetails = () => {
  const detailsProps = useAdminBookingDetails();
  useSEO(BOOKING_DETAILS_COPY.seo);

  return <BookingDetailsView {...detailsProps} />;
};

export default BookingDetails;
