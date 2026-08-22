import React, { memo } from 'react';
import {
  ACCOUNT_FIELD_CLASS,
  ACCOUNT_INPUT_CLASS,
  ACCOUNT_LABEL_CLASS,
} from './accountData';

const AccountFormField = memo(({ id, label, value, onChange, type = 'text', placeholder }) => (
  <div className={ACCOUNT_FIELD_CLASS}>
    <label htmlFor={id} className={ACCOUNT_LABEL_CLASS}>
      {label}
    </label>
    <input
      id={id}
      name={id}
      type={type}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className={ACCOUNT_INPUT_CLASS}
    />
  </div>
));

AccountFormField.displayName = 'AccountFormField';

export default AccountFormField;
