import AdminServiceFormView from '../../components/admin/serviceForm/AdminServiceFormView';
import useAdminServiceForm from '../../hooks/useAdminServiceForm';
import { useSEO } from '../../hooks/useSEO';

const ServiceForm = () => {
  const formProps = useAdminServiceForm();
  useSEO(formProps.seo);

  return <AdminServiceFormView {...formProps} />;
};

export default ServiceForm;
