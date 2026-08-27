import { Trash2 } from 'lucide-react';
import {
  CATEGORIES_CHIP_CLASS,
  CATEGORIES_CHIP_DELETE_CLASS,
  CATEGORIES_CHIP_ICON_SIZE_PX,
  CATEGORIES_CHIP_SELECTED_CLASS,
  CATEGORIES_DRAG_MIME_TYPE,
} from './categoriesData';

const CategoriesChip = ({
  item,
  deleteLabel,
  isSelected = false,
  onSelect,
  onDelete,
  onReorder,
}) => {
  const chipClassName = isSelected
    ? `${CATEGORIES_CHIP_CLASS} ${CATEGORIES_CHIP_SELECTED_CLASS}`
    : CATEGORIES_CHIP_CLASS;

  const handleDragStart = (event) => {
    event.dataTransfer.setData(CATEGORIES_DRAG_MIME_TYPE, item.id);
    event.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  };

  const handleDrop = (event) => {
    event.preventDefault();
    const draggedId = event.dataTransfer.getData(CATEGORIES_DRAG_MIME_TYPE);
    if (draggedId) {
      onReorder(draggedId, item.id);
    }
  };

  const handleDeleteClick = (event) => {
    event.stopPropagation();
    onDelete(item.id);
  };

  return (
    <div
      role="button"
      tabIndex={0}
      data-testid={`category-chip-${item.id}`}
      className={chipClassName}
      draggable
      onDragStart={handleDragStart}
      onDragOver={handleDragOver}
      onDrop={handleDrop}
      onClick={() => onSelect?.(item.id)}
      onKeyDown={(event) => {
        if (event.key === 'Enter' || event.key === ' ') {
          event.preventDefault();
          onSelect?.(item.id);
        }
      }}
    >
      <span>{item.name}</span>
      <button
        type="button"
        aria-label={deleteLabel}
        className={CATEGORIES_CHIP_DELETE_CLASS}
        onClick={handleDeleteClick}
      >
        <Trash2 size={CATEGORIES_CHIP_ICON_SIZE_PX} aria-hidden="true" />
      </button>
    </div>
  );
};

export default CategoriesChip;
