import React, { memo } from 'react';
import useLandingSearch from '../../hooks/useLandingSearch';
import useOrders from '../../hooks/useOrders';
import useScrollToTop from '../../hooks/useScrollToTop';
import { ALL_CATALOG_SERVICES } from '../catalog/catalogRegistry';
import LandingFooter from '../home/LandingFooter';
import LandingHeader from '../home/LandingHeader';
import OrdersView from './OrdersView';
import { ORDERS_CONTENT } from './ordersCopy';
import { ORDER_MAIN_CLASS, ORDER_PAGE_CLASS } from './ordersData';

const OrdersContent = memo(() => {
  useScrollToTop();

  const { searchValue, handleSearchChange, handleSearchSubmit } =
    useLandingSearch(ALL_CATALOG_SERVICES);
  const orders = useOrders();

  return (
    <div className={ORDER_PAGE_CLASS}>
      <LandingHeader
        searchValue={searchValue}
        onSearchChange={handleSearchChange}
        onSearchSubmit={handleSearchSubmit}
      />
      <main className={ORDER_MAIN_CLASS}>
        <OrdersView
          copy={ORDERS_CONTENT}
          summary={orders.summary}
          selectedFilter={orders.selectedFilter}
          visibleOrders={orders.visibleOrders}
          orderCountLabel={orders.orderCountLabel}
          onFilterChange={orders.handleFilterChange}
          onViewDetails={orders.handleViewDetails}
          onPayNow={orders.handlePayNow}
          onCancelBooking={orders.handleCancelBooking}
          onDownload={orders.handleDownload}
        />
      </main>
      <LandingFooter />
    </div>
  );
});

OrdersContent.displayName = 'OrdersContent';

export default OrdersContent;
