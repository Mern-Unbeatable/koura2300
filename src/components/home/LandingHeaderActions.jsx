import React, { memo } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { LayoutDashboard, LogIn, MessageCircle, Package, UserRound } from 'lucide-react';
import { ROUTES } from '../../config';
import { getAccountNavLabel, isAdminUser } from '../login/loginUtils';
import {
  selectIsAuthenticated,
  selectUser,
} from '../../store/slices/authSlice';
import { LANDING_CONTENT } from './landingContent';

const ACTION_ICON_SIZE = 20;
const ACTION_CLASS =
  'flex min-w-14 max-w-20 cursor-pointer flex-col items-center gap-1 px-1 text-xs leading-none';
const ACTION_ACTIVE_CLASS = `${ACTION_CLASS} text-brand-orange`;

const HeaderActionLink = memo(({ to, label, icon: Icon, isActive }) => (
  <Link
    to={to}
    aria-current={isActive ? 'page' : undefined}
    title={label}
    className={isActive ? ACTION_ACTIVE_CLASS : ACTION_CLASS}
  >
    <Icon size={ACTION_ICON_SIZE} aria-hidden="true" />
    <span className="max-w-full truncate">{label}</span>
  </Link>
));

HeaderActionLink.displayName = 'HeaderActionLink';

const LandingHeaderActions = memo(({ isChatActive = false, onChatClick }) => {
  const { pathname } = useLocation();
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const user = useSelector(selectUser);
  const isAdmin = isAdminUser(user);

  const isOrdersActive = pathname === ROUTES.ORDERS;
  const isAccountActive = pathname === ROUTES.ACCOUNT;
  const isLoginActive = pathname === ROUTES.LOGIN;
  const isDashboardActive = pathname.startsWith(ROUTES.ADMIN);

  const accountLabel = getAccountNavLabel(user, LANDING_CONTENT.header.account);

  return (
    <div className="hidden shrink-0 items-center lg:flex">
      {!isAuthenticated ? (
        <HeaderActionLink
          to={ROUTES.LOGIN}
          label={LANDING_CONTENT.header.login}
          icon={LogIn}
          isActive={isLoginActive}
        />
      ) : null}

      {isAuthenticated && isAdmin ? (
        <HeaderActionLink
          to={ROUTES.ADMIN_DASHBOARD}
          label={LANDING_CONTENT.header.dashboard}
          icon={LayoutDashboard}
          isActive={isDashboardActive}
        />
      ) : null}

      <HeaderActionLink
        to={ROUTES.ACCOUNT}
        label={accountLabel}
        icon={UserRound}
        isActive={isAccountActive}
      />

      <HeaderActionLink
        to={ROUTES.ORDERS}
        label={LANDING_CONTENT.header.order}
        icon={Package}
        isActive={isOrdersActive}
      />

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
