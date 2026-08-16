import React, { memo } from 'react';
import { Link } from 'react-router-dom';
import { MessageCircle, Package, ShoppingCart, UserRound } from 'lucide-react';
import { ROUTES } from '../../config';
import { LANDING_CONTENT } from './landingContent';

const ACTION_ICON_SIZE = 20;
const ACTION_CLASS = 'flex flex-col items-center gap-1 text-[0.6875rem] font-normal';

const getCartLabel = (totalItems) =>
  `Cart, ${totalItems} ${totalItems === 1 ? 'item' : 'items'}`;

const LandingHeaderActions = memo(({ totalItems }) => (
  <div className="hidden shrink-0 items-center gap-6 lg:flex">
    <Link to={ROUTES.LOGIN} className={ACTION_CLASS}>
      <UserRound size={ACTION_ICON_SIZE} aria-hidden="true" />
      {LANDING_CONTENT.header.account}
    </Link>
    <Link to={ROUTES.ADMIN_ORDERS} className={ACTION_CLASS}>
      <Package size={ACTION_ICON_SIZE} aria-hidden="true" />
      {LANDING_CONTENT.header.order}
    </Link>
    <a href="#top-services" aria-label={getCartLabel(totalItems)} className={`relative ${ACTION_CLASS}`}>
      <ShoppingCart size={ACTION_ICON_SIZE} aria-hidden="true" />
      {LANDING_CONTENT.header.cart}
      {totalItems > 0 && (
        <span className="absolute -right-2 -top-2 flex size-5 items-center justify-center rounded-full bg-brand-orange text-xs">
          {totalItems}
        </span>
      )}
    </a>
    <a href="#footer" className={ACTION_CLASS}>
      <MessageCircle size={ACTION_ICON_SIZE} aria-hidden="true" />
      {LANDING_CONTENT.header.chat}
    </a>
  </div>
));

LandingHeaderActions.displayName = 'LandingHeaderActions';

export default LandingHeaderActions;
