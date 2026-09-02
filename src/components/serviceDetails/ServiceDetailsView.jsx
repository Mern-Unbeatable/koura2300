import React, { memo } from 'react';
import useAddService from '../../hooks/useAddService';
import useServiceBooking from '../../hooks/useServiceBooking';
import FlooringCalculator from './flooringCalculator/FlooringCalculator';
import { hasFlooringCalculator } from './flooringCalculator/flooringCalculatorUtils';
import CountertopCalculator from './countertopCalculator/CountertopCalculator';
import { hasCountertopCalculator } from './countertopCalculator/countertopCalculatorUtils';
import BacksplashCalculator from './backsplashCalculator/BacksplashCalculator';
import { hasBacksplashCalculator } from './backsplashCalculator/backsplashCalculatorUtils';
import BathroomTileCalculator from './bathroomTileCalculator/BathroomTileCalculator';
import { hasBathroomTileCalculator } from './bathroomTileCalculator/bathroomTileCalculatorUtils';
import PaintingCalculator from './paintingCalculator/PaintingCalculator';
import { hasPaintingCalculator } from './paintingCalculator/paintingCalculatorUtils';
import DrywallCalculator from './drywallCalculator/DrywallCalculator';
import { hasDrywallCalculator } from './drywallCalculator/drywallCalculatorUtils';
import InsulationCalculator from './insulationCalculator/InsulationCalculator';
import { hasInsulationCalculator } from './insulationCalculator/insulationCalculatorUtils';
import ServiceDetailsBooking from './ServiceDetailsBooking';
import ServiceDetailsBreadcrumb from './ServiceDetailsBreadcrumb';
import ServiceDetailsChat from './ServiceDetailsChat';
import ServiceDetailsContactMethod from './ServiceDetailsContactMethod';
import ServiceDetailsCreateAccount from './ServiceDetailsCreateAccount';
import ServiceDetailsGallery from './ServiceDetailsGallery';
import ServiceDetailsInclusions from './ServiceDetailsInclusions';
import ServiceDetailsPackages from './ServiceDetailsPackages';
import ServiceDetailsRelated from './ServiceDetailsRelated';
import ServiceDetailsSignUpMethods from './ServiceDetailsSignUpMethods';
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
    const showFlooringCalculator = hasFlooringCalculator(service);
    const showCountertopCalculator = hasCountertopCalculator(service);
    const showBacksplashCalculator = hasBacksplashCalculator(service);
    const showBathroomTileCalculator = hasBathroomTileCalculator(service);
    const showPaintingCalculator = hasPaintingCalculator(service);
    const showDrywallCalculator = hasDrywallCalculator(service);
    const showInsulationCalculator = hasInsulationCalculator(service);

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
              {showFlooringCalculator ? <FlooringCalculator /> : null}
              {showCountertopCalculator ? <CountertopCalculator /> : null}
              {showBacksplashCalculator ? <BacksplashCalculator /> : null}
              {showBathroomTileCalculator ? <BathroomTileCalculator /> : null}
              {showPaintingCalculator ? <PaintingCalculator /> : null}
              {showDrywallCalculator ? <DrywallCalculator /> : null}
              {showInsulationCalculator ? <InsulationCalculator /> : null}
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

          {booking.isChatOpen ? (
            <ServiceDetailsChat
              service={service}
              selectedPackage={booking.selectedPackage}
              onClose={booking.handleCloseChat}
            />
          ) : null}

          {booking.isSignUpMethodsOpen ? (
            <ServiceDetailsSignUpMethods onManualSignUp={booking.handleManualSignUp} />
          ) : null}

          {booking.isAccountOpen ? (
            <ServiceDetailsCreateAccount
              onClose={booking.handleCloseAccount}
              onComplete={booking.handleAccountComplete}
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
