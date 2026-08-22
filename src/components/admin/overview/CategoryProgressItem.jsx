import {
  OVERVIEW_CATEGORY_BAR_CLASS,
  OVERVIEW_CATEGORY_HEADER_CLASS,
  OVERVIEW_CATEGORY_NAME_CLASS,
  OVERVIEW_CATEGORY_ROW_CLASS,
  OVERVIEW_CATEGORY_TRACK_CLASS,
  OVERVIEW_CATEGORY_VALUE_CLASS,
  getCategoryProgressPercent,
} from './overviewData';

const CategoryProgressItem = ({ category, categories }) => {
  const progressPercent = getCategoryProgressPercent(category.value, categories);

  return (
    <div className={OVERVIEW_CATEGORY_ROW_CLASS}>
      <div className={OVERVIEW_CATEGORY_HEADER_CLASS}>
        <span className={OVERVIEW_CATEGORY_NAME_CLASS}>{category.name}</span>
        <span className={OVERVIEW_CATEGORY_VALUE_CLASS}>{category.value}</span>
      </div>
      <div
        className={OVERVIEW_CATEGORY_TRACK_CLASS}
        role="progressbar"
        aria-valuenow={progressPercent}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label={category.name}
      >
        <div
          className={OVERVIEW_CATEGORY_BAR_CLASS}
          style={{
            width: `${progressPercent}%`,
            backgroundColor: category.color,
          }}
        />
      </div>
    </div>
  );
};

export default CategoryProgressItem;
