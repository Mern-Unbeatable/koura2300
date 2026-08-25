import { memo } from 'react';
import { Clock3 } from 'lucide-react';
import ServiceRatingStars from '../../serviceDetails/ServiceRatingStars';
import {
  ADMIN_SERVICE_DETAILS_CLOCK_ICON_SIZE,
  ADMIN_SERVICE_DETAILS_OVERVIEW_CLASS,
  ADMIN_SERVICE_DETAILS_TITLE_CLASS,
} from './adminServiceDetailsData';
import AdminServiceDetailsPackages from './AdminServiceDetailsPackages';

const AdminServiceDetailsSummary = memo(
  ({ copy, title, overview, duration, rating, packages }) => (
    <div className="flex min-w-0 flex-col gap-5">
      <div className="flex min-w-0 flex-col gap-3">
        <h1 className={ADMIN_SERVICE_DETAILS_TITLE_CLASS}>{title}</h1>
        <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500">
          <span className="flex items-center gap-1 border-r border-[#878787] pr-4">
            <ServiceRatingStars />
            {rating}
          </span>
          <span className="flex items-center gap-1 text-[#1f2a2e]">
            <Clock3 size={ADMIN_SERVICE_DETAILS_CLOCK_ICON_SIZE} aria-hidden="true" />
            {duration}
          </span>
        </div>
        <p className={ADMIN_SERVICE_DETAILS_OVERVIEW_CLASS}>{overview}</p>
      </div>
      <AdminServiceDetailsPackages copy={copy} packages={packages} />
    </div>
  ),
);

AdminServiceDetailsSummary.displayName = 'AdminServiceDetailsSummary';

export default AdminServiceDetailsSummary;
