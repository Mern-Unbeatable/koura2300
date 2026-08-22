import React, { memo } from 'react';
import { useParams } from 'react-router-dom';
import useLandingSearch from '../../hooks/useLandingSearch';
import useOrderDetails from '../../hooks/useOrderDetails';
import useScrollToTop from '../../hooks/useScrollToTop';
import { ALL_CATALOG_SERVICES } from '../catalog/catalogRegistry';
import LandingFooter from '../home/LandingFooter';
import LandingHeader from '../home/LandingHeader';
import OrderDetailsView from './OrderDetailsView';
import {
  ORDER_DETAILS_MAIN_CLASS,
  ORDER_DETAILS_PAGE_CLASS,
} from './orderDetailsData';

const OrderDetailsContent = memo(() => {
  useScrollToTop();
  const { orderId } = useParams();
  const { searchValue, handleSearchChange, handleSearchSubmit } =
    useLandingSearch(ALL_CATALOG_SERVICES);
  const details = useOrderDetails(orderId);

  return (
    <div className={ORDER_DETAILS_PAGE_CLASS}>
      <LandingHeader
        searchValue={searchValue}
        onSearchChange={handleSearchChange}
        onSearchSubmit={handleSearchSubmit}
      />
      <main className={ORDER_DETAILS_MAIN_CLASS}>
        <OrderDetailsView
          order={details.order}
          openSections={details.openSections}
          sectionIds={details.sectionIds}
          onToggleSection={details.toggleSection}
          onPayMaterials={details.handlePayMaterials}
          onPayNow={details.handlePayNow}
        />
      </main>
      <LandingFooter />
    </div>
  );
});

OrderDetailsContent.displayName = 'OrderDetailsContent';

export default OrderDetailsContent;
