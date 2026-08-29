import { ChevronDown } from 'lucide-react';
import {
  ADS_ADD_BUTTON_CLASS,
  ADS_FILTER_CATEGORY_WIDTH_CLASS,
  ADS_FILTER_CHEVRON_CLASS,
  ADS_FILTER_CHEVRON_SIZE_PX,
  ADS_FILTER_MENU_CLASS,
  ADS_FILTER_OPTION_ACTIVE_CLASS,
  ADS_FILTER_OPTION_CLASS,
  ADS_FILTER_SELECT_WRAP_CLASS,
  ADS_FILTER_SELECTS_CLASS,
  ADS_FILTER_SUBCATEGORY_WIDTH_CLASS,
  ADS_FILTER_TRIGGER_CLASS,
  ADS_FILTER_TRIGGER_LABEL_CLASS,
  ADS_FILTERS_CLASS,
  ADS_HEADER_CLASS,
  ADS_HEADER_TEXT_CLASS,
  ADS_HEADER_TOP_CLASS,
  ADS_SORT_LABEL_CLASS,
  ADS_SUBTITLE_CLASS,
  ADS_TITLE_CLASS,
} from './adsData';
import useAdsFilterMenu from './useAdsFilterMenu';

const getSelectedOptionLabel = (options, value) =>
  options.find((option) => option.id === value)?.label ?? value;

const AdsFilterSelect = ({ id, label, value, options, onChange, widthClassName }) => {
  const { containerRef, isOpen, onToggle, onClose } = useAdsFilterMenu();
  const selectedLabel = getSelectedOptionLabel(options, value);

  const handleSelect = (nextValue) => {
    onChange({ target: { value: nextValue } });
    onClose();
  };

  return (
    <div ref={containerRef} className={`${ADS_FILTER_SELECT_WRAP_CLASS} ${widthClassName}`}>
      <button
        id={id}
        type="button"
        aria-label={label}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        className={ADS_FILTER_TRIGGER_CLASS}
        onClick={onToggle}
      >
        <span className={ADS_FILTER_TRIGGER_LABEL_CLASS}>{selectedLabel}</span>
        <ChevronDown
          size={ADS_FILTER_CHEVRON_SIZE_PX}
          className={ADS_FILTER_CHEVRON_CLASS}
          aria-hidden="true"
        />
      </button>

      {isOpen ? (
        <ul role="listbox" aria-label={label} className={ADS_FILTER_MENU_CLASS}>
          {options.map((option) => {
            const isActive = option.id === value;
            const optionClassName = isActive
              ? `${ADS_FILTER_OPTION_CLASS} ${ADS_FILTER_OPTION_ACTIVE_CLASS}`
              : ADS_FILTER_OPTION_CLASS;

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

const AdsHeader = ({
  title,
  subtitle,
  addNewAdLabel,
  sortByLabel,
  categoryFilterLabel,
  subcategoryFilterLabel,
  categoryOptions,
  subcategoryOptions,
  selectedCategoryId,
  selectedSubcategoryId,
  onCategoryFilterChange,
  onSubcategoryFilterChange,
  onAddNewAd,
}) => (
  <header className={ADS_HEADER_CLASS}>
    <div className={ADS_HEADER_TOP_CLASS}>
      <div className={ADS_HEADER_TEXT_CLASS}>
        <h1 className={ADS_TITLE_CLASS}>{title}</h1>
        <p className={ADS_SUBTITLE_CLASS}>{subtitle}</p>
      </div>

      <button type="button" className={ADS_ADD_BUTTON_CLASS} onClick={onAddNewAd}>
        {addNewAdLabel}
      </button>
    </div>

    <div className={ADS_FILTERS_CLASS}>
      <p className={ADS_SORT_LABEL_CLASS}>{sortByLabel}</p>
      <div className={ADS_FILTER_SELECTS_CLASS}>
        <AdsFilterSelect
          id="ads-category-filter"
          label={categoryFilterLabel}
          value={selectedCategoryId}
          options={categoryOptions}
          onChange={onCategoryFilterChange}
          widthClassName={ADS_FILTER_CATEGORY_WIDTH_CLASS}
        />
        <AdsFilterSelect
          id="ads-subcategory-filter"
          label={subcategoryFilterLabel}
          value={selectedSubcategoryId}
          options={subcategoryOptions}
          onChange={onSubcategoryFilterChange}
          widthClassName={ADS_FILTER_SUBCATEGORY_WIDTH_CLASS}
        />
      </div>
    </div>
  </header>
);

export default AdsHeader;
