import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import toast from 'react-hot-toast';
import { ChevronRight, ChevronsLeft, ChevronsRight, LogOut, X } from 'lucide-react';
import { ROUTES } from '../../../../config';
import { logout, selectUser } from '../../../../store/slices/authSlice';
import {
  SIDEBAR_CHEVRON_SIZE_PX,
  SIDEBAR_COPY,
  SIDEBAR_GROUP_CLASS,
  SIDEBAR_GROUPS_CLASS,
  SIDEBAR_ICON_SIZE_PX,
  SIDEBAR_LOGO_DISPLAY_HEIGHT_CLASS,
  SIDEBAR_LOGO_HEIGHT_PX,
  SIDEBAR_LOGO_SRC,
  SIDEBAR_LOGO_WIDTH_PX,
  SIDEBAR_LOGOUT_REDIRECT_MS,
  SIDEBAR_NAV_ACTIVE_CLASS,
  SIDEBAR_NAV_BASE_CLASS,
  SIDEBAR_NAV_GROUPS,
  SIDEBAR_NAV_INACTIVE_CLASS,
  SIDEBAR_SECTION_LABEL_CLASS,
} from './sidebarNav';

const getNavClass = ({ isActive }) =>
  `${SIDEBAR_NAV_BASE_CLASS} ${isActive ? SIDEBAR_NAV_ACTIVE_CLASS : SIDEBAR_NAV_INACTIVE_CLASS}`;

const flattenNavItems = (groups) => groups.flatMap((group) => group.items);

const SidebarNavItem = ({ item, onNavigate }) => {
  const { name, path, icon: Icon, end, comingSoon } = item;

  if (comingSoon || !path) {
    return (
      <button
        type="button"
        onClick={() => {
          toast(SIDEBAR_COPY.comingSoon);
          onNavigate();
        }}
        className={`${SIDEBAR_NAV_BASE_CLASS} ${SIDEBAR_NAV_INACTIVE_CLASS}`}
      >
        <Icon size={SIDEBAR_ICON_SIZE_PX} aria-hidden="true" className="shrink-0" />
        <span className="truncate flex-1 text-left">{name}</span>
      </button>
    );
  }

  return (
    <NavLink to={path} end={Boolean(end)} onClick={onNavigate} className={getNavClass}>
      {({ isActive }) => (
        <>
          <Icon
            size={SIDEBAR_ICON_SIZE_PX}
            aria-hidden="true"
            className={`shrink-0 transition-colors ${
              isActive ? 'text-[#fc6f32]' : 'text-[#5d687b] group-hover:text-[#455163]'
            }`}
          />
          <span className="truncate flex-1">{name}</span>
          <ChevronRight
            size={SIDEBAR_CHEVRON_SIZE_PX}
            aria-hidden="true"
            className={`shrink-0 text-[#fc6f32] ${isActive ? 'opacity-100' : 'opacity-0'}`}
          />
        </>
      )}
    </NavLink>
  );
};

const Sidebar = ({
  onClose,
  onDesktopClose,
  onAutoCollapse,
  isCollapsed,
  onExpand,
}) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const flatItems = flattenNavItems(SIDEBAR_NAV_GROUPS);

  const handleNavigate = (autoCollapse) => {
    onClose();
    if (autoCollapse && onAutoCollapse) {
      onAutoCollapse();
    }
  };

  const handleLogout = () => {
    dispatch(logout());
    toast.success('Signed out successfully');
    setTimeout(() => navigate(ROUTES.LOGIN), SIDEBAR_LOGOUT_REDIRECT_MS);
  };

  if (isCollapsed) {
    return (
      <div className="flex h-full w-full flex-col items-center gap-1 border-r border-gray-100 bg-white py-3">
        <button
          type="button"
          onClick={onExpand}
          title="Expand sidebar"
          aria-label="Expand sidebar"
          className="mb-2 flex size-10 shrink-0 items-center justify-center rounded-lg text-gray-500 transition-colors duration-200 hover:bg-orange-50/40 hover:text-gray-800"
        >
          <ChevronsRight size={SIDEBAR_ICON_SIZE_PX} aria-hidden="true" />
        </button>

        <nav
          className="flex w-full flex-1 flex-col items-center gap-1 overflow-y-auto px-2"
          aria-label="Main navigation"
        >
          {flatItems
            .filter((item) => item.path)
            .map(({ name, path, icon: Icon, end, autoCollapse }) => (
              <NavLink
                key={path}
                to={path}
                end={Boolean(end)}
                title={name}
                aria-label={name}
                onClick={() => handleNavigate(autoCollapse)}
                className={({ isActive }) =>
                  `flex size-10 items-center justify-center rounded-lg transition-colors duration-200 ${
                    isActive
                      ? 'bg-[#fff1eb] text-[#fc6f32]'
                      : 'text-gray-400 hover:bg-orange-50/40 hover:text-gray-900'
                  }`
                }
              >
                <Icon size={SIDEBAR_ICON_SIZE_PX} aria-hidden="true" />
              </NavLink>
            ))}
        </nav>

        <button
          type="button"
          onClick={handleLogout}
          title={SIDEBAR_COPY.logOut}
          aria-label={SIDEBAR_COPY.logOut}
          className="mt-1 flex size-10 shrink-0 items-center justify-center rounded-lg text-gray-400 transition-colors duration-200 hover:bg-red-50 hover:text-red-500"
        >
          <LogOut size={SIDEBAR_ICON_SIZE_PX} aria-hidden="true" />
        </button>
      </div>
    );
  }

  return (
    <div className="flex h-full w-full flex-col border-r border-[#e8ebf1] bg-white">
      <div className="flex h-[72px] shrink-0 items-center justify-between border-b border-[#f2f2f2] px-4">
        <Link
          to={ROUTES.HOME}
          aria-label={SIDEBAR_COPY.homeLabel}
          onClick={onClose}
          className="min-w-0 shrink-0"
        >
          <img
            src={SIDEBAR_LOGO_SRC}
            alt=""
            width={SIDEBAR_LOGO_WIDTH_PX}
            height={SIDEBAR_LOGO_HEIGHT_PX}
            fetchpriority="high"
            className={`${SIDEBAR_LOGO_DISPLAY_HEIGHT_CLASS} w-auto max-w-[220px] object-contain object-left`}
          />
        </Link>
        <button
          type="button"
          onClick={onClose}
          className="-mr-1 mt-0.5 rounded-md p-1.5 text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-700 lg:hidden"
          aria-label="Close navigation"
        >
          <X size={SIDEBAR_ICON_SIZE_PX} aria-hidden="true" />
        </button>
        <button
          type="button"
          onClick={onDesktopClose}
          className="-mr-1 mt-0.5 hidden items-center justify-center rounded-md p-1.5 text-gray-500 transition-colors hover:bg-orange-50/40 hover:text-gray-900 lg:flex"
          aria-label="Collapse sidebar"
        >
          <ChevronsLeft size={SIDEBAR_ICON_SIZE_PX} aria-hidden="true" />
        </button>
      </div>

      <nav className="flex-1 overflow-y-auto px-3 py-5" aria-label="Main navigation">
        <div className={SIDEBAR_GROUPS_CLASS}>
          {SIDEBAR_NAV_GROUPS.map((group) => (
            <div key={group.id} className={SIDEBAR_GROUP_CLASS}>
              <p className={SIDEBAR_SECTION_LABEL_CLASS}>{group.label}</p>
              <ul className="space-y-1">
                {group.items.map((item) => (
                  <li key={item.name}>
                    <SidebarNavItem
                      item={item}
                      onNavigate={() => handleNavigate(item.autoCollapse)}
                    />
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </nav>

      <div className="shrink-0 space-y-4 border-t border-[#e4e4e4] px-3 pb-3 pt-6">
        <div className="flex items-center gap-5 rounded-lg bg-[#f6f6f6] p-2.5">
          <div className="flex size-[50px] shrink-0 items-center justify-center rounded-full bg-linear-to-br from-orange-400 to-orange-600 text-base font-bold text-white select-none">
            {(user?.name || 'A').charAt(0).toUpperCase()}
          </div>
          <div className="min-w-0 flex-1">
            <p className="truncate text-base font-medium capitalize leading-normal text-black">
              {user?.name || 'Admin'}
            </p>
            <p className="truncate text-sm leading-[22px] text-black">
              {SIDEBAR_COPY.adminRole}
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={handleLogout}
          className="flex w-full items-center gap-2 rounded-lg bg-[#fafafa] px-4 py-2.5 text-base text-[#d00000] transition-colors hover:bg-red-50"
        >
          <LogOut size={SIDEBAR_ICON_SIZE_PX} aria-hidden="true" className="shrink-0" />
          <span>{SIDEBAR_COPY.logOut}</span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
