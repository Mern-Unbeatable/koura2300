import { useCallback, useMemo, useState } from 'react';

const normalizeSearchValue = (value) => value.trim().toLocaleLowerCase();

const matchesServiceQuery = (service, query) => {
  if (!query) {
    return true;
  }

  const searchableText = [
    service.title,
    service.description,
    service.category,
  ]
    .join(' ')
    .toLocaleLowerCase();

  return searchableText.includes(query);
};

const useLandingSearch = (services) => {
  const [searchValue, setSearchValue] = useState('');
  const [submittedQuery, setSubmittedQuery] = useState('');

  const filteredServices = useMemo(
    () => services.filter((service) => matchesServiceQuery(service, submittedQuery)),
    [services, submittedQuery],
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
