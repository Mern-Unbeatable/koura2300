import React, { memo } from 'react';
import { Star } from 'lucide-react';
import { Link } from 'react-router-dom';
import { LANDING_CONTENT } from './landingContent';

const CATEGORY_IMAGE_WIDTH = 459;
const CATEGORY_IMAGE_HEIGHT = 414;
const STAR_ICON_SIZE = 16;

const CategoryCard = memo(({ category, loading = 'lazy' }) => (
  <Link
    to={category.path}
    className="block h-full rounded-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-orange focus-visible:ring-offset-2"
  >
    <article className="h-full rounded-lg bg-brand-orange-light p-4 sm:p-5">
      <h2 className="text-xl font-semibold text-brand-blue sm:text-2xl">{category.title}</h2>

      <div className="mt-3 flex items-center justify-between gap-3 text-sm">
        <span className="flex items-center gap-2 font-medium text-brand-ink">
          <Star
            size={STAR_ICON_SIZE}
            fill="currentColor"
            aria-hidden="true"
            className="text-brand-orange"
          />
          {LANDING_CONTENT.categories.rating}
        </span>
        <span className="font-bold text-brand-orange">{LANDING_CONTENT.categories.price}</span>
      </div>

      <img
        src={category.image}
        alt={category.imageAlt}
        width={CATEGORY_IMAGE_WIDTH}
        height={CATEGORY_IMAGE_HEIGHT}
        loading={loading}
        className="mt-4 aspect-11/10 w-full rounded object-cover"
      />
    </article>
  </Link>
));

CategoryCard.displayName = 'CategoryCard';

export default CategoryCard;
