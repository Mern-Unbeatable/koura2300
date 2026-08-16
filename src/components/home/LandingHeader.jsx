import React, { memo, useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { ROUTES } from '../../config';
import { selectTotalItems } from '../../store/slices/cartSlice';
import useLandingLocale from '../../hooks/useLandingLocale';
import CategoryNavigation from './CategoryNavigation';
import LandingHeaderActions from './LandingHeaderActions';
import LandingSearchForm from './LandingSearchForm';
import { LANDING_ASSET_PATH } from './landingData';

const LandingHeader = memo(({ searchValue, onSearchChange, onSearchSubmit }) => {
  const { t } = useTranslation();
  const totalItems = useSelector(selectTotalItems);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { nextLocale, handleLocaleChange } = useLandingLocale();

  const handleMenuToggle = useCallback(() => {
    setIsMenuOpen((isOpen) => !isOpen);
  }, []);

  const languageLabel = t(`landing.header.language.${nextLocale}`);

  return (
    <header className="bg-brand-navy text-white" role="banner">
      <div className="mx-auto max-w-screen-2xl px-4 py-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-4 border-b border-brand-muted pb-4">
          <Link to={ROUTES.HOME} aria-label={t('landing.header.homeLabel')} className="shrink-0">
            <img
              src={`${LANDING_ASSET_PATH}/logo.svg`}
              alt={t('landing.header.logoAlt')}
              width="220"
              height="40"
              className="h-8 w-auto sm:h-10"
            />
          </Link>

          <LandingSearchForm
            idPrefix="desktop"
            searchValue={searchValue}
            onSearchChange={onSearchChange}
            onSearchSubmit={onSearchSubmit}
            showCategory
            className="hidden max-w-3xl flex-1 items-stretch md:flex"
          />

          <LandingHeaderActions
            totalItems={totalItems}
            nextLocale={nextLocale}
            onLocaleChange={handleLocaleChange}
          />

          <div className="flex items-center gap-2 lg:hidden">
            <button
              type="button"
              onClick={handleLocaleChange}
              aria-label={languageLabel}
              className="rounded-md border border-brand-muted px-2 py-1 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-brand-orange"
            >
              {nextLocale.toUpperCase()}
            </button>
            <button
              type="button"
              onClick={handleMenuToggle}
              aria-expanded={isMenuOpen}
              aria-controls="landing-mobile-navigation"
              aria-label={t(isMenuOpen ? 'landing.header.closeMenu' : 'landing.header.openMenu')}
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

        <CategoryNavigation />

        {isMenuOpen && (
          <CategoryNavigation
            id="landing-mobile-navigation"
            isMobile
            onNavigate={handleMenuToggle}
          />
        )}

        <LandingSearchForm
          idPrefix="mobile"
          searchValue={searchValue}
          onSearchChange={onSearchChange}
          onSearchSubmit={onSearchSubmit}
          showCategory={false}
          className="flex pt-4 md:hidden"
        />
      </div>
    </header>
  );
});

LandingHeader.displayName = 'LandingHeader';

export default LandingHeader;
