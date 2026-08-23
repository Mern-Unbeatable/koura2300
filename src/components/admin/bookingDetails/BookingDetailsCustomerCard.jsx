import { User } from 'lucide-react';
import BookingDetailsCard from './BookingDetailsCard';
import BookingDetailsMetaPairs from './BookingDetailsMetaPairs';

const BookingDetailsCustomerCard = ({ copy, customer }) => (
  <BookingDetailsCard title={copy.sections.customerInformation} icon={User}>
    <BookingDetailsMetaPairs
      pairs={[
        {
          left: { label: copy.labels.name, value: customer.name },
          right: {
            label: copy.labels.location,
            value: customer.location,
            highlight: true,
          },
        },
        {
          left: { label: copy.labels.phone, value: customer.phone },
          right: {
            label: copy.labels.preferredContact,
            value: customer.preferredContact,
            highlight: true,
          },
        },
        {
          left: { label: copy.labels.email, value: customer.email },
        },
      ]}
    />
  </BookingDetailsCard>
);

export default BookingDetailsCustomerCard;
