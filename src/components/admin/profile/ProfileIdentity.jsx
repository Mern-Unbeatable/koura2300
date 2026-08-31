import { memo, useId, useRef } from 'react';
import { Camera, User } from 'lucide-react';
import { PROFILE_COPY } from './profileCopy';
import {
  PROFILE_AVATAR_ICON_SIZE_PX,
  PROFILE_AVATAR_WRAP_CLASS,
  PROFILE_CAMERA_BADGE_CLASS,
  PROFILE_CAMERA_ICON_SIZE_PX,
  PROFILE_IDENTITY_CLASS,
  PROFILE_IDENTITY_EMAIL_CLASS,
  PROFILE_IDENTITY_NAME_CLASS,
  PROFILE_IDENTITY_TEXT_CLASS,
} from './profileData';

const ProfileIdentity = memo(
  ({
    copy = PROFILE_COPY,
    displayName,
    displayEmail,
    avatarPreviewUrl,
    onAvatarChange,
  }) => {
    const fileInputId = useId();
    const fileInputRef = useRef(null);

    const handleCameraClick = () => {
      fileInputRef.current?.click();
    };

    return (
      <div className={PROFILE_IDENTITY_CLASS}>
        <div className={PROFILE_AVATAR_WRAP_CLASS}>
          {avatarPreviewUrl ? (
            <img
              src={avatarPreviewUrl}
              alt=""
              className="absolute inset-0 size-full rounded-full object-cover"
            />
          ) : (
            <User size={PROFILE_AVATAR_ICON_SIZE_PX} className="text-[#989da1]" aria-hidden="true" />
          )}
          <input
            id={fileInputId}
            ref={fileInputRef}
            type="file"
            accept="image/*"
            className="sr-only"
            onChange={onAvatarChange}
          />
          <button
            type="button"
            className={PROFILE_CAMERA_BADGE_CLASS}
            aria-label={copy.actions.changeAvatar}
            onClick={handleCameraClick}
          >
            <Camera size={PROFILE_CAMERA_ICON_SIZE_PX} aria-hidden="true" />
          </button>
        </div>

        <div className={PROFILE_IDENTITY_TEXT_CLASS}>
          <p className={PROFILE_IDENTITY_NAME_CLASS}>{displayName}</p>
          <p className={PROFILE_IDENTITY_EMAIL_CLASS}>{displayEmail}</p>
        </div>
      </div>
    );
  },
);

ProfileIdentity.displayName = 'ProfileIdentity';

export default ProfileIdentity;
