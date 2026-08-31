import { memo } from 'react';
import {
  PROFILE_ERROR_TEXT_CLASS,
  PROFILE_FIELD_CLASS,
  PROFILE_INPUT_CLASS,
  PROFILE_INPUT_ERROR_CLASS,
  PROFILE_LABEL_CLASS,
} from './profileData';

const ProfileTextField = memo(
  ({ id, label, value, onChange, error, type = 'text', autoComplete }) => {
    const inputClassName = error
      ? `${PROFILE_INPUT_CLASS} ${PROFILE_INPUT_ERROR_CLASS}`
      : PROFILE_INPUT_CLASS;

    return (
      <div className={PROFILE_FIELD_CLASS}>
        <label htmlFor={id} className={PROFILE_LABEL_CLASS}>
          {label}
        </label>
        <input
          id={id}
          type={type}
          name={id}
          value={value}
          onChange={onChange}
          autoComplete={autoComplete}
          aria-invalid={Boolean(error)}
          aria-describedby={error ? `${id}-error` : undefined}
          className={inputClassName}
        />
        {error ? (
          <p id={`${id}-error`} role="alert" className={PROFILE_ERROR_TEXT_CLASS}>
            {error}
          </p>
        ) : null}
      </div>
    );
  },
);

ProfileTextField.displayName = 'ProfileTextField';

export default ProfileTextField;
