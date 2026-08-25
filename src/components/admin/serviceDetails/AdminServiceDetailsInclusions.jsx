import { memo } from 'react';
import { Check } from 'lucide-react';
import {
  ADMIN_SERVICE_DETAILS_EXCLUDED_BADGE_CLASS,
  ADMIN_SERVICE_DETAILS_EXCLUDED_MARK,
  ADMIN_SERVICE_DETAILS_EXCLUDED_MARK_CLASS,
  ADMIN_SERVICE_DETAILS_INCLUDED_BADGE_CLASS,
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

const InclusionItem = memo(({ item, kind }) => {
  const isExcluded = kind === INCLUSION_KIND.EXCLUDED;

  return (
    <li className={ADMIN_SERVICE_DETAILS_INCLUSION_ITEM_CLASS}>
      <span
        className={
          isExcluded
            ? ADMIN_SERVICE_DETAILS_EXCLUDED_BADGE_CLASS
            : ADMIN_SERVICE_DETAILS_INCLUDED_BADGE_CLASS
        }
        aria-hidden="true"
      >
        {isExcluded ? (
          <span className={ADMIN_SERVICE_DETAILS_EXCLUDED_MARK_CLASS}>
            {ADMIN_SERVICE_DETAILS_EXCLUDED_MARK}
          </span>
        ) : (
          <Check size={ADMIN_SERVICE_DETAILS_INCLUSION_CHECK_SIZE} className="text-brand-orange" />
        )}
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
