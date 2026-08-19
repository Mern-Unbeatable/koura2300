import React, { memo, useRef } from 'react';
import { Eye, EyeOff, X } from 'lucide-react';
import useGsapMountEnter from '../../hooks/useGsapMountEnter';
import useServiceCreateAccount from '../../hooks/useServiceCreateAccount';
import {
  MOUNT_ENTER_DURATION,
  MOUNT_ENTER_OFFSET,
  CREATE_ACCOUNT_SECTION_SHADOW_CLASS,
  CREATE_ACCOUNT_FIELD_BG_CLASS,
  CREATE_ACCOUNT_FIELD_HEIGHT_CLASS,
  CREATE_ACCOUNT_SIGN_UP_BTN_CLASS,
  CREATE_ACCOUNT_SOCIAL_BTN_CLASS,
  CREATE_ACCOUNT_EYE_ICON_SIZE,
  CREATE_ACCOUNT_CLOSE_ICON_SIZE,
} from './serviceDetailsData';

const SECTION_CLASS = `w-full min-w-0 overflow-hidden rounded-[20px] bg-white ${CREATE_ACCOUNT_SECTION_SHADOW_CLASS}`;
const INNER_CLASS = 'px-4 py-10 sm:px-14 sm:py-11';
const TITLE_CLASS =
  'min-w-0 pr-2 text-xl font-semibold leading-tight text-[#0c0c0c] max-[320px]:text-lg sm:text-[40px] sm:leading-none';
const FORM_CLASS = 'flex flex-col gap-4';
const LABEL_CLASS = 'block text-base font-medium text-[#373737]';
const INPUT_CLASS = `block w-full rounded-lg ${CREATE_ACCOUNT_FIELD_BG_CLASS} ${CREATE_ACCOUNT_FIELD_HEIGHT_CLASS} px-[14px] text-sm text-[#0c0c0c] placeholder:text-[#8c8c8c] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0160f2]`;
const DIVIDER_LINE_CLASS = 'h-px flex-1 bg-gray-200';
const ALREADY_ROW_CLASS = 'flex items-center justify-center gap-1 text-base';
const HEADER_CLASS = 'flex items-start justify-between';
const ANIMATED_FIELDS_CLASS =
  'overflow-hidden transition-[max-height,opacity] duration-500 ease-in-out';

const GoogleIcon = memo(() => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    width="24"
    height="24"
    aria-hidden="true"
    className="shrink-0"
  >
    <path
      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
      fill="#4285F4"
    />
    <path
      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
      fill="#34A853"
    />
    <path
      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"
      fill="#FBBC05"
    />
    <path
      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
      fill="#EA4335"
    />
  </svg>
));

GoogleIcon.displayName = 'GoogleIcon';

const AppleIcon = memo(() => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    width="24"
    height="24"
    aria-hidden="true"
    className="shrink-0"
    fill="currentColor"
  >
    <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.7 9.05 7.4c1.3.07 2.2.74 2.97.8.97-.2 1.9-.89 3.03-.96 1.89-.13 3.3.8 4.19 2.18-3.83 2.3-2.86 7.56.65 8.94-.77 1.97-1.77 3.9-2.84 4.92zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z" />
  </svg>
));

AppleIcon.displayName = 'AppleIcon';

const FormField = memo(({ id, label, type = 'text', placeholder, value, onChange, children }) => (
  <div className="flex flex-col gap-2.5">
    <label htmlFor={id} className={LABEL_CLASS}>
      {label}
    </label>
    <div className="relative">
      <input
        id={id}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        autoComplete="off"
        className={INPUT_CLASS}
      />
      {children}
    </div>
  </div>
));

FormField.displayName = 'FormField';

const PasswordToggle = memo(({ showPassword, onToggle, showLabel, hideLabel }) => (
  <button
    type="button"
    onClick={onToggle}
    aria-label={showPassword ? hideLabel : showLabel}
    className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-[#8c8c8c] transition-colors hover:text-[#0160f2] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0160f2] rounded"
  >
    {showPassword ? (
      <EyeOff size={CREATE_ACCOUNT_EYE_ICON_SIZE} aria-hidden="true" />
    ) : (
      <Eye size={CREATE_ACCOUNT_EYE_ICON_SIZE} aria-hidden="true" />
    )}
  </button>
));

PasswordToggle.displayName = 'PasswordToggle';

const SocialButton = memo(({ label, icon: Icon }) => (
  <button type="button" className={CREATE_ACCOUNT_SOCIAL_BTN_CLASS}>
    <Icon />
    <span className="font-bold tracking-[-0.45px] text-black">{label}</span>
  </button>
));

SocialButton.displayName = 'SocialButton';

const ModeLink = memo(({ label, actionLabel, onClick }) => (
  <p className={ALREADY_ROW_CLASS}>
    <span className="text-[#0c0c0c]">{label}</span>
    <button
      type="button"
      onClick={onClick}
      className="font-semibold text-[#0160f2] underline-offset-2 hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0160f2] rounded cursor-pointer whitespace-nowrap"
    >
      {actionLabel}
    </button>
  </p>
));

ModeLink.displayName = 'ModeLink';

const ServiceDetailsCreateAccount = memo(({ onClose }) => {
  const {
    fields,
    showPassword,
    isSubmitEnabled,
    isLoginMode,
    copy,
    handleFieldChange,
    handleTogglePassword,
    handleSwitchToLogin,
    handleSwitchToSignUp,
  } = useServiceCreateAccount();

  const enterRef = useGsapMountEnter({ y: MOUNT_ENTER_OFFSET, duration: MOUNT_ENTER_DURATION });
  const signUpFieldsRef = useRef(null);

  const title = isLoginMode ? copy.loginTitle : copy.title;
  const submitLabel = isLoginMode ? copy.loginButton : copy.signUp;

  return (
    <div
      ref={enterRef}
      className="min-w-0 pt-6"
      role="region"
      aria-label={copy.regionLabel}
    >
      <section className={SECTION_CLASS}>
        <div className={INNER_CLASS}>

          <div className={HEADER_CLASS}>
            <h2 className={TITLE_CLASS}>{title}</h2>
            <button
              type="button"
              onClick={onClose}
              aria-label={copy.closeLabel}
              className="cursor-pointer rounded-md p-1 text-[#0c0c0c] transition-colors hover:text-[#0160f2] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0160f2]"
            >
              <X size={CREATE_ACCOUNT_CLOSE_ICON_SIZE} aria-hidden="true" />
            </button>
          </div>

          <form
            className={`mt-9 ${FORM_CLASS}`}
            aria-label={title}
            onSubmit={(event) => event.preventDefault()}
            noValidate
          >
            {/* Sign-up-only fields — animated collapse on login mode */}
            <div
              ref={signUpFieldsRef}
              className={ANIMATED_FIELDS_CLASS}
              style={{ maxHeight: isLoginMode ? '0px' : '600px', opacity: isLoginMode ? 0 : 1 }}
              aria-hidden={isLoginMode}
            >
              <div className="flex flex-col gap-4 pb-1">
                <FormField
                  id="create-account-full-name"
                  label={copy.fullName}
                  placeholder={copy.fullNamePlaceholder}
                  value={fields.fullName}
                  onChange={handleFieldChange('fullName')}
                />
                <FormField
                  id="create-account-phone"
                  label={copy.phone}
                  type="tel"
                  placeholder={copy.phonePlaceholder}
                  value={fields.phone}
                  onChange={handleFieldChange('phone')}
                />
                <FormField
                  id="create-account-address"
                  label={copy.address}
                  placeholder={copy.addressPlaceholder}
                  value={fields.address}
                  onChange={handleFieldChange('address')}
                />
              </div>
            </div>

            {/* Always-visible fields */}
            <FormField
              id="create-account-email"
              label={copy.email}
              type="email"
              placeholder={copy.emailPlaceholder}
              value={fields.email}
              onChange={handleFieldChange('email')}
            />
            <FormField
              id="create-account-password"
              label={copy.password}
              type={showPassword ? 'text' : 'password'}
              placeholder={copy.passwordPlaceholder}
              value={fields.password}
              onChange={handleFieldChange('password')}
            >
              <PasswordToggle
                showPassword={showPassword}
                onToggle={handleTogglePassword}
                showLabel={copy.showPassword}
                hideLabel={copy.hidePassword}
              />
            </FormField>

            {isLoginMode ? (
              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={() => {}}
                  className="text-sm text-[#0160f2] hover:underline underline-offset-2 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0160f2] rounded"
                >
                  {copy.forgotPassword}
                </button>
              </div>
            ) : null}

            <div className="mt-2 flex flex-col gap-6">
              <button
                type="submit"
                disabled={!isSubmitEnabled}
                className={CREATE_ACCOUNT_SIGN_UP_BTN_CLASS}
              >
                {submitLabel}
              </button>

              {isLoginMode ? (
                <ModeLink
                  label={copy.backToSignUp}
                  actionLabel={copy.signUpLink}
                  onClick={handleSwitchToSignUp}
                />
              ) : (
                <ModeLink
                  label={copy.alreadyHaveAccount}
                  actionLabel={copy.logIn}
                  onClick={handleSwitchToLogin}
                />
              )}
            </div>
          </form>

          <div className="flex items-center gap-4 py-6">
            <span className={DIVIDER_LINE_CLASS} aria-hidden="true" />
            <span className="text-sm text-gray-400" aria-hidden="true">or</span>
            <span className={DIVIDER_LINE_CLASS} aria-hidden="true" />
          </div>

          <div className="flex flex-col gap-4">
            <SocialButton label={copy.continueWithGoogle} icon={GoogleIcon} />
            <SocialButton label={copy.continueWithApple} icon={AppleIcon} />
          </div>

        </div>
      </section>
    </div>
  );
});

ServiceDetailsCreateAccount.displayName = 'ServiceDetailsCreateAccount';

export default ServiceDetailsCreateAccount;
