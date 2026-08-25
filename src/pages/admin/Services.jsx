import ServicesView from '../../components/admin/services/ServicesView';
import useAdminServices from '../../hooks/useAdminServices';

const Services = () => {
  const servicesProps = useAdminServices();

  return <ServicesView {...servicesProps} />;
};

export default Services;
