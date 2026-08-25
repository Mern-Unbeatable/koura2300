import { useCallback, useEffect, useMemo, useState } from 'react';
import { SERVICES_EDIT_COPY } from './servicesEditCopy';
import {
  buildServiceUpdatesFromForm,
  createServicesEditFormValues,
  getEditSubcategoryOptions,
  SERVICES_EDIT_CATEGORY_OPTIONS,
  validateServicesEditForm,
} from './servicesEditUtils';

const useServicesEditForm = ({ service, onSave }) => {
  const [formValues, setFormValues] = useState(() =>
    createServicesEditFormValues(service),
  );
  const [errors, setErrors] = useState({});
  const [objectUrl, setObjectUrl] = useState(null);

  useEffect(() => {
    setFormValues(createServicesEditFormValues(service));
    setErrors({});
  }, [service]);

  useEffect(
    () => () => {
      if (objectUrl) {
        URL.revokeObjectURL(objectUrl);
      }
    },
    [objectUrl],
  );

  const subcategoryOptions = useMemo(
    () => getEditSubcategoryOptions(formValues.categoryId),
    [formValues.categoryId],
  );

  const handleFieldChange = useCallback((fieldName) => (event) => {
    const { value } = event.target;

    setFormValues((currentValues) => {
      if (fieldName === 'categoryId') {
        return {
          ...currentValues,
          categoryId: value,
          subcategoryId: '',
        };
      }

      return {
        ...currentValues,
        [fieldName]: value,
      };
    });

    setErrors((currentErrors) => {
      if (!currentErrors[fieldName] && fieldName !== 'categoryId') {
        return currentErrors;
      }

      const nextErrors = { ...currentErrors };
      delete nextErrors[fieldName];
      if (fieldName === 'categoryId') {
        delete nextErrors.subcategoryId;
      }
      return nextErrors;
    });
  }, []);

  const handleImageChange = useCallback((event) => {
    const [file] = event.target.files ?? [];
    if (!file) {
      return;
    }

    const nextObjectUrl = URL.createObjectURL(file);
    setObjectUrl((previousUrl) => {
      if (previousUrl) {
        URL.revokeObjectURL(previousUrl);
      }
      return nextObjectUrl;
    });

    setFormValues((currentValues) => ({
      ...currentValues,
      image: nextObjectUrl,
      imageAlt: file.name || currentValues.imageAlt || currentValues.title,
    }));
  }, []);

  const handleSubmit = useCallback(
    (event) => {
      event.preventDefault();
      const validationErrors = validateServicesEditForm(formValues);

      if (Object.keys(validationErrors).length > 0) {
        setErrors(validationErrors);
        return;
      }

      onSave(buildServiceUpdatesFromForm(formValues));
    },
    [formValues, onSave],
  );

  return {
    copy: SERVICES_EDIT_COPY,
    formValues,
    errors,
    categoryOptions: SERVICES_EDIT_CATEGORY_OPTIONS,
    subcategoryOptions,
    onFieldChange: handleFieldChange,
    onImageChange: handleImageChange,
    onSubmit: handleSubmit,
  };
};

export default useServicesEditForm;
