import { useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { ADMIN_SERVICE_DETAILS_COPY } from '../components/admin/serviceDetails/adminServiceDetailsCopy';
import { getAdminServiceDetailsById } from '../components/admin/serviceDetails/adminServiceDetailsUtils';

const useAdminServiceDetails = () => {
  const { serviceId } = useParams();

  const details = useMemo(() => getAdminServiceDetailsById(serviceId), [serviceId]);

  return {
    copy: ADMIN_SERVICE_DETAILS_COPY,
    details,
  };
};

export default useAdminServiceDetails;
