import {
  OVERVIEW_AVATAR_BADGE_CLASS,
  OVERVIEW_AVATAR_WRAP_CLASS,
  OVERVIEW_ONLINE_DOT_CLASS,
} from './overviewData';

const OverviewAvatarBadge = ({ initial, name, isOnline = false }) => (
  <div className={OVERVIEW_AVATAR_WRAP_CLASS}>
    <div className={OVERVIEW_AVATAR_BADGE_CLASS} aria-hidden="true">
      {initial}
    </div>
    {isOnline ? (
      <span className={OVERVIEW_ONLINE_DOT_CLASS} aria-label={`${name} is online`} />
    ) : null}
  </div>
);

export default OverviewAvatarBadge;
