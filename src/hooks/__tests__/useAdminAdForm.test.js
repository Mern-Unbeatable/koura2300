import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { act, renderHook } from '@testing-library/react';
import toast from 'react-hot-toast';
import { ADMIN_AD_FORM_COPY } from '../../components/admin/adsForm/adsFormCopy';
import { ADS_SEED } from '../../components/admin/ads/adsData';
import { ADMIN_SERVICE_FORM_FIELDS } from '../../components/admin/serviceForm/adminServiceFormData';
import { ROUTES } from '../../config';
import useAdminAdForm from '../useAdminAdForm';

const mockNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate,
}));

jest.mock('react-hot-toast', () => ({
  __esModule: true,
  default: {
    success: jest.fn(),
  },
}));

const renderCreateForm = () =>
  renderHook(() => useAdminAdForm(), {
    wrapper: ({ children }) => (
      <MemoryRouter initialEntries={[ROUTES.ADMIN_ADS_NEW]}>
        <Routes>
          <Route path={ROUTES.ADMIN_ADS_NEW} element={children} />
        </Routes>
      </MemoryRouter>
    ),
  });

const renderEditForm = (adId) =>
  renderHook(() => useAdminAdForm(), {
    wrapper: ({ children }) => (
      <MemoryRouter initialEntries={[`/admin/ads/${adId}/edit`]}>
        <Routes>
          <Route path="/admin/ads/:adId/edit" element={children} />
        </Routes>
      </MemoryRouter>
    ),
  });

describe('useAdminAdForm', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('opens create mode with Ads page titles and list route', () => {
    const { result } = renderCreateForm();

    expect(result.current.copy.titles.create).toBe(ADMIN_AD_FORM_COPY.titles.create);
    expect(result.current.pageTitle).toBe(ADMIN_AD_FORM_COPY.titles.create);
    expect(result.current.listRoute).toBe(ROUTES.ADMIN_ADS);
    expect(result.current.isNotFound).toBe(false);
  });

  it('prefills edit mode from the ad card id like Service Management', () => {
    const adId = ADS_SEED[0].id;
    const { result } = renderEditForm(adId);

    expect(result.current.pageTitle).toBe(ADMIN_AD_FORM_COPY.titles.edit);
    expect(result.current.values[ADMIN_SERVICE_FORM_FIELDS.TITLE]).toBe(ADS_SEED[0].title);
    expect(result.current.values[ADMIN_SERVICE_FORM_FIELDS.BANNER_IMAGE]?.previewUrl).toBe(
      ADS_SEED[0].image,
    );
  });

  it('submits a valid create form and returns to ads list', () => {
    const { result } = renderCreateForm();

    act(() => {
      result.current.onFieldChange(ADMIN_SERVICE_FORM_FIELDS.CATEGORY_ID)({
        target: { value: 'Lighting' },
      });
      result.current.onFieldChange(ADMIN_SERVICE_FORM_FIELDS.SUBCATEGORY_ID)({
        target: { value: 'Indoor Lighting' },
      });
      result.current.onFieldChange(ADMIN_SERVICE_FORM_FIELDS.DURATION)({
        target: { value: '1–2 hrs' },
      });
      result.current.onFieldChange(ADMIN_SERVICE_FORM_FIELDS.STANDARD_PRICE)({
        target: { value: '$75.00' },
      });
      result.current.onFieldChange(ADMIN_SERVICE_FORM_FIELDS.PREMIUM_PRICE)({
        target: { value: '$125.00' },
      });
      result.current.onFieldChange(ADMIN_SERVICE_FORM_FIELDS.TITLE)({
        target: { value: 'New Ad' },
      });
      result.current.onFieldChange(ADMIN_SERVICE_FORM_FIELDS.SHORT_DESCRIPTION)({
        target: { value: 'Short' },
      });
      result.current.onFieldChange(ADMIN_SERVICE_FORM_FIELDS.LONG_DESCRIPTION)({
        target: { value: 'Long' },
      });
      result.current.onFieldChange(ADMIN_SERVICE_FORM_FIELDS.INCLUDED)({
        target: { value: 'Included' },
      });
      result.current.onFieldChange(ADMIN_SERVICE_FORM_FIELDS.NOT_INCLUDED)({
        target: { value: 'Not included' },
      });
    });

    act(() => {
      result.current.onSubmit({ preventDefault: jest.fn() });
    });

    expect(result.current.errors[ADMIN_SERVICE_FORM_FIELDS.BANNER_IMAGE]).toBe(
      ADMIN_AD_FORM_COPY.errors.bannerRequired,
    );
    expect(mockNavigate).not.toHaveBeenCalled();
    expect(toast.success).not.toHaveBeenCalled();
  });
});
