import { useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '../config';
import { OVERVIEW_COPY } from '../components/admin/overview/overviewCopy';
import {
  OVERVIEW_CATEGORIES,
  OVERVIEW_MESSAGES,
  OVERVIEW_PERIOD_OPTIONS,
  OVERVIEW_REVIEWS,
  OVERVIEW_REVENUE_MONTHS,
  OVERVIEW_STATS,
} from '../components/admin/overview/overviewData';

const useAdminOverview = () => {
  const navigate = useNavigate();
  const [selectedPeriodId, setSelectedPeriodId] = useState(OVERVIEW_PERIOD_OPTIONS[0].id);

  const handlePeriodChange = useCallback((event) => {
    setSelectedPeriodId(event.target.value);
  }, []);

  const handleViewAllReviews = useCallback(() => {
    navigate(ROUTES.ADMIN_DASHBOARD);
  }, [navigate]);

  const handleViewAllMessages = useCallback(() => {
    navigate(ROUTES.ADMIN_MESSAGES);
  }, [navigate]);

  return {
    copy: OVERVIEW_COPY,
    stats: OVERVIEW_STATS,
    revenueMonths: OVERVIEW_REVENUE_MONTHS,
    categories: OVERVIEW_CATEGORIES,
    reviews: OVERVIEW_REVIEWS,
    messages: OVERVIEW_MESSAGES,
    periodOptions: OVERVIEW_PERIOD_OPTIONS,
    selectedPeriodId,
    onPeriodChange: handlePeriodChange,
    onViewAllReviews: handleViewAllReviews,
    onViewAllMessages: handleViewAllMessages,
    isLoading: false,
    error: null,
  };
};

export default useAdminOverview;
