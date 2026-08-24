import CustomersView from '../../components/admin/customers/CustomersView';
import useAdminCustomers from '../../hooks/useAdminCustomers';

const Customers = () => {
  const customersProps = useAdminCustomers();

  return <CustomersView {...customersProps} />;
};

export default Customers;
