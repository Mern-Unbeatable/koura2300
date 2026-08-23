import BookingsView from '../../components/admin/bookings/BookingsView';
import useAdminBookings from '../../hooks/useAdminBookings';

const Bookings = () => {
  const bookingsProps = useAdminBookings();

  return <BookingsView {...bookingsProps} />;
};

export default Bookings;
