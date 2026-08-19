import React, { memo } from 'react';
import useAddService from '../../hooks/useAddService';
import useServiceBooking from '../../hooks/useServiceBooking';
import ServiceDetailsBooking from './ServiceDetailsBooking';
import ServiceDetailsBreadcrumb from './ServiceDetailsBreadcrumb';
import ServiceDetailsContactMethod from './ServiceDetailsContactMethod';
import ServiceDetailsGallery from './ServiceDetailsGallery';
import ServiceDetailsInclusions from './ServiceDetailsInclusions';
import ServiceDetailsPackages from './ServiceDetailsPackages';
import ServiceDetailsRelated from './ServiceDetailsRelated';
import ServiceDetailsSummary from './ServiceDetailsSummary';
import ServiceZipPanel from './ServiceZipPanel';
import { DETAILS_SPLIT_GRID_CLASS, ZIP_PANEL_GRID_CELL_CLASS } from './serviceDetailsData';

const ServiceDetailsView = memo(
  ({
    service,
    relatedServices,
    selectedCategory,
    packages,
    overview,
    includedItems,
    excludedItems,
  }) => {
    const booking = useServiceBooking(service, packages);
    const handleAddService = useAddService();

    return (
      <main className="animate-page-enter mx-auto min-w-0 max-w-screen-2xl px-4 pb-24 pt-8 sm:px-6 sm:pt-10 lg:px-8 lg:pb-28">
          <ServiceDetailsBreadcrumb
            catalogTitle={service.catalogTitle}
            catalogPath={service.catalogPath}
            serviceTitle={service.title}
          />

          <div className={DETAILS_SPLIT_GRID_CLASS}>
            <ServiceDetailsGallery image={service.image} imageAlt={service.imageAlt} />

            <div className="flex h-full min-w-0 flex-col gap-4">
              <ServiceDetailsSummary
                title={service.title}
                overview={overview}
                duration={service.duration}
                rating={service.rating}
              />
              <div className="flex min-h-0 flex-1 flex-col">
                <ServiceDetailsPackages
                  packages={packages}
                  selectedPackageId={booking.selectedPackageId}
                  onSelectPackage={booking.handleSelectPackage}
                />
              </div>
              <ServiceDetailsBooking
                needsMaterials={booking.needsMaterials}
                recycleOldMaterials={booking.recycleOldMaterials}
                isZipPanelOpen={booking.isZipPanelOpen}
                onNeedMaterials={booking.handleNeedMaterials}
                onHaveMaterials={booking.handleHaveMaterials}
                onToggleRecycle={booking.handleToggleRecycle}
                onConfirmJob={booking.handleConfirmJob}
              />
            </div>
            {booking.isZipPanelOpen ? (
              <div className={ZIP_PANEL_GRID_CELL_CLASS}>
                <ServiceZipPanel
                  zipCode={booking.zipCode}
                  onZipCodeChange={booking.handleZipCodeChange}
                  onClose={booking.handleCloseZipPanel}
                  onSubmit={booking.handleSubmitZip}
                />
              </div>
            ) : null}
          </div>

          {booking.isContactMethodVisible ? (
            <ServiceDetailsContactMethod
              selectedContactMethod={booking.selectedContactMethod}
              onSelectContactMethod={booking.handleSelectContactMethod}
            />
          ) : null}

          <ServiceDetailsInclusions includedItems={includedItems} excludedItems={excludedItems} />
          <ServiceDetailsRelated
            services={relatedServices}
            selectedCategory={selectedCategory}
            onAdd={handleAddService}
          />
        </main>
    );
  },
);

ServiceDetailsView.displayName = 'ServiceDetailsView';

export default ServiceDetailsView;
