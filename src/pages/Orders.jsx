import React, { memo } from 'react';
import OrdersContent from '../components/orders/OrdersContent';
import { ORDERS_CONTENT } from '../components/orders/ordersCopy';
import { useSEO } from '../hooks/useSEO';

const Orders = memo(() => {
  useSEO(ORDERS_CONTENT.seo);

  return <OrdersContent />;
});

Orders.displayName = 'Orders';

export default Orders;
