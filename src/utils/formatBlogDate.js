const DATE_LOCALE = 'en-US';

const DATE_FORMAT_OPTIONS = {
  day: 'numeric',
  month: 'long',
  year: 'numeric',
  timeZone: 'UTC',
};

const formatBlogDate = (isoDate) =>
  new Intl.DateTimeFormat(DATE_LOCALE, DATE_FORMAT_OPTIONS).format(new Date(isoDate));

export default formatBlogDate;
