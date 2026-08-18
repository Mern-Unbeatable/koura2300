import React, { memo, useCallback } from 'react';
import { Check, Circle } from 'lucide-react';
import { SERVICE_DETAILS_CONTENT } from './serviceDetailsCopy';
import {
  LIST_ICON_SIZE,
  RADIO_FILL_IDLE,
  RADIO_FILL_SELECTED,
  RADIO_ICON_SIZE,
} from './serviceDetailsData';

const SELECTED_PACKAGE_CLASS =
  'flex h-full w-full flex-col rounded-xl border border-brand-orange bg-white p-4 text-left transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-orange';
const IDLE_PACKAGE_CLASS =
  'flex h-full w-full flex-col rounded-xl border border-gray-200 bg-white p-4 text-left transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-orange';

const PackageFeature = memo(({ feature }) => (
  <li className="flex items-center gap-3 text-sm text-brand-ink">
    <Check size={LIST_ICON_SIZE} aria-hidden="true" className="shrink-0 text-brand-orange" />
    {feature}
  </li>
));

PackageFeature.displayName = 'PackageFeature';

const PackageCard = memo(({ servicePackage, isSelected, onSelect }) => {
  const packageLabel = `${servicePackage.title} $${servicePackage.price}`;

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
      className={isSelected ? SELECTED_PACKAGE_CLASS : IDLE_PACKAGE_CLASS}
    >
      <span className={isSelected ? 'text-brand-orange' : 'text-gray-400'} aria-hidden="true">
        <Circle size={RADIO_ICON_SIZE} fill={isSelected ? RADIO_FILL_SELECTED : RADIO_FILL_IDLE} />
      </span>
      <span className="mt-3 text-sm text-gray-500">{servicePackage.title}</span>
      <span className="mt-1 text-2xl font-semibold text-brand-ink">${servicePackage.price}</span>
      <ul className="mt-5 flex flex-col gap-3">
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
    className="grid gap-4 sm:grid-cols-2"
  >
    {packages.map((servicePackage) => (
      <PackageCard
        key={servicePackage.id}
        servicePackage={servicePackage}
        isSelected={servicePackage.id === selectedPackageId}
        onSelect={onSelectPackage}
      />
    ))}
  </div>
));

ServiceDetailsPackages.displayName = 'ServiceDetailsPackages';

export default ServiceDetailsPackages;
