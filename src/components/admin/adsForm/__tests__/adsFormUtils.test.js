import { ADMIN_AD_FORM_COPY } from '../adsFormCopy';
import {
  getAdminAdFormTitle,
  resolveAdminAdFormMode,
  validateAdminAdForm,
} from '../adsFormUtils';
import {
  ADMIN_SERVICE_FORM_EMPTY_VALUES,
  ADMIN_SERVICE_FORM_FIELDS,
  ADMIN_SERVICE_FORM_MODE,
} from '../../serviceForm/adminServiceFormData';

describe('adsFormUtils', () => {
  it('resolves create and edit modes', () => {
    expect(resolveAdminAdFormMode(undefined)).toBe(ADMIN_SERVICE_FORM_MODE.CREATE);
    expect(resolveAdminAdFormMode('ad-1')).toBe(ADMIN_SERVICE_FORM_MODE.EDIT);
    expect(getAdminAdFormTitle(ADMIN_SERVICE_FORM_MODE.CREATE)).toBe(
      ADMIN_AD_FORM_COPY.titles.create,
    );
    expect(getAdminAdFormTitle(ADMIN_SERVICE_FORM_MODE.EDIT)).toBe(
      ADMIN_AD_FORM_COPY.titles.edit,
    );
  });

  it('validates with Ads-specific error copy', () => {
    const errors = validateAdminAdForm(
      { ...ADMIN_SERVICE_FORM_EMPTY_VALUES },
      { requireBanner: true },
    );

    expect(errors[ADMIN_SERVICE_FORM_FIELDS.DURATION]).toBe(
      ADMIN_AD_FORM_COPY.errors.durationRequired,
    );
    expect(errors[ADMIN_SERVICE_FORM_FIELDS.BANNER_IMAGE]).toBe(
      ADMIN_AD_FORM_COPY.errors.bannerRequired,
    );
  });
});
