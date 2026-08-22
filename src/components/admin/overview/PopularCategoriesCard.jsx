import { OVERVIEW_CARD_CLASS } from './overviewData';
import CategoryProgressItem from './CategoryProgressItem';

const PopularCategoriesCard = ({ title, categories }) => (
  <section className={OVERVIEW_CARD_CLASS} aria-label={title} role="region">
    <h2 className="mb-6 text-lg font-semibold leading-7 text-[#1a1a2e]">{title}</h2>
    <div className="flex flex-col gap-5">
      {categories.map((category) => (
        <CategoryProgressItem
          key={category.id}
          category={category}
          categories={categories}
        />
      ))}
    </div>
  </section>
);

export default PopularCategoriesCard;
