import { act, renderHook } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import toast from 'react-hot-toast';
import { ADMIN_SERVICE_FORM_COPY } from '../../components/admin/serviceForm/adminServiceFormCopy';
import {
  ADMIN_SERVICE_FORM_FEATURE_KEYS,
  ADMIN_SERVICE_FORM_FIELDS,
  ADMIN_SERVICE_FORM_MODE,
  ADMIN_SERVICE_FORM_OPTION_KEYS,
  ADMIN_SERVICE_FORM_SIZE_KEYS,
} from '../../components/admin/serviceForm/adminServiceFormData';
import { SERVICES_SEED } from '../../components/admin/services/servicesData';
import { getCatalogServiceDetails } from '../../components/serviceDetails/serviceDetailsData';
import { ROUTES } from '../../config';
import {
  clearPostedServices,
  listPostedServices,
} from '../../services/postedServicesStore';
import useAdminServiceForm from '../useAdminServiceForm';

jest.mock('react-hot-toast', () => ({
  __esModule: true,
  default: {
    success: jest.fn(),
  },
}));

const renderFormHook = (initialPath) =>
  renderHook(() => useAdminServiceForm(), {
    wrapper: ({ children }) => (
      <MemoryRouter initialEntries={[initialPath]}>
        <Routes>
          <Route path={ROUTES.ADMIN_SERVICE_NEW} element={children} />
          <Route path={ROUTES.ADMIN_SERVICE_EDIT} element={children} />
          <Route path={ROUTES.ADMIN_SERVICES} element={<div>services</div>} />
          <Route path={ROUTES.SERVICE_DETAILS} element={<div>service-details</div>} />
        </Routes>
      </MemoryRouter>
    ),
  });

describe('useAdminServiceForm', () => {
  beforeEach(async () => {
    jest.clearAllMocks();
    await clearPostedServices();
    global.URL.createObjectURL = jest.fn(() => 'blob:mock-url');
    global.URL.revokeObjectURL = jest.fn();
  });

  it('starts in create mode on the new route', () => {
    const { result } = renderFormHook(ROUTES.ADMIN_SERVICE_NEW);

    expect(result.current.mode).toBe(ADMIN_SERVICE_FORM_MODE.CREATE);
    expect(result.current.pageTitle).toBe(ADMIN_SERVICE_FORM_COPY.titles.create);
    expect(result.current.isNotFound).toBe(false);
    expect(result.current.values[ADMIN_SERVICE_FORM_FIELDS.TITLE]).toBe('');
    expect(result.current.values[ADMIN_SERVICE_FORM_FIELDS.ADDITIONAL_FEATURES]).toHaveLength(1);
    expect(result.current.values[ADMIN_SERVICE_FORM_FIELDS.SIZES]).toHaveLength(1);
    expect(result.current.values[ADMIN_SERVICE_FORM_FIELDS.OPTIONS]).toHaveLength(1);
  });

  it('prefills edit mode from catalog service details', () => {
    const service = SERVICES_SEED.find((item) => item.catalogTitle === 'Lighting');
    const { result } = renderFormHook(`/admin/services/${service.id}/edit`);

    expect(result.current.mode).toBe(ADMIN_SERVICE_FORM_MODE.EDIT);
    expect(result.current.pageTitle).toBe(ADMIN_SERVICE_FORM_COPY.titles.edit);
    expect(result.current.values[ADMIN_SERVICE_FORM_FIELDS.TITLE]).toBe(service.title);
    expect(result.current.values[ADMIN_SERVICE_FORM_FIELDS.CATEGORY_ID]).toBe(
      service.catalogTitle,
    );
  });

  it('marks missing edit targets as not found', () => {
    const { result } = renderFormHook('/admin/services/missing-service/edit');

    expect(result.current.isNotFound).toBe(true);
  });

  it('appends and updates Additional Feature, Sizes, and Options rows', () => {
    const { result } = renderFormHook(ROUTES.ADMIN_SERVICE_NEW);
    const firstFeatureId =
      result.current.values[ADMIN_SERVICE_FORM_FIELDS.ADDITIONAL_FEATURES][0].id;
    const firstSizeId = result.current.values[ADMIN_SERVICE_FORM_FIELDS.SIZES][0].id;
    const firstOptionId = result.current.values[ADMIN_SERVICE_FORM_FIELDS.OPTIONS][0].id;

    act(() => {
      result.current.onAdditionalFeatureChange(
        firstFeatureId,
        ADMIN_SERVICE_FORM_FEATURE_KEYS.NAME,
      )({
        target: { value: '24 Inch' },
      });
      result.current.onSizeChange(firstSizeId, ADMIN_SERVICE_FORM_SIZE_KEYS.SIZE)({
        target: { value: '36 Inch' },
      });
      result.current.onOptionChange(firstOptionId, ADMIN_SERVICE_FORM_OPTION_KEYS.NAME)({
        target: { value: 'Option A' },
      });
      result.current.onAddAdditionalFeature();
      result.current.onAddSize();
      result.current.onAddOption();
    });

    expect(result.current.values[ADMIN_SERVICE_FORM_FIELDS.ADDITIONAL_FEATURES]).toHaveLength(2);
    expect(result.current.values[ADMIN_SERVICE_FORM_FIELDS.SIZES]).toHaveLength(2);
    expect(result.current.values[ADMIN_SERVICE_FORM_FIELDS.OPTIONS]).toHaveLength(2);
  });

  it('persists posted JSON and opens Service Details after a valid upload', async () => {
    const { result } = renderFormHook(ROUTES.ADMIN_SERVICE_NEW);
    const featureId = result.current.values[ADMIN_SERVICE_FORM_FIELDS.ADDITIONAL_FEATURES][0].id;

    act(() => {
      result.current.onFieldChange(ADMIN_SERVICE_FORM_FIELDS.CATEGORY_ID)({
        target: { value: 'Bathroom' },
      });
      result.current.onFieldChange(ADMIN_SERVICE_FORM_FIELDS.SUBCATEGORY_ID)({
        target: { value: 'Vanity Services' },
      });
      result.current.onFieldChange(ADMIN_SERVICE_FORM_FIELDS.DURATION)({
        target: { value: '1-2 hrs' },
      });
      result.current.onFieldChange(ADMIN_SERVICE_FORM_FIELDS.STANDARD_PRICE)({
        target: { value: '$200.00' },
      });
      result.current.onFieldChange(ADMIN_SERVICE_FORM_FIELDS.PREMIUM_PRICE)({
        target: { value: '$250.00' },
      });
      result.current.onFieldChange(ADMIN_SERVICE_FORM_FIELDS.TITLE)({
        target: { value: 'Posted Vanity Handles' },
      });
      result.current.onFieldChange(ADMIN_SERVICE_FORM_FIELDS.SHORT_DESCRIPTION)({
        target: { value: 'Short' },
      });
      result.current.onFieldChange(ADMIN_SERVICE_FORM_FIELDS.INCLUDED)({
        target: { value: 'Included' },
      });
      result.current.onFieldChange(ADMIN_SERVICE_FORM_FIELDS.NOT_INCLUDED)({
        target: { value: 'Excluded' },
      });
      result.current.onAdditionalFeatureChange(
        featureId,
        ADMIN_SERVICE_FORM_FEATURE_KEYS.NAME,
      )({
        target: { value: 'Handles' },
      });
      result.current.onAdditionalFeatureChange(
        featureId,
        ADMIN_SERVICE_FORM_FEATURE_KEYS.QUANTITY,
      )({
        target: { value: '2' },
      });
      result.current.onAdditionalFeatureChange(
        featureId,
        ADMIN_SERVICE_FORM_FEATURE_KEYS.STANDARD_PRICE,
      )({
        target: { value: '25%' },
      });
      result.current.onAdditionalFeatureChange(
        featureId,
        ADMIN_SERVICE_FORM_FEATURE_KEYS.NOTE_1,
      )({
        target: { value: 'First 2 included' },
      });
    });

    await act(async () => {
      await result.current.onBannerFilesSelected([
        new File(['banner'], 'banner.png', { type: 'image/png' }),
      ]);
    });

    await act(async () => {
      await result.current.onSubmit({ preventDefault: jest.fn() });
    });

    expect(toast.success).toHaveBeenCalledWith(ADMIN_SERVICE_FORM_COPY.toasts.created);
    expect(listPostedServices()).toHaveLength(1);

    const posted = listPostedServices()[0];
    const details = getCatalogServiceDetails(posted.id);

    expect(details.service.title).toBe('Posted Vanity Handles');
    expect(details.service.image).toMatch(/^data:image\/png;base64,/);
    expect(details.galleryImages[0]).toBe(details.service.image);
    expect(details.additionalFeatures[0].name).toBe('Handles');
    expect(details.additionalFeatures[0].note1).toBe('First 2 included');
  });
});
