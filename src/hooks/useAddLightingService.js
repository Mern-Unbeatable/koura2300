import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { addToCart } from '../store/slices/cartSlice';

const getCartItem = (service) => ({
  id: service.id,
  price: service.price,
  title: service.title,
});

const useAddLightingService = () => {
  const dispatch = useDispatch();

  return useCallback(
    (service) => {
      dispatch(addToCart(getCartItem(service)));
    },
    [dispatch],
  );
};

export default useAddLightingService;
