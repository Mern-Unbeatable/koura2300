import { CalendarDays } from 'lucide-react';
import BookingDetailsCard from './BookingDetailsCard';
import BookingDetailsMetaPairs from './BookingDetailsMetaPairs';

const BookingDetailsSummaryCard = ({ copy, summary }) => (
  <BookingDetailsCard title={copy.sections.bookingSummary} icon={CalendarDays}>
    <BookingDetailsMetaPairs
      pairs={[
        {
          left: { label: copy.labels.bookingDate, value: summary.bookingDate },
          right: {
            label: copy.labels.appointmentDate,
            value: summary.appointmentDate,
            highlight: true,
          },
        },
        {
          left: { label: copy.labels.appointmentTime, value: summary.appointmentTime },
          right: { label: copy.labels.category, value: summary.category },
        },
        {
          left: { label: copy.labels.package, value: summary.package },
          right: { label: copy.labels.duration, value: summary.duration },
        },
      ]}
    />
  </BookingDetailsCard>
);

export default BookingDetailsSummaryCard;
