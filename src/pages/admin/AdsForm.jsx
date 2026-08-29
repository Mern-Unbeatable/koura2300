import AdminServiceFormView from '../../components/admin/serviceForm/AdminServiceFormView';
import useAdminAdForm from '../../hooks/useAdminAdForm';
import { useSEO } from '../../hooks/useSEO';

const AdsForm = () => {
  const formProps = useAdminAdForm();
  useSEO(formProps.seo);

  return <AdminServiceFormView {...formProps} />;
};

export default AdsForm;
