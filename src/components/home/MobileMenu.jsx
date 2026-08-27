import React, { memo } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { LayoutDashboard, LogIn, MessageCircle, Package, UserRound, X } from 'lucide-react';
import { ROUTES } from '../../config';
import { getAccountNavLabel, isAdminUser } from '../login/loginUtils';
import {
  selectIsAuthenticated,
  selectUser,
} from '../../store/slices/authSlice';
import CategoryNavigation from './CategoryNavigation';
import { LANDING_CONTENT } from './landingContent';
import { LANDING_ASSET_PATH } from './landingData';

const ACTION_ICON_SIZE = 22;
const CLOSE_ICON_SIZE = 24;
const ACTION_TILE_CLASS =
  'flex cursor-pointer flex-col items-center justify-center gap-2 rounded-lg bg-white/5 py-4 text-xs font-medium transition-colors hover:bg-white/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-orange';

const getTileClass = (isActive) =>
  isActive ? `${ACTION_TILE_CLASS} text-brand-orange` : ACTION_TILE_CLASS;

const MobileMenu = memo(({ isOpen, onClose, onChatClick }) => {
  const { pathname } = useLocation();
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const user = useSelector(selectUser);
  const isAdmin = isAdminUser(user);

  if (!isOpen) {
    return null;
  }

  const { header } = LANDING_CONTENT;
  const isAccountActive = pathname === ROUTES.ACCOUNT;
  const isLoginActive = pathname === ROUTES.LOGIN;
  const isDashboardActive = pathname.startsWith(ROUTES.ADMIN);
  const accountLabel = getAccountNavLabel(user, header.account);

  return (
    <div className="lg:hidden">
      <button
        type="button"
        tabIndex={-1}
        aria-hidden="true"
        onClick={onClose}
        className="animate-fade-in fixed inset-0 z-40 cursor-default bg-black/60"
      />

      <aside
        id="landing-mobile-navigation"
        className="animate-drawer-in fixed right-0 top-0 z-50 flex h-dvh w-4/5 max-w-sm flex-col bg-brand-navy text-white shadow-2xl"
      >
        <div className="flex shrink-0 items-center justify-between border-b border-brand-divider px-5 py-4">
          <img
            src={`${LANDING_ASSET_PATH}/logo.svg`}
            alt={header.logoAlt}
            width="220"
            height="40"
            className="h-8 w-auto"
          />
          <button
            type="button"
            onClick={onClose}
            aria-label={header.closeMenu}
            className="-mr-2 cursor-pointer rounded-md p-2 transition-colors hover:bg-white/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-orange"
          >
            <X size={CLOSE_ICON_SIZE} aria-hidden="true" />
          </button>
        </div>

        <div className="min-h-0 flex-1 overflow-y-auto px-5 py-5">
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
            {!isAuthenticated ? (
              <Link
                to={ROUTES.LOGIN}
                onClick={onClose}
                aria-current={isLoginActive ? 'page' : undefined}
                className={getTileClass(isLoginActive)}
              >
                <LogIn size={ACTION_ICON_SIZE} aria-hidden="true" />
                {header.login}
              </Link>
            ) : null}

            {isAuthenticated && isAdmin ? (
              <Link
                to={ROUTES.ADMIN_DASHBOARD}
                onClick={onClose}
                aria-current={isDashboardActive ? 'page' : undefined}
                className={getTileClass(isDashboardActive)}
              >
                <LayoutDashboard size={ACTION_ICON_SIZE} aria-hidden="true" />
                {header.dashboard}
              </Link>
            ) : null}

            <Link
              to={ROUTES.ACCOUNT}
              onClick={onClose}
              aria-current={isAccountActive ? 'page' : undefined}
              className={getTileClass(isAccountActive)}
              title={accountLabel}
            >
              <UserRound size={ACTION_ICON_SIZE} aria-hidden="true" />
              <span className="max-w-full truncate px-1">{accountLabel}</span>
            </Link>

            <Link to={ROUTES.ORDERS} onClick={onClose} className={ACTION_TILE_CLASS}>
              <Package size={ACTION_ICON_SIZE} aria-hidden="true" />
              {header.order}
            </Link>

            <button type="button" onClick={onChatClick} className={ACTION_TILE_CLASS}>
              <MessageCircle size={ACTION_ICON_SIZE} aria-hidden="true" />
              {header.chat}
            </button>
          </div>

          <h2 className="mt-7 text-xs font-semibold uppercase tracking-wider text-white/50">
            {header.categoryNavigation}
          </h2>

          <CategoryNavigation isMobile onNavigate={onClose} />
        </div>
      </aside>
    </div>
  );
});

MobileMenu.displayName = 'MobileMenu';

export default MobileMenu;
