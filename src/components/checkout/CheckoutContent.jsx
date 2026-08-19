import React, { memo } from 'react';
import useLandingSearch from '../../hooks/useLandingSearch';
import useScrollToTop from '../../hooks/useScrollToTop';
import { useSEO } from '../../hooks/useSEO';
import { ALL_CATALOG_SERVICES } from '../catalog/catalogRegistry';
import LandingFooter from '../home/LandingFooter';
import LandingHeader from '../home/LandingHeader';
import CheckoutView from './CheckoutView';
import { CHECKOUT_CONTENT } from './checkoutCopy';

const CheckoutContent = memo(() => {
  const { searchValue, handleSearchChange, handleSearchSubmit } =
    useLandingSearch(ALL_CATALOG_SERVICES);

  useScrollToTop();
  useSEO({
    title: CHECKOUT_CONTENT.seo.title,
    description: CHECKOUT_CONTENT.seo.description,
    keywords: CHECKOUT_CONTENT.seo.keywords,
  });

  return (
    <div className="min-h-screen overflow-x-clip bg-white font-inter text-brand-ink">
      <LandingHeader
        searchValue={searchValue}
        onSearchChange={handleSearchChange}
        onSearchSubmit={handleSearchSubmit}
      />
      <CheckoutView />
      <LandingFooter />
    </div>
  );
});

CheckoutContent.displayName = 'CheckoutContent';

export default CheckoutContent;
