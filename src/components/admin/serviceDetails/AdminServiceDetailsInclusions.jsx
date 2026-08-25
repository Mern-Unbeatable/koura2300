import { memo } from 'react';
import { Check, CircleAlert } from 'lucide-react';
import {
  ADMIN_SERVICE_DETAILS_EXCLUDED_BADGE_CLASS,
  ADMIN_SERVICE_DETAILS_INCLUDED_BADGE_CLASS,
  ADMIN_SERVICE_DETAILS_INCLUSION_ALERT_SIZE,
  ADMIN_SERVICE_DETAILS_INCLUSION_CARD_CLASS,
  ADMIN_SERVICE_DETAILS_INCLUSION_CHECK_SIZE,
  ADMIN_SERVICE_DETAILS_INCLUSION_HEADING_CLASS,
  ADMIN_SERVICE_DETAILS_INCLUSION_ITEM_CLASS,
  ADMIN_SERVICE_DETAILS_INCLUSION_LIST_CLASS,
  ADMIN_SERVICE_DETAILS_INCLUSION_SECTION_CLASS,
} from './adminServiceDetailsData';

const INCLUSION_KIND = {
  INCLUDED: 'included',
  EXCLUDED: 'excluded',
};

const INCLUSION_APPEARANCE = {
  [INCLUSION_KIND.INCLUDED]: {
    badgeClassName: ADMIN_SERVICE_DETAILS_INCLUDED_BADGE_CLASS,
    iconClassName: 'text-brand-orange',
    Icon: Check,
    iconSize: ADMIN_SERVICE_DETAILS_INCLUSION_CHECK_SIZE,
  },
  [INCLUSION_KIND.EXCLUDED]: {
    badgeClassName: ADMIN_SERVICE_DETAILS_EXCLUDED_BADGE_CLASS,
    iconClassName: 'text-[#ef4444]',
    Icon: CircleAlert,
    iconSize: ADMIN_SERVICE_DETAILS_INCLUSION_ALERT_SIZE,
  },
};

const InclusionItem = memo(({ item, kind }) => {
  const appearance = INCLUSION_APPEARANCE[kind];
  const ItemIcon = appearance.Icon;

  return (
    <li className={ADMIN_SERVICE_DETAILS_INCLUSION_ITEM_CLASS}>
      <span className={appearance.badgeClassName} aria-hidden="true">
        <ItemIcon size={appearance.iconSize} className={appearance.iconClassName} />
      </span>
      {item}
    </li>
  );
});

InclusionItem.displayName = 'InclusionItem';

const InclusionList = memo(({ title, items, kind }) => (
  <section className="min-w-0">
    <h2 className={ADMIN_SERVICE_DETAILS_INCLUSION_HEADING_CLASS}>{title}</h2>
    <ul
      className={`${ADMIN_SERVICE_DETAILS_INCLUSION_CARD_CLASS} ${ADMIN_SERVICE_DETAILS_INCLUSION_LIST_CLASS} mt-6`}
    >
      {items.map((item) => (
        <InclusionItem key={item} item={item} kind={kind} />
      ))}
    </ul>
  </section>
));

InclusionList.displayName = 'InclusionList';

const AdminServiceDetailsInclusions = memo(({ copy, includedItems, excludedItems }) => (
  <div className={ADMIN_SERVICE_DETAILS_INCLUSION_SECTION_CLASS}>
    <InclusionList
      title={copy.inclusions.includedTitle}
      items={includedItems}
      kind={INCLUSION_KIND.INCLUDED}
    />
    <InclusionList
      title={copy.inclusions.excludedTitle}
      items={excludedItems}
      kind={INCLUSION_KIND.EXCLUDED}
    />
  </div>
));

AdminServiceDetailsInclusions.displayName = 'AdminServiceDetailsInclusions';

export default AdminServiceDetailsInclusions;
