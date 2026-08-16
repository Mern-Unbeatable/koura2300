import React, { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { MessageCircle, Package, ShoppingCart, UserRound } from 'lucide-react';
import { ROUTES } from '../../config';

const LandingHeaderActions = memo(({ totalItems, nextLocale, onLocaleChange }) => {
  const { t } = useTranslation();
  const cartLabel = t('landing.header.cartLabel', { count: totalItems });

  return (
    <div className="hidden items-center gap-4 lg:flex">
      <Link to={ROUTES.LOGIN} className="flex flex-col items-center gap-1 text-xs font-medium">
        <UserRound size={22} aria-hidden="true" />
        {t('landing.header.account')}
      </Link>
      <Link
        to={ROUTES.ADMIN_ORDERS}
        className="flex flex-col items-center gap-1 text-xs font-medium"
      >
        <Package size={22} aria-hidden="true" />
        {t('landing.header.order')}
      </Link>
      <a
        href="#top-services"
        aria-label={cartLabel}
        className="relative flex flex-col items-center gap-1 text-xs font-medium"
      >
        <ShoppingCart size={22} aria-hidden="true" />
        {t('landing.header.cart')}
        {totalItems > 0 && (
          <span className="absolute -right-2 -top-2 flex size-5 items-center justify-center rounded-full bg-brand-orange text-xs">
            {totalItems}
          </span>
        )}
      </a>
      <a href="#footer" className="flex flex-col items-center gap-1 text-xs font-medium">
        <MessageCircle size={22} aria-hidden="true" />
        {t('landing.header.chat')}
      </a>
      <button
        type="button"
        onClick={onLocaleChange}
        aria-label={t(`landing.header.language.${nextLocale}`)}
        className="rounded-md border border-brand-muted px-2 py-1 text-xs font-semibold transition-colors duration-200 ease-in-out hover:border-white focus:outline-none focus:ring-2 focus:ring-brand-orange"
      >
        {nextLocale.toUpperCase()}
      </button>
    </div>
  );
});

LandingHeaderActions.displayName = 'LandingHeaderActions';

export default LandingHeaderActions;
