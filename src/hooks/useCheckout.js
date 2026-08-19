import { useCallback, useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import { selectUser } from '../store/slices/authSlice';
import { selectCartItems } from '../store/slices/cartSlice';
import { CHECKOUT_CONTENT } from '../components/checkout/checkoutCopy';
import {
  CHECKOUT_CONTACT_METHODS,
  CHECKOUT_TIME_SLOTS,
  buildCheckoutDates,
} from '../components/checkout/checkoutData';

const createCheckoutFields = (user) => ({
  firstName: user?.name ?? '',
  email: user?.email ?? '',
  phone: user?.phone ?? '',
  street: user?.address ?? '',
  city: '',
  zip: '',
});

const useCheckout = () => {
  const user = useSelector(selectUser);
  const cartItems = useSelector(selectCartItems);
  const dates = useMemo(() => buildCheckoutDates(), []);
  const [fields, setFields] = useState(() => createCheckoutFields(user));
  const [selectedDateId, setSelectedDateId] = useState(dates[0]?.id ?? '');
  const [selectedTime, setSelectedTime] = useState(CHECKOUT_TIME_SLOTS[0]);
  const [contactMethod, setContactMethod] = useState(CHECKOUT_CONTACT_METHODS.PHONE);

  const handleFieldChange = useCallback((name) => (event) => {
    setFields((previous) => ({ ...previous, [name]: event.target.value }));
  }, []);

  const selectedDate = dates.find((date) => date.id === selectedDateId) ?? dates[0];
  const primaryItem = cartItems[0];
  const contactLabel =
    contactMethod === CHECKOUT_CONTACT_METHODS.PHONE
      ? CHECKOUT_CONTENT.phoneSms
      : CHECKOUT_CONTENT.emailContact;

  return {
    copy: CHECKOUT_CONTENT,
    fields,
    dates,
    timeSlots: CHECKOUT_TIME_SLOTS,
    selectedDateId,
    selectedTime,
    contactMethod,
    cartItems,
    primaryItem,
    selectedDate,
    contactLabel,
    handleFieldChange,
    setSelectedDateId,
    setSelectedTime,
    setContactMethod,
  };
};

export default useCheckout;
