import { Eye, EyeOff, LogIn, UserPlus } from 'lucide-react';
import { APP_CONFIG } from '../../config';
import {
  LOGIN_AUTH_MODES,
  LOGIN_FEATURE_ICON_WRAP_CLASS,
  LOGIN_FEATURE_ITEM_CLASS,
  LOGIN_FEATURE_LABEL_CLASS,
  LOGIN_FEATURE_LIST_CLASS,
  LOGIN_FEATURES,
  LOGIN_FIELD_CLASS,
  LOGIN_FOOTER_NOTE_CLASS,
  LOGIN_FORM_CARD_CLASS,
  LOGIN_FORM_ERROR_CLASS,
  LOGIN_FORM_PANEL_CLASS,
  LOGIN_FORM_STACK_CLASS,
  LOGIN_FORM_SUBTITLE_CLASS,
  LOGIN_FORM_TITLE_CLASS,
  LOGIN_HERO_CLASS,
  LOGIN_HERO_DESCRIPTION_CLASS,
  LOGIN_HERO_EYEBROW_CLASS,
  LOGIN_HERO_GLOW_CLASS,
  LOGIN_HERO_GLOW_SECONDARY_CLASS,
  LOGIN_HERO_TITLE_CLASS,
  LOGIN_INPUT_CLASS,
  LOGIN_INPUT_ERROR_CLASS,
  LOGIN_LABEL_CLASS,
  LOGIN_MODE_SWITCH_BUTTON_CLASS,
  LOGIN_MODE_SWITCH_CLASS,
  LOGIN_PASSWORD_TOGGLE_CLASS,
  LOGIN_PASSWORD_WRAP_CLASS,
  LOGIN_SHELL_CLASS,
  LOGIN_SUBMIT_BUTTON_CLASS,
  LOGIN_ERROR_TEXT_CLASS,
} from './loginData';

const LoginHeroPanel = ({ copy }) => (
  <section className={LOGIN_HERO_CLASS} aria-label={copy.hero.eyebrow}>
    <div className={LOGIN_HERO_GLOW_CLASS} aria-hidden="true" />
    <div className={LOGIN_HERO_GLOW_SECONDARY_CLASS} aria-hidden="true" />
    <div>
      <p className={LOGIN_HERO_EYEBROW_CLASS}>{copy.hero.eyebrow}</p>
      <h1 className={LOGIN_HERO_TITLE_CLASS}>{copy.hero.title}</h1>
      <p className={LOGIN_HERO_DESCRIPTION_CLASS}>{copy.hero.description}</p>
      <ul className={LOGIN_FEATURE_LIST_CLASS}>
        {LOGIN_FEATURES.map(({ id, icon: Icon, label }) => (
          <li key={id} className={LOGIN_FEATURE_ITEM_CLASS}>
            <span className={LOGIN_FEATURE_ICON_WRAP_CLASS}>
              <Icon size={16} className="text-brand-orange" aria-hidden="true" />
            </span>
            <span className={LOGIN_FEATURE_LABEL_CLASS}>{label}</span>
          </li>
        ))}
      </ul>
    </div>
  </section>
);

const LoginModeSwitch = ({ copy, isCreateMode, onSwitchToCreateAccount, onSwitchToLogin }) => {
  if (isCreateMode) {
    return (
      <p className={LOGIN_MODE_SWITCH_CLASS}>
        {copy.form.switchToLoginPrompt}{' '}
        <button type="button" onClick={onSwitchToLogin} className={LOGIN_MODE_SWITCH_BUTTON_CLASS}>
          {copy.form.switchToLoginAction}
        </button>
      </p>
    );
  }

  return (
    <p className={LOGIN_MODE_SWITCH_CLASS}>
      {copy.form.switchToCreatePrompt}{' '}
      <button
        type="button"
        onClick={onSwitchToCreateAccount}
        className={LOGIN_MODE_SWITCH_BUTTON_CLASS}
      >
        {copy.form.switchToCreateAction}
      </button>
    </p>
  );
};

const LoginTextField = ({
  id,
  name,
  label,
  type = 'text',
  autoComplete,
  value,
  onChange,
  placeholder,
  error,
}) => {
  const errorId = `${id}-error`;

  return (
    <div className={LOGIN_FIELD_CLASS}>
      <label htmlFor={id} className={LOGIN_LABEL_CLASS}>
        {label}
      </label>
      <input
        id={id}
        name={name}
        type={type}
        autoComplete={autoComplete}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        aria-invalid={!!error}
        aria-describedby={error ? errorId : undefined}
        className={`${LOGIN_INPUT_CLASS} ${error ? LOGIN_INPUT_ERROR_CLASS : ''}`}
      />
      {error ? (
        <p id={errorId} className={LOGIN_ERROR_TEXT_CLASS}>
          {error}
        </p>
      ) : null}
    </div>
  );
};

const LoginPasswordField = ({
  copy,
  value,
  onChange,
  showPassword,
  onTogglePasswordVisibility,
  error,
  autoComplete,
}) => {
  const errorId = 'login-password-error';

  return (
    <div className={LOGIN_FIELD_CLASS}>
      <label htmlFor="login-password" className={LOGIN_LABEL_CLASS}>
        {copy.form.passwordLabel}
      </label>
      <div className={LOGIN_PASSWORD_WRAP_CLASS}>
        <input
          id="login-password"
          name="password"
          type={showPassword ? 'text' : 'password'}
          autoComplete={autoComplete}
          value={value}
          onChange={onChange}
          placeholder={copy.form.passwordPlaceholder}
          aria-invalid={!!error}
          aria-describedby={error ? errorId : undefined}
          className={`${LOGIN_INPUT_CLASS} pr-11 ${error ? LOGIN_INPUT_ERROR_CLASS : ''}`}
        />
        <button
          type="button"
          onClick={onTogglePasswordVisibility}
          aria-label={showPassword ? copy.form.hidePassword : copy.form.showPassword}
          className={LOGIN_PASSWORD_TOGGLE_CLASS}
        >
          {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
        </button>
      </div>
      {error ? (
        <p id={errorId} className={LOGIN_ERROR_TEXT_CLASS}>
          {error}
        </p>
      ) : null}
    </div>
  );
};

const LoginFormPanel = ({
  copy,
  authMode,
  name,
  phone,
  address,
  email,
  password,
  showPassword,
  errors,
  isLoading,
  onNameChange,
  onPhoneChange,
  onAddressChange,
  onEmailChange,
  onPasswordChange,
  onTogglePasswordVisibility,
  onSwitchToCreateAccount,
  onSwitchToLogin,
  onSubmit,
}) => {
  const isCreateMode = authMode === LOGIN_AUTH_MODES.CREATE_ACCOUNT;
  const title = isCreateMode ? copy.form.createTitle : copy.form.title;
  const subtitle = isCreateMode ? copy.form.createSubtitle : copy.form.subtitle;
  const submitLabel = isLoading
    ? isCreateMode
      ? copy.form.creating
      : copy.form.submitting
    : isCreateMode
      ? copy.form.createSubmit
      : copy.form.submit;

  return (
    <section className={LOGIN_FORM_PANEL_CLASS} aria-label={title}>
      <div className={LOGIN_FORM_CARD_CLASS}>
        <h2 className={LOGIN_FORM_TITLE_CLASS}>{title}</h2>
        <p className={LOGIN_FORM_SUBTITLE_CLASS}>{subtitle}</p>

        {errors.form ? (
          <div role="alert" className={`${LOGIN_FORM_ERROR_CLASS} mt-6`}>
            {errors.form}
          </div>
        ) : null}

        <form onSubmit={onSubmit} noValidate className={LOGIN_FORM_STACK_CLASS}>
          {isCreateMode ? (
            <>
              <LoginTextField
                id="login-name"
                name="name"
                label={copy.form.nameLabel}
                autoComplete="name"
                value={name}
                onChange={onNameChange}
                placeholder={copy.form.namePlaceholder}
                error={errors.name}
              />
              <LoginTextField
                id="login-phone"
                name="phone"
                label={copy.form.phoneLabel}
                type="tel"
                autoComplete="tel"
                value={phone}
                onChange={onPhoneChange}
                placeholder={copy.form.phonePlaceholder}
                error={errors.phone}
              />
              <LoginTextField
                id="login-address"
                name="address"
                label={copy.form.addressLabel}
                autoComplete="street-address"
                value={address}
                onChange={onAddressChange}
                placeholder={copy.form.addressPlaceholder}
                error={errors.address}
              />
            </>
          ) : null}

          <LoginTextField
            id="login-email"
            name="email"
            label={copy.form.emailLabel}
            type="email"
            autoComplete="email"
            value={email}
            onChange={onEmailChange}
            placeholder={copy.form.emailPlaceholder}
            error={errors.email}
          />

          <LoginPasswordField
            copy={copy}
            value={password}
            onChange={onPasswordChange}
            showPassword={showPassword}
            onTogglePasswordVisibility={onTogglePasswordVisibility}
            error={errors.password}
            autoComplete={isCreateMode ? 'new-password' : 'current-password'}
          />

          <button type="submit" disabled={isLoading} className={LOGIN_SUBMIT_BUTTON_CLASS}>
            {isLoading ? (
              <span className="size-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
            ) : isCreateMode ? (
              <UserPlus size={18} aria-hidden="true" />
            ) : (
              <LogIn size={18} aria-hidden="true" />
            )}
            {submitLabel}
          </button>
        </form>

        <LoginModeSwitch
          copy={copy}
          isCreateMode={isCreateMode}
          onSwitchToCreateAccount={onSwitchToCreateAccount}
          onSwitchToLogin={onSwitchToLogin}
        />

        <p className={LOGIN_FOOTER_NOTE_CLASS}>
          {copy.footerNote(new Date().getFullYear(), APP_CONFIG.NAME)}
        </p>
      </div>
    </section>
  );
};

const LoginView = (props) => (
  <div className={LOGIN_SHELL_CLASS}>
    <LoginHeroPanel copy={props.copy} />
    <LoginFormPanel {...props} />
  </div>
);

export default LoginView;
