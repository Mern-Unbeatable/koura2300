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
}) => ({
  id,
  price,
  title,
  ...(needsMaterials !== undefined ? { needsMaterials } : {}),
  ...(recycleOldMaterials !== undefined ? { recycleOldMaterials } : {}),
  ...(recycleSurcharge !== undefined ? { recycleSurcharge } : {}),
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
