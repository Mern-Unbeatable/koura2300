import React, { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { HEADER_CATEGORY_KEYS } from './landingData';

const CategoryNavigation = memo(({ id, isMobile, onNavigate }) => {
  const { t } = useTranslation();
  const navigationLabel = t(
    isMobile ? 'landing.header.mobileNavigation' : 'landing.header.categoryNavigation',
  );
  const navigationClass = isMobile
    ? 'grid grid-cols-2 gap-3 py-4 text-sm lg:hidden'
    : 'hidden gap-6 overflow-x-auto py-4 text-sm font-medium lg:flex';
  const linkClass = isMobile
    ? 'rounded-md px-2 py-1 hover:bg-white/10'
    : 'whitespace-nowrap transition-colors duration-200 ease-in-out hover:text-brand-orange focus:outline-none focus:ring-2 focus:ring-brand-orange';

  return (
    <nav id={id} aria-label={navigationLabel} className={navigationClass}>
      {HEADER_CATEGORY_KEYS.map((categoryKey) => (
        <a key={categoryKey} href="#featured-categories" onClick={onNavigate} className={linkClass}>
          {t(`landing.header.categories.${categoryKey}`)}
        </a>
      ))}
    </nav>
  );
});

CategoryNavigation.displayName = 'CategoryNavigation';

export default CategoryNavigation;
