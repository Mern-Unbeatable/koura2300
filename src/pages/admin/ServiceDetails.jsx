import AdminServiceDetailsView from '../../components/admin/serviceDetails/AdminServiceDetailsView';
import { ADMIN_SERVICE_DETAILS_COPY } from '../../components/admin/serviceDetails/adminServiceDetailsCopy';
import useAdminServiceDetails from '../../hooks/useAdminServiceDetails';
import { useSEO } from '../../hooks/useSEO';

const ServiceDetails = () => {
  const detailsProps = useAdminServiceDetails();
  useSEO(ADMIN_SERVICE_DETAILS_COPY.seo);

  return <AdminServiceDetailsView {...detailsProps} />;
};

export default ServiceDetails;
