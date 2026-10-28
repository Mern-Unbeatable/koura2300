import {
  ADMIN_SERVICE_FORM_BANNER_MAX_FILES,
  ADMIN_SERVICE_FORM_EMPTY_VALUES,
  ADMIN_SERVICE_FORM_FIELDS,
  ADMIN_SERVICE_FORM_FEATURE_KEYS,
  ADMIN_SERVICE_FORM_MODE,
  ADMIN_SERVICE_FORM_OPTION_KEYS,
  ADMIN_SERVICE_FORM_SIZE_KEYS,
  createEmptyAdditionalFeatureRow,
  createEmptyAdminServiceFormValues,
  createEmptyOptionRow,
  createEmptySizeRow,
  createEmptyTextLineRow,
  getAdminServiceFormSubcategoryOptions,
} from '../adminServiceFormData';
import {
  appendAdminServiceFormRow,
  assertBannerFileLimit,
  createAdminServiceFormValues,
  createBannerImageFromFile,
  formatPriceInputValue,
  getAdminServiceFormDetailsById,
  isAdditionalFeatureSectionInUse,
  isOptionsSectionInUse,
  isSizesSectionInUse,
  parsePriceInputValue,
  reconcileExclusiveCatalogSections,
  removeAdminServiceFormRow,
  resolveAdminServiceFormMode,
  updateAdminServiceFormRowField,
  validateAdminServiceForm,
} from '../adminServiceFormUtils';
import { SERVICES_SEED } from '../../services/servicesData';

describe('adminServiceFormUtils', () => {
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
    const emptyValues = createEmptyAdminServiceFormValues();

    expect(createAdminServiceFormValues(null)).toEqual(emptyValues);
    expect(emptyValues[ADMIN_SERVICE_FORM_FIELDS.ADDITIONAL_FEATURES]).toHaveLength(1);
    expect(emptyValues[ADMIN_SERVICE_FORM_FIELDS.SIZES]).toHaveLength(1);
    expect(emptyValues[ADMIN_SERVICE_FORM_FIELDS.OPTIONS]).toHaveLength(1);
    expect(emptyValues[ADMIN_SERVICE_FORM_FIELDS.ADDITIONAL_FEATURES]).not.toBe(
      ADMIN_SERVICE_FORM_EMPTY_VALUES[ADMIN_SERVICE_FORM_FIELDS.ADDITIONAL_FEATURES],
    );
    expect(values[ADMIN_SERVICE_FORM_FIELDS.CATEGORY_ID]).toBe(service.catalogTitle);
    expect(values[ADMIN_SERVICE_FORM_FIELDS.SUBCATEGORY_ID]).toBe(service.category);
    expect(values[ADMIN_SERVICE_FORM_FIELDS.TITLE]).toBe(service.title);
    expect(values[ADMIN_SERVICE_FORM_FIELDS.STANDARD_PRICE]).toMatch(/^\$/);
    expect(Array.isArray(values[ADMIN_SERVICE_FORM_FIELDS.INCLUDED])).toBe(true);
    expect(values[ADMIN_SERVICE_FORM_FIELDS.INCLUDED].length).toBeGreaterThan(0);
    expect(Array.isArray(values[ADMIN_SERVICE_FORM_FIELDS.STANDARD_FEATURED])).toBe(true);
    expect(values[ADMIN_SERVICE_FORM_FIELDS.STANDARD_FEATURED].length).toBeGreaterThan(0);
    expect(values[ADMIN_SERVICE_FORM_FIELDS.ADDITIONAL_FEATURES]).toHaveLength(1);
    expect(values[ADMIN_SERVICE_FORM_FIELDS.SIZES]).toHaveLength(1);
    expect(values[ADMIN_SERVICE_FORM_FIELDS.OPTIONS]).toHaveLength(1);
  });

  it('filters subcategory options by selected category', () => {
    const options = getAdminServiceFormSubcategoryOptions('Lighting');

    expect(options.length).toBeGreaterThan(0);
    expect(options.every((option) => option.categoryId === 'Lighting')).toBe(true);
  });

  it('validates required fields and banner limits without requiring long description', () => {
    const errors = validateAdminServiceForm(ADMIN_SERVICE_FORM_EMPTY_VALUES, {
      requireBanner: true,
    });

    expect(errors[ADMIN_SERVICE_FORM_FIELDS.CATEGORY_ID]).toBeTruthy();
    expect(errors[ADMIN_SERVICE_FORM_FIELDS.TITLE]).toBeTruthy();
    expect(errors[ADMIN_SERVICE_FORM_FIELDS.BANNER_IMAGE]).toBeTruthy();
    expect(errors[ADMIN_SERVICE_FORM_FIELDS.LONG_DESCRIPTION]).toBeUndefined();
    expect(assertBannerFileLimit([{ name: 'a' }, { name: 'b' }])).toBeTruthy();
    expect(assertBannerFileLimit([{ name: 'a' }])).toBeNull();
    expect(ADMIN_SERVICE_FORM_BANNER_MAX_FILES).toBe(1);
  });

  it('removes text-line rows but always keeps at least one', () => {
    const single = [createEmptyTextLineRow('featured-1')];
    const multiple = [
      createEmptyTextLineRow('featured-1'),
      createEmptyTextLineRow('featured-2'),
      createEmptyTextLineRow('featured-3'),
    ];

    expect(removeAdminServiceFormRow(single, 'featured-1')).toHaveLength(1);
    expect(removeAdminServiceFormRow(multiple, 'featured-2')).toEqual([
      createEmptyTextLineRow('featured-1'),
      createEmptyTextLineRow('featured-3'),
    ]);
  });

  it('appends and updates dynamic feature, size, and option rows immutably', () => {
    const featureRows = [createEmptyAdditionalFeatureRow('feature-row-1')];
    const sizeRows = [createEmptySizeRow('size-row-1')];
    const optionRows = [createEmptyOptionRow('option-row-1')];

    const nextFeatures = appendAdminServiceFormRow(
      featureRows,
      createEmptyAdditionalFeatureRow('feature-row-2'),
    );
    const nextSizes = appendAdminServiceFormRow(sizeRows, createEmptySizeRow('size-row-2'));
    const nextOptions = appendAdminServiceFormRow(
      optionRows,
      createEmptyOptionRow('option-row-2'),
    );

    expect(nextFeatures).toHaveLength(2);
    expect(nextSizes).toHaveLength(2);
    expect(nextOptions).toHaveLength(2);
    expect(featureRows).toHaveLength(1);

    const updatedFeature = updateAdminServiceFormRowField(
      nextFeatures,
      'feature-row-1',
      ADMIN_SERVICE_FORM_FEATURE_KEYS.NAME,
      '24 Inch',
    );
    const updatedSize = updateAdminServiceFormRowField(
      nextSizes,
      'size-row-1',
      ADMIN_SERVICE_FORM_SIZE_KEYS.SIZE,
      '36 Inch',
    );
    const updatedOption = updateAdminServiceFormRowField(
      nextOptions,
      'option-row-1',
      ADMIN_SERVICE_FORM_OPTION_KEYS.NAME,
      'Option A',
    );

    expect(updatedFeature[0][ADMIN_SERVICE_FORM_FEATURE_KEYS.NAME]).toBe('24 Inch');
    expect(updatedSize[0][ADMIN_SERVICE_FORM_SIZE_KEYS.SIZE]).toBe('36 Inch');
    expect(updatedOption[0][ADMIN_SERVICE_FORM_OPTION_KEYS.NAME]).toBe('Option A');
    expect(nextFeatures[0][ADMIN_SERVICE_FORM_FEATURE_KEYS.NAME]).toBe('');
  });

  it('creates a banner preview object from a file', async () => {
    const file = new File(['banner'], 'banner.png', { type: 'image/png' });
    const banner = await createBannerImageFromFile(file);

    expect(banner.name).toBe('banner.png');
    expect(banner.previewUrl).toMatch(/^data:image\/png;base64,/);
    expect(banner.isExisting).toBe(false);
  });

  it('detects catalog section use and reconciles exclusivity', () => {
    const emptyFeature = createEmptyAdditionalFeatureRow('feature-row-1');
    const filledFeature = {
      ...emptyFeature,
      [ADMIN_SERVICE_FORM_FEATURE_KEYS.NAME]: '24',
    };
    const emptyOption = createEmptyOptionRow('option-row-1');
    const filledOption = {
      ...emptyOption,
      [ADMIN_SERVICE_FORM_OPTION_KEYS.NAME]: 'Option A',
    };
    const emptySize = createEmptySizeRow('size-row-1');
    const filledSize = {
      ...emptySize,
      [ADMIN_SERVICE_FORM_SIZE_KEYS.SIZE]: '36',
    };

    expect(isAdditionalFeatureSectionInUse([emptyFeature])).toBe(false);
    expect(isAdditionalFeatureSectionInUse([filledFeature])).toBe(true);
    expect(
      isAdditionalFeatureSectionInUse([
        emptyFeature,
        createEmptyAdditionalFeatureRow('feature-row-2'),
      ]),
    ).toBe(true);
    expect(isOptionsSectionInUse([emptyOption])).toBe(false);
    expect(isOptionsSectionInUse([filledOption])).toBe(true);
    expect(isSizesSectionInUse([emptySize])).toBe(false);
    expect(isSizesSectionInUse([filledSize])).toBe(true);

    const reconciledFeatures = reconcileExclusiveCatalogSections({
      ...createEmptyAdminServiceFormValues(),
      [ADMIN_SERVICE_FORM_FIELDS.ADDITIONAL_FEATURES]: [filledFeature],
      [ADMIN_SERVICE_FORM_FIELDS.OPTIONS]: [filledOption],
    });

    expect(reconciledFeatures[ADMIN_SERVICE_FORM_FIELDS.ADDITIONAL_FEATURES][0].name).toBe('24');
    expect(reconciledFeatures[ADMIN_SERVICE_FORM_FIELDS.OPTIONS][0].name).toBe('');

    const reconciledSizes = reconcileExclusiveCatalogSections({
      ...createEmptyAdminServiceFormValues(),
      [ADMIN_SERVICE_FORM_FIELDS.SIZES]: [filledSize],
      [ADMIN_SERVICE_FORM_FIELDS.OPTIONS]: [filledOption],
    });

    expect(reconciledSizes[ADMIN_SERVICE_FORM_FIELDS.SIZES][0].size).toBe('36');
    expect(reconciledSizes[ADMIN_SERVICE_FORM_FIELDS.OPTIONS][0].name).toBe('');
  });
});
