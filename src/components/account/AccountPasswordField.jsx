import React, { memo } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import {
  ACCOUNT_FIELD_CLASS,
  ACCOUNT_INPUT_CLASS,
  ACCOUNT_LABEL_CLASS,
  ACCOUNT_PASSWORD_FIELD_WRAP_CLASS,
  ACCOUNT_PASSWORD_TOGGLE_CLASS,
  ACCOUNT_PASSWORD_TOGGLE_ICON_SIZE,
} from './accountData';

const AccountPasswordField = memo(
  ({
    id,
    label,
    value,
    onChange,
    isVisible,
    onToggleVisibility,
    toggleLabel,
    placeholder,
  }) => (
    <div className={ACCOUNT_FIELD_CLASS}>
      <label htmlFor={id} className={ACCOUNT_LABEL_CLASS}>
        {label}
      </label>
      <div className={ACCOUNT_PASSWORD_FIELD_WRAP_CLASS}>
        <input
          id={id}
          name={id}
          type={isVisible ? 'text' : 'password'}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className={ACCOUNT_INPUT_CLASS}
        />
        <button
          type="button"
          onClick={onToggleVisibility}
          aria-label={toggleLabel}
          className={ACCOUNT_PASSWORD_TOGGLE_CLASS}
        >
          {isVisible ? (
            <EyeOff size={ACCOUNT_PASSWORD_TOGGLE_ICON_SIZE} aria-hidden="true" />
          ) : (
            <Eye size={ACCOUNT_PASSWORD_TOGGLE_ICON_SIZE} aria-hidden="true" />
          )}
        </button>
      </div>
    </div>
  ),
);

AccountPasswordField.displayName = 'AccountPasswordField';

export default AccountPasswordField;
