import React, { memo, useCallback, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { ROUTES } from '../../config';
import { selectTotalItems } from '../../store/slices/cartSlice';
import CategoryNavigation from './CategoryNavigation';
import LandingHeaderActions from './LandingHeaderActions';
import LandingSearchForm from './LandingSearchForm';
import { LANDING_CONTENT } from './landingContent';
import { LANDING_ASSET_PATH } from './landingData';

const LandingHeader = memo(({ searchValue, onSearchChange, onSearchSubmit }) => {
  const totalItems = useSelector(selectTotalItems);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleMenuToggle = useCallback(() => {
    setIsMenuOpen((isOpen) => !isOpen);
  }, []);

  return (
    <header className="bg-brand-navy text-white" role="banner">
      <div className="mx-auto max-w-screen-2xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-6 py-3.5">
          <Link
            to={ROUTES.HOME}
            aria-label={LANDING_CONTENT.header.homeLabel}
            className="shrink-0"
          >
            <img
              src={`${LANDING_ASSET_PATH}/logo.svg`}
              alt={LANDING_CONTENT.header.logoAlt}
              width="220"
              height="40"
              className="h-8 w-auto"
            />
          </Link>

          <LandingSearchForm
            idPrefix="desktop"
            searchValue={searchValue}
            onSearchChange={onSearchChange}
            onSearchSubmit={onSearchSubmit}
            showCategory
            className="hidden max-w-4xl flex-1 md:block"
          />

          <LandingHeaderActions totalItems={totalItems} />

          <div className="flex items-center lg:hidden">
            <button
              type="button"
              onClick={handleMenuToggle}
              aria-expanded={isMenuOpen}
              aria-controls="landing-mobile-navigation"
              aria-label={
                isMenuOpen ? LANDING_CONTENT.header.closeMenu : LANDING_CONTENT.header.openMenu
              }
              className="rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-brand-orange"
            >
              {isMenuOpen ? (
                <X size={24} aria-hidden="true" />
              ) : (
                <Menu size={24} aria-hidden="true" />
              )}
            </button>
          </div>
        </div>

        <LandingSearchForm
          idPrefix="mobile"
          searchValue={searchValue}
          onSearchChange={onSearchChange}
          onSearchSubmit={onSearchSubmit}
          showCategory={false}
          className="block pb-3.5 md:hidden"
        />

        <CategoryNavigation />

        {isMenuOpen && (
          <CategoryNavigation id="landing-mobile-navigation" isMobile onNavigate={handleMenuToggle} />
        )}
      </div>
    </header>
  );
});

LandingHeader.displayName = 'LandingHeader';

export default LandingHeader;
