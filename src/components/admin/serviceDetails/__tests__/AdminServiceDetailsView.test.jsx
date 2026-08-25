import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { ROUTES } from '../../../../config';
import { SERVICES_SEED } from '../../services/servicesData';
import { ADMIN_SERVICE_DETAILS_COPY } from '../adminServiceDetailsCopy';
import {
  ADMIN_SERVICE_DETAILS_CATEGORY_BADGE_CLASS,
  ADMIN_SERVICE_DETAILS_DISTRIBUTION_TRACK_CLASS,
  ADMIN_SERVICE_DETAILS_PACKAGE_GRID_CLASS,
  ADMIN_SERVICE_DETAILS_RATING_SUMMARY_CLASS,
  ADMIN_SERVICE_DETAILS_SPLIT_CLASS,
  ADMIN_SERVICE_DETAILS_SUBCATEGORY_BADGE_CLASS,
  ADMIN_SERVICE_DETAILS_VIEWPORT,
} from '../adminServiceDetailsData';
import AdminServiceDetailsView from '../AdminServiceDetailsView';
import { getAdminServiceDetailsById } from '../adminServiceDetailsUtils';

const lightingService = SERVICES_SEED.find(
  (service) => service.title === 'Ceiling Light Installation',
);
const details = getAdminServiceDetailsById(lightingService.id);

const renderDetails = (overrides = {}) =>
  render(
    <MemoryRouter initialEntries={[`/admin/services/${lightingService.id}`]}>
      <Routes>
        <Route path={ROUTES.ADMIN_SERVICES} element={<div>Services list</div>} />
        <Route
          path={ROUTES.ADMIN_SERVICE_DETAILS}
          element={
            <AdminServiceDetailsView
              copy={ADMIN_SERVICE_DETAILS_COPY}
              details={details}
              {...overrides}
            />
          }
        />
      </Routes>
    </MemoryRouter>,
  );

describe('AdminServiceDetailsView', () => {
  it('renders the Figma service details sections for a catalog service', () => {
    renderDetails();

    expect(
      screen.getByRole('link', { name: ADMIN_SERVICE_DETAILS_COPY.actions.back }),
    ).toHaveAttribute('href', ROUTES.ADMIN_SERVICES);
    expect(
      screen.getByRole('heading', { level: 1, name: lightingService.title }),
    ).toBeInTheDocument();
    expect(screen.getByText(lightingService.catalogTitle)).toBeInTheDocument();
    expect(screen.getByText(lightingService.category)).toBeInTheDocument();
    expect(screen.getByText(details.overview)).toBeInTheDocument();
    expect(screen.getByText(lightingService.duration)).toBeInTheDocument();
    expect(ADMIN_SERVICE_DETAILS_CATEGORY_BADGE_CLASS).toContain('bg-[#0b1e3d]');
    expect(ADMIN_SERVICE_DETAILS_SUBCATEGORY_BADGE_CLASS).toContain('bg-[#4f6589]');
    expect(screen.getByText(details.packages[0].title)).toBeInTheDocument();
    expect(screen.getByText(details.packages[1].title)).toBeInTheDocument();
    expect(
      screen.getByRole('heading', {
        name: ADMIN_SERVICE_DETAILS_COPY.inclusions.includedTitle,
      }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole('heading', {
        name: ADMIN_SERVICE_DETAILS_COPY.inclusions.excludedTitle,
      }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole('region', { name: ADMIN_SERVICE_DETAILS_COPY.reviews.regionLabel }),
    ).toBeInTheDocument();
    expect(screen.getByText('4.7')).toBeInTheDocument();
    expect(screen.getByText(/Customer Rating/)).toBeInTheDocument();
    expect(screen.getByText('63%')).toBeInTheDocument();
    expect(
      screen.getByRole('list', {
        name: ADMIN_SERVICE_DETAILS_COPY.reviews.distributionLabel,
      }),
    ).toBeInTheDocument();
    expect(screen.getByText('Darrell Steward')).toBeInTheDocument();
    expect(screen.getByText('Esther Howard')).toBeInTheDocument();
    expect(ADMIN_SERVICE_DETAILS_RATING_SUMMARY_CLASS).toContain('bg-[#fbf4ce]');
    expect(ADMIN_SERVICE_DETAILS_DISTRIBUTION_TRACK_CLASS).toContain('min-[1020px]:w-[424px]');
  });

  it('switches gallery hero image when a thumbnail is selected', async () => {
    const user = userEvent.setup();
    renderDetails();

    const gallery = screen.getByRole('region', {
      name: ADMIN_SERVICE_DETAILS_COPY.gallery.regionLabel,
    });
    const hero = within(gallery).getAllByRole('img')[0];
    const firstThumbSrc = details.gallery.thumbnails[0];

    await user.click(
      screen.getByRole('button', {
        name: ADMIN_SERVICE_DETAILS_COPY.gallery.thumbnailLabel(1),
      }),
    );

    expect(hero).toHaveAttribute('src', firstThumbSrc);
  });

  it('uses responsive split and package grid classes across breakpoints', () => {
    renderDetails();

    expect(ADMIN_SERVICE_DETAILS_VIEWPORT).toEqual({
      MOBILE_S: 320,
      MOBILE_M: 375,
      MOBILE_L: 425,
      TABLET: 768,
      LAPTOP: 1020,
      DESKTOP: 1440,
    });
    expect(ADMIN_SERVICE_DETAILS_SPLIT_CLASS).toContain('min-[1020px]:grid-cols-2');
    expect(ADMIN_SERVICE_DETAILS_PACKAGE_GRID_CLASS).toContain('min-[768px]:grid-cols-2');
  });

  it('renders the not-found state when details are missing', () => {
    renderDetails({ details: null });

    expect(
      screen.getByRole('heading', { name: ADMIN_SERVICE_DETAILS_COPY.notFound.title }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole('link', { name: ADMIN_SERVICE_DETAILS_COPY.notFound.backLabel }),
    ).toHaveAttribute('href', ROUTES.ADMIN_SERVICES);
  });
});
