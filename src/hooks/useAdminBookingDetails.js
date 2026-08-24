import { useCallback, useEffect, useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';
import { BOOKING_DETAILS_COPY } from '../components/admin/bookingDetails/bookingDetailsCopy';
import {
  getBookingDetailsById,
  mergeMaterialItems,
} from '../components/admin/bookingDetails/bookingDetailsUtils';

const useAdminBookingDetails = () => {
  const { bookingId } = useParams();
  const [chatBookingId, setChatBookingId] = useState(null);
  const [isAddMaterialOpen, setIsAddMaterialOpen] = useState(false);
  const [materialOverride, setMaterialOverride] = useState(null);

  const baseBooking = useMemo(() => getBookingDetailsById(bookingId), [bookingId]);

  useEffect(() => {
    setMaterialOverride(null);
    setIsAddMaterialOpen(false);
    setChatBookingId(null);
  }, [bookingId]);

  const booking = useMemo(() => {
    if (!baseBooking) {
      return null;
    }

    if (!materialOverride) {
      return baseBooking;
    }

    return {
      ...baseBooking,
      materialItems: materialOverride.materialItems,
      materialTotal: materialOverride.materialTotal,
    };
  }, [baseBooking, materialOverride]);

  const handleChatWithCustomer = useCallback((nextBookingId) => {
    if (!nextBookingId) {
      return;
    }

    setChatBookingId(nextBookingId);
  }, []);

  const handleCloseChatWithCustomer = useCallback(() => {
    setChatBookingId(null);
  }, []);

  const handleOpenAddMaterial = useCallback(() => {
    setIsAddMaterialOpen(true);
  }, []);

  const handleCloseAddMaterial = useCallback(() => {
    setIsAddMaterialOpen(false);
  }, []);

  const handleAddMaterial = useCallback((nextMaterial) => {
    setMaterialOverride((current) => {
      if (!current) {
        return nextMaterial;
      }

      return mergeMaterialItems(current.materialItems, nextMaterial.materialItems);
    });
  }, []);

  return {
    copy: BOOKING_DETAILS_COPY,
    booking,
    chatBookingId,
    isAddMaterialOpen,
    onChatWithCustomer: handleChatWithCustomer,
    onCloseChatWithCustomer: handleCloseChatWithCustomer,
    onOpenAddMaterial: handleOpenAddMaterial,
    onCloseAddMaterial: handleCloseAddMaterial,
    onAddMaterial: handleAddMaterial,
  };
};

export default useAdminBookingDetails;
