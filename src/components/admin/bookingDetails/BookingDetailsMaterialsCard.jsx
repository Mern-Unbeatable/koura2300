import { Package } from 'lucide-react';
import BookingDetailsCard from './BookingDetailsCard';
import {
  BOOKING_DETAILS_ADD_MATERIAL_BUTTON_CLASS,
  BOOKING_DETAILS_MATERIALS_CELL_CLASS,
  BOOKING_DETAILS_MATERIALS_COST_CELL_CLASS,
  BOOKING_DETAILS_MATERIALS_COST_HEAD_CLASS,
  BOOKING_DETAILS_MATERIALS_HEAD_CLASS,
  BOOKING_DETAILS_MATERIALS_ITEM_CELL_CLASS,
  BOOKING_DETAILS_MATERIALS_QTY_CELL_CLASS,
  BOOKING_DETAILS_MATERIALS_TABLE_CLASS,
  BOOKING_DETAILS_MATERIALS_TABLE_WRAP_CLASS,
  BOOKING_DETAILS_MATERIALS_YES_CLASS,
} from './bookingDetailsData';
import { canAddBookingMaterial } from './bookingDetailsUtils';

const BookingDetailsMaterialsFilled = ({ copy, booking }) => (
  <>
    <div className="flex flex-wrap items-center gap-2 min-[376px]:gap-3">
      <p className="text-sm text-[#90a1b9] max-[320px]:text-xs">{copy.labels.materialRequired}</p>
      <span className={BOOKING_DETAILS_MATERIALS_YES_CLASS}>{copy.labels.yes}</span>
    </div>

    <div className={BOOKING_DETAILS_MATERIALS_TABLE_WRAP_CLASS}>
      <table className={BOOKING_DETAILS_MATERIALS_TABLE_CLASS}>
        <thead className={BOOKING_DETAILS_MATERIALS_HEAD_CLASS}>
          <tr className="border-b border-[#f1f5f9]">
            <th className={BOOKING_DETAILS_MATERIALS_CELL_CLASS}>{copy.labels.item}</th>
            <th className={BOOKING_DETAILS_MATERIALS_QTY_CELL_CLASS}>{copy.labels.qty}</th>
            <th className={BOOKING_DETAILS_MATERIALS_COST_HEAD_CLASS}>{copy.labels.cost}</th>
          </tr>
        </thead>
        <tbody>
          {booking.materialItems.map((item) => (
            <tr key={item.id} className="border-b border-[#f8fafc]">
              <td className={BOOKING_DETAILS_MATERIALS_ITEM_CELL_CLASS}>{item.name}</td>
              <td className={BOOKING_DETAILS_MATERIALS_QTY_CELL_CLASS}>{item.qty}</td>
              <td className={BOOKING_DETAILS_MATERIALS_COST_CELL_CLASS}>{item.cost}</td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr className="bg-[#f8fafc]">
            <td
              className={`${BOOKING_DETAILS_MATERIALS_CELL_CLASS} font-bold text-[#0f172b]`}
              colSpan={2}
            >
              {copy.labels.total}
            </td>
            <td
              className={`${BOOKING_DETAILS_MATERIALS_COST_CELL_CLASS} text-base font-bold max-[425px]:text-sm`}
            >
              {booking.materialTotal}
            </td>
          </tr>
        </tfoot>
      </table>
    </div>
  </>
);

const BookingDetailsMaterialsCard = ({ copy, booking, onAddMaterial }) => {
  const showAddMaterial = canAddBookingMaterial(booking);
  const hasMaterialItems = booking.materialItems.length > 0;

  const headerAction =
    showAddMaterial && onAddMaterial ? (
      <button
        type="button"
        onClick={onAddMaterial}
        className={BOOKING_DETAILS_ADD_MATERIAL_BUTTON_CLASS}
      >
        {copy.actions.addMaterial}
      </button>
    ) : null;

  if (showAddMaterial && !hasMaterialItems) {
    return (
      <BookingDetailsCard
        title={copy.sections.materialInformation}
        icon={Package}
        headerAction={headerAction}
        testId="booking-details-materials"
      />
    );
  }

  return (
    <BookingDetailsCard
      title={copy.sections.materialInformation}
      icon={Package}
      badge={copy.badges.paymentRequired}
      headerAction={headerAction}
      testId="booking-details-materials"
    >
      <BookingDetailsMaterialsFilled copy={copy} booking={booking} />
    </BookingDetailsCard>
  );
};

export default BookingDetailsMaterialsCard;
