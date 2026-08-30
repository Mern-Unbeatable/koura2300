import { memo, useCallback } from 'react';
import {
  SETTINGS_TOGGLE_FOCUS_CLASS,
  SETTINGS_TOGGLE_OFF_CLASS,
  SETTINGS_TOGGLE_ON_CLASS,
  SETTINGS_TOGGLE_THUMB_CLASS,
  SETTINGS_TOGGLE_THUMB_OFF_LEFT,
  SETTINGS_TOGGLE_THUMB_ON_LEFT,
  SETTINGS_TOGGLE_TRACK_CLASS,
} from './settingsData';

const SettingsToggle = memo(({ checked, label, onToggle }) => {
  const handleClick = useCallback(() => {
    onToggle();
  }, [onToggle]);

  const trackClass = `${SETTINGS_TOGGLE_TRACK_CLASS} ${
    checked ? SETTINGS_TOGGLE_ON_CLASS : SETTINGS_TOGGLE_OFF_CLASS
  } ${SETTINGS_TOGGLE_FOCUS_CLASS}`;
  const thumbClass = `${SETTINGS_TOGGLE_THUMB_CLASS} ${
    checked ? SETTINGS_TOGGLE_THUMB_ON_LEFT : SETTINGS_TOGGLE_THUMB_OFF_LEFT
  }`;

  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      aria-label={label}
      onClick={handleClick}
      className={trackClass}
    >
      <span className={thumbClass} aria-hidden="true" />
    </button>
  );
});

SettingsToggle.displayName = 'SettingsToggle';

export default SettingsToggle;
