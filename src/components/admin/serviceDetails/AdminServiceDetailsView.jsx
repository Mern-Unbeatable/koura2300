import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { ROUTES } from '../../../config';
import {
  ADMIN_SERVICE_DETAILS_BACK_ICON_SIZE,
  ADMIN_SERVICE_DETAILS_BACK_LINK_CLASS,
  ADMIN_SERVICE_DETAILS_INCLUSION_SECTION_CLASS,
  ADMIN_SERVICE_DETAILS_NOT_FOUND_CLASS,
  ADMIN_SERVICE_DETAILS_PAGE_CLASS,
  ADMIN_SERVICE_DETAILS_SPLIT_CLASS,
} from './adminServiceDetailsData';
import AdminServiceDetailsGallery from './AdminServiceDetailsGallery';
import AdminServiceDetailsInclusions from './AdminServiceDetailsInclusions';
import AdminServiceDetailsReviews from './AdminServiceDetailsReviews';
import AdminServiceDetailsSummary from './AdminServiceDetailsSummary';

const AdminServiceDetailsNotFound = ({ copy }) => (
  <div className={ADMIN_SERVICE_DETAILS_NOT_FOUND_CLASS}>
    <h1 className="text-2xl font-bold text-[#0f172b]">{copy.notFound.title}</h1>
    <p className="mt-2 text-sm text-[#62748e]">{copy.notFound.description}</p>
    <Link
      to={ROUTES.ADMIN_SERVICES}
      className="mt-6 inline-flex rounded-xl bg-[#0f172b] px-5 py-2.5 text-sm font-semibold text-white hover:bg-[#1e293b] focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-orange"
    >
      {copy.notFound.backLabel}
    </Link>
  </div>
);

const AdminServiceDetailsView = ({ copy, details }) => {
  if (!details) {
    return <AdminServiceDetailsNotFound copy={copy} />;
  }

  const { service, packages, overview, includedItems, excludedItems, gallery } = details;

  return (
    <div className={ADMIN_SERVICE_DETAILS_PAGE_CLASS}>
      <Link to={ROUTES.ADMIN_SERVICES} className={ADMIN_SERVICE_DETAILS_BACK_LINK_CLASS}>
        <ArrowLeft size={ADMIN_SERVICE_DETAILS_BACK_ICON_SIZE} aria-hidden="true" />
        {copy.actions.back}
      </Link>

      <div className={ADMIN_SERVICE_DETAILS_SPLIT_CLASS}>
        <AdminServiceDetailsGallery
          copy={copy}
          gallery={gallery}
          imageAlt={service.imageAlt}
        />
        <AdminServiceDetailsSummary
          copy={copy}
          catalogTitle={service.catalogTitle}
          subcategory={service.category}
          title={service.title}
          overview={overview}
          duration={service.duration}
          rating={service.rating}
          packages={packages}
        />
      </div>

      <div className={ADMIN_SERVICE_DETAILS_INCLUSION_SECTION_CLASS}>
        <AdminServiceDetailsInclusions
          copy={copy}
          includedItems={includedItems}
          excludedItems={excludedItems}
        />
      </div>

      <AdminServiceDetailsReviews
        copy={copy}
        ratingSummary={details.ratingSummary}
        ratingDistribution={details.ratingDistribution}
        reviews={details.reviews}
      />
    </div>
  );
};

export default AdminServiceDetailsView;
