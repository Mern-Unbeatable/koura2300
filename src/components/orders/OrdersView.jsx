import React, { memo } from 'react';
import OrderCard from './OrderCard';
import OrdersFilters from './OrdersFilters';
import OrdersSummary from './OrdersSummary';
import { ORDERS_CONTENT } from './ordersCopy';
import {
  ORDER_COUNT_CLASS,
  ORDER_EMPTY_CLASS,
  ORDER_GRID_CLASS,
  ORDER_SUBTITLE_CLASS,
  ORDER_TITLE_CLASS,
} from './ordersData';

const OrdersView = memo(
  ({
    copy = ORDERS_CONTENT,
    summary,
    selectedFilter,
    visibleOrders,
    orderCountLabel,
    onFilterChange,
    onViewDetails,
    onPayNow,
    onCancelBooking,
    onDownload,
  }) => (
    <section aria-label={copy.title}>
      <div>
        <h1 className={ORDER_TITLE_CLASS}>{copy.title}</h1>
        <p className={ORDER_SUBTITLE_CLASS}>{copy.subtitle}</p>
      </div>

      <OrdersSummary copy={copy} summary={summary} />

      <OrdersFilters
        selectedFilter={selectedFilter}
        filtersLabel={copy.filtersLabel}
        onFilterChange={onFilterChange}
      />

      <p className={ORDER_COUNT_CLASS}>{orderCountLabel}</p>

      {visibleOrders.length === 0 ? (
        <p className={ORDER_EMPTY_CLASS}>{copy.emptyState}</p>
      ) : (
        <div className={ORDER_GRID_CLASS}>
          {visibleOrders.map((order) => (
            <OrderCard
              key={order.id}
              order={order}
              labels={copy.labels}
              actions={copy.actions}
              onViewDetails={onViewDetails}
              onPayNow={onPayNow}
              onCancelBooking={onCancelBooking}
              onDownload={onDownload}
            />
          ))}
        </div>
      )}
    </section>
  ),
);

OrdersView.displayName = 'OrdersView';

export default OrdersView;
