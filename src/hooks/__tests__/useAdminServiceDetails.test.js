import { renderHook } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { SERVICES_SEED } from '../../components/admin/services/servicesData';
import useAdminServiceDetails from '../useAdminServiceDetails';

const lightingService = SERVICES_SEED.find(
  (service) => service.title === 'Ceiling Light Installation',
);

const renderUseAdminServiceDetails = (serviceId) =>
  renderHook(() => useAdminServiceDetails(), {
    wrapper: ({ children }) => (
      <MemoryRouter initialEntries={[`/admin/services/${serviceId}`]}>
        <Routes>
          <Route path="/admin/services/:serviceId" element={children} />
        </Routes>
      </MemoryRouter>
    ),
  });

describe('useAdminServiceDetails', () => {
  it('loads catalog service details for the route service id', () => {
    const { result } = renderUseAdminServiceDetails(lightingService.id);

    expect(result.current.details.service.id).toBe(lightingService.id);
    expect(result.current.details.packages).toHaveLength(2);
    expect(result.current.details.reviews.length).toBeGreaterThan(0);
  });

  it('returns null details for an unknown service id', () => {
    const { result } = renderUseAdminServiceDetails('missing-service');

    expect(result.current.details).toBeNull();
  });
});
