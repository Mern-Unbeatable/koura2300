import React, { memo, useCallback } from 'react';
import { CheckCheck, Circle } from 'lucide-react';
import { SERVICE_DETAILS_CONTENT } from './serviceDetailsCopy';
import {
  FEATURE_ICON_SIZE,
  PACKAGE_CARD_MIN_HEIGHT_CLASS,
  RADIO_FILL_IDLE,
  RADIO_FILL_SELECTED,
  RADIO_ICON_SIZE,
  SERVICE_PACKAGES,
} from './serviceDetailsData';

const PACKAGE_GRID_CLASS = 'grid h-full auto-rows-fr items-stretch gap-4 sm:grid-cols-2';
const PACKAGE_CARD_CELL_CLASS = 'flex h-full min-h-0';
const PACKAGE_CARD_BASE = `flex ${PACKAGE_CARD_MIN_HEIGHT_CLASS} h-full w-full flex-col self-stretch rounded-2xl border-2 p-4 text-left transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-orange`;
const PACKAGE_PRICE_CLASS = 'mt-1 text-[29px] font-semibold leading-none text-brand-orange';
const PACKAGE_SELECTION_BORDER_CLASS = {
  true: 'border-brand-orange/40',
  false: 'border-transparent',
};

const PACKAGE_CARD_APPEARANCE = {
  [SERVICE_PACKAGES.STANDARD]: {
    card: `${PACKAGE_CARD_BASE} bg-gray-50`,
    title: 'mt-3 text-sm font-semibold text-brand-ink',
    price: PACKAGE_PRICE_CLASS,
  },
  [SERVICE_PACKAGES.PREMIUM]: {
    card: `${PACKAGE_CARD_BASE} bg-brand-orange-light`,
    title: 'mt-3 text-sm font-semibold text-brand-orange',
    price: PACKAGE_PRICE_CLASS,
  },
};

const RADIO_STATE_CLASS = {
  true: 'text-brand-orange',
  false: 'text-gray-300',
};

const RADIO_STATE_FILL = {
  true: RADIO_FILL_SELECTED,
  false: RADIO_FILL_IDLE,
};

const PackageFeature = memo(({ feature }) => (
  <li className="flex items-center gap-3 text-sm text-brand-ink">
    <CheckCheck
      size={FEATURE_ICON_SIZE}
      aria-hidden="true"
      className="shrink-0 text-brand-orange"
    />
    {feature}
  </li>
));

PackageFeature.displayName = 'PackageFeature';

const PackageCard = memo(({ servicePackage, isSelected, onSelect }) => {
  const packageLabel = `${servicePackage.title} $${servicePackage.price}`;
  const appearance = PACKAGE_CARD_APPEARANCE[servicePackage.id];
  const selectedKey = String(isSelected);

  const handleSelect = useCallback(() => {
    onSelect(servicePackage.id);
  }, [onSelect, servicePackage.id]);

  return (
    <button
      type="button"
      role="radio"
      aria-checked={isSelected}
      aria-label={packageLabel}
      onClick={handleSelect}
      className={`${appearance.card} ${PACKAGE_SELECTION_BORDER_CLASS[selectedKey]}`}
    >
      <span className={RADIO_STATE_CLASS[selectedKey]} aria-hidden="true">
        <Circle size={RADIO_ICON_SIZE} fill={RADIO_STATE_FILL[selectedKey]} />
      </span>
      <span className={appearance.title}>{servicePackage.title}</span>
      <span className={appearance.price}>${servicePackage.price}</span>
      <ul className="mt-5 flex flex-1 flex-col gap-2">
        {servicePackage.features.map((feature) => (
          <PackageFeature key={feature} feature={feature} />
        ))}
      </ul>
    </button>
  );
});

PackageCard.displayName = 'PackageCard';

const ServiceDetailsPackages = memo(({ packages, selectedPackageId, onSelectPackage }) => (
  <div
    role="radiogroup"
    aria-label={SERVICE_DETAILS_CONTENT.packages.groupLabel}
    className={PACKAGE_GRID_CLASS}
  >
    {packages.map((servicePackage) => (
      <div key={servicePackage.id} className={PACKAGE_CARD_CELL_CLASS}>
        <PackageCard
          servicePackage={servicePackage}
          isSelected={servicePackage.id === selectedPackageId}
          onSelect={onSelectPackage}
        />
      </div>
    ))}
  </div>
));

ServiceDetailsPackages.displayName = 'ServiceDetailsPackages';

export default ServiceDetailsPackages;
