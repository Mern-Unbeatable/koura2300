import { Plus } from 'lucide-react';
import CategoriesChip from './CategoriesChip';
import {
  CATEGORIES_ADD_BUTTON_CLASS,
  CATEGORIES_ADD_ICON_SIZE_PX,
  CATEGORIES_CARD_CLASS,
  CATEGORIES_CARD_HEADER_CLASS,
  CATEGORIES_CHIPS_CLASS,
  CATEGORIES_DIVIDER_CLASS,
  CATEGORIES_EMPTY_CLASS,
  CATEGORIES_SECTION_TITLE_CLASS,
} from './categoriesData';

const LEADING_PLUS_PREFIX = /^\+\s*/;

const getVisibleAddLabel = (addLabel) => addLabel.replace(LEADING_PLUS_PREFIX, '');

const CategoriesSection = ({
  title,
  addLabel,
  items,
  emptyLabel,
  selectedItemId,
  getDeleteLabel,
  onAdd,
  onSelect,
  onDelete,
  onReorder,
}) => (
  <section className={CATEGORIES_CARD_CLASS}>
    <div className={CATEGORIES_CARD_HEADER_CLASS}>
      <h2 className={CATEGORIES_SECTION_TITLE_CLASS}>{title}</h2>
      <button
        type="button"
        onClick={onAdd}
        aria-label={addLabel}
        className={CATEGORIES_ADD_BUTTON_CLASS}
      >
        <Plus size={CATEGORIES_ADD_ICON_SIZE_PX} aria-hidden="true" />
        <span>{getVisibleAddLabel(addLabel)}</span>
      </button>
    </div>

    <div className={CATEGORIES_DIVIDER_CLASS} aria-hidden="true" />

    {items.length === 0 ? (
      <p className={CATEGORIES_EMPTY_CLASS}>{emptyLabel}</p>
    ) : (
      <div className={CATEGORIES_CHIPS_CLASS}>
        {items.map((item) => (
          <CategoriesChip
            key={item.id}
            item={item}
            deleteLabel={getDeleteLabel(item.name)}
            isSelected={selectedItemId === item.id}
            onSelect={onSelect}
            onDelete={onDelete}
            onReorder={onReorder}
          />
        ))}
      </div>
    )}
  </section>
);

export default CategoriesSection;
