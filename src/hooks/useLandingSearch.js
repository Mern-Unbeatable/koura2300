import { useCallback, useMemo, useState } from 'react';

const normalizeSearchValue = (value) => value.trim().toLocaleLowerCase();

const matchesServiceQuery = (service, query, translate) => {
  if (!query) {
    return true;
  }

  const searchableText = [
    translate(service.titleKey),
    translate(service.descriptionKey),
    translate(service.categoryKey),
  ]
    .join(' ')
    .toLocaleLowerCase();

  return searchableText.includes(query);
};

const useLandingSearch = (services, translate) => {
  const [searchValue, setSearchValue] = useState('');
  const [submittedQuery, setSubmittedQuery] = useState('');

  const filteredServices = useMemo(
    () => services.filter((service) => matchesServiceQuery(service, submittedQuery, translate)),
    [services, submittedQuery, translate],
  );

  const handleSearchChange = useCallback((event) => {
    setSearchValue(event.target.value);
  }, []);

  const handleSearchSubmit = useCallback(
    (event) => {
      event.preventDefault();
      setSubmittedQuery(normalizeSearchValue(searchValue));
    },
    [searchValue],
  );

  return {
    filteredServices,
    searchValue,
    handleSearchChange,
    handleSearchSubmit,
  };
};

export default useLandingSearch;
