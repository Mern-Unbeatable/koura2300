import { ChevronDown } from 'lucide-react';
import useServicesFilterMenu from '../services/useServicesFilterMenu';
import {
  CATEGORIES_MODAL_SELECT_CHEVRON_SIZE_PX,
  CATEGORIES_MODAL_SELECT_MENU_CLASS,
  CATEGORIES_MODAL_SELECT_OPTION_ACTIVE_CLASS,
  CATEGORIES_MODAL_SELECT_OPTION_CLASS,
  CATEGORIES_MODAL_SELECT_PLACEHOLDER_CLASS,
  CATEGORIES_MODAL_SELECT_TRIGGER_CLASS,
  CATEGORIES_MODAL_SELECT_VALUE_CLASS,
  CATEGORIES_MODAL_SELECT_WRAP_CLASS,
} from './categoriesData';

const CategoriesCategorySelect = ({
  id,
  labelId,
  value,
  placeholder,
  options,
  error,
  onChange,
}) => {
  const { containerRef, isOpen, onToggle, onClose } = useServicesFilterMenu();
  const selectedOption = options.find((option) => option.id === value);
  const displayLabel = selectedOption?.label ?? placeholder;
  const labelClassName = selectedOption
    ? CATEGORIES_MODAL_SELECT_VALUE_CLASS
    : CATEGORIES_MODAL_SELECT_PLACEHOLDER_CLASS;
  const triggerClassName = error
    ? `${CATEGORIES_MODAL_SELECT_TRIGGER_CLASS} ring-2 ring-[#f31d2c] focus-visible:ring-[#f31d2c]`
    : CATEGORIES_MODAL_SELECT_TRIGGER_CLASS;

  const handleSelect = (nextValue) => {
    onChange({ target: { value: nextValue } });
    onClose();
  };

  return (
    <div ref={containerRef} className={CATEGORIES_MODAL_SELECT_WRAP_CLASS}>
      <button
        id={id}
        type="button"
        aria-labelledby={labelId}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        aria-invalid={Boolean(error)}
        className={triggerClassName}
        onClick={onToggle}
      >
        <span className={labelClassName}>{displayLabel}</span>
        <ChevronDown size={CATEGORIES_MODAL_SELECT_CHEVRON_SIZE_PX} aria-hidden="true" />
      </button>

      {isOpen ? (
        <ul role="listbox" aria-labelledby={labelId} className={CATEGORIES_MODAL_SELECT_MENU_CLASS}>
          {options.map((option) => {
            const isActive = option.id === value;

            return (
              <li key={option.id} role="presentation">
                <button
                  type="button"
                  role="option"
                  aria-selected={isActive}
                  className={
                    isActive
                      ? `${CATEGORIES_MODAL_SELECT_OPTION_CLASS} ${CATEGORIES_MODAL_SELECT_OPTION_ACTIVE_CLASS}`
                      : CATEGORIES_MODAL_SELECT_OPTION_CLASS
                  }
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

export default CategoriesCategorySelect;
