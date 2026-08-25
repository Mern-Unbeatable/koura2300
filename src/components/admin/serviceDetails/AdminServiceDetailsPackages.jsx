import { memo } from 'react';
import { CheckCheck } from 'lucide-react';
import { SERVICE_PACKAGES } from '../../serviceDetails/serviceDetailsData';
import {
  ADMIN_SERVICE_DETAILS_FEATURE_ICON_SIZE,
  ADMIN_SERVICE_DETAILS_PACKAGE_GRID_CLASS,
  ADMIN_SERVICE_DETAILS_PACKAGE_PREMIUM_CLASS,
  ADMIN_SERVICE_DETAILS_PACKAGE_PRICE_CLASS,
  ADMIN_SERVICE_DETAILS_PACKAGE_RADIO_CLASS,
  ADMIN_SERVICE_DETAILS_PACKAGE_STANDARD_CLASS,
  ADMIN_SERVICE_DETAILS_PACKAGE_TITLE_CLASS,
} from './adminServiceDetailsData';

const PACKAGE_CARD_CLASS = {
  [SERVICE_PACKAGES.STANDARD]: ADMIN_SERVICE_DETAILS_PACKAGE_STANDARD_CLASS,
  [SERVICE_PACKAGES.PREMIUM]: ADMIN_SERVICE_DETAILS_PACKAGE_PREMIUM_CLASS,
};

const PackageFeature = memo(({ feature }) => (
  <li className="flex items-center gap-2.5 text-base text-[#0b1e3d]">
    <CheckCheck
      size={ADMIN_SERVICE_DETAILS_FEATURE_ICON_SIZE}
      aria-hidden="true"
      className="shrink-0 text-brand-orange"
    />
    {feature}
  </li>
));

PackageFeature.displayName = 'PackageFeature';

const PackageCard = memo(({ servicePackage }) => (
  <article className={PACKAGE_CARD_CLASS[servicePackage.id]}>
    <span
      className={ADMIN_SERVICE_DETAILS_PACKAGE_RADIO_CLASS[servicePackage.id]}
      aria-hidden="true"
    />
    <div className="flex flex-col gap-2">
      <h3 className={ADMIN_SERVICE_DETAILS_PACKAGE_TITLE_CLASS[servicePackage.id]}>
        {servicePackage.title}
      </h3>
      <p className={ADMIN_SERVICE_DETAILS_PACKAGE_PRICE_CLASS}>${servicePackage.price}</p>
    </div>
    <ul className="flex flex-col gap-2.5">
      {servicePackage.features.map((feature) => (
        <PackageFeature key={feature} feature={feature} />
      ))}
    </ul>
  </article>
));

PackageCard.displayName = 'PackageCard';

const AdminServiceDetailsPackages = memo(({ copy, packages }) => (
  <div
    role="region"
    aria-label={copy.packages.regionLabel}
    className={ADMIN_SERVICE_DETAILS_PACKAGE_GRID_CLASS}
  >
    {packages.map((servicePackage) => (
      <PackageCard key={servicePackage.id} servicePackage={servicePackage} />
    ))}
  </div>
));

AdminServiceDetailsPackages.displayName = 'AdminServiceDetailsPackages';

export default AdminServiceDetailsPackages;
