import { memo } from 'react';
import { PROFILE_COPY } from './profileCopy';
import {
  PROFILE_HEADER_SUBTITLE_CLASS,
  PROFILE_HEADER_TITLE_CLASS,
} from './profileData';

const ProfileHeader = memo(({ copy = PROFILE_COPY }) => (
  <header className="flex w-full min-w-0 flex-col gap-2">
    <h1 className={PROFILE_HEADER_TITLE_CLASS}>{copy.title}</h1>
    <p className={PROFILE_HEADER_SUBTITLE_CLASS}>{copy.subtitle}</p>
  </header>
));

ProfileHeader.displayName = 'ProfileHeader';

export default ProfileHeader;
