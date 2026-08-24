import { useCallback, useState } from 'react';
import toast from 'react-hot-toast';
import { BOOKING_DETAILS_ADD_MATERIAL_COPY } from '../components/admin/bookingDetails/bookingDetailsAddMaterialCopy';
import { buildMaterialItemsFromProducts } from '../components/admin/bookingDetails/bookingDetailsUtils';
import {
  createEmptyOfferProduct,
  hasOfferValidationErrors,
  validateOfferProducts,
} from '../components/admin/bookingsChat/bookingsCreateOfferUtils';

const useAdminBookingDetailsAddMaterial = ({ onClose, onAdd }) => {
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

  const handleSubmit = useCallback(() => {
    const nextErrors = validateOfferProducts(products);
    setErrors(nextErrors);

    if (hasOfferValidationErrors(nextErrors)) {
      return;
    }

    onAdd(buildMaterialItemsFromProducts(products));
    toast.success(BOOKING_DETAILS_ADD_MATERIAL_COPY.addSuccessToast);
    onClose();
  }, [onAdd, onClose, products]);

  return {
    copy: BOOKING_DETAILS_ADD_MATERIAL_COPY,
    products,
    errors,
    handleFieldChange,
    handleAddProduct,
    handleSubmit,
    handleCancel: onClose,
  };
};

export default useAdminBookingDetailsAddMaterial;
