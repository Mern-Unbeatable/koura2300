import React, { memo } from 'react';
import { Link } from 'react-router-dom';
import { MessageCircle, Package, UserRound } from 'lucide-react';
import { ROUTES } from '../../config';
import { LANDING_CONTENT } from './landingContent';

const ACTION_ICON_SIZE = 20;
// Fixed width keeps the icons on an even pitch regardless of label length.
const ACTION_CLASS = 'flex w-14 flex-col items-center gap-1 text-xs leading-none';

const LandingHeaderActions = memo(() => (
  <div className="hidden shrink-0 items-center lg:flex">
    <Link to={ROUTES.LOGIN} className={ACTION_CLASS}>
      <UserRound size={ACTION_ICON_SIZE} aria-hidden="true" />
      {LANDING_CONTENT.header.account}
    </Link>

    <Link to={ROUTES.ADMIN_ORDERS} className={ACTION_CLASS}>
      <Package size={ACTION_ICON_SIZE} aria-hidden="true" />
      {LANDING_CONTENT.header.order}
    </Link>

    <a href="#footer" className={ACTION_CLASS}>
      <MessageCircle size={ACTION_ICON_SIZE} aria-hidden="true" />
      {LANDING_CONTENT.header.chat}
    </a>
  </div>
));

LandingHeaderActions.displayName = 'LandingHeaderActions';

export default LandingHeaderActions;
