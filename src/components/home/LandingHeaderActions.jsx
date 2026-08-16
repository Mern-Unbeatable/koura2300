import React, { memo } from 'react';
import { Link } from 'react-router-dom';
import { MessageCircle, Package, ShoppingCart, UserRound } from 'lucide-react';
import { ROUTES } from '../../config';
import { LANDING_CONTENT } from './landingContent';

const ACTION_ICON_SIZE = 20;
// Fixed width keeps the four icons on an even pitch regardless of label length.
const ACTION_CLASS = 'flex w-14 flex-col items-center gap-1 text-xs leading-none';

const getCartLabel = (totalItems) =>
  `Cart, ${totalItems} ${totalItems === 1 ? 'item' : 'items'}`;

const LandingHeaderActions = memo(({ totalItems }) => (
  <div className="hidden shrink-0 items-center lg:flex">
    <Link to={ROUTES.LOGIN} className={ACTION_CLASS}>
      <UserRound size={ACTION_ICON_SIZE} aria-hidden="true" />
      {LANDING_CONTENT.header.account}
    </Link>

    <Link to={ROUTES.ADMIN_ORDERS} className={ACTION_CLASS}>
      <Package size={ACTION_ICON_SIZE} aria-hidden="true" />
      {LANDING_CONTENT.header.order}
    </Link>

    <a href="#top-services" aria-label={getCartLabel(totalItems)} className={ACTION_CLASS}>
      <span className="relative">
        <ShoppingCart size={ACTION_ICON_SIZE} aria-hidden="true" />
        {totalItems > 0 && (
          <span className="absolute -right-2.5 -top-2 flex size-4 items-center justify-center rounded-full bg-brand-orange text-xs font-semibold">
            {totalItems}
          </span>
        )}
      </span>
      {LANDING_CONTENT.header.cart}
    </a>

    <a href="#footer" className={ACTION_CLASS}>
      <MessageCircle size={ACTION_ICON_SIZE} aria-hidden="true" />
      {LANDING_CONTENT.header.chat}
    </a>
  </div>
));

LandingHeaderActions.displayName = 'LandingHeaderActions';

export default LandingHeaderActions;
