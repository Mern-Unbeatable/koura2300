import { memo } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import { PROFILE_COPY } from './profileCopy';
import {
  PROFILE_ERROR_TEXT_CLASS,
  PROFILE_FIELD_CLASS,
  PROFILE_INPUT_ERROR_CLASS,
  PROFILE_LABEL_CLASS,
  PROFILE_PASSWORD_ICON_SIZE_PX,
  PROFILE_PASSWORD_INPUT_CLASS,
  PROFILE_PASSWORD_INPUT_WRAP_CLASS,
  PROFILE_PASSWORD_TOGGLE_CLASS,
} from './profileData';

const ProfilePasswordField = memo(
  ({
    id,
    label,
    value,
    onChange,
    error,
    isVisible,
    onToggleVisibility,
    placeholder = PROFILE_COPY.placeholders.password,
    autoComplete = 'new-password',
  }) => {
    const inputClassName = error
      ? `${PROFILE_PASSWORD_INPUT_CLASS} ${PROFILE_INPUT_ERROR_CLASS}`
      : PROFILE_PASSWORD_INPUT_CLASS;
    const toggleLabel = isVisible
      ? PROFILE_COPY.visibility.hide(label)
      : PROFILE_COPY.visibility.show(label);

    return (
      <div className={PROFILE_FIELD_CLASS}>
        <label htmlFor={id} className={PROFILE_LABEL_CLASS}>
          {label}
        </label>
        <div className={PROFILE_PASSWORD_INPUT_WRAP_CLASS}>
          <input
            id={id}
            type={isVisible ? 'text' : 'password'}
            name={id}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            autoComplete={autoComplete}
            aria-invalid={Boolean(error)}
            aria-describedby={error ? `${id}-error` : undefined}
            className={inputClassName}
          />
          <button
            type="button"
            className={PROFILE_PASSWORD_TOGGLE_CLASS}
            aria-label={toggleLabel}
            onClick={() => onToggleVisibility()}
          >
            {isVisible ? (
              <Eye size={PROFILE_PASSWORD_ICON_SIZE_PX} aria-hidden="true" />
            ) : (
              <EyeOff size={PROFILE_PASSWORD_ICON_SIZE_PX} aria-hidden="true" />
            )}
          </button>
        </div>
        {error ? (
          <p id={`${id}-error`} role="alert" className={PROFILE_ERROR_TEXT_CLASS}>
            {error}
          </p>
        ) : null}
      </div>
    );
  },
);

ProfilePasswordField.displayName = 'ProfilePasswordField';

export default ProfilePasswordField;
