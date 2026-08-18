import React, { memo } from 'react';
import { Link } from 'react-router-dom';
import { ROUTES } from '../../config';
import { SERVICE_DETAILS_CONTENT } from './serviceDetailsCopy';
import { BREADCRUMB_SEPARATOR } from './serviceDetailsData';

const { breadcrumb } = SERVICE_DETAILS_CONTENT;

const ServiceDetailsBreadcrumb = memo(({ catalogTitle, catalogPath, serviceTitle }) => (
  <nav aria-label={breadcrumb.label} className="text-sm text-gray-500">
    <ol className="flex flex-wrap items-center gap-2">
      <li>
        <Link
          to={ROUTES.HOME}
          className="transition-colors hover:text-brand-orange focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-orange"
        >
          {breadcrumb.home}
        </Link>
      </li>
      <li aria-hidden="true">{BREADCRUMB_SEPARATOR}</li>
      <li>
        <Link
          to={catalogPath}
          className="transition-colors hover:text-brand-orange focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-orange"
        >
          {catalogTitle}
        </Link>
      </li>
      <li aria-hidden="true">{BREADCRUMB_SEPARATOR}</li>
      <li className="text-brand-ink" aria-current="page">
        {serviceTitle}
      </li>
    </ol>
  </nav>
));

ServiceDetailsBreadcrumb.displayName = 'ServiceDetailsBreadcrumb';

export default ServiceDetailsBreadcrumb;
