import React, { memo } from 'react';
import { Camera } from 'lucide-react';
import {
  ACCOUNT_AVATAR_IMAGE_CLASS,
  ACCOUNT_AVATAR_WRAP_CLASS,
  ACCOUNT_CAMERA_BUTTON_CLASS,
  ACCOUNT_CAMERA_BUTTON_SIZE_PX,
} from './accountData';

const AccountAvatarField = memo(
  ({ avatarUrl, avatarAlt, inputRef, buttonLabel, onButtonClick, onFileChange }) => (
    <div className={ACCOUNT_AVATAR_WRAP_CLASS}>
      <img src={avatarUrl} alt={avatarAlt} width={176} height={176} className={ACCOUNT_AVATAR_IMAGE_CLASS} />
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        onChange={onFileChange}
        className="sr-only"
        tabIndex={-1}
      />
      <button
        type="button"
        onClick={onButtonClick}
        aria-label={buttonLabel}
        className={ACCOUNT_CAMERA_BUTTON_CLASS}
      >
        <Camera size={ACCOUNT_CAMERA_BUTTON_SIZE_PX - 16} aria-hidden="true" />
      </button>
    </div>
  ),
);

AccountAvatarField.displayName = 'AccountAvatarField';

export default AccountAvatarField;
