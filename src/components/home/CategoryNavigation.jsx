import React, { memo } from 'react';
import { ChevronRight } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { ROUTES } from '../../config';
import { LANDING_CONTENT } from './landingContent';
import { HEADER_CATEGORIES } from './landingData';

const CHEVRON_SIZE = 16;
const FEATURED_CATEGORIES_ANCHOR = '/#featured-categories';

const CATEGORY_ROUTES = {
  Lighting: ROUTES.LIGHTING,
  Security: ROUTES.SECURITY,
  Closets: ROUTES.CLOSETS,
  Fence: ROUTES.FENCE,
  Deck: ROUTES.DECK,
  Basement: ROUTES.BASEMENT,
  Appliances: ROUTES.APPLIANCES,
  Garage: ROUTES.GARAGE,
  Garden: ROUTES.GARDEN,
};

const DESKTOP_LINK_BASE =
  'relative rounded-sm whitespace-nowrap py-1 transition-colors duration-200 ease-in-out hover:text-brand-orange focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-orange focus-visible:ring-offset-2 focus-visible:ring-offset-brand-navy after:absolute after:inset-x-0 after:-bottom-0.5 after:h-0.5 after:origin-left after:rounded-full after:bg-brand-orange after:transition-transform after:duration-200 after:ease-out hover:after:scale-x-100';
const DESKTOP_LINK_IDLE = 'after:scale-x-0';
const DESKTOP_LINK_CURRENT = 'text-brand-orange after:scale-x-100';

const MOBILE_LINK_BASE =
  'flex items-center justify-between rounded-md border-b border-brand-divider px-1 py-3.5 text-base transition-colors duration-200 hover:text-brand-orange focus:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-brand-orange';
const MOBILE_LINK_CURRENT = 'text-brand-orange';

const buildLinkClass = ({ isMobile, isCurrent }) => {
  if (isMobile) {
    return isCurrent ? `${MOBILE_LINK_BASE} ${MOBILE_LINK_CURRENT}` : MOBILE_LINK_BASE;
  }

  return isCurrent
    ? `${DESKTOP_LINK_BASE} ${DESKTOP_LINK_CURRENT}`
    : `${DESKTOP_LINK_BASE} ${DESKTOP_LINK_IDLE}`;
};

const CategoryLinkContent = memo(({ category, isMobile }) => (
  <>
    {category}
    {isMobile && (
      <ChevronRight size={CHEVRON_SIZE} aria-hidden="true" className="text-white/40" />
    )}
  </>
));

CategoryLinkContent.displayName = 'CategoryLinkContent';

const CategoryLink = memo(({ category, isMobile, isCurrent, onNavigate }) => {
  const route = CATEGORY_ROUTES[category];
  const className = buildLinkClass({ isMobile, isCurrent });
  const content = <CategoryLinkContent category={category} isMobile={isMobile} />;

  if (route) {
    return (
      <Link
        to={route}
        onClick={onNavigate}
        className={className}
        aria-current={isCurrent ? 'page' : undefined}
      >
        {content}
      </Link>
    );
  }

  return (
    <a href={FEATURED_CATEGORIES_ANCHOR} onClick={onNavigate} className={className}>
      {content}
    </a>
  );
});

CategoryLink.displayName = 'CategoryLink';

const CategoryNavigation = memo(({ id, isMobile, onNavigate }) => {
  const { pathname } = useLocation();
  const navigationLabel = isMobile
    ? LANDING_CONTENT.header.mobileNavigation
    : LANDING_CONTENT.header.categoryNavigation;
  const navigationClass = isMobile
    ? 'mt-2 flex flex-col'
    : 'hidden items-center justify-between border-t border-brand-divider py-3 text-sm font-medium lg:flex';

  return (
    <nav id={id} aria-label={navigationLabel} className={navigationClass}>
      {HEADER_CATEGORIES.map((category) => (
        <CategoryLink
          key={category}
          category={category}
          isMobile={isMobile}
          isCurrent={CATEGORY_ROUTES[category] === pathname}
          onNavigate={onNavigate}
        />
      ))}
    </nav>
  );
});

CategoryNavigation.displayName = 'CategoryNavigation';

export default CategoryNavigation;
