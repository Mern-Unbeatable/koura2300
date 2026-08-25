import React, { lazy, Suspense } from 'react';
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  Navigate,
  Link,
  useLocation,
} from 'react-router-dom';
import { useSelector } from 'react-redux';
import Layout from '../components/Layout';
import AdminLayout from '../components/layout/admin/Layout';
import { ROUTES } from '../config';
import { selectIsAuthenticated } from '../store/slices/authSlice';

// Derive a relative segment from an absolute admin route path
const seg = (route) => route.replace(`${ROUTES.ADMIN}/`, '');

const Home = lazy(() => import('../pages/Home'));
const About = lazy(() => import('../pages/About'));
const Contact = lazy(() => import('../pages/Contact'));
const Services = lazy(() => import('../pages/Services'));
const Lighting = lazy(() => import('../pages/Lighting'));
const Security = lazy(() => import('../pages/Security'));
const Closets = lazy(() => import('../pages/Closets'));
const Fence = lazy(() => import('../pages/Fence'));
const Deck = lazy(() => import('../pages/Deck'));
const Basement = lazy(() => import('../pages/Basement'));
const Appliances = lazy(() => import('../pages/Appliances'));
const Garage = lazy(() => import('../pages/Garage'));
const Garden = lazy(() => import('../pages/Garden'));
const Flooring = lazy(() => import('../pages/Flooring'));
const Windows = lazy(() => import('../pages/Windows'));
const Doors = lazy(() => import('../pages/Doors'));
const Kitchen = lazy(() => import('../pages/Kitchen'));
const Bathroom = lazy(() => import('../pages/Bathroom'));
const WallsCeilings = lazy(() => import('../pages/WallsCeilings'));
const BlogDetails = lazy(() => import('../pages/BlogDetails'));
const ServiceDetails = lazy(() => import('../pages/ServiceDetails'));
const Login = lazy(() => import('../pages/Login'));
const Checkout = lazy(() => import('../pages/Checkout'));
const OrdersPage = lazy(() => import('../pages/Orders'));
const OrderDetailsPage = lazy(() => import('../pages/OrderDetails'));
const AccountPage = lazy(() => import('../pages/Account'));

// Admin pages — each lazy-loaded so they only download when visited
const Dashboard = lazy(() => import('../pages/admin/Dashboard'));
const Bookings = lazy(() => import('../pages/admin/Bookings'));
const BookingDetails = lazy(() => import('../pages/admin/BookingDetails'));
const Customers = lazy(() => import('../pages/admin/Customers'));
const AdminServices = lazy(() => import('../pages/admin/Services'));
const Emails = lazy(() => import('../pages/admin/Emails'));
const Leads = lazy(() => import('../pages/admin/Leads'));
const Orders = lazy(() => import('../pages/admin/Orders'));
const MarketplaceOrders = lazy(() => import('../pages/admin/MarketplaceOrders'));
const CaseStudies = lazy(() => import('../pages/admin/CaseStudies'));
const Blog = lazy(() => import('../pages/admin/Blog'));
const Jobs = lazy(() => import('../pages/admin/Jobs'));
const Pricing = lazy(() => import('../pages/admin/Pricing'));
const AdminMessages = lazy(() => import('../pages/admin/Messages'));

const PageLoader = () => (
  <div className="flex items-center justify-center min-h-screen">
    <div className="w-8 h-8 border-4 border-orange-500 border-t-transparent rounded-full animate-spin" />
  </div>
);

const NotFound = () => (
  <div className="flex flex-col items-center justify-center min-h-screen gap-4 text-center px-4">
    <h1 className="text-6xl font-bold text-gray-800">404</h1>
    <p className="text-xl text-gray-500">Page not found</p>
    <Link to={ROUTES.HOME} className="mt-2 text-blue-600 hover:underline text-sm font-medium">
      Back to Home
    </Link>
  </div>
);

const ProtectedRoute = ({ children }) => {
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const location = useLocation();
  if (!isAuthenticated) {
    return <Navigate to={ROUTES.LOGIN} state={{ from: location }} replace />;
  }
  return children;
};

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route
        path={ROUTES.HOME}
        element={
          <Suspense fallback={<PageLoader />}>
            <Home />
          </Suspense>
        }
      />

      <Route
        path={ROUTES.SERVICES}
        element={
          <Suspense fallback={<PageLoader />}>
            <Services />
          </Suspense>
        }
      />

      <Route
        path={ROUTES.ORDERS}
        element={
          <Suspense fallback={<PageLoader />}>
            <OrdersPage />
          </Suspense>
        }
      />

      <Route
        path={ROUTES.ORDER_DETAILS}
        element={
          <Suspense fallback={<PageLoader />}>
            <OrderDetailsPage />
          </Suspense>
        }
      />

      <Route
        path={ROUTES.ACCOUNT}
        element={
          <Suspense fallback={<PageLoader />}>
            <AccountPage />
          </Suspense>
        }
      />

      <Route
        path={ROUTES.LIGHTING}
        element={
          <Suspense fallback={<PageLoader />}>
            <Lighting />
          </Suspense>
        }
      />

      <Route
        path={ROUTES.SECURITY}
        element={
          <Suspense fallback={<PageLoader />}>
            <Security />
          </Suspense>
        }
      />

      <Route
        path={ROUTES.CLOSETS}
        element={
          <Suspense fallback={<PageLoader />}>
            <Closets />
          </Suspense>
        }
      />

      <Route
        path={ROUTES.FENCE}
        element={
          <Suspense fallback={<PageLoader />}>
            <Fence />
          </Suspense>
        }
      />

      <Route
        path={ROUTES.DECK}
        element={
          <Suspense fallback={<PageLoader />}>
            <Deck />
          </Suspense>
        }
      />

      <Route
        path={ROUTES.BASEMENT}
        element={
          <Suspense fallback={<PageLoader />}>
            <Basement />
          </Suspense>
        }
      />

      <Route
        path={ROUTES.APPLIANCES}
        element={
          <Suspense fallback={<PageLoader />}>
            <Appliances />
          </Suspense>
        }
      />

      <Route
        path={ROUTES.GARAGE}
        element={
          <Suspense fallback={<PageLoader />}>
            <Garage />
          </Suspense>
        }
      />

      <Route
        path={ROUTES.GARDEN}
        element={
          <Suspense fallback={<PageLoader />}>
            <Garden />
          </Suspense>
        }
      />

      <Route
        path={ROUTES.FLOORING}
        element={
          <Suspense fallback={<PageLoader />}>
            <Flooring />
          </Suspense>
        }
      />

      <Route
        path={ROUTES.WINDOWS}
        element={
          <Suspense fallback={<PageLoader />}>
            <Windows />
          </Suspense>
        }
      />

      <Route
        path={ROUTES.DOORS}
        element={
          <Suspense fallback={<PageLoader />}>
            <Doors />
          </Suspense>
        }
      />

      <Route
        path={ROUTES.KITCHEN}
        element={
          <Suspense fallback={<PageLoader />}>
            <Kitchen />
          </Suspense>
        }
      />

      <Route
        path={ROUTES.BATHROOM}
        element={
          <Suspense fallback={<PageLoader />}>
            <Bathroom />
          </Suspense>
        }
      />

      <Route
        path={ROUTES.WALLS_CEILINGS}
        element={
          <Suspense fallback={<PageLoader />}>
            <WallsCeilings />
          </Suspense>
        }
      />

      <Route
        path={ROUTES.BLOG_DETAILS}
        element={
          <Suspense fallback={<PageLoader />}>
            <BlogDetails />
          </Suspense>
        }
      />

      <Route
        path={ROUTES.SERVICE_DETAILS}
        element={
          <Suspense fallback={<PageLoader />}>
            <ServiceDetails />
          </Suspense>
        }
      />

      <Route
        element={
          <Suspense fallback={<PageLoader />}>
            <Layout />
          </Suspense>
        }
      >
        <Route path={ROUTES.ABOUT} element={<About />} />
        <Route path={ROUTES.CONTACT} element={<Contact />} />
      </Route>

      <Route
        path={ROUTES.LOGIN}
        element={
          <Suspense fallback={<PageLoader />}>
            <Login />
          </Suspense>
        }
      />

      <Route
        path={ROUTES.CHECKOUT}
        element={
          <Suspense fallback={<PageLoader />}>
            <Checkout />
          </Suspense>
        }
      />

      <Route
        path={ROUTES.ADMIN}
        element={
          <Suspense fallback={<PageLoader />}>
            <ProtectedRoute>
              <AdminLayout />
            </ProtectedRoute>
          </Suspense>
        }
      >
        <Route index element={<Navigate to={ROUTES.ADMIN_DASHBOARD} replace />} />
        <Route path={seg(ROUTES.ADMIN_DASHBOARD)} element={<Dashboard />} />
        <Route path={seg(ROUTES.ADMIN_BOOKINGS)} element={<Bookings />} />
        <Route path={seg(ROUTES.ADMIN_BOOKING_DETAILS)} element={<BookingDetails />} />
        <Route path={seg(ROUTES.ADMIN_CUSTOMERS)} element={<Customers />} />
        <Route path={seg(ROUTES.ADMIN_SERVICES)} element={<AdminServices />} />
        <Route path={seg(ROUTES.ADMIN_EMAILS)} element={<Emails />} />
        <Route path={seg(ROUTES.ADMIN_LEADS)} element={<Leads />} />
        <Route path={seg(ROUTES.ADMIN_ORDERS)} element={<Orders />} />
        <Route path={seg(ROUTES.ADMIN_MARKETPLACE_ORDERS)} element={<MarketplaceOrders />} />
        <Route path={seg(ROUTES.ADMIN_CASE_STUDIES)} element={<CaseStudies />} />
        <Route path={seg(ROUTES.ADMIN_BLOG)} element={<Blog />} />
        <Route path={seg(ROUTES.ADMIN_JOBS)} element={<Jobs />} />
        <Route path={seg(ROUTES.ADMIN_PRICING)} element={<Pricing />} />
        <Route path={seg(ROUTES.ADMIN_MESSAGES)} element={<AdminMessages />} />
      </Route>

      <Route path="*" element={<NotFound />} />
    </>,
  ),
);

export default router;
