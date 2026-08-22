import React, { memo } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { MessageCircle, Package, UserRound } from 'lucide-react';
import { ROUTES } from '../../config';
import { LANDING_CONTENT } from './landingContent';

const ACTION_ICON_SIZE = 20;
const ACTION_CLASS =
  'flex w-14 cursor-pointer flex-col items-center gap-1 text-xs leading-none';
const ACTION_ACTIVE_CLASS = `${ACTION_CLASS} text-brand-orange`;

const LandingHeaderActions = memo(({ isChatActive = false, onChatClick }) => {
  const { pathname } = useLocation();
  const isOrdersActive = pathname === ROUTES.ORDERS;

  return (
    <div className="hidden shrink-0 items-center lg:flex">
      <Link to={ROUTES.LOGIN} className={ACTION_CLASS}>
        <UserRound size={ACTION_ICON_SIZE} aria-hidden="true" />
        {LANDING_CONTENT.header.account}
      </Link>

      <Link
        to={ROUTES.ORDERS}
        aria-current={isOrdersActive ? 'page' : undefined}
        className={isOrdersActive ? ACTION_ACTIVE_CLASS : ACTION_CLASS}
      >
        <Package size={ACTION_ICON_SIZE} aria-hidden="true" />
        {LANDING_CONTENT.header.order}
      </Link>

      <button
        type="button"
        onClick={onChatClick}
        aria-pressed={isChatActive}
        className={isChatActive ? ACTION_ACTIVE_CLASS : ACTION_CLASS}
      >
        <MessageCircle size={ACTION_ICON_SIZE} aria-hidden="true" />
        {LANDING_CONTENT.header.chat}
      </button>
    </div>
  );
});

LandingHeaderActions.displayName = 'LandingHeaderActions';

export default LandingHeaderActions;
