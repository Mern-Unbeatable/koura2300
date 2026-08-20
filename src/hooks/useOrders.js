import { useCallback, useMemo, useState } from 'react';
import toast from 'react-hot-toast';
import { ORDERS_CONTENT } from '../components/orders/ordersCopy';
import {
  ORDER_FILTER,
  ORDER_ITEMS,
  buildOrderSummary,
  filterOrders,
  formatOrderCount,
} from '../components/orders/ordersData';

const useOrders = (orders = ORDER_ITEMS) => {
  const [selectedFilter, setSelectedFilter] = useState(ORDER_FILTER.ALL);

  const summary = useMemo(() => buildOrderSummary(orders), [orders]);
  const visibleOrders = useMemo(
    () => filterOrders(orders, selectedFilter),
    [orders, selectedFilter],
  );
  const orderCountLabel = formatOrderCount(
    visibleOrders.length,
    ORDERS_CONTENT.orderCountSingular,
    ORDERS_CONTENT.orderCountPlural,
  );

  const handleFilterChange = useCallback((filterId) => {
    setSelectedFilter(filterId);
  }, []);

  const handleViewDetails = useCallback(() => {
    toast.success(ORDERS_CONTENT.toasts.viewDetails);
  }, []);

  const handlePayNow = useCallback(() => {
    toast.success(ORDERS_CONTENT.toasts.payNow);
  }, []);

  const handleCancelBooking = useCallback(() => {
    toast.success(ORDERS_CONTENT.toasts.cancelBooking);
  }, []);

  const handleDownload = useCallback(() => {
    toast.success(ORDERS_CONTENT.toasts.download);
  }, []);

  return {
    selectedFilter,
    summary,
    visibleOrders,
    orderCountLabel,
    handleFilterChange,
    handleViewDetails,
    handlePayNow,
    handleCancelBooking,
    handleDownload,
  };
};

export default useOrders;
