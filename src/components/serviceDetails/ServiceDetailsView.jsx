import React, { memo } from 'react';
import useAddService from '../../hooks/useAddService';
import useServiceBooking from '../../hooks/useServiceBooking';
import ServiceDetailsBooking from './ServiceDetailsBooking';
import ServiceDetailsBreadcrumb from './ServiceDetailsBreadcrumb';
import ServiceDetailsGallery from './ServiceDetailsGallery';
import ServiceDetailsInclusions from './ServiceDetailsInclusions';
import ServiceDetailsPackages from './ServiceDetailsPackages';
import ServiceDetailsRelated from './ServiceDetailsRelated';
import ServiceDetailsSummary from './ServiceDetailsSummary';
import ServiceZipModal from './ServiceZipModal';

const ServiceDetailsView = memo(
  ({ service, relatedServices, packages, overview, includedItems, excludedItems }) => {
    const booking = useServiceBooking(service, packages);
    const handleAddService = useAddService();

    return (
      <>
        <main className="animate-page-enter mx-auto max-w-screen-2xl px-4 pb-24 pt-8 sm:px-6 sm:pt-10 lg:px-8 lg:pb-28">
          <ServiceDetailsBreadcrumb
            catalogTitle={service.catalogTitle}
            catalogPath={service.catalogPath}
            serviceTitle={service.title}
          />

          <div className="mt-6 grid items-stretch gap-5 lg:grid-cols-2">
            <ServiceDetailsGallery image={service.image} imageAlt={service.imageAlt} />

            <div className="flex h-full flex-col gap-4">
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
                onNeedMaterials={booking.handleNeedMaterials}
                onHaveMaterials={booking.handleHaveMaterials}
                onToggleRecycle={booking.handleToggleRecycle}
                onConfirmJob={booking.handleConfirmJob}
              />
            </div>
          </div>

          <ServiceDetailsInclusions includedItems={includedItems} excludedItems={excludedItems} />
          <ServiceDetailsRelated services={relatedServices} onAdd={handleAddService} />
        </main>

        <ServiceZipModal
          isOpen={booking.isZipModalOpen}
          zipCode={booking.zipCode}
          zipError={booking.zipError}
          onZipCodeChange={booking.handleZipCodeChange}
          onClose={booking.handleCloseZipModal}
          onSubmit={booking.handleSubmitZip}
        />
      </>
    );
  },
);

ServiceDetailsView.displayName = 'ServiceDetailsView';

export default ServiceDetailsView;
