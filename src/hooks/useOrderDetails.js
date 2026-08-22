import { useCallback, useMemo, useState } from 'react';
import toast from 'react-hot-toast';
import { ORDER_DETAILS_CONTENT } from '../components/orderDetails/orderDetailsCopy';
import { findOrderDetails } from '../components/orderDetails/orderDetailsData';

const SECTION_IDS = {
  bookingSummary: 'bookingSummary',
  timeline: 'timeline',
  serviceInfo: 'serviceInfo',
  materials: 'materials',
  bookingPayment: 'bookingPayment',
};

const DEFAULT_OPEN_SECTIONS = {
  [SECTION_IDS.bookingSummary]: true,
  [SECTION_IDS.timeline]: true,
  [SECTION_IDS.serviceInfo]: true,
  [SECTION_IDS.materials]: true,
  [SECTION_IDS.bookingPayment]: true,
};

const useOrderDetails = (orderId) => {
  const order = useMemo(() => findOrderDetails(orderId), [orderId]);
  const [openSections, setOpenSections] = useState(DEFAULT_OPEN_SECTIONS);

  const toggleSection = useCallback((sectionId) => {
    setOpenSections((current) => ({
      ...current,
      [sectionId]: !current[sectionId],
    }));
  }, []);

  const handlePayMaterials = useCallback(() => {
    toast.success(ORDER_DETAILS_CONTENT.toasts.payMaterials);
  }, []);

  const handlePayNow = useCallback(() => {
    toast.success(ORDER_DETAILS_CONTENT.toasts.payNow);
  }, []);

  return {
    order,
    openSections,
    sectionIds: SECTION_IDS,
    toggleSection,
    handlePayMaterials,
    handlePayNow,
  };
};

export default useOrderDetails;
