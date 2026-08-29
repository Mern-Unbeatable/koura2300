import { ADMIN_SERVICE_FORM_MODE } from '../serviceForm/adminServiceFormData';
import {
  assertBannerFileLimit as assertServiceBannerFileLimit,
  createAdminServiceFormValues,
  getAdminServiceFormDetailsById,
  validateAdminServiceForm,
} from '../serviceForm/adminServiceFormUtils';
import { ADMIN_AD_FORM_COPY } from './adsFormCopy';

export const resolveAdminAdFormMode = (adId) =>
  adId ? ADMIN_SERVICE_FORM_MODE.EDIT : ADMIN_SERVICE_FORM_MODE.CREATE;

export const getAdminAdFormTitle = (mode) =>
  mode === ADMIN_SERVICE_FORM_MODE.EDIT
    ? ADMIN_AD_FORM_COPY.titles.edit
    : ADMIN_AD_FORM_COPY.titles.create;

export const getAdminAdFormSeo = (mode) =>
  mode === ADMIN_SERVICE_FORM_MODE.EDIT
    ? ADMIN_AD_FORM_COPY.seo.edit
    : ADMIN_AD_FORM_COPY.seo.create;

export const getAdminAdFormDetailsById = (adId) => getAdminServiceFormDetailsById(adId);

export const createAdminAdFormValues = (details) => createAdminServiceFormValues(details);

export const validateAdminAdForm = (formValues, options) =>
  validateAdminServiceForm(formValues, {
    ...options,
    errorCopy: ADMIN_AD_FORM_COPY.errors,
  });

export const assertAdBannerFileLimit = (files) =>
  assertServiceBannerFileLimit(files, ADMIN_AD_FORM_COPY.errors.bannerTooMany);
