import {
  ADMIN_SERVICE_FORM_BANNER_MAX_FILES,
  ADMIN_SERVICE_FORM_EMPTY_VALUES,
  ADMIN_SERVICE_FORM_FIELDS,
  ADMIN_SERVICE_FORM_MODE,
  getAdminServiceFormSubcategoryOptions,
} from '../adminServiceFormData';
import {
  assertBannerFileLimit,
  createAdminServiceFormValues,
  createBannerImageFromFile,
  formatPriceInputValue,
  getAdminServiceFormDetailsById,
  parsePriceInputValue,
  resolveAdminServiceFormMode,
  validateAdminServiceForm,
} from '../adminServiceFormUtils';
import { SERVICES_SEED } from '../../services/servicesData';

describe('adminServiceFormUtils', () => {
  beforeAll(() => {
    global.URL.createObjectURL = jest.fn(() => 'blob:mock-url');
    global.URL.revokeObjectURL = jest.fn();
  });

  afterAll(() => {
    delete global.URL.createObjectURL;
    delete global.URL.revokeObjectURL;
  });
  it('resolves create and edit modes from service id', () => {
    expect(resolveAdminServiceFormMode(undefined)).toBe(ADMIN_SERVICE_FORM_MODE.CREATE);
    expect(resolveAdminServiceFormMode('svc-1')).toBe(ADMIN_SERVICE_FORM_MODE.EDIT);
  });

  it('formats and parses price input values', () => {
    expect(formatPriceInputValue(200)).toBe('$200.00');
    expect(parsePriceInputValue('$200.00')).toBe(200);
    expect(parsePriceInputValue('')).toBeNaN();
  });

  it('builds empty values for create and prefills edit from catalog details', () => {
    const service = SERVICES_SEED.find((item) => item.catalogTitle === 'Lighting');
    const details = getAdminServiceFormDetailsById(service.id);
    const values = createAdminServiceFormValues(details);

    expect(createAdminServiceFormValues(null)).toEqual(ADMIN_SERVICE_FORM_EMPTY_VALUES);
    expect(values[ADMIN_SERVICE_FORM_FIELDS.CATEGORY_ID]).toBe(service.catalogTitle);
    expect(values[ADMIN_SERVICE_FORM_FIELDS.SUBCATEGORY_ID]).toBe(service.category);
    expect(values[ADMIN_SERVICE_FORM_FIELDS.TITLE]).toBe(service.title);
    expect(values[ADMIN_SERVICE_FORM_FIELDS.STANDARD_PRICE]).toMatch(/^\$/);
    expect(values[ADMIN_SERVICE_FORM_FIELDS.INCLUDED].length).toBeGreaterThan(0);
  });

  it('filters subcategory options by selected category', () => {
    const options = getAdminServiceFormSubcategoryOptions('Lighting');

    expect(options.length).toBeGreaterThan(0);
    expect(options.every((option) => option.categoryId === 'Lighting')).toBe(true);
  });

  it('validates required fields and banner limits', () => {
    const errors = validateAdminServiceForm(ADMIN_SERVICE_FORM_EMPTY_VALUES, {
      requireBanner: true,
    });

    expect(errors[ADMIN_SERVICE_FORM_FIELDS.CATEGORY_ID]).toBeTruthy();
    expect(errors[ADMIN_SERVICE_FORM_FIELDS.TITLE]).toBeTruthy();
    expect(errors[ADMIN_SERVICE_FORM_FIELDS.BANNER_IMAGE]).toBeTruthy();
    expect(assertBannerFileLimit([{ name: 'a' }, { name: 'b' }])).toBeTruthy();
    expect(assertBannerFileLimit([{ name: 'a' }])).toBeNull();
    expect(ADMIN_SERVICE_FORM_BANNER_MAX_FILES).toBe(1);
  });

  it('creates a banner preview object from a file', () => {
    const file = new File(['banner'], 'banner.png', { type: 'image/png' });
    const banner = createBannerImageFromFile(file);

    expect(banner.name).toBe('banner.png');
    expect(banner.previewUrl).toBe('blob:mock-url');
    expect(banner.isExisting).toBe(false);
  });
});
