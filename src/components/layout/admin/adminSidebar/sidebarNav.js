import {
  CalendarDays,
  ChartColumnStacked,
  FileText,
  LayoutDashboard,
  Megaphone,
  MessageCircle,
  Settings,
  Star,
  UserRound,
  UsersRound,
  Wrench,
} from 'lucide-react';
import { ROUTES } from '../../../../config';

export const SIDEBAR_COPY = {
  main: 'MAIN',
  management: 'MANAGEMENT',
  other: 'OTHER',
  overview: 'Overview',
  logoAlt: 'Logoipsum',
  homeLabel: 'Logoipsum home',
  logOut: 'Log Out',
  adminRole: 'Admin',
  comingSoon: 'Coming soon',
  profile: 'Profile',
};

export const SIDEBAR_NAV_GROUPS = [
  {
    id: 'main',
    label: SIDEBAR_COPY.main,
    items: [
      {
        name: SIDEBAR_COPY.overview,
        path: ROUTES.ADMIN_DASHBOARD,
        icon: LayoutDashboard,
        end: true,
      },
      { name: 'Bookings', path: ROUTES.ADMIN_BOOKINGS, icon: CalendarDays },
      { name: 'Customers', path: ROUTES.ADMIN_CUSTOMERS, icon: UsersRound },
      { name: 'Services', path: ROUTES.ADMIN_SERVICES, icon: Wrench },
    ],
  },
  // {
  //   id: 'management',
  //   label: SIDEBAR_COPY.management,
  //   items: [
  //     {
  //       name: 'Categories',
  //       path: ROUTES.ADMIN_CATEGORIES,
  //       icon: ChartColumnStacked,
  //     },
  //     {
  //       name: 'Reviews',
  //       path: ROUTES.ADMIN_REVIEWS,
  //       icon: Star,
  //     },
  //     { name: 'Blog Post', path: ROUTES.ADMIN_BLOG, icon: FileText },
  //     {
  //       name: 'Ads Management',
  //       path: ROUTES.ADMIN_ADS,
  //       icon: Megaphone,
  //     },
  //   ],
  // },
  // {
  //   id: 'other',
  //   label: SIDEBAR_COPY.other,
  //   items: [
  //     {
  //       name: 'Support',
  //       path: ROUTES.ADMIN_MESSAGES,
  //       icon: MessageCircle,
  //     },
  //     {
  //       name: 'Settings',
  //       path: ROUTES.ADMIN_SETTINGS,
  //       icon: Settings,
  //     },
  //     {
  //       name: SIDEBAR_COPY.profile,
  //       path: ROUTES.ADMIN_PROFILE,
  //       icon: UserRound,
  //     },
  //   ],
  // },
];

export const SIDEBAR_ICON_SIZE_PX = 20;
export const SIDEBAR_CHEVRON_SIZE_PX = 18;
export const SIDEBAR_LOGOUT_REDIRECT_MS = 900;

export const SIDEBAR_LOGO_SRC = '/assets/admin/sidebar-logo.svg';
export const SIDEBAR_LOGO_WIDTH_PX = 220;
export const SIDEBAR_LOGO_HEIGHT_PX = 40;
export const SIDEBAR_LOGO_DISPLAY_HEIGHT_CLASS = 'h-10';

export const SIDEBAR_NAV_BASE_CLASS =
  'group flex w-full items-center gap-[11px] rounded-[9px] border-l-4 px-2.5 py-[11px] text-base font-medium transition-colors duration-200';

export const SIDEBAR_NAV_ACTIVE_CLASS =
  'border-[#fc6f32] bg-[#fff1eb] text-[#fc6f32]';

export const SIDEBAR_NAV_INACTIVE_CLASS =
  'border-transparent text-[#5d687b] hover:bg-[#fff1eb]/40 hover:text-[#455163]';

export const SIDEBAR_SECTION_LABEL_CLASS =
  'px-2.5 text-base font-normal leading-6 text-[#707070]';

export const SIDEBAR_GROUP_CLASS = 'flex flex-col gap-1';

export const SIDEBAR_GROUPS_CLASS = 'flex flex-col gap-4';

export const SIDEBAR_NAV_LIST_CLASS = 'space-y-1';

export const SIDEBAR_NAV_SCROLL_CLASS = 'flex-1 overflow-y-auto px-3 py-4';

export const SIDEBAR_FOOTER_CLASS =
  'shrink-0 space-y-3.5 border-t border-[#e4e4e4] px-3 pb-3 pt-5';
