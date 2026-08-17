import React, { memo } from 'react';
import { ChevronRight } from 'lucide-react';
import { LANDING_CONTENT } from './landingContent';
import { HEADER_CATEGORIES } from './landingData';

const CHEVRON_SIZE = 16;

const CategoryNavigation = memo(({ id, isMobile, onNavigate }) => {
  const navigationLabel = isMobile
    ? LANDING_CONTENT.header.mobileNavigation
    : LANDING_CONTENT.header.categoryNavigation;
  const navigationClass = isMobile
    ? 'mt-2 flex flex-col'
    : 'hidden items-center justify-between border-t border-brand-divider py-3 text-sm font-medium lg:flex';
  const linkClass = isMobile
    ? 'flex items-center justify-between border-b border-brand-divider py-3.5 text-base transition-colors hover:text-brand-orange focus:outline-none focus:ring-2 focus:ring-brand-orange'
    : 'whitespace-nowrap transition-colors duration-200 ease-in-out hover:text-brand-orange focus:outline-none focus:ring-2 focus:ring-brand-orange';

  return (
    <nav id={id} aria-label={navigationLabel} className={navigationClass}>
      {HEADER_CATEGORIES.map((category) => (
        <a key={category} href="#featured-categories" onClick={onNavigate} className={linkClass}>
          {category}
          {isMobile && (
            <ChevronRight size={CHEVRON_SIZE} aria-hidden="true" className="text-white/40" />
          )}
        </a>
      ))}
    </nav>
  );
});

CategoryNavigation.displayName = 'CategoryNavigation';

export default CategoryNavigation;
