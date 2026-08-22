import OverviewView from '../../components/admin/overview/OverviewView';
import useAdminOverview from '../../hooks/useAdminOverview';

const Dashboard = () => {
  const overviewProps = useAdminOverview();

  return <OverviewView {...overviewProps} />;
};

export default Dashboard;
