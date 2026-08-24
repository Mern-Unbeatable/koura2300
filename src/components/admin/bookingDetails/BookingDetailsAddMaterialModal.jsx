import { Package, X } from 'lucide-react';
import useAdminBookingDetailsAddMaterial from '../../../hooks/useAdminBookingDetailsAddMaterial';
import BookingsCreateOfferFields from '../bookingsChat/BookingsCreateOfferFields';
import {
  BOOKINGS_CREATE_OFFER_ACTIONS_CLASS,
  BOOKINGS_CREATE_OFFER_ADD_PRODUCT_CLASS,
  BOOKINGS_CREATE_OFFER_BODY_CLASS,
  BOOKINGS_CREATE_OFFER_CANCEL_CLASS,
  BOOKINGS_CREATE_OFFER_CLOSE_ICON_SIZE,
  BOOKINGS_CREATE_OFFER_DIALOG_CLASS,
  BOOKINGS_CREATE_OFFER_HEADER_CLASS,
  BOOKINGS_CREATE_OFFER_ICON_SIZE,
  BOOKINGS_CREATE_OFFER_ICON_WRAP_CLASS,
  BOOKINGS_CREATE_OFFER_SUBMIT_CLASS,
  BOOKINGS_CREATE_OFFER_SUBTITLE_CLASS,
  BOOKINGS_CREATE_OFFER_TITLE_CLASS,
} from '../bookingsChat/bookingsCreateOfferData';
import { BOOKING_DETAILS_ADD_MATERIAL_OVERLAY_CLASS } from './bookingDetailsData';

const BookingDetailsAddMaterialModal = ({ onClose, onAdd }) => {
  const {
    copy,
    products,
    errors,
    handleFieldChange,
    handleAddProduct,
    handleSubmit,
    handleCancel,
  } = useAdminBookingDetailsAddMaterial({ onClose, onAdd });

  const handleOverlayClick = (event) => {
    if (event.target === event.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      className={BOOKING_DETAILS_ADD_MATERIAL_OVERLAY_CLASS}
      data-testid="booking-details-add-material-overlay"
      onClick={handleOverlayClick}
      role="presentation"
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-label={copy.regionLabel}
        className={BOOKINGS_CREATE_OFFER_DIALOG_CLASS}
      >
        <header className={BOOKINGS_CREATE_OFFER_HEADER_CLASS}>
          <div className="flex min-w-0 flex-1 items-center gap-2">
            <span className={BOOKINGS_CREATE_OFFER_ICON_WRAP_CLASS} aria-hidden="true">
              <Package size={BOOKINGS_CREATE_OFFER_ICON_SIZE} />
            </span>
            <div className="min-w-0">
              <h3 className={BOOKINGS_CREATE_OFFER_TITLE_CLASS}>{copy.title}</h3>
              <p className={BOOKINGS_CREATE_OFFER_SUBTITLE_CLASS}>{copy.subtitle}</p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label={copy.closeLabel}
            className="cursor-pointer rounded-md p-1 text-[#1e1e1e] transition-colors hover:text-brand-orange focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-orange"
          >
            <X size={BOOKINGS_CREATE_OFFER_CLOSE_ICON_SIZE} aria-hidden="true" />
          </button>
        </header>

        <div className={BOOKINGS_CREATE_OFFER_BODY_CLASS}>
          <div className="flex w-full flex-col gap-5 min-[376px]:gap-[21px]">
            {products.map((product) => (
              <BookingsCreateOfferFields
                key={product.id}
                product={product}
                errors={errors[product.id]}
                copy={copy}
                onFieldChange={handleFieldChange}
              />
            ))}
            <button
              type="button"
              onClick={handleAddProduct}
              className={BOOKINGS_CREATE_OFFER_ADD_PRODUCT_CLASS}
            >
              {copy.addNewProduct}
            </button>
          </div>

          <div className={BOOKINGS_CREATE_OFFER_ACTIONS_CLASS}>
            <button type="button" onClick={handleCancel} className={BOOKINGS_CREATE_OFFER_CANCEL_CLASS}>
              {copy.cancel}
            </button>
            <button type="button" onClick={handleSubmit} className={BOOKINGS_CREATE_OFFER_SUBMIT_CLASS}>
              {copy.submit}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingDetailsAddMaterialModal;
