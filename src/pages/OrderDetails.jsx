import React, { memo } from 'react';
import OrderDetailsContent from '../components/orderDetails/OrderDetailsContent';
import { ORDER_DETAILS_CONTENT } from '../components/orderDetails/orderDetailsCopy';
import { useSEO } from '../hooks/useSEO';

const OrderDetails = memo(() => {
  useSEO(ORDER_DETAILS_CONTENT.seo);

  return <OrderDetailsContent />;
});

OrderDetails.displayName = 'OrderDetails';

export default OrderDetails;
