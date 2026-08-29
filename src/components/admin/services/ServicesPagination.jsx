import AdminPagination from '../shared/AdminPagination';

const ServicesPagination = (props) => (
  <AdminPagination
    {...props}
    regionLabel="Services pagination"
    testId="services-pagination"
  />
);

export default ServicesPagination;
