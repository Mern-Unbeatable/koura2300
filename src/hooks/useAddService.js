import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { addToCart } from '../store/slices/cartSlice';

const getCartItem = ({ id, price, title }) => ({ id, price, title });

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
