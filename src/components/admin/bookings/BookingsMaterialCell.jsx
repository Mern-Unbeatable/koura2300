import { BOOKINGS_MATERIAL_NONE_CLASS, BOOKINGS_MATERIAL_REQUIRED_CLASS } from './bookingsData';

const BookingsMaterialCell = ({ material, copy }) => {
  const isRequired = material === 'required';

  return (
    <span className={isRequired ? BOOKINGS_MATERIAL_REQUIRED_CLASS : BOOKINGS_MATERIAL_NONE_CLASS}>
      {isRequired ? copy.material.required : copy.material.none}
    </span>
  );
};

export default BookingsMaterialCell;
