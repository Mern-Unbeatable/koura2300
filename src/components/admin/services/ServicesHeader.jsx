import { ChevronDown } from 'lucide-react';
import {
  SERVICES_ADD_BUTTON_CLASS,
  SERVICES_FILTER_CHEVRON_SIZE_PX,
  SERVICES_FILTER_SELECT_CLASS,
  SERVICES_FILTER_SELECT_WRAP_CLASS,
  SERVICES_FILTER_SELECTS_CLASS,
  SERVICES_FILTERS_CLASS,
  SERVICES_HEADER_ACTIONS_CLASS,
  SERVICES_HEADER_CLASS,
  SERVICES_SORT_LABEL_CLASS,
  SERVICES_SUBTITLE_CLASS,
  SERVICES_TITLE_CLASS,
} from './servicesData';

const ServicesFilterSelect = ({ id, label, value, options, onChange }) => (
  <div className={SERVICES_FILTER_SELECT_WRAP_CLASS}>
    <select
      id={id}
      value={value}
      onChange={onChange}
      aria-label={label}
      className={SERVICES_FILTER_SELECT_CLASS}
    >
      {options.map((option) => (
        <option key={`${option.categoryId ?? 'root'}-${option.id}`} value={option.id}>
          {option.label}
        </option>
      ))}
    </select>
    <ChevronDown
      size={SERVICES_FILTER_CHEVRON_SIZE_PX}
      className="pointer-events-none absolute top-1/2 right-3 -translate-y-1/2 text-[#4a5154]"
      aria-hidden="true"
    />
  </div>
);

const ServicesHeader = ({
  title,
  summarySubtitle,
  addNewServiceLabel,
  sortByLabel,
  categoryFilterLabel,
  subcategoryFilterLabel,
  categoryOptions,
  subcategoryOptions,
  selectedCategoryId,
  selectedSubcategoryId,
  onCategoryFilterChange,
  onSubcategoryFilterChange,
  onAddNewService,
}) => (
  <header className={SERVICES_HEADER_CLASS}>
    <div className="flex min-w-0 flex-col gap-1">
      <h1 className={SERVICES_TITLE_CLASS}>{title}</h1>
      <p className={SERVICES_SUBTITLE_CLASS}>{summarySubtitle}</p>
    </div>

    <div className={SERVICES_HEADER_ACTIONS_CLASS}>
      <div className={SERVICES_FILTERS_CLASS}>
        <p className={SERVICES_SORT_LABEL_CLASS}>{sortByLabel}</p>
        <div className={SERVICES_FILTER_SELECTS_CLASS}>
          <ServicesFilterSelect
            id="services-category-filter"
            label={categoryFilterLabel}
            value={selectedCategoryId}
            options={categoryOptions}
            onChange={onCategoryFilterChange}
          />
          <ServicesFilterSelect
            id="services-subcategory-filter"
            label={subcategoryFilterLabel}
            value={selectedSubcategoryId}
            options={subcategoryOptions}
            onChange={onSubcategoryFilterChange}
          />
        </div>
      </div>

      <button type="button" className={SERVICES_ADD_BUTTON_CLASS} onClick={onAddNewService}>
        {addNewServiceLabel}
      </button>
    </div>
  </header>
);

export default ServicesHeader;
