import { SERVICES_PAGE_CLASS } from './servicesData';
import ServicesEditModal from './ServicesEditModal';
import ServicesGrid from './ServicesGrid';
import ServicesHeader from './ServicesHeader';
import ServicesPagination from './ServicesPagination';

const ServicesView = ({
  copy,
  services,
  summarySubtitle,
  categoryOptions,
  subcategoryOptions,
  selectedCategoryId,
  selectedSubcategoryId,
  onCategoryFilterChange,
  onSubcategoryFilterChange,
  onAddNewService,
  onEditService,
  onDeleteService,
  editingService,
  onCloseEditService,
  onSaveEditService,
  pagination,
}) => (
  <div className={SERVICES_PAGE_CLASS}>
    <ServicesHeader
      title={copy.title}
      summarySubtitle={summarySubtitle}
      addNewServiceLabel={copy.addNewService}
      sortByLabel={copy.sortByLabel}
      categoryFilterLabel={copy.categoryFilterLabel}
      subcategoryFilterLabel={copy.subcategoryFilterLabel}
      categoryOptions={categoryOptions}
      subcategoryOptions={subcategoryOptions}
      selectedCategoryId={selectedCategoryId}
      selectedSubcategoryId={selectedSubcategoryId}
      onCategoryFilterChange={onCategoryFilterChange}
      onSubcategoryFilterChange={onSubcategoryFilterChange}
      onAddNewService={onAddNewService}
    />
    <ServicesGrid
      copy={copy}
      services={services}
      onEditService={onEditService}
      onDeleteService={onDeleteService}
    />
    {pagination.isVisible ? <ServicesPagination copy={copy} {...pagination} /> : null}
    {editingService ? (
      <ServicesEditModal
        service={editingService}
        onClose={onCloseEditService}
        onSave={onSaveEditService}
      />
    ) : null}
  </div>
);

export default ServicesView;
