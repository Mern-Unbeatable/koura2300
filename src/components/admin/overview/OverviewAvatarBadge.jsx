import { OVERVIEW_AVATAR_BADGE_CLASS } from './overviewData';

const OverviewAvatarBadge = ({ initial, name, isOnline = false }) => (
  <div className="relative shrink-0">
    <div className={OVERVIEW_AVATAR_BADGE_CLASS} aria-hidden="true">
      {initial}
    </div>
    {isOnline ? (
      <span
        className="absolute -right-0.5 -bottom-0.5 size-3 rounded-full border-2 border-white bg-[#00c950]"
        aria-label={`${name} is online`}
      />
    ) : null}
  </div>
);

export default OverviewAvatarBadge;
