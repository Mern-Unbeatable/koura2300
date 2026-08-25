import { ChevronDown } from 'lucide-react';
import {
  SERVICES_ADD_BUTTON_CLASS,
  SERVICES_FILTER_CATEGORY_WIDTH_CLASS,
  SERVICES_FILTER_CHEVRON_SIZE_PX,
  SERVICES_FILTER_MENU_CLASS,
  SERVICES_FILTER_OPTION_ACTIVE_CLASS,
  SERVICES_FILTER_OPTION_CLASS,
  SERVICES_FILTER_OPTION_WRAP_CLASS,
  SERVICES_FILTER_SELECT_WRAP_CLASS,
  SERVICES_FILTER_SELECTS_CLASS,
  SERVICES_FILTER_SUBCATEGORY_WIDTH_CLASS,
  SERVICES_FILTER_TRIGGER_CLASS,
  SERVICES_FILTER_TRIGGER_LABEL_CLASS,
  SERVICES_FILTERS_CLASS,
  SERVICES_HEADER_ACTIONS_CLASS,
  SERVICES_HEADER_CLASS,
  SERVICES_SORT_LABEL_CLASS,
  SERVICES_SUBTITLE_CLASS,
  SERVICES_TITLE_CLASS,
} from './servicesData';
import useServicesFilterMenu from './useServicesFilterMenu';

const getSelectedOptionLabel = (options, value) =>
  options.find((option) => option.id === value)?.label ?? value;

const ServicesFilterSelect = ({
  id,
  label,
  value,
  options,
  onChange,
  widthClassName,
  wrapOptions = false,
}) => {
  const { containerRef, isOpen, onToggle, onClose } = useServicesFilterMenu();
  const selectedLabel = getSelectedOptionLabel(options, value);
  const optionBaseClass = wrapOptions
    ? SERVICES_FILTER_OPTION_WRAP_CLASS
    : SERVICES_FILTER_OPTION_CLASS;

  const handleSelect = (nextValue) => {
    onChange({ target: { value: nextValue } });
    onClose();
  };

  return (
    <div
      ref={containerRef}
      className={`${SERVICES_FILTER_SELECT_WRAP_CLASS} ${widthClassName}`}
    >
      <button
        id={id}
        type="button"
        aria-label={label}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        className={SERVICES_FILTER_TRIGGER_CLASS}
        onClick={onToggle}
      >
        <span className={SERVICES_FILTER_TRIGGER_LABEL_CLASS}>{selectedLabel}</span>
        <ChevronDown
          size={SERVICES_FILTER_CHEVRON_SIZE_PX}
          className="shrink-0 text-[#4a5154]"
          aria-hidden="true"
        />
      </button>

      {isOpen ? (
        <ul
          role="listbox"
          aria-label={label}
          className={SERVICES_FILTER_MENU_CLASS}
        >
          {options.map((option) => {
            const isActive = option.id === value;
            const optionClassName = isActive
              ? `${optionBaseClass} ${SERVICES_FILTER_OPTION_ACTIVE_CLASS}`
              : optionBaseClass;

            return (
              <li key={`${option.categoryId ?? 'root'}-${option.id}`} role="presentation">
                <button
                  type="button"
                  role="option"
                  aria-selected={isActive}
                  title={option.label}
                  className={optionClassName}
                  onClick={() => handleSelect(option.id)}
                >
                  {option.label}
                </button>
              </li>
            );
          })}
        </ul>
      ) : null}
    </div>
  );
};

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
    <div className="flex shrink-0 flex-col gap-1">
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
            widthClassName={SERVICES_FILTER_CATEGORY_WIDTH_CLASS}
            wrapOptions
          />
          <ServicesFilterSelect
            id="services-subcategory-filter"
            label={subcategoryFilterLabel}
            value={selectedSubcategoryId}
            options={subcategoryOptions}
            onChange={onSubcategoryFilterChange}
            widthClassName={SERVICES_FILTER_SUBCATEGORY_WIDTH_CLASS}
            wrapOptions
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
