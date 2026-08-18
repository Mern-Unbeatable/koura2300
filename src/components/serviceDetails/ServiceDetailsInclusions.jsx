import React, { memo } from 'react';
import { Check, X } from 'lucide-react';
import { SERVICE_DETAILS_CONTENT } from './serviceDetailsCopy';
import {
  EXCLUDED_ICON_CLASS,
  INCLUDED_ICON_CLASS,
  INCLUSION_CHECK_ICON_SIZE,
  INCLUSION_EXCLUDED_BADGE_CLASS,
  INCLUSION_HEADING_CLASS,
  INCLUSION_INCLUDED_BADGE_CLASS,
  INCLUSION_ITEM_CLASS,
  INCLUSION_LIST_CARD_CLASS,
  INCLUSION_LIST_CLASS,
} from './serviceDetailsData';

const INCLUSION_KIND = {
  INCLUDED: 'included',
  EXCLUDED: 'excluded',
};

const INCLUSION_APPEARANCE = {
  [INCLUSION_KIND.INCLUDED]: {
    badgeClassName: INCLUSION_INCLUDED_BADGE_CLASS,
    iconClassName: INCLUDED_ICON_CLASS,
    Icon: Check,
  },
  [INCLUSION_KIND.EXCLUDED]: {
    badgeClassName: INCLUSION_EXCLUDED_BADGE_CLASS,
    iconClassName: EXCLUDED_ICON_CLASS,
    Icon: X,
  },
};

const InclusionItem = memo(({ item, kind }) => {
  const appearance = INCLUSION_APPEARANCE[kind];
  const ItemIcon = appearance.Icon;

  return (
    <li className={INCLUSION_ITEM_CLASS}>
      <span className={appearance.badgeClassName} aria-hidden="true">
        <ItemIcon size={INCLUSION_CHECK_ICON_SIZE} className={appearance.iconClassName} />
      </span>
      {item}
    </li>
  );
});

InclusionItem.displayName = 'InclusionItem';

const InclusionList = memo(({ title, items, kind }) => (
  <section className="h-full">
    <h2 className={INCLUSION_HEADING_CLASS}>{title}</h2>
    <ul className={`${INCLUSION_LIST_CARD_CLASS} ${INCLUSION_LIST_CLASS}`}>
      {items.map((item) => (
        <InclusionItem key={item} item={item} kind={kind} />
      ))}
    </ul>
  </section>
));

InclusionList.displayName = 'InclusionList';

const ServiceDetailsInclusions = memo(({ includedItems, excludedItems }) => (
  <div className="mt-16 flex flex-col gap-6">
    <InclusionList
      title={SERVICE_DETAILS_CONTENT.inclusions.includedTitle}
      items={includedItems}
      kind={INCLUSION_KIND.INCLUDED}
    />
    <InclusionList
      title={SERVICE_DETAILS_CONTENT.inclusions.excludedTitle}
      items={excludedItems}
      kind={INCLUSION_KIND.EXCLUDED}
    />
  </div>
));

ServiceDetailsInclusions.displayName = 'ServiceDetailsInclusions';

export default ServiceDetailsInclusions;
