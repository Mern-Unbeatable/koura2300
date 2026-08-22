import React, { memo } from 'react';
import { Link } from 'react-router-dom';
import { ROUTES } from '../../config';
import OrderDetailsBookingPayment from './OrderDetailsBookingPayment';
import OrderDetailsBookingSummary from './OrderDetailsBookingSummary';
import OrderDetailsMaterials from './OrderDetailsMaterials';
import OrderDetailsServiceInfo from './OrderDetailsServiceInfo';
import OrderDetailsSidebar from './OrderDetailsSidebar';
import OrderDetailsTimeline from './OrderDetailsTimeline';
import { ORDER_DETAILS_CONTENT } from './orderDetailsCopy';
import {
  ORDER_DETAILS_LAYOUT_CLASS,
  ORDER_DETAILS_NOT_FOUND_CLASS,
  ORDER_DETAILS_STACK_CLASS,
} from './orderDetailsData';

const OrderDetailsNotFound = memo(() => (
  <div className={ORDER_DETAILS_NOT_FOUND_CLASS}>
    <h1 className="text-2xl font-bold text-[#0f172b]">{ORDER_DETAILS_CONTENT.notFound.title}</h1>
    <p className="mt-2 text-sm text-[#62748e]">{ORDER_DETAILS_CONTENT.notFound.description}</p>
    <Link
      to={ROUTES.ORDERS}
      className="mt-6 inline-flex rounded-xl bg-[#0f172b] px-5 py-2.5 text-sm font-semibold text-white hover:bg-[#1e293b] focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-orange"
    >
      {ORDER_DETAILS_CONTENT.notFound.backLabel}
    </Link>
  </div>
));

OrderDetailsNotFound.displayName = 'OrderDetailsNotFound';

const OrderDetailsView = memo(
  ({
    order,
    openSections,
    sectionIds,
    onToggleSection,
    onPayMaterials,
    onPayNow,
  }) => {
    if (!order) {
      return <OrderDetailsNotFound />;
    }

    return (
      <div data-testid="order-details-layout" className={ORDER_DETAILS_LAYOUT_CLASS}>
        <div className={ORDER_DETAILS_STACK_CLASS}>
          <OrderDetailsBookingSummary
            order={order}
            sectionId={sectionIds.bookingSummary}
            isOpen={openSections[sectionIds.bookingSummary]}
            onToggle={onToggleSection}
          />
          <OrderDetailsTimeline
            timeline={order.timeline}
            sectionId={sectionIds.timeline}
            isOpen={openSections[sectionIds.timeline]}
            onToggle={onToggleSection}
          />
          <OrderDetailsServiceInfo
            order={order}
            sectionId={sectionIds.serviceInfo}
            isOpen={openSections[sectionIds.serviceInfo]}
            onToggle={onToggleSection}
          />
          <OrderDetailsMaterials
            order={order}
            sectionId={sectionIds.materials}
            isOpen={openSections[sectionIds.materials]}
            onToggle={onToggleSection}
            onPayMaterials={onPayMaterials}
          />
          <OrderDetailsBookingPayment
            order={order}
            sectionId={sectionIds.bookingPayment}
            isOpen={openSections[sectionIds.bookingPayment]}
            onToggle={onToggleSection}
          />
        </div>
        <OrderDetailsSidebar order={order} onPayNow={onPayNow} />
      </div>
    );
  },
);

OrderDetailsView.displayName = 'OrderDetailsView';

export default OrderDetailsView;
