import { useCallback, useState } from 'react';
import toast from 'react-hot-toast';
import { BOOKINGS_CREATE_OFFER_COPY } from '../components/admin/bookingsChat/bookingsCreateOfferCopy';
import {
  buildChatOfferFromProducts,
  createEmptyOfferProduct,
  hasOfferValidationErrors,
  validateOfferProducts,
} from '../components/admin/bookingsChat/bookingsCreateOfferUtils';

const useAdminBookingsCreateOffer = ({ bookingId, onClose, onSend }) => {
  const [products, setProducts] = useState(() => [createEmptyOfferProduct()]);
  const [errors, setErrors] = useState({});

  const handleFieldChange = useCallback((productId, field, value) => {
    setProducts((currentProducts) =>
      currentProducts.map((product) =>
        product.id === productId ? { ...product, [field]: value } : product,
      ),
    );
    setErrors((currentErrors) => {
      const productErrors = currentErrors[productId];
      if (!productErrors?.[field]) {
        return currentErrors;
      }

      const nextProductErrors = { ...productErrors };
      delete nextProductErrors[field];

      if (Object.keys(nextProductErrors).length === 0) {
        const nextErrors = { ...currentErrors };
        delete nextErrors[productId];
        return nextErrors;
      }

      return { ...currentErrors, [productId]: nextProductErrors };
    });
  }, []);

  const handleAddProduct = useCallback(() => {
    setProducts((currentProducts) => [...currentProducts, createEmptyOfferProduct()]);
  }, []);

  const handleSendOffer = useCallback(() => {
    const nextErrors = validateOfferProducts(products);
    setErrors(nextErrors);

    if (hasOfferValidationErrors(nextErrors)) {
      return;
    }

    const offer = buildChatOfferFromProducts(bookingId, products);
    onSend(offer);
    toast.success(BOOKINGS_CREATE_OFFER_COPY.sendSuccessToast);
    onClose();
  }, [bookingId, onClose, onSend, products]);

  return {
    copy: BOOKINGS_CREATE_OFFER_COPY,
    products,
    errors,
    handleFieldChange,
    handleAddProduct,
    handleSendOffer,
    handleCancel: onClose,
  };
};

export default useAdminBookingsCreateOffer;
