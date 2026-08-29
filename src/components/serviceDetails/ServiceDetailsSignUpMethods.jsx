import React, { memo } from 'react';
import { UserPlus } from 'lucide-react';
import useGsapMountEnter from '../../hooks/useGsapMountEnter';
import { SERVICE_DETAILS_CONTENT } from './serviceDetailsCopy';
import {
  MOUNT_ENTER_DURATION,
  MOUNT_ENTER_OFFSET,
  CREATE_ACCOUNT_SECTION_SHADOW_CLASS,
  CREATE_ACCOUNT_SOCIAL_BTN_CLASS,
  CREATE_ACCOUNT_SOCIAL_ICON_SIZE,
} from './serviceDetailsData';

const { createAccount } = SERVICE_DETAILS_CONTENT;

const SECTION_CLASS = `w-full min-w-0 overflow-hidden rounded-[20px] bg-white ${CREATE_ACCOUNT_SECTION_SHADOW_CLASS}`;
const INNER_CLASS = 'flex flex-col gap-4 px-4 py-8 sm:px-14 sm:py-10';

const ManualSignUpIcon = memo(() => (
  <UserPlus
    size={CREATE_ACCOUNT_SOCIAL_ICON_SIZE}
    aria-hidden="true"
    className="shrink-0 text-black"
  />
));

ManualSignUpIcon.displayName = 'ManualSignUpIcon';

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

const SignUpMethodButton = memo(({ label, onClick, icon: Icon }) => (
  <button type="button" onClick={onClick} className={CREATE_ACCOUNT_SOCIAL_BTN_CLASS}>
    {Icon ? <Icon /> : null}
    <span className="font-bold tracking-[-0.45px] text-black">{label}</span>
  </button>
));

SignUpMethodButton.displayName = 'SignUpMethodButton';

const ServiceDetailsSignUpMethods = memo(({ onManualSignUp }) => {
  const enterRef = useGsapMountEnter({ y: MOUNT_ENTER_OFFSET, duration: MOUNT_ENTER_DURATION });

  return (
    <div
      ref={enterRef}
      className="min-w-0 pt-6"
      role="region"
      aria-label={createAccount.signUpMethodsRegionLabel}
    >
      <section className={SECTION_CLASS}>
        <div className={INNER_CLASS}>
          <SignUpMethodButton
            label={createAccount.manualSignUp}
            onClick={onManualSignUp}
            icon={ManualSignUpIcon}
          />
          <SignUpMethodButton label={createAccount.continueWithGoogle} icon={GoogleIcon} />
          <SignUpMethodButton label={createAccount.continueWithApple} icon={AppleIcon} />
        </div>
      </section>
    </div>
  );
});

ServiceDetailsSignUpMethods.displayName = 'ServiceDetailsSignUpMethods';

export default ServiceDetailsSignUpMethods;
