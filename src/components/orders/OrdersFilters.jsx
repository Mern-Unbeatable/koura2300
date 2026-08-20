import React, { memo, useCallback } from 'react';
import {
  ORDER_FILTER_ACTIVE,
  ORDER_FILTER_IDLE,
  ORDER_FILTER_TABS,
  ORDER_FILTERS_CLASS,
} from './ordersData';

const OrdersFilterTab = memo(({ tab, isActive, onSelect }) => {
  const handleClick = useCallback(() => {
    onSelect(tab.id);
  }, [onSelect, tab.id]);

  return (
    <button
      type="button"
      role="tab"
      aria-selected={isActive}
      aria-pressed={isActive}
      onClick={handleClick}
      className={isActive ? ORDER_FILTER_ACTIVE : ORDER_FILTER_IDLE}
    >
      {tab.label}
    </button>
  );
});

OrdersFilterTab.displayName = 'OrdersFilterTab';

const OrdersFilters = memo(({ selectedFilter, filtersLabel, onFilterChange }) => (
  <div role="tablist" aria-label={filtersLabel} className={ORDER_FILTERS_CLASS}>
    {ORDER_FILTER_TABS.map((tab) => (
      <OrdersFilterTab
        key={tab.id}
        tab={tab}
        isActive={selectedFilter === tab.id}
        onSelect={onFilterChange}
      />
    ))}
  </div>
));

OrdersFilters.displayName = 'OrdersFilters';

export default OrdersFilters;
