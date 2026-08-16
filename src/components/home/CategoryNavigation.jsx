import React, { memo } from 'react';
import { LANDING_CONTENT } from './landingContent';
import { HEADER_CATEGORIES } from './landingData';

const CategoryNavigation = memo(({ id, isMobile, onNavigate }) => {
  const navigationLabel = isMobile
    ? LANDING_CONTENT.header.mobileNavigation
    : LANDING_CONTENT.header.categoryNavigation;
  const navigationClass = isMobile
    ? 'grid grid-cols-2 gap-3 pb-4 text-sm lg:hidden'
    : 'hidden items-center justify-between border-t border-brand-divider py-3 text-sm font-medium lg:flex';
  const linkClass = isMobile
    ? 'rounded-md px-2 py-1 hover:bg-white/10'
    : 'whitespace-nowrap transition-colors duration-200 ease-in-out hover:text-brand-orange focus:outline-none focus:ring-2 focus:ring-brand-orange';

  return (
    <nav id={id} aria-label={navigationLabel} className={navigationClass}>
      {HEADER_CATEGORIES.map((category) => (
        <a key={category} href="#featured-categories" onClick={onNavigate} className={linkClass}>
          {category}
        </a>
      ))}
    </nav>
  );
});

CategoryNavigation.displayName = 'CategoryNavigation';

export default CategoryNavigation;
