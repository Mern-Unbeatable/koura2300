import { useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { buildServiceDetailsRoute } from '../config';
import { getServiceReviewsPayload } from '../components/serviceReviews/serviceReviewsData';

const useServiceReviews = () => {
  const { serviceId } = useParams();

  const payload = useMemo(() => getServiceReviewsPayload(serviceId), [serviceId]);
  const backPath = useMemo(
    () => (serviceId ? buildServiceDetailsRoute(serviceId) : '/'),
    [serviceId],
  );

  return {
    serviceId,
    payload,
    backPath,
  };
};

export default useServiceReviews;
