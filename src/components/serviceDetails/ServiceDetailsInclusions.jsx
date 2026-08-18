import React, { memo } from 'react';
import { Check, X } from 'lucide-react';
import { SERVICE_DETAILS_CONTENT } from './serviceDetailsCopy';
import {
  EXCLUDED_ICON_CLASS,
  EXCLUDED_ITEMS,
  INCLUDED_ICON_CLASS,
  INCLUDED_ITEMS,
  LIST_ICON_SIZE,
} from './serviceDetailsData';

const InclusionList = memo(({ title, items, Icon, iconClassName }) => (
  <section>
    <h2 className="text-2xl font-semibold text-brand-ink">{title}</h2>
    <ul className="mt-6 rounded-xl border border-gray-200 bg-white p-8 shadow-sm">
      {items.map((item) => (
        <li key={item} className="flex items-center gap-3 py-2 text-base text-brand-ink">
          <Icon size={LIST_ICON_SIZE} aria-hidden="true" className={`shrink-0 ${iconClassName}`} />
          {item}
        </li>
      ))}
    </ul>
  </section>
));

InclusionList.displayName = 'InclusionList';

const ServiceDetailsInclusions = memo(() => (
  <div className="mt-16 flex flex-col gap-8">
    <InclusionList
      title={SERVICE_DETAILS_CONTENT.inclusions.includedTitle}
      items={INCLUDED_ITEMS}
      Icon={Check}
      iconClassName={INCLUDED_ICON_CLASS}
    />
    <InclusionList
      title={SERVICE_DETAILS_CONTENT.inclusions.excludedTitle}
      items={EXCLUDED_ITEMS}
      Icon={X}
      iconClassName={EXCLUDED_ICON_CLASS}
    />
  </div>
));

ServiceDetailsInclusions.displayName = 'ServiceDetailsInclusions';

export default ServiceDetailsInclusions;
