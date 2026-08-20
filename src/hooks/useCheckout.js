import { useCallback, useMemo, useState } from 'react';
import toast from 'react-hot-toast';
import { useSelector } from 'react-redux';
import { getCatalogServiceById } from '../components/catalog/catalogRegistry';
import { CHECKOUT_CONTENT } from '../components/checkout/checkoutCopy';
import {
  CHECKOUT_CONTACT_METHODS,
  CHECKOUT_TIME_SLOTS,
  buildCheckoutDates,
  formatCheckoutMonthYear,
  getCheckoutStripEndDate,
  getDefaultCheckoutStripEndDate,
  getEndOfMonth,
  getServiceIdFromCartItemId,
  parseCheckoutIsoDate,
} from '../components/checkout/checkoutData';
import { selectUser } from '../store/slices/authSlice';
import { selectCartItems } from '../store/slices/cartSlice';

const createCheckoutFields = (user) => ({
  firstName: user?.name ?? '',
  email: user?.email ?? '',
  phone: user?.phone ?? '',
  street: user?.address ?? '',
  city: '',
  zip: '',
});

const getPrimaryItemImage = (primaryItem) => {
  if (!primaryItem) {
    return { src: '', alt: '' };
  }

  const catalogService = getCatalogServiceById(getServiceIdFromCartItemId(primaryItem.id));
  return {
    src: catalogService?.image ?? '',
    alt: primaryItem.title,
  };
};

const useCheckout = () => {
  const user = useSelector(selectUser);
  const cartItems = useSelector(selectCartItems);
  const bookingFromDate = useMemo(() => {
    const today = new Date();
    return new Date(today.getFullYear(), today.getMonth(), today.getDate());
  }, []);
  const [stripThroughDate, setStripThroughDate] = useState(null);
  const dates = useMemo(
    () => buildCheckoutDates(bookingFromDate, stripThroughDate),
    [bookingFromDate, stripThroughDate],
  );
  const [fields, setFields] = useState(() => createCheckoutFields(user));
  const [selectedDateId, setSelectedDateId] = useState('');
  const [selectedTime, setSelectedTime] = useState(CHECKOUT_TIME_SLOTS[0]);
  const [contactMethod, setContactMethod] = useState(CHECKOUT_CONTACT_METHODS.PHONE);

  const resolvedSelectedDateId = selectedDateId || dates[0]?.id || '';

  const handleSelectDate = useCallback(
    (dateId) => {
      setSelectedDateId(dateId);

      const selectedDate = parseCheckoutIsoDate(dateId);
      const currentStripEnd = getCheckoutStripEndDate(bookingFromDate, stripThroughDate);

      if (selectedDate > currentStripEnd) {
        setStripThroughDate(getEndOfMonth(selectedDate));
      }
    },
    [bookingFromDate, stripThroughDate],
  );

  const handleFieldChange = useCallback((name) => (event) => {
    setFields((previous) => ({ ...previous, [name]: event.target.value }));
  }, []);

  const handleConfirm = useCallback((event) => {
    event.preventDefault();
    toast.success(CHECKOUT_CONTENT.confirmSuccess);
  }, []);

  const selectedDate =
    dates.find((date) => date.id === resolvedSelectedDateId) ?? dates[0];
  const monthYearLabel = selectedDate?.monthYear ?? formatCheckoutMonthYear(new Date());
  const primaryItem = cartItems[0];
  const primaryItemImage = getPrimaryItemImage(primaryItem);
  const contactLabel =
    contactMethod === CHECKOUT_CONTACT_METHODS.PHONE
      ? CHECKOUT_CONTENT.phoneSms
      : CHECKOUT_CONTENT.emailContact;

  return {
    copy: CHECKOUT_CONTENT,
    fields,
    dates,
    bookingFromDate,
    stripEndDate: getCheckoutStripEndDate(bookingFromDate, stripThroughDate),
    defaultStripEndDate: getDefaultCheckoutStripEndDate(bookingFromDate),
    timeSlots: CHECKOUT_TIME_SLOTS,
    selectedDateId: resolvedSelectedDateId,
    selectedTime,
    contactMethod,
    cartItems,
    primaryItem,
    primaryItemImage,
    selectedDate,
    monthYearLabel,
    contactLabel,
    handleFieldChange,
    handleConfirm,
    handleSelectDate,
    setSelectedTime,
    setContactMethod,
  };
};

export default useCheckout;
