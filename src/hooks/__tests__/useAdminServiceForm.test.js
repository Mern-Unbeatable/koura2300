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
import { ROUTES } from '../../config';
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
        </Routes>
      </MemoryRouter>
    ),
  });

describe('useAdminServiceForm', () => {
  beforeEach(() => {
    jest.clearAllMocks();
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
    expect(
      result.current.values[ADMIN_SERVICE_FORM_FIELDS.ADDITIONAL_FEATURES][0][
        ADMIN_SERVICE_FORM_FEATURE_KEYS.NAME
      ],
    ).toBe('24 Inch');
    expect(
      result.current.values[ADMIN_SERVICE_FORM_FIELDS.SIZES][0][ADMIN_SERVICE_FORM_SIZE_KEYS.SIZE],
    ).toBe('36 Inch');
    expect(
      result.current.values[ADMIN_SERVICE_FORM_FIELDS.OPTIONS][0][
        ADMIN_SERVICE_FORM_OPTION_KEYS.NAME
      ],
    ).toBe('Option A');
  });

  it('validates before upload and toasts on success without long description', async () => {
    const { result } = renderFormHook(ROUTES.ADMIN_SERVICE_NEW);

    act(() => {
      result.current.onSubmit({ preventDefault: jest.fn() });
    });

    expect(result.current.errors[ADMIN_SERVICE_FORM_FIELDS.TITLE]).toBeTruthy();
    expect(toast.success).not.toHaveBeenCalled();

    act(() => {
      result.current.onFieldChange(ADMIN_SERVICE_FORM_FIELDS.CATEGORY_ID)({
        target: { value: 'Lighting' },
      });
      result.current.onFieldChange(ADMIN_SERVICE_FORM_FIELDS.SUBCATEGORY_ID)({
        target: { value: 'Indoor Lighting' },
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
        target: { value: 'Test Service' },
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
    });

    await act(async () => {
      await result.current.onBannerFilesSelected([
        new File(['banner'], 'banner.png', { type: 'image/png' }),
      ]);
    });

    act(() => {
      result.current.onSubmit({ preventDefault: jest.fn() });
    });

    expect(result.current.errors[ADMIN_SERVICE_FORM_FIELDS.LONG_DESCRIPTION]).toBeUndefined();
    expect(toast.success).toHaveBeenCalledWith(ADMIN_SERVICE_FORM_COPY.toasts.created);
  });
});
