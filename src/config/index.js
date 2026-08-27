export const APP_CONFIG = {
  NAME: 'Logoipsum',
  VERSION: process.env.REACT_APP_VERSION || '1.0.0',
};

export const ROUTES = {
  HOME: '/',
  ABOUT: '/about',
  SERVICES: '/services',
  CONTACT: '/contact',
  LIGHTING: '/lighting',
  SECURITY: '/security',
  CLOSETS: '/closets',
  FENCE: '/fence',
  DECK: '/deck',
  BASEMENT: '/basement',
  APPLIANCES: '/appliances',
  GARAGE: '/garage',
  GARDEN: '/garden',
  FLOORING: '/flooring',
  WINDOWS: '/windows',
  DOORS: '/doors',
  KITCHEN: '/kitchen',
  BATHROOM: '/bathroom',
  WALLS_CEILINGS: '/walls-ceilings',
  SERVICE_DETAILS: '/service/:serviceId',
  BLOG_DETAILS: '/blog/:slug',
  PRIVACY_POLICY: '/privacy-policy',
  TERMS: '/terms-and-conditions',
  LOGIN: '/login',
  CHECKOUT: '/checkout',
  ORDERS: '/orders',
  ORDER_DETAILS: '/orders/:orderId',
  ACCOUNT: '/account',
  ADMIN: '/admin',
  ADMIN_DASHBOARD: '/admin/dashboard',
  ADMIN_BOOKINGS: '/admin/bookings',
  ADMIN_BOOKING_DETAILS: '/admin/bookings/:bookingId',
  ADMIN_CUSTOMERS: '/admin/customers',
  ADMIN_SERVICES: '/admin/services',
  ADMIN_SERVICE_NEW: '/admin/services/new',
  ADMIN_SERVICE_EDIT: '/admin/services/:serviceId/edit',
  ADMIN_SERVICE_DETAILS: '/admin/services/:serviceId',
  ADMIN_CATEGORIES: '/admin/categories',
  ADMIN_REVIEWS: '/admin/reviews',
  ADMIN_EMAILS: '/admin/emails',
  ADMIN_LEADS: '/admin/leads',
  ADMIN_ORDERS: '/admin/orders',
  ADMIN_MARKETPLACE_ORDERS: '/admin/marketplace-orders',
  ADMIN_CASE_STUDIES: '/admin/case-studies',
  ADMIN_BLOG: '/admin/blog',
  ADMIN_JOBS: '/admin/jobs',
  ADMIN_PRICING: '/admin/pricing',
  ADMIN_MESSAGES: '/admin/messages',
};

export const SERVICE_DETAILS_PREFIX = '/service/';
export const SERVICE_DETAILS_CATEGORY_PARAM = 'category';
export const CATALOG_ALL_CATEGORY = 'All';

export const buildBlogDetailsRoute = (slug) => `/blog/${slug}`;

export const buildOrderDetailsRoute = (orderId) => `/orders/${orderId}`;

export const buildAdminBookingDetailsRoute = (bookingId) => `/admin/bookings/${bookingId}`;

export const buildAdminServiceDetailsRoute = (serviceId) => `/admin/services/${serviceId}`;

export const buildAdminServiceNewRoute = () => ROUTES.ADMIN_SERVICE_NEW;

export const buildAdminServiceEditRoute = (serviceId) => `/admin/services/${serviceId}/edit`;

export const buildServiceDetailsRoute = (serviceId, category = CATALOG_ALL_CATEGORY) => {
  const searchParams = new URLSearchParams({
    [SERVICE_DETAILS_CATEGORY_PARAM]: category,
  });

  return `${SERVICE_DETAILS_PREFIX}${serviceId}?${searchParams.toString()}`;
};

export const API_CONFIG = {
  BASE_URL: process.env.REACT_APP_API_BASE_URL || 'https://backend.c4r.co.uk',
  VITALS_ENDPOINT: process.env.REACT_APP_VITALS_ENDPOINT || '',
  TIMEOUT: parseInt(process.env.REACT_APP_API_TIMEOUT || '10000', 10),
  RETRY_ATTEMPTS: parseInt(process.env.REACT_APP_API_RETRY_ATTEMPTS || '3', 10),
  RETRY_DELAY: parseInt(process.env.REACT_APP_API_RETRY_DELAY || '1000', 10),
};

export const SEO_CONFIG = {
  DEFAULT_TITLE: 'Logoipsum',
  DEFAULT_DESCRIPTION: process.env.REACT_APP_SEO_DESCRIPTION || 'A professional React application',
  DEFAULT_KEYWORDS: (process.env.REACT_APP_SEO_KEYWORDS || 'react,webpack,tailwind').split(','),
  SITE_URL: typeof window !== 'undefined' ? window.location.origin : '',
};

export const PERFORMANCE_BUDGETS = {
  LCP: 2500,
  FCP: 1800,
  CLS: 0.1,
  INP: 200,
  TTFB: 800,
};

export const TOAST_CONFIG = {
  POSITION: 'top-center',
  DURATION: 3000,
};

export const SOCKET_CONFIG = {
  URL: process.env.REACT_APP_SOCKET_URL || API_CONFIG.BASE_URL,
};
