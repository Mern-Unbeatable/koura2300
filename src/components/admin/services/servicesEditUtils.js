import {
  SERVICES_ALL_FILTER_ID,
  SERVICES_CATEGORY_OPTIONS,
  SERVICES_SUBCATEGORY_OPTIONS,
} from './servicesData';
import { SERVICES_EDIT_COPY } from './servicesEditCopy';

export const SERVICES_EDIT_CATEGORY_OPTIONS = SERVICES_CATEGORY_OPTIONS.filter(
  (option) => option.id !== SERVICES_ALL_FILTER_ID,
);

export const getEditSubcategoryOptions = (categoryId) =>
  SERVICES_SUBCATEGORY_OPTIONS.filter(
    (option) =>
      option.id !== SERVICES_ALL_FILTER_ID &&
      (!categoryId || option.categoryId === categoryId),
  );

export const createServicesEditFormValues = (service) => ({
  categoryId: service?.catalogTitle ?? '',
  subcategoryId: service?.category ?? '',
  title: service?.title ?? '',
  description: service?.description ?? '',
  duration: service?.duration ?? '',
  price: service?.price == null ? '' : String(service.price),
  rating: service?.rating ?? '',
  image: service?.image ?? '',
  imageAlt: service?.imageAlt ?? '',
});

export const findServiceById = (services, serviceId) =>
  services.find((service) => service.id === serviceId) ?? null;

export const updateServiceById = (services, serviceId, updates) =>
  services.map((service) =>
    service.id === serviceId
      ? {
          ...service,
          ...updates,
        }
      : service,
  );

export const buildServiceUpdatesFromForm = (formValues) => ({
  catalogTitle: formValues.categoryId.trim(),
  category: formValues.subcategoryId.trim(),
  title: formValues.title.trim(),
  description: formValues.description.trim(),
  duration: formValues.duration.trim(),
  price: Number(formValues.price),
  rating: formValues.rating.trim(),
  image: formValues.image,
  imageAlt: formValues.imageAlt.trim() || formValues.title.trim(),
});

export const validateServicesEditForm = (formValues) => {
  const errors = {};

  if (!String(formValues.categoryId ?? '').trim()) {
    errors.categoryId = SERVICES_EDIT_COPY.errors.categoryRequired;
  }

  if (!String(formValues.subcategoryId ?? '').trim()) {
    errors.subcategoryId = SERVICES_EDIT_COPY.errors.subcategoryRequired;
  }

  if (!String(formValues.title ?? '').trim()) {
    errors.title = SERVICES_EDIT_COPY.errors.titleRequired;
  }

  if (!String(formValues.description ?? '').trim()) {
    errors.description = SERVICES_EDIT_COPY.errors.descriptionRequired;
  }

  if (!String(formValues.duration ?? '').trim()) {
    errors.duration = SERVICES_EDIT_COPY.errors.durationRequired;
  }

  const priceText = String(formValues.price ?? '').trim();
  if (!priceText) {
    errors.price = SERVICES_EDIT_COPY.errors.priceRequired;
  } else if (!Number.isFinite(Number(priceText)) || Number(priceText) <= 0) {
    errors.price = SERVICES_EDIT_COPY.errors.priceInvalid;
  }

  return errors;
};
