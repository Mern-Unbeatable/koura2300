import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { addToCart } from '../store/slices/cartSlice';

const getCartItem = ({
  id,
  price,
  title,
  needsMaterials,
  recycleOldMaterials,
  recycleSurcharge,
  additionalFeatureSurcharge,
}) => ({
  id,
  price,
  title,
  ...(needsMaterials !== undefined ? { needsMaterials } : {}),
  ...(recycleOldMaterials !== undefined ? { recycleOldMaterials } : {}),
  ...(recycleSurcharge !== undefined ? { recycleSurcharge } : {}),
  ...(additionalFeatureSurcharge !== undefined ? { additionalFeatureSurcharge } : {}),
});

const useAddService = () => {
  const dispatch = useDispatch();

  return useCallback(
    (service) => {
      dispatch(addToCart(getCartItem(service)));
    },
    [dispatch],
  );
};

export default useAddService;
